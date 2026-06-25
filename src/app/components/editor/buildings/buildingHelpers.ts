import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../data/cityMaps/mapAsset";
import { buildingCrestForKind, doorForBuildingAsset } from "../../data/cityMaps/mapAsset";
import { BUILDING_TILE_IDS } from "../shared/editorConstants";

export const tileKindForEditorBuilding = (tile: string): EditorBuildingKind | null => {
  if (tile === "A" || tile === "B") return tile === "A" ? "shop" : "house";
  if (tile === "H") return "healing";
  if (tile === "P") return "station";
  if (tile === "I") return "hall";
  if (tile === "U") return "house";
  return null;
};

export const colorForEditorBuildingKind = (kind: EditorBuildingKind): EditorBuildingColor => {
  if (kind === "shop") return "green";
  if (kind === "healing") return "blue";
  if (kind === "station") return "red";
  return "purple";
};

export const buildingAtCoord = (buildings: EditorBuildingAsset[], x: number, y: number) =>
  buildings.find(building =>
    x >= building.x &&
    x < building.x + building.w &&
    y >= building.y &&
    y < building.y + building.h
  );

export const clearBuildingFootprintFromRows = (rows: string[][], building: EditorBuildingAsset) => {
  const next = rows.map(row => [...row]);
  const door = doorForBuildingAsset(building);

  for (let y = building.y; y < building.y + building.h; y++) {
    for (let x = building.x; x < building.x + building.w; x++) {
      if (next[y]?.[x] !== undefined) next[y][x] = "G";
    }
  }

  if (next[door.y]?.[door.x] !== undefined) next[door.y][door.x] = "G";
  return next;
};
