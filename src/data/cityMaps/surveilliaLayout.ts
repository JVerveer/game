import type { CityMapLayout } from "./layoutTools";

export const SURVEILLIA_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  exits: { N: "R" },
  layers: [
    [
      { kind: "rect", x: 3, y: 4, w: 50, h: 25, tile: "G" },
      { kind: "rect", x: 6, y: 22, w: 44, h: 5, tile: "W" },
      { kind: "rect", x: 10, y: 7, w: 36, h: 14, tile: "E" },
      { kind: "hline", x1: 10, x2: 46, y: 16, tile: "R" },
      { kind: "vline", x: 27, y1: 4, y2: 30, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 10, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 20, tile: "R" },
      { kind: "rect", x: 33, y: 23, w: 10, h: 4, tile: "R" },
    ],
    [
      { kind: "rect", x: 11, y: 8, w: 5, h: 6, tile: "U" },
      { kind: "rect", x: 18, y: 7, w: 5, h: 7, tile: "A" },
      { kind: "rect", x: 25, y: 6, w: 5, h: 8, tile: "U" },
      { kind: "rect", x: 32, y: 7, w: 5, h: 7, tile: "A" },
      { kind: "rect", x: 39, y: 8, w: 5, h: 6, tile: "U" },
      { kind: "rect", x: 12, y: 17, w: 7, h: 3, tile: "B" },
      { kind: "rect", x: 24, y: 17, w: 7, h: 3, tile: "H" },
      { kind: "rect", x: 35, y: 23, w: 7, h: 3, tile: "P" },
    ],
    [
      { kind: "point", x: 15, y: 19, tile: "O" },
      { kind: "point", x: 27, y: 19, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
