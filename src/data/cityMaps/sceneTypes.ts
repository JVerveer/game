export type PixelBuildingColor = "default" | "purple" | "red" | "green" | "white" | "orange" | "blue" | "yellow";

export type PixelBuilding = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: PixelBuildingColor;
  kind: "house" | "shop" | "healing" | "hall" | "station";
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
