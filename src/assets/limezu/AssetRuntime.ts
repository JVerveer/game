import type { LimeZuRuntimeAsset } from "./types";

export function createAssetLookup<T extends LimeZuRuntimeAsset>(assets: T[]) {
  const byId = new Map<string, T>();
  const bySourceAssetId = new Map<string, T>();

  for (const asset of assets) {
    byId.set(asset.id, asset);
    bySourceAssetId.set(asset.sourceAssetId, asset);
  }

  return {
    all: assets,
    byId,
    bySourceAssetId,
    get(id: string | undefined, fallback?: T): T {
      if (id) {
        const direct = byId.get(id) ?? bySourceAssetId.get(id);
        if (direct) return direct;
      }

      return fallback ?? assets[0];
    },
  };
}

export const LIMEZU_RUNTIME_EVENTS = {
  terrainPaintChanged: "limezu:terrain-paint-changed",
  objectPaintChanged: "limezu:object-paint-changed",
  selectedTerrainChanged: "limezu:selected-terrain-changed",
  selectedObjectChanged: "limezu:selected-object-changed",
} as const;

export function dispatchRuntimeAssetEvent(eventName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName));
  }
}
