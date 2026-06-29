import { hline, makeBlankMap, rect, vline } from "./utils";
import {
  SATIRIA_MAP_SIZE,
  SATIRIA_TERRAIN_LAYERS,
  type SatiriaPaint,
} from "./satiriaLayout";

const paint = (map: string[][], shape: SatiriaPaint) => {
  if (shape.kind === "rect") rect(map, shape.x, shape.y, shape.w, shape.h, shape.tile);
  if (shape.kind === "hline") hline(map, shape.x1, shape.x2, shape.y, shape.tile);
  if (shape.kind === "vline") vline(map, shape.x, shape.y1, shape.y2, shape.tile);
};

export const buildSatiriaMap = () => {
  const map = makeBlankMap(SATIRIA_MAP_SIZE.width, SATIRIA_MAP_SIZE.height, "G");

  SATIRIA_TERRAIN_LAYERS.forEach((layer) => layer.forEach((shape) => paint(map, shape)));
  return map;
};
