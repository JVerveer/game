import { objectClassForId, objectLabelForId, MAP_OBJECT_DEFS } from "../data/objectRegistry";

const BUILDING_TILES = new Set(["B", "H", "P", "A", "U", "I"]);

export const tileShapeClassFor = (rows: string[][], x: number, y: number, tile: string) => {
  if (!BUILDING_TILES.has(tile)) return "";
  const same = (dx: number, dy: number) => rows[y + dy]?.[x + dx] === tile;
  return [
    "building-tile",
    same(0, -1) ? "building-mid-y" : "building-top",
    same(0, 1) ? "building-mid-y" : "building-bottom",
    same(-1, 0) ? "building-mid-x" : "building-left",
    same(1, 0) ? "building-mid-x" : "building-right",
  ].join(" ");
};

export const objectClassFor = (obj: string) => objectClassForId(obj);

export const objectLabelFor = (obj: string) => objectLabelForId(obj);

export { MAP_OBJECT_DEFS };
