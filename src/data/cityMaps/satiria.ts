import { addTreeBorder, hline, makeBlankMap, rect, vline } from "./utils";
import {
  SATIRIA_BUILDINGS_LAYOUT,
  SATIRIA_ENTRANCES,
  SATIRIA_MAP_SIZE,
  SATIRIA_TERRAIN_LAYERS,
  SATIRIA_TREE_BORDER_LAYERS,
  type SatiriaPaint,
} from "./satiriaLayout";

const paint = (map: string[][], shape: SatiriaPaint) => {
  if (shape.kind === "rect") rect(map, shape.x, shape.y, shape.w, shape.h, shape.tile);
  if (shape.kind === "hline") hline(map, shape.x1, shape.x2, shape.y, shape.tile);
  if (shape.kind === "vline") vline(map, shape.x, shape.y1, shape.y2, shape.tile);
};

export const buildSatiriaMap = () => {
  const map = makeBlankMap(SATIRIA_MAP_SIZE.width, SATIRIA_MAP_SIZE.height, "T");

  SATIRIA_TERRAIN_LAYERS.forEach((layer) => layer.forEach((shape) => paint(map, shape)));

  SATIRIA_BUILDINGS_LAYOUT.forEach((building) => {
    const tile = building.type === "shop"
      ? "A"
      : building.type === "healing"
        ? "H"
        : building.type === "train"
          ? "P"
          : building.color === "purple"
            ? "U"
            : "B";
    rect(map, building.x, building.y, building.w, building.h, tile);
  });

  SATIRIA_ENTRANCES.forEach(({ door }) => {
    vline(map, door.x, door.y, door.y < 16 ? 13 : 24, "R");
  });

  SATIRIA_ENTRANCES.forEach(({ door }) => {
    map[door.y][door.x] = "O";
  });

  addTreeBorder(map, SATIRIA_TREE_BORDER_LAYERS);
  return map;
};
