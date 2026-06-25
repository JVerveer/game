import { useState } from "react";

export type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";

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

  return {
    editorMode,
    setEditorMode,
    editorSelection,
    setEditorSelection,
    editorTile,
    setEditorTile,
  };
}
