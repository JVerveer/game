import type { CityMapLayout } from "./layoutTools";

export const TWEETSBURG_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "S" },
      { kind: "rect", x: 8, y: 7, w: 40, h: 18, tile: "E" },
      { kind: "hline", x1: 8, x2: 48, y: 16, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 29, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 10, tile: "R" },
      { kind: "hline", x1: 12, x2: 44, y: 22, tile: "R" },
      { kind: "rect", x: 18, y: 12, w: 19, h: 8, tile: "R" },
    ],
    [
      { kind: "rect", x: 10, y: 8, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 18, y: 8, w: 6, h: 4, tile: "A" },
      { kind: "rect", x: 31, y: 8, w: 6, h: 4, tile: "H" },
      { kind: "rect", x: 40, y: 8, w: 6, h: 4, tile: "U" },
      { kind: "rect", x: 12, y: 21, w: 6, h: 3, tile: "B" },
      { kind: "rect", x: 35, y: 21, w: 7, h: 3, tile: "P" },
      { kind: "rect", x: 24, y: 12, w: 7, h: 7, tile: "U" },
    ],
    [
      { kind: "point", x: 13, y: 11, tile: "O" },
      { kind: "point", x: 21, y: 11, tile: "O" },
      { kind: "point", x: 34, y: 11, tile: "O" },
      { kind: "point", x: 43, y: 11, tile: "O" },
      { kind: "point", x: 15, y: 23, tile: "O" },
      { kind: "point", x: 36, y: 23, tile: "O" },
      { kind: "point", x: 37, y: 23, tile: "O" },
    ],
  ],
};
