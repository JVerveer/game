import { MAIN_TOWN_IDS, type GameMapId, type TownMapId } from "../maps";
import { SATIRIA_BUILDINGS_LAYOUT } from "./satiriaLayout";
import type { PixelBuilding } from "./sceneTypes";

export const SATIRIA_BUILDINGS: PixelBuilding[] = SATIRIA_BUILDINGS_LAYOUT.map(({ x, y, w, h, color, kind, crest }) => ({
  x,
  y,
  w,
  h,
  color,
  kind,
  crest,
}));

const BUILDING_TILE_META: Record<string, Pick<PixelBuilding, "color" | "kind" | "crest">> = {
  A: { color: "green", kind: "shop", crest: "$" },
  B: { color: "red", kind: "house", crest: "⌂" },
  H: { color: "blue", kind: "hall", crest: "+" },
  I: { color: "purple", kind: "house", crest: "◆" },
  P: { color: "red", kind: "station", crest: "T" },
  U: { color: "purple", kind: "house", crest: "♦" },
};

const isTownMap = (id: GameMapId): id is TownMapId => MAIN_TOWN_IDS.includes(id as TownMapId);

const inferPixelBuildings = (rows: string[][]): PixelBuilding[] => {
  const seen = new Set<string>();
  const buildings: PixelBuilding[] = [];
  const height = rows.length;
  const width = rows[0]?.length ?? 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tileName = rows[y]?.[x];
      const meta = tileName ? BUILDING_TILE_META[tileName] : undefined;
      const key = `${x},${y}`;
      if (!meta || seen.has(key)) continue;

      const queue = [{ x, y }];
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      seen.add(key);

      for (let i = 0; i < queue.length; i++) {
        const cur = queue[i];
        minX = Math.min(minX, cur.x);
        maxX = Math.max(maxX, cur.x);
        minY = Math.min(minY, cur.y);
        maxY = Math.max(maxY, cur.y);

        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          const nextKey = `${nx},${ny}`;
          if (seen.has(nextKey) || rows[ny]?.[nx] !== tileName) return;
          seen.add(nextKey);
          queue.push({ x: nx, y: ny });
        });
      }

      buildings.push({
        x: minX,
        y: minY,
        w: maxX - minX + 1,
        h: maxY - minY + 1,
        ...meta,
      });
    }
  }

  return buildings;
};

export const pixelBuildingsFor = (mapId: GameMapId, rows: string[][]): PixelBuilding[] =>
  mapId === "satiria" ? SATIRIA_BUILDINGS : isTownMap(mapId) ? inferPixelBuildings(rows) : [];

