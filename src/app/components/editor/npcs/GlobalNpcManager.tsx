import { useEffect, useMemo, useState } from "react";
import {
  deleteGlobalNpc,
  readGlobalNpcs,
  readSelectedGlobalNpcId,
  writeSelectedGlobalNpcId,
  type GlobalNpcPrefab,
} from "../../../assets/limezu/characters/NpcCatalogRuntime";
import { CharacterSheetRenderer } from "../../../rendering/characters/CharacterSheetRenderer";

export function GlobalNpcManager({
  onSelect,
}: {
  onSelect: (npc: GlobalNpcPrefab) => void;
}) {
  const [refreshToken, setRefreshToken] = useState(0);
  const [selectedId, setSelectedId] = useState(() => readSelectedGlobalNpcId());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const refresh = () => {
      setSelectedId(readSelectedGlobalNpcId());
      setRefreshToken(token => token + 1);
    };
    window.addEventListener("satiria:global-npcs-changed", refresh);
    window.addEventListener("satiria:global-npc-selection-changed", refresh);
    return () => {
      window.removeEventListener("satiria:global-npcs-changed", refresh);
      window.removeEventListener("satiria:global-npc-selection-changed", refresh);
    };
  }, []);

  const npcs = useMemo(() => {
    void refreshToken;
    const q = query.trim().toLowerCase();
    return Object.values(readGlobalNpcs())
      .filter(npc => {
        const haystack = `${npc.id} ${npc.name} ${npc.sheetAssetId} ${(npc.tags ?? []).join(" ")}`.toLowerCase();
        return !q || haystack.includes(q);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, refreshToken]);

  function selectNpc(npc: GlobalNpcPrefab) {
    writeSelectedGlobalNpcId(npc.id);
    setSelectedId(npc.id);
    onSelect(npc);
  }

  return (
    <div style={panelStyle}>
      <div style={titleStyle}>Global NPCs</div>
      <div style={subtitleStyle}>
        Select a global NPC, then use Create NPC and click the map to drop it.
      </div>

      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search global NPCs..."
        style={inputStyle}
      />

      {npcs.length === 0 ? (
        <div style={emptyStyle}>No global NPCs yet. Open the builder above, create one, and use Test in Browser or paste it into NpcCatalog.ts.</div>
      ) : (
        <div style={gridStyle}>
          {npcs.map(npc => {
            const selected = npc.id === selectedId;

            return (
              <button
                key={npc.id}
                type="button"
                onClick={() => selectNpc(npc)}
                style={{
                  ...npcButtonStyle,
                  border: selected ? "4px solid #315f2a" : "2px solid #252018",
                  background: selected ? "#d8f0b0" : "#fff8c8",
                }}
              >
                <span style={previewStyle}>
                  <CharacterSheetRenderer
                    assetId={npc.sheetAssetId}
                    animation="idle"
                    facing={npc.facing ?? "down"}
                    pixelSize={1}
                    playing
                    showShadow={false}
                  />
                </span>
                <span style={textStackStyle}>
                  <span style={nameStyle}>{npc.name}</span>
                  <span style={metaStyle}>{npc.id}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {selectedId && (
        <button
          type="button"
          onClick={() => {
            writeSelectedGlobalNpcId("");
            setSelectedId("");
          }}
          style={clearButtonStyle}
        >
          Use ad hoc sheet instead
        </button>
      )}

      {selectedId && !npcs.some(npc => npc.id === selectedId) && (
        <button type="button" onClick={() => deleteGlobalNpc(selectedId)} style={clearButtonStyle}>
          Remove missing browser NPC
        </button>
      )}
    </div>
  );
}

const panelStyle: React.CSSProperties = { border: "3px solid #252018", background: "#f4e8b5", padding: 10, display: "grid", gap: 8, marginBottom: 12 };
const titleStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.35rem", lineHeight: 1, fontWeight: 900, color: "#252018" };
const subtitleStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.78rem", fontWeight: 900, color: "#584c35" };
const inputStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900 };
const emptyStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff3a8", padding: 10, fontWeight: 900, color: "#252018" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8, maxHeight: 220, overflow: "auto" };
const npcButtonStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8, padding: 7, color: "#252018", cursor: "pointer", textAlign: "left" };
const previewStyle: React.CSSProperties = { width: 52, height: 52, flexShrink: 0, display: "grid", placeItems: "center", background: "#d7c58d", border: "2px solid #252018", overflow: "hidden" };
const textStackStyle: React.CSSProperties = { display: "grid", gap: 2, minWidth: 0 };
const nameStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.05rem", lineHeight: 1 };
const metaStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem", fontWeight: 800, opacity: 0.62, overflowWrap: "anywhere" };
const clearButtonStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: "7px 10px", fontWeight: 900, cursor: "pointer", justifySelf: "start" };
