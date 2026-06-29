export type RuntimePaintEntry = string | {
  assetId?: string;
  src?: string;
  width?: number;
  height?: number;
};

export type RuntimePaintMap = Record<string, RuntimePaintEntry>;

export const TERRAIN_PAINT_STORAGE_KEY = "limezu.terrainPaint.v1";
export const OBJECT_PAINT_STORAGE_KEY = "limezu.objectPaint.v1";

function coordKey(x: number, y: number) {
  return `${x},${y}`;
}

function readPaintMap(key: string): RuntimePaintMap {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
}

function srcFromEntry(entry: RuntimePaintEntry | undefined) {
  if (!entry || typeof entry === "string") return undefined;
  return entry.src;
}

export function terrainImageForCoordFast(x: number, y: number) {
  return srcFromEntry(readPaintMap(TERRAIN_PAINT_STORAGE_KEY)[coordKey(x, y)]);
}

export function objectImageForCoordFast(x: number, y: number) {
  return srcFromEntry(readPaintMap(OBJECT_PAINT_STORAGE_KEY)[coordKey(x, y)]);
}

export function terrainColorForTile(tile: string) {
  if (tile === "G" || tile === "X" || tile === "T" || tile === "Y" || tile === "L") return "#56b447";
  if (tile === "R" || tile === "O" || tile === "Q" || tile === "N") return "#d4a15f";
  if (tile === "V" || tile === "E") return "#9a9a9a";
  if (tile === "W") return "#2f9bd2";
  if (tile === "S") return "#f0d079";
  if (tile === "J") return "#9b5b2b";
  if (tile === "M" || tile === "C" || tile === "D") return "#676767";
  if (tile === "F") return "#8b4f25";
  return "#56b447";
}
