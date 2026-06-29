import { CHARACTER_ASSET_CATALOG, type CharacterAsset } from "../../assets/limezu/characters/CharacterAssetCatalog";
import { CHARACTER_SHEET_METADATA, type CharacterSheetMetadata, type CharacterSheetFrameSelection } from "../../assets/limezu/characters/CharacterSheetMetadata";

export type CharacterFacing = "down" | "left" | "right" | "up" | "none";
export type CharacterAnimationName = "idle" | "walk" | "run" | "attack" | "custom";

export type CharacterSheetPose = {
  asset: CharacterAsset;
  metadata: CharacterSheetMetadata;
  selection: CharacterSheetFrameSelection;
};

export function getCharacterSheetAsset(assetId: string | undefined): CharacterAsset | undefined {
  if (!assetId) return undefined;
  return CHARACTER_ASSET_CATALOG.find(asset => asset.id === assetId);
}

export function getCharacterSheetMetadata(asset: CharacterAsset): CharacterSheetMetadata {
  const exported = (CHARACTER_SHEET_METADATA as Record<string, CharacterSheetMetadata>)[asset.id];

  if (exported) return exported;

  const frameWidth = asset.frameWidth || 48;
  const frameHeight = asset.frameHeight || 48;
  const columns = Math.max(1, asset.columns || Math.floor(asset.width / frameWidth) || 1);
  const rows = Math.max(1, asset.rows || Math.floor(asset.height / frameHeight) || 1);

  // Safe fallback: one-row walk/idle-ish selection.
  return {
    assetId: asset.id,
    frameWidth,
    frameHeight,
    columns,
    rows,
    selections: [
      {
        name: "default",
        frames: Array.from({ length: Math.min(columns, 4) }, (_, index) => index),
        animation: "custom",
        facing: "none",
      },
    ],
  };
}

export function findCharacterSheetSelection(
  metadata: CharacterSheetMetadata,
  animation: CharacterAnimationName,
  facing: CharacterFacing,
): CharacterSheetFrameSelection {
  return (
    metadata.selections.find(selection => selection.animation === animation && selection.facing === facing) ??
    metadata.selections.find(selection => selection.animation === animation && selection.facing === "none") ??
    metadata.selections.find(selection => selection.name === `${animation}_${facing}`) ??
    metadata.selections.find(selection => selection.name === animation) ??
    metadata.selections[0] ??
    {
      name: "default",
      frames: [0],
      animation: "custom",
      facing: "none",
    }
  );
}

export function getCharacterSheetPose({
  assetId,
  animation = "idle",
  facing = "down",
}: {
  assetId?: string;
  animation?: CharacterAnimationName;
  facing?: CharacterFacing;
}): CharacterSheetPose | undefined {
  const asset = getCharacterSheetAsset(assetId);
  if (!asset) return undefined;

  const metadata = getCharacterSheetMetadata(asset);
  const selection = findCharacterSheetSelection(metadata, animation, facing);

  return {
    asset,
    metadata,
    selection,
  };
}

export function framePositionForIndex({
  frame,
  columns,
  frameWidth,
  frameHeight,
}: {
  frame: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
}) {
  const col = frame % columns;
  const row = Math.floor(frame / columns);

  return {
    x: col * frameWidth,
    y: row * frameHeight,
  };
}
