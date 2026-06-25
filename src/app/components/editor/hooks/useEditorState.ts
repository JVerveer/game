import { useState } from "react";
import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";

export type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";
export type ObjectEditAction = "place" | "erase";

export type EditorSelection =
  | { kind: "npc"; id: string }
  | { kind: "building"; id: string }
  | { kind: "object"; coord: string }
  | { kind: "tile"; x: number; y: number }
  | null;

export function useEditorState() {
  const [editorMode, setEditorMode] = useState<EditorMode>("select");
  const [editorSelection, setEditorSelection] = useState<EditorSelection>(null);
  const [editorTile, setEditorTile] = useState("G");
  const [editorBuildingKind, setEditorBuildingKind] = useState<EditorBuildingKind>("house");
  const [editorBuildingColor, setEditorBuildingColor] = useState<EditorBuildingColor>("purple");
  const [editorBuildingW, setEditorBuildingW] = useState(5);
  const [editorBuildingH, setEditorBuildingH] = useState(4);
  const [objectEditAction, setObjectEditAction] = useState<ObjectEditAction>("place");
  const [editorObjectId, setEditorObjectId] = useState("SIGN");

  return {
    editorMode,
    setEditorMode,
    editorSelection,
    setEditorSelection,
    editorTile,
    setEditorTile,
    editorBuildingKind,
    setEditorBuildingKind,
    editorBuildingColor,
    setEditorBuildingColor,
    editorBuildingW,
    setEditorBuildingW,
    editorBuildingH,
    setEditorBuildingH,
    objectEditAction,
    setObjectEditAction,
    editorObjectId,
    setEditorObjectId,
  };
}
