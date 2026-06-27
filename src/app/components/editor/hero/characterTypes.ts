export type CharacterLayerCategory =
  | "body"
  | "eyes"
  | "hair"
  | "outfit"
  | "accessory";

export type CharacterColorCategory =
  | "skinColor"
  | "hairColor"
  | "outfitColor";

export type CharacterAppearance = {
  body: string;
  eyes: string;
  hair: string;
  outfit: string;
  accessory: string;
  skinColor: string;
  hairColor: string;
  outfitColor: string;
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

export type CharacterColorOption = {
  id: string;
  label: string;
  color: string;
  filter: string;
  opacity?: number;
};

export type CharacterAssetManifest = Record<CharacterLayerCategory, readonly CharacterAtlasOption[]>;

export type CharacterColorManifest = Record<CharacterColorCategory, readonly CharacterColorOption[]>;

export type CharacterFrame = {
  col: number;
  row: number;
  durationMs?: number;
  offsetX?: number;
  offsetY?: number;
};

export type CharacterAnimationConfig = {
  id: CharacterAnimation;
  loop: boolean;
  frames: CharacterFrame[];
};

export type CharacterCategoryConfig = {
  id: CharacterLayerCategory | CharacterColorCategory;
  label: string;
  description: string;
  kind: "asset" | "color";
};
