import { useEffect, useState, type CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";
import {
  TERRAIN_LIBRARY,
  terrainImageForCoord,
} from "../rendering/TerrainLibrary";
import {
  limeZuObjectAssetForCoord,
} from "../rendering/ObjectLibrary";

const TILE_SIZE = 48;
const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const hashTile = (x: number, y: number) =>
  Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);

function findTerrainByTags(tags: string[], fallbackIndex = 0) {
  const found = TERRAIN_LIBRARY.find(asset => {
    const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
    return tags.some(tag => haystack.includes(tag));
  });

  return found?.src ?? TERRAIN_LIBRARY[fallbackIndex % Math.max(1, TERRAIN_LIBRARY.length)]?.src ?? "";
}

function defaultTerrainImageForTile(tile: string, x: number, y: number) {
  const roll = hashTile(x, y);

  if (tile === "G") return findTerrainByTags(["grass"], roll);
  if (tile === "R" || tile === "O" || tile === "Q" || tile === "N") return findTerrainByTags(["dirt", "path", "road"], roll);
  if (tile === "V" || tile === "E") return findTerrainByTags(["sidewalk", "asphalt", "pavement"], roll);
  if (tile === "W") return findTerrainByTags(["water"], roll);
  if (tile === "S") return findTerrainByTags(["sand", "beach"], roll);
  if (tile === "X") return findTerrainByTags(["grass"], roll + 9);
  if (tile === "T") return findTerrainByTags(["grass"], roll + 15);
  if (tile === "Y" || tile === "L") return findTerrainByTags(["grass"], roll);
  if (tile === "F") return findTerrainByTags(["grass"], roll);
  if (tile === "J") return findTerrainByTags(["wood", "dock", "pier"], roll);
  if (tile === "M") return findTerrainByTags(["stone", "rock"], roll);
  if (tile === "C" || tile === "D") return findTerrainByTags(["asphalt", "stone", "sidewalk"], roll);
  if (BUILDING_TILES.has(tile)) return findTerrainByTags(["grass"], roll);

  return findTerrainByTags(["grass"], roll);
}

function terrainImage(tile: string, x: number, y: number) {
  return terrainImageForCoord(x, y) ?? defaultTerrainImageForTile(tile, x, y);
}

const tileStyle = (tile: string, x: number, y: number, w = 1, h = 1): CSSProperties => ({
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: w * TILE_SIZE,
  height: h * TILE_SIZE,
  backgroundImage: `url(${terrainImage(tile, x, y)})`,
  backgroundRepeat: w > 1 || h > 1 ? "repeat" : "no-repeat",
  backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
  imageRendering: "pixelated",
});

const objectStyle = (src: string, x: number, y: number, w = 1, h = 1): CSSProperties => ({
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

const edgeMaskFor = (rows: string[][], x: number, y: number, family: string) => {
  const t = rows[y]?.[x];
  const match = (nx: number, ny: number) => {
    const n = rows[ny]?.[nx];
    if (family === "road") return n === "R" || n === "O" || n === "V" || n === "E" || n === "Q" || n === "N";
    if (family === "water") return n === "W" || n === "S";
    return n === t;
  };

  return [
    !match(x, y - 1) ? "n" : "",
    !match(x + 1, y) ? "e" : "",
    !match(x, y + 1) ? "s" : "",
    !match(x - 1, y) ? "w" : "",
  ].filter(Boolean).join(" ");
};

const groundClassFor = (rows: string[][], x: number, y: number) => {
  const tile = rows[y]?.[x];

  if (tile === "R" || tile === "O" || tile === "V" || tile === "E" || tile === "Q" || tile === "N") {
    return `pixel-ground-road ${edgeMaskFor(rows, x, y, "road")}`;
  }

  if (tile === "J") return "pixel-ground-pier";
  if (tile === "W") return `pixel-ground-water ${edgeMaskFor(rows, x, y, "water")}`;
  if (tile === "S") return "pixel-ground-shore";
  if (tile === "X") return `pixel-ground-tall tall-phase-${hashTile(x, y) % 3}`;

  return "";
};

const roofTileFor = (color: PixelBuildingColor) => {
  if (color === "blue") return "E";
  if (color === "green") return "G";
  if (color === "red") return "R";
  return "E";
};

const buildingTileFor = (building: PixelBuilding, yy: number) => {
  if (yy < 2) return roofTileFor(building.color);
  return "E";
};

const windowColumnsFor = (buildingWidth: number, doorX: number, isGroundFloor: boolean) => {
  const columns = buildingWidth <= 5
    ? [doorX - 1, doorX + 1]
    : [
        1,
        Math.max(1, Math.floor(buildingWidth / 2) - 2),
        Math.min(buildingWidth - 2, Math.floor(buildingWidth / 2) + 2),
        buildingWidth - 2,
      ];

  return Array.from(new Set(columns))
    .filter(x => x > 0 && x < buildingWidth - 1)
    .filter(x => !isGroundFloor || Math.abs(x - doorX) > 0);
};

function PixelBuildingSprite({ building, index }: { building: PixelBuilding; index: number }) {
  const doorX = Math.floor(building.w / 2);
  const zIndex = 40 + building.y;
  const stories = Math.max(1, Math.min(5, building.h - 2));
  const wallRows = Array.from({ length: building.h - 2 }, (_, row) => row + 2);
  const signY = building.h > 3 ? 2 : 1;

  return (
    <div
      className={`pixel-tileset-building pixel-building-${building.kind}`}
      style={{
        left: building.x * TILE_SIZE,
        top: building.y * TILE_SIZE,
        width: building.w * TILE_SIZE,
        height: building.h * TILE_SIZE,
        zIndex,
      }}
    >
      {Array.from({ length: building.h }).map((_, yy) =>
        Array.from({ length: building.w }).map((__, xx) => (
          <i
            key={`b-${index}-${xx}-${yy}`}
            className="pixel-sprite-tile"
            style={tileStyle(buildingTileFor(building, yy), xx, yy)}
          />
        )),
      )}

      <i
        className="pixel-sprite-tile pixel-building-door"
        style={{
          ...tileStyle("R", doorX, building.h - 1),
          filter: "brightness(0.55)",
        }}
      />

      {wallRows.flatMap(yy => {
        const isGroundFloor = yy === building.h - 1;
        return windowColumnsFor(building.w, doorX, isGroundFloor).map(xx => (
          <i
            key={`window-${index}-${xx}-${yy}`}
            className="pixel-sprite-tile pixel-building-window"
            style={{
              ...tileStyle("W", xx, yy),
              filter: "brightness(1.25) saturate(0.7)",
            }}
          />
        ));
      })}

      {building.crest && (
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

      <span className="pixel-story-marker" aria-hidden="true">
        <b>{stories}F</b>
        {Array.from({ length: stories }).map((_, story) => (
          <i key={`story-${story}`} />
        ))}
      </span>
    </div>
  );
}

function useLimeZuPaintVersion() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const refresh = () => setVersion(current => current + 1);

    window.addEventListener("satiria:limezu-terrain-paint-changed", refresh);
    window.addEventListener("satiria:limezu-object-paint-changed", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("satiria:limezu-terrain-paint-changed", refresh);
      window.removeEventListener("satiria:limezu-object-paint-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return version;
}

export function PixelMapScene({
  rows,
  buildings,
  objects,
}: {
  rows: string[][];
  buildings: PixelBuilding[];
  objects: PixelObject[];
}) {
  // This is important:
  // terrain/object selections are stored in localStorage, so this component must
  // re-render when the editor paints a LimeZu tile/object.
  const limeZuPaintVersion = useLimeZuPaintVersion();
  void limeZuPaintVersion;

  return (
    <div className="pixel-tileset-scene" aria-hidden="true">
      {rows.map((row, y) =>
        row.map((tileName, x) => {
          const groundTile = BUILDING_TILES.has(tileName) ? "G" : tileName;
          const limeZuObject = limeZuObjectAssetForCoord(x, y);

          return (
            <span key={`ground-wrap-${x}-${y}`}>
              <i
                key={`ground-${x}-${y}`}
                className={`pixel-sprite-tile ${groundClassFor(rows, x, y)}`}
                style={tileStyle(groundTile, x, y)}
              />
              {limeZuObject && (
                <i
                  key={`limezu-object-${x}-${y}`}
                  className="pixel-sprite-object"
                  style={{
                    ...objectStyle(limeZuObject.src, x, y),
                    zIndex: 35 + y,
                  }}
                />
              )}
            </span>
          );
        }),
      )}

      {buildings.map((building, index) => (
        <PixelBuildingSprite
          key={`${building.kind}-${building.x}-${building.y}`}
          building={building}
          index={index}
        />
      ))}

      {objects.map((object, index) => {
        const limeZuObject = limeZuObjectAssetForCoord(object.x, object.y);

        if (!limeZuObject) return null;

        return (
          <i
            key={`${object.sprite}-${index}`}
            className={`pixel-sprite-object ${object.className ?? ""}`}
            style={{
              ...objectStyle(limeZuObject.src, object.x, object.y, object.w ?? 1, object.h ?? 1),
              zIndex: 35 + object.y,
            }}
          />
        );
      })}
    </div>
  );
}
