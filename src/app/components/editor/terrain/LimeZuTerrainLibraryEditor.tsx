import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TERRAIN_ASSIGNMENT,
  EDITOR_TERRAIN_IDS,
  TERRAIN_LIBRARY,
  readTerrainAssignment,
  resetTerrainAssignment,
  writeTerrainAssignment,
  type TerrainAssignment,
} from "./TerrainLibrary";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const TILE_LABELS: Record<string, string> = {
  G: "Grass",
  R: "Road / Path",
  W: "Water",
  T: "Forest / Trees",
  E: "Plaza",
  Y: "Flowers A",
  L: "Flowers B",
  S: "Sand",
  X: "Tall Grass",
  D: "Dungeon",
  C: "Cave",
  M: "Mountain",
  J: "Pier",
  F: "Fence",
  Q: "Quest Ground",
  V: "Save Ground",
  N: "NPC Ground",
  A: "Shop Ground",
  B: "Building Ground",
  H: "Healing Ground",
  P: "Station Ground",
  U: "Hall Ground",
  I: "Institution Ground",
  O: "Door / Entry",
};

function terrainAssetForId(assetId: string | undefined) {
  return (
    TERRAIN_LIBRARY.find(asset => asset.id === assetId) ??
    TERRAIN_LIBRARY[0]
  );
}

export function LimeZuTerrainLibraryEditor({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [assignment, setAssignment] = useState<TerrainAssignment>(() => readTerrainAssignment());
  const [selectedTile, setSelectedTile] = useState<string>("G");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const sync = () => setAssignment(readTerrainAssignment());
    window.addEventListener("satiria:terrain-assignment-changed", sync);
    return () => window.removeEventListener("satiria:terrain-assignment-changed", sync);
  }, []);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TERRAIN_LIBRARY;

    return TERRAIN_LIBRARY.filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  function assign(assetId: string) {
    const next = {
      ...assignment,
      [selectedTile]: assetId,
    };
    setAssignment(next);
    writeTerrainAssignment(next);
  }

  function reset() {
    resetTerrainAssignment();
    setAssignment(DEFAULT_TERRAIN_ASSIGNMENT);
  }

  const selectedAsset = terrainAssetForId(assignment[selectedTile]);

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topBarStyle}>
          <div>
            <div style={titleStyle}>LIMEZU TERRAIN LIBRARY</div>
            <div style={subtitleStyle}>Assign any LimeZu terrain sprite to your existing editor IDs</div>
          </div>

          <div style={buttonRowStyle}>
            <button type="button" onClick={reset} style={buttonStyle}>RESET</button>
            {onClose && <button type="button" onClick={onClose} style={saveButtonStyle}>DONE</button>}
          </div>
        </div>

        <div style={layoutStyle}>
          <aside style={panelStyle}>
            <div style={panelTitleStyle}>EDITOR IDS</div>
            <div style={idGridStyle}>
              {EDITOR_TERRAIN_IDS.map(id => {
                const asset = terrainAssetForId(assignment[id]);
                const selected = selectedTile === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedTile(id)}
                    style={{
                      ...idButtonStyle,
                      borderColor: selected ? "#d8463d" : "rgba(255,255,255,0.12)",
                      backgroundColor: selected ? "rgba(216,70,61,0.18)" : "#20282b",
                    }}
                  >
                    <span style={idCodeStyle}>{id}</span>
                    <img src={asset.src} alt="" style={smallPreviewStyle} />
                    <span style={idLabelStyle}>{TILE_LABELS[id] ?? id}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main style={panelStyle}>
            <div style={panelTitleStyle}>SELECTED TILE</div>
            <div style={selectedStyle}>
              <div style={bigIdStyle}>{selectedTile}</div>
              <img src={selectedAsset.src} alt="" style={bigPreviewStyle} />
              <div>
                <div style={selectedNameStyle}>{TILE_LABELS[selectedTile] ?? selectedTile}</div>
                <div style={sourceStyle}>{selectedAsset.source}</div>
              </div>
            </div>

            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search: grass, water, dirt, asphalt, fence..."
              style={searchStyle}
            />

            <div style={assetGridStyle}>
              {filteredAssets.map(asset => {
                const active = assignment[selectedTile] === asset.id;

                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => assign(asset.id)}
                    title={asset.source}
                    style={{
                      ...assetButtonStyle,
                      borderColor: active ? "#d8463d" : "rgba(255,255,255,0.12)",
                    }}
                  >
                    <img src={asset.src} alt="" style={assetPreviewStyle} />
                    <span style={assetLabelStyle}>{asset.label}</span>
                  </button>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 3000,
  backgroundColor: "rgba(8,12,14,0.88)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
};

const windowStyle: React.CSSProperties = {
  width: "min(1320px, calc(100vw - 36px))",
  maxHeight: "calc(100vh - 36px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.12)",
  color: "#f7f0df",
  padding: 18,
};

const topBarStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "center",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  paddingBottom: 14,
  marginBottom: 14,
};

const titleStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.8rem",
  marginBottom: 8,
};

const subtitleStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 800,
  color: "#d8cba8",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
};

const buttonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid rgba(255,255,255,0.16)",
  backgroundColor: "#20282b",
  color: "#f7f0df",
  padding: "10px 12px",
  cursor: "pointer",
  fontSize: "0.45rem",
};

const saveButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  borderColor: "#d8463d",
  background: "linear-gradient(#d5423a, #9b2524)",
};

const layoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: 14,
};

const panelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 14,
};

const panelTitleStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.55rem",
  marginBottom: 12,
};

const idGridStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const idButtonStyle: React.CSSProperties = {
  border: "2px solid rgba(255,255,255,0.12)",
  color: "#f7f0df",
  cursor: "pointer",
  padding: 8,
  display: "grid",
  gridTemplateColumns: "34px 48px 1fr",
  gap: 8,
  alignItems: "center",
  textAlign: "left",
};

const idCodeStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.6rem",
  color: "#d8463d",
};

const smallPreviewStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  imageRendering: "pixelated",
};

const idLabelStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 800,
};

const selectedStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "64px 96px 1fr",
  gap: 14,
  alignItems: "center",
  marginBottom: 14,
};

const bigIdStyle: React.CSSProperties = {
  ...PX,
  color: "#d8463d",
  fontSize: "1.5rem",
};

const bigPreviewStyle: React.CSSProperties = {
  width: 96,
  height: 96,
  imageRendering: "pixelated",
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.12)",
};

const selectedNameStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 900,
  fontSize: "1.2rem",
};

const sourceStyle: React.CSSProperties = {
  ...RJ,
  color: "#d8cba8",
  fontSize: "0.85rem",
  overflowWrap: "anywhere",
};

const searchStyle: React.CSSProperties = {
  ...RJ,
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid rgba(255,255,255,0.12)",
  backgroundColor: "#101619",
  color: "#f7f0df",
  padding: "10px 12px",
  fontWeight: 800,
  marginBottom: 12,
};

const assetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(112px, 1fr))",
  gap: 8,
  maxHeight: "58vh",
  overflow: "auto",
  paddingRight: 4,
};

const assetButtonStyle: React.CSSProperties = {
  border: "2px solid rgba(255,255,255,0.12)",
  backgroundColor: "#20282b",
  color: "#f7f0df",
  cursor: "pointer",
  padding: 8,
  display: "grid",
  gap: 6,
  justifyItems: "center",
};

const assetPreviewStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  imageRendering: "pixelated",
};

const assetLabelStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 800,
  fontSize: "0.72rem",
  lineHeight: 1.05,
  textAlign: "center",
  maxHeight: 34,
  overflow: "hidden",
};
