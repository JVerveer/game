import { addRouteRoads, hline, makeBlankMap, rect, vline } from "./utils";

export const buildInflatopolisMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 25, "G");
  rect(map, 6, 21, 44, 5, "E");
  rect(map, 8, 7, 40, 13, "R");
  hline(map, 8, 48, 14, "R");
  vline(map, 27, 5, 29, "R");
  hline(map, 11, 45, 9, "R");
  hline(map, 11, 45, 19, "R");
  addRouteRoads(map, ["S", "N"]);
  rect(map, 10, 8, 6, 4, "A");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "A");
  rect(map, 11, 16, 6, 4, "U");
  rect(map, 21, 16, 6, 4, "U");
  rect(map, 35, 23, 7, 3, "P");
  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[19][14] = "O";
  map[19][24] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  return map;
};
