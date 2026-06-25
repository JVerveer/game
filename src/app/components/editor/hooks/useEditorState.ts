import { useState } from "react";
import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";

export type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";
export type ObjectEditAction = "place" | "erase";
export type NpcEditorAction = "create" | "edit" | "delete";
export type NpcVisualCategory =
  | "Generic"
  | "Wokeshire"
  | "Special"
  | "Cryptonia"
  | "Surveillia";

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
  const [npcEditAction, setNpcEditAction] = useState<ObjectEditAction>("place");
  const [npcEditorAction, setNpcEditorAction] = useState<NpcEditorAction>("create");
  const [editorNpcName, setEditorNpcName] = useState("Local NPC");
  const [editorNpcPresetId, setEditorNpcPresetId] = useState("generic-young-man-0");
  const [editorNpcCategory, setEditorNpcCategory] = useState<NpcVisualCategory>("Generic");
  const [editorNpcSearch, setEditorNpcSearch] = useState("");
  const [editorNpcWalking, setEditorNpcWalking] = useState(true);
  const [editorNpcLines, setEditorNpcLines] = useState("Hello there!\nI was placed in the editor.");

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
    npcEditAction,
    setNpcEditAction,
    npcEditorAction,
    setNpcEditorAction,
    editorNpcName,
    setEditorNpcName,
    editorNpcPresetId,
    setEditorNpcPresetId,
    editorNpcCategory,
    setEditorNpcCategory,
    editorNpcSearch,
    setEditorNpcSearch,
    editorNpcWalking,
    setEditorNpcWalking,
    editorNpcLines,
    setEditorNpcLines,
  };
}
