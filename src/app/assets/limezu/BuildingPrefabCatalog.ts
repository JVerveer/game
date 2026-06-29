export type BuildingCatalogLayer = "base" | "decor" | "collision";

export type BuildingCatalogTile = {
  x: number;
  y: number;
  layer: BuildingCatalogLayer;
  assetId?: string;
  src?: string;
  width?: number;
  height?: number;
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

export const BUILDING_PREFAB_CATALOG = [
  // Paste exported building prefab objects here.
] as const satisfies readonly BuildingCatalogPrefab[];
