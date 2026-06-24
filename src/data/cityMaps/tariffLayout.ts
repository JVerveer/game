import type { CityMapLayout } from "./layoutTools";

export const TARIFF_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  waterEdges: ["E"],
  exits: { W: "R", N: "R", S: "R" },
  layers: [
    [
      { kind: "rect", x: 3, y: 4, w: 50, h: 25, tile: "G" },
      { kind: "rect", x: 5, y: 23, w: 46, h: 5, tile: "W" },
      { kind: "rect", x: 8, y: 18, w: 41, h: 5, tile: "S" },
      { kind: "rect", x: 11, y: 8, w: 35, h: 10, tile: "E" },
      { kind: "hline", x1: 11, x2: 46, y: 15, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 30, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 10, tile: "R" },
      { kind: "rect", x: 33, y: 22, w: 10, h: 5, tile: "R" },
      { kind: "rect", x: 8, y: 16, w: 5, h: 4, tile: "X" },
    ],
    [
      { kind: "rect", x: 12, y: 9, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 22, y: 9, w: 6, h: 4, tile: "B" },
      { kind: "rect", x: 32, y: 9, w: 6, h: 4, tile: "H" },
      { kind: "rect", x: 40, y: 9, w: 5, h: 4, tile: "A" },
      { kind: "rect", x: 35, y: 23, w: 7, h: 3, tile: "P" },
    ],
    [
      { kind: "point", x: 15, y: 12, tile: "O" },
      { kind: "point", x: 25, y: 12, tile: "O" },
      { kind: "point", x: 35, y: 12, tile: "O" },
      { kind: "point", x: 42, y: 12, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
