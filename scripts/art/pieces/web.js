// Web Development: a web page as a casting mould. Browser bar, hero, three
// columns and a footer are cut into a blackened plate; the hero is still
// molten, the columns have set into glazed crimson.
import { THREE, PAL, stage, studioEnv, castMetal, glaze, molten, pourMap, pourMaterial, inkSurface, voidSet, render, finish, camera, roundRect, extrudeUp, RoundedBoxGeometry } from "../lib.js";

export default async function ({ w, h, s }) {
  const st = stage({ w, h, s, bg: PAL.void, exposure: 1.05 });
  const { scene, renderer } = st;
  voidSet(st);

  const PW = 8, PH = 5.4, T = 0.36; // plate width, depth (page height), thickness
  const page = new THREE.Group();
  // cells in page units: [u0, v0, u1, v1] (v from the top of the page)
  const pad = 0.035;
  const cells = {
    bar: [pad, 0.035, 1 - pad, 0.1],
    hero: [pad, 0.14, 1 - pad, 0.56],
    c1: [pad, 0.6, 0.34, 0.9],
    c2: [0.36, 0.6, 0.64, 0.9],
    c3: [0.66, 0.6, 1 - pad, 0.9],
    foot: [pad, 0.93, 1 - pad, 0.965],
  };
  const rect = ([u0, v0, u1, v1], Kind, inset = 0) => {
    const cx = (u0 + u1) / 2 * PW - PW / 2, cy = PH / 2 - (v0 + v1) / 2 * PH;
    return roundRect(cx, cy, (u1 - u0) * PW - inset * 2, (v1 - v0) * PH - inset * 2, 0.09, Kind);
  };
  const plate = roundRect(0, 0, PW, PH, 0.22);
  for (const k of Object.keys(cells)) if (k !== "bar" && k !== "foot") plate.holes.push(rect(cells[k], THREE.Path));
  const metal = castMetal({ color: 0x1d1714, roughness: 0.38 });
  const base = extrudeUp(plate, T, metal, { bevel: 0.035 });
  page.add(base);
  const floor = extrudeUp(roundRect(0, 0, PW - 0.1, PH - 0.1, 0.2), 0.08, metal, { bevel: 0.02 });
  page.add(floor);

  // browser bar: three stamped dots and an address field, raised
  const barC = (cells.bar[1] + cells.bar[3]) / 2;
  const barZ = -(PH / 2 - barC * PH);
  [0, 1, 2].forEach((i) => {
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 40), i === 0 ? glaze() : castMetal({ color: 0x2a211d }));
    d.position.set(-PW / 2 + 0.36 + i * 0.26, T + 0.07, barZ);
    page.add(d);
  });
  const addr = new THREE.Mesh(new RoundedBoxGeometry(2.6, 0.05, 0.18, 3, 0.025), castMetal({ color: 0x2a211d, roughness: 0.5 }));
  addr.position.set(-0.4, T + 0.06, barZ);
  page.add(addr);
  const nav = [2.3, 2.75, 3.2].map((x) => {
    const n = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.04, 0.06, 2, 0.02), castMetal({ color: 0x2a211d }));
    n.position.set(x, T + 0.06, barZ);
    page.add(n);
  });

  // hero: still molten, with the headline and a button floating as set slugs
  const heroShape = rect(cells.hero, THREE.Shape, 0.005);
  const pour = extrudeUp(heroShape, T * 0.72, pourMaterial(pourMap({ core: [0.78, 0.4], spread: 0.55, aspect: 2.2 }), { intensity: 1.25 }), { bevel: 0, fitUV: true });
  page.add(pour);
  const hz = -(PH / 2 - (cells.hero[1] + (cells.hero[3] - cells.hero[1]) * 0.36) * PH);
  const slug = (wid, x, z, hgt = 0.14) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(wid, 0.12, hgt, 3, 0.04), castMetal({ color: 0x191310, roughness: 0.3 }));
    m.position.set(x, T * 0.72 + 0.05, z);
    m.castShadow = true;
    page.add(m);
  };
  slug(3.6, -PW / 2 + 0.55 + 1.8, hz, 0.3);
  slug(2.6, -PW / 2 + 0.55 + 1.3, hz + 0.46, 0.3);
  slug(1.3, -PW / 2 + 0.55 + 0.65, hz + 1.02, 0.22);
  const btn = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.12, 0.26, 4, 0.12), glaze({ color: PAL.deep }));
  btn.position.set(-PW / 2 + 0.55 + 0.5 + 1.45, T * 0.72 + 0.05, hz + 1.02);
  page.add(btn);

  // three columns: set glaze at slightly different levels, with a cast line of "copy"
  ["c1", "c2", "c3"].forEach((k, i) => {
    const fill = extrudeUp(rect(cells[k], THREE.Shape, 0.005), T * (0.55 + i * 0.1), glaze({ color: i === 1 ? PAL.crimson : PAL.deep, roughness: 0.34, clearcoat: 0.5 }), { bevel: 0 });
    page.add(fill);
  });
  // footer rule
  const f = new THREE.Mesh(new RoundedBoxGeometry(PW - 0.6, 0.04, 0.05, 2, 0.02), castMetal({ color: 0x2a211d }));
  f.position.set(0, T + 0.05, -(PH / 2 - 0.9475 * PH));
  page.add(f);

  page.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  page.rotation.y = -0.32;
  page.position.set(0.3, 0, 0.2);
  scene.add(page);

  // the pour lights its own mould
  const glow = new THREE.PointLight(PAL.molten, 2.2, 7, 1.5);
  glow.position.set(-1, 0.9, -1.2);
  scene.add(glow);

  const cam = camera(st.aspect, { fov: 26, pos: [4.6, 10.5, 15], look: [0, 0.1, -0.6] });
  const out = render({ ...st, camera: cam }, { bloom: { strength: 0.5, radius: 0.55, threshold: 0.85 }, dof: { focus: 18.2, aperture: 0.0016, maxblur: 0.006 } });
  return finish(out, { s, grain: 0.08, vignette: 0.6 });
}
