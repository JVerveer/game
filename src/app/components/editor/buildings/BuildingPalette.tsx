import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const BUILDING_TYPES = [
  { kind: "house" as const, label: "House", defaultColor: "purple" as const, defaultW: 5, defaultH: 4, description: "Normal enterable house" },
  { kind: "shop" as const, label: "Shop", defaultColor: "green" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to shop interior" },
  { kind: "healing" as const, label: "Healing Center", defaultColor: "blue" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to healing center" },
  { kind: "station" as const, label: "Train Station", defaultColor: "red" as const, defaultW: 7, defaultH: 4, description: "Auto-opens train menu" },
  { kind: "hall" as const, label: "Hall / Institution", defaultColor: "purple" as const, defaultW: 6, defaultH: 5, description: "Large civic building" },
];

const BUILDING_COLORS = ["red", "blue", "purple", "green"] as const;

export function BuildingPalette({
  editorBuildingKind,
  setEditorBuildingKind,
  editorBuildingColor,
  setEditorBuildingColor,
  editorBuildingW,
  setEditorBuildingW,
  editorBuildingH,
  setEditorBuildingH,
}: {
  editorBuildingKind: EditorBuildingKind;
  setEditorBuildingKind: (kind: EditorBuildingKind) => void;
  editorBuildingColor: EditorBuildingColor;
  setEditorBuildingColor: (color: EditorBuildingColor) => void;
  editorBuildingW: number;
  setEditorBuildingW: (width: number) => void;
  editorBuildingH: number;
  setEditorBuildingH: (height: number) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 10 }}>
        {BUILDING_TYPES.map(building => (
          <button
            key={building.kind}
            type="button"
            onClick={() => {
              setEditorBuildingKind(building.kind);
              setEditorBuildingColor(building.defaultColor);
              setEditorBuildingW(building.defaultW);
              setEditorBuildingH(building.defaultH);
            }}
            title={building.description}
            style={{
              minHeight: 64,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "8px 10px",
              border: editorBuildingKind === building.kind ? "4px solid #315f2a" : "2px solid #252018",
              background: editorBuildingKind === building.kind ? "#d8f0b0" : "#fff8c8",
              color: "#252018",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ ...VT, fontSize: "1.2rem", lineHeight: 1 }}>{building.label}</span>
            <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.7 }}>
              {building.defaultW}×{building.defaultH} · {building.description}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, alignItems: "end" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Roof color</span>
          <select
            value={editorBuildingColor}
            onChange={(e) => setEditorBuildingColor(e.target.value as EditorBuildingColor)}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
          >
            {BUILDING_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
          </select>
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Width</span>
          <input
            type="number"
            min={3}
            max={14}
            value={editorBuildingW}
            onChange={(e) => setEditorBuildingW(Number(e.target.value))}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Height</span>
          <input
            type="number"
            min={3}
            max={10}
            value={editorBuildingH}
            onChange={(e) => setEditorBuildingH(Number(e.target.value))}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
          />
        </label>

        <div style={{ ...VT, fontSize: "1.05rem", color: "#252018" }}>
          Click a top-left tile to place. Door is created automatically. Use Select to edit, move, resize, duplicate, or delete buildings.
        </div>
      </div>
    </div>
  );
}
