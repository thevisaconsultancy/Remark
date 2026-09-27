// "Dhoop — poured at sunrise": six frames of a sample brand film for a
// fictional coffee roaster (the Services page's edit-timeline visual).
// One set, six set-ups: wide pour, bean macro, crema from above, pour close-up,
// cup against the sun, and the stamped bag as the end card.
import { THREE, PAL, stage, castMetal, glaze, inkSurface, sweep, keyLight, studioEnv, pourMap, render, finish, camera, canvasTex, shadowed, rng, RoundedBoxGeometry } from "../lib.js";

function cremaTex() {
  const r = rng(31);
  return canvasTex(1024, 1024, (g, W, H) => {
    const c = W / 2;
    const grad = g.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, "#5a2412");
    grad.addColorStop(0.55, "#7a3718");
    grad.addColorStop(0.86, "#a45a2a");
    grad.addColorStop(0.97, "#3a1409");
    grad.addColorStop(1, "#1a0805");
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
    // the pour's spiral
    g.strokeStyle = "rgba(40,10,4,0.55)";
    g.lineWidth = 10;
    g.filter = "blur(6px)";
    g.beginPath();
    for (let t = 0; t < 22; t += 0.02) {
      const rad = t * 18;
      g.lineTo(c + Math.cos(t) * rad, c + Math.sin(t) * rad);
    }
    g.stroke();
    g.filter = "none";
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(${200 + r() * 40},${130 + r() * 40},${80 + r() * 30},${r() * 0.25})`;
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * c * 0.9;
      g.beginPath();
      g.arc(c + Math.cos(a) * d, c + Math.sin(a) * d, r() * 5 + 1, 0, Math.PI * 2);
      g.fill();
    }
    g.filter = "none";
  }, { color: true });
}

function sunTex() {
  return canvasTex(1024, 1024, (g, W, H) => {
    const c = W / 2;
    const grad = g.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, "rgba(255,244,228,1)");
    grad.addColorStop(0.12, "rgba(255,196,150,1)");
    grad.addColorStop(0.3, "rgba(255,92,52,1)");
    grad.addColorStop(0.46, "rgba(214,30,24,1)");
    grad.addColorStop(0.5, "rgba(170,16,16,0.55)");
    grad.addColorStop(0.7, "rgba(120,10,10,0.18)");
    grad.addColorStop(1, "rgba(60,4,4,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
  }, { color: true });
}

function bagTex() {
  return canvasTex(1024, 1400, (g, W, H) => {
    g.fillStyle = "#e6dfd6";
    g.fillRect(0, 0, W, H);
    g.fillStyle = "#b91319";
    g.font = `${Math.round(W * 0.34)}px Cranio`;
    g.textAlign = "center";
    g.fillText("dhoop", W / 2, H * 0.47);
    g.font = `600 ${Math.round(W * 0.05)}px monospace`;
    g.fillStyle = "#1a1210";
    g.fillText("POURED AT SUNRISE", W / 2, H * 0.6);
    g.fillText("SINGLE ORIGIN · 250 G", W / 2, H * 0.86);
    g.fillStyle = "#b91319";
    g.fillRect(W * 0.42, H * 0.64, W * 0.16, 6);
  }, { color: true });
}

function bean(mat, crease) {
  const b = new THREE.Group();
  const half = new THREE.SphereGeometry(1, 28, 18, 0, Math.PI);
  [1, -1].forEach((sgn) => {
    const m = new THREE.Mesh(half, mat);
    m.rotation.y = sgn > 0 ? 0 : Math.PI;
    m.position.x = sgn * 0.03;
    m.scale.set(0.97, 1, 1);
    b.add(m);
  });
  const c = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.55, 0.3), crease);
  c.position.z = 0.9;
  b.add(c);
  b.scale.set(0.34, 0.5, 0.26);
  return b;
}

export default async function ({ w, h, s, variant }) {
  const v = +variant || 1;
  const st = stage({ w, h, s, exposure: { 2: 0.85, 4: 0.9, 5: 0.95 }[v] ?? 1.05 });
  const { scene, renderer } = st;
  scene.background = new THREE.Color(0x0e0907);
  scene.environment = studioEnv(renderer, { key: 2.5, rim: 5, pour: 2.2, back: 1.2, warm: 0xffe2c8 });
  scene.environmentIntensity = 1.2;
  scene.add(sweep(inkSurface({ color: 0x120c09, roughness: 0.6, clearcoat: 0.2, envMapIntensity: 0.15 }), { back: -18, radius: 10 }));

  // the sun: a molten disc low behind the table, and the light it throws
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: sunTex(), transparent: true, depthWrite: false, color: new THREE.Color(1.25, 1.1, 1.05) }));
  const sunR = v === 5 ? 13 : 16;
  sun.scale.set(sunR, sunR, 1);
  sun.position.set(v === 5 ? 0.3 : -5.5, v === 5 ? 3.2 : 3.2, -17.5);
  scene.add(sun);
  const sunLight = keyLight(scene, { pos: [-6, 4.2, -12], target: [0, 0.5, 0], intensity: 2.6, color: 0xffb08a, size: 7, radius: 10 });
  keyLight(scene, { pos: [7, 9, 8], intensity: v === 5 ? 0.25 : 0.9, color: 0xffe9da, size: 7, radius: 22 });
  sunLight.shadow.bias = -0.0008;

  // the cup
  const cupProf = [[0, 0.02], [0.72, 0.02], [0.8, 0.08], [0.86, 0.5], [0.98, 1.55], [1.02, 1.68], [0.95, 1.68], [0.9, 1.55], [0.78, 0.5], [0.7, 0.14], [0, 0.14]].map(([x, y]) => new THREE.Vector2(x, y));
  const cup = new THREE.Group();
  cup.add(new THREE.Mesh(new THREE.LatheGeometry(cupProf, 128), glaze({ color: PAL.crimson, roughness: 0.26, clearcoat: 1 })));
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.93, 96), new THREE.MeshPhysicalMaterial({ map: cremaTex(), roughness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.15 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 1.44;
  cup.add(coffee);
  const cupPos = { 1: [1.6, 0, 0.3], 2: [3.4, 0, -3], 3: [0, 0, 0], 4: [0, 0, 0], 5: [0.3, 0, -1.5], 6: [2.6, 0, -1.2] }[v];
  cup.position.set(...cupPos);
  scene.add(shadowed(cup));

  // the pour
  if (v === 1 || v === 4 || v === 3) {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      pts.push(new THREE.Vector3(cupPos[0] - 0.25 + Math.sin(t * 9) * 0.012, 1.45 + (1 - t) * 7, cupPos[2] + 0.05 - t * 0.1));
    }
    const stream = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.035, 16),
      new THREE.MeshPhysicalMaterial({ color: 0x4a1406, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.02, emissive: 0x6a1a08, emissiveIntensity: 0.35 }),
    );
    scene.add(shadowed(stream));
  }

  // beans
  const rand = rng(7 + v);
  const beanMat = new THREE.MeshPhysicalMaterial({ color: 0x2c140b, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const crease = new THREE.MeshStandardMaterial({ color: 0x0c0503, roughness: 0.9 });
  const beanN = v === 2 ? 90 : v === 6 ? 40 : 26;
  const spread = v === 2 ? [4.5, 2.6, -0.2, 0.4] : v === 6 ? [3.5, 2, 0, 0.6] : [4, 2.4, -1.4, 1.1];
  for (let i = 0; i < beanN; i++) {
    const b = bean(beanMat, crease);
    const x = spread[2] + (rand() - 0.5) * spread[0] * 2, z = spread[3] + (rand() - 0.5) * spread[1] * 2;
    if (Math.hypot(x - cupPos[0], z - cupPos[2]) < 1.3) continue;
    b.position.set(x, 0.12, z);
    b.rotation.set(Math.PI / 2 + (rand() - 0.5) * 0.5, 0, rand() * Math.PI * 2);
    if (rand() < 0.35) b.rotation.x = -Math.PI / 2;
    scene.add(shadowed(b));
  }

  // the bag, for the end card
  if (v === 6) {
    const bagMat = new THREE.MeshPhysicalMaterial({ map: bagTex(), roughness: 0.8, sheen: 0.4, sheenColor: new THREE.Color(0xffffff) });
    const edge = new THREE.MeshStandardMaterial({ color: 0xe0d8ce, roughness: 0.85 });
    const bag = new THREE.Mesh(new RoundedBoxGeometry(2.4, 3.3, 1.1, 4, 0.08), [edge, edge, edge, edge, bagMat, edge]);
    bag.position.set(-0.6, 1.65, -0.4);
    bag.rotation.y = 0.18;
    scene.add(shadowed(bag));
  }

  const shots = {
    1: { fov: 26, pos: [-1.2, 3.1, 11.5], look: [0.4, 1.9, -1.5], focus: 11.6, ap: 0.0024 },
    2: { fov: 22, pos: [0.4, 1.3, 4.4], look: [0, 0.1, 0], focus: 4.3, ap: 0.006 },
    3: { fov: 24, pos: [0.05, 9, 0.6], look: [0, 1.4, 0], focus: 7.6, ap: 0.004 },
    4: { fov: 18, pos: [2.2, 2.6, 5.6], look: [-0.1, 2.0, 0], focus: 6.1, ap: 0.004 },
    5: { fov: 20, pos: [0.3, 1.2, 12], look: [0.3, 1.9, -4], focus: 13.4, ap: 0.0025 },
    6: { fov: 24, pos: [1.2, 3.4, 10], look: [0.4, 1.4, -0.6], focus: 10.6, ap: 0.0025 },
  }[v];
  const cam = camera(st.aspect, { fov: shots.fov, pos: shots.pos, look: shots.look });
  const out = render({ ...st, camera: cam }, { bloom: v === 1 || v === 5 ? { strength: 0.45, radius: 0.6, threshold: 0.92 } : { strength: 0.18, radius: 0.3, threshold: 0.95 }, dof: { focus: shots.focus, aperture: shots.ap, maxblur: 0.01 } });
  return finish(out, { s, grain: v === 1 ? 0.09 : 0.05, vignette: 0.55, seed: 40 + v });
}
