import { useMemo, useState } from "react";
import {
  clearAllLimeZuObjects,
  getObjectAssets,
  getSelectedLimeZuObjectAssetId,
  setSelectedLimeZuObjectAssetId,
} from "./ObjectLibrary";

type ObjectEditAction = "place" | "erase";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

export function ObjectPalette({
  objectEditAction,
  setObjectEditAction,
  editorObjectId,
  setEditorObjectId,
}: {
  objectEditAction: ObjectEditAction;
  setObjectEditAction: (action: ObjectEditAction) => void;
  editorObjectId: string;
  setEditorObjectId: (objectId: string) => void;
}) {
  const [selectedAssetId, setSelectedAssetIdState] = useState(() => getSelectedLimeZuObjectAssetId());
  const [query, setQuery] = useState("");

  const filteredAssets = useMemo(() => {
    const assets = getObjectAssets();
    const q = query.trim().toLowerCase();
    if (!q) return assets;

    return assets.filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  function selectAsset(assetId: string) {
    setSelectedAssetIdState(assetId);
    setSelectedLimeZuObjectAssetId(assetId);

    // Keep the old object editor plumbing active, but the actual visual
    // LimeZu object is stored per coordinate by useTerrainPainter.
    setEditorObjectId(assetId);
    setObjectEditAction("place");
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={toolbarStyle}>
        <button
          type="button"
          onClick={() => setObjectEditAction("place")}
          style={{
            ...modeButtonStyle,
            border: objectEditAction === "place" ? "4px solid #315f2a" : "2px solid #252018",
            background: objectEditAction === "place" ? "#d8f0b0" : "#fff8c8",
          }}
        >
          Place
        </button>

        <button
          type="button"
          onClick={() => setObjectEditAction("erase")}
          style={{
            ...modeButtonStyle,
            border: objectEditAction === "erase" ? "4px solid #ca4b36" : "2px solid #252018",
            background: objectEditAction === "erase" ? "#ffd0c8" : "#fff8c8",
          }}
        >
          Remove
        </button>

        <button
          type="button"
          onClick={() => clearAllLimeZuObjects()}
          style={{
            ...modeButtonStyle,
            border: "2px solid #252018",
            background: "#ca4b36",
            color: "#fff8c8",
          }}
        >
          Clear LimeZu Objects
        </button>

        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search objects: tree, bush, flower, fence, sign, rock..."
          style={searchStyle}
        />
      </div>

      <div style={{ ...VT, fontSize: "1.05rem", color: "#252018", marginBottom: 8 }}>
        Objects are props placed on top of terrain. Terrain/floor sprites are hidden from this tab.
      </div>

      <div style={assetGridStyle}>
        {filteredAssets.map(asset => {
          const selected = selectedAssetId === asset.id && objectEditAction === "place";

          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => selectAsset(asset.id)}
              title={asset.source}
              style={{
                ...assetButtonStyle,
                border: selected ? "4px solid #315f2a" : "2px solid #252018",
                background: selected ? "#d8f0b0" : "#fff8c8",
              }}
            >
              <img src={asset.src} alt="" style={assetPreviewStyle} />
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ ...VT, fontSize: "1.05rem", lineHeight: 1 }}>{asset.label}</span>
                <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>
                  {asset.tags.slice(0, 3).join(" · ") || "object"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const toolbarStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto auto auto minmax(240px, 1fr)",
  gap: 8,
  alignItems: "center",
  marginBottom: 10,
};

const modeButtonStyle: React.CSSProperties = {
  padding: "7px 10px",
  cursor: "pointer",
  color: "#252018",
  fontWeight: 900,
};

const searchStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "8px 10px",
  fontWeight: 900,
};

const assetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
  gap: 8,
  maxHeight: 300,
  overflow: "auto",
  paddingRight: 4,
};

const assetButtonStyle: React.CSSProperties = {
  minHeight: 62,
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "7px 9px",
  color: "#252018",
  cursor: "pointer",
  textAlign: "left",
};

const assetPreviewStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  imageRendering: "pixelated",
  background: "#d7c58d",
  border: "2px solid #252018",
  flexShrink: 0,
};
