// Organic SVG blob generator — smooth, flowing, irregular shapes sized to
// enclose a label box (w×h). The brand's signature hand-painted form, applied
// to primary CTAs. Pure (no DOM) so it's testable and runs in node.
//
// Shape = a superellipse (rounded-rectangle / squircle: rounded ends, never
// pointy even on wide buttons) modulated by a few LOW-frequency harmonics
// (gentle asymmetric flow, not high-frequency jitter). Then grown until the
// label's corners sit inside, so text never clips.
//
// ponytail: hand-rolled (~90 lines) instead of a blob npm dep — generic blob
//   libraries make standalone shapes, not ones fitted around a text rectangle.

const TAU = Math.PI * 2;

/** Deterministic FNV-1a hash of a string → 32-bit seed. */
export function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — seeded PRNG → () => float in [0,1). */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Superellipse radius at angle t for semi-axes (ax,ay), exponent n. */
function superR(t, ax, ay, n) {
  const c = Math.abs(Math.cos(t)), s = Math.abs(Math.sin(t));
  return 1 / (Math.pow(c / ax, n) + Math.pow(s / ay, n)) ** (1 / n);
}

/** Sample the blob outline as raw points (centred at 0,0), pre-spline. */
function blobPoints(w, h, opts) {
  const { seed = 1, points = 24, exponent = 3.4, padX = 22, padY = 15, scale = 1 } = opts;
  const ax = (w / 2 + padX) * scale, ay = (h / 2 + padY) * scale;
  const rand = rng(seed);
  // Three gentle harmonics: f=1 lopsides it (egg), f=2/3 add a soft, flowing
  // waviness. Low frequency + small amplitude = organic, not spiky.
  const harm = [1, 2, 3].map((f) => ({ f, a: 0.04 + 0.035 * rand(), p: rand() * TAU }));

  // Dense base superellipse with cumulative arc length, so we can place control
  // points by ARC LENGTH (not angle) — otherwise the short end-caps of a wide
  // pill get too few points and turn pointy.
  const M = 480;
  const angle = new Array(M + 1), cum = new Array(M + 1);
  let prev = null, len = 0;
  for (let i = 0; i <= M; i++) {
    const t = (i / M) * TAU;
    const r = superR(t, ax, ay, exponent);
    const p = [Math.cos(t) * r, Math.sin(t) * r];
    if (prev) len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    angle[i] = t; cum[i] = len; prev = p;
  }
  // Invert arc length → angle (cum is monotonic).
  const angleAt = (s) => {
    let lo = 0, hi = M;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < s) lo = mid + 1; else hi = mid; }
    if (lo === 0) return 0;
    const f = (s - cum[lo - 1]) / (cum[lo] - cum[lo - 1] || 1);
    return angle[lo - 1] + f * (angle[lo] - angle[lo - 1]);
  };

  const pts = [];
  let maxX = 0, maxY = 0;
  for (let i = 0; i < points; i++) {
    const t = angleAt((i / points) * len);
    let wob = 1;
    for (const k of harm) wob += k.a * Math.sin(k.f * t + k.p);
    const r = superR(t, ax, ay, exponent) * wob;
    const x = Math.cos(t) * r, y = Math.sin(t) * r;
    pts.push([x, y]);
    if (Math.abs(x) > maxX) maxX = Math.abs(x);
    if (Math.abs(y) > maxY) maxY = Math.abs(y);
  }
  return { pts, maxX, maxY };
}

/** Closed Catmull-Rom → cubic-bézier segments [p1,c1,c2,p2] (smooth, flowing). */
function segments(pts) {
  const n = pts.length;
  const at = (i) => pts[((i % n) + n) % n];
  const segs = [];
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    segs.push({
      p1, p2,
      c1: [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      c2: [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
    });
  }
  return segs;
}

const cubic = (a, b1, b2, c, t) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b1 + 3 * u * t * t * b2 + t * t * t * c;
};

/** Flatten the spline to a dense polygon — for containment / hit-testing. */
function flatten(pts, perSeg = 10) {
  const out = [];
  for (const s of segments(pts)) {
    for (let i = 0; i < perSeg; i++) {
      const t = i / perSeg;
      out.push([cubic(s.p1[0], s.c1[0], s.c2[0], s.p2[0], t), cubic(s.p1[1], s.c1[1], s.c2[1], s.p2[1], t)]);
    }
  }
  return out;
}

const round = (n) => Math.round(n * 100) / 100;
const fmt = ([x, y]) => `${round(x)},${round(y)}`;

function splinePath(pts) {
  let d = `M${fmt(pts[0])}`;
  for (const s of segments(pts)) d += `C${fmt(s.c1)} ${fmt(s.c2)} ${fmt(s.p2)}`;
  return d + "Z";
}

/** Ray-cast point-in-polygon. */
function inside(poly, [px, py]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Generate points, growing the shape until all four label corners sit inside. */
function fit(w, h, opts) {
  const corners = [[w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2], [w / 2, -h / 2]];
  let res, scale = 1;
  for (let tries = 0; tries < 6; tries++) {
    res = blobPoints(w, h, { ...opts, scale });
    if (corners.every((c) => inside(flatten(res.pts), c))) break;
    scale *= 1.08; // ponytail: grow-to-fit, capped — keeps the smooth shape, just bigger
  }
  return res;
}

/**
 * Build an organic blob enclosing a w×h label (centred at 0,0).
 * @param {number} w label width in px
 * @param {number} h label height in px
 * @param {object} [opts] seed, points, exponent, padX, padY, ghost
 * @returns {{ d:string, ghostD:string, viewBox:string, width:number, height:number }}
 */
export function blobPath(w, h, opts = {}) {
  const ghost = opts.ghost ?? 0.05;
  const { pts, maxX, maxY } = fit(w, h, opts);
  const d = splinePath(pts);
  const ghostD = splinePath(pts.map(([x, y]) => [x * (1 + ghost), y * (1 + ghost)]));
  const halfW = maxX * (1 + ghost) + 2;
  const halfH = maxY * (1 + ghost) + 2; // +2px so the ghost stroke isn't clipped
  return {
    d,
    ghostD,
    viewBox: `${-halfW} ${-halfH} ${halfW * 2} ${halfH * 2}`,
    width: halfW * 2,
    height: halfH * 2,
  };
}

/** Densely-sampled outline polygon — for tests / hit-testing. */
export function blobOutline(w, h, opts = {}) {
  return flatten(fit(w, h, opts).pts);
}
