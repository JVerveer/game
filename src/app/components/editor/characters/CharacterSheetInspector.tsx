import { useMemo, useState } from "react";
import type { CharacterAsset } from "../../../assets/limezu/characters/CharacterAssetCatalog";

type SheetSelection = {
  name: string;
  frames: number[];
  animation: "idle" | "walk" | "run" | "attack" | "custom";
  facing: "down" | "left" | "right" | "up" | "none";
};

function range(start: number, count: number) {
  return Array.from({ length: count }, (_, index) => start + index);
}

function safeNumber(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function CharacterSheetInspector({
  asset,
  onClose,
}: {
  asset: CharacterAsset;
  onClose: () => void;
}) {
  const [frameWidth, setFrameWidth] = useState(asset.frameWidth || 48);
  const [frameHeight, setFrameHeight] = useState(asset.frameHeight || 48);
  const [selectedFrames, setSelectedFrames] = useState<Record<number, boolean>>({});
  const [selectionName, setSelectionName] = useState("selection");
  const [animation, setAnimation] = useState<SheetSelection["animation"]>("custom");
  const [facing, setFacing] = useState<SheetSelection["facing"]>("none");
  const [selections, setSelections] = useState<SheetSelection[]>([]);
  const [exportText, setExportText] = useState("");

  const columns = Math.max(1, Math.floor(asset.width / frameWidth));
  const rows = Math.max(1, Math.floor(asset.height / frameHeight));
  const frameCount = columns * rows;

  const selectedFrameIds = useMemo(
    () => Object.entries(selectedFrames)
      .filter(([, selected]) => selected)
      .map(([frame]) => Number(frame))
      .sort((a, b) => a - b),
    [selectedFrames],
  );

  function toggleFrame(frame: number) {
    setSelectedFrames(prev => ({
      ...prev,
      [frame]: !prev[frame],
    }));
  }

  function clearSelection() {
    setSelectedFrames({});
  }

  function selectRow(row: number) {
    const next = { ...selectedFrames };
    for (const frame of range(row * columns, columns)) {
      next[frame] = true;
    }
    setSelectedFrames(next);
  }

  function selectColumn(column: number) {
    const next = { ...selectedFrames };
    for (let row = 0; row < rows; row += 1) {
      next[row * columns + column] = true;
    }
    setSelectedFrames(next);
  }

  function addSelection() {
    if (selectedFrameIds.length === 0) return;

    setSelections(prev => [
      ...prev,
      {
        name: selectionName.trim() || `selection_${prev.length + 1}`,
        frames: selectedFrameIds,
        animation,
        facing,
      },
    ]);
    setSelectedFrames({});
    setSelectionName(`selection_${selections.length + 2}`);
  }

  function removeSelection(index: number) {
    setSelections(prev => prev.filter((_, i) => i !== index));
  }

  function buildExport() {
    const metadata = {
      [asset.id]: {
        assetId: asset.id,
        frameWidth,
        frameHeight,
        columns,
        rows,
        selections,
      },
    };

    const text = `// Add or merge this into src/app/assets/limezu/characters/CharacterSheetMetadata.ts

export const CHARACTER_SHEET_METADATA_PATCH = ${JSON.stringify(metadata, null, 2)} as const;
`;
    setExportText(text);

    navigator.clipboard?.writeText(text).catch(() => {
      // Textarea fallback stays visible.
    });
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Sheet Inspector</div>
            <div style={subtitleStyle}>{asset.label}</div>
            <div style={sourceStyle}>{asset.source}</div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={buildExport} style={exportButtonStyle}>Export Sheet Metadata</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={settingsStyle}>
          <label style={fieldStyle}>
            Frame width
            <input
              type="number"
              value={frameWidth}
              onChange={event => setFrameWidth(safeNumber(event.target.value, 48))}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Frame height
            <input
              type="number"
              value={frameHeight}
              onChange={event => setFrameHeight(safeNumber(event.target.value, 48))}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Selection name
            <input
              value={selectionName}
              onChange={event => setSelectionName(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={fieldStyle}>
            Animation
            <select value={animation} onChange={event => setAnimation(event.target.value as SheetSelection["animation"])} style={inputStyle}>
              <option value="custom">custom</option>
              <option value="idle">idle</option>
              <option value="walk">walk</option>
              <option value="run">run</option>
              <option value="attack">attack</option>
            </select>
          </label>

          <label style={fieldStyle}>
            Facing
            <select value={facing} onChange={event => setFacing(event.target.value as SheetSelection["facing"])} style={inputStyle}>
              <option value="none">none</option>
              <option value="down">down</option>
              <option value="left">left</option>
              <option value="right">right</option>
              <option value="up">up</option>
            </select>
          </label>
        </div>

        <div style={summaryStyle}>
          <strong>{asset.width}x{asset.height}</strong>
          <span>{columns} columns</span>
          <span>{rows} rows</span>
          <span>{frameCount} frames</span>
          <span>{selectedFrameIds.length} selected</span>
        </div>

        <div style={quickToolsStyle}>
          <button type="button" onClick={clearSelection} style={buttonStyle}>Clear selected</button>
          <button type="button" onClick={addSelection} style={buttonStyle}>Save selected frames</button>
          <span style={{ fontWeight: 900 }}>Rows:</span>
          {range(0, rows).slice(0, 12).map(row => (
            <button key={row} type="button" onClick={() => selectRow(row)} style={smallButtonStyle}>
              Row {row + 1}
            </button>
          ))}
          <span style={{ fontWeight: 900 }}>Columns:</span>
          {range(0, columns).slice(0, 12).map(column => (
            <button key={column} type="button" onClick={() => selectColumn(column)} style={smallButtonStyle}>
              Col {column + 1}
            </button>
          ))}
        </div>

        <div style={mainGridStyle}>
          <div style={sheetViewportStyle}>
            <div
              style={{
                position: "relative",
                width: asset.width,
                height: asset.height,
                backgroundImage: `url(${asset.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${asset.width}px ${asset.height}px`,
                imageRendering: "pixelated",
              }}
            >
              {range(0, frameCount).map(frame => {
                const col = frame % columns;
                const row = Math.floor(frame / columns);
                const selected = !!selectedFrames[frame];

                return (
                  <button
                    key={frame}
                    type="button"
                    onClick={() => toggleFrame(frame)}
                    title={`Frame ${frame} · row ${row + 1}, col ${col + 1}`}
                    style={{
                      position: "absolute",
                      left: col * frameWidth,
                      top: row * frameHeight,
                      width: frameWidth,
                      height: frameHeight,
                      padding: 0,
                      margin: 0,
                      border: selected ? "3px solid #ca4b36" : "1px solid rgba(255,255,255,0.4)",
                      background: selected ? "rgba(202,75,54,0.22)" : "transparent",
                      color: "#fff8c8",
                      fontSize: 9,
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={frameNumberStyle}>{frame}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={sidePanelStyle}>
            <div style={sideTitleStyle}>Saved selections</div>
            {selections.length === 0 && (
              <div style={emptyStyle}>Select frames, then click “Save selected frames”.</div>
            )}

            {selections.map((selection, index) => (
              <div key={`${selection.name}-${index}`} style={selectionCardStyle}>
                <strong>{selection.name}</strong>
                <span>{selection.frames.length} frames</span>
                <span>{selection.animation} · {selection.facing}</span>
                <code style={codeStyle}>{selection.frames.join(", ")}</code>
                <button type="button" onClick={() => removeSelection(index)} style={smallDangerButtonStyle}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>Copied if browser allowed it. Save this metadata for the sheet.</strong>
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
  zIndex: 5600,
  background: "rgba(37,32,24,0.94)",
  padding: 18,
  overflow: "auto",
};

const windowStyle: React.CSSProperties = {
  background: "#fff8c8",
  border: "4px solid #252018",
  padding: 16,
  color: "#252018",
};

const topStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
  marginBottom: 12,
};

const titleStyle: React.CSSProperties = { fontWeight: 900, fontSize: "1.25rem" };
const subtitleStyle: React.CSSProperties = { fontWeight: 900, marginTop: 4 };
const sourceStyle: React.CSSProperties = { fontWeight: 800, color: "#584c35", fontSize: "0.75rem", overflowWrap: "anywhere" };
const topButtonsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };

const buttonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: 900,
};

const exportButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };

const settingsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 8,
  marginBottom: 10,
};

const fieldStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  fontWeight: 900,
  fontSize: "0.8rem",
};

const inputStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "7px 8px",
  fontWeight: 900,
};

const summaryStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 8,
  marginBottom: 10,
  fontWeight: 800,
};

const quickToolsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  alignItems: "center",
  marginBottom: 10,
};

const smallButtonStyle: React.CSSProperties = {
  border: "1px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  padding: "4px 6px",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "0.72rem",
};

const smallDangerButtonStyle: React.CSSProperties = {
  ...smallButtonStyle,
  background: "#ca4b36",
  color: "#fff8c8",
};

const mainGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 320px",
  gap: 12,
  alignItems: "start",
};

const sheetViewportStyle: React.CSSProperties = {
  maxHeight: "62vh",
  overflow: "auto",
  border: "3px solid #252018",
  background: "#d7c58d",
  padding: 8,
};

const sidePanelStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 10,
  display: "grid",
  gap: 8,
  maxHeight: "62vh",
  overflow: "auto",
};

const sideTitleStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: "1rem",
};

const emptyStyle: React.CSSProperties = {
  color: "#584c35",
  fontWeight: 800,
};

const selectionCardStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff8c8",
  padding: 8,
  display: "grid",
  gap: 5,
  fontSize: "0.82rem",
  fontWeight: 800,
};

const codeStyle: React.CSSProperties = {
  display: "block",
  maxHeight: 50,
  overflow: "auto",
  background: "#252018",
  color: "#fff8c8",
  padding: 5,
  fontSize: 10,
};

const frameNumberStyle: React.CSSProperties = {
  position: "absolute",
  left: 2,
  top: 2,
  background: "rgba(0,0,0,0.55)",
  color: "#fff8c8",
  padding: "0 2px",
};

const exportPanelStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 10,
  marginTop: 12,
  display: "grid",
  gap: 6,
};

const exportTextareaStyle: React.CSSProperties = {
  width: "100%",
  height: 160,
  boxSizing: "border-box",
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  fontFamily: "monospace",
  fontSize: 12,
};
