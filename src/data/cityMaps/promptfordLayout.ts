import type { CityMapLayout } from "./layoutTools";

export const PROMPTFORD_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  waterEdges: ["E"],
  exits: { S: "R", E: "J" },
  layers: [
    [
      { kind: "rect", x: 3, y: 4, w: 50, h: 25, tile: "G" },
      { kind: "rect", x: 6, y: 21, w: 44, h: 4, tile: "W" },
      { kind: "rect", x: 18, y: 20, w: 8, h: 6, tile: "R" },
      { kind: "rect", x: 33, y: 20, w: 9, h: 6, tile: "R" },
      { kind: "rect", x: 8, y: 7, w: 40, h: 13, tile: "E" },
      { kind: "hline", x1: 8, x2: 48, y: 13, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 29, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 8, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 18, tile: "R" },
    ],
    [
      { kind: "rect", x: 9, y: 8, w: 7, h: 3, tile: "A" },
      { kind: "rect", x: 18, y: 8, w: 7, h: 3, tile: "A" },
      { kind: "rect", x: 31, y: 8, w: 7, h: 3, tile: "A" },
      { kind: "rect", x: 40, y: 8, w: 7, h: 3, tile: "A" },
      { kind: "rect", x: 10, y: 15, w: 7, h: 3, tile: "B" },
      { kind: "rect", x: 24, y: 15, w: 7, h: 3, tile: "H" },
      { kind: "rect", x: 39, y: 15, w: 7, h: 3, tile: "B" },
      { kind: "rect", x: 34, y: 23, w: 8, h: 3, tile: "P" },
      { kind: "rect", x: 23, y: 11, w: 3, h: 7, tile: "U" },
    ],
    [
      { kind: "point", x: 13, y: 10, tile: "O" },
      { kind: "point", x: 22, y: 10, tile: "O" },
      { kind: "point", x: 34, y: 10, tile: "O" },
      { kind: "point", x: 43, y: 10, tile: "O" },
      { kind: "point", x: 13, y: 17, tile: "O" },
      { kind: "point", x: 27, y: 17, tile: "O" },
      { kind: "point", x: 42, y: 17, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
