import type { GameMapId, Interaction, TownMapId } from "../maps";

export type EditorMapAsset = {
  id: TownMapId;
  name: string;
  rows: string[];
  objects: Record<string, string>;
  interactions?: Record<string, Interaction>;
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
