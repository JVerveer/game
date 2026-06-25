import { cityDimsFor } from "./sizeTiers";
import type { CityMapLayout } from "./layoutTools";

export const WOKESHIRE_LAYOUT: CityMapLayout = {
  ...cityDimsFor("wokeshire"),
  exits: { W: "R", E: "R", S: "R" },
  layers: [
    [
      { kind: "rect", x: 4, y: 4, w: 48, h: 25, tile: "G" },

      // Amsterdam-style canal rings
      { kind: "rect", x: 7, y: 7, w: 42, h: 3, tile: "W" },
      { kind: "rect", x: 7, y: 19, w: 42, h: 3, tile: "W" },
      { kind: "rect", x: 13, y: 6, w: 3, h: 17, tile: "W" },
      { kind: "rect", x: 39, y: 6, w: 3, h: 17, tile: "W" },

      // Main bike/path grid
      { kind: "hline", x1: 8, x2: 48, y: 14, tile: "R" },
      { kind: "vline", x: 27, y1: 6, y2: 28, tile: "R" },

      // Bridges
      { kind: "rect", x: 13, y: 13, w: 4, h: 3, tile: "R" },
      { kind: "rect", x: 38, y: 13, w: 4, h: 3, tile: "R" },
      { kind: "rect", x: 25, y: 7, w: 5, h: 3, tile: "R" },
      { kind: "rect", x: 25, y: 19, w: 5, h: 3, tile: "R" },

      // Public square
      { kind: "rect", x: 19, y: 11, w: 17, h: 7, tile: "E" },

      // Tulip park
      { kind: "rect", x: 8, y: 23, w: 16, h: 4, tile: "Y" },

      // Train station plaza
      { kind: "rect", x: 32, y: 23, w: 10, h: 4, tile: "R" },
    ],
    [
      // Canal houses
      { kind: "rect", x: 8, y: 11, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 17, y: 11, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 34, y: 11, w: 4, h: 4, tile: "U" },
      { kind: "rect", x: 43, y: 11, w: 4, h: 4, tile: "U" },

      // Shop and healing center
      { kind: "rect", x: 21, y: 11, w: 4, h: 4, tile: "B" },
      { kind: "rect", x: 30, y: 11, w: 4, h: 4, tile: "H" },

      // Train station
      { kind: "rect", x: 35, y: 23, w: 6, h: 3, tile: "P" },

      // Activist/public art building
      { kind: "rect", x: 12, y: 24, w: 5, h: 3, tile: "A" },
    ],
    [
      // Doors
      { kind: "point", x: 10, y: 14, tile: "O" },
      { kind: "point", x: 19, y: 14, tile: "O" },
      { kind: "point", x: 23, y: 14, tile: "O" },
      { kind: "point", x: 32, y: 14, tile: "O" },
      { kind: "point", x: 36, y: 14, tile: "O" },
      { kind: "point", x: 45, y: 14, tile: "O" },
      { kind: "point", x: 15, y: 26, tile: "O" },
      { kind: "point", x: 36, y: 25, tile: "O" },
      { kind: "point", x: 37, y: 25, tile: "O" },
    ],
  ],
};