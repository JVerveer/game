import type { CityMapLayout } from "./layoutTools";

export const INFLATOPOLIS_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  exits: { S: "R", E: "R" },
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "G" },
      { kind: "rect", x: 6, y: 21, w: 44, h: 5, tile: "E" },
      { kind: "rect", x: 8, y: 7, w: 40, h: 13, tile: "R" },
      { kind: "hline", x1: 8, x2: 48, y: 14, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 29, tile: "R" },
      { kind: "hline", x1: 11, x2: 45, y: 9, tile: "R" },
      { kind: "hline", x1: 11, x2: 45, y: 19, tile: "R" },
    ],
    [
      { kind: "rect", x: 10, y: 8, w: 6, h: 4, tile: "A" },
      { kind: "rect", x: 18, y: 8, w: 6, h: 4, tile: "B" },
      { kind: "rect", x: 31, y: 8, w: 6, h: 4, tile: "H" },
      { kind: "rect", x: 40, y: 8, w: 6, h: 4, tile: "A" },
      { kind: "rect", x: 11, y: 16, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 21, y: 16, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 35, y: 23, w: 7, h: 3, tile: "P" },
    ],
    [
      { kind: "point", x: 13, y: 11, tile: "O" },
      { kind: "point", x: 21, y: 11, tile: "O" },
      { kind: "point", x: 34, y: 11, tile: "O" },
      { kind: "point", x: 43, y: 11, tile: "O" },
      { kind: "point", x: 14, y: 19, tile: "O" },
      { kind: "point", x: 24, y: 19, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
