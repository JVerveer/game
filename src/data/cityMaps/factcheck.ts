import { addTreeBorder, hline, makeBlankMap, rect, vline } from "./utils";

export const buildFactcheckMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 25, "S");
  rect(map, 42, 5, 7, 22, "W");
  rect(map, 8, 8, 34, 17, "E");
  hline(map, 8, 42, 17, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 11, 40, 11, "R");
  hline(map, 11, 40, 23, "R");
  rect(map, 33, 23, 9, 4, "R");
  rect(map, 10, 9, 7, 4, "A");
  rect(map, 22, 9, 7, 4, "H");
  rect(map, 33, 9, 7, 4, "B");
  rect(map, 11, 20, 7, 4, "U");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 23, 15, 8, 5, "I");
  map[12][13] = "O";
  map[12][25] = "O";
  map[12][36] = "O";
  map[23][14] = "O";
  map[25][36] = "O";
  map[25][37] = "O";
  addTreeBorder(map, 3);
  return map;
};
