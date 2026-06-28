import { assetsForCategory, getCatalogAsset, type LimeZuCatalogAsset } from "../assets/AssetCatalog";

export type LimeZuObjectAsset = LimeZuCatalogAsset;
export type LimeZuObjectPaintMap = Record<string, string>;

const SELECTED_OBJECT_KEY = "satiria.limezuSelectedObjectAsset.v2";
const OBJECT_MAP_KEY = "satiria.limezuObjectPaint.v2";
let cachedObjectMap: LimeZuObjectPaintMap = {};

export function objectLibrary(): LimeZuObjectAsset[] { return assetsForCategory("object"); }

export const LIMEZU_OBJECT_LIBRARY = new Proxy([] as unknown as LimeZuObjectAsset[], {
  get(_target, property) {
    const current = objectLibrary();
    const value = (current as any)[property as any];
    return typeof value === "function" ? value.bind(current) : value;
  },
}) as LimeZuObjectAsset[];

export function objectCoordKey(x: number, y: number) { return `${x},${y}`; }
export function getLimeZuObjectAsset(id: string | undefined): LimeZuObjectAsset { return getCatalogAsset(id); }

export function getSelectedLimeZuObjectAssetId(): string {
  const fallback = objectLibrary()[0]?.id ?? "";
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(SELECTED_OBJECT_KEY) ?? fallback;
}

export function setSelectedLimeZuObjectAssetId(assetId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_OBJECT_KEY, assetId);
    window.dispatchEvent(new CustomEvent("satiria:limezu-selected-object-changed"));
  }
}

export function readLimeZuObjectPaintMap(): LimeZuObjectPaintMap {
  if (typeof window === "undefined") return cachedObjectMap;
  try { cachedObjectMap = JSON.parse(window.localStorage.getItem(OBJECT_MAP_KEY) ?? "{}"); }
  catch { cachedObjectMap = {}; }
  return cachedObjectMap;
}

export function writeLimeZuObjectPaintMap(next: LimeZuObjectPaintMap) {
  cachedObjectMap = { ...next };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(OBJECT_MAP_KEY, JSON.stringify(cachedObjectMap));
    window.dispatchEvent(new CustomEvent("satiria:limezu-object-paint-changed"));
  }
}

export function paintLimeZuObjectAt(x: number, y: number, assetId: string) {
  writeLimeZuObjectPaintMap({ ...readLimeZuObjectPaintMap(), [objectCoordKey(x, y)]: assetId });
}

export function eraseLimeZuObjectAt(x: number, y: number) {
  const next = { ...readLimeZuObjectPaintMap() };
  delete next[objectCoordKey(x, y)];
  writeLimeZuObjectPaintMap(next);
}

export function limeZuObjectAssetForCoord(x: number, y: number): LimeZuObjectAsset | undefined {
  const assetId = readLimeZuObjectPaintMap()[objectCoordKey(x, y)];
  return assetId ? getLimeZuObjectAsset(assetId) : undefined;
}

export function clearAllLimeZuObjects() {
  cachedObjectMap = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(OBJECT_MAP_KEY);
    window.dispatchEvent(new CustomEvent("satiria:limezu-object-paint-changed"));
  }
}
