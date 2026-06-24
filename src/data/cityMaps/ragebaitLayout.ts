import type { CityMapLayout } from "./layoutTools";

export const RAGEBAIT_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  waterEdges: ["E"],
  exits: { N: "R", S: "R" },
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "G" },
      { kind: "rect", x: 5, y: 22, w: 46, h: 5, tile: "W" },
      { kind: "rect", x: 7, y: 18, w: 44, h: 4, tile: "S" },
      { kind: "rect", x: 8, y: 7, w: 41, h: 11, tile: "E" },
      { kind: "hline", x1: 8, x2: 49, y: 15, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 30, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 10, tile: "R" },
      { kind: "rect", x: 34, y: 22, w: 9, h: 5, tile: "R" },
      { kind: "rect", x: 15, y: 16, w: 9, h: 2, tile: "X" },
    ],
    [
      { kind: "rect", x: 10, y: 8, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 18, y: 8, w: 6, h: 4, tile: "B" },
      { kind: "rect", x: 31, y: 8, w: 6, h: 4, tile: "H" },
      { kind: "rect", x: 40, y: 8, w: 6, h: 4, tile: "A" },
      { kind: "rect", x: 35, y: 23, w: 7, h: 3, tile: "P" },
    ],
    [
      { kind: "point", x: 13, y: 11, tile: "O" },
      { kind: "point", x: 21, y: 11, tile: "O" },
      { kind: "point", x: 34, y: 11, tile: "O" },
      { kind: "point", x: 43, y: 11, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
