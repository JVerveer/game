import { BUILDING_ASSETS } from "../BuildingLibrary";
import {
  setBuildingCanvasTile,
  removeBuildingCanvasTile,
  tileAt,
  type BuildingCanvasDraft,
} from "../../../../assets/limezu/BuildingCanvasRuntime";

const TILE_SIZE = 48;

function assetFor(assetId: string | undefined) {
  return BUILDING_ASSETS.find(asset => asset.id === assetId);
}

export function BuildingCanvasGrid({
  draft,
  setDraft,
  pushHistory,
}: {
  draft: BuildingCanvasDraft;
  setDraft: (draft: BuildingCanvasDraft) => void;
  pushHistory: (draft: BuildingCanvasDraft) => void;
}) {
  function applyAt(x: number, y: number) {
    let next = draft;

    if (draft.tool === "picker") {
      const picked = tileAt(draft, x, y, draft.selectedLayer);
      if (picked?.assetId) {
        setDraft({ ...draft, selectedAssetId: picked.assetId, tool: "brush" });
      }
      return;
    }

    pushHistory(draft);

    if (draft.tool === "eraser") {
      next = removeBuildingCanvasTile(draft, x, y, draft.selectedLayer);
    } else if (draft.tool === "fill") {
      next = {
        ...draft,
        tiles: draft.tiles.filter(tile => tile.layer !== draft.selectedLayer),
      };

      for (let yy = 0; yy < draft.height; yy += 1) {
        for (let xx = 0; xx < draft.width; xx += 1) {
          next = setBuildingCanvasTile(next, {
            x: xx,
            y: yy,
            layer: draft.selectedLayer,
            assetId: draft.selectedAssetId,
          });
        }
      }
    } else if (draft.selectedLayer === "collision") {
      const current = tileAt(draft, x, y, "collision");
      if (current?.collision) {
        next = removeBuildingCanvasTile(draft, x, y, "collision");
      } else {
        next = setBuildingCanvasTile(draft, {
          x,
          y,
          layer: "collision",
          collision: true,
        });
      }
    } else if (draft.selectedAssetId) {
      next = setBuildingCanvasTile(draft, {
        x,
        y,
        layer: draft.selectedLayer,
        assetId: draft.selectedAssetId,
      });
    }

    setDraft(next);
  }

  const cells = [];

  for (let y = 0; y < draft.height; y += 1) {
    for (let x = 0; x < draft.width; x += 1) {
      const base = tileAt(draft, x, y, "base");
      const decor = tileAt(draft, x, y, "decor");
      const collision = tileAt(draft, x, y, "collision");
      const baseAsset = assetFor(base?.assetId);
      const decorAsset = assetFor(decor?.assetId);
      const isEntrance = draft.entrance.x === x && draft.entrance.y === y;

      cells.push(
        <button
          key={`${x}-${y}`}
          type="button"
          onClick={() => applyAt(x, y)}
          style={{
            position: "absolute",
            left: x * TILE_SIZE,
            top: y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            border: "1px solid rgba(37,32,24,0.45)",
            background: "rgba(255,248,200,0.65)",
            padding: 0,
            cursor: draft.tool === "picker" ? "crosshair" : "pointer",
          }}
          title={`${x},${y}`}
        >
          {baseAsset && (
            <i
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${baseAsset.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                imageRendering: "pixelated",
              }}
            />
          )}

          {decorAsset && (
            <i
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${decorAsset.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                imageRendering: "pixelated",
              }}
            />
          )}

          {collision?.collision && (
            <i
              style={{
                position: "absolute",
                inset: 4,
                background: "rgba(202,75,54,0.45)",
                border: "2px solid #ca4b36",
              }}
            />
          )}

          {isEntrance && (
            <span
              style={{
                position: "absolute",
                left: 3,
                right: 3,
                bottom: 3,
                background: "#315f2a",
                color: "#fff8c8",
                fontSize: 9,
                fontWeight: 900,
              }}
            >
              DOOR
            </span>
          )}
        </button>,
      );
    }
  }

  return (
    <div style={viewportStyle}>
      <div
        style={{
          position: "relative",
          width: draft.width * TILE_SIZE,
          height: draft.height * TILE_SIZE,
          backgroundColor: "#d7c58d",
          backgroundImage:
            "linear-gradient(45deg, rgba(37,32,24,.12) 25%, transparent 25%), linear-gradient(-45deg, rgba(37,32,24,.12) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(37,32,24,.12) 75%), linear-gradient(-45deg, transparent 75%, rgba(37,32,24,.12) 75%)",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
          backgroundSize: "16px 16px",
          imageRendering: "pixelated",
        }}
      >
        {cells}
      </div>
    </div>
  );
}

const viewportStyle: React.CSSProperties = {
  border: "4px solid #252018",
  background: "#584c35",
  padding: 12,
  overflow: "auto",
  maxHeight: "68vh",
};
