import { WORLD_ATLASES } from "./worldAssets";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

export function LimeZuWorldNotes() {
  return (
    <div
      style={{
        backgroundColor: "#151c1f",
        color: "#f7f0df",
        border: "1px solid rgba(255,255,255,0.12)",
        padding: 16,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ ...PX, fontSize: "0.6rem" }}>LIMEZU WORLD SYSTEM V1</div>
      <div style={{ ...RJ, fontWeight: 800 }}>
        Terrain, objects, buildings and NPCs now use the same atlas-cropping approach as the hero renderer.
      </div>
      <div style={{ ...RJ, fontWeight: 800, color: "#d8cba8" }}>
        Loaded atlases: terrain {WORLD_ATLASES.terrain.length}, objects {WORLD_ATLASES.objects.length}, buildings {WORLD_ATLASES.buildings.length}.
      </div>
    </div>
  );
}
