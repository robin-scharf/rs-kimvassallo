// Self-check: node src/scripts/blob.test.mjs
// Guards the two claims that matter: shapes are unique+stable, and the label
// never pokes outside the blob (the whole point of "fit the content inside").
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

// Deterministic: same input → identical path; different seed → different shape.
assert.equal(blobPath(120, 24, { seed: 7 }).d, blobPath(120, 24, { seed: 7 }).d);
assert.notEqual(blobPath(120, 24, { seed: 7 }).d, blobPath(120, 24, { seed: 8 }).d);
assert.notEqual(hashSeed("Book a call#0"), hashSeed("Send message#0"));

// Containment: all four label corners sit inside the blob, across sizes & seeds.
for (const [w, h] of [[120, 24], [240, 28], [60, 40], [40, 40], [300, 20]]) {
  for (let seed = 0; seed < 40; seed++) {
    const poly = blobOutline(w, h, { seed });
    for (const c of [[w / 2, h / 2], [-w / 2, h / 2], [w / 2, -h / 2], [-w / 2, -h / 2]]) {
      assert.ok(inside(poly, c), `corner ${c} escaped blob w=${w} h=${h} seed=${seed}`);
    }
  }
}

console.log("blob.js ok");
