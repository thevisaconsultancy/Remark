// Chatbots: a conversation as two cast pieces on paper. The client's question
// in crimson glaze below; the bot's answer in black ceramic above it, still
// "typing" (three stamped dots).
import { THREE, PAL, stage, castMetal, glaze, paperSet, render, finish, camera, shadowed } from "../lib.js";

function bubble(w, h, r, tail = 1) {
  const s = new THREE.Shape();
  const l = -w / 2, b = -h / 2;
  s.moveTo(l + r, b);
  s.bezierCurveTo(l + r - 0.1, b - 0.35, l + 0.35, b - 0.55, l + 0.1, b - 0.8);
  s.bezierCurveTo(l + 0.75, b - 0.72, l + r + 0.55, b - 0.3, l + r + 1.0, b);
  s.lineTo(l + w - r, b);
  s.quadraticCurveTo(l + w, b, l + w, b + r);
  s.lineTo(l + w, b + h - r);
  s.quadraticCurveTo(l + w, b + h, l + w - r, b + h);
  s.lineTo(l + r, b + h);
  s.quadraticCurveTo(l, b + h, l, b + h - r);
  s.lineTo(l, b + r);
  s.quadraticCurveTo(l, b, l + r, b);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.42, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 8, curveSegments: 48 });
  g.center();
  g.rotateX(-Math.PI / 2);
  return g;
}

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, bg: PAL.paper, exposure: 1.0 });
  const { scene } = st;
  paperSet(st, { key: { pos: [-12, 8, -3], intensity: 3.2, radius: 20 } });

  const ask = new THREE.Mesh(bubble(4.4, 2.5, 1.0, -1), glaze({ color: PAL.crimson, roughness: 0.42, clearcoat: 1 }));
  ask.position.set(1.2, 0.35, 1.1);
  ask.rotation.y = 0.18;
  ask.scale.x = -1; // tail to the right: the client's side of the conversation
  const reply = new THREE.Group();
  const body = new THREE.Mesh(bubble(4.8, 2.7, 1.1, 1), glaze({ color: 0x191311, roughness: 0.22, clearcoat: 1 }));
  reply.add(body);
  [-0.85, 0, 0.85].forEach((x, i) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.27, 48, 24), glaze({ color: i === 2 ? PAL.crimson : 0xe6dfd6, roughness: 0.25 }));
    d.scale.y = 0.45;
    d.position.set(x, 0.36, 0.1);
    reply.add(d);
  });
  reply.position.set(-1.1, 1.55, -1.1);
  reply.rotation.set(0.05, -0.14, 0.02);
  scene.add(shadowed(ask), shadowed(reply));

  const cam = camera(st.aspect, { fov: 30, pos: [3.2, 6.8, 14], look: [0, 0.9, -0.2] });
  const out = render({ ...st, camera: cam }, { bloom: null, dof: { focus: 15.2, aperture: 0.0012, maxblur: 0.005 } });
  return finish(out, { s, grain: 0.07, vignette: 0.18 });
}
