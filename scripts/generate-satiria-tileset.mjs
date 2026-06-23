import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { deflateSync } from "node:zlib";

const TILE = 48;
const COLS = 8;
const ROWS = 4;
const W = TILE * COLS;
const H = TILE * ROWS;
const data = new Uint8Array(W * H * 4);

const rgba = (hex, a = 255) => {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a];
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
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) set(xx, yy, color);
  }
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

const checkerNoise = (ox, oy, c1, c2, step = 6) => {
  for (let y = 0; y < TILE; y += step) {
    for (let x = 0; x < TILE; x += step) fill(ox + x, oy + y, 2, 2, ((x + y) / step) % 2 === 0 ? c1 : c2);
  }
};

const blade = (ox, oy, x, y, h, c) => {
  for (let i = 0; i < h; i++) set(ox + x + Math.floor(i / 3), oy + y - i, c);
};

const c = {
  outline: rgba("#2a2119"),
  grass: rgba("#76a846"),
  grassDark: rgba("#477c32"),
  grassLite: rgba("#9bc665"),
  tall: rgba("#386f2d"),
  path: rgba("#a98c5d"),
  pathDark: rgba("#6f5639"),
  plaza: rgba("#b9aa82"),
  water: rgba("#286f9f"),
  waterLite: rgba("#72bde6"),
  shore: rgba("#c6a56f"),
  wood: rgba("#7b4d2a"),
  roofRed: rgba("#a93d2c"),
  roofBlue: rgba("#275f91"),
  roofPurple: rgba("#714587"),
  roofGreen: rgba("#3f7431"),
  roofDark: rgba("#5b2d25"),
  wall: rgba("#c6a875"),
  wallDark: rgba("#8d6a45"),
  window: rgba("#efd477"),
  door: rgba("#57351f"),
  leaf: rgba("#2f6b25"),
  leafLite: rgba("#49833a"),
  trunk: rgba("#69401f"),
  flowerRed: rgba("#e7654f"),
  flowerWhite: rgba("#f7f0c0"),
  flowerYellow: rgba("#f3df62"),
  stone: rgba("#8c8b80"),
};

tile(0, (x, y) => {
  fill(x, y, TILE, TILE, c.grass);
  checkerNoise(x, y, c.grassLite, c.grassDark, 8);
  for (let i = 4; i < 48; i += 9) blade(x, y, i, 42, 13, c.grassDark);
});

tile(1, (x, y) => {
  fill(x, y, TILE, TILE, c.path);
  for (let yy = 0; yy < TILE; yy += 12) fill(x, y + yy, TILE, 1, c.pathDark);
  for (let xx = 0; xx < TILE; xx += 16) fill(x + xx, y, 1, TILE, c.pathDark);
  checkerNoise(x, y, rgba("#d6bd7c"), rgba("#8c714c"), 12);
});

tile(2, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#5f9337"));
  for (let i = 2; i < 48; i += 5) blade(x, y, i, 45, 29, i % 2 ? c.tall : c.grassDark);
});

tile(3, (x, y) => {
  fill(x, y, TILE, TILE, c.water);
  for (let yy = 7; yy < 48; yy += 11) fill(x + 4, y + yy, 34, 2, c.waterLite);
});

tile(4, (x, y) => {
  fill(x, y, TILE, TILE, c.shore);
  checkerNoise(x, y, rgba("#e1c17d"), rgba("#9a7648"), 10);
});

tile(5, (x, y) => {
  fill(x, y, TILE, TILE, c.grass);
  fill(x + 21, y + 28, 8, 18, c.trunk);
  fill(x + 11, y + 12, 27, 25, c.leaf);
  fill(x + 4, y + 20, 24, 18, c.leafLite);
  fill(x + 22, y + 5, 21, 24, c.leaf);
  rect(x + 12, y + 13, 25, 22, rgba("#1b481d"));
});

tile(6, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x, y + 23, TILE, 5, c.wood);
  for (let xx = 3; xx < TILE; xx += 12) fill(x + xx, y + 8, 6, 31, c.wood);
  for (let xx = 8; xx < TILE; xx += 12) fill(x + xx, y + 8, 2, 31, c.outline);
});

tile(7, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 22, y + 24, 4, 18, c.grassDark);
  fill(x + 13, y + 12, 8, 8, c.flowerRed);
  fill(x + 24, y + 8, 8, 8, c.flowerYellow);
  fill(x + 31, y + 18, 8, 8, c.flowerWhite);
});

[c.roofRed, c.roofBlue, c.roofPurple, c.roofGreen].forEach((roof, i) => {
  tile(8 + i, (x, y) => {
    fill(x, y, TILE, TILE, roof);
    for (let yy = 6; yy < TILE; yy += 9) fill(x, y + yy, TILE, 2, c.roofDark);
    for (let xx = 0; xx < TILE; xx += 16) fill(x + xx, y, 2, TILE, rgba("#2a2119", 150));
    rect(x, y, TILE, TILE, c.outline);
  });
});

tile(12, (x, y) => {
  fill(x, y, TILE, TILE, c.wall);
  for (let yy = 8; yy < 48; yy += 12) fill(x, y + yy, TILE, 1, c.wallDark);
  for (let xx = 0; xx < 48; xx += 16) fill(x + xx, y, 1, TILE, c.wallDark);
});

tile(13, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 8, y + 2, 32, 44, c.door);
  rect(x + 8, y + 2, 32, 44, c.outline);
  fill(x + 30, y + 25, 4, 4, c.window);
});

tile(14, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 12, y + 14, 24, 16, c.window);
  fill(x + 13, y + 15, 22, 3, rgba("#fff1a2"));
});

tile(15, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 16, y + 3, 14, 32, c.wallDark);
  rect(x + 16, y + 3, 14, 32, c.outline);
});

tile(16, (x, y) => {
  fill(x, y, TILE, TILE, c.plaza);
  for (let yy = 0; yy < TILE; yy += 12) fill(x, y + yy, TILE, 1, rgba("#7f704f"));
  for (let xx = 0; xx < TILE; xx += 12) fill(x + xx, y, 1, TILE, rgba("#7f704f"));
  checkerNoise(x, y, rgba("#dfd0a3"), rgba("#9b8d68"), 12);
});

tile(17, (x, y) => {
  fill(x, y, TILE, TILE, c.wood);
  for (let yy = 0; yy < 48; yy += 9) fill(x, y + yy, TILE, 2, c.outline);
  rect(x, y, TILE, TILE, c.outline);
});

tile(18, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 11, y + 22, 26, 10, c.wood);
  rect(x + 11, y + 22, 26, 10, c.outline);
  fill(x + 15, y + 32, 4, 9, c.outline);
  fill(x + 29, y + 32, 4, 9, c.outline);
});

tile(19, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 21, y + 12, 5, 30, c.outline);
  fill(x + 14, y + 6, 19, 15, c.window);
  rect(x + 14, y + 6, 19, 15, c.outline);
});

tile(20, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 10, y + 24, 28, 18, c.stone);
  fill(x + 20, y + 5, 10, 29, rgba("#a8a79d"));
  fill(x + 17, y + 1, 16, 12, rgba("#c5c4b9"));
});

tile(21, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 8, y + 8, 32, 32, c.water);
  fill(x + 15, y + 15, 18, 18, c.waterLite);
  rect(x + 8, y + 8, 32, 32, c.stone);
});

tile(22, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 6, y + 8, 36, 24, c.window);
  rect(x + 6, y + 8, 36, 24, c.outline);
});

tile(23, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#000000", 0));
  fill(x + 14, y + 10, 20, 20, rgba("#f6d746"));
  rect(x + 14, y + 10, 20, 20, c.outline);
});

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const chunk = (type, bytes) => {
  const name = Buffer.from(type);
  const out = Buffer.alloc(8 + bytes.length + 4);
  out.writeUInt32BE(bytes.length, 0);
  name.copy(out, 4);
  bytes.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([name, bytes])), 8 + bytes.length);
  return out;
};

const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  Buffer.from(data.buffer, y * W * 4, W * 4).copy(raw, y * (W * 4 + 1) + 1);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6;

const out = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);

const outputPath = "public/tilesets/satiria.png";
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, out);
console.log(`${outputPath} ${W}x${H}`);
