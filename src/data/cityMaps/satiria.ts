import { hline, makeBlankMap, rect, vline } from "./utils";

export const buildSatiriaMap = () => {
  const map = makeBlankMap(56, 35, "T");

  // Coded interpretation of the supplied reference: a forest-ringed starter
  // town with a central square, pond, mountain ridge, and multi-tile homes.
  rect(map, 3, 3, 50, 29, "G");
  rect(map, 0, 0, 56, 3, "T");
  rect(map, 0, 32, 56, 3, "T");
  rect(map, 0, 0, 3, 35, "T");
  rect(map, 53, 0, 3, 35, "T");

  // Right-side rocky ridge.
  rect(map, 48, 5, 5, 10, "M");
  rect(map, 46, 8, 4, 10, "M");
  rect(map, 49, 24, 4, 8, "M");
  rect(map, 47, 27, 4, 5, "M");

  // Pond, shore and pier at lower-left.
  rect(map, 3, 24, 11, 8, "S");
  rect(map, 4, 25, 9, 6, "W");
  rect(map, 6, 27, 2, 2, "W");
  rect(map, 11, 28, 2, 2, "W");
  rect(map, 8, 23, 2, 4, "R");

  // Cross roads and stone town square.
  vline(map, 27, 0, 34, "R");
  vline(map, 28, 0, 34, "R");
  hline(map, 6, 49, 13, "R");
  hline(map, 6, 49, 14, "R");
  hline(map, 5, 27, 23, "R");
  hline(map, 5, 27, 24, "R");
  rect(map, 23, 16, 11, 7, "E");
  rect(map, 24, 17, 9, 5, "E");

  // Houses along the upper road.
  rect(map, 8, 5, 8, 5, "B");
  rect(map, 19, 5, 8, 5, "H");
  rect(map, 30, 5, 7, 5, "U");
  rect(map, 40, 5, 7, 5, "B");

  // Shops and larger town hall / station block.
  rect(map, 4, 17, 7, 5, "A");
  rect(map, 12, 17, 7, 5, "H");
  rect(map, 37, 17, 10, 6, "P");

  // Door / interaction tiles.
  map[10][12] = "O";
  map[10][23] = "O";
  map[10][33] = "O";
  map[10][43] = "O";
  map[22][7] = "O";
  map[22][15] = "O";
  map[23][41] = "O";
  map[23][42] = "O";
  map[19][26] = "V";

  // Yards, fences, hedges, flower patches, and tree pockets.
  hline(map, 7, 16, 11, "F");
  hline(map, 19, 27, 11, "F");
  hline(map, 30, 38, 11, "F");
  hline(map, 40, 49, 11, "F");
  hline(map, 4, 12, 22, "F");
  hline(map, 12, 20, 22, "F");
  hline(map, 36, 48, 24, "F");
  rect(map, 4, 4, 3, 2, "X");
  rect(map, 39, 4, 3, 2, "X");
  rect(map, 18, 25, 5, 3, "X");
  rect(map, 31, 25, 7, 4, "X");
  rect(map, 14, 12, 4, 1, "L");
  rect(map, 38, 12, 3, 1, "L");
  rect(map, 5, 23, 3, 1, "L");
  rect(map, 34, 14, 4, 2, "L");
  rect(map, 43, 14, 3, 2, "L");
  rect(map, 34, 25, 4, 2, "L");
  rect(map, 44, 25, 3, 2, "L");

  // Clear route exits through the tree wall.
  rect(map, 26, 0, 4, 4, "R");
  rect(map, 26, 32, 4, 3, "R");

  return map;
};
