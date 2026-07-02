import { useEffect, useState, type CSSProperties } from "react";
import type {
  PixelBuilding,
  PixelObject,
  PixelBuildingColor,
} from "../data/cityMaps/sceneTypes";
import { objectClassFor } from "./mapRenderHelpers";
import {
  objectImageForCoordFast,
  terrainColorForTile,
  terrainImageForCoordFast,
} from "./assets/limezu/RuntimePaintMaps";
import {
  buildingAssetForBuilding,
  buildingPrefabForBuilding,
} from "./assets/limezu/BuildingPlacementRuntime";
import { effectiveBuildingPrefabFootprint } from "./assets/limezu/BuildingPrefabRuntime";

const TILE_SIZE = 48;

const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const hashTile = (x: number, y: number) =>
  Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);

function terrainImage(_tile: string, x: number, y: number) {
  return terrainImageForCoordFast(x, y);
}

const tileStyle = (
  tile: string,
  x: number,
  y: number,
  w = 1,
  h = 1,
): CSSProperties => ({
  position: "absolute",
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: w * TILE_SIZE,
  height: h * TILE_SIZE,
  backgroundImage: terrainImage(tile, x, y)
    ? `url(${terrainImage(tile, x, y)})`
    : undefined,
  backgroundColor: terrainImage(tile, x, y)
    ? undefined
    : terrainColorForTile(tile),
  backgroundRepeat: w > 1 || h > 1 ? "repeat" : "no-repeat",
  backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
  imageRendering: "pixelated",
});

const imageObjectStyle = (
  src: string,
  x: number,
  y: number,
  w = 1,
  h = 1,
): CSSProperties => ({
  position: "absolute",
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: w * TILE_SIZE,
  height: h * TILE_SIZE,
  backgroundImage: `url(${src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
  backgroundPosition: "center",
  imageRendering: "pixelated",
  pointerEvents: "none",
});

const legacyObjectWrapStyle = (x: number, y: number): CSSProperties => ({
  position: "absolute",
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: TILE_SIZE,
  height: TILE_SIZE,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 30 + y,
  pointerEvents: "none",
});

const edgeMaskFor = (
  rows: string[][],
  x: number,
  y: number,
  family: string,
) => {
  const t = rows[y]?.[x];
  const match = (nx: number, ny: number) => {
    const n = rows[ny]?.[nx];
    if (family === "road")
      return (
        n === "R" ||
        n === "O" ||
        n === "V" ||
        n === "E" ||
        n === "Q" ||
        n === "N"
      );
    if (family === "water") return n === "W" || n === "S";
    return n === t;
  };

  return [
    !match(x, y - 1) ? "n" : "",
    !match(x + 1, y) ? "e" : "",
    !match(x, y + 1) ? "s" : "",
    !match(x - 1, y) ? "w" : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const groundClassFor = (rows: string[][], x: number, y: number) => {
  const tile = rows[y]?.[x];

  if (
    tile === "R" ||
    tile === "O" ||
    tile === "V" ||
    tile === "E" ||
    tile === "Q" ||
    tile === "N"
  ) {
    return `pixel-ground-road ${edgeMaskFor(rows, x, y, "road")}`;
  }

  if (tile === "J") return "pixel-ground-pier";
  if (tile === "W")
    return `pixel-ground-water ${edgeMaskFor(rows, x, y, "water")}`;
  if (tile === "S") return "pixel-ground-shore";
  if (tile === "X") return `pixel-ground-tall tall-phase-${hashTile(x, y) % 3}`;

  return "";
};

const roofTileFor = (color: PixelBuildingColor) => {
  if (color === "blue") return "E";
  if (color === "green") return "G";
  if (color === "red" || color === "orange" || color === "yellow") return "R";
  return "E";
};

const buildingTileFor = (building: PixelBuilding, yy: number) => {
  if (yy < 2) return roofTileFor(building.color);
  return "E";
};

const windowColumnsFor = (
  buildingWidth: number,
  doorX: number,
  isGroundFloor: boolean,
) => {
  const columns =
    buildingWidth <= 5
      ? [doorX - 1, doorX + 1]
      : [
          1,
          Math.max(1, Math.floor(buildingWidth / 2) - 2),
          Math.min(buildingWidth - 2, Math.floor(buildingWidth / 2) + 2),
          buildingWidth - 2,
        ];

  return Array.from(new Set(columns))
    .filter((x) => x > 0 && x < buildingWidth - 1)
    .filter((x) => !isGroundFloor || Math.abs(x - doorX) > 0);
};

function RuntimeBuildingPrefabSprite({
  building,
}: {
  building: PixelBuilding & { id?: string };
}) {
  const prefab = buildingPrefabForBuilding({
    id: building.id,
    x: building.x,
    y: building.y,
  });

  if (!prefab) return null;

  const visibleTiles = prefab.tiles
    .filter((tile) => tile.layer !== "collision")
    .filter((tile) => tile.src)
    .sort((a, b) => {
      const layerOrder = (layer: string) => (layer === "base" ? 0 : layer === "decor" ? 1 : 2);
      return layerOrder(a.layer) - layerOrder(b.layer) || a.y - b.y || a.x - b.x;
    });
  const footprint = effectiveBuildingPrefabFootprint(prefab);
  const occupiedColumns = Array.from(new Set(visibleTiles.map((tile) => tile.x))).sort((a, b) => a - b);
  const occupiedRows = Array.from(new Set(visibleTiles.map((tile) => tile.y))).sort((a, b) => a - b);
  const columnIndex = new Map(occupiedColumns.map((x, index) => [x, index]));
  const rowIndex = new Map(occupiedRows.map((y, index) => [y, index]));
  const renderWidth = Math.max(1, occupiedColumns.length || footprint.width);
  const renderHeight = Math.max(1, occupiedRows.length || footprint.height);
  const scaleX = (building.w * TILE_SIZE) / renderWidth;
  const scaleY = (building.h * TILE_SIZE) / renderHeight;

  return (
    <div
      className="pixel-building-runtime-prefab"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9,
      }}
    >
      {visibleTiles
        .filter((tile) => tile.x >= footprint.minX && tile.x <= footprint.maxX && tile.y >= footprint.minY && tile.y <= footprint.maxY)
        .map((tile, index) => (
          <i
            key={`${tile.layer}-${tile.x}-${tile.y}-${index}`}
            style={{
              position: "absolute",
              left: (columnIndex.get(tile.x) ?? tile.x - footprint.minX) * scaleX,
              top: (rowIndex.get(tile.y) ?? tile.y - footprint.minY) * scaleY,
              width: scaleX,
              height: scaleY,
              backgroundImage: `url(${tile.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              imageRendering: "pixelated",
            }}
          />
        ))}
    </div>
  );
}
function RuntimeBuildingAssetSprite({
  building,
}: {
  building: PixelBuilding & { id?: string };
}) {
  const asset = buildingAssetForBuilding({
    id: building.id,
    x: building.x,
    y: building.y,
  });

  if (!asset?.src) return null;

  const assetWidth = asset.width ?? TILE_SIZE;
  const assetHeight = asset.height ?? TILE_SIZE;
  const scale = Math.min(
    (building.w * TILE_SIZE) / Math.max(1, assetWidth),
    (building.h * TILE_SIZE) / Math.max(1, assetHeight),
  );

  const displayWidth = Math.max(TILE_SIZE, assetWidth * scale);
  const displayHeight = Math.max(TILE_SIZE, assetHeight * scale);

  return (
    <i
      className="pixel-building-runtime-asset"
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        width: displayWidth,
        height: displayHeight,
        transform: "translateX(-50%)",
        backgroundImage: `url(${asset.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "contain",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 9,
      }}
    />
  );
}

function PixelBuildingSprite({
  building,
  index,
}: {
  building: PixelBuilding & { id?: string };
  index: number;
}) {
  const runtimePrefab = buildingPrefabForBuilding({
    id: building.id,
    x: building.x,
    y: building.y,
  });
  const runtimeAsset = runtimePrefab
    ? undefined
    : buildingAssetForBuilding({
        id: building.id,
        x: building.x,
        y: building.y,
      });

  const doorX = Math.floor(building.w / 2);
  const zIndex = 40 + building.y;
  const stories = Math.max(1, Math.min(5, building.h - 2));
  const wallRows = Array.from({ length: building.h - 2 }, (_, row) => row + 2);
  const signY = building.h > 3 ? 2 : 1;

  return (
    <div
      className={`pixel-tileset-building pixel-building-${building.kind}`}
      style={{
        position: "absolute",
        left: building.x * TILE_SIZE,
        top: building.y * TILE_SIZE,
        width: building.w * TILE_SIZE,
        height: building.h * TILE_SIZE,
        zIndex,
      }}
    >
      {!runtimeAsset &&
        !runtimePrefab &&
        Array.from({ length: building.h }).map((_, yy) =>
          Array.from({ length: building.w }).map((__, xx) => (
            <i
              key={`b-${index}-${xx}-${yy}`}
              className="pixel-sprite-tile"
              style={tileStyle(buildingTileFor(building, yy), xx, yy)}
            />
          )),
        )}

      {!runtimeAsset && !runtimePrefab && (
        <i
          className="pixel-sprite-tile pixel-building-door"
          style={{
            ...tileStyle("R", doorX, building.h - 1),
            filter: "brightness(0.55)",
          }}
        />
      )}

      {!runtimeAsset &&
        !runtimePrefab &&
        wallRows.flatMap((yy) => {
          const isGroundFloor = yy === building.h - 1;
          return windowColumnsFor(building.w, doorX, isGroundFloor).map(
            (xx) => (
              <i
                key={`window-${index}-${xx}-${yy}`}
                className="pixel-sprite-tile pixel-building-window"
                style={{
                  ...tileStyle("W", xx, yy),
                  filter: "brightness(1.25) saturate(0.7)",
                }}
              />
            ),
          );
        })}

      {!runtimeAsset && !runtimePrefab && building.crest && (
        <span
          className="pixel-building-crest"
          style={{
            left: doorX * TILE_SIZE,
            top: signY * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }}
        >
          {building.crest}
        </span>
      )}

      {runtimePrefab && <RuntimeBuildingPrefabSprite building={building} />}
      {runtimeAsset && <RuntimeBuildingAssetSprite building={building} />}

      {!runtimeAsset && !runtimePrefab && (
        <span className="pixel-story-marker" aria-hidden="true">
          <b>{stories}F</b>
          {Array.from({ length: stories }).map((_, story) => (
            <i key={`story-${story}`} />
          ))}
        </span>
      )}
    </div>
  );
}

function useLimeZuPaintVersion() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const refresh = () => setVersion((current) => current + 1);

    window.addEventListener("limezu:terrain-paint-changed", refresh);
    window.addEventListener("limezu:object-paint-changed", refresh);
    window.addEventListener("satiria:limezu-terrain-paint-changed", refresh);
    window.addEventListener("satiria:limezu-object-paint-changed", refresh);
    window.addEventListener("satiria:building-assets-changed", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("limezu:terrain-paint-changed", refresh);
      window.removeEventListener("limezu:object-paint-changed", refresh);
      window.removeEventListener(
        "satiria:limezu-terrain-paint-changed",
        refresh,
      );
      window.removeEventListener(
        "satiria:limezu-object-paint-changed",
        refresh,
      );
      window.removeEventListener("satiria:building-assets-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return version;
}

function TerrainLayer({ rows }: { rows: string[][] }) {
  return (
    <div
      className="pixel-layer pixel-layer-terrain"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      {rows.map((row, y) =>
        row.map((tileName, x) => {
          const groundTile = BUILDING_TILES.has(tileName) ? "G" : tileName;

          return (
            <i
              key={`terrain-${x}-${y}`}
              className={`pixel-sprite-tile ${groundClassFor(rows, x, y)}`}
              style={tileStyle(groundTile, x, y)}
            />
          );
        }),
      )}
    </div>
  );
}

function LegacyObjectLayer({
  legacyObjects,
}: {
  legacyObjects?: Record<string, string>;
}) {
  if (!legacyObjects) return null;

  return (
    <div
      className="pixel-layer pixel-layer-legacy-objects"
      style={{ position: "absolute", inset: 0, zIndex: 25 }}
    >
      {Object.entries(legacyObjects)
        .filter(([, objectId]) => objectId !== "NPC")
        .map(([coord, objectId]) => {
          const [x, y] = coord.split(",").map(Number);

          return (
            <div
              key={`legacy-object-${objectId}-${coord}`}
              style={legacyObjectWrapStyle(x, y)}
            >
              <div className={objectClassFor(objectId)} />
            </div>
          );
        })}
    </div>
  );
}

function RuntimeObjectLayer({ rows }: { rows: string[][] }) {
  return (
    <div
      className="pixel-layer pixel-layer-runtime-objects"
      style={{ position: "absolute", inset: 0, zIndex: 35 }}
    >
      {rows.flatMap((row, y) =>
        row.map((_tile, x) => {
          const objectSrc = objectImageForCoordFast(x, y);
          if (!objectSrc) return null;

          return (
            <i
              key={`runtime-object-${x}-${y}`}
              className="pixel-sprite-object"
              style={{
                ...imageObjectStyle(objectSrc, x, y),
                zIndex: 35 + y,
              }}
            />
          );
        }),
      )}
    </div>
  );
}

function SceneObjectLayer({ objects }: { objects: PixelObject[] }) {
  return (
    <div
      className="pixel-layer pixel-layer-scene-objects"
      style={{ position: "absolute", inset: 0, zIndex: 36 }}
    >
      {objects.map((object, index) => {
        const objectSrc = objectImageForCoordFast(object.x, object.y);
        if (objectSrc) return null;

        return (
          <div
            key={`scene-object-${object.sprite}-${index}`}
            className={`pixel-sprite-object ${object.className ?? ""}`}
            style={{
              ...legacyObjectWrapStyle(object.x, object.y),
              zIndex: 36 + object.y,
            }}
          >
            <div
              className={object.className ?? objectClassFor(object.sprite)}
            />
          </div>
        );
      })}
    </div>
  );
}

function BuildingLayer({
  buildings,
}: {
  buildings: (PixelBuilding & { id?: string })[];
}) {
  return (
    <div
      className="pixel-layer pixel-layer-buildings"
      style={{ position: "absolute", inset: 0, zIndex: 40 }}
    >
      {buildings.map((building, index) => (
        <PixelBuildingSprite
          key={`${building.kind}-${building.x}-${building.y}-${index}`}
          building={building}
          index={index}
        />
      ))}
    </div>
  );
}

export function PixelMapScene({
  rows,
  buildings,
  objects,
  legacyObjects,
}: {
  rows: string[][];
  buildings: (PixelBuilding & { id?: string })[];
  objects: PixelObject[];
  legacyObjects?: Record<string, string>;
}) {
  const limeZuPaintVersion = useLimeZuPaintVersion();
  void limeZuPaintVersion;

  return (
    <div
      className="pixel-tileset-scene"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: rows[0]?.length ? rows[0].length * TILE_SIZE : undefined,
        height: rows.length * TILE_SIZE,
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    >
      <TerrainLayer rows={rows} />
      <LegacyObjectLayer legacyObjects={legacyObjects} />
      <RuntimeObjectLayer rows={rows} />
      <SceneObjectLayer objects={objects} />
      <BuildingLayer buildings={buildings} />
    </div>
  );
}
