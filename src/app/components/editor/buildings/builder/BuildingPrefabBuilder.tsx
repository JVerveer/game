import { useState } from "react";
import {
  clearBuildingCanvasDraft,
  createEmptyBuildingDraft,
  exportBuildingCanvasDraftTs,
  readBuildingCanvasDraft,
  resizeBuildingCanvasDraft,
  saveBuildingCanvasAsPrefab,
  writeBuildingCanvasDraft,
  type BuildingCanvasDraft,
  type BuildingCanvasLayer,
  type BuildingCanvasTool,
} from "../../../../assets/limezu/BuildingCanvasRuntime";
import { BuildingPartPalette } from "./BuildingPartPalette";
import { BuildingCanvasGrid } from "./BuildingCanvasGrid";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const TOOLS: BuildingCanvasTool[] = ["brush", "eraser", "picker", "fill"];
const LAYERS: BuildingCanvasLayer[] = ["base", "decor", "collision"];

export function BuildingPrefabBuilder({
  onClose,
}: {
  onClose: () => void;
}) {
  const [draft, setDraftState] = useState<BuildingCanvasDraft>(() => readBuildingCanvasDraft());
  const [history, setHistory] = useState<BuildingCanvasDraft[]>([]);
  const [future, setFuture] = useState<BuildingCanvasDraft[]>([]);
  const [exportText, setExportText] = useState("");

  function setDraft(next: BuildingCanvasDraft) {
    setDraftState(next);
    writeBuildingCanvasDraft(next);
  }

  function pushHistory(current: BuildingCanvasDraft) {
    setHistory(prev => [...prev.slice(-40), current]);
    setFuture([]);
  }

  function updateDraft(patch: Partial<BuildingCanvasDraft>) {
    const next = { ...draft, ...patch };
    setDraft(next);
  }

  function undo() {
    const previous = history.at(-1);
    if (!previous) return;

    setFuture(prev => [draft, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setDraft(previous);
  }

  function redo() {
    const next = future[0];
    if (!next) return;

    setHistory(prev => [...prev, draft]);
    setFuture(prev => prev.slice(1));
    setDraft(next);
  }

  function reset() {
    const next = createEmptyBuildingDraft();
    clearBuildingCanvasDraft();
    setDraftState(next);
    setHistory([]);
    setFuture([]);
  }

  function savePrefab() {
    saveBuildingCanvasAsPrefab(draft);
  }

  async function exportDraft() {
    const text = exportBuildingCanvasDraftTs(draft);
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={{ ...VT, fontSize: "1.55rem", color: "#252018", lineHeight: 1 }}>
              Building Prefab Builder V28
            </div>
            <div style={{ ...RJ, fontSize: "0.82rem", fontWeight: 900, color: "#584c35" }}>
              Paint building parts onto a reusable prefab grid.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={undo} style={buttonStyle}>Undo</button>
            <button type="button" onClick={redo} style={buttonStyle}>Redo</button>
            <button type="button" onClick={savePrefab} style={saveButtonStyle}>Save Prefab</button>
            <button type="button" onClick={exportDraft} style={buttonStyle}>Export Draft</button>
            <button type="button" onClick={reset} style={dangerButtonStyle}>Reset</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={settingsStyle}>
          <label style={fieldStyle}>
            Name
            <input
              value={draft.name}
              onChange={event => updateDraft({ name: event.target.value })}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Kind
            <select
              value={draft.kind}
              onChange={event => updateDraft({ kind: event.target.value as BuildingCanvasDraft["kind"] })}
              style={inputStyle}
            >
              <option value="house">house</option>
              <option value="shop">shop</option>
              <option value="healing">healing</option>
              <option value="station">station</option>
              <option value="hall">hall</option>
            </select>
          </label>

          <label style={fieldStyle}>
            Width
            <input
              type="number"
              min={1}
              max={32}
              value={draft.width}
              onChange={event => setDraft(resizeBuildingCanvasDraft(draft, Number(event.target.value), draft.height))}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Height
            <input
              type="number"
              min={1}
              max={24}
              value={draft.height}
              onChange={event => setDraft(resizeBuildingCanvasDraft(draft, draft.width, Number(event.target.value)))}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Entrance X
            <input
              type="number"
              min={0}
              max={draft.width - 1}
              value={draft.entrance.x}
              onChange={event => updateDraft({ entrance: { ...draft.entrance, x: Number(event.target.value) } })}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Entrance Y
            <input
              type="number"
              min={0}
              max={draft.height - 1}
              value={draft.entrance.y}
              onChange={event => updateDraft({ entrance: { ...draft.entrance, y: Number(event.target.value) } })}
              style={inputStyle}
            />
          </label>
        </div>

        <div style={toolbarStyle}>
          <strong>Tool:</strong>
          {TOOLS.map(tool => (
            <button
              key={tool}
              type="button"
              onClick={() => updateDraft({ tool })}
              style={{
                ...buttonStyle,
                background: draft.tool === tool ? "#d8f0b0" : "#fff8c8",
                border: draft.tool === tool ? "4px solid #315f2a" : "2px solid #252018",
              }}
            >
              {tool}
            </button>
          ))}

          <strong>Layer:</strong>
          {LAYERS.map(layer => (
            <button
              key={layer}
              type="button"
              onClick={() => updateDraft({ selectedLayer: layer })}
              style={{
                ...buttonStyle,
                background: draft.selectedLayer === layer ? "#d8f0b0" : "#fff8c8",
                border: draft.selectedLayer === layer ? "4px solid #315f2a" : "2px solid #252018",
              }}
            >
              {layer}
            </button>
          ))}
        </div>

        <div style={mainStyle}>
          <BuildingPartPalette
            selectedAssetId={draft.selectedAssetId}
            onSelectAsset={assetId => updateDraft({ selectedAssetId: assetId, tool: "brush" })}
          />

          <BuildingCanvasGrid draft={draft} setDraft={setDraft} pushHistory={pushHistory} />
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>Copied if browser allowed it.</strong>
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 5800,
  background: "rgba(37,32,24,0.94)",
  padding: 18,
  overflow: "auto",
};

const windowStyle: React.CSSProperties = {
  background: "#fff8c8",
  border: "4px solid #252018",
  color: "#252018",
  padding: 16,
};

const topStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  marginBottom: 12,
};

const topButtonsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const buttonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  padding: "7px 10px",
  fontWeight: 900,
  cursor: "pointer",
};

const saveButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#315f2a",
  color: "#fff8c8",
};

const doneButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#ca4b36",
  color: "#fff8c8",
};

const dangerButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#b85b3f",
  color: "#fff8c8",
};

const settingsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: 8,
  marginBottom: 10,
};

const fieldStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 900,
  fontSize: "0.74rem",
};

const inputStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  padding: 8,
  fontWeight: 900,
};

const toolbarStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
  marginBottom: 10,
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 8,
};

const mainStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(260px, 340px) minmax(0, 1fr)",
  gap: 12,
  alignItems: "start",
};

const exportPanelStyle: React.CSSProperties = {
  marginTop: 12,
  border: "2px solid #252018",
  background: "#fff3a8",
  padding: 8,
  display: "grid",
  gap: 6,
};

const exportTextareaStyle: React.CSSProperties = {
  height: 170,
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  fontFamily: "monospace",
  fontSize: 12,
};
