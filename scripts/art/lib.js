// Shared studio for the Foundry series: renderer, light, materials, sets and
// the photographic finish (grain, vignette). Runs in the browser (stage.html).
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export { THREE, RoundedBoxGeometry };

/** The only colours in the series: the red ramp, warm ink and warm paper. */
export const PAL = {
  void: 0x0b0807,
  ink: 0x15100e,
  inkLift: 0x241b18,
  oxblood: 0x2c0005,
  deep: 0x5f000b,
  crimson: 0xb91319,
  bright: 0xc8161c,
  molten: 0xff3522,
  paper: 0xe6dfd6,
  paperShade: 0xcbc0b3,
};

export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function stage({ w, h, s, bg = PAL.void, exposure = 1 }) {
  const W = Math.round(w * s);
  const H = Math.round(h * s);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  return { renderer, scene, W, H, aspect: W / H };
}

function hdr(hex, k) {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k), side: THREE.DoubleSide, toneMapped: false });
}

/**
 * A photographic studio baked into an environment map: a warm key softbox,
 * a thin rim strip, a low crimson bounce (the pour, just out of frame), and a
 * dark room so blacks stay black.
 */
export function studioEnv(renderer, { key = 5, rim = 3, pour = 2.2, room = 0x0c0908, warm = 0xfff1e4, back = 0.6 } = {}) {
  const env = new THREE.Scene();
  const box = new THREE.Mesh(new THREE.BoxGeometry(40, 24, 40), new THREE.MeshBasicMaterial({ color: room, side: THREE.BackSide }));
  env.add(box);
  const add = (mat, w, h, pos, look = [0, 0, 0]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(...pos);
    m.lookAt(...look);
    env.add(m);
  };
  add(hdr(warm, key), 10, 7, [-7, 10, 6]); // key softbox, high left front
  add(hdr(warm, key * 0.35), 14, 3, [0, 11.5, -2], [0, 0, -2]); // overhead scrim
  add(hdr(warm, key * back), 18, 1.6, [0, 9, -14]); // top-back sheet: glancing sheen on flat tops
  add(hdr(warm, rim), 1.2, 14, [11, 3, -8]); // rim strip, back right
  add(hdr(PAL.molten, pour), 16, 2.5, [0, -3, 14]); // crimson pour glow, low front
  add(hdr(0xffe6d6, 0.6), 8, 8, [14, 2, 10]); // soft fill
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return tex;
}

/** Value-noise canvas texture: grain for roughness, bump or subtle albedo. */
export function noiseTex({ size = 512, scale = 3, octaves = 4, seed = 7, contrast = 1, repeat = 1 } = {}) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const img = g.createImageData(size, size);
  const r = rng(seed);
  const grid = [];
  const G = 64;
  for (let i = 0; i < G * G; i++) grid.push(r());
  const at = (x, y) => grid[((y % G) + G) % G * G + (((x % G) + G) % G)];
  const smooth = (t) => t * t * (3 - 2 * t);
  const val = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = at(xi, yi), b = at(xi + 1, yi), c2 = at(xi, yi + 1), d = at(xi + 1, yi + 1);
    return a + (b - a) * xf + (c2 - a) * yf + (a - b - c2 + d) * xf * yf;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = 0, amp = 0.5, f = scale / size, norm = 0;
      for (let o = 0; o < octaves; o++) {
        v += amp * val(x * f, y * f);
        norm += amp;
        amp *= 0.5;
        f *= 2;
      }
      v /= norm;
      v = Math.min(1, Math.max(0, 0.5 + (v - 0.5) * contrast));
      const k = (y * size + x) * 4;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = v * 255;
      img.data[k + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  return t;
}

/** A 2D-canvas texture drawn by `draw(ctx, size)`; used for stamped/embossed marks. */
export function canvasTex(w, h, draw, { color = false } = {}) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// ---------- materials ----------
const grain = { tex: null };
function grainTex() {
  if (!grain.tex) grain.tex = noiseTex({ size: 512, scale: 64, octaves: 3, seed: 11, contrast: 0.7, repeat: 2 });
  return grain.tex;
}

/** Cast, blackened metal: the studio's "ink" in solid form. */
export function castMetal({ color = PAL.inkLift, roughness = 0.42, metalness = 0.85, clearcoat = 0 } = {}) {
  return new THREE.MeshPhysicalMaterial({ color, roughness, metalness, roughnessMap: grainTex(), clearcoat, clearcoatRoughness: 0.2 });
}

/** Glazed crimson: solidified pour with a lacquer skin. */
export function glaze({ color = PAL.crimson, roughness = 0.28, clearcoat = 1, sheen = 0 } = {}) {
  return new THREE.MeshPhysicalMaterial({ color, roughness, metalness: 0.05, clearcoat, clearcoatRoughness: 0.06, sheen, sheenColor: new THREE.Color(PAL.bright) });
}

/** Molten: still-liquid metal, emitting its own light (feeds the bloom). */
let moltenMap = null;
export function molten({ intensity = 1.6, color = PAL.molten, repeat = 1 } = {}) {
  if (!moltenMap) {
    moltenMap = noiseTex({ size: 512, scale: 5, octaves: 5, seed: 21, contrast: 2.2 });
    moltenMap.colorSpace = THREE.SRGBColorSpace;
  }
  const map = moltenMap.clone();
  map.repeat.set(repeat, repeat);
  map.needsUpdate = true;
  return new THREE.MeshPhysicalMaterial({
    color: 0x2a0000,
    emissive: color,
    emissiveIntensity: intensity,
    emissiveMap: map,
    roughness: 0.18,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
}

/** Matte ink surface (the floor of the foundry). */
export function inkSurface({ color = PAL.ink, roughness = 0.7, metalness = 0.1, clearcoat = 0.25, envMapIntensity = 0.35 } = {}) {
  return new THREE.MeshPhysicalMaterial({ color, roughness, metalness, clearcoat, clearcoatRoughness: 0.45, envMapIntensity });
}

export function paperSurface({ color = PAL.paper, roughness = 0.92 } = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, bumpMap: grainTex(), bumpScale: 0.4 });
}

// ---------- sets ----------
/** A seamless studio sweep (cyclorama): floor curving up into the back wall. */
export function sweep(material, { width = 80, depth = 30, radius = 8, height = 30, back = -6 } = {}) {
  const prof = [];
  const N = 48;
  prof.push([depth, 0]);
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * (Math.PI / 2);
    prof.push([back - Math.sin(a) * radius, radius - Math.cos(a) * radius]);
  }
  prof.push([back - radius, height]);
  const cols = 2;
  const pos = [];
  const idx = [];
  const uv = [];
  let len = 0;
  const lens = [0];
  for (let i = 1; i < prof.length; i++) lens.push((len += Math.hypot(prof[i][0] - prof[i - 1][0], prof[i][1] - prof[i - 1][1])));
  prof.forEach(([z, y], i) => {
    for (let c = 0; c < cols; c++) {
      const x = -width / 2 + (c / (cols - 1)) * width;
      pos.push(x, y, z);
      uv.push((x / width) * 6, (lens[i] / width) * 6);
    }
  });
  for (let i = 0; i < prof.length - 1; i++) {
    const a = i * cols, b = (i + 1) * cols;
    idx.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, material);
  m.receiveShadow = true;
  return m;
}

/** Soft key light with a wide, soft shadow. */
export function keyLight(scene, { pos = [-6, 10, 6], target = [0, 0, 0], intensity = 3, color = 0xfff0e2, radius = 18, size = 8, map = 2048 } = {}) {
  const l = new THREE.DirectionalLight(color, intensity);
  l.position.set(...pos);
  l.target.position.set(...target);
  l.castShadow = true;
  l.shadow.mapSize.set(map, map);
  const c = l.shadow.camera;
  c.left = -size; c.right = size; c.top = size; c.bottom = -size; c.near = 0.5; c.far = 60;
  l.shadow.radius = radius;
  l.shadow.blurSamples = 24;
  l.shadow.bias = -0.0004;
  l.shadow.normalBias = 0.02;
  scene.add(l, l.target);
  return l;
}

export function shadowed(obj) {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return obj;
}

// ---------- render + finish ----------
/** Render through bloom (for molten parts) and optional depth of field. */
export function render({ renderer, scene, camera, W, H }, { bloom = { strength: 0.55, radius: 0.6, threshold: 0.9 }, dof = null } = {}) {
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 }));
  composer.setPixelRatio(1);
  composer.setSize(W, H);
  composer.addPass(new RenderPass(scene, camera));
  if (dof) composer.addPass(new BokehPass(scene, camera, { focus: dof.focus, aperture: dof.aperture, maxblur: dof.maxblur ?? 0.008 }));
  if (bloom) composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), bloom.strength, bloom.radius, bloom.threshold));
  composer.addPass(new OutputPass());
  composer.render();
  return renderer.domElement;
}

/**
 * Photographic finish: vignette, film grain at delivered-pixel scale, and an
 * optional 2D overlay pass. Returns a 2D canvas.
 */
export function finish(src, { s = 1, grain = 0.07, vignette = 0.38, tint = null, overlay = null, seed = 5 } = {}) {
  const W = src.width, H = src.height;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  g.drawImage(src, 0, 0);
  if (overlay) overlay(g, W, H);
  if (tint) {
    g.globalCompositeOperation = "soft-light";
    g.fillStyle = tint;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "source-over";
  }
  if (vignette) {
    const v = g.createRadialGradient(W / 2, H * 0.48, Math.min(W, H) * 0.35, W / 2, H / 2, Math.hypot(W, H) * 0.62);
    v.addColorStop(0, "rgba(8,4,3,0)");
    v.addColorStop(1, `rgba(8,4,3,${vignette})`);
    g.fillStyle = v;
    g.fillRect(0, 0, W, H);
  }
  if (grain) {
    const gw = Math.ceil(W / s), gh = Math.ceil(H / s);
    const n = document.createElement("canvas");
    n.width = gw;
    n.height = gh;
    const ng = n.getContext("2d");
    const img = ng.createImageData(gw, gh);
    const r = rng(seed);
    for (let i = 0; i < gw * gh; i++) {
      const v = 128 + (r() + r() + r() - 1.5) * 150;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    ng.putImageData(img, 0, 0);
    g.globalAlpha = grain;
    g.globalCompositeOperation = "overlay";
    g.imageSmoothingEnabled = false;
    g.drawImage(n, 0, 0, W, H);
    g.globalAlpha = 1;
    g.globalCompositeOperation = "source-over";
  }
  return c;
}

export function camera(aspect, { fov = 30, pos = [0, 4, 12], look = [0, 0, 0] } = {}) {
  const cam = new THREE.PerspectiveCamera(fov, aspect, 0.1, 200);
  cam.position.set(...pos);
  cam.lookAt(...look);
  return cam;
}

/** Rounded rectangle as a Shape (or Path for holes), centred at (x, y). */
export function roundRect(x, y, w, h, r, Kind = THREE.Shape) {
  const s = new Kind();
  const l = x - w / 2, b = y - h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(l + r, b);
  s.lineTo(l + w - r, b);
  s.quadraticCurveTo(l + w, b, l + w, b + r);
  s.lineTo(l + w, b + h - r);
  s.quadraticCurveTo(l + w, b + h, l + w - r, b + h);
  s.lineTo(l + r, b + h);
  s.quadraticCurveTo(l, b + h, l, b + h - r);
  s.lineTo(l, b + r);
  s.quadraticCurveTo(l, b, l + r, b);
  return s;
}

/** Extrude a shape upward from y=0 (shape x→world x, shape y→world −z). */
export function extrudeUp(shape, depth, mat, { bevel = 0.03, segs = 3, curve = 24, fitUV = false } = {}) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: segs,
    curveSegments: curve,
  });
  if (fitUV) normalizeUV(g);
  g.rotateX(-Math.PI / 2);
  g.translate(0, bevel, 0);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

/** Rescale a geometry's UVs to 0..1 over their own bounds (for whole-surface textures). */
export function normalizeUV(g) {
  const uv = g.attributes.uv;
  let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
  for (let i = 0; i < uv.count; i++) {
    a = Math.min(a, uv.getX(i)); b = Math.min(b, uv.getY(i));
    c = Math.max(c, uv.getX(i)); d = Math.max(d, uv.getY(i));
  }
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) - a) / (c - a), (uv.getY(i) - b) / (d - b));
  uv.needsUpdate = true;
  return g;
}

/**
 * Emissive map for a pour: a hot core cooling to crimson and then to a dark
 * crust at the rim, with slow convection noise. `core` is [u, v] in 0..1.
 */
export function pourMap({ core = [0.5, 0.5], spread = 0.7, size = 1024, seed = 3, aspect = 1 } = {}) {
  const n = noiseTex({ size: 256, scale: 6, octaves: 5, seed, contrast: 1.6 }).image;
  return canvasTex(size, Math.round(size / aspect), (g, W, H) => {
    const R = Math.hypot(W, H) * spread;
    const grad = g.createRadialGradient(core[0] * W, core[1] * H, 0, core[0] * W, core[1] * H, R);
    grad.addColorStop(0, "#ffd9bf");
    grad.addColorStop(0.07, "#ff7a52");
    grad.addColorStop(0.22, "#f2261a");
    grad.addColorStop(0.55, "#a50c0c");
    grad.addColorStop(1, "#360202");
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "multiply";
    g.globalAlpha = 0.55;
    g.filter = "blur(2px)";
    g.drawImage(n, 0, 0, W, H);
    g.filter = "none";
    g.globalAlpha = 1;
    g.globalCompositeOperation = "source-over";
    // darker skin at the edge where the metal meets the mould
    const e = g.createLinearGradient(0, 0, 0, H);
    g.strokeStyle = "rgba(40,0,0,0.6)";
    g.lineWidth = W * 0.02;
    g.filter = "blur(12px)";
    g.strokeRect(0, 0, W, H);
    g.filter = "none";
  }, { color: true });
}

/** A pour: emissive material driven by a pourMap. */
export function pourMaterial(map, { intensity = 2.2 } = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1a0000,
    emissive: 0xffffff,
    emissiveMap: map,
    emissiveIntensity: intensity,
    roughness: 0.3,
    clearcoat: 0.25,
    clearcoatRoughness: 0.1,
  });
}

/** A soft pool of warm light on the floor under the subject. */
export function pool(scene, { pos = [0, 14, 2], target = [0, 0, 0], intensity = 60, angle = 0.42, color = 0xffe9da } = {}) {
  const l = new THREE.SpotLight(color, intensity, 0, angle, 1, 1.6);
  l.position.set(...pos);
  l.target.position.set(...target);
  scene.add(l, l.target);
  return l;
}

/** The dark register: ink sweep, studio env, key light and a pool on the floor. */
export function voidSet(st, { env = {}, envIntensity = 1.5, floor = 0x0b0807, key = {}, poolAt = {}, sweepAt = {} } = {}) {
  const { scene, renderer } = st;
  scene.background = new THREE.Color(PAL.void);
  scene.environment = studioEnv(renderer, { key: 4, rim: 3, pour: 1.2, back: 0.9, ...env });
  scene.environmentIntensity = envIntensity;
  scene.add(sweep(inkSurface({ color: floor, roughness: 0.8, clearcoat: 0.15, envMapIntensity: 0.12 }), { back: -11, radius: 8, ...sweepAt }));
  keyLight(scene, { pos: [-7, 11, 5], intensity: 2.4, size: 9, ...key });
  pool(scene, { pos: [-2, 16, 1], target: [0, 0, -1], intensity: 320, angle: 0.45, ...poolAt });
}

/** The paper register: warm paper sweep, bright soft studio, long soft shadows. */
export function paperSet(st, { env = {}, envIntensity = 1.0, floor = PAL.paper, key = {}, sweepAt = {} } = {}) {
  const { scene, renderer } = st;
  scene.background = new THREE.Color(floor);
  scene.environment = studioEnv(renderer, { key: 3, rim: 1.5, pour: 0.5, back: 0.8, room: 0x8a8078, ...env });
  scene.environmentIntensity = envIntensity;
  scene.add(sweep(paperSurface({ color: floor }), { back: -9, radius: 9, ...sweepAt }));
  scene.add(new THREE.HemisphereLight(0xfff6ee, 0x8a7c70, 0.6));
  keyLight(scene, { pos: [-8, 12, 6], intensity: 2.6, size: 10, radius: 24, ...key });
}
