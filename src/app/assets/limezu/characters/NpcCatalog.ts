import type { CharacterAnimationName, CharacterFacing } from "../../../rendering/characters/CharacterSheetRuntime";

export type GlobalNpcCatalogEntry = {
  id: string;
  name: string;
  sheetAssetId: string;
  lines: string[];
  walking?: boolean;
  animation?: CharacterAnimationName;
  facing?: CharacterFacing;
  tags?: string[];
};

export const NPC_CATALOG = [
  // Paste exported global NPC objects here.
] as const satisfies readonly GlobalNpcCatalogEntry[];
