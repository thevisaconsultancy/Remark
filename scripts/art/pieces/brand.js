// Brand Identity: the mark, its colours and the stamp that sets them down.
// A crimson seal with the R embossed in the studio's display face, a blackened
// hand stamp, a fan of swatch chips (ink, crimson, paper) and the stamp's
// impression printed on the paper floor.
import { THREE, PAL, stage, castMetal, glaze, paperSet, render, finish, camera, canvasTex, shadowed, RoundedBoxGeometry, rng } from "../lib.js";

function markHeight(size, { invert = false, blur = 3 } = {}) {
  return canvasTex(size, size, (g, W, H) => {
    g.fillStyle = invert ? "#fff" : "#000";
    g.fillRect(0, 0, W, H);
    g.filter = `blur(${blur}px)`;
    g.fillStyle = invert ? "#000" : "#fff";
    g.strokeStyle = g.fillStyle;
    g.lineWidth = W * 0.022;
    g.beginPath();
    g.arc(W / 2, H / 2, W * 0.4, 0, Math.PI * 2);
    g.stroke();
    g.font = `${Math.round(W * 0.56)}px Cranio`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("R", W / 2, H * 0.53);
    g.filter = "none";
  });
}

function printTex(size) {
  const r = rng(12);
  return canvasTex(size, size, (g, W, H) => {
    g.clearRect(0, 0, W, H);
    g.fillStyle = "rgba(160,14,20,0.92)";
    g.strokeStyle = g.fillStyle;
    g.lineWidth = W * 0.03;
    g.beginPath();
    g.arc(W / 2, H / 2, W * 0.4, 0, Math.PI * 2);
    g.stroke();
    g.font = `${Math.round(W * 0.56)}px Cranio`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("R", W / 2, H * 0.53);
    // uneven ink: knock out specks where the stamp did not take
    g.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 2600; i++) {
      g.globalAlpha = 0.15 + r() * 0.6;
      g.beginPath();
      g.arc(r() * W, r() * H, r() * W * 0.006 + 0.5, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
    g.globalCompositeOperation = "source-over";
  }, { color: true });
}

function labelTex(text, fg, bg) {
  return canvasTex(512, 768, (g, W, H) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    g.fillStyle = fg;
    g.font = `500 ${Math.round(W * 0.07)}px monospace`;
    g.fillText(text, W * 0.1, H * 0.9);
  }, { color: true });
}

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, bg: PAL.paper, exposure: 1.0 });
  const { scene } = st;
  paperSet(st, { key: { pos: [-10, 9, -4], intensity: 3.2, radius: 16 } });

  // the seal
  const seal = new THREE.Group();
  const height = markHeight(1024);
  const top = glaze({ color: PAL.crimson, roughness: 0.3, clearcoat: 0.9 });
  top.bumpMap = height;
  top.bumpScale = 6;
  const side = glaze({ color: PAL.crimson, roughness: 0.35, clearcoat: 0.6 });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.8, 0.28, 128), [side, top, side]);
  disc.position.y = 0.14;
  seal.add(disc);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.09, 24, 160), side);
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.26;
  seal.add(lip);
  seal.position.set(0.55, 0, 0.9);
  seal.rotation.y = 0.35;
  scene.add(shadowed(seal));

  // the hand stamp, standing
  const stamp = new THREE.Group();
  const pts = [
    [0, 0], [1.25, 0], [1.25, 0.42], [1.05, 0.5], [0.42, 0.62], [0.3, 0.8], [0.3, 1.6], [0.52, 1.85], [0.62, 2.15], [0.52, 2.45], [0.3, 2.58], [0, 2.62],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const lathe = new THREE.LatheGeometry(new THREE.SplineCurve(pts).getPoints(80), 96);
  const body = new THREE.Mesh(lathe, castMetal({ color: 0x1c1512, roughness: 0.28, clearcoat: 0.6 }));
  stamp.add(body);
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.22, 0.06, 96), glaze({ color: PAL.deep, roughness: 0.6, clearcoat: 0 }));
  pad.position.y = 0.03;
  stamp.add(pad);
  stamp.position.set(-2.6, 0, -1.3);
  scene.add(shadowed(stamp));

  // its impression on the paper
  const imp = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 2.7), new THREE.MeshStandardMaterial({ map: printTex(1024), transparent: true, roughness: 0.85, depthWrite: false }));
  imp.rotation.x = -Math.PI / 2;
  imp.rotation.z = 0.25;
  imp.position.set(-2.9, 0.004, 1.9);
  imp.receiveShadow = true;
  scene.add(imp);

  // swatch chips: the palette, fanned from one pin
  const chips = [
    ["INK  #1A1210", "#e6dfd6", "#1a1210", 0x1a1210],
    ["CRIMSON  #B91319", "#f3d9d6", "#b91319", PAL.crimson],
    ["PAPER  #E6DFD6", "#1a1210", "#efe8df", 0xefe8df],
  ];
  chips.forEach(([label, fg, bg], i) => {
    const mat = new THREE.MeshPhysicalMaterial({ map: labelTex(label, fg, bg), roughness: 0.55, clearcoat: 0.3 });
    const edge = new THREE.MeshStandardMaterial({ color: bg, roughness: 0.6 });
    const chip = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 2.25), [edge, edge, mat, edge, edge, edge]);
    const pivot = new THREE.Group();
    chip.position.set(0, 0.03 + i * 0.055, -0.95);
    pivot.add(chip);
    pivot.rotation.y = 0.55 - i * 0.42;
    pivot.position.set(2.9, 0, -0.3);
    scene.add(shadowed(pivot));
  });

  const cam = camera(st.aspect, { fov: 30, pos: [0.8, 11.5, 9.2], look: [0, 0, 0.1] });
  const out = render({ ...st, camera: cam }, { bloom: null, dof: { focus: 14.4, aperture: 0.001, maxblur: 0.004 } });
  return finish(out, { s, grain: 0.07, vignette: 0.16 });
}
