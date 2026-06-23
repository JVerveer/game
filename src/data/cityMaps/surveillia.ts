import { addRouteRoads, hline, makeBlankMap, rect, vline } from "./utils";

export const buildSurveilliaMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 3, 4, 50, 25, "G");
  rect(map, 6, 22, 44, 5, "W");
  rect(map, 10, 7, 36, 14, "E");
  hline(map, 10, 46, 16, "R");
  vline(map, 27, 4, 30, "R");
  hline(map, 12, 44, 10, "R");
  hline(map, 12, 44, 20, "R");
  rect(map, 33, 23, 10, 4, "R");
  addRouteRoads(map, ["SW", "SE", "N"]);
  rect(map, 11, 8, 5, 6, "I");
  rect(map, 18, 7, 5, 7, "A");
  rect(map, 25, 6, 5, 8, "I");
  rect(map, 32, 7, 5, 7, "A");
  rect(map, 39, 8, 5, 6, "I");
  rect(map, 12, 17, 7, 3, "B");
  rect(map, 24, 17, 7, 3, "H");
  rect(map, 35, 23, 7, 3, "P");
  map[19][15] = "O";
  map[19][27] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  return map;
};
