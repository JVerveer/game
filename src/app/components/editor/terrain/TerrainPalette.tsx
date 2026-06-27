import { useMemo, useState } from "react";
import {
  DEFAULT_TERRAIN_ASSIGNMENT,
  TERRAIN_LIBRARY,
  writeTerrainAssignment,
} from "./TerrainLibrary";

const PRIMARY_TERRAIN_IDS = [
  { id: "G", name: "Grass" },
  { id: "R", name: "Road / Path" },
  { id: "W", name: "Water" },
  { id: "T", name: "Forest" },
  { id: "E", name: "Plaza" },
  { id: "Y", name: "Flowers" },
  { id: "L", name: "Flower Patch" },
  { id: "S", name: "Sand" },
  { id: "X", name: "Tall Grass" },
  { id: "F", name: "Fence" },
  { id: "J", name: "Dock" },
  { id: "D", name: "Dark Floor" },
  { id: "C", name: "Cave" },
  { id: "M", name: "Mountain" },
] as const;

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

function terrainAssetForId(assetId: string | undefined) {
  return (
    TERRAIN_LIBRARY.find(asset => asset.id === assetId) ??
    TERRAIN_LIBRARY[0]
  );
}

function nextAssignmentFor(assetId: string, fallbackTile: string) {
  return {
    ...DEFAULT_TERRAIN_ASSIGNMENT,
    [fallbackTile]: assetId,
  };
}

export function TerrainPalette({
  editorTile,
  setEditorTile,
}: {
  editorTile: string;
  setEditorTile: (tile: string) => void;
}) {
  const [targetTile, setTargetTile] = useState(editorTile || "G");
  const [query, setQuery] = useState("");

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TERRAIN_LIBRARY;

    return TERRAIN_LIBRARY.filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  function selectTerrain(assetId: string) {
    setEditorTile(targetTile);
    writeTerrainAssignment(nextAssignmentFor(assetId, targetTile));
  }

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>LimeZu Terrain Brush</div>
          <div style={subtitleStyle}>
            Pick the map ID to paint, then choose any LimeZu terrain sprite. This replaces the old terrain buttons.
          </div>
        </div>

        <label style={searchWrapStyle}>
          <span style={labelStyle}>Search sprites</span>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="grass, water, road, sand, fence..."
            style={searchStyle}
          />
        </label>
      </div>

      <div style={targetGridStyle}>
        {PRIMARY_TERRAIN_IDS.map(tile => {
          const active = targetTile === tile.id;
          const preview = terrainAssetForId(DEFAULT_TERRAIN_ASSIGNMENT[tile.id]);

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => {
                setTargetTile(tile.id);
                setEditorTile(tile.id);
              }}
              style={{
                ...targetButtonStyle,
                border: active ? "4px solid #ca4b36" : "2px solid #252018",
                background: active ? "#fff3a8" : "#fff8c8",
              }}
            >
              <span style={targetCodeStyle}>{tile.id}</span>
              <img src={preview.src} alt="" style={targetPreviewStyle} />
              <span style={targetNameStyle}>{tile.name}</span>
            </button>
          );
        })}
      </div>

      <div style={assetGridStyle}>
        {filteredAssets.map(asset => (
          <button
            key={asset.id}
            type="button"
            onClick={() => selectTerrain(asset.id)}
            title={asset.source}
            style={assetButtonStyle}
          >
            <img src={asset.src} alt="" style={assetPreviewStyle} />
            <span style={assetLabelStyle}>{asset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export const TILE_TYPES = PRIMARY_TERRAIN_IDS.map(tile => ({
  id: tile.id,
  name: tile.name,
  description: "LimeZu terrain brush",
}));

export { EDITOR_TILE_COLORS };
export const tileTypeFor = (id: string) => TILE_TYPES.find(tile => tile.id === id);

const panelStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  marginBottom: 12,
};

const headerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr minmax(260px, 360px)",
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

const searchWrapStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: "0.75rem",
  color: "#252018",
};

const searchStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "9px 10px",
  fontWeight: 900,
};

const targetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))",
  gap: 8,
};

const targetButtonStyle: React.CSSProperties = {
  minHeight: 72,
  display: "grid",
  gridTemplateColumns: "24px 40px 1fr",
  alignItems: "center",
  gap: 7,
  padding: 7,
  color: "#252018",
  cursor: "pointer",
  fontWeight: 900,
  textAlign: "left",
};

const targetCodeStyle: React.CSSProperties = {
  color: "#ca4b36",
  fontWeight: 900,
};

const targetPreviewStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  imageRendering: "pixelated",
  border: "1px solid #252018",
};

const targetNameStyle: React.CSSProperties = {
  fontSize: "0.78rem",
};

const assetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
  gap: 8,
  maxHeight: 340,
  overflow: "auto",
  padding: 2,
};

const assetButtonStyle: React.CSSProperties = {
  background: "#fff8c8",
  color: "#252018",
  cursor: "pointer",
  padding: 7,
  display: "grid",
  gap: 5,
  justifyItems: "center",
  fontWeight: 900,
  border: "2px solid #252018",
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
