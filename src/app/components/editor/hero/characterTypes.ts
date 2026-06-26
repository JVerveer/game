export type CharacterLayerCategory =
  | "body"
  | "eyes"
  | "hair"
  | "outfit"
  | "accessory";

export type CharacterAppearance = {
  body: string;
  eyes: string;
  hair: string;
  outfit: string;
  accessory: string;
};

export type CharacterFacing = "up" | "down" | "left" | "right";

export type CharacterAnimation = "idle" | "walk";

export type CharacterAtlasOption = {
  id: string;
  label: string;
  src: string;
  atlasWidth: number;
  atlasHeight: number;
};

export type CharacterAssetManifest = Record<CharacterLayerCategory, readonly CharacterAtlasOption[]>;

export type CharacterFrame = {
  col: number;
  row: number;
};

export type CharacterCategoryConfig = {
  id: CharacterLayerCategory;
  label: string;
  description: string;
};
