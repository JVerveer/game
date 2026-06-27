export type EditorTileId = string;

export type TerrainSprite =
  | "grass"
  | "grassAlt"
  | "dirt"
  | "dirtAlt"
  | "asphalt"
  | "sidewalk"
  | "water"
  | "waterAlt"
  | "sand"
  | "plaza"
  | "flower"
  | "tallGrass"
  | "pier";

export type ObjectSprite =
  | "tree"
  | "bush"
  | "fence"
  | "rock";

export const TERRAIN_IMAGES: Record<TerrainSprite, string> = {
  grass: "/assets/limezu/curated/terrain/grass.png",
  grassAlt: "/assets/limezu/curated/terrain/grass.png",
  dirt: "/assets/limezu/curated/terrain/grass.png",
  dirtAlt: "",
  asphalt: "/assets/limezu/curated/terrain/asphalt.png",
  sidewalk: "/assets/limezu/curated/terrain/sidewalk.png",
  water: "/assets/limezu/curated/terrain/water.png",
  waterAlt: "/assets/limezu/curated/terrain/water_alt.png",
  sand: "/assets/limezu/curated/terrain/sand.png",
  plaza: "/assets/limezu/curated/terrain/plaza.png",
  flower: "/assets/limezu/curated/terrain/flower.png",
  tallGrass: "",
  pier: "/assets/limezu/curated/terrain/pier.png",
};

export const OBJECT_IMAGES: Record<ObjectSprite, string> = {
  tree: "/assets/limezu/curated/objects/tree.png",
  bush: "/assets/limezu/curated/objects/bush.png",
  fence: "/assets/limezu/curated/objects/fence.png",
  rock: "/assets/limezu/curated/objects/rock.png",
};

export function hashTile(x: number, y: number) {
  return Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);
}

export function terrainSpriteForTile(tile: EditorTileId, x: number, y: number): TerrainSprite {
  const roll = hashTile(x, y);

  switch (tile) {
    case "G":
      return roll > 80 ? "grassAlt" : "grass";

    case "R":
    case "O":
    case "V":
    case "Q":
    case "N":
      return roll > 70 ? "dirtAlt" : "dirt";

    case "W":
      return roll > 55 ? "waterAlt" : "water";

    case "T":
      // Your current map uses T as forest/border terrain.
      // Render ground as tall grass/forest floor. Trees are handled later as objects.
      return roll > 65 ? "tallGrass" : "grassAlt";

    case "E":
      return roll > 60 ? "sidewalk" : "plaza";

    case "Y":
    case "L":
      return "grass";

    case "S":
      return "sand";

    case "X":
      return roll > 50 ? "tallGrass" : "grassAlt";

    case "F":
      // Fence terrain: base ground, fence overlay added in pixelTiles.
      return "grass";

    case "M":
    case "C":
    case "D":
      return "asphalt";

    case "J":
      return "pier";

    case "A":
    case "B":
    case "H":
    case "P":
    case "U":
    case "I":
      return roll > 82 ? "grassAlt" : "grass";

    default:
      return roll > 80 ? "grassAlt" : "grass";
  }
}

export function terrainImageForTile(tile: EditorTileId, x: number, y: number) {
  return TERRAIN_IMAGES[terrainSpriteForTile(tile, x, y)];
}
