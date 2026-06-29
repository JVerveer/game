import { lazy, Suspense, useState } from "react";

const LimeZuAssetCategorizer = lazy(() =>
  import("./assets/LimeZuAssetCategorizer").then(module => ({
    default: module.LimeZuAssetCategorizer,
  })),
);

const CharacterAssetManager = lazy(() =>
  import("./characters/CharacterAssetManager").then(module => ({
    default: module.CharacterAssetManager,
  })),
);

type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";

const loadingPanelStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 6000,
  display: "grid",
  placeItems: "center",
  background: "rgba(37,32,24,0.85)",
  color: "#fff8c8",
  fontWeight: 900,
};

export function EditorToolbar({
  editorMode,
  setEditorMode,
}: {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}) {
  const [showCharacterAssetManager, setShowCharacterAssetManager] = useState(false);
  const [showAssetCategorizer, setShowAssetCategorizer] = useState(false);
  const modes: EditorMode[] = ["select", "terrain", "buildings", "objects", "npcs"];

  return (
    <>
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

        <button
          type="button"
          onClick={() => setShowAssetCategorizer(true)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: "2px solid #252018",
            background: "#315f2a",
            color: "#fff8c8",
            fontWeight: 900,
          }}
        >
          Asset Categorizer
        </button>

        <button
          type="button"
          onClick={() => setShowCharacterAssetManager(true)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: "2px solid #252018",
            background: "#5b3f8c",
            color: "#fff8c8",
            fontWeight: 900,
          }}
        >
          Character Assets
        </button>
      </div>

      <Suspense fallback={<div style={loadingPanelStyle}>Loading editor assets...</div>}>
        {showAssetCategorizer && (
          <LimeZuAssetCategorizer onClose={() => setShowAssetCategorizer(false)} />
        )}
        {showCharacterAssetManager && (
          <CharacterAssetManager onClose={() => setShowCharacterAssetManager(false)} />
        )}
      </Suspense>
    </>
  );
}
