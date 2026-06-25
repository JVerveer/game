import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import { buildingCrestForKind, doorForBuildingAsset } from "../../../../data/cityMaps/mapAsset";

export const BUILDING_TILE_IDS = new Set(["A", "B", "H", "P", "U", "I", "O"]);

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

  const clearAt = (x: number, y: number) => {
    if (next[y]?.[x] !== undefined) next[y][x] = "G";
  };

  // Clear the known rectangle.
  for (let y = building.y; y < building.y + building.h; y++) {
    for (let x = building.x; x < building.x + building.w; x++) clearAt(x, y);
  }

  // Clear the door and the usual tile in front of it.
  clearAt(door.x, door.y);
  if (BUILDING_TILE_IDS.has(next[door.y + 1]?.[door.x] ?? "")) clearAt(door.x, door.y + 1);

  // Legacy/procedural buildings sometimes infer oddly when doors split the blob.
  // Flood clear any connected building/door tiles around the rectangle.
  const seeds = [
    { x: building.x, y: building.y },
    { x: building.x + building.w - 1, y: building.y },
    { x: building.x, y: building.y + building.h - 1 },
    { x: building.x + building.w - 1, y: building.y + building.h - 1 },
    door,
  ];
  const seen = new Set<string>();
  const queue = seeds.filter(seed => BUILDING_TILE_IDS.has(rows[seed.y]?.[seed.x] ?? "") || rows[seed.y]?.[seed.x] === "O");

  for (let i = 0; i < queue.length; i++) {
    const cur = queue[i];
    const key = `${cur.x},${cur.y}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const originalTile = rows[cur.y]?.[cur.x];
    if (!BUILDING_TILE_IDS.has(originalTile ?? "") && originalTile !== "O") continue;
    clearAt(cur.x, cur.y);

    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      const nextKey = `${nx},${ny}`;
      if (seen.has(nextKey)) return;
      const tile = rows[ny]?.[nx];
      if (BUILDING_TILE_IDS.has(tile ?? "") || tile === "O") queue.push({ x: nx, y: ny });
    });
  }

  return next;
};

export const clearBuildingFootprintsFromRows = (rows: string[][], buildings: EditorBuildingAsset[]) =>
  buildings.reduce((current, building) => clearBuildingFootprintFromRows(current, building), rows);
