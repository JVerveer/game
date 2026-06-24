import type { CityMapLayout } from "./layoutTools";

export const BREXITON_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  layers: [
    [
      { kind: "rect", x: 3, y: 3, w: 50, h: 27, tile: "G" },
      { kind: "rect", x: 5, y: 24, w: 46, h: 5, tile: "W" },
      { kind: "rect", x: 24, y: 23, w: 8, h: 7, tile: "R" },
      { kind: "rect", x: 33, y: 24, w: 10, h: 4, tile: "R" },
      { kind: "rect", x: 7, y: 6, w: 42, h: 17, tile: "E" },
      { kind: "hline", x1: 7, x2: 49, y: 18, tile: "R" },
      { kind: "vline", x: 27, y1: 4, y2: 30, tile: "R" },
      { kind: "hline", x1: 13, x2: 42, y: 10, tile: "R" },
      { kind: "hline", x1: 13, x2: 42, y: 15, tile: "R" },
      { kind: "vline", x: 13, y1: 7, y2: 22, tile: "R" },
      { kind: "vline", x: 42, y1: 7, y2: 22, tile: "R" },
    ],
    [
      { kind: "rect", x: 9, y: 7, w: 6, h: 3, tile: "U" },
      { kind: "rect", x: 17, y: 7, w: 6, h: 3, tile: "U" },
      { kind: "rect", x: 31, y: 7, w: 6, h: 3, tile: "U" },
      { kind: "rect", x: 39, y: 7, w: 6, h: 3, tile: "U" },
      { kind: "rect", x: 9, y: 12, w: 6, h: 3, tile: "B" },
      { kind: "rect", x: 23, y: 12, w: 8, h: 3, tile: "H" },
      { kind: "rect", x: 37, y: 12, w: 6, h: 3, tile: "B" },
      { kind: "rect", x: 8, y: 20, w: 14, h: 4, tile: "A" },
      { kind: "rect", x: 22, y: 18, w: 3, h: 6, tile: "U" },
      { kind: "rect", x: 34, y: 21, w: 8, h: 4, tile: "P" },
      { kind: "rect", x: 44, y: 20, w: 4, h: 3, tile: "U" },
    ],
    [
      { kind: "point", x: 14, y: 9, tile: "O" },
      { kind: "point", x: 20, y: 9, tile: "O" },
      { kind: "point", x: 34, y: 9, tile: "O" },
      { kind: "point", x: 42, y: 9, tile: "O" },
      { kind: "point", x: 12, y: 14, tile: "O" },
      { kind: "point", x: 27, y: 14, tile: "O" },
      { kind: "point", x: 40, y: 14, tile: "O" },
      { kind: "point", x: 36, y: 24, tile: "O" },
      { kind: "point", x: 37, y: 24, tile: "O" },
    ],
  ],
};

