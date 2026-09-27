// CRM & ERP / the Visa Consultancy CRM: a pipeline board cast in blackened
// metal. Five stages, fewer records in each, one case glazed crimson in every
// column and a crimson thread stitching its path from lead to sign-off, where
// it is still molten.
import { THREE, PAL, stage, castMetal, glaze, pourMaterial, pourMap, voidSet, render, finish, camera, RoundedBoxGeometry, rng } from "../lib.js";

export default async function ({ w, h, s, variant }) {
  const wide = variant === "wide";
  const st = stage({ w, h, s, exposure: 1.05 });
  const { scene } = st;
  voidSet(st, { poolAt: { pos: [0, 18, 2], target: [0, 0, -0.5], angle: 0.5, intensity: 220 } });

  const rand = rng(4);
  const board = new THREE.Group();
  const counts = [6, 5, 4, 3, 2];
  const hotRow = [2, 1, 2, 1, 0];
  const colGap = 1.75, rowGap = 0.95, tw = 1.42, td = 0.78;
  const base = new THREE.Mesh(new RoundedBoxGeometry(counts.length * colGap + 0.5, 0.3, 6 * rowGap + 0.7, 5, 0.1), castMetal({ color: 0x191311, roughness: 0.5 }));
  base.position.set(0, 0.15, 0);
  board.add(base);
  const metal = castMetal({ color: 0x2a211d, roughness: 0.34 });
  const line = castMetal({ color: 0x3a2e29, roughness: 0.3 });
  const set = glaze({ color: PAL.crimson, roughness: 0.4, clearcoat: 0.5 });
  const hot = pourMaterial(pourMap({ core: [0.4, 0.4], spread: 0.8, aspect: 1.8, seed: 8 }), { intensity: 1.35 });
  const z0 = (6 * rowGap) / 2 - rowGap / 2; // rows fill from the front edge
  const path = [];
  counts.forEach((n, c) => {
    const x = (c - (counts.length - 1) / 2) * colGap;
    // stage groove
    const groove = new THREE.Mesh(new RoundedBoxGeometry(tw + 0.2, 0.06, 6 * rowGap + 0.3, 3, 0.03), castMetal({ color: 0x0f0b0a, roughness: 0.7 }));
    groove.position.set(x, 0.31, 0);
    board.add(groove);
    for (let r = 0; r < n; r++) {
      const isCase = r === hotRow[c];
      const last = c === counts.length - 1 && isCase;
      const mat = last ? hot : isCase ? set : metal;
      const hgt = 0.16 + (isCase ? 0.06 : rand() * 0.03);
      const tile = new THREE.Mesh(new RoundedBoxGeometry(tw, hgt, td, 4, 0.05), mat);
      const z = z0 - r * rowGap;
      tile.position.set(x, 0.34 + hgt / 2, z);
      board.add(tile);
      if (!last) {
        // cast "copy" on each record: a name line and a shorter meta line
        [[0.78, -0.14], [0.46, 0.1]].forEach(([lw, dz], k) => {
          const l = new THREE.Mesh(new RoundedBoxGeometry(lw, 0.03, 0.09, 2, 0.015), isCase ? glaze({ color: PAL.deep, roughness: 0.3 }) : line);
          l.position.set(x - (tw - lw) / 2 + 0.16, 0.34 + hgt + 0.012, z + dz);
          board.add(l);
        });
      }
      if (isCase) path.push(new THREE.Vector3(x, 0.34 + hgt + 0.12, z));
      if (last) {
        const glow = new THREE.PointLight(PAL.molten, 4, 4, 1.6);
        glow.position.set(x, 1.1, z - 0.3);
        board.add(glow);
      }
    }
  });
  // the crimson thread: the one case's path through the system
  const pts = [];
  path.forEach((p, i) => {
    pts.push(p);
    if (i < path.length - 1) {
      const q = path[i + 1];
      pts.push(new THREE.Vector3((p.x + q.x) / 2, p.y + 0.35, (p.z + q.z) / 2));
    }
  });
  const thread = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, "centripetal"), 200, 0.035, 12), glaze({ color: PAL.bright, roughness: 0.25 }));
  board.add(thread);
  board.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  board.rotation.y = wide ? -0.38 : -0.48;
  scene.add(board);

  const cam = wide
    ? camera(st.aspect, { fov: 24, pos: [3.0, 5.6, 12.8], look: [0.1, -0.35, -0.2] })
    : camera(st.aspect, { fov: 28, pos: [4.2, 8.4, 14.5], look: [0, 0.1, -0.2] });
  const focus = cam.position.distanceTo(new THREE.Vector3(0.6, 0.4, 0.8));
  const out = render({ ...st, camera: cam }, { bloom: { strength: 0.55, radius: 0.5, threshold: 0.85 }, dof: { focus, aperture: 0.0026, maxblur: 0.007 } });
  return finish(out, { s, grain: 0.08, vignette: 0.6 });
}
