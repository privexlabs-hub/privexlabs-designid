/**
 * Regenerates the derived brand assets in public/brand.
 *
 * The eight files imported from the design system (mark, logo, favicon, avatar and their
 * dark/mono variants) are the originals and are not touched. This script authors the
 * additional variants the brand kit needs — white lockups, wordmark-only files, the dark
 * favicon tile and the eight avatar treatments — and rasterises the PNG set.
 *
 *   npm run assets
 */

import fs from "node:fs/promises";
import sharp from "sharp";

const B = "public/brand";
const V = "#0E5A4A", VD = "#3FA98D", BRASS = "#C0912F", BRASSD = "#D8A945",
      INK = "#0C110F", PAPER = "#FCFDFB", ONBRAND = "#F2F7F4", TEXT = "#141B18", TEXTINV = "#E9EDE8";

// Boundary square, orthogonal "P" trace, brass signal node. Never redrawn.
const glyph = (stroke, node) => `<rect x="3.5" y="3.5" width="41" height="41" rx="9" stroke="${stroke}" stroke-width="3"></rect>
<path d="M18 35 V13 H31.5 V24 H22" stroke="${stroke}" stroke-width="3"></path>
<rect x="19" y="21" width="6" height="6" fill="${node}"></rect>`;

const lockup = (stroke, node, a, b) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 48" fill="none">
${glyph(stroke, node)}
<text x="60" y="33" font-family="Archivo, system-ui, sans-serif" font-size="27" font-weight="800" letter-spacing="-0.5" fill="${a}">Privex<tspan fill="${b}">Labs</tspan></text>
</svg>`;

const wordmark = (a, b) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 48" fill="none">
<text x="0" y="33" font-family="Archivo, system-ui, sans-serif" font-size="27" font-weight="800" letter-spacing="-0.5" fill="${a}">Privex<tspan fill="${b}">Labs</tspan></text>
</svg>`;

const avatar = (bg, stroke, node, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none">
${bg ? `<rect width="400" height="400" fill="${bg}"></rect>` : ""}${extra}
<g transform="translate(104,104) scale(4)">
${glyph(stroke, node)}
</g>
</svg>`;

// Campaign variant: concentric hairline rings — the registration motif. No gradients, per governance.
const rings = ["#123F35", "#0F362D", "#0C2D26"]
  .map((c, i) => `<circle cx="200" cy="200" r="${190 - i * 34}" stroke="${c}" stroke-width="1.5" fill="none"></circle>`)
  .join("\n");

const files = {
  "mark-white.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">${glyph("#FFFFFF", "#FFFFFF")}</svg>`,
  "logo-white.svg": lockup("#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"),
  "wordmark.svg": wordmark(TEXT, V),
  "wordmark-dark.svg": wordmark(TEXTINV, VD),
  "wordmark-mono.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 48" fill="none">
<text x="0" y="33" font-family="Archivo, system-ui, sans-serif" font-size="27" font-weight="800" letter-spacing="-0.5" fill="currentColor">PrivexLabs</text>
</svg>`,
  "favicon-dark.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
<rect width="48" height="48" rx="11" fill="${INK}"></rect>
<path d="M18 36 V12 H32.5 V25 H22" stroke="${VD}" stroke-width="4.5"></path>
<rect x="18.5" y="21.5" width="7" height="7" fill="${BRASSD}"></rect>
</svg>`,
  "avatar-brand.svg": avatar(V, ONBRAND, BRASSD),
  "avatar-ink.svg": avatar(INK, VD, BRASSD),
  "avatar-white.svg": avatar(PAPER, V, BRASS),
  "avatar-campaign.svg": avatar(INK, VD, BRASSD, rings),
  "avatar-mono.svg": avatar(null, "currentColor", "currentColor"),
  "avatar-inverted.svg": avatar(PAPER, INK, V),
  "avatar-mark.svg": avatar(null, V, BRASS),
};

for (const [name, svg] of Object.entries(files)) await fs.writeFile(`${B}/${name}`, svg + "\n");

// Lockup rasters are deliberately absent: librsvg has no Archivo, so a rasterised lockup
// would lose its wordmark. The SVG lockups are the canonical text-bearing assets.
const raster = [
  ["mark.svg", "mark", [64, 128, 256, 512, 1024]],
  ["mark-dark.svg", "mark-dark", [64, 128, 256, 512, 1024]],
  ["favicon.svg", "favicon", [16, 32, 48, 64, 180, 192, 512]],
  ["favicon-dark.svg", "favicon-dark", [32, 180, 512]],
  ["avatar-brand.svg", "avatar-brand", [400, 800]],
  ["avatar-ink.svg", "avatar-ink", [400, 800]],
  ["avatar-white.svg", "avatar-white", [400, 800]],
  ["avatar-campaign.svg", "avatar-campaign", [400, 800]],
  ["avatar-inverted.svg", "avatar-inverted", [400, 800]],
];

await fs.mkdir(`${B}/png`, { recursive: true });
for (const [src, base, sizes] of raster) {
  const buf = await fs.readFile(`${B}/${src}`);
  for (const s of sizes) {
    await sharp(buf, { density: 600 }).resize(s, s).png().toFile(`${B}/png/${base}-${s}.png`);
  }
}
await sharp(await fs.readFile(`${B}/favicon.svg`), { density: 600 }).resize(32, 32).png().toFile("public/favicon.ico");

console.log(`generated ${Object.keys(files).length} SVG and ${(await fs.readdir(`${B}/png`)).length} PNG files`);
