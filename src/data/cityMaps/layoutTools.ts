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

const paintExit = (map: string[][], direction: CityExitDirection, tile: CityMapTile) => {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  const centerX = 27;
  const centerY = 18;
  if (direction === "N") {
    vline(map, centerX, 0, centerY, tile);
    vline(map, centerX + 1, 0, centerY, tile);
  }
  if (direction === "S") {
    vline(map, centerX, centerY, height - 1, tile);
    vline(map, centerX + 1, centerY, height - 1, tile);
  }
  if (direction === "W") {
    hline(map, 0, centerX, centerY, tile);
    hline(map, 0, centerX, centerY + 1, tile);
  }
  if (direction === "E") {
    hline(map, centerX, width - 1, centerY, tile);
    hline(map, centerX, width - 1, centerY + 1, tile);
  }
};

export const buildCityMapFromLayout = (layout: CityMapLayout) => {
  const map = makeBlankMap(layout.width, layout.height, layout.fill ?? "T");
  layout.layers.forEach((layer) => layer.forEach((shape) => paintCityShape(map, shape)));
  if (layout.autoBuildingDoors ?? true) {
    const doorCoords = new Set<string>();
    layout.layers.flat().forEach((shape) => {
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
  addTreeBorder(map, layout.treeBorderLayers ?? 3);
  layout.waterEdges?.forEach((direction) => paintWaterEdge(map, direction));
  Object.entries(layout.exits ?? {}).forEach(([direction, tile]) => {
    paintExit(map, direction as CityExitDirection, tile);
  });
  return map;
};
