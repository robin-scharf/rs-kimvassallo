// Self-check: node src/scripts/blob.test.mjs
// Guards three claims: shapes are unique+stable, the label never pokes outside
// the blob ("fit the content inside"), and the outline stays smooth — no pointy
// tips (the regression that made the first version look awful).
import { blobPath, blobOutline, hashSeed } from "./blob.js";
import assert from "node:assert/strict";

const inside = (poly, [px, py]) => {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
};

// Largest turn angle (radians) between consecutive outline edges. A smooth blob
// turns gently; a pointy tip spikes toward π.
const maxTurn = (poly) => {
  let m = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[(i - 1 + poly.length) % poly.length], b = poly[i], c = poly[(i + 1) % poly.length];
    const e1 = [b[0] - a[0], b[1] - a[1]], e2 = [c[0] - b[0], c[1] - b[1]];
    const d = (e1[0] * e2[0] + e1[1] * e2[1]) / (Math.hypot(...e1) * Math.hypot(...e2) || 1);
    m = Math.max(m, Math.acos(Math.min(1, Math.max(-1, d))));
  }
  return m;
};

// Deterministic: same input → identical path; different seed → different shape.
assert.equal(blobPath(120, 24, { seed: 7 }).d, blobPath(120, 24, { seed: 7 }).d);
assert.notEqual(blobPath(120, 24, { seed: 7 }).d, blobPath(120, 24, { seed: 8 }).d);
assert.notEqual(hashSeed("Book a call#0"), hashSeed("Send message#0"));

// Containment + smoothness across sizes (incl. very wide pills) & many seeds.
for (const [w, h] of [[120, 24], [240, 28], [60, 40], [40, 40], [300, 20], [560, 26]]) {
  for (let seed = 0; seed < 40; seed++) {
    const poly = blobOutline(w, h, { seed });
    for (const c of [[w / 2, h / 2], [-w / 2, h / 2], [w / 2, -h / 2], [-w / 2, -h / 2]]) {
      assert.ok(inside(poly, c), `corner ${c} escaped blob w=${w} h=${h} seed=${seed}`);
    }
    const turn = maxTurn(poly);
    assert.ok(turn < 0.8, `too pointy (${turn.toFixed(2)}rad) w=${w} h=${h} seed=${seed}`);
  }
}

console.log("blob.js ok");
