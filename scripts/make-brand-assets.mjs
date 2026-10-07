// Generates the favicon set, app icons and Open Graph cards from the logo artwork
// (public/rs logo.png). Outputs are committed; re-run after a logo or copy change:
//   node scripts/make-brand-assets.mjs
//
// Icon: the R of the REMARK wordmark crossed by the S of the red "Studio" script,
// both cut straight from the logo so the mark matches it stroke for stroke.
// OG cards: 1200x630, the real wordmark plus page copy set in the site's fonts.
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const at = (p) => path.join(root, p);
const write = async (p, data) => {
  await fs.writeFile(at(p), data);
  console.log("wrote", p);
};

// Brand tokens from globals.css, as hex / rgb.
const C = { void: "#090706", fg: "#f6f3ef", muted: "#c4bcb6", subtle: "#9b928c", red: [185, 19, 25] };

/* ---------------- Cut the R and the script S out of the logo ---------------- */

const logo = await sharp(at("public/rs logo.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: LW, height: LH } = logo.info;
const k = LW / 1200; // crop coordinates below are measured on a 1200px-wide copy

/** Copy a region of the logo, keeping only pixels `keep(r, g, x, y)` accepts (x, y in 1200-scale, crop-relative). */
async function cut(x0, y0, w, h, keep, tint) {
  const left = Math.round(x0 * k), top = Math.round(y0 * k);
  const width = Math.min(Math.round(w * k), LW - left), height = Math.min(Math.round(h * k), LH - top);
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = ((top + y) * LW + left + x) * 4, o = (y * width + x) * 4;
      const [r, g, b, a] = logo.data.subarray(i, i + 4);
      if (!keep(r, g, x / k, y / k)) continue;
      [out[o], out[o + 1], out[o + 2]] = tint;
      out[o + 3] = a;
    }
  return sharp(out, { raw: { width, height, channels: 4 } }).trim().png().toBuffer();
}

// R: first letter of REMARK (white strokes only).
const R = await cut(0, 0, 120, 165, (r, g) => r <= g + 60, [246, 243, 239]);
// S: red strokes only; the bands cut it free where it joins the "t" (x limit per y band).
const S = await cut(660, 95, 200, 221, (r, g, x, y) => {
  const lim = y < 64 ? 195 : y < 100 ? 132 : y < 172 ? 162 : y < 200 ? 145 : 135;
  return r > g + 60 && x <= lim;
}, C.red);

/** 512px icon. `radius` 0 = full bleed (Apple, maskable); `scale` < 1 pulls the mark into the maskable safe zone. */
async function icon({ radius = 0, scale = 1 } = {}) {
  const s = (n) => Math.round(n * scale);
  const r = await sharp(R).resize({ height: s(300) }).toBuffer();
  const sc = await sharp(S).resize({ height: s(300) }).toBuffer();
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="${radius}" fill="${C.void}"/></svg>`);
  // Same relationship as the logo: the script swings across the foot of the capital.
  return sharp(bg)
    .composite([
      { input: r, left: 256 - s(165), top: 256 - s(170) },
      { input: sc, left: 256 - s(50), top: 256 - s(118) },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const png = (buf, width) => sharp(buf).resize(width).png({ compressionLevel: 9 }).toBuffer();

const round = await icon({ radius: 112 });
const bleed = await icon();
const maskable = await icon({ scale: 0.8 });

await write("src/app/icon.png", round);
await write("src/app/apple-icon.png", await png(bleed, 180));
await write("public/icon-192.png", await png(round, 192));
await write("public/icon-512.png", round);
await write("public/icon-maskable-512.png", maskable);

// favicon.ico: PNG-in-ICO (16/32/48) for crawlers and browsers that ask for /favicon.ico directly.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((n) => png(round, n)));
const ico = Buffer.alloc(6 + 16 * icoSizes.length);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(icoSizes.length, 4);
let offset = ico.length;
icoSizes.forEach((n, i) => {
  const e = 6 + 16 * i;
  ico.writeUInt8(n, e);
  ico.writeUInt8(n, e + 1);
  ico.writeUInt16LE(1, e + 4);
  ico.writeUInt16LE(32, e + 6);
  ico.writeUInt32LE(icoPngs[i].length, e + 8);
  ico.writeUInt32LE(offset, e + 12);
  offset += icoPngs[i].length;
});
await write("src/app/favicon.ico", Buffer.concat([ico, ...icoPngs]));

/* ---------------- Open Graph cards ---------------- */

const fonts = [
  { name: "Cranio", data: await fs.readFile(at("src/app/fonts/Cranio/CranioRegular-WpD9n.otf")) },
  { name: "Mifetro", data: await fs.readFile(at("src/app/fonts/Mifetro/MifetroRegular-rvOly.ttf")) },
];
const wordmark = `data:image/png;base64,${(await sharp(at("public/rs logo.png")).resize(900).png().toBuffer()).toString("base64")}`;

/** Satori takes React-shaped objects; every box is flex. */
const el = (type, style, ...children) => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.length === 1 ? children[0] : children },
});
const img = (width, height) => ({ type: "img", props: { src: wordmark, width, height, style: { width, height } } });

/** One card per route. `title` null = the home card, which leads with the wordmark. */
const CARDS = [
  { dir: "src/app", kicker: "Digital studio · Islamabad", title: null, line: "Websites, AI voice agents, chatbots, CRM systems and brands, designed and built in one studio." },
  { dir: "src/app/services", kicker: "Services", title: "Seven things we build", line: "Web development, AI voice agents, chatbots, CRM and ERP, brand identity, marketing and production." },
  { dir: "src/app/work", kicker: "Work", title: "The Visa Consultancy CRM", line: "Six modules that run a consultancy's day, from first lead to commission. Plus three websites." },
  { dir: "src/app/about", kicker: "About", title: "Marked before it ships", line: "A design studio in Islamabad that happens to code. Every piece is tested against four questions." },
  { dir: "src/app/contact", kicker: "Contact", title: "Start a project", line: "Embassy Gardens, Bahria Enclave, Islamabad · +92 326 8450001" },
];

for (const card of CARDS) {
  const node = el(
    "div",
    {
      width: 1200, height: 630, background: C.void, color: C.fg, flexDirection: "column", justifyContent: "space-between",
      padding: "64px 72px", fontFamily: "Mifetro",
      backgroundImage: "radial-gradient(circle at 92% 108%, rgba(185,19,25,0.55) 0%, rgba(44,0,5,0.35) 32%, rgba(9,7,6,0) 62%)",
    },
    el("div", { alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: C.muted },
      el("div", { width: 40, height: 3, background: "rgb(185,19,25)" }),
      card.kicker,
    ),
    card.title
      ? el("div", { flexDirection: "column", gap: 24, maxWidth: 1000 },
          el("div", { fontFamily: "Cranio", fontSize: 92, lineHeight: 1.02, letterSpacing: -1 }, card.title),
          el("div", { fontSize: 30, lineHeight: 1.4, color: C.muted, maxWidth: 900 }, card.line),
        )
      : el("div", { flexDirection: "column", gap: 36 },
          img(760, 200),
          el("div", { fontSize: 32, lineHeight: 1.4, color: C.muted, maxWidth: 900 }, card.line),
        ),
    el("div", { justifyContent: card.title ? "space-between" : "flex-end", alignItems: "flex-end", fontSize: 24, color: C.subtle },
      ...(card.title ? [img(304, 80)] : []),
      el("div", { letterSpacing: 2 }, "remarkstudio.tech"),
    ),
  );
  const out = Buffer.from(await new ImageResponse(node, { width: 1200, height: 630, fonts }).arrayBuffer());
  await write(`${card.dir}/opengraph-image.png`, await sharp(out).png({ compressionLevel: 9, palette: true, quality: 95 }).toBuffer());
  await write(`${card.dir}/opengraph-image.alt.txt`, card.title ? `${card.title}, Remark Studio` : "Remark Studio, digital studio in Islamabad");
}
