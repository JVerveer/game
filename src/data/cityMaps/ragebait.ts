import { addTreeBorder, hline, makeBlankMap, rect, vline } from "./utils";

export const buildRagebaitMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 25, "G");
  rect(map, 5, 22, 46, 5, "W");
  rect(map, 7, 18, 44, 4, "S");
  rect(map, 8, 7, 41, 11, "E");
  hline(map, 8, 49, 15, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 44, 10, "R");
  rect(map, 34, 22, 9, 5, "R");
  rect(map, 10, 8, 6, 4, "U");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "A");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 15, 16, 9, 2, "M");
  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  addTreeBorder(map, 3);
  return map;
};
