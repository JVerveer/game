export type BuildingCatalogLayer = "base" | "decor" | "collision";

export type BuildingCatalogTile = {
  x: number;
  y: number;
  layer: BuildingCatalogLayer;
  assetId?: string;
  collision?: boolean;
};

export type BuildingCatalogPrefab = {
  id: string;
  name: string;
  kind: "house" | "shop" | "healing" | "station" | "hall";
  color: "red" | "blue" | "purple" | "green";
  width: number;
  height: number;
  tiles: BuildingCatalogTile[];
  entrance: {
    x: number;
    y: number;
  };
  tags: string[];
};

/**
 * Permanent building prefabs.
 *
 * Workflow:
 * 1. Open Building Catalog Builder.
 * 2. Build on the 20x10 grid.
 * 3. Click Export Catalog Entry.
 * 4. Paste the exported object into this array.
 * 5. Save, commit, push.
 */
export const BUILDING_PREFAB_CATALOG = [
  // Paste exported building prefab objects here.
] as const satisfies BuildingCatalogPrefab[];
