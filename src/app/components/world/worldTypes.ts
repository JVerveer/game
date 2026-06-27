export type WorldAtlasCategory = "terrain" | "objects" | "buildings";

export type WorldAtlas = {
  id: string;
  label: string;
  src: string;
  atlasWidth: number;
  atlasHeight: number;
  tileSize: number;
};

export type WorldTileRef = {
  atlas: string;
  col: number;
  row: number;
  walkable?: boolean;
};

export type WorldObjectRef = {
  id: string;
  atlas: string;
  col: number;
  row: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  z?: number;
  walkable?: boolean;
};

export type WorldNpcRef = {
  id: string;
  name: string;
  x: number;
  y: number;
  facing: "up" | "down" | "left" | "right";
};

export type WorldMap = {
  width: number;
  height: number;
  tileSize: number;
  terrain: string[];
  terrainLegend: Record<string, WorldTileRef>;
  objects: WorldObjectRef[];
  npcs: WorldNpcRef[];
};
