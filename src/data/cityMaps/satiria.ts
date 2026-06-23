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

  // Cross roads and stone town square.
  vline(map, 27, 0, 34, "R");
  vline(map, 28, 0, 34, "R");
  hline(map, 6, 49, 13, "R");
  hline(map, 6, 49, 14, "R");
  hline(map, 5, 27, 23, "R");
  hline(map, 5, 27, 24, "R");
  rect(map, 23, 16, 11, 7, "E");
  rect(map, 24, 17, 9, 5, "E");

  // Pond and pier are written after paths so water never sits on top of a road.
  rect(map, 3, 25, 11, 7, "S");
  rect(map, 4, 26, 9, 5, "W");
  rect(map, 6, 28, 2, 2, "W");
  rect(map, 11, 29, 2, 1, "W");
  rect(map, 8, 25, 2, 3, "R");

  // Houses along the upper road.
  rect(map, 8, 5, 8, 5, "B");
  rect(map, 19, 5, 8, 5, "H");
  rect(map, 30, 5, 7, 5, "U");
  rect(map, 40, 5, 7, 5, "B");

  // Shops and larger town hall / station block.
  rect(map, 4, 17, 7, 5, "A");
  rect(map, 12, 17, 7, 5, "H");
  rect(map, 37, 17, 10, 6, "P");

  // Yards, fences, hedges, flower patches, and tree pockets.
  hline(map, 7, 11, 11, "F");
  hline(map, 13, 16, 11, "F");
  hline(map, 19, 22, 11, "F");
  hline(map, 24, 27, 11, "F");
  hline(map, 30, 32, 11, "F");
  hline(map, 34, 38, 11, "F");
  hline(map, 40, 42, 11, "F");
  hline(map, 44, 49, 11, "F");
  hline(map, 4, 6, 22, "F");
  hline(map, 8, 14, 22, "F");
  hline(map, 16, 20, 22, "F");
  hline(map, 36, 40, 24, "F");
  hline(map, 43, 48, 24, "F");
  rect(map, 18, 25, 5, 3, "X");
  rect(map, 31, 25, 7, 4, "X");
  rect(map, 14, 12, 4, 1, "L");
  rect(map, 38, 12, 3, 1, "L");
  rect(map, 5, 23, 3, 1, "L");
  rect(map, 34, 14, 4, 2, "L");
  rect(map, 43, 14, 3, 2, "L");
  rect(map, 34, 25, 4, 2, "L");
  rect(map, 44, 25, 3, 2, "L");

  // Decorative trees from the Satiria scene also block movement.
  [
    [5, 8], [17, 8], [39, 8], [45, 8], [5, 15], [14, 15], [19, 15],
    [17, 26], [21, 26], [32, 25], [36, 26], [18, 29], [23, 30], [34, 30], [41, 30],
  ].forEach(([x, y]) => {
    if (map[y]?.[x] === "G" || map[y]?.[x] === "X") map[y][x] = "T";
  });

  // Door / interaction tiles are written last so fences and landscaping cannot
  // accidentally block entrances.
  map[10][12] = "O";
  map[10][23] = "O";
  map[10][33] = "O";
  map[10][43] = "O";
  map[22][7] = "O";
  map[22][15] = "O";
  map[23][41] = "O";
  map[23][42] = "O";
  map[19][26] = "V";

  // Clear route exits through the tree wall.
  rect(map, 26, 0, 4, 4, "R");
  rect(map, 26, 32, 4, 3, "R");

  return map;
};
