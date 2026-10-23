// Renders the footer's 3D-perspective satellite map of Freedive Dahab
// (Lighthouse Bay). Downloads Esri World Imagery tiles once into
// tools/.mapcache, composites them into one flat image, applies a
// Google-Earth-style perspective tilt, and bakes in the location pin +
// imagery attribution. Rerun freely — cached tiles are reused:
// `node tools/make-map-3d.js`
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE_DIR = path.join(root, 'tools', '.mapcache');
const OUTPUT = path.join(root, 'public', 'images', 'footer-map-3d.png');

// Freedive Dahab — Google Maps listing pin (same coordinates as the old embed)
const LAT = 28.500013;
const LNG = 34.5193704;
const ZOOM = 17;

const SRC_W = 1600; // flat image size before the tilt (px)
const SRC_H = 1150;
// Shifts which source point sits at the screen centre. -x moves the frame west
// so the town fills the view and the pin lands right-of-center on the coast
// (matching the owner's Google Earth framing); -y keeps the pin below centre.
const CENTER_SHIFT = { x: -320, y: -60 };

const TILT = (38 * Math.PI) / 180; // rotateX — matches the owner's Google Earth view
const YAW = 0; // heading north-up, like Google Earth
const CAMERA = 1300; // perspective distance in px (lower = stronger)

const TILE = 256;
const UA = 'freedive-dahab-website/1.0 (one-off build script)';

await mkdir(CACHE_DIR, { recursive: true });
await mkdir(path.dirname(OUTPUT), { recursive: true });

/* ---------- flat map: fetch + composite OSM tiles ---------- */

const worldX = ((LNG + 180) / 360) * 2 ** ZOOM * TILE;
const latRad = (LAT * Math.PI) / 180;
const worldY =
  ((1 -
    Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) /
    2) *
  2 ** ZOOM *
  TILE;

const originX = Math.round(worldX + CENTER_SHIFT.x - SRC_W / 2);
const originY = Math.round(worldY + CENTER_SHIFT.y - SRC_H / 2);

const tiles = [];
for (
  let ty = Math.floor(originY / TILE);
  ty <= Math.floor((originY + SRC_H - 1) / TILE);
  ty++
) {
  for (
    let tx = Math.floor(originX / TILE);
    tx <= Math.floor((originX + SRC_W - 1) / TILE);
    tx++
  ) {
    tiles.push({ tx, ty });
  }
}

async function fetchTile({ tx, ty }) {
  const cacheFile = path.join(CACHE_DIR, `esri-${ZOOM}-${tx}-${ty}.jpg`);
  try {
    return await readFile(cacheFile);
  } catch {
    // Esri World Imagery: free satellite basemap, y precedes x in the URL
    const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${ZOOM}/${ty}/${tx}`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Tile ${tx}/${ty} failed: HTTP ${res.status}`);
    const body = Buffer.from(await res.arrayBuffer());
    await writeFile(cacheFile, body);
    return body;
  }
}

console.log(`Fetching ${tiles.length} Esri World Imagery tiles (zoom ${ZOOM})…`);
const layers = await Promise.all(
  tiles.map(async ({ tx, ty }) => ({
    input: await fetchTile({ tx, ty }),
    left: tx * TILE - originX,
    top: ty * TILE - originY,
  })),
);

const flat = await sharp({
  create: {
    width: SRC_W,
    height: SRC_H,
    channels: 4,
    background: { r: 8, g: 31, b: 53, alpha: 1 },
  },
})
  .composite(layers)
  .png()
  .toBuffer();

/* ---------- natural satellite look: gentle clarity boost ---------- */

const tinted = await sharp(flat)
  .modulate({ saturation: 1.08, brightness: 1.02 })
  .raw()
  .toBuffer({ resolveWithObject: true });

/* ---------- perspective tilt: per-pixel inverse projection ---------- */

const { data: src, info } = tinted;
const sw = info.width;
const sh = info.height;
const cx = sw / 2;
const cy = sh / 2;
const cosG = Math.cos(YAW);
const sinG = Math.sin(YAW);
const sinT = Math.sin(TILT);
const cosT = Math.cos(TILT);

// plane point (relative to source centre) -> screen point
function project(px, py) {
  const u = px * cosG - py * sinG;
  const v = px * sinG + py * cosG;
  const d = CAMERA - v * sinT;
  return { x: (CAMERA * u) / d, y: (CAMERA * v * cosT) / d };
}

const corners = [
  project(-cx, -cy),
  project(cx, -cy),
  project(cx, cy),
  project(-cx, cy),
];
const minX = Math.floor(Math.min(...corners.map((c) => c.x))) - 8;
const minY = Math.floor(Math.min(...corners.map((c) => c.y))) - 8;
const OUT_W = Math.ceil(Math.max(...corners.map((c) => c.x))) + 8 - minX;
const OUT_H = Math.ceil(Math.max(...corners.map((c) => c.y))) + 8 - minY;

const out = Buffer.alloc(OUT_W * OUT_H * 4, 0);
const tanT = Math.tan(TILT);

for (let oy = 0; oy < OUT_H; oy++) {
  const sy = oy + minY + 0.5;
  // inverse of screen_y = f·v·cosT / (f − v·sinT)
  const v = (sy * CAMERA) / (CAMERA * cosT + sy * sinT);
  for (let ox = 0; ox < OUT_W; ox++) {
    const sx = ox + minX + 0.5;
    // inverse of screen_x = f·u / (f − v·sinT)
    const u = (sx * (CAMERA - v * sinT)) / CAMERA;
    const px = cx + u * cosG + v * sinG;
    const py = cy - u * sinG + v * cosG;

    const x0 = Math.floor(px);
    const y0 = Math.floor(py);
    if (x0 < 0 || y0 < 0 || x0 >= sw - 1 || y0 >= sh - 1) continue;

    const fx = px - x0;
    const fy = py - y0;
    const i00 = (y0 * sw + x0) * 4;
    const i10 = i00 + 4;
    const i01 = i00 + sw * 4;
    const i11 = i01 + 4;

    const o = (oy * OUT_W + ox) * 4;
    for (let c = 0; c < 4; c++) {
      const top = src[i00 + c] * (1 - fx) + src[i10 + c] * fx;
      const bottom = src[i01 + c] * (1 - fx) + src[i11 + c] * fx;
      out[o + c] = Math.round(top * (1 - fy) + bottom * fy);
    }
  }
}

/* ---------- pin + attribution ---------- */

const pin = project(-CENTER_SHIFT.x, -CENTER_SHIFT.y); // pin ground point in plane coords
const pinX = Math.round(pin.x - minX);
const pinY = Math.round(pin.y - minY);

const pinScale = 1.7;
const pinSvg = Buffer.from(
  `<svg width="${Math.round(64 * pinScale)}" height="${Math.round(88 * pinScale)}" viewBox="0 0 64 88" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F2704F"/>
        <stop offset="1" stop-color="#C43A28"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="83" rx="17" ry="5" fill="#041828" opacity="0.4"/>
    <path d="M32 4 C18 4 8 14.5 8 28 C8 45 32 83 32 83 C32 83 56 45 56 28 C56 14.5 46 4 32 4 Z" fill="url(#pin)" stroke="#FFFFFF" stroke-width="3"/>
    <circle cx="32" cy="28" r="10" fill="#FFFFFF"/>
  </svg>`,
);

const attrSvg = Buffer.from(
  `<svg width="330" height="34" xmlns="http://www.w3.org/2000/svg">
    <rect width="330" height="34" rx="17" fill="#041828" opacity="0.62"/>
    <text x="165" y="22" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#FFFFFF" opacity="0.9">© Esri, Maxar, Earthstar Geographics</text>
  </svg>`,
);

const composed = await sharp(out, {
  raw: { width: OUT_W, height: OUT_H, channels: 4 },
})
  .composite([
    {
      input: pinSvg,
      left: pinX - Math.round(32 * pinScale),
      top: pinY - Math.round(83 * pinScale),
    },
    { input: attrSvg, left: OUT_W - 342, top: OUT_H - 44 },
  ])
  .png({ palette: true, quality: 95, compressionLevel: 9 })
  .toFile(OUTPUT);

console.log(
  `footer-map-3d.png: ${OUT_W}×${OUT_H}px, pin at (${pinX}, ${pinY}) → ` +
    `${((pinX / OUT_W) * 100).toFixed(1)}% / ${((pinY / OUT_H) * 100).toFixed(1)}%`,
);
