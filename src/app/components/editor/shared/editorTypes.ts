import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";

export type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";
export type ObjectEditAction = "place" | "erase";
export type NpcEditorAction = "create" | "delete";

export type EditorSelection =
  | { kind: "npc"; id: string }
  | { kind: "building"; id: string }
  | { kind: "object"; coord: string }
  | { kind: "tile"; x: number; y: number }
  | null;

export type NpcVisualCategory =
  | "Generic"
  | "Wokeshire"
  | "Special"
  | "Cryptonia"
  | "Surveillia";

export type NpcVisualPreset = {
  id: string;
  label: string;
  variant: number;
  styleRole: string;
  category: NpcVisualCategory;
};

export type BuildingTypeOption = {
  kind: EditorBuildingKind;
  label: string;
  defaultColor: EditorBuildingColor;
  defaultW: number;
  defaultH: number;
  description: string;
};
