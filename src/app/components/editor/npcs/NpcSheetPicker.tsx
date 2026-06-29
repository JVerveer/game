import { useMemo, useState } from "react";
import {
  CHARACTER_ASSET_CATALOG,
  type CharacterAsset,
} from "../../../assets/limezu/characters/CharacterAssetCatalog";
import { readCharacterAssetClassification } from "../../../assets/limezu/characters/CharacterAssetRuntime";
import { assignNpcSheet, clearNpcSheet, getNpcSheetAssignment } from "../../../rendering/characters/NpcSheetRuntime";

const NPC_CATEGORIES = new Set(["npc", "fullCharacter", "monster", "set"]);

function assetPreview(asset: CharacterAsset) {
  return {
    width: 48,
    height: 48,
    backgroundImage: `url(${asset.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    imageRendering: "pixelated" as const,
  };
}

export function NpcSheetPicker({
  npcId,
}: {
  npcId: string;
}) {
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(0);
  const assignment = getNpcSheetAssignment(npcId);

  const assets = useMemo(() => {
    const classification = readCharacterAssetClassification() as Record<string, string>;
    const q = query.trim().toLowerCase();

    return CHARACTER_ASSET_CATALOG.filter(asset => {
      const category = classification[asset.id] ?? asset.defaultCategory;
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();

      return NPC_CATEGORIES.has(category) && (!q || haystack.includes(q));
    });
  }, [query, version]);

  function assign(assetId: string) {
    assignNpcSheet(npcId, assetId);
    setVersion(current => current + 1);
  }

  function clear() {
    clearNpcSheet(npcId);
    setVersion(current => current + 1);
  }

  return (
    <div style={panelStyle}>
      <div style={titleStyle}>NPC Sheet Assignment</div>
      <div style={subtitleStyle}>NPC: {npcId}</div>

      {assignment && (
        <div style={currentStyle}>
          Assigned: <strong>{assignment.assetId}</strong>
          <button type="button" onClick={clear} style={dangerButtonStyle}>Clear</button>
        </div>
      )}

      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search NPC/full character sheets..."
        style={inputStyle}
      />

      <div style={gridStyle}>
        {assets.map(asset => (
          <button
            key={asset.id}
            type="button"
            onClick={() => assign(asset.id)}
            style={{
              ...assetButtonStyle,
              outline: assignment?.assetId === asset.id ? "4px solid #315f2a" : undefined,
            }}
            title={asset.source}
          >
            <i style={assetPreview(asset)} />
            <span>{asset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff8c8",
  padding: 10,
  display: "grid",
  gap: 8,
  color: "#252018",
};

const titleStyle: React.CSSProperties = { fontWeight: 900, fontSize: "1rem" };
const subtitleStyle: React.CSSProperties = { fontWeight: 800, color: "#584c35" };
const currentStyle: React.CSSProperties = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", fontWeight: 800 };

const inputStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "8px 10px",
  fontWeight: 900,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: 8,
  maxHeight: 260,
  overflow: "auto",
};

const assetButtonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#f4e8b5",
  color: "#252018",
  padding: 7,
  display: "grid",
  gap: 5,
  justifyItems: "center",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "0.72rem",
};

const dangerButtonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#ca4b36",
  color: "#fff8c8",
  padding: "4px 8px",
  fontWeight: 900,
  cursor: "pointer",
};
