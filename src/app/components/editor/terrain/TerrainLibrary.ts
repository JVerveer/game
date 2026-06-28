import { assetsForCategory, getCatalogAsset, type LimeZuCatalogAsset } from "../assets/AssetCatalog";

export type TerrainAsset = LimeZuCatalogAsset;
export type TerrainPaintMap = Record<string, string>;

const PAINT_STORAGE_KEY = "satiria.limezuDirectTerrainPaint.v4";
const SELECTED_STORAGE_KEY = "satiria.limezuSelectedTerrainAsset.v4";
let cachedPaintMap: TerrainPaintMap = {};

export function terrainLibrary(): TerrainAsset[] { return assetsForCategory("terrain"); }

export const TERRAIN_LIBRARY = new Proxy([] as unknown as TerrainAsset[], {
  get(_target, property) {
    const current = terrainLibrary();
    const value = (current as any)[property as any];
    return typeof value === "function" ? value.bind(current) : value;
  },
}) as TerrainAsset[];

export function terrainCoordKey(x: number, y: number) { return `${x},${y}`; }
export function getTerrainAsset(id: string | undefined): TerrainAsset { return getCatalogAsset(id); }

export function readTerrainPaintMap(): TerrainPaintMap {
  if (typeof window === "undefined") return cachedPaintMap;
  try { cachedPaintMap = JSON.parse(window.localStorage.getItem(PAINT_STORAGE_KEY) ?? "{}"); }
  catch { cachedPaintMap = {}; }
  return cachedPaintMap;
}

export function writeTerrainPaintMap(next: TerrainPaintMap) {
  cachedPaintMap = { ...next };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PAINT_STORAGE_KEY, JSON.stringify(cachedPaintMap));
    window.dispatchEvent(new CustomEvent("satiria:limezu-terrain-paint-changed"));
  }
}

export function paintTerrainAssetAt(x: number, y: number, assetId: string) {
  writeTerrainPaintMap({ ...readTerrainPaintMap(), [terrainCoordKey(x, y)]: assetId });
}

export function eraseTerrainAssetAt(x: number, y: number) {
  const next = { ...readTerrainPaintMap() };
  delete next[terrainCoordKey(x, y)];
  writeTerrainPaintMap(next);
}

export function terrainAssetForCoord(x: number, y: number): TerrainAsset | undefined {
  const assetId = readTerrainPaintMap()[terrainCoordKey(x, y)];
  return assetId ? getTerrainAsset(assetId) : undefined;
}

export function terrainImageForCoord(x: number, y: number): string | undefined {
  return terrainAssetForCoord(x, y)?.src;
}

export function getDefaultTerrainImage(kind: "grass" | "path" | "road" | "water" | "sand" | "plaza" | "stone" | "wood"): string {
  const library = terrainLibrary();
  const preferred = library.find(asset => {
    const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
    if (kind === "grass") return haystack.includes("grass");
    if (kind === "path") return haystack.includes("dirt") || haystack.includes("path");
    if (kind === "road") return haystack.includes("asphalt") || haystack.includes("road");
    if (kind === "water") return haystack.includes("water");
    if (kind === "sand") return haystack.includes("sand") || haystack.includes("beach");
    if (kind === "plaza") return haystack.includes("sidewalk") || haystack.includes("pavement") || haystack.includes("stone");
    if (kind === "stone") return haystack.includes("stone") || haystack.includes("sidewalk");
    if (kind === "wood") return haystack.includes("wood") || haystack.includes("floor");
    return false;
  });
  return (preferred ?? library[0])?.src ?? "";
}

export function getSelectedTerrainAssetId(): string {
  const fallback = terrainLibrary()[0]?.id ?? "";
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(SELECTED_STORAGE_KEY) ?? fallback;
}

export function setSelectedTerrainAssetId(assetId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_STORAGE_KEY, assetId);
    window.dispatchEvent(new CustomEvent("satiria:limezu-selected-terrain-changed"));
  }
}

export function clearAllDirectTerrainPaint() {
  cachedPaintMap = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PAINT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("satiria:limezu-terrain-paint-changed"));
  }
}
