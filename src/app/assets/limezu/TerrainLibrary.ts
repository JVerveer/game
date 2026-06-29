import { type LimeZuRuntimeAsset, assetMatches } from "./types";
import {
  assetsForCategory,
  type LimeZuCatalogAsset,
} from "../../components/editor/assets/AssetCatalog";

export type TerrainPaintEntry = string | { assetId: string; src?: string; width?: number; height?: number };
export type TerrainPaintMap = Record<string, TerrainPaintEntry>;

const PAINT_STORAGE_KEY = "limezu.terrainPaint.v1";
const SELECTED_STORAGE_KEY = "limezu.selectedTerrainAsset.v1";
let cachedPaintMap: TerrainPaintMap = {};

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

export function getTerrainAssets(): LimeZuRuntimeAsset[] {
  return assetsForCategory("terrain").map(toRuntimeAsset);
}

// Kept for older components. Use getTerrainAssets() for live classification.
export const TERRAIN_ASSETS: LimeZuRuntimeAsset[] = getTerrainAssets();

export function terrainCoordKey(x: number, y: number) {
  return `${x},${y}`;
}

export function getTerrainAsset(id: string | undefined): LimeZuRuntimeAsset {
  const assets = getTerrainAssets();
  return assets.find(asset => asset.id === id || asset.sourceAssetId === id) ?? assets[0];
}

export function readTerrainPaintMap(): TerrainPaintMap {
  if (typeof window === "undefined") return cachedPaintMap;

  try {
    cachedPaintMap = JSON.parse(window.localStorage.getItem(PAINT_STORAGE_KEY) ?? "{}");
  } catch {
    cachedPaintMap = {};
  }

  return cachedPaintMap;
}

export function writeTerrainPaintMap(next: TerrainPaintMap) {
  cachedPaintMap = { ...next };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(PAINT_STORAGE_KEY, JSON.stringify(cachedPaintMap));
    window.dispatchEvent(new CustomEvent("limezu:terrain-paint-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-terrain-paint-changed"));
  }
}

export function paintTerrainAssetAt(x: number, y: number, assetId: string) {
  const asset = getTerrainAsset(assetId);
  writeTerrainPaintMap({
    ...readTerrainPaintMap(),
    [terrainCoordKey(x, y)]: {
      assetId,
      src: asset?.src,
      width: asset?.width,
      height: asset?.height,
    },
  });
}

export function eraseTerrainAssetAt(x: number, y: number) {
  const next = { ...readTerrainPaintMap() };
  delete next[terrainCoordKey(x, y)];
  writeTerrainPaintMap(next);
}

export function terrainAssetForCoord(x: number, y: number): LimeZuRuntimeAsset | undefined {
  const entry = readTerrainPaintMap()[terrainCoordKey(x, y)];
  const assetId = typeof entry === "string" ? entry : entry?.assetId;
  return assetId ? getTerrainAsset(assetId) : undefined;
}

export function terrainImageForCoord(x: number, y: number): string | undefined {
  const entry = readTerrainPaintMap()[terrainCoordKey(x, y)];
  if (entry && typeof entry !== "string" && entry.src) return entry.src;
  return terrainAssetForCoord(x, y)?.src;
}

export function terrainImageForKind(kind: "grass" | "path" | "road" | "water" | "sand" | "plaza" | "stone" | "wood"): string {
  const assets = getTerrainAssets();
  const preferred = assets.find(asset => {
    if (kind === "grass") return assetMatches(asset, ["grass"]);
    if (kind === "path") return assetMatches(asset, ["dirt", "path"]);
    if (kind === "road") return assetMatches(asset, ["asphalt", "road"]);
    if (kind === "water") return assetMatches(asset, ["water"]);
    if (kind === "sand") return assetMatches(asset, ["sand", "beach"]);
    if (kind === "plaza") return assetMatches(asset, ["sidewalk", "pavement", "stone"]);
    if (kind === "stone") return assetMatches(asset, ["stone", "sidewalk"]);
    if (kind === "wood") return assetMatches(asset, ["wood", "floor"]);
    return false;
  });

  return (preferred ?? assets[0])?.src ?? "";
}

export function getSelectedTerrainAssetId(): string {
  const fallback = getTerrainAssets()[0]?.id ?? "";
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(SELECTED_STORAGE_KEY) ?? fallback;
}

export function setSelectedTerrainAssetId(assetId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_STORAGE_KEY, assetId);
    window.dispatchEvent(new CustomEvent("limezu:selected-terrain-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-selected-terrain-changed"));
  }
}

export function clearAllTerrainPaint() {
  cachedPaintMap = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PAINT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("limezu:terrain-paint-changed"));
    window.dispatchEvent(new CustomEvent("satiria:limezu-terrain-paint-changed"));
  }
}

export const TERRAIN_LIBRARY = TERRAIN_ASSETS;
export const getDefaultTerrainImage = terrainImageForKind;
export const clearAllDirectTerrainPaint = clearAllTerrainPaint;
