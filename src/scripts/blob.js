// Organic SVG blob generator — unique, irregular, flowing shapes sized to
// enclose a label box (w×h). The brand's signature hand-painted form, applied
// to primary CTAs. Pure (no DOM) so it's testable and runs in node.
//
// ponytail: hand-rolled (~70 lines) instead of a blob npm dep — generic blob
//   libraries make standalone shapes, not ones fitted around a text rectangle.
//   Upgrade path: pull in a library only if we need many distinct shape families.

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

/**
 * Per-angle sample points of the blob (centred at 0,0). The base shape is an
 * ellipse sized so the w×h label sits inside with ≥20% slack; each point is
 * pushed *outward only* by a seeded wobble, so the text never gets clipped.
 * @returns {{ pts:[number,number][], maxX:number, maxY:number }}
 */
function blobPoints(w, h, { seed = 1, points = 14, jitter = 0.18 } = {}) {
  const hx = w / 2, hy = h / 2;
  let A = hx + 24, B = hy + 16; // base ellipse: label half-size + breathing room
  // Keep the label corner well inside (handles short/square labels too).
  const fill = (hx / A) ** 2 + (hy / B) ** 2;
  if (fill > 0.8) { const k = Math.sqrt(fill / 0.8); A *= k; B *= k; }

  const rand = rng(seed);
  const pts = [];
  let maxX = 0, maxY = 0;
  for (let i = 0; i < points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const rEll = (A * B) / Math.hypot(B * Math.cos(ang), A * Math.sin(ang));
    const r = rEll * (1 + 0.04 + jitter * rand()); // ≥4% beyond ellipse, never inside
    const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
    pts.push([x, y]);
    maxX = Math.max(maxX, Math.abs(x));
    maxY = Math.max(maxY, Math.abs(y));
  }
  return { pts, maxX, maxY };
}

/** Closed Catmull-Rom spline through pts → smooth cubic-bézier SVG path. */
function spline(pts) {
  const n = pts.length;
  const at = (i) => pts[((i % n) + n) % n];
  let d = `M${fmt(at(0))}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${fmt(c1)} ${fmt(c2)} ${fmt(p2)}`;
  }
  return d + "Z";
}

/**
 * Build an organic blob enclosing a w×h label (centred at 0,0).
 * @param {number} w label width in px
 * @param {number} h label height in px
 * @param {object} [opts] seed, points, jitter, ghost (outline scale)
 * @returns {{ d:string, ghostD:string, viewBox:string, width:number, height:number }}
 */
export function blobPath(w, h, opts = {}) {
  const { ghost = 0.06 } = opts;
  const { pts, maxX, maxY } = blobPoints(w, h, opts);
  const d = spline(pts);
  const ghostD = spline(pts.map(([x, y]) => [x * (1 + ghost), y * (1 + ghost)]));
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
  const { pts } = blobPoints(w, h, opts);
  const n = pts.length;
  const at = (i) => pts[((i % n) + n) % n];
  const out = [];
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    for (let s = 0; s < 12; s++) {
      const t = s / 12, u = 1 - t;
      out.push([
        u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
        u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1],
      ]);
    }
  }
  return out;
}

const fmt = ([x, y]) => `${round(x)},${round(y)}`;
const round = (n) => Math.round(n * 100) / 100;
