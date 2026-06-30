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
  {
    "id": "building-brexiton-row-house",
    "name": "Brexiton Row House",
    "kind": "house",
    "color": "red",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12481"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13824"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13825"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13824"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13825"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12479"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12479"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13358"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "brexiton",
      "house",
      "starter"
    ]
  },
  {
    "id": "building-cryptonia-tower-lobby",
    "name": "Cryptonia Tower Lobby",
    "kind": "hall",
    "color": "blue",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13016"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13808"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13810"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13808"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13810"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13923"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13923"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13359"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "cryptonia",
      "hall",
      "starter"
    ]
  },
  {
    "id": "building-factcheck-archive",
    "name": "Factcheck Archive",
    "kind": "hall",
    "color": "green",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13017"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13826"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13827"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13826"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13827"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12317"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12317"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13360"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "factcheck",
      "hall",
      "starter"
    ]
  },
  {
    "id": "building-inflatopolis-cafe",
    "name": "Inflatopolis Cafe",
    "kind": "shop",
    "color": "purple",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13381"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13818"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13819"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13818"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13819"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13320"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13320"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13361"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "inflatopolis",
      "shop",
      "starter"
    ]
  },
  {
    "id": "building-new-building",
    "name": "New Building",
    "kind": "healing",
    "color": "purple",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_05.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 6,
      "y": 7
    },
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-promptford-atelier",
    "name": "Promptford Atelier",
    "kind": "house",
    "color": "blue",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12482"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_14700"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_14701"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_14700"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_14701"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12450"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12450"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12445"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "promptford",
      "house",
      "starter"
    ]
  },
  {
    "id": "building-satiria-cottage",
    "name": "Satiria Cottage",
    "kind": "house",
    "color": "red",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_12480"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13818"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13819"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13818"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13819"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12458"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_12458"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13350"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "satiria",
      "house",
      "starter"
    ]
  },
  {
    "id": "building-satiria-healing-center",
    "name": "Satiria Healing Center",
    "kind": "healing",
    "color": "blue",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13380"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13822"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13823"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13822"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13823"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12319"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13923"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13923"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13356"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "satiria",
      "healing",
      "starter"
    ]
  },
  {
    "id": "building-satiria-shop",
    "name": "Satiria Shop",
    "kind": "shop",
    "color": "green",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13375"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13820"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13821"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13820"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13821"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13318"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13318"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13355"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "satiria",
      "shop",
      "starter"
    ]
  },
  {
    "id": "building-satiria-station",
    "name": "Satiria Station",
    "kind": "station",
    "color": "purple",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13015"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_14059"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_14076"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_14059"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_14076"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13979"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13979"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13357"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "satiria",
      "station",
      "starter"
    ]
  },
  {
    "id": "building-tariff-beach-kiosk",
    "name": "Tariff Beach Kiosk",
    "kind": "shop",
    "color": "green",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 10,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 11,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 12,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_13018"
      },
      {
        "x": 13,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13336"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "decor",
        "assetId": "asset_13337"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13336"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "decor",
        "assetId": "asset_13337"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_12320"
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13321"
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13321"
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "decor",
        "assetId": "asset_13362"
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 9,
      "y": 6
    },
    "tags": [
      "tariff",
      "shop",
      "starter"
    ]
  }
] as const satisfies readonly BuildingCatalogPrefab[];
