import type {
  CharacterAnimation,
  CharacterAppearance,
  CharacterFacing,
} from "../../../components/editor/hero/characterTypes";

export type GlobalNpcCatalogEntry = {
  id: string;
  name: string;
  appearance: CharacterAppearance;
  lines: string[];
  walking?: boolean;
  animation?: CharacterAnimation;
  facing?: CharacterFacing;
  sheetAssetId?: string;
  tags?: string[];
};

export const NPC_CATALOG = [
  // Paste exported global NPC objects here.
] as const satisfies readonly GlobalNpcCatalogEntry[];
