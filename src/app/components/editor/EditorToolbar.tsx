type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";

export function EditorToolbar({
  editorMode,
  setEditorMode,
}: {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}) {
  const modes: EditorMode[] = ["select", "terrain", "buildings", "objects", "npcs"];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      {modes.map(mode => (
        <button
          key={mode}
          type="button"
          onClick={() => setEditorMode(mode)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: editorMode === mode ? "4px solid #ca4b36" : "2px solid #252018",
            background: editorMode === mode ? "#fff3a8" : "#fff8c8",
            color: "#252018",
            fontWeight: 900,
            textTransform: "capitalize",
          }}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
