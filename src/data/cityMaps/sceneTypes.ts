export type PixelBuildingColor = "red" | "blue" | "purple" | "green";

export type PixelBuilding = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: PixelBuildingColor;
  kind: "house" | "shop" | "hall" | "station";
  crest?: string;
};

export type PixelObject = {
  sprite: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  className?: string;
};

