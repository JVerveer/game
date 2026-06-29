import type { CharacterAssetCategory } from "./CharacterAssetCatalog";

export type CharacterSheetFrameSelection = {
  name: string;
  frames: number[];
  category?: CharacterAssetCategory | "object" | "set";
  animation?: "idle" | "walk" | "run" | "attack" | "custom";
  facing?: "down" | "left" | "right" | "up" | "none";
};

export type CharacterSheetMetadata = {
  assetId: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  selections: CharacterSheetFrameSelection[];
};

export const CHARACTER_SHEET_METADATA = {} as const satisfies Record<string, CharacterSheetMetadata>;
