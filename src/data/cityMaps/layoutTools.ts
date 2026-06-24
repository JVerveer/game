import { addTreeBorder, hline, makeBlankMap, rect, vline } from "./utils";

export type CityExitDirection = "N" | "S" | "E" | "W";

export type CityMapTile =
  | "G" | "R" | "E" | "F" | "L" | "X" | "T" | "Y" | "S" | "W" | "J" | "V" | "O"
  | "A" | "B" | "H" | "P" | "U";

export type CityPaint =
  | { kind: "rect"; x: number; y: number; w: number; h: number; tile: CityMapTile; note?: string }
  | { kind: "hline"; x1: number; x2: number; y: number; tile: CityMapTile; note?: string }
  | { kind: "vline"; x: number; y1: number; y2: number; tile: CityMapTile; note?: string }
  | { kind: "point"; x: number; y: number; tile: CityMapTile; note?: string };

export type CityMapLayout = {
  width: number;
  height: number;
  baseWidth?: number;
  baseHeight?: number;
  fill?: CityMapTile;
  treeBorderLayers?: number;
  autoBuildingDoors?: boolean;
  exits?: Partial<Record<CityExitDirection, CityMapTile>>;
  waterEdges?: CityExitDirection[];
  layers: CityPaint[][];
};

export const paintCityShape = (map: string[][], shape: CityPaint) => {
  if (shape.kind === "rect") rect(map, shape.x, shape.y, shape.w, shape.h, shape.tile);
  if (shape.kind === "hline") hline(map, shape.x1, shape.x2, shape.y, shape.tile);
  if (shape.kind === "vline") vline(map, shape.x, shape.y1, shape.y2, shape.tile);
  if (shape.kind === "point" && map[shape.y]?.[shape.x] !== undefined) map[shape.y][shape.x] = shape.tile;
};

const shiftedShape = (shape: CityPaint, offsetX: number, offsetY: number): CityPaint => {
  if (shape.kind === "rect") return { ...shape, x: shape.x + offsetX, y: shape.y + offsetY };
  if (shape.kind === "hline") return { ...shape, x1: shape.x1 + offsetX, x2: shape.x2 + offsetX, y: shape.y + offsetY };
  if (shape.kind === "vline") return { ...shape, x: shape.x + offsetX, y1: shape.y1 + offsetY, y2: shape.y2 + offsetY };
  return { ...shape, x: shape.x + offsetX, y: shape.y + offsetY };
};

const canDecorate = (map: string[][], x: number, y: number, w = 1, h = 1) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (map[ry]?.[cx] !== "G" && map[ry]?.[cx] !== "X") return false;
    }
  }
  return true;
};

const canBuildOn = (map: string[][], x: number, y: number, w = 1, h = 1) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      const tile = map[ry]?.[cx];
      if (tile !== "G" && tile !== "X" && tile !== "S") return false;
    }
  }
  return true;
};

const BUILDING_TILES = new Set(["A", "B", "H", "P", "U", "O"]);
const ROAD_SAFE_TILES = new Set(["G", "R", "E", "X", "S", "J"]);

const paintSafeRect = (map: string[][], x: number, y: number, w: number, h: number, tile: CityMapTile) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      const current = map[ry]?.[cx];
      if (current === undefined || BUILDING_TILES.has(current)) continue;
      if (!ROAD_SAFE_TILES.has(current) && current !== "T" && current !== "Y" && !(tile === "J" && current === "W")) continue;
      map[ry][cx] = tile;
    }
  }
};

const hlineSafe = (map: string[][], x1: number, x2: number, y: number, tile: CityMapTile) =>
  paintSafeRect(map, x1, y, x2 - x1 + 1, 1, tile);

const vlineSafe = (map: string[][], x: number, y1: number, y2: number, tile: CityMapTile) =>
  paintSafeRect(map, x, y1, 1, y2 - y1 + 1, tile);

const inCenterSquare = (x: number, y: number, centerX: number, centerY: number) =>
  Math.abs(x - centerX) <= 9 && Math.abs(y - centerY) <= 6;

const overlapsCenterSquare = (x: number, y: number, w: number, h: number, centerX: number, centerY: number) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (inCenterSquare(cx, ry, centerX, centerY)) return true;
    }
  }
  return false;
};

const clearCenterSquare = (map: string[][], centerX: number, centerY: number) => {
  for (let y = centerY - 5; y <= centerY + 5; y++) {
    for (let x = centerX - 8; x <= centerX + 8; x++) {
      const tile = map[y]?.[x];
      if (tile === undefined || BUILDING_TILES.has(tile)) continue;
      map[y][x] = "E";
    }
  }
  hlineSafe(map, centerX - 10, centerX + 10, centerY, "R");
  vlineSafe(map, centerX, centerY - 7, centerY + 7, "R");
  vlineSafe(map, centerX + 1, centerY - 7, centerY + 7, "R");
};

const placeIfGrass = (map: string[][], x: number, y: number, w: number, h: number, tile: CityMapTile, centerX: number, centerY: number) => {
  if (overlapsCenterSquare(x, y, w, h, centerX, centerY) || !canDecorate(map, x, y, w, h)) return;
  rect(map, x, y, w, h, tile);
};

type ExpandedBuildingPlan = { x: number; y: number; w: number; h: number; tile: CityMapTile };

const expandedBuildingPlansFor = (width: number, height: number): ExpandedBuildingPlan[] => {
  const plans: ExpandedBuildingPlan[] = [
    { x: 8, y: 8, w: 7, h: 4, tile: "B" },
    { x: width - 16, y: 8, w: 7, h: 5, tile: "U" },
    { x: 9, y: height - 16, w: 8, h: 4, tile: "B" },
    { x: width - 17, y: height - 16, w: 7, h: 4, tile: "U" },
  ];

  if (width > 70) {
    plans.push(
      { x: 22, y: 6, w: 6, h: 5, tile: "B" },
      { x: 34, y: 6, w: 7, h: 4, tile: "U" },
      { x: width - 42, y: 6, w: 7, h: 4, tile: "B" },
      { x: width - 28, y: 6, w: 6, h: 5, tile: "U" },
      { x: 22, y: height - 13, w: 7, h: 4, tile: "B" },
      { x: width - 30, y: height - 13, w: 7, h: 4, tile: "B" },
      { x: 6, y: 21, w: 6, h: 4, tile: "U" },
      { x: width - 13, y: 22, w: 6, h: 4, tile: "B" },
    );
  }

  if (width > 90) {
    plans.push(
      { x: 45, y: 7, w: 7, h: 5, tile: "U" },
      { x: width - 54, y: 7, w: 8, h: 5, tile: "B" },
      { x: 38, y: height - 14, w: 8, h: 4, tile: "B" },
      { x: width - 48, y: height - 14, w: 8, h: 4, tile: "U" },
      { x: 7, y: 31, w: 7, h: 5, tile: "B" },
      { x: width - 16, y: 32, w: 7, h: 5, tile: "U" },
      { x: 25, y: 18, w: 6, h: 4, tile: "B" },
      { x: width - 33, y: 18, w: 6, h: 4, tile: "U" },
    );
  }

  if (width > 120) {
    const columns = [18, 32, 48, 64, width - 72, width - 56, width - 40, width - 24];
    columns.forEach((x, index) => {
      plans.push({ x, y: 6, w: index % 2 === 0 ? 8 : 6, h: index % 3 === 0 ? 5 : 4, tile: index % 2 === 0 ? "B" : "U" });
      plans.push({ x: Math.max(6, x - 2), y: height - 13, w: index % 2 === 0 ? 7 : 8, h: 4, tile: index % 2 === 0 ? "U" : "B" });
    });
    [16, 28, 40, height - 28, height - 18].forEach((y, index) => {
      plans.push({ x: 6, y, w: 7, h: index % 2 === 0 ? 4 : 5, tile: index % 2 === 0 ? "B" : "U" });
      plans.push({ x: width - 15, y, w: 7, h: index % 2 === 0 ? 5 : 4, tile: index % 2 === 0 ? "U" : "B" });
    });
  }

  return plans;
};

const addExpandedCityDecor = (map: string[][], centerX: number, centerY: number) => {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  if (width <= 60 && height <= 40) return;

  const inset = 6;
  hlineSafe(map, inset, width - inset - 1, Math.max(inset, centerY - 12), "R");
  hlineSafe(map, inset, width - inset - 1, Math.min(height - inset - 1, centerY + 12), "R");
  vlineSafe(map, Math.max(inset, centerX - 16), inset, height - inset - 1, "R");
  vlineSafe(map, Math.min(width - inset - 1, centerX + 16), inset, height - inset - 1, "R");

  const buildingPlans = expandedBuildingPlansFor(width, height);

  buildingPlans.forEach(({ x, y, w, h, tile }, index) => {
    if (overlapsCenterSquare(x, y, w, h, centerX, centerY) || !canBuildOn(map, x, y, w, h)) return;
    rect(map, x, y, w, h, tile);
    const doorX = x + Math.floor(w / 2);
    const doorY = y + h - 1;
    if (map[doorY]?.[doorX] === tile) map[doorY][doorX] = "O";
    const roadY = doorY + 1 < height - 3 ? doorY + 1 : doorY - h;
    if (roadY >= 3 && roadY < height - 3) {
      hlineSafe(map, Math.min(doorX, centerX), Math.max(doorX, centerX), roadY, "R");
      vlineSafe(map, doorX, Math.min(roadY, doorY), Math.max(roadY, doorY), "R");
      if (map[doorY + 1]?.[doorX] !== undefined && !BUILDING_TILES.has(map[doorY + 1][doorX])) map[doorY + 1][doorX] = "R";
    }
    if (index % 2 === 0) placeIfGrass(map, x - 2, y + h + 1, 2, 2, "X", centerX, centerY);
  });

  const treeSpots = [
    [6, 18, 2, 2], [width - 9, 18, 2, 2], [12, height - 9, 2, 2], [width - 15, height - 9, 2, 2],
    [centerX - 25, 6, 1, 1], [centerX + 24, 6, 1, 1], [centerX - 25, height - 8, 1, 1], [centerX + 24, height - 8, 1, 1],
  ];
  if (width > 90) treeSpots.push([34, 18, 2, 2], [width - 37, 18, 2, 2], [34, height - 12, 1, 1], [width - 36, height - 12, 1, 1]);
  if (width > 120) treeSpots.push([54, 17, 2, 2], [width - 57, 17, 2, 2], [54, height - 12, 1, 1], [width - 56, height - 12, 1, 1]);

  treeSpots.forEach(([x, y, w, h]) => placeIfGrass(map, x, y, w, h, h > 1 ? "Y" : "T", centerX, centerY));
};

const paintWaterEdge = (map: string[][], direction: CityExitDirection) => {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  if (direction === "E") {
    rect(map, width - 4, 0, 1, height, "S");
    rect(map, width - 3, 0, 3, height, "W");
  }
  if (direction === "W") {
    rect(map, 0, 0, 3, height, "W");
    rect(map, 3, 0, 1, height, "S");
  }
  if (direction === "N") {
    rect(map, 0, 0, width, 3, "W");
    rect(map, 0, 3, width, 1, "S");
  }
  if (direction === "S") {
    rect(map, 0, height - 4, width, 1, "S");
    rect(map, 0, height - 3, width, 3, "W");
  }
};

const paintExit = (map: string[][], direction: CityExitDirection, tile: CityMapTile, centerX: number, centerY: number) => {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  if (direction === "N") {
    vlineSafe(map, centerX, 0, centerY, tile);
    vlineSafe(map, centerX + 1, 0, centerY, tile);
  }
  if (direction === "S") {
    vlineSafe(map, centerX, centerY, height - 1, tile);
    vlineSafe(map, centerX + 1, centerY, height - 1, tile);
  }
  if (direction === "W") {
    hlineSafe(map, 0, centerX, centerY, tile);
    hlineSafe(map, 0, centerX, centerY + 1, tile);
  }
  if (direction === "E") {
    hlineSafe(map, centerX, width - 1, centerY, tile);
    hlineSafe(map, centerX, width - 1, centerY + 1, tile);
  }
};

export const buildCityMapFromLayout = (layout: CityMapLayout) => {
  const baseWidth = layout.baseWidth ?? 56;
  const baseHeight = layout.baseHeight ?? 34;
  const offsetX = Math.floor((layout.width - baseWidth) / 2);
  const offsetY = Math.floor((layout.height - baseHeight) / 2);
  const centerX = Math.floor(layout.width / 2) - 1;
  const centerY = Math.floor(layout.height / 2);
  const translatedLayers = layout.layers.map((layer) => layer.map((shape) => shiftedShape(shape, offsetX, offsetY)));
  const map = makeBlankMap(layout.width, layout.height, layout.fill ?? "G");
  translatedLayers.forEach((layer) => layer.forEach((shape) => paintCityShape(map, shape)));
  if (layout.autoBuildingDoors ?? true) {
    const doorCoords = new Set<string>();
    translatedLayers.flat().forEach((shape) => {
      if (shape.kind !== "rect" || !["A", "B", "H", "P", "U"].includes(shape.tile)) return;
      const x = shape.x + Math.floor(shape.w / 2);
      const y = shape.y + shape.h - 1;
      doorCoords.add(`${x},${y}`);
    });

    map.forEach((row, y) => row.forEach((tile, x) => {
      if (tile === "O" && !doorCoords.has(`${x},${y}`)) row[x] = "R";
    }));

    doorCoords.forEach((coord) => {
      const [x, y] = coord.split(",").map(Number);
      if (map[y]?.[x] !== undefined) map[y][x] = "O";
    });
  }
  addExpandedCityDecor(map, centerX, centerY);
  clearCenterSquare(map, centerX, centerY);
  addTreeBorder(map, layout.treeBorderLayers ?? 3);
  layout.waterEdges?.forEach((direction) => paintWaterEdge(map, direction));
  Object.entries(layout.exits ?? {}).forEach(([direction, tile]) => {
    paintExit(map, direction as CityExitDirection, tile, centerX, centerY);
  });
  return map;
};
