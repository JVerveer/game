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

export type CharacterAssetOption = {
  id: string;
  label: string;
  src: string;
  size: [number, number];
};

export type CharacterAssetManifest = Record<CharacterLayerCategory, CharacterAssetOption[]>;
