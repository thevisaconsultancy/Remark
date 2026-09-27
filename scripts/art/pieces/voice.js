// AI Voice Agents: a spoken sentence cast as a waveform. Blackened bars on a
// plinth; the syllable being spoken now is still molten, the words either side
// have set into crimson glaze.
import { THREE, PAL, stage, castMetal, glaze, pourMaterial, pourMap, voidSet, render, finish, camera, RoundedBoxGeometry, rng } from "../lib.js";

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, exposure: 1.05 });
  const { scene } = st;
  voidSet(st, { poolAt: { pos: [1, 16, 2], target: [0, 0, 0], angle: 0.5, intensity: 170 } });

  const N = 41, gap = 0.33, r = 0.1;
  const rand = rng(9);
  const group = new THREE.Group();
  // speech envelope: three words, the middle one loudest
  const words = [
    [-0.62, 0.16, 0.55],
    [-0.05, 0.2, 1.0],
    [0.5, 0.14, 0.7],
  ];
  const metal = castMetal({ color: 0x221a17, roughness: 0.32 });
  const set = glaze({ color: PAL.crimson, roughness: 0.4, clearcoat: 0.35 });
  const deep = glaze({ color: PAL.deep, roughness: 0.34, clearcoat: 0.5 });
  const hot = pourMaterial(pourMap({ core: [0.5, 0.45], spread: 0.9, aspect: 0.3, seed: 5 }), { intensity: 1.4 });
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * 2 - 1;
    let a = 0.06;
    for (const [c, wdt, amp] of words) a += amp * Math.exp(-((t - c) ** 2) / (2 * wdt * wdt));
    a *= 0.75 + 0.5 * rand();
    const H = 0.25 + a * 3.1;
    const d = Math.abs(t + 0.05);
    const mat = d < 0.03 ? hot : d < 0.13 ? set : metal;
    const bar = new THREE.Mesh(new THREE.CapsuleGeometry(r, H, 8, 32), mat);
    bar.position.set((i - (N - 1) / 2) * gap, 0.22 + H / 2 + r, 0);
    group.add(bar);
    if (mat === hot) {
      const glow = new THREE.PointLight(PAL.molten, 3.5, 5, 1.6);
      glow.position.set(bar.position.x, 1.2, 0.8);
      group.add(glow);
    }
  }
  const plinth = new THREE.Mesh(new RoundedBoxGeometry(N * gap + 0.5, 0.22, 0.9, 4, 0.06), castMetal({ color: 0x1a1412, roughness: 0.45 }));
  plinth.position.y = 0.11;
  group.add(plinth);
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  group.rotation.y = -0.5;
  group.position.set(0.4, 0, -0.4);
  scene.add(group);

  const cam = camera(st.aspect, { fov: 28, pos: [2.2, 3.6, 17], look: [0.1, 1.4, -0.6] });
  const out = render({ ...st, camera: cam }, { bloom: { strength: 0.6, radius: 0.5, threshold: 0.85 }, dof: { focus: 17.2, aperture: 0.0022, maxblur: 0.008 } });
  return finish(out, { s, grain: 0.08, vignette: 0.6 });
}
