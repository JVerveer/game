import { useMemo, useState } from "react";
import { getBuildingAssets } from "../BuildingLibrary";
import { humanBuildingAssetLabel } from "../../../../assets/limezu/BuildingPlacementRuntime";

type BuildingAsset = ReturnType<typeof getBuildingAssets>[number];

const GROUPS = [
  "all",
  "wall",
  "roof",
  "door",
  "window",
  "sign",
  "garage",
  "garden",
  "office",
  "house",
  "post",
] as const;

function matchesGroup(asset: BuildingAsset, group: string) {
  if (group === "all") return true;
  const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
  return haystack.includes(group);
}

export function BuildingPartPalette({
  selectedAssetId,
  onSelectAsset,
}: {
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("all");
  const [visibleCount, setVisibleCount] = useState(90);

  const assets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return getBuildingAssets().filter(asset => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return matchesGroup(asset, group) && (!q || haystack.includes(q));
    });
  }, [group, query]);

  return (
    <div style={panelStyle}>
      <div style={titleStyle}>Building Parts</div>

      <input
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          setVisibleCount(90);
        }}
        placeholder="Search parts..."
        style={inputStyle}
      />

      <select
        value={group}
        onChange={event => {
          setGroup(event.target.value as (typeof GROUPS)[number]);
          setVisibleCount(90);
        }}
        style={inputStyle}
      >
        {GROUPS.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <div style={gridStyle}>
        {assets.slice(0, visibleCount).map(asset => {
          const selected = selectedAssetId === asset.id;

          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onSelectAsset(asset.id)}
              title={asset.source}
              style={{
                ...assetButtonStyle,
                border: selected ? "4px solid #315f2a" : "2px solid #252018",
                background: selected ? "#d8f0b0" : "#fff8c8",
              }}
            >
              <span style={assetPreviewStyle}>
                <img
                  src={asset.src}
                  alt=""
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    imageRendering: "pixelated",
                  }}
                />
              </span>
              <span style={assetLabelStyle}>{humanBuildingAssetLabel(asset.label)}</span>
            </button>
          );
        })}
      </div>

      {visibleCount < assets.length && (
        <button type="button" onClick={() => setVisibleCount(count => count + 90)} style={loadButtonStyle}>
          Load more ({visibleCount} / {assets.length})
        </button>
      )}
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  border: "3px solid #252018",
  background: "#f4e8b5",
  padding: 10,
  display: "grid",
  gap: 8,
  minWidth: 250,
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'VT323', monospace",
  fontSize: "1.35rem",
  color: "#252018",
  lineHeight: 1,
};

const inputStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  padding: 8,
  fontWeight: 900,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
  gap: 7,
  maxHeight: "60vh",
  overflow: "auto",
  paddingRight: 4,
};

const assetButtonStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  justifyItems: "center",
  padding: 6,
  color: "#252018",
  cursor: "pointer",
};

const assetPreviewStyle: React.CSSProperties = {
  width: 54,
  height: 54,
  display: "grid",
  placeItems: "center",
  background: "#d7c58d",
  border: "2px solid #252018",
  overflow: "hidden",
};

const assetLabelStyle: React.CSSProperties = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "0.62rem",
  fontWeight: 900,
  lineHeight: 1,
  textAlign: "center",
  maxHeight: 32,
  overflow: "hidden",
};

const loadButtonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: 8,
  fontWeight: 900,
  cursor: "pointer",
};
