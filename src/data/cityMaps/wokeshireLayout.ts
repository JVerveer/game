import type { CityMapLayout } from "./layoutTools";

export const WOKESHIRE_LAYOUT: CityMapLayout = {
  width: 56,
  height: 34,
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "G" },
      { kind: "rect", x: 7, y: 7, w: 42, h: 4, tile: "W" },
      { kind: "rect", x: 7, y: 18, w: 42, h: 4, tile: "W" },
      { kind: "rect", x: 16, y: 6, w: 5, h: 17, tile: "R" },
      { kind: "rect", x: 34, y: 6, w: 5, h: 17, tile: "R" },
      { kind: "rect", x: 9, y: 11, w: 38, h: 7, tile: "E" },
      { kind: "hline", x1: 9, x2: 47, y: 14, tile: "R" },
      { kind: "vline", x: 27, y1: 10, y2: 29, tile: "R" },
      { kind: "rect", x: 32, y: 23, w: 10, h: 4, tile: "R" },
    ],
    [
      { kind: "rect", x: 10, y: 12, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 15, y: 12, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 20, y: 12, w: 4, h: 4, tile: "B" },
      { kind: "rect", x: 31, y: 12, w: 4, h: 4, tile: "H" },
      { kind: "rect", x: 36, y: 12, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 41, y: 12, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 35, y: 23, w: 6, h: 3, tile: "P" },
      { kind: "rect", x: 45, y: 23, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 13, y: 23, w: 5, h: 3, tile: "A" },
    ],
    [
      { kind: "point", x: 12, y: 15, tile: "O" },
      { kind: "point", x: 17, y: 15, tile: "O" },
      { kind: "point", x: 22, y: 15, tile: "O" },
      { kind: "point", x: 33, y: 15, tile: "O" },
      { kind: "point", x: 38, y: 15, tile: "O" },
      { kind: "point", x: 43, y: 15, tile: "O" },
      { kind: "point", x: 15, y: 25, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};

