// Digital Marketing: growth you can measure, cast. Blackened columns rise in a
// shallow arc; the tallest has a molten cap, and a crimson trend line rides
// over the tops.
import { THREE, PAL, stage, castMetal, glaze, pourMaterial, pourMap, voidSet, render, finish, camera, RoundedBoxGeometry } from "../lib.js";

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, exposure: 1.05 });
  const { scene } = st;
  voidSet(st, { env: { pour: 0.4 }, poolAt: { pos: [0.5, 17, 2], target: [0.5, 0, -0.5], angle: 0.42, intensity: 320 } });

  const N = 9;
  const g = new THREE.Group();
  const tops = [];
  const metal = castMetal({ color: 0x241c19, roughness: 0.3 });
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const H = 0.5 + Math.pow(t, 1.7) * 4.6 + (i % 3 === 1 ? -0.18 : 0);
    const a = -0.9 + t * 1.8;
    const x = Math.sin(a) * 4.2, z = -Math.cos(a) * 1.4 + 0.9;
    const col = new THREE.Mesh(new RoundedBoxGeometry(0.62, H, 0.62, 4, 0.06), metal);
    col.position.set(x, H / 2, z);
    g.add(col);
    const last = i === N - 1;
    const cap = new THREE.Mesh(
      new RoundedBoxGeometry(0.64, 0.12, 0.64, 4, 0.05),
      last ? pourMaterial(pourMap({ core: [0.5, 0.5], spread: 0.6, seed: 14 }), { intensity: 1.6 }) : i >= N - 3 ? glaze({ color: PAL.crimson, roughness: 0.35, clearcoat: 0.6 }) : castMetal({ color: 0x3a2e29, roughness: 0.3 }),
    );
    cap.position.set(x, H + 0.05, z);
    g.add(cap);
    tops.push(new THREE.Vector3(x, H + (last ? 0.14 : 0.42), z));
    if (last) {
      // the pour that feeds it, falling from out of frame
      const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 12, 24, 1, true), pourMaterial(pourMap({ core: [0.5, 0.05], spread: 1.4, aspect: 0.2, seed: 3 }), { intensity: 1.2 }));
      stream.position.set(x, H + 6.1, z);
      g.add(stream);
      const glow = new THREE.PointLight(PAL.molten, 5, 5, 1.6);
      glow.position.set(x, H + 0.8, z + 0.4);
      g.add(glow);
    }
  }
  const curve = new THREE.CatmullRomCurve3(tops, false, "centripetal");
  const trend = new THREE.Mesh(new THREE.TubeGeometry(curve, 240, 0.032, 16), glaze({ color: PAL.bright, roughness: 0.25 }));
  g.add(trend);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  g.rotation.y = -0.3;
  g.position.x = -0.4;
  scene.add(g);

  const cam = camera(st.aspect, { fov: 30, pos: [3.0, 5.2, 16], look: [0.1, 2.6, 0] });
  const out = render({ ...st, camera: cam }, { bloom: { strength: 0.55, radius: 0.5, threshold: 0.85 }, dof: { focus: 16.2, aperture: 0.0016, maxblur: 0.006 } });
  return finish(out, { s, grain: 0.08, vignette: 0.6 });
}
