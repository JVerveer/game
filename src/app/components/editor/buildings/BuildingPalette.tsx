import { useMemo, useState } from "react";
import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import { BUILDING_ASSETS } from "./BuildingLibrary";
import { humanBuildingAssetLabel, readSelectedBuildingAssetId, writeSelectedBuildingAssetId } from "../../../assets/limezu/BuildingPlacementRuntime";
import { currentBuildingAssetIdForPrefab, makeBuildingPrefabId, upsertBuildingPrefab } from "../../../assets/limezu/BuildingPrefabRuntime";
import { BuildingPrefabManager } from "./BuildingPrefabManager";
import { BuildingCatalogBuilderButton } from "./BuildingCatalogBuilderButton";

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
const BUILDING_GROUPS = ["all", "house", "door", "roof", "window", "shop", "office", "garden", "garage", "post"] as const;

function assetMatchesGroup(asset: (typeof BUILDING_ASSETS)[number], group: string) {
  if (group === "all") return true;
  const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
  return haystack.includes(group);
}

function inferredFootprint(asset: (typeof BUILDING_ASSETS)[number]) {
  return {
    w: Math.max(1, Math.ceil(asset.width / 48)),
    h: Math.max(1, Math.ceil(asset.height / 48)),
  };
}

function BuildingAssetPreview({ asset }: { asset: (typeof BUILDING_ASSETS)[number] }) {
  return (
    <span style={{
      width: 64,
      height: 64,
      display: "grid",
      placeItems: "center",
      background: "#d7c58d",
      border: "2px solid #252018",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <img src={asset.src} alt="" loading="lazy" style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        imageRendering: "pixelated",
      }} />
    </span>
  );
}

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
  const [buildingSearch, setBuildingSearch] = useState("");
  const [buildingGroup, setBuildingGroup] = useState<(typeof BUILDING_GROUPS)[number]>("all");
  const [selectedAssetId, setSelectedAssetId] = useState(() => readSelectedBuildingAssetId());
  const [visibleCount, setVisibleCount] = useState(80);
  const [prefabName, setPrefabName] = useState("");

  const filteredAssets = useMemo(() => {
    const q = buildingSearch.trim().toLowerCase();

    return BUILDING_ASSETS.filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return assetMatchesGroup(asset, buildingGroup) && (!q || haystack.includes(q));
    });
  }, [buildingGroup, buildingSearch]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const selectedAsset = BUILDING_ASSETS.find(asset => asset.id === selectedAssetId);

  function selectRuntimeAsset(asset: (typeof BUILDING_ASSETS)[number]) {
    const footprint = inferredFootprint(asset);
    setSelectedAssetId(asset.id);
    writeSelectedBuildingAssetId(asset.id);

    const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
    const kind: EditorBuildingKind =
      haystack.includes("shop") ? "shop" :
      haystack.includes("office") || haystack.includes("post") ? "hall" :
      haystack.includes("garage") || haystack.includes("station") ? "station" :
      "house";

    setEditorBuildingKind(kind);
    setEditorBuildingW(Math.max(3, footprint.w));
    setEditorBuildingH(Math.max(3, footprint.h));

    if (kind === "shop") setEditorBuildingColor("green");
    else if (kind === "station") setEditorBuildingColor("red");
    else setEditorBuildingColor("purple");
  }

  function saveCurrentAsPrefab() {
    const assetId = currentBuildingAssetIdForPrefab();
    const asset = BUILDING_ASSETS.find(item => item.id === assetId);
    const name = prefabName.trim()
      || (asset ? humanBuildingAssetLabel(asset.label) : `${editorBuildingKind} ${editorBuildingW}x${editorBuildingH}`);

    upsertBuildingPrefab({
      id: makeBuildingPrefabId(name),
      name,
      kind: editorBuildingKind,
      color: editorBuildingColor,
      width: editorBuildingW,
      height: editorBuildingH,
      tiles: assetId
        ? [
            {
              x: 0,
              y: 0,
              layer: "base",
              assetId,
            },
          ]
        : [],
      tags: [editorBuildingKind, editorBuildingColor, asset?.tags?.[0] ?? ""].filter(Boolean),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      entrance: { x: Math.floor(editorBuildingW / 2), y: editorBuildingH - 1 },
    });

    setPrefabName("");
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <BuildingCatalogBuilderButton />
      <BuildingPrefabManager
        editorBuildingKind={editorBuildingKind}
        editorBuildingColor={editorBuildingColor}
        editorBuildingW={editorBuildingW}
        editorBuildingH={editorBuildingH}
        setEditorBuildingKind={setEditorBuildingKind}
        setEditorBuildingColor={setEditorBuildingColor}
        setEditorBuildingW={setEditorBuildingW}
        setEditorBuildingH={setEditorBuildingH}
      />

      <div style={{ border: "3px solid #252018", background: "#fff3a8", padding: 10, marginBottom: 10 }}>
        <div style={{ ...VT, fontSize: "1.25rem", color: "#252018", marginBottom: 6 }}>
          Save Current Building as Prefab
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1fr) auto", gap: 8 }}>
          <input
            value={prefabName}
            onChange={event => setPrefabName(event.target.value)}
            placeholder={selectedAsset ? humanBuildingAssetLabel(selectedAsset.label) : "Prefab name..."}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontWeight: 800 }}
          />

          <button
            type="button"
            onClick={saveCurrentAsPrefab}
            style={{ padding: "8px 12px", border: "2px solid #252018", background: "#315f2a", color: "#fff8c8", fontWeight: 900, cursor: "pointer" }}
          >
            Save Prefab
          </button>
        </div>

        <div style={{ ...RJ, fontSize: "0.72rem", color: "#584c35", fontWeight: 800, marginTop: 6 }}>
          Saves kind, color, size, selected LimeZu asset, entrance position, and tags globally.
        </div>
      </div>

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

      <div style={{ border: "3px solid #252018", background: "#f4e8b5", padding: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ ...VT, fontSize: "1.35rem", color: "#252018", lineHeight: 1 }}>LimeZu Building Assets</div>
            <div style={{ ...RJ, fontSize: "0.75rem", fontWeight: 800, color: "#584c35" }}>
              Select a real building sprite, then click the map to place it.
            </div>
          </div>

          {selectedAsset && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 420 }}>
              <BuildingAssetPreview asset={selectedAsset} />
              <div style={{ minWidth: 0 }}>
                <div style={{ ...VT, fontSize: "1.05rem", color: "#252018" }}>{humanBuildingAssetLabel(selectedAsset.label)}</div>
                <div style={{ ...RJ, fontSize: "0.68rem", fontWeight: 800, color: "#584c35" }}>
                  {selectedAsset.width}×{selectedAsset.height} · {selectedAsset.id}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(160px, 1fr) minmax(130px, 220px)", gap: 8, marginBottom: 8 }}>
          <input
            value={buildingSearch}
            onChange={(event) => { setBuildingSearch(event.target.value); setVisibleCount(80); }}
            placeholder="Search buildings, roof, door, garage..."
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontWeight: 800 }}
          />

          <select
            value={buildingGroup}
            onChange={(event) => { setBuildingGroup(event.target.value as (typeof BUILDING_GROUPS)[number]); setVisibleCount(80); }}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontWeight: 800 }}
          >
            {BUILDING_GROUPS.map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8, maxHeight: 340, overflow: "auto", paddingRight: 4 }}>
          {visibleAssets.map(asset => {
            const selected = asset.id === selectedAssetId;
            const footprint = inferredFootprint(asset);

            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => selectRuntimeAsset(asset)}
                title={asset.source}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  minHeight: 82,
                  border: selected ? "4px solid #315f2a" : "2px solid #252018",
                  background: selected ? "#d8f0b0" : "#fff8c8",
                  color: "#252018",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 7,
                }}
              >
                <BuildingAssetPreview asset={asset} />
                <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
                  <span style={{ ...VT, fontSize: "1rem", lineHeight: 1 }}>{humanBuildingAssetLabel(asset.label)}</span>
                  <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 800, opacity: 0.7 }}>
                    {asset.width}×{asset.height} · footprint {footprint.w}×{footprint.h}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {visibleCount < filteredAssets.length && (
          <button
            type="button"
            onClick={() => setVisibleCount(count => count + 80)}
            style={{ marginTop: 8, width: "100%", padding: 8, border: "2px solid #252018", background: "#fff3a8", color: "#252018", fontWeight: 900, cursor: "pointer" }}
          >
            Load more ({visibleCount} / {filteredAssets.length})
          </button>
        )}
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
            min={1}
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
            min={1}
            max={10}
            value={editorBuildingH}
            onChange={(e) => setEditorBuildingH(Number(e.target.value))}
            style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
          />
        </label>

        <div style={{ ...VT, fontSize: "1.05rem", color: "#252018" }}>
          Click a top-left tile to place. Saved prefabs can be reused across all maps.
        </div>
      </div>
    </div>
  );
}
