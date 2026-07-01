import { type LimeZuRuntimeAsset } from "./types";
import {
  assetsForCategory,
  objectAssetIsWalkable,
  type LimeZuCatalogAsset,
} from "../../components/editor/assets/AssetCatalog";

export type LimeZuObjectPaintEntry = string | { assetId: string; src?: string; width?: number; height?: number; walkable?: boolean };
export type LimeZuObjectPaintMap = Record<string, LimeZuObjectPaintEntry>;

const OBJECT_MAP_KEY = "limezu.objectPaint.v1";
const SELECTED_OBJECT_KEY = "limezu.selectedObjectAsset.v1";
let cachedObjectMap: LimeZuObjectPaintMap = {};

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

export function getObjectAssets(): LimeZuRuntimeAsset[] {
  return assetsForCategory("object").map(toRuntimeAsset);
}

// Kept for older components. Use getObjectAssets() for live classification.
export const OBJECT_ASSETS: LimeZuRuntimeAsset[] = getObjectAssets();

export function objectCoordKey(x: number, y: number) {
  return `${x},${y}`;
}

export function getObjectAsset(id: string | undefined): LimeZuRuntimeAsset {
  const assets = getObjectAssets();
  return assets.find(asset => asset.id === id || asset.sourceAssetId === id) ?? assets[0];
}

export function getSelectedObjectAssetId(): string {
  const fallback = getObjectAssets()[0]?.id ?? "";
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(SELECTED_OBJECT_KEY) ?? fallback;
}

export function setSelectedObjectAssetId(assetId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_OBJECT_KEY, assetId);
    window.dispatchEvent(new CustomEvent("limezu:selected-object-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-selected-object-changed"));
  }
}

export function readObjectPaintMap(): LimeZuObjectPaintMap {
  if (typeof window === "undefined") return cachedObjectMap;

  try {
    cachedObjectMap = JSON.parse(window.localStorage.getItem(OBJECT_MAP_KEY) ?? "{}");
  } catch {
    cachedObjectMap = {};
  }

  return cachedObjectMap;
}

export function writeObjectPaintMap(next: LimeZuObjectPaintMap) {
  cachedObjectMap = { ...next };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(OBJECT_MAP_KEY, JSON.stringify(cachedObjectMap));
    window.dispatchEvent(new CustomEvent("limezu:object-paint-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-object-paint-changed"));
  }
}

export function paintObjectAt(x: number, y: number, assetId: string) {
  const asset = getObjectAsset(assetId);
  writeObjectPaintMap({
    ...readObjectPaintMap(),
    [objectCoordKey(x, y)]: {
      assetId,
      src: asset?.src,
      width: asset?.width,
      height: asset?.height,
      walkable: objectAssetIsWalkable(assetId),
    },
  });
}

export function eraseObjectAt(x: number, y: number) {
  const next = { ...readObjectPaintMap() };
  delete next[objectCoordKey(x, y)];
  writeObjectPaintMap(next);
}

export function objectAssetForCoord(x: number, y: number): LimeZuRuntimeAsset | undefined {
  const entry = readObjectPaintMap()[objectCoordKey(x, y)];
  const assetId = typeof entry === "string" ? entry : entry?.assetId;
  return assetId ? getObjectAsset(assetId) : undefined;
}

export function objectAtCoordIsWalkable(x: number, y: number) {
  const entry = readObjectPaintMap()[objectCoordKey(x, y)];
  const assetId = typeof entry === "string" ? entry : entry?.assetId;
  if (!assetId) return true;
  return objectAssetIsWalkable(assetId);
}

export function clearAllObjects() {
  cachedObjectMap = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(OBJECT_MAP_KEY);
    window.dispatchEvent(new CustomEvent("limezu:object-paint-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-object-paint-changed"));
  }
}

export const LIMEZU_OBJECT_LIBRARY = OBJECT_ASSETS;
export const getLimeZuObjectAsset = getObjectAsset;
export const getSelectedLimeZuObjectAssetId = getSelectedObjectAssetId;
export const setSelectedLimeZuObjectAssetId = setSelectedObjectAssetId;
export const readLimeZuObjectPaintMap = readObjectPaintMap;
export const writeLimeZuObjectPaintMap = writeObjectPaintMap;
export const paintLimeZuObjectAt = paintObjectAt;
export const eraseLimeZuObjectAt = eraseObjectAt;
export const limeZuObjectAssetForCoord = objectAssetForCoord;
export const limeZuObjectAtCoordIsWalkable = objectAtCoordIsWalkable;
export const clearAllLimeZuObjects = clearAllObjects;
