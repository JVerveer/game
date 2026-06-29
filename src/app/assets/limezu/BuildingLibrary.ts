import { type LimeZuRuntimeAsset } from "./types";
import {
  assetsForCategory,
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

export function getBuildingAssets(): LimeZuRuntimeAsset[] {
  return assetsForCategory("building").map(toRuntimeAsset);
}

// Kept for older components that import BUILDING_ASSETS directly.
// Components that must reflect live categorizer changes should call getBuildingAssets().
export const BUILDING_ASSETS: LimeZuRuntimeAsset[] = getBuildingAssets();

export function getBuildingAsset(id: string | undefined): LimeZuRuntimeAsset {
  const assets = getBuildingAssets();
  return assets.find(asset => asset.id === id || asset.sourceAssetId === id) ?? assets[0];
}
