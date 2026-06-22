const makeBlankMap = (width: number, height: number, fill = "T") =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => fill));

const rect = (map: string[][], x: number, y: number, w: number, h: number, tile: string) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (map[ry]?.[cx] !== undefined) map[ry][cx] = tile;
    }
  }
};

const hline = (map: string[][], x1: number, x2: number, y: number, tile: string) =>
  rect(map, x1, y, x2 - x1 + 1, 1, tile);

const vline = (map: string[][], x: number, y1: number, y2: number, tile: string) =>
  rect(map, x, y1, 1, y2 - y1 + 1, tile);

export const buildSatiriaMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 25, "G");
  rect(map, 7, 6, 7, 7, "X");
  rect(map, 39, 23, 8, 4, "X");
  rect(map, 6, 24, 12, 3, "S");
  rect(map, 8, 27, 13, 2, "W");
  rect(map, 47, 8, 4, 8, "M");

  rect(map, 14, 9, 29, 18, "R");
  vline(map, 27, 4, 32, "R");
  hline(map, 12, 45, 18, "R");
  hline(map, 17, 38, 26, "R");

  rect(map, 16, 10, 7, 5, "B");
  rect(map, 29, 10, 7, 5, "H");
  rect(map, 41, 10, 7, 5, "B");
  rect(map, 17, 22, 7, 5, "B");
  rect(map, 34, 22, 8, 5, "P");

  map[14][19] = "O";
  map[14][32] = "O";
  map[14][44] = "O";
  map[26][20] = "O";
  map[26][37] = "O";
  map[26][38] = "O";
  map[18][27] = "V";
  return map;
};
