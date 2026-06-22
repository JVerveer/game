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
      if (map[ry]?.[cx] !== undefined) {
        map[ry][cx] = tile;
      }
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

  // Main town clearing
  rect(map, 3, 3, 50, 28, "G");

  // Forest border
  rect(map, 0, 0, 56, 2, "T");
  rect(map, 0, 32, 56, 2, "T");
  rect(map, 0, 0, 2, 34, "T");
  rect(map, 54, 0, 2, 34, "T");

  // Roads
  vline(map, 28, 2, 31, "R");
  hline(map, 5, 50, 17, "R");

  // Central plaza
  rect(map, 23, 13, 11, 9, "R");

  // Monument / fountain
  rect(map, 27, 16, 3, 3, "V");

  // Residential district (north)
  rect(map, 8, 6, 7, 5, "B");
  rect(map, 20, 6, 7, 5, "H");
  rect(map, 33, 6, 7, 5, "B");
  rect(map, 44, 6, 7, 5, "B");

  // Doors
  map[10][11] = "O";
  map[10][23] = "O";
  map[10][36] = "O";
  map[10][47] = "O";

  // Market district (west)
  rect(map, 7, 21, 7, 5, "B");
  rect(map, 16, 21, 7, 5, "B");

  map[25][10] = "O";
  map[25][19] = "O";

  // Palace district (east)
  rect(map, 38, 21, 10, 6, "P");

  map[26][43] = "O";

  // Pond
  rect(map, 5, 26, 8, 3, "W");
  rect(map, 6, 25, 6, 1, "S");
  rect(map, 5, 29, 8, 1, "S");

  // Mountain ridge
  rect(map, 47, 12, 5, 8, "M");

  // Town trees
  rect(map, 17, 14, 2, 2, "X");
  rect(map, 37, 14, 2, 2, "X");

  rect(map, 12, 18, 2, 2, "X");
  rect(map, 43, 18, 2, 2, "X");

  rect(map, 12, 27, 2, 2, "X");
  rect(map, 30, 26, 2, 2, "X");

  // Decorative grass pockets
  map[8][17] = "G";
  map[9][18] = "G";
  map[22][31] = "G";
  map[24][29] = "G";

  return map;
};