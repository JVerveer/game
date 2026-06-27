export type EditorTileId =
  | "G"
  | "R"
  | "W"
  | "T"
  | "E"
  | "Y"
  | "L"
  | "S"
  | "X"
  | "D"
  | "C"
  | "M"
  | "J"
  | "F"
  | "Q"
  | "V"
  | "N"
  | "A"
  | "B"
  | "H"
  | "P"
  | "U"
  | "I"
  | "O"
  | string;

export type LimeZuTerrainSprite =
  | "grass"
  | "grassAlt"
  | "path"
  | "pathAlt"
  | "road"
  | "roadAlt"
  | "water"
  | "waterAlt"
  | "sand"
  | "plaza"
  | "flower"
  | "forest"
  | "tree"
  | "fence"
  | "mountain"
  | "cave"
  | "pier";

export const LIMEZU_TERRAIN_IMAGES: Record<LimeZuTerrainSprite, string> = {
  grass: "/assets/limezu/singles/terrain/grass.png",
  grassAlt: "/assets/limezu/singles/terrain/grass_alt.png",
  path: "/assets/limezu/singles/terrain/path.png",
  pathAlt: "/assets/limezu/singles/terrain/path_alt.png",
  road: "/assets/limezu/singles/terrain/road.png",
  roadAlt: "/assets/limezu/singles/terrain/road_alt.png",
  water: "/assets/limezu/singles/terrain/water.png",
  waterAlt: "/assets/limezu/singles/terrain/water_alt.png",
  sand: "/assets/limezu/singles/terrain/sand.png",
  plaza: "/assets/limezu/singles/terrain/plaza.png",
  flower: "/assets/limezu/singles/terrain/flower.png",
  forest: "/assets/limezu/singles/terrain/forest.png",
  tree: "/assets/limezu/singles/terrain/tree.png",
  fence: "/assets/limezu/singles/terrain/fence.png",
  mountain: "/assets/limezu/singles/terrain/mountain.png",
  cave: "/assets/limezu/singles/terrain/cave.png",
  pier: "/assets/limezu/singles/terrain/pier.png",
};

export function hashTile(x: number, y: number) {
  return Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);
}

export function terrainSpriteForTile(tile: EditorTileId, x: number, y: number): LimeZuTerrainSprite {
  const roll = hashTile(x, y);

  if (tile === "G") return roll > 76 ? "grassAlt" : "grass";
  if (tile === "R" || tile === "O" || tile === "V" || tile === "Q" || tile === "N") return roll > 65 ? "pathAlt" : "path";
  if (tile === "W") return roll > 50 ? "waterAlt" : "water";
  if (tile === "T") return roll > 72 ? "tree" : "forest";
  if (tile === "E") return roll > 55 ? "roadAlt" : "plaza";
  if (tile === "Y" || tile === "L") return "grass";
  if (tile === "S") return "sand";
  if (tile === "X") return roll > 55 ? "grassAlt" : "grass";
  if (tile === "F") return "fence";
  if (tile === "M") return "mountain";
  if (tile === "C" || tile === "D") return "cave";
  if (tile === "J") return "pier";

  // Building marker tiles render as normal ground underneath buildings.
  if (tile === "A" || tile === "B" || tile === "H" || tile === "P" || tile === "U" || tile === "I") {
    return roll > 82 ? "grassAlt" : "grass";
  }

  return roll > 76 ? "grassAlt" : "grass";
}

export function terrainImageForTile(tile: EditorTileId, x: number, y: number) {
  return LIMEZU_TERRAIN_IMAGES[terrainSpriteForTile(tile, x, y)];
}
