export type SatiriaBuildingKind = "house" | "shop" | "hall" | "station";
export type SatiriaBuildingColor = "red" | "blue" | "purple" | "green";
export type SatiriaEntranceType = "shop" | "healing" | "house" | "train";

export type SatiriaBuildingLayout = {
  id: string;
  type: SatiriaEntranceType;
  x: number;
  y: number;
  w: number;
  h: number;
  color: SatiriaBuildingColor;
  kind: SatiriaBuildingKind;
  crest: string;
};

export const SATIRIA_BUILDINGS_LAYOUT: SatiriaBuildingLayout[] = [
  { id: "home-red", type: "house", x: 8, y: 5, w: 7, h: 4, color: "red", kind: "house", crest: "★" },
  { id: "home-green", type: "house", x: 19, y: 5, w: 8, h: 5, color: "green", kind: "house", crest: "⌂" },
  { id: "home-purple", type: "house", x: 30, y: 5, w: 7, h: 6, color: "purple", kind: "house", crest: "♦" },
  { id: "home-red-tall", type: "house", x: 40, y: 5, w: 8, h: 7, color: "red", kind: "house", crest: "□" },
  { id: "shop", type: "shop", x: 3, y: 16, w: 5, h: 5, color: "green", kind: "shop", crest: "$" },
  { id: "healing", type: "healing", x: 14, y: 16, w: 5, h: 5, color: "blue", kind: "hall", crest: "+" },
  { id: "station", type: "train", x: 39, y: 18, w: 5, h: 3, color: "red", kind: "station", crest: "T" },
];

export const doorForBuilding = (building: SatiriaBuildingLayout) => ({
  x: building.x + Math.floor(building.w / 2),
  y: building.y + building.h - 1,
});

export const coord = ({ x, y }: { x: number; y: number }) => `${x},${y}`;

export const SATIRIA_ENTRANCES = SATIRIA_BUILDINGS_LAYOUT.map((building) => ({
  id: building.id,
  type: building.type,
  door: doorForBuilding(building),
  front: { x: doorForBuilding(building).x, y: doorForBuilding(building).y + 1 },
}));
