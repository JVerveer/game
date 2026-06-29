import type { Interaction, TownMapId } from "../maps";

export type EditorNpcAsset = {
  id: string;
  x: number;
  y: number;
  homeX?: number;
  homeY?: number;
  name: string;
  lines: string[];
  variant?: number;
  style?: string;
  walking?: boolean;
  sheetAssetId?: string;
};

export type EditorBuildingKind = "house" | "shop" | "healing" | "station" | "hall";
export type EditorBuildingColor = "red" | "blue" | "purple" | "green";

export type EditorBuildingAsset = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: EditorBuildingKind;
  color: EditorBuildingColor;
  crest?: string;
};

export type EditorMapAsset = {
  id: TownMapId;
  name: string;
  rows: string[];
  objects: Record<string, string>;
  interactions?: Record<string, Interaction>;
  buildings?: EditorBuildingAsset[];
  npcs?: EditorNpcAsset[];
  spawn?: { x: number; y: number };
};

export const stringRowsToGrid = (rows: string[]) => rows.map((row) => row.split(""));

export const gridRowsToStrings = (rows: string[][]) => rows.map((row) => row.join(""));

export const mapAssetRows = (asset: Pick<EditorMapAsset, "rows">) => stringRowsToGrid(asset.rows);

export const mapAssetSize = (asset: Pick<EditorMapAsset, "rows">) => {
  const height = asset.rows.length;
  const width = asset.rows[0]?.length ?? 0;
  return { width, height };
};

export const assetCoord = (x: number, y: number) => `${x},${y}`;

export const parseAssetCoord = (coord: string) => {
  const [x, y] = coord.split(",").map(Number);
  return { x, y };
};

export const buildingTileForKind = (kind: EditorBuildingKind) => {
  if (kind === "shop") return "A";
  if (kind === "healing") return "H";
  if (kind === "station") return "P";
  if (kind === "hall") return "I";
  return "U";
};

export const buildingCrestForKind = (kind: EditorBuildingKind) => {
  if (kind === "shop") return "$";
  if (kind === "healing") return "+";
  if (kind === "station") return "T";
  if (kind === "hall") return "◆";
  return "⌂";
};

export const doorForBuildingAsset = (building: Pick<EditorBuildingAsset, "x" | "y" | "w" | "h">) => ({
  x: building.x + Math.floor(building.w / 2),
  y: building.y + building.h - 1,
});

export const applyBuildingsToRows = (rows: string[][], buildings: EditorBuildingAsset[] = []) => {
  const next = rows.map((row) => [...row]);
  buildings.forEach((building) => {
    const tile = buildingTileForKind(building.kind);
    for (let y = building.y; y < building.y + building.h; y++) {
      for (let x = building.x; x < building.x + building.w; x++) {
        if (next[y]?.[x] !== undefined) next[y][x] = tile;
      }
    }
    const door = doorForBuildingAsset(building);
    if (next[door.y]?.[door.x] !== undefined) next[door.y][door.x] = "O";
  });
  return next;
};

export const mapAssetRowsWithBuildings = (asset: Pick<EditorMapAsset, "rows" | "buildings">) =>
  applyBuildingsToRows(mapAssetRows(asset), asset.buildings ?? []);
