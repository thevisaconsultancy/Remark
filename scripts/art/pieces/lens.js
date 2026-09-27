// Creative Production: a lens, stopped down. Nine blackened iris blades close
// to a nine-sided opening, with the light of the pour behind them; engraved
// aperture scale on the barrel, one crimson index mark.
import { THREE, PAL, stage, castMetal, glaze, voidSet, pourMap, render, finish, camera, canvasTex } from "../lib.js";

function scaleTex() {
  return canvasTex(4096, 256, (g, W, H) => {
    g.fillStyle = "#1a1412";
    g.fillRect(0, 0, W, H);
    // knurl band
    g.fillStyle = "#120d0c";
    for (let x = 0; x < W; x += 16) g.fillRect(x, H * 0.62, 8, H * 0.38);
    g.fillStyle = "#d9d0c6";
    g.font = "600 64px monospace";
    g.textAlign = "center";
    const stops = ["1.4", "2", "2.8", "4", "5.6", "8", "11", "16", "22"];
    stops.forEach((t, i) => {
      const x = (i + 0.5) * (W / 2 / stops.length);
      g.fillText(t, x, H * 0.42);
      g.fillRect(x - 2, H * 0.05, 4, H * 0.12);
    });
    g.fillStyle = "#c8161c";
    g.fillRect(W * 0.62, H * 0.04, 10, H * 0.5);
  }, { color: true });
}

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, exposure: 1.05 });
  const { scene } = st;
  voidSet(st, { env: { rim: 4 }, poolAt: { pos: [0, 16, 3], target: [0, 0, 0], angle: 0.4 } });

  const lens = new THREE.Group();
  const R0 = 0.72, BL = 9;
  const bladeMat = castMetal({ color: 0x3a2f2a, roughness: 0.3, metalness: 0.75, clearcoat: 0.4 });
  for (let i = 0; i < BL; i++) {
    const sh = new THREE.Shape();
    sh.moveTo(-2.85, R0);
    sh.lineTo(1.3, R0);
    sh.quadraticCurveTo(2.35, R0 + 0.55, 2.2, R0 + 1.2);
    sh.quadraticCurveTo(1.9, R0 + 1.85, 1.1, R0 + 2.05);
    sh.lineTo(-1.7, R0 + 1.6);
    sh.quadraticCurveTo(-2.7, R0 + 0.9, -2.85, R0);
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.01, bevelSegments: 2, curveSegments: 24 });
    const b = new THREE.Mesh(geo, bladeMat);
    const holder = new THREE.Group();
    holder.rotation.z = (i / BL) * Math.PI * 2;
    b.position.z = 0.012 * i;
    b.rotation.x = -0.035;
    holder.add(b);
    lens.add(holder);
  }
  // barrel: front ring, scale ring, body
  const prof = [
    [2.9, -3.2], [3.35, -3.2], [3.35, -0.2], [3.42, -0.1], [3.42, 0.55], [3.3, 0.62], [3.0, 0.66], [2.55, 0.7], [2.5, 0.5],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const barrel = new THREE.Mesh(new THREE.LatheGeometry(prof, 160), castMetal({ color: 0x1b1512, roughness: 0.32, clearcoat: 0.5 }));
  barrel.rotation.x = Math.PI / 2;
  lens.add(barrel);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(3.47, 3.47, 0.5, 200, 1, true), new THREE.MeshPhysicalMaterial({ map: scaleTex(), roughness: 0.4, metalness: 0.4, clearcoat: 0.4 }));
  ring.rotation.x = Math.PI / 2;
  ring.rotation.y = 0.9;
  ring.position.z = -0.75;
  lens.add(ring);
  // blades sit inside an inner collar
  const collar = new THREE.Mesh(new THREE.RingGeometry(2.45, 3.0, 160), castMetal({ color: 0x100c0b, roughness: 0.5 }));
  collar.position.z = 0.2;
  lens.add(collar);
  // light of the pour behind the iris
  const light = new THREE.Mesh(new THREE.CircleGeometry(2.5, 96), new THREE.MeshBasicMaterial({ map: pourMap({ core: [0.46, 0.54], spread: 0.32, seed: 17 }), color: new THREE.Color(1.35, 1.1, 1.1) }));
  light.position.z = -1.2;
  lens.add(light);
  // a raking light across the blades so the shingles read
  const rake = new THREE.SpotLight(0xffeee2, 140, 0, 0.32, 0.8, 1.5);
  rake.position.set(-7, 10, 9);
  rake.target.position.set(0, 3.5, 0);
  scene.add(rake, rake.target);

  lens.traverse((o) => { if (o.isMesh && o !== light) { o.castShadow = true; o.receiveShadow = true; } });
  lens.position.set(0, 3.5, 0);
  lens.rotation.y = -0.38;
  lens.rotation.x = -0.05;
  scene.add(lens);

  const cam = camera(st.aspect, { fov: 30, pos: [1.2, 5.0, 16], look: [0.3, 3.3, 0] });
  const out = render({ ...st, camera: cam }, { bloom: { strength: 0.7, radius: 0.55, threshold: 0.8 }, dof: { focus: 15.6, aperture: 0.0016, maxblur: 0.006 } });
  return finish(out, { s, grain: 0.08, vignette: 0.6 });
}
