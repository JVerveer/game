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
];

// ── Satiria editable map layout ──────────────────────────────────────────────
// Coordinates are tile coordinates: x goes left→right, y goes top→bottom.
// Tile guide:
//   G grass, R path, E plaza, F fence, L flowers, X tall grass/foe grass
//   T small tree blocker, Y large tree blocker, S shore, W water, J dock, V save point
export const SATIRIA_MAP_SIZE = { width: 56, height: 35 };
export const SATIRIA_TREE_BORDER_LAYERS = 3;

export const SATIRIA_BASE_TERRAIN: SatiriaPaint[] = [
  { kind: "rect", x: 0, y: 0, w: SATIRIA_MAP_SIZE.width, h: SATIRIA_MAP_SIZE.height, tile: "G", note: "Empty editable grass canvas" },
];

export const SATIRIA_PATHS_AND_PLAZA: SatiriaPaint[] = [
];

export const SATIRIA_FENCES: SatiriaPaint[] = [
];

export const SATIRIA_FLOWERS: SatiriaPaint[] = [
];

export const SATIRIA_TALL_GRASS: SatiriaPaint[] = [
];

export const SATIRIA_SMALL_TREES: SatiriaPaint[] = [
];

export const SATIRIA_LARGE_TREE_BLOCKERS: SatiriaPaint[] = [
];

export const SATIRIA_WATER_AND_DOCK: SatiriaPaint[] = [
];

export const SATIRIA_SAVE_POINTS: SatiriaPaint[] = [
];

export const SATIRIA_OBJECTS: PixelObject[] = [
];

export const SATIRIA_OBJECT_MARKERS: Record<string, string> = {
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
