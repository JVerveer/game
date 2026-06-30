import { type LimeZuRuntimeAsset } from "./types";
import {
  assetsForCategory,
  buildingAssetPlacement,
  type LimeZuCatalogAsset,
} from "../../components/editor/assets/AssetCatalog";

function toRuntimeAsset(asset: LimeZuCatalogAsset): LimeZuRuntimeAsset {
  return {
    id: asset.id,
    sourceAssetId: asset.id,
    label: asset.label,
    src: asset.src,
    tags: asset.tags,
    source: asset.source,
    width: asset.width,
    height: asset.height,
  };
}

let cachedBuildingAssets: LimeZuRuntimeAsset[] | undefined;
let cachedBuildingAssetById: Map<string, LimeZuRuntimeAsset> | undefined;

function clearBuildingAssetCache() {
  cachedBuildingAssets = undefined;
  cachedBuildingAssetById = undefined;
}

if (typeof window !== "undefined") {
  window.addEventListener("limezu:asset-classification-changed", clearBuildingAssetCache);
  window.addEventListener("limezu:asset-metadata-changed", clearBuildingAssetCache);
}

export function getBuildingAssets(): LimeZuRuntimeAsset[] {
  if (cachedBuildingAssets) return cachedBuildingAssets;

  cachedBuildingAssets = assetsForCategory("building")
    .filter(asset => buildingAssetPlacement(asset.id) === "outside")
    .map(toRuntimeAsset);
  cachedBuildingAssetById = new Map(
    cachedBuildingAssets.flatMap(asset => [[asset.id, asset], [asset.sourceAssetId, asset]] as [string | undefined, LimeZuRuntimeAsset][])
      .filter((entry): entry is [string, LimeZuRuntimeAsset] => !!entry[0]),
  );

  return cachedBuildingAssets;
}

// Kept for older components that import BUILDING_ASSETS directly.
// Components that must reflect live categorizer changes should call getBuildingAssets().
export const BUILDING_ASSETS: LimeZuRuntimeAsset[] = getBuildingAssets();

export function getBuildingAsset(id: string | undefined): LimeZuRuntimeAsset {
  const assets = getBuildingAssets();
  return (id ? cachedBuildingAssetById?.get(id) : undefined) ?? assets[0];
}
