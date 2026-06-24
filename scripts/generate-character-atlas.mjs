import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { deflateSync } from "node:zlib";

const TILE = 48;
const COLS = 8;
const TOWNS = [
  "satiria", "brexiton", "cryptonia", "factcheck", "inflatopolis", "promptford",
  "ragebait", "surveillia", "tariff", "tweetsburg", "wokeshire",
];
const ROLES = ["older-man", "older-woman", "young-man", "young-woman", "crypto-bro", "crypto-sister"];
const START = 16;
const SPRITES = START + TOWNS.length * ROLES.length * 2;
const ROWS = Math.ceil(SPRITES / COLS);
const W = TILE * COLS;
const H = TILE * ROWS;
const data = new Uint8Array(W * H * 4);

const rgba = (hex, a = 255) => {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a];
};

const c = {
  clear: [0, 0, 0, 0],
  outline: rgba("#251f18"),
  skin: rgba("#e9b982"),
  skinDark: rgba("#b97855"),
  skinLight: rgba("#f4cf9a"),
  tan: rgba("#c88f5f"),
  brown: rgba("#7c4930"),
  darkBrown: rgba("#4b2b20"),
  hairBlack: rgba("#1e1a18"),
  hairGrey: rgba("#b9b4a8"),
  white: rgba("#fff3c7"),
  red: rgba("#c94b38"),
  blue: rgba("#355f9e"),
  navy: rgba("#1f2d45"),
  green: rgba("#3f7a40"),
  yellow: rgba("#e8c94d"),
  purple: rgba("#7650a8"),
  pink: rgba("#d86793"),
  orange: rgba("#d97934"),
  teal: rgba("#2b8c8f"),
  black: rgba("#111111"),
  grey: rgba("#6d7274"),
  lightGrey: rgba("#c7d0d4"),
  gold: rgba("#d9aa37"),
  mint: rgba("#9edfc8"),
};

const set = (x, y, color) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  data[i] = color[0];
  data[i + 1] = color[1];
  data[i + 2] = color[2];
  data[i + 3] = color[3];
};

const fill = (x, y, w, h, color) => {
  for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) set(xx, yy, color);
};

const rect = (x, y, w, h, color) => {
  fill(x, y, w, 2, color);
  fill(x, y + h - 2, w, 2, color);
  fill(x, y, 2, h, color);
  fill(x + w - 2, y, 2, h, color);
};

const tileOrigin = (index) => [(index % COLS) * TILE, Math.floor(index / COLS) * TILE];
const tile = (index, draw) => {
  const [ox, oy] = tileOrigin(index);
  draw(ox, oy);
};

const cell = (town, role, frame = 0) => START + TOWNS.indexOf(town) * ROLES.length * 2 + ROLES.indexOf(role) * 2 + frame;

const defaultPalette = {
  skin: c.skin,
  skinDark: c.skinDark,
  hair: c.hairBlack,
  top: c.green,
  bottom: c.navy,
  accent: c.white,
  shoe: c.black,
};

const townPalette = (town, role) => {
  const p = { ...defaultPalette };
  if (role.includes("older")) p.hair = c.hairGrey;
  if (town === "satiria") Object.assign(p, { top: c.green, bottom: c.brown, accent: c.yellow });
  if (town === "brexiton") Object.assign(p, { top: c.navy, bottom: c.grey, accent: c.red, hair: role.includes("older") ? c.hairGrey : c.darkBrown });
  if (town === "cryptonia") Object.assign(p, { skin: c.tan, top: c.white, bottom: c.gold, accent: c.teal, hair: c.hairBlack });
  if (town === "factcheck") Object.assign(p, { skin: c.brown, top: c.orange, bottom: c.navy, accent: c.mint, hair: role.includes("older") ? c.hairGrey : c.hairBlack });
  if (town === "inflatopolis") Object.assign(p, { skin: c.tan, top: c.blue, bottom: c.brown, accent: c.red, hair: role.includes("older") ? c.hairGrey : c.darkBrown });
  if (town === "promptford") Object.assign(p, { top: c.black, bottom: c.navy, accent: c.pink, hair: role.includes("older") ? c.hairGrey : c.darkBrown });
  if (town === "ragebait") Object.assign(p, { top: c.purple, bottom: c.teal, accent: c.orange });
  if (town === "surveillia") Object.assign(p, { skin: c.tan, top: c.red, bottom: c.black, accent: c.gold, hair: c.hairBlack });
  if (town === "tariff") Object.assign(p, { skin: c.tan, top: c.mint, bottom: c.orange, accent: c.yellow });
  if (town === "tweetsburg") Object.assign(p, { top: c.black, bottom: c.black, accent: c.white });
  if (town === "wokeshire") Object.assign(p, { top: c.orange, bottom: c.blue, accent: c.yellow });
  if (role === "young-woman" || role === "crypto-sister") p.hair = town === "cryptonia" ? c.hairBlack : c.darkBrown;
  if (role === "crypto-bro" || role === "crypto-sister") Object.assign(p, { top: c.black, bottom: c.gold, accent: c.mint });
  return p;
};

const drawFace = (ox, oy, p, opts = {}) => {
  fill(ox + 13, oy + 7, 22, 20, c.outline);
  fill(ox + 15, oy + 9, 18, 16, p.skin);
  fill(ox + 13, oy + 11, 4, 9, p.skinDark);
  fill(ox + 31, oy + 11, 4, 9, p.skinDark);
  fill(ox + 13, oy + 5, 22, 8, p.hair);
  if (opts.longHair) {
    fill(ox + 10, oy + 10, 6, 18, p.hair);
    fill(ox + 32, oy + 10, 6, 18, p.hair);
  }
  if (opts.hat) {
    fill(ox + 10, oy + 3, 26, 7, c.outline);
    fill(ox + 12, oy + 1, 20, 8, opts.hat);
    fill(ox + 29, oy + 7, 9, 3, opts.hat);
  }
  if (opts.sunglasses) {
    fill(ox + 16, oy + 15, 7, 4, c.black);
    fill(ox + 26, oy + 15, 7, 4, c.black);
    fill(ox + 23, oy + 16, 3, 2, c.black);
  } else {
    fill(ox + 18, oy + 16, 3, 3, c.outline);
    fill(ox + 28, oy + 16, 3, 3, c.outline);
  }
  fill(ox + 23, oy + 22, 5, 2, opts.smile ?? c.red);
  if (opts.beard) fill(ox + 18, oy + 22, 14, 5, p.hair);
};

const drawBody = (ox, oy, p, frame = 0, opts = {}) => {
  const step = frame ? 2 : 0;
  fill(ox + 12, oy + 27, 24, 14, c.outline);
  fill(ox + 15, oy + 28, 18, 11, p.top);
  fill(ox + 22, oy + 28, 4, 11, p.accent);
  if (opts.dress) {
    fill(ox + 13, oy + 31, 22, 11, p.top);
    fill(ox + 17, oy + 38, 14, 5, p.top);
  } else if (opts.swim) {
    fill(ox + 15, oy + 29, 18, 5, p.accent);
    fill(ox + 16, oy + 34, 16, 7, p.bottom);
  } else {
    fill(ox + 16, oy + 38, 7, 7, p.bottom);
    fill(ox + 26, oy + 38, 7, 7, p.bottom);
  }
  fill(ox + 8, oy + 29, 6, 10, p.skin);
  fill(ox + 34, oy + 29, 6, 10, p.skin);
  if (opts.backpack) {
    fill(ox + 7, oy + 27, 5, 13, c.brown);
    rect(ox + 7, oy + 27, 5, 13, c.outline);
  }
  fill(ox + 15 - step, oy + 44, 9, 4, p.shoe);
  fill(ox + 26 + step, oy + 44, 9, 4, p.shoe);
};

const drawPerson = (index, palette, frame = 0, opts = {}) => tile(index, (ox, oy) => {
  drawFace(ox, oy, palette, opts);
  drawBody(ox, oy, palette, frame, opts);
});

const drawHero = (index, frame = 0, dir = "down") => tile(index, (ox, oy) => {
  const p = { skin: c.skinLight, skinDark: c.skinDark, hair: c.darkBrown, top: c.blue, bottom: c.navy, accent: c.white, shoe: c.black };
  if (dir === "up") {
    fill(ox + 12, oy + 5, 24, 18, c.outline);
    fill(ox + 14, oy + 4, 20, 10, c.red);
    fill(ox + 15, oy + 13, 18, 12, c.darkBrown);
    drawBody(ox, oy, p, frame, { backpack: true });
    return;
  }
  if (dir === "side") {
    drawFace(ox + 1, oy, p, { hat: c.red });
    drawBody(ox, oy, p, frame, { backpack: true });
    fill(ox + 31, oy + 16, 3, 3, c.outline);
    return;
  }
  drawPerson(index, p, frame, { hat: c.red, backpack: true });
});

const drawRobot = (index, frame = 0) => tile(index, (ox, oy) => {
  const step = frame ? 2 : 0;
  fill(ox + 13, oy + 6, 22, 18, c.outline);
  fill(ox + 15, oy + 8, 18, 14, c.lightGrey);
  fill(ox + 18, oy + 13, 4, 4, rgba("#70d8ff"));
  fill(ox + 27, oy + 13, 4, 4, rgba("#70d8ff"));
  fill(ox + 22, oy + 20, 6, 2, c.outline);
  fill(ox + 17, oy + 27, 16, 14, c.grey);
  rect(ox + 17, oy + 27, 16, 14, c.outline);
  fill(ox + 10, oy + 29, 7, 9, c.lightGrey);
  fill(ox + 33, oy + 29, 7, 9, c.lightGrey);
  fill(ox + 15 - step, oy + 43, 9, 4, c.outline);
  fill(ox + 27 + step, oy + 43, 9, 4, c.outline);
});

drawHero(0, 0, "down");
drawHero(1, 1, "down");
drawHero(2, 0, "up");
drawHero(3, 0, "side");
drawHero(4, 1, "side");
drawPerson(5, { ...defaultPalette, top: c.white, bottom: c.red, accent: c.pink, hair: c.darkBrown }, 0, { hat: c.red, longHair: true, dress: true });
drawPerson(6, { ...defaultPalette, top: c.white, bottom: c.red, accent: c.pink, hair: c.darkBrown }, 1, { hat: c.red, longHair: true, dress: true });
drawPerson(7, { ...defaultPalette, skin: c.tan, top: c.navy, bottom: c.black, accent: c.white, hair: c.hairBlack }, 0, { beard: true });
drawPerson(8, { ...defaultPalette, skin: c.tan, top: c.navy, bottom: c.black, accent: c.white, hair: c.hairBlack }, 1, { beard: true });
drawRobot(9, 0);
drawRobot(10, 1);

for (const town of TOWNS) {
  for (const role of ROLES) {
    for (const frame of [0, 1]) {
      const p = townPalette(town, role);
      const opts = {
        longHair: role.includes("woman") || role.includes("sister"),
        beard: role === "older-man",
        sunglasses: role.includes("crypto"),
        hat: town === "brexiton" ? c.navy : town === "wokeshire" ? c.yellow : undefined,
        dress: role.includes("woman") && town !== "tariff",
        swim: town === "tariff",
        backpack: town === "wokeshire",
      };
      drawPerson(cell(town, role, frame), p, frame, opts);
    }
  }
}

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const chunk = (type, payload) => {
  const t = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(payload.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, payload])));
  return Buffer.concat([len, t, payload, crc]);
};

const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  for (let x = 0; x < W * 4; x++) raw[y * (W * 4 + 1) + 1 + x] = data[y * W * 4 + x];
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);

const outputPath = "public/tilesets/characters.png";
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, png);
console.log(`Wrote ${outputPath} (${W}x${H})`);
