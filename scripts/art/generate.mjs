// Remark Studio: "The Foundry" artwork series, generated in code.
//
// Every image in public/art/ is rendered here from three.js scenes (see ./pieces)
// in headless Chromium, supersampled, then written as optimised WebP with sharp.
// Nothing is downloaded or sampled from elsewhere: re-running this script
// reproduces the whole series byte-for-byte modulo the encoder.
//
// Usage (Playwright must be resolvable; set PLAYWRIGHT_DIR or NODE_PATH if it
// is not installed in the repo):
//   node scripts/art/generate.mjs              # render the whole series
//   node scripts/art/generate.mjs web crm      # render only these pieces (by out name or piece)
//   CHROMIUM=/path/to/chrome node scripts/art/generate.mjs
//
// Output: public/art/<out>.webp (and a PNG preview in scripts/art/.preview when
// ART_PREVIEW=1).

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT_DIR = path.join(ROOT, "public/art");
const require = createRequire(import.meta.url);

/** The series. `w`/`h` are the delivered pixel size; `kb` is the ceiling per file. */
export const SERIES = [
  // Seven service plates (4:3). Used by the home page's closing section and TrustStrip.
  { out: "service-web-development", piece: "web", w: 1200, h: 900, kb: 160 },
  { out: "service-ai-voice-agents", piece: "voice", w: 1200, h: 900, kb: 160 },
  { out: "service-chatbots", piece: "chat", w: 1200, h: 900, kb: 160 },
  { out: "service-crm-erp", piece: "crm", w: 1200, h: 900, kb: 160, variant: "plate" },
  { out: "service-brand-identity", piece: "brand", w: 1200, h: 900, kb: 160 },
  { out: "service-digital-marketing", piece: "growth", w: 1200, h: 900, kb: 160 },
  { out: "service-creative-production", piece: "lens", w: 1200, h: 900, kb: 160 },
  // The CRM case-study plate (wide) for the home page's lead work.
  { out: "work-crm", piece: "crm", w: 1800, h: 1100, kb: 200, variant: "wide" },
  // "Dhoop, poured at sunrise": frames of a sample brand film for the Services
  // page's edit-timeline visual. Frame 1 doubles as the viewer still.
  { out: "film-dhoop-01", piece: "film", variant: "1", w: 1600, h: 800, kb: 170 },
  { out: "film-dhoop-02", piece: "film", variant: "2", w: 480, h: 240, kb: 40 },
  { out: "film-dhoop-03", piece: "film", variant: "3", w: 480, h: 240, kb: 40 },
  { out: "film-dhoop-04", piece: "film", variant: "4", w: 480, h: 240, kb: 40 },
  { out: "film-dhoop-05", piece: "film", variant: "5", w: 480, h: 240, kb: 40 },
  { out: "film-dhoop-06", piece: "film", variant: "6", w: 480, h: 240, kb: 40 },
];

const SERVE = ["/scripts/art/", "/node_modules/three/", "/src/app/fonts/", "/public/fonts/"];
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".otf": "font/otf", ".ttf": "font/ttf", ".json": "application/json" };

function resolveDep(name) {
  const paths = [ROOT, process.cwd(), process.env.PLAYWRIGHT_DIR, ...(process.env.NODE_PATH || "").split(path.delimiter)].filter(Boolean);
  return require(require.resolve(name, { paths }));
}

function serve() {
  const server = http.createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!SERVE.some((p) => url.startsWith(p)) || url.includes("..")) {
      res.writeHead(404).end();
      return;
    }
    try {
      const body = await fs.readFile(path.join(ROOT, url));
      res.writeHead(200, { "content-type": TYPES[path.extname(url)] || "application/octet-stream" }).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function encode(sharp, png, { w, h, kb }) {
  const base = sharp(png).resize(w, h, { fit: "cover", kernel: "lanczos3" });
  for (let q = 84; q >= 50; q -= 4) {
    const buf = await base.clone().webp({ quality: q, effort: 6, smartSubsample: true }).toBuffer();
    if (buf.length <= kb * 1024) return { buf, q };
  }
  const buf = await base.clone().webp({ quality: 46, effort: 6 }).toBuffer();
  return { buf, q: 46 };
}

async function main() {
  const only = process.argv.slice(2);
  const jobs = SERIES.filter((j) => !only.length || only.includes(j.out) || only.includes(j.piece));
  const { chromium } = resolveDep("playwright");
  const sharp = resolveDep("sharp");
  await fs.mkdir(OUT_DIR, { recursive: true });
  const server = await serve();
  const port = server.address().port;
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium",
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  try {
    for (const job of jobs) {
      const t0 = Date.now();
      const s = job.w > 1000 ? 1.5 : 2.5; // supersample factor
      const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
      page.on("pageerror", (e) => console.error("  pageerror", e.message));
      page.on("console", (m) => m.type() === "error" && console.error("  console", m.text()));
      const hash = new URLSearchParams({ piece: job.piece, w: job.w, h: job.h, s, variant: job.variant || "" });
      await page.goto(`http://127.0.0.1:${port}/scripts/art/stage.html#${hash}`);
      await page.waitForFunction(() => window.__result || window.__error, null, { timeout: 300000 });
      const err = await page.evaluate(() => window.__error);
      if (err) throw new Error(`${job.out}: ${err}`);
      const data = await page.evaluate(() => window.__result);
      await page.close();
      const png = Buffer.from(data.split(",")[1], "base64");
      if (process.env.ART_PREVIEW) {
        await fs.mkdir(path.join(HERE, ".preview"), { recursive: true });
        await sharp(png).resize(job.w, job.h).png().toFile(path.join(HERE, ".preview", `${job.out}.png`));
      }
      const { buf, q } = await encode(sharp, png, job);
      await fs.writeFile(path.join(OUT_DIR, `${job.out}.webp`), buf);
      console.log(`${job.out}.webp  ${job.w}x${job.h}  q${q}  ${(buf.length / 1024).toFixed(0)}KB  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
