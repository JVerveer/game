import type { CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";
import {
  OBJECT_IMAGES,
  TERRAIN_IMAGES,
  hashTile,
  terrainImageForTile,
} from "../rendering/TerrainRegistry";

const TILE_SIZE = 48;
const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const imageTileStyle = (src: string, x: number, y: number, w = 1, h = 1): CSSProperties => ({
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: w * TILE_SIZE,
  height: h * TILE_SIZE,
  backgroundImage: `url(${src})`,
  backgroundRepeat: w > 1 || h > 1 ? "repeat" : "no-repeat",
  backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
  imageRendering: "pixelated",
});

const terrainStyle = (tile: string, x: number, y: number): CSSProperties =>
  imageTileStyle(terrainImageForTile(tile, x, y), x, y);

const decorationStyleFor = (tile: string, x: number, y: number): CSSProperties | null => {
  if (tile === "Y" || tile === "L") {
    return {
      ...imageTileStyle(TERRAIN_IMAGES.flower, x, y),
      zIndex: 4,
      pointerEvents: "none",
    };
  }

  if (tile === "X") {
    return {
      ...imageTileStyle(TERRAIN_IMAGES.tallGrass, x, y),
      zIndex: 3,
      opacity: 0.86,
      pointerEvents: "none",
    };
  }

  if (tile === "F") {
    return {
      ...imageTileStyle(OBJECT_IMAGES.fence, x, y),
      zIndex: 5,
      pointerEvents: "none",
    };
  }

  if (tile === "T") {
    // A subtle bush/tree overlay on forest tiles, not every tile.
    if (hashTile(x, y) < 38) {
      return {
        ...imageTileStyle(OBJECT_IMAGES.bush, x, y),
        zIndex: 5,
        pointerEvents: "none",
      };
    }
  }

  return null;
};

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
  if (tile === "R" || tile === "O" || tile === "V" || tile === "E" || tile === "Q" || tile === "N") return `pixel-ground-road ${edgeMaskFor(rows, x, y, "road")}`;
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
    : [1, Math.max(1, Math.floor(buildingWidth / 2) - 2), Math.min(buildingWidth - 2, Math.floor(buildingWidth / 2) + 2), buildingWidth - 2];

  return Array.from(new Set(columns))
    .filter((x) => x > 0 && x < buildingWidth - 1)
    .filter((x) => !isGroundFloor || Math.abs(x - doorX) > 0);
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
            style={terrainStyle(buildingTileFor(building, yy), xx, yy)}
          />
        )),
      )}

      <i
        className="pixel-sprite-tile pixel-building-door"
        style={{
          ...terrainStyle("R", doorX, building.h - 1),
          filter: "brightness(0.55)",
        }}
      />

      {wallRows.flatMap((yy) => {
        const isGroundFloor = yy === building.h - 1;
        return windowColumnsFor(building.w, doorX, isGroundFloor).map((xx) => (
          <i
            key={`window-${index}-${xx}-${yy}`}
            className="pixel-sprite-tile pixel-building-window"
            style={{
              ...terrainStyle("W", xx, yy),
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

function objectImageFor(sprite: string) {
  const key = sprite.toLowerCase();

  if (key.includes("tree") || key.includes("windmill")) return OBJECT_IMAGES.tree;
  if (key.includes("rock")) return OBJECT_IMAGES.rock;
  if (key.includes("fence")) return OBJECT_IMAGES.fence;
  if (key.includes("sign")) return OBJECT_IMAGES.fence;
  if (key.includes("tulip") || key.includes("flower")) return TERRAIN_IMAGES.flower;

  return OBJECT_IMAGES.bush;
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
  return (
    <div className="pixel-tileset-scene" aria-hidden="true">
      {rows.map((row, y) => row.map((tileName, x) => {
        const decoration = decorationStyleFor(tileName, x, y);
        const groundTile = BUILDING_TILES.has(tileName) ? "G" : tileName;

        return (
          <span key={`ground-wrap-${x}-${y}`}>
            <i
              key={`ground-${x}-${y}`}
              className={`pixel-sprite-tile ${groundClassFor(rows, x, y)}`}
              style={terrainStyle(groundTile, x, y)}
            />
            {decoration && (
              <i
                key={`decor-${x}-${y}`}
                className="pixel-sprite-tile"
                style={decoration}
              />
            )}
          </span>
        );
      }))}

      {buildings.map((building, index) => (
        <PixelBuildingSprite key={`${building.kind}-${building.x}-${building.y}`} building={building} index={index} />
      ))}

      {objects.map((object, index) => (
        <i
          key={`${object.sprite}-${index}`}
          className={`pixel-sprite-object ${object.className ?? ""}`}
          style={{
            ...imageTileStyle(objectImageFor(object.sprite), object.x, object.y, object.w ?? 1, object.h ?? 1),
            zIndex: 35 + object.y,
          }}
        />
      ))}
    </div>
  );
}
