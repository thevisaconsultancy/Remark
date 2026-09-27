// Generates public/rs-logo-ink.png: the Remark Studio wordmark recoloured for paper.
// The source logo (public/rs logo.png) is a white wordmark with a red "Studio" script,
// which disappears on the warm paper register. This keeps the red script untouched and
// recolours the white/grey (low-saturation, high-lightness) pixels to Foundry Ink #1A1210,
// keeping each pixel's alpha so the anti-aliased edges stay smooth.
//
// Usage: node scripts/make-ink-logo.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "rs logo.png");
const out = path.join(root, "public", "rs-logo-ink.png");

const INK = { r: 0x1a, g: 0x12, b: 0x10 };
const WIDTH = 1200;

const { data, info } = await sharp(src)
  .resize({ width: WIDTH })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// The script red, sampled from the source (opaque script pixels sit around rgb(150, 5, 5)).
const RED = { r: 150, g: 5, b: 5 };

for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] === 0) continue;
  const r = data[i] / 255;
  const g = data[i + 1] / 255;
  const b = data[i + 2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const chroma = max - min;
  const saturation = chroma === 0 ? 0 : chroma / (1 - Math.abs(2 * lightness - 1));

  // White wordmark (and its grey anti-aliasing): low saturation, high lightness.
  if (saturation < 0.25 && lightness > 0.45) {
    data[i] = INK.r;
    data[i + 1] = INK.g;
    data[i + 2] = INK.b;
    continue;
  }

  // Pink seam pixels where the red script anti-aliases into the white wordmark:
  // re-mix them between red and ink so no pale halo is left on paper.
  // The blue channel says how much white is in the mix (script red has almost none).
  const white = Math.min(1, Math.max(0, (data[i + 2] - RED.b) / (255 - RED.b)));
  if (white < 0.04) continue; // the red script itself stays untouched
  data[i] = Math.round(white * INK.r + (1 - white) * RED.r);
  data[i + 1] = Math.round(white * INK.g + (1 - white) * RED.g);
  data[i + 2] = Math.round(white * INK.b + (1 - white) * RED.b);
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Wrote ${path.relative(root, out)} (${info.width}x${info.height})`);
