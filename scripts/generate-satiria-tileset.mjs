import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { deflateSync } from "node:zlib";

const TILE = 48;
const COLS = 8;
const ROWS = 9;
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
  fill(x, y, TILE, TILE, rgba("#507f33"));
  checkerNoise(x, y, rgba("#6fa64a"), rgba("#335f2b"), 8);
  for (let i = 1; i < 48; i += 4) {
    blade(x, y, i, 46, 24 + (i % 9), i % 3 ? rgba("#285d27") : rgba("#74ad4b"));
    blade(x, y, i + 1, 42, 15 + (i % 7), rgba("#8bc65a"));
  }
  for (let xx = 3; xx < 48; xx += 10) fill(x + xx, y + 38 - (xx % 6), 3, 8, rgba("#244f22", 190));
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
    for (let yy = 6; yy < TILE; yy += 9) fill(x, y + yy, TILE, 2, rgba("#6d3428", 170));
    for (let xx = 8; xx < TILE; xx += 16) fill(x + xx, y + 4, 2, TILE - 8, rgba("#fff1a2", 45));
    fill(x, y, TILE, 2, rgba("#2a2119", 170));
    fill(x, y + TILE - 3, TILE, 3, rgba("#5b2d25", 190));
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

tile(24, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#7fb14d"));
  checkerNoise(x, y, rgba("#a8ca70"), rgba("#4e8237"), 10);
  for (let i = 2; i < 48; i += 11) blade(x, y, i, 43, 10 + (i % 4), c.grassDark);
  fill(x + 32, y + 12, 5, 4, rgba("#e3d35d"));
  fill(x + 10, y + 31, 3, 3, rgba("#f1eab8"));
});

tile(25, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#ad9366"));
  for (let yy = 6; yy < TILE; yy += 13) fill(x, y + yy, TILE, 1, rgba("#826747"));
  for (let xx = 8; xx < TILE; xx += 18) fill(x + xx, y, 1, TILE, rgba("#7a6040"));
  fill(x + 7, y + 10, 5, 3, rgba("#d3bb82"));
  fill(x + 31, y + 30, 4, 3, rgba("#876a47"));
});

tile(26, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#2f78a9"));
  for (let yy = 5; yy < 48; yy += 10) {
    fill(x + 3, y + yy, 19, 2, rgba("#7cc6eb"));
    fill(x + 27, y + yy + 4, 14, 2, rgba("#b8e6f3", 180));
  }
});

tile(27, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#c1b28b"));
  for (let yy = 0; yy < TILE; yy += 16) fill(x, y + yy, TILE, 1, rgba("#81704e"));
  for (let xx = 0; xx < TILE; xx += 16) fill(x + xx, y, 1, TILE, rgba("#81704e"));
  fill(x + 18, y + 18, 5, 4, rgba("#dfd0a3"));
  fill(x + 36, y + 8, 3, 3, rgba("#9b8d68"));
});

tile(28, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#5a8f39"));
  checkerNoise(x, y, rgba("#77ae4d"), rgba("#356a2c"), 9);
  for (let i = 0; i < 48; i += 4) {
    blade(x, y, i + 2, 47, 20 + (i % 11), i % 2 ? rgba("#2b6428") : rgba("#80ba50"));
    blade(x, y, i, 43, 14 + (i % 8), rgba("#9ad06b"));
  }
  fill(x + 8, y + 15, 4, 4, rgba("#f0da5f"));
  fill(x + 34, y + 20, 4, 4, rgba("#df6a52"));
  fill(x + 23, y + 11, 3, 3, rgba("#f7f0c0"));
});

tile(29, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#76a846"));
  fill(x + 20, y + 27, 9, 19, c.trunk);
  fill(x + 8, y + 17, 25, 21, rgba("#34732b"));
  fill(x + 18, y + 6, 24, 27, rgba("#2a6426"));
  fill(x + 2, y + 25, 20, 14, rgba("#568f3d"));
  fill(x + 29, y + 25, 15, 14, rgba("#49833a"));
  fill(x + 19, y + 18, 4, 4, rgba("#79b55a"));
});

tile(30, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#c8ad7d"));
  for (let yy = 6; yy < 48; yy += 11) fill(x, y + yy, TILE, 1, rgba("#9a744d"));
  for (let xx = 8; xx < 48; xx += 16) fill(x + xx, y, 1, TILE, rgba("#9a744d"));
  fill(x + 7, y + 10, 6, 4, rgba("#dfc08c"));
  fill(x + 31, y + 28, 5, 3, rgba("#a47c52"));
});

tile(31, (x, y) => {
  fill(x, y, TILE, TILE, rgba("#c9a973"));
  checkerNoise(x, y, rgba("#e7c986"), rgba("#9a7648"), 12);
  for (let xx = 0; xx < TILE; xx += 12) fill(x + xx, y + 39, 7, 2, rgba("#7f6848"));
});

tile(32, (x, y) => {
  fill(x, y, TILE * 2, TILE * 2, rgba("#000000", 0));
  fill(x + 41, y + 56, 14, 35, c.trunk);
  fill(x + 20, y + 29, 47, 44, c.leaf);
  fill(x + 5, y + 43, 44, 34, c.leafLite);
  fill(x + 39, y + 14, 47, 46, rgba("#285f24"));
  fill(x + 55, y + 38, 34, 37, c.leaf);
  fill(x + 25, y + 20, 18, 11, rgba("#5e9b43"));
  fill(x + 56, y + 24, 14, 9, rgba("#5e9b43"));
});

tile(34, (x, y) => {
  fill(x, y, TILE * 3, TILE * 3, rgba("#000000", 0));
  fill(x + 64, y + 82, 18, 55, c.trunk);
  fill(x + 31, y + 55, 78, 62, c.leaf);
  fill(x + 12, y + 73, 61, 48, c.leafLite);
  fill(x + 55, y + 24, 69, 67, rgba("#275d24"));
  fill(x + 84, y + 62, 48, 53, c.leaf);
  fill(x + 36, y + 30, 24, 14, rgba("#609e45"));
  fill(x + 86, y + 38, 20, 13, rgba("#609e45"));
  fill(x + 55, y + 96, 10, 10, rgba("#79b55a"));
});

const drawHero = (index, direction) => {
  tile(index, (x, y) => {
    const skin = rgba("#f3c68f");
    const skinShade = rgba("#d99b68");
    const red = rgba("#ca3c32");
    const redDark = rgba("#8d2b29");
    const blue = rgba("#345f9b");
    const cream = rgba("#f8e8b8");
    const shoe = rgba("#2a2119");
    const hair = rgba("#5c351f");
    fill(x, y, TILE, TILE, rgba("#000000", 0));
    fill(x + 14, y + 41, 20, 4, rgba("#000000", 80));

    if (direction === "back") {
      fill(x + 14, y + 3, 20, 5, shoe);
      fill(x + 15, y + 1, 17, 7, red);
      fill(x + 17, y + 8, 14, 13, redDark);
      fill(x + 13, y + 21, 22, 4, shoe);
      fill(x + 15, y + 25, 18, 10, blue);
      fill(x + 10, y + 25, 5, 10, cream);
      fill(x + 33, y + 25, 5, 10, cream);
      fill(x + 15, y + 35, 7, 7, shoe);
      fill(x + 27, y + 35, 7, 7, shoe);
      return;
    }

    if (direction === "side") {
      fill(x + 12, y + 5, 22, 5, shoe);
      fill(x + 14, y + 1, 15, 8, red);
      fill(x + 29, y + 4, 7, 4, red);
      fill(x + 15, y + 10, 16, 13, skin);
      fill(x + 14, y + 10, 4, 9, hair);
      fill(x + 29, y + 15, 3, 3, shoe);
      fill(x + 28, y + 20, 4, 2, skinShade);
      fill(x + 13, y + 23, 20, 4, shoe);
      fill(x + 16, y + 27, 15, 9, blue);
      fill(x + 30, y + 27, 6, 8, cream);
      fill(x + 12, y + 27, 5, 8, cream);
      fill(x + 15, y + 36, 7, 6, shoe);
      fill(x + 27, y + 36, 7, 6, shoe);
      return;
    }

    if (direction === "walk") {
      fill(x + 12, y + 5, 24, 5, shoe);
      fill(x + 14, y + 1, 18, 8, red);
      fill(x + 21, y + 3, 8, 3, cream);
      fill(x + 15, y + 10, 18, 13, skin);
      fill(x + 11, y + 13, 5, 8, hair);
      fill(x + 32, y + 13, 5, 8, hair);
      fill(x + 19, y + 15, 3, 3, shoe);
      fill(x + 28, y + 15, 3, 3, shoe);
      fill(x + 23, y + 21, 5, 2, skinShade);
      fill(x + 13, y + 23, 22, 4, shoe);
      fill(x + 16, y + 27, 17, 9, blue);
      fill(x + 22, y + 27, 5, 9, cream);
      fill(x + 9, y + 28, 6, 9, cream);
      fill(x + 34, y + 25, 5, 9, cream);
      fill(x + 12, y + 36, 8, 6, shoe);
      fill(x + 29, y + 35, 8, 6, shoe);
      return;
    }

    fill(x + 12, y + 5, 24, 5, shoe);
    fill(x + 14, y + 1, 18, 8, red);
    fill(x + 21, y + 3, 8, 3, cream);
    fill(x + 15, y + 10, 18, 13, skin);
    fill(x + 11, y + 13, 5, 8, hair);
    fill(x + 32, y + 13, 5, 8, hair);
    fill(x + 19, y + 15, 3, 3, shoe);
    fill(x + 28, y + 15, 3, 3, shoe);
    fill(x + 23, y + 21, 5, 2, skinShade);
    fill(x + 13, y + 23, 22, 4, shoe);
    fill(x + 16, y + 27, 17, 9, blue);
    fill(x + 22, y + 27, 5, 9, cream);
    fill(x + 9, y + 25, 6, 9, cream);
    fill(x + 34, y + 25, 5, 9, cream);
    fill(x + 15, y + 36, 7, 6, shoe);
    fill(x + 27, y + 36, 7, 6, shoe);
  });
};

drawHero(56, "front");
drawHero(57, "back");
drawHero(58, "side");
drawHero(59, "walk");

const drawNpc = (index, variant, walk = false) => {
  tile(index, (x, y) => {
    const skin = rgba("#f0c18a");
    const skinShade = rgba("#c9875d");
    const shoe = rgba("#2a2119");
    const palettes = [
      { hair: "#6a3f24", top: "#315f2a", top2: "#244b20", accent: "#f6d746", female: false },
      { hair: "#3b2a1f", top: "#7a4b9c", top2: "#57347a", accent: "#fff8c8", female: true },
      { hair: "#8a4b25", top: "#ca4b36", top2: "#8e3328", accent: "#315f2a", female: false },
      { hair: "#4a2d1f", top: "#b64272", top2: "#7f2e55", accent: "#f3df62", female: true },
      { hair: "#252018", top: "#4d77b0", top2: "#2f507d", accent: "#fff8c8", female: false },
    ];
    const p = palettes[variant % palettes.length];
    const hair = rgba(p.hair);
    const top = rgba(p.top);
    const top2 = rgba(p.top2);
    const accent = rgba(p.accent);
    const step = walk ? 2 : 0;

    fill(x, y, TILE, TILE, rgba("#000000", 0));
    fill(x + 14, y + 41, 20, 4, rgba("#000000", 70));

    if (p.female) {
      fill(x + 12, y + 4, 24, 5, hair);
      fill(x + 10, y + 9, 6, 17, hair);
      fill(x + 32, y + 9, 6, 17, hair);
      fill(x + 15, y + 8, 18, 15, skin);
      fill(x + 18, y + 15, 3, 3, shoe);
      fill(x + 28, y + 15, 3, 3, shoe);
      fill(x + 23, y + 21, 5, 2, skinShade);
      fill(x + 13, y + 23, 22, 4, shoe);
      fill(x + 15, y + 27, 18, 11, top);
      fill(x + 18, y + 29, 12, 4, top2);
      fill(x + 22, y + 26, 5, 12, accent);
      fill(x + 9, y + 25 + step, 6, 10, skin);
      fill(x + 34, y + 25 - step, 5, 10, skin);
      fill(x + 13, y + 37 - step, 8, 5, shoe);
      fill(x + 29, y + 37 + step, 8, 5, shoe);
      return;
    }

    fill(x + 12, y + 5, 24, 5, hair);
    fill(x + 14, y + 2, 18, 7, top);
    fill(x + 15, y + 10, 18, 13, skin);
    fill(x + 11, y + 13, 5, 8, hair);
    fill(x + 32, y + 13, 5, 8, hair);
    fill(x + 19, y + 15, 3, 3, shoe);
    fill(x + 28, y + 15, 3, 3, shoe);
    fill(x + 23, y + 21, 5, 2, skinShade);
    fill(x + 13, y + 23, 22, 4, shoe);
    fill(x + 16, y + 27, 17, 9, top);
    fill(x + 22, y + 27, 5, 9, accent);
    fill(x + 9, y + 25 + step, 6, 9, skin);
    fill(x + 34, y + 25 - step, 5, 9, skin);
    fill(x + 15, y + 36 - step, 7, 6, shoe);
    fill(x + 27, y + 36 + step, 7, 6, shoe);
    fill(x + 17, y + 30, 14, 3, top2);
  });
};

[0, 1, 2, 3, 4].forEach((variant) => {
  drawNpc(60 + variant, variant);
  drawNpc(65 + variant, variant, true);
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
