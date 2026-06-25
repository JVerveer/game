import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import { buildingCrestForKind, doorForBuildingAsset } from "../../../data/cityMaps/mapAsset";
import { BUILDING_TILE_IDS } from "./editorConstants";

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

export const inferBuildingsFromRowsForEditor = (rows: string[][]): EditorBuildingAsset[] => {
  const seen = new Set<string>();
  const buildings: EditorBuildingAsset[] = [];
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  const buildingTiles = new Set(["A", "B", "H", "I", "P", "U"]);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = rows[y]?.[x];
      if (!tile || !buildingTiles.has(tile) || seen.has(`${x},${y}`)) continue;

      const queue = [{ x, y }];
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      seen.add(`${x},${y}`);

      for (let i = 0; i < queue.length; i++) {
        const cur = queue[i];
        minX = Math.min(minX, cur.x);
        maxX = Math.max(maxX, cur.x);
        minY = Math.min(minY, cur.y);
        maxY = Math.max(maxY, cur.y);

        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          const key = `${nx},${ny}`;
          if (seen.has(key) || rows[ny]?.[nx] !== tile) return;
          seen.add(key);
          queue.push({ x: nx, y: ny });
        });
      }

      const kind = tileKindForEditorBuilding(tile);
      if (!kind) continue;
      buildings.push({
        id: `legacy-building-${minX}-${minY}-${tile}`,
        x: minX,
        y: minY,
        w: maxX - minX + 1,
        h: maxY - minY + 1,
        kind,
        color: colorForEditorBuildingKind(kind),
        crest: buildingCrestForKind(kind),
      });
    }
  }

  return buildings;
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
      if (next[y]?.[x] !== undefined && BUILDING_TILE_IDS.has(next[y][x])) next[y][x] = "G";
    }
  }
  if (next[door.y]?.[door.x] !== undefined && BUILDING_TILE_IDS.has(next[door.y][door.x])) next[door.y][door.x] = "G";
  if (next[door.y]?.[door.x] === "O") next[door.y][door.x] = "G";
  return next;
};

export const clearBuildingFootprintsFromRows = (rows: string[][], buildings: EditorBuildingAsset[]) =>
  buildings.reduce((current, building) => clearBuildingFootprintFromRows(current, building), rows);
