import { hline, makeBlankMap, rect, vline } from "./utils";

export const buildSatiriaMap = () => {
  const map = makeBlankMap(56, 35, "T");

  // Forest-framed clearing, like a classic RPG starter town.
  rect(map, 3, 3, 50, 28, "G");
  rect(map, 0, 0, 56, 3, "T");
  rect(map, 0, 31, 56, 3, "T");
  rect(map, 0, 0, 3, 34, "T");
  rect(map, 53, 0, 3, 34, "T");

  // Pond, shore, and pier area.
  rect(map, 5, 24, 10, 5, "W");
  rect(map, 4, 23, 12, 1, "S");
  rect(map, 4, 29, 11, 1, "S");
  rect(map, 15, 25, 2, 3, "S");
  rect(map, 9, 22, 2, 3, "R");

  // Right-side mountain ridge.
  rect(map, 48, 8, 3, 11, "M");
  rect(map, 46, 11, 3, 7, "M");
  rect(map, 48, 23, 3, 6, "M");

  // Roads and central square.
  vline(map, 27, 0, 33, "R");
  hline(map, 6, 48, 13, "R");
  hline(map, 8, 38, 24, "R");
  rect(map, 23, 16, 10, 7, "E");
  rect(map, 25, 18, 6, 3, "R");

  // Top residential row.
  rect(map, 8, 6, 7, 5, "B");
  rect(map, 20, 6, 7, 5, "H");
  rect(map, 32, 6, 7, 5, "U");
  rect(map, 43, 6, 7, 5, "B");

  // Lower shops and town hall.
  rect(map, 8, 18, 7, 5, "A");
  rect(map, 18, 18, 7, 5, "H");
  rect(map, 36, 18, 10, 6, "B");

  // Door / interaction tiles.
  map[10][11] = "O";
  map[10][23] = "O";
  map[10][35] = "O";
  map[10][46] = "O";
  map[22][11] = "O";
  map[22][21] = "O";
  map[23][41] = "O";
  map[23][42] = "O";

  // Save point and town-center object anchors.
  map[18][27] = "V";

  // Gardens, fences, flowers, and yard boundaries.
  rect(map, 7, 11, 10, 1, "F");
  rect(map, 19, 11, 9, 1, "F");
  rect(map, 31, 11, 9, 1, "F");
  rect(map, 42, 11, 9, 1, "F");
  rect(map, 7, 23, 9, 1, "F");
  rect(map, 17, 23, 9, 1, "F");
  rect(map, 35, 24, 12, 1, "F");
  rect(map, 6, 16, 4, 2, "L");
  rect(map, 17, 16, 3, 2, "L");
  rect(map, 34, 15, 4, 2, "L");
  rect(map, 43, 15, 3, 2, "L");
  rect(map, 34, 25, 4, 2, "L");
  rect(map, 45, 25, 3, 2, "L");

  // Small forest pockets and clear route exits.
  rect(map, 6, 5, 3, 2, "X");
  rect(map, 39, 4, 3, 2, "X");
  rect(map, 18, 27, 5, 2, "X");
  rect(map, 26, 0, 3, 4, "R");

  return map;
};
