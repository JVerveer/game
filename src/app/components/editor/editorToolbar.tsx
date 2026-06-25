import type { EditorMode } from "./shared/editorTypes";
import { EDITOR_MODES } from "./shared/editorConstants";

export function EditorToolbar({
  editorMode,
  setEditorMode,
}: {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      {EDITOR_MODES.map(mode => (
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
