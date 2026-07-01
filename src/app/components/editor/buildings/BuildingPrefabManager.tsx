import { useMemo, useState } from "react";
import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import {
  applyBuildingPrefabToEditor,
  deleteBuildingPrefab,
  exportBuildingPrefabsTs,
  firstAssetMetaFromPrefab,
  readBuildingPrefabs,
  type BuildingPrefab,
} from "../../../assets/limezu/BuildingPrefabRuntime";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

function BuildingPrefabPreview({ prefab }: { prefab: BuildingPrefab }) {
  const asset = firstAssetMetaFromPrefab(prefab);

  return (
    <span style={{
      width: 70,
      height: 70,
      display: "grid",
      placeItems: "center",
      background: "#d7c58d",
      border: "2px solid #252018",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {asset ? (
        <img src={asset.src} alt="" style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          imageRendering: "pixelated",
        }} />
      ) : (
        <span style={{ ...VT, fontSize: "1.1rem" }}>{prefab.kind}</span>
      )}
    </span>
  );
}

export function BuildingPrefabManager({
  editorBuildingKind,
  editorBuildingColor,
  editorBuildingW,
  editorBuildingH,
  setEditorBuildingKind,
  setEditorBuildingColor,
  setEditorBuildingW,
  setEditorBuildingH,
}: {
  editorBuildingKind: EditorBuildingKind;
  editorBuildingColor: EditorBuildingColor;
  editorBuildingW: number;
  editorBuildingH: number;
  setEditorBuildingKind: (kind: EditorBuildingKind) => void;
  setEditorBuildingColor: (color: EditorBuildingColor) => void;
  setEditorBuildingW: (width: number) => void;
  setEditorBuildingH: (height: number) => void;
}) {
  void editorBuildingKind;
  void editorBuildingColor;
  void editorBuildingW;
  void editorBuildingH;

  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [exportText, setExportText] = useState("");

  const prefabs = useMemo(() => {
    void version;
    const q = query.trim().toLowerCase();

    return Object.values(readBuildingPrefabs())
      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
      .filter(prefab => {
        const haystack = `${prefab.name} ${prefab.kind} ${prefab.color} ${prefab.tags.join(" ")} ${prefab.assetId ?? ""}`.toLowerCase();
        return !q || haystack.includes(q);
      });
  }, [query, version]);

  function refresh() {
    setVersion(current => current + 1);
  }

  function usePrefab(prefab: BuildingPrefab) {
    applyBuildingPrefabToEditor({
      prefab,
      setEditorBuildingKind,
      setEditorBuildingColor,
      setEditorBuildingW,
      setEditorBuildingH,
    });
    refresh();
  }

  function removePrefab(prefabId: string) {
    deleteBuildingPrefab(prefabId);
    refresh();
  }

  async function exportPrefabs() {
    const text = exportBuildingPrefabsTs();
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  return (
    <div style={panelStyle}>
      <div style={topStyle}>
        <div>
          <div style={{ ...VT, fontSize: "1.35rem", color: "#252018", lineHeight: 1 }}>
            Building Prefabs
          </div>
          <div style={{ ...RJ, fontSize: "0.75rem", fontWeight: 800, color: "#584c35" }}>
            Reuse saved buildings across all maps.
          </div>
        </div>

        <button type="button" onClick={exportPrefabs} style={exportButtonStyle}>
          Export Prefabs
        </button>
      </div>

      <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search saved prefabs..." style={inputStyle} />

      {prefabs.length === 0 && (
        <div style={emptyStyle}>
          No prefabs saved yet. Select or configure a building, then use “Save Current as Prefab”.
        </div>
      )}

      <div style={gridStyle}>
        {prefabs.map(prefab => {
          const asset = firstAssetMetaFromPrefab(prefab);

          return (
            <div key={prefab.id} style={cardStyle}>
              <BuildingPrefabPreview prefab={prefab} />

              <div style={{ minWidth: 0 }}>
                <div style={{ ...VT, fontSize: "1.1rem", color: "#252018" }}>{prefab.name}</div>
                <div style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#584c35" }}>
                  {prefab.kind} · {prefab.color} · {prefab.width}×{prefab.height}
                </div>
                {asset && (
                  <div style={{ ...RJ, fontSize: "0.64rem", fontWeight: 800, color: "#584c35" }}>
                    {prefab.assetId ?? asset.id ?? "custom prefab"}
                  </div>
                )}
              </div>

              <div style={buttonRowStyle}>
                <button type="button" onClick={() => usePrefab(prefab)} style={smallButtonStyle}>
                  Use
                </button>
                <button type="button" onClick={() => removePrefab(prefab.id)} style={dangerButtonStyle}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {exportText && (
        <div style={exportPanelStyle}>
          <strong>Copied if browser allowed it. Keep this as your permanent prefab export.</strong>
          <textarea value={exportText} readOnly style={exportTextareaStyle} />
        </div>
      )}
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  border: "3px solid #252018",
  background: "#f4e8b5",
  padding: 10,
  marginBottom: 10,
  display: "grid",
  gap: 8,
};

const topStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

const inputStyle: React.CSSProperties = {
  padding: 8,
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  fontWeight: 800,
};

const emptyStyle: React.CSSProperties = {
  padding: 10,
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  fontWeight: 900,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 8,
  maxHeight: 260,
  overflow: "auto",
};

const cardStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 8,
  border: "2px solid #252018",
  background: "#fff8c8",
  padding: 8,
  alignItems: "center",
};

const buttonRowStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  display: "flex",
  gap: 6,
};

const smallButtonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "5px 8px",
  fontWeight: 900,
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  ...smallButtonStyle,
  background: "#ca4b36",
  color: "#fff8c8",
};

const exportButtonStyle: React.CSSProperties = {
  ...smallButtonStyle,
  background: "#315f2a",
  color: "#fff8c8",
};

const exportPanelStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  padding: 8,
  display: "grid",
  gap: 5,
};

const exportTextareaStyle: React.CSSProperties = {
  width: "100%",
  height: 150,
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  fontFamily: "monospace",
  fontSize: 12,
  boxSizing: "border-box",
};
