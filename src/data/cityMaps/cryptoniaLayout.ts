import { cityDimsFor } from "./sizeTiers";
import type { CityMapLayout } from "./layoutTools";

export const CRYPTONIA_LAYOUT: CityMapLayout = {
  ...cityDimsFor("cryptonia"),
  exits: { W: "R" },
  layers: [
    [
      { kind: "rect", x: 3, y: 4, w: 50, h: 25, tile: "S" },
      { kind: "rect", x: 39, y: 5, w: 10, h: 24, tile: "W" },
      { kind: "rect", x: 34, y: 8, w: 8, h: 18, tile: "R" },
      { kind: "rect", x: 9, y: 8, w: 27, h: 15, tile: "E" },
      { kind: "hline", x1: 9, x2: 42, y: 16, tile: "R" },
      { kind: "vline", x: 27, y1: 5, y2: 30, tile: "R" },
      { kind: "hline", x1: 12, x2: 35, y: 10, tile: "R" },
      { kind: "hline", x1: 12, x2: 35, y: 22, tile: "R" },
    ],
    [
      { kind: "rect", x: 11, y: 9, w: 5, h: 5, tile: "U" },
      { kind: "rect", x: 18, y: 8, w: 4, h: 6, tile: "A" },
      { kind: "rect", x: 24, y: 7, w: 4, h: 7, tile: "U" },
      { kind: "rect", x: 30, y: 8, w: 5, h: 6, tile: "A" },
      { kind: "rect", x: 11, y: 18, w: 6, h: 4, tile: "B" },
      { kind: "rect", x: 24, y: 18, w: 7, h: 4, tile: "H" },
      { kind: "rect", x: 34, y: 23, w: 8, h: 3, tile: "P" },
      { kind: "rect", x: 32, y: 18, w: 3, h: 5, tile: "U" },
    ],
    [
      { kind: "point", x: 14, y: 21, tile: "O" },
      { kind: "point", x: 27, y: 21, tile: "O" },
      { kind: "point", x: 35, y: 21, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};
