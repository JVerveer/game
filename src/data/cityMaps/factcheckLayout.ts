import type { CityMapLayout } from "./layoutTools";

export const FACTCHECK_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "S" },
      { kind: "rect", x: 42, y: 5, w: 7, h: 22, tile: "W" },
      { kind: "rect", x: 8, y: 8, w: 34, h: 17, tile: "E" },
      { kind: "hline", x1: 8, x2: 42, y: 17, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 30, tile: "R" },
      { kind: "hline", x1: 11, x2: 40, y: 11, tile: "R" },
      { kind: "hline", x1: 11, x2: 40, y: 23, tile: "R" },
      { kind: "rect", x: 33, y: 23, w: 9, h: 4, tile: "R" },
    ],
    [
      { kind: "rect", x: 10, y: 9, w: 7, h: 4, tile: "A" },
      { kind: "rect", x: 22, y: 9, w: 7, h: 4, tile: "H" },
      { kind: "rect", x: 33, y: 9, w: 7, h: 4, tile: "B" },
      { kind: "rect", x: 11, y: 20, w: 7, h: 4, tile: "U" },
      { kind: "rect", x: 35, y: 23, w: 7, h: 3, tile: "P" },
      { kind: "rect", x: 23, y: 15, w: 8, h: 5, tile: "U" },
    ],
    [
      { kind: "point", x: 13, y: 12, tile: "O" },
      { kind: "point", x: 25, y: 12, tile: "O" },
      { kind: "point", x: 36, y: 12, tile: "O" },
      { kind: "point", x: 14, y: 23, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};

