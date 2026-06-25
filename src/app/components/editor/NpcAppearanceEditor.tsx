import type { TownMapId } from "../../../data/maps";
import type { MovingNpc } from "../../../data/npcs";
import type { EditorNpcAsset } from "../../../data/cityMaps/mapAsset";
import { NPC_VISUAL_PRESETS } from "./editorConstants";

export function NpcAppearanceEditor({
  open,
  mapId,
  npcs,
  isTownMap,
  onClose,
  onCopyExport,
  onChangeNpcAppearance,
  VT,
  RJ,
}: {
  open: boolean;
  mapId: string;
  npcs: MovingNpc[];
  isTownMap: (id: string) => id is TownMapId;
  onClose: () => void;
  onCopyExport: () => void;
  onChangeNpcAppearance: (npcId: string, variant: number, style: string) => void;
  VT: React.CSSProperties;
  RJ: React.CSSProperties;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: "8vh 8vw",
        zIndex: 10020,
        background: "#fff8c8",
        border: "4px solid #252018",
        boxShadow: "10px 10px 0 rgba(0,0,0,0.28)",
        padding: 16,
        overflow: "auto",
        color: "#252018",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ ...VT, fontSize: "1.8rem", color: "#252018" }}>NPC Appearance Editor</div>
          <div style={{ ...RJ, fontSize: "0.9rem", color: "#66512c", fontWeight: 800 }}>
            Change NPC visuals here, then export overrides for npcs.ts / npc.ts.
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #252018", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
        >
          Close
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button
          type="button"
          onClick={onCopyExport}
          style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
        >
          Copy NPC Appearance Export
        </button>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {npcs
          .filter(npc => npc.mapId === mapId)
          .map(npc => (
            <div
              key={npc.id}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: 12,
                alignItems: "start",
                padding: 10,
                border: "2px solid #252018",
                background: "#fff3a8",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{
                  width: 52,
                  height: 52,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#d7c58d",
                  border: "2px solid #252018",
                  flexShrink: 0,
                }}>
                  <span className={`npc-sprite npc-variant-${npc.variant ?? 0} ${npc.style ?? ""}`} />
                </span>
                <div>
                  <div style={{ ...VT, fontSize: "1.1rem", lineHeight: 1 }}>{npc.name}</div>
                  <div style={{ ...RJ, fontSize: "0.68rem", fontWeight: 800, opacity: 0.7 }}>{npc.id}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, maxHeight: 180, overflow: "auto", paddingRight: 4 }}>
                {NPC_VISUAL_PRESETS.map(preset => {
                  const style = isTownMap(npc.mapId) ? `npc-town-${npc.mapId} npc-role-${preset.styleRole}` : `npc-role-${preset.styleRole}`;
                  const selected = npc.variant === preset.variant && npc.style === style;
                  return (
                    <button
                      key={`${npc.id}-${preset.id}`}
                      type="button"
                      onClick={() => onChangeNpcAppearance(npc.id, preset.variant, style)}
                      style={{
                        minHeight: 54,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "6px 7px",
                        border: selected ? "4px solid #315f2a" : "2px solid #252018",
                        background: selected ? "#d8f0b0" : "#fff8c8",
                        color: "#252018",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span style={{
                        width: 34,
                        height: 34,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#d7c58d",
                        border: "2px solid #252018",
                        flexShrink: 0,
                      }}>
                        <span className={`npc-sprite npc-variant-${preset.variant} ${style}`} />
                      </span>
                      <span style={{ ...VT, fontSize: "0.88rem", lineHeight: 1 }}>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
