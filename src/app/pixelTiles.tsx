import type { CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";
import {
  hashTile,
  terrainImageForTile,
} from "../rendering/limezuTerrainRegistry";

const TILE_SIZE = 48;

const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const terrainStyle = (tile: string, x: number, y: number): CSSProperties => ({
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: TILE_SIZE,
  height: TILE_SIZE,
  backgroundImage: `url(${terrainImageForTile(tile, x, y)})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
  imageRendering: "pixelated",
});

const objectStyle = (sprite: string, x: number, y: number, w = 1, h = 1): CSSProperties => {
  // Temporary fallback: object sprites still use terrain-like placeholders.
  // Next step will replace this with LimeZu object singles.
  const tile = sprite === "sign" ? "F" : sprite === "fountain" ? "W" : sprite === "flower" ? "Y" : "G";

  return {
    left: x * TILE_SIZE,
    top: y * TILE_SIZE,
    width: w * TILE_SIZE,
    height: h * TILE_SIZE,
    backgroundImage: `url(${terrainImageForTile(tile, x, y)})`,
    backgroundRepeat: "repeat",
    backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
    imageRendering: "pixelated",
  };
};

const decorationStyleFor = (tile: string, x: number, y: number): CSSProperties | null => {
  if (tile === "Y" || tile === "L") {
    return {
      ...terrainStyle("Y", x, y),
      zIndex: 4,
      pointerEvents: "none",
      opacity: 0.96,
    };
  }

  if (tile === "X") {
    return {
      ...terrainStyle("X", x, y),
      zIndex: 3,
      pointerEvents: "none",
      opacity: 0.78,
    };
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

const roofFor = (color: PixelBuildingColor) => {
  if (color === "blue") return "E";
  if (color === "green") return "G";
  if (color === "red") return "R";
  return "E";
};

const buildingTileFor = (building: PixelBuilding, xx: number, yy: number) => {
  if (yy < 2) return roofFor(building.color);
  return "E";
};

const buildingTileStyle = (tile: string, x: number, y: number): CSSProperties => ({
  ...terrainStyle(tile, x, y),
});

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
            style={buildingTileStyle(buildingTileFor(building, xx, yy), xx, yy)}
          />
        )),
      )}
      <i
        className="pixel-sprite-tile pixel-building-door"
        style={{
          ...buildingTileStyle("R", doorX, building.h - 1),
          filter: "brightness(0.65)",
        }}
      />
      {wallRows.flatMap((yy) => {
        const isGroundFloor = yy === building.h - 1;
        return windowColumnsFor(building.w, doorX, isGroundFloor).map((xx) => (
          <i
            key={`window-${index}-${xx}-${yy}`}
            className="pixel-sprite-tile pixel-building-window"
            style={{
              ...buildingTileStyle("W", xx, yy),
              filter: "brightness(1.25)",
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
          style={{ ...objectStyle(object.sprite, object.x, object.y, object.w ?? 1, object.h ?? 1), zIndex: 35 + object.y }}
        />
      ))}
    </div>
  );
}
