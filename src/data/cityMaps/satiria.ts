const makeBlankMap = (width: number, height: number, fill = "T") =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => fill)
  );

const rect = (
  map: string[][],
  x: number,
  y: number,
  w: number,
  h: number,
  tile: string
) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (map[ry]?.[cx] !== undefined) map[ry][cx] = tile;
    }
  }
};

const hline = (
  map: string[][],
  x1: number,
  x2: number,
  y: number,
  tile: string
) => rect(map, x1, y, x2 - x1 + 1, 1, tile);

const vline = (
  map: string[][],
  x: number,
  y1: number,
  y2: number,
  tile: string
) => rect(map, x, y1, 1, y2 - y1 + 1, tile);

export const buildSatiriaMap = () => {
  const map = makeBlankMap(56, 34, "T");

  rect(map, 3, 3, 50, 28, "G");

  rect(map, 0, 0, 56, 3, "T");
  rect(map, 0, 31, 56, 3, "T");
  rect(map, 0, 0, 3, 34, "T");
  rect(map, 53, 0, 3, 34, "T");

  rect(map, 6, 6, 7, 6, "X");
  rect(map, 42, 20, 7, 5, "X");

  rect(map, 5, 25, 10, 4, "W");
  rect(map, 6, 24, 8, 1, "S");
  rect(map, 15, 26, 4, 2, "S");

  rect(map, 47, 9, 4, 9, "M");

  vline(map, 27, 2, 31, "R");
  hline(map, 6, 50, 18, "R");
  hline(map, 13, 42, 25, "R");

  rect(map, 23, 15, 10, 7, "E");
  rect(map, 25, 17, 6, 3, "R");

  map[18][27] = "V";

  rect(map, 17, 14, 4, 2, "L");
  rect(map, 35, 14, 4, 2, "L");
  rect(map, 17, 27, 4, 2, "L");
  rect(map, 34, 27, 5, 2, "L");

  rect(map, 9, 13, 7, 1, "F");
  rect(map, 40, 13, 7, 1, "F");
  rect(map, 8, 27, 9, 1, "F");
  rect(map, 39, 27, 9, 1, "F");

  rect(map, 14, 10, 7, 4, "A");
  map[13][19] = "O";

  rect(map, 25, 9, 7, 5, "H");
  map[13][28] = "O";

  rect(map, 38, 10, 7, 4, "U");
  map[13][41] = "O";

  rect(map, 17, 22, 7, 4, "B");
  map[25][20] = "O";

  rect(map, 34, 22, 7, 4, "I");
  map[25][37] = "O";

  rect(map, 35, 26, 6, 3, "P");
  map[27][37] = "P";
  map[27][38] = "P";

  rect(map, 26, 0, 3, 4, "R");

  return map;
};