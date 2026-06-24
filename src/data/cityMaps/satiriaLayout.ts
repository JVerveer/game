import type { PixelObject } from "./sceneTypes";

export type SatiriaBuildingKind = "house" | "shop" | "hall" | "station";
export type SatiriaBuildingColor = "red" | "blue" | "purple" | "green";
export type SatiriaEntranceType = "shop" | "healing" | "house" | "train";
export type SatiriaTile = "G" | "R" | "E" | "F" | "L" | "X" | "T" | "Y" | "S" | "W" | "J" | "V";
export type SatiriaPaint =
  | { kind: "rect"; x: number; y: number; w: number; h: number; tile: SatiriaTile; note?: string }
  | { kind: "hline"; x1: number; x2: number; y: number; tile: SatiriaTile; note?: string }
  | { kind: "vline"; x: number; y1: number; y2: number; tile: SatiriaTile; note?: string };

export type SatiriaBuildingLayout = {
  id: string;
  type: SatiriaEntranceType;
  x: number;
  y: number;
  w: number;
  h: number;
  color: SatiriaBuildingColor;
  kind: SatiriaBuildingKind;
  crest: string;
};

export const SATIRIA_BUILDINGS_LAYOUT: SatiriaBuildingLayout[] = [
  { id: "home-red", type: "house", x: 8, y: 5, w: 7, h: 4, color: "red", kind: "house", crest: "★" },
  { id: "home-green", type: "house", x: 19, y: 5, w: 8, h: 5, color: "green", kind: "house", crest: "⌂" },
  { id: "home-purple", type: "house", x: 30, y: 5, w: 7, h: 6, color: "purple", kind: "house", crest: "♦" },
  { id: "home-red-tall", type: "house", x: 40, y: 5, w: 8, h: 7, color: "red", kind: "house", crest: "□" },
  { id: "shop", type: "shop", x: 3, y: 16, w: 5, h: 5, color: "green", kind: "shop", crest: "$" },
  { id: "healing", type: "healing", x: 14, y: 16, w: 5, h: 5, color: "blue", kind: "hall", crest: "+" },
  { id: "station", type: "train", x: 39, y: 18, w: 5, h: 3, color: "red", kind: "station", crest: "T" },
];

// ── Satiria editable map layout ──────────────────────────────────────────────
// Coordinates are tile coordinates: x goes left→right, y goes top→bottom.
// Tile guide:
//   G grass, R path, E plaza, F fence, L flowers, X tall grass/foe grass
//   T small tree blocker, Y large tree blocker, S shore, W water, J dock, V save point
export const SATIRIA_MAP_SIZE = { width: 56, height: 35 };
export const SATIRIA_TREE_BORDER_LAYERS = 3;

export const SATIRIA_BASE_TERRAIN: SatiriaPaint[] = [
  { kind: "rect", x: 3, y: 3, w: 50, h: 29, tile: "G", note: "Main playable grass field" },
];

export const SATIRIA_PATHS_AND_PLAZA: SatiriaPaint[] = [
  { kind: "vline", x: 27, y1: 0, y2: 34, tile: "R", note: "Main north/south road, left lane" },
  { kind: "vline", x: 28, y1: 0, y2: 34, tile: "R", note: "Main north/south road, right lane" },
  { kind: "hline", x1: 6, x2: 49, y: 13, tile: "R", note: "Upper town road" },
  { kind: "hline", x1: 6, x2: 49, y: 14, tile: "R", note: "Upper town road" },
  { kind: "hline", x1: 5, x2: 27, y: 23, tile: "R", note: "Lower west road" },
  { kind: "hline", x1: 5, x2: 27, y: 24, tile: "R", note: "Lower west road" },
  { kind: "rect", x: 23, y: 16, w: 11, h: 7, tile: "E", note: "Central plaza outer stones" },
  { kind: "rect", x: 24, y: 17, w: 9, h: 5, tile: "E", note: "Central plaza inner stones" },
];

export const SATIRIA_FENCES: SatiriaPaint[] = [
  { kind: "vline", x: 6, y1: 4, y2: 6, tile: "F" },
  { kind: "hline", x1: 6, x2: 11, y: 11, tile: "F" },
  { kind: "hline", x1: 12, x2: 22, y: 11, tile: "F" },
  { kind: "hline", x1: 24, x2: 26, y: 11, tile: "F" },
  { kind: "hline", x1: 30, x2: 32, y: 12, tile: "F" },
  { kind: "hline", x1: 34, x2: 38, y: 12, tile: "F" },
  { kind: "hline", x1: 40, x2: 42, y: 12, tile: "F" },
  { kind: "hline", x1: 44, x2: 49, y: 12, tile: "F" },
  { kind: "hline", x1: 3, x2: 6, y: 22, tile: "F" },
  { kind: "hline", x1: 8, x2: 14, y: 22, tile: "F" },
  { kind: "hline", x1: 16, x2: 20, y: 22, tile: "F" },
  { kind: "hline", x1: 36, x2: 40, y: 24, tile: "F" },
  { kind: "hline", x1: 43, x2: 48, y: 24, tile: "F" },
];

export const SATIRIA_FLOWERS: SatiriaPaint[] = [
  { kind: "rect", x: 14, y: 12, w: 4, h: 1, tile: "L" },
  { kind: "rect", x: 38, y: 12, w: 3, h: 1, tile: "L" },
  { kind: "rect", x: 24, y: 22, w: 3, h: 1, tile: "L" },
  { kind: "rect", x: 34, y: 15, w: 4, h: 1, tile: "L" },
  { kind: "rect", x: 43, y: 15, w: 3, h: 1, tile: "L" },
  { kind: "rect", x: 34, y: 25, w: 4, h: 2, tile: "L" },
  { kind: "rect", x: 44, y: 25, w: 3, h: 2, tile: "L" },
];

export const SATIRIA_TALL_GRASS: SatiriaPaint[] = [
  { kind: "rect", x: 18, y: 25, w: 5, h: 3, tile: "X", note: "West encounter patch" },
  { kind: "rect", x: 31, y: 25, w: 7, h: 4, tile: "X", note: "East encounter patch" },
];

export const SATIRIA_SMALL_TREES: SatiriaPaint[] = [
  { kind: "rect", x: 5, y: 8, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 17, y: 8, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 39, y: 8, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 48, y: 12, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 5, y: 15, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 20, y: 15, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 17, y: 26, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 22, y: 26, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 32, y: 25, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 36, y: 26, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 18, y: 30, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 24, y: 30, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 34, y: 30, w: 1, h: 1, tile: "T" },
  { kind: "rect", x: 41, y: 30, w: 1, h: 1, tile: "T" },
];

export const SATIRIA_LARGE_TREE_BLOCKERS: SatiriaPaint[] = [
  { kind: "rect", x: 15, y: 27, w: 2, h: 2, tile: "Y", note: "Matches medium tree object" },
  { kind: "rect", x: 46, y: 25, w: 2, h: 2, tile: "Y", note: "Matches medium tree object" },
  { kind: "rect", x: 48, y: 28, w: 3, h: 3, tile: "Y", note: "Matches large tree object" },
];

export const SATIRIA_WATER_AND_DOCK: SatiriaPaint[] = [
  { kind: "rect", x: 3, y: 25, w: 11, h: 7, tile: "S", note: "Square pond shore" },
  { kind: "rect", x: 4, y: 26, w: 9, h: 5, tile: "W", note: "Square pond water" },
  { kind: "rect", x: 8, y: 24, w: 2, h: 6, tile: "J", note: "Dock starts on land and enters water" },
];

export const SATIRIA_SAVE_POINTS: SatiriaPaint[] = [
  { kind: "rect", x: 26, y: 19, w: 1, h: 1, tile: "V", note: "Central save point" },
];

export const SATIRIA_OBJECTS: PixelObject[] = [
  { sprite: "fountain", x: 27, y: 18, w: 2, h: 2, className: "pixel-object-fountain" },
  { sprite: "statue", x: 27, y: 17, h: 1.5 },
  { sprite: "bench", x: 24, y: 16 },
  { sprite: "bench", x: 32, y: 16 },
  { sprite: "bench", x: 24, y: 22 },
  { sprite: "bench", x: 32, y: 22 },
  { sprite: "lamp", x: 25.4, y: 15.2 },
  { sprite: "lamp", x: 31.2, y: 15.2 },
  { sprite: "lamp", x: 25.4, y: 21.3 },
  { sprite: "lamp", x: 31.2, y: 21.3 },
  { sprite: "mediumTree", x: 15, y: 27, w: 2, h: 2 },
  { sprite: "mediumTree", x: 46, y: 25, w: 2, h: 2 },
  { sprite: "largeTree", x: 48, y: 28, w: 3, h: 3 },
];

export const SATIRIA_OBJECT_MARKERS: Record<string, string> = {
  "28,18": "SATIRIA_FOUNTAIN",
  "9,23": "SATIRIA_POND_SIGN",
  "28,19": "SATIRIA_STATUE",
  "24,16": "SATIRIA_BENCH",
  "32,16": "SATIRIA_BENCH",
  "24,22": "SATIRIA_BENCH",
  "32,22": "SATIRIA_BENCH",
  "26,16": "SATIRIA_LAMP",
  "31,16": "SATIRIA_LAMP",
  "26,22": "SATIRIA_LAMP",
  "31,22": "SATIRIA_LAMP",
};

export const SATIRIA_TERRAIN_LAYERS: SatiriaPaint[][] = [
  SATIRIA_BASE_TERRAIN,
  SATIRIA_PATHS_AND_PLAZA,
  SATIRIA_FENCES,
  SATIRIA_TALL_GRASS,
  SATIRIA_FLOWERS,
  SATIRIA_SMALL_TREES,
  SATIRIA_LARGE_TREE_BLOCKERS,
  SATIRIA_WATER_AND_DOCK,
  SATIRIA_SAVE_POINTS,
];

export const doorForBuilding = (building: SatiriaBuildingLayout) => ({
  x: building.x + Math.floor(building.w / 2),
  y: building.y + building.h - 1,
});

export const coord = ({ x, y }: { x: number; y: number }) => `${x},${y}`;

export const SATIRIA_ENTRANCES = SATIRIA_BUILDINGS_LAYOUT.map((building) => ({
  id: building.id,
  type: building.type,
  door: doorForBuilding(building),
  front: { x: doorForBuilding(building).x, y: doorForBuilding(building).y + 1 },
}));
