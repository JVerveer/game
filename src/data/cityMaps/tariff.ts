import { addRouteRoads, hline, makeBlankMap, rect, vline } from "./utils";

export const buildTariffMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 3, 4, 50, 25, "G");
  rect(map, 5, 23, 46, 5, "W");
  rect(map, 8, 18, 41, 5, "S");
  rect(map, 11, 8, 35, 10, "E");
  hline(map, 11, 46, 15, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 44, 10, "R");
  rect(map, 33, 22, 10, 5, "R");
  addRouteRoads(map, ["S", "NW"]);
  rect(map, 12, 9, 6, 4, "U");
  rect(map, 22, 9, 6, 4, "B");
  rect(map, 32, 9, 6, 4, "H");
  rect(map, 40, 9, 5, 4, "U");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 8, 16, 5, 4, "M");
  map[12][15] = "O";
  map[12][25] = "O";
  map[12][35] = "O";
  map[12][42] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  return map;
};
