import { addRouteRoads, hline, makeBlankMap, rect, vline } from "./utils";

export const buildCryptoniaMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 3, 4, 50, 25, "S");
  rect(map, 39, 5, 10, 24, "W");
  rect(map, 34, 8, 8, 18, "R");
  rect(map, 9, 8, 27, 15, "E");
  hline(map, 9, 42, 16, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 35, 10, "R");
  hline(map, 12, 35, 22, "R");
  addRouteRoads(map, ["S", "N"]);
  rect(map, 11, 9, 5, 5, "I");
  rect(map, 18, 8, 4, 6, "A");
  rect(map, 24, 7, 4, 7, "I");
  rect(map, 30, 8, 5, 6, "A");
  rect(map, 11, 18, 6, 4, "B");
  rect(map, 24, 18, 7, 4, "H");
  rect(map, 34, 23, 8, 3, "P");
  rect(map, 32, 18, 3, 5, "U");
  map[21][14] = "O";
  map[21][27] = "O";
  map[21][35] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  return map;
};
