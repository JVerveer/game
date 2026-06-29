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

function tile(assetId: string, x: number, y: number, layer: BuildingCatalogLayer = "base"): BuildingCatalogTile {
  return { x, y, layer, assetId };
}

function starterBuilding({
  id,
  name,
  kind,
  color,
  roof,
  wall,
  door,
  windowLeft,
  windowRight,
  sign,
  tags,
}: {
  id: string;
  name: string;
  kind: BuildingCatalogPrefab["kind"];
  color: BuildingCatalogPrefab["color"];
  roof: string;
  wall: string;
  door: string;
  windowLeft: string;
  windowRight: string;
  sign?: string;
  tags: string[];
}): BuildingCatalogPrefab {
  const tiles: BuildingCatalogTile[] = [];

  for (let x = 6; x <= 13; x += 1) {
    tiles.push(tile(roof, x, 2));
    tiles.push(tile(wall, x, 3));
    tiles.push(tile(wall, x, 4));
    tiles.push(tile(wall, x, 5));
  }

  tiles.push(
    tile(windowLeft, 7, 4, "decor"),
    tile(windowRight, 12, 4, "decor"),
    tile(windowLeft, 8, 5, "decor"),
    tile(windowRight, 11, 5, "decor"),
    tile(door, 9, 6, "decor"),
    tile(door, 10, 6, "decor"),
  );

  if (sign) {
    tiles.push(tile(sign, 11, 6, "decor"));
  }

  for (let y = 2; y <= 6; y += 1) {
    for (let x = 6; x <= 13; x += 1) {
      tiles.push({ x, y, layer: "collision", collision: true });
    }
  }

  return {
    id,
    name,
    kind,
    color,
    width: 20,
    height: 10,
    tiles,
    entrance: { x: 9, y: 6 },
    tags,
  };
}

export const BUILDING_PREFAB_CATALOG = [
  starterBuilding({
    id: "building-satiria-cottage",
    name: "Satiria Cottage",
    kind: "house",
    color: "red",
    roof: "asset_12480",
    wall: "asset_12319",
    door: "asset_12458",
    windowLeft: "asset_13818",
    windowRight: "asset_13819",
    sign: "asset_13350",
    tags: ["satiria", "house", "starter"],
  }),
  starterBuilding({
    id: "building-satiria-shop",
    name: "Satiria Shop",
    kind: "shop",
    color: "green",
    roof: "asset_13375",
    wall: "asset_12320",
    door: "asset_13318",
    windowLeft: "asset_13820",
    windowRight: "asset_13821",
    sign: "asset_13355",
    tags: ["satiria", "shop", "starter"],
  }),
  starterBuilding({
    id: "building-satiria-healing-center",
    name: "Satiria Healing Center",
    kind: "healing",
    color: "blue",
    roof: "asset_13380",
    wall: "asset_12319",
    door: "asset_13923",
    windowLeft: "asset_13822",
    windowRight: "asset_13823",
    sign: "asset_13356",
    tags: ["satiria", "healing", "starter"],
  }),
  starterBuilding({
    id: "building-satiria-station",
    name: "Satiria Station",
    kind: "station",
    color: "purple",
    roof: "asset_13015",
    wall: "asset_12320",
    door: "asset_13979",
    windowLeft: "asset_14059",
    windowRight: "asset_14076",
    sign: "asset_13357",
    tags: ["satiria", "station", "starter"],
  }),
  starterBuilding({
    id: "building-brexiton-row-house",
    name: "Brexiton Row House",
    kind: "house",
    color: "red",
    roof: "asset_12481",
    wall: "asset_12319",
    door: "asset_12479",
    windowLeft: "asset_13824",
    windowRight: "asset_13825",
    sign: "asset_13358",
    tags: ["brexiton", "house", "starter"],
  }),
  starterBuilding({
    id: "building-cryptonia-tower-lobby",
    name: "Cryptonia Tower Lobby",
    kind: "hall",
    color: "blue",
    roof: "asset_13016",
    wall: "asset_12320",
    door: "asset_13923",
    windowLeft: "asset_13808",
    windowRight: "asset_13810",
    sign: "asset_13359",
    tags: ["cryptonia", "hall", "starter"],
  }),
  starterBuilding({
    id: "building-factcheck-archive",
    name: "Factcheck Archive",
    kind: "hall",
    color: "green",
    roof: "asset_13017",
    wall: "asset_12319",
    door: "asset_12317",
    windowLeft: "asset_13826",
    windowRight: "asset_13827",
    sign: "asset_13360",
    tags: ["factcheck", "hall", "starter"],
  }),
  starterBuilding({
    id: "building-inflatopolis-cafe",
    name: "Inflatopolis Cafe",
    kind: "shop",
    color: "purple",
    roof: "asset_13381",
    wall: "asset_12320",
    door: "asset_13320",
    windowLeft: "asset_13818",
    windowRight: "asset_13819",
    sign: "asset_13361",
    tags: ["inflatopolis", "shop", "starter"],
  }),
  starterBuilding({
    id: "building-promptford-atelier",
    name: "Promptford Atelier",
    kind: "house",
    color: "blue",
    roof: "asset_12482",
    wall: "asset_12319",
    door: "asset_12450",
    windowLeft: "asset_14700",
    windowRight: "asset_14701",
    sign: "asset_12445",
    tags: ["promptford", "house", "starter"],
  }),
  starterBuilding({
    id: "building-tariff-beach-kiosk",
    name: "Tariff Beach Kiosk",
    kind: "shop",
    color: "green",
    roof: "asset_13018",
    wall: "asset_12320",
    door: "asset_13321",
    windowLeft: "asset_13336",
    windowRight: "asset_13337",
    sign: "asset_13362",
    tags: ["tariff", "shop", "starter"],
  }),
] as const satisfies readonly BuildingCatalogPrefab[];
