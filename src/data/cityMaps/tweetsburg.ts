import { addTreeBorder, hline, makeBlankMap, rect, vline } from "./utils";

export const buildTweetsburgMap = () => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 25, "S");
  rect(map, 8, 7, 40, 18, "E");
  hline(map, 8, 48, 16, "R");
  vline(map, 27, 5, 29, "R");
  hline(map, 12, 44, 10, "R");
  hline(map, 12, 44, 22, "R");
  rect(map, 18, 12, 19, 8, "R");
  rect(map, 10, 8, 6, 4, "U");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "U");
  rect(map, 12, 21, 6, 3, "B");
  rect(map, 35, 21, 7, 3, "P");
  rect(map, 24, 12, 7, 7, "I");
  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[23][15] = "O";
  map[23][36] = "O";
  map[23][37] = "O";
  addTreeBorder(map, 3);
  return map;
};
