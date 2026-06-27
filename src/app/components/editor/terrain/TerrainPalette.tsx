import { useMemo, useState } from "react";
import {
  TERRAIN_LIBRARY,
  clearAllDirectTerrainPaint,
  getSelectedTerrainAssetId,
  setSelectedTerrainAssetId,
} from "./TerrainLibrary";

const EDITOR_TILE_COLORS: Record<string, string> = {
  G: "#56b447",
  R: "#d4a15f",
  W: "#2f9bd2",
  T: "#185c2b",
  E: "#9a9a9a",
  Y: "#ff4fa3",
  L: "#ffcf33",
  S: "#f0d079",
  X: "#2f8d3a",
  D: "#29213f",
  C: "#65412b",
  M: "#676767",
  J: "#9b5b2b",
  F: "#8b4f25",
  Q: "#f6d746",
  V: "#ffd84d",
  N: "#c87aff",
};

const TILE_TYPES = TERRAIN_LIBRARY.map(asset => ({
  id: asset.id,
  name: asset.label,
  description: asset.source,
}));

export function TerrainPalette({
  editorTile,
  setEditorTile,
}: {
  editorTile: string;
  setEditorTile: (tile: string) => void;
}) {
  const [selectedAssetId, setSelectedAssetIdState] = useState(() => getSelectedTerrainAssetId());
  const [query, setQuery] = useState("");

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TERRAIN_LIBRARY;

    return TERRAIN_LIBRARY.filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  function selectAsset(assetId: string) {
    setSelectedAssetIdState(assetId);
    setSelectedTerrainAssetId(assetId);

    // Keep terrain mode active. The actual terrain sprite is stored per coordinate
    // by the patched terrain painter.
    setEditorTile(assetId);
  }

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>LimeZu Terrain Brush</div>
          <div style={subtitleStyle}>
            Select any LimeZu terrain sprite, then paint it directly on the map.
          </div>
        </div>

        <div style={rightToolsStyle}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search: grass, water, dirt, asphalt, fence..."
            style={searchStyle}
          />
          <button
            type="button"
            onClick={() => clearAllDirectTerrainPaint()}
            style={clearButtonStyle}
          >
            Clear LimeZu Paint
          </button>
        </div>
      </div>

      <div style={assetGridStyle}>
        {filteredAssets.map(asset => {
          const selected = selectedAssetId === asset.id;

          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => selectAsset(asset.id)}
              title={asset.source}
              style={{
                ...assetButtonStyle,
                border: selected ? "4px solid #ca4b36" : "2px solid #252018",
                background: selected ? "#fff3a8" : "#fff8c8",
              }}
            >
              <img src={asset.src} alt="" style={assetPreviewStyle} />
              <span style={assetLabelStyle}>{asset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { TILE_TYPES, EDITOR_TILE_COLORS };
export const tileTypeFor = (id: string) => TILE_TYPES.find(tile => tile.id === id);

const panelStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  marginBottom: 12,
};

const headerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr minmax(300px, 420px)",
  gap: 12,
  alignItems: "end",
  background: "#fff8c8",
  border: "2px solid #252018",
  padding: 12,
};

const titleStyle: React.CSSProperties = {
  fontWeight: 900,
  color: "#252018",
};

const subtitleStyle: React.CSSProperties = {
  fontWeight: 800,
  color: "#584c35",
  fontSize: "0.85rem",
  marginTop: 4,
};

const rightToolsStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const searchStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "9px 10px",
  fontWeight: 900,
};

const clearButtonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#ca4b36",
  color: "#fff8c8",
  padding: "9px 10px",
  cursor: "pointer",
  fontWeight: 900,
};

const assetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
  gap: 8,
  maxHeight: 420,
  overflow: "auto",
  padding: 2,
};

const assetButtonStyle: React.CSSProperties = {
  color: "#252018",
  cursor: "pointer",
  padding: 7,
  display: "grid",
  gap: 5,
  justifyItems: "center",
  fontWeight: 900,
};

const assetPreviewStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  imageRendering: "pixelated",
};

const assetLabelStyle: React.CSSProperties = {
  fontSize: "0.62rem",
  lineHeight: 1.05,
  textAlign: "center",
  maxHeight: 28,
  overflow: "hidden",
};
