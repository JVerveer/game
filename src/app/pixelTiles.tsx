import type { CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";

const TILESET_URL = "/assets/limezu/world/terrain/modern_exteriors_complete_48x48.png";
const TILE_SIZE = 48;

const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const hashTile = (x: number, y: number) =>
  Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);

const atlasTileStyle = (
  col: number,
  row: number,
  x: number,
  y: number,
  w = 1,
  h = 1,
): CSSProperties => ({
  left: x * TILE_SIZE,
  top: y * TILE_SIZE,
  width: w * TILE_SIZE,
  height: h * TILE_SIZE,
  backgroundImage: `url(${TILESET_URL})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`,
  imageRendering: "pixelated",
});

const spriteCoordFor = (name: string, x: number, y: number) => {
  const roll = hashTile(x, y);

  switch (name) {
    case "grass":
      return { col: roll > 76 ? 1 : 0, row: 0 };
    case "grassAlt":
      return { col: 1, row: 0 };
    case "path":
      return { col: roll > 60 ? 3 : 2, row: 0 };
    case "tallGrass":
      return { col: roll > 55 ? 1 : 0, row: 0 };
    case "tallGrassAlt":
      return { col: 1, row: 0 };
    case "water":
      return { col: roll > 50 ? 5 : 4, row: 0 };
    case "shore":
      return { col: 5, row: 0 };
    case "tree":
      return { col: roll > 67 ? 1 : 0, row: 8 };
    case "treeAlt":
      return { col: 1, row: 8 };
    case "mediumTree":
      return { col: 0, row: 8 };
    case "largeTree":
      return { col: 1, row: 8 };
    case "fence":
      return { col: 4, row: 8 };
    case "flower":
      return { col: 6, row: 0 };
    case "plaza":
      return { col: roll > 50 ? 4 : 3, row: 0 };
    case "pier":
      return { col: 10, row: 0 };
    case "bench":
      return { col: 7, row: 8 };
    case "lamp":
      return { col: 6, row: 8 };
    case "statue":
      return { col: 8, row: 8 };
    case "fountain":
      return { col: 9, row: 8 };
    case "sign":
      return { col: 5, row: 8 };
    case "save":
      return { col: 3, row: 0 };

    case "redRoof":
      return { col: 0, row: 12 };
    case "blueRoof":
      return { col: 1, row: 12 };
    case "purpleRoof":
      return { col: 2, row: 12 };
    case "greenRoof":
      return { col: 3, row: 12 };
    case "wall":
      return { col: 0, row: 13 };
    case "door":
      return { col: 1, row: 13 };
    case "window":
      return { col: 2, row: 13 };

    default:
      return { col: 0, row: 0 };
  }
};

const spriteStyle = (name: string, x: number, y: number, w = 1, h = 1): CSSProperties => {
  const coord = spriteCoordFor(name, x, y);
  return atlasTileStyle(coord.col, coord.row, x, y, w, h);
};

const terrainSpriteFor = (rows: string[][], x: number, y: number) => {
  const tile = rows[y]?.[x] ?? "G";
  const roll = hashTile(x, y);

  if (tile === "G") return roll > 76 ? "grassAlt" : "grass";
  if (tile === "R" || tile === "O" || tile === "V" || tile === "Q" || tile === "N") return "path";
  if (tile === "J") return "pier";
  if (tile === "E") return "plaza";
  if (tile === "W") return "water";
  if (tile === "S") return "shore";
  if (tile === "X") return roll > 55 ? "tallGrassAlt" : "tallGrass";
  if (tile === "T") return roll > 67 ? "treeAlt" : "tree";
  if (tile === "F") return "fence";
  if (tile === "L" || tile === "Y") return "grass";
  if (tile === "M") return roll > 50 ? "largeTree" : "mediumTree";
  if (tile === "C" || tile === "D") return "plaza";
  if (BUILDING_TILES.has(tile)) return roll > 82 ? "grassAlt" : "grass";

  return roll > 76 ? "grassAlt" : "grass";
};

const decorationStyleFor = (tile: string, x: number, y: number): CSSProperties | null => {
  const roll = hashTile(x, y);

  if (tile === "X") {
    return {
      ...spriteStyle(roll > 50 ? "tallGrassAlt" : "tallGrass", x, y),
      zIndex: 3,
      opacity: 0.95,
      pointerEvents: "none",
    };
  }

  if (tile === "Y" || tile === "L") {
    return {
      ...spriteStyle("flower", x, y),
      zIndex: 4,
      pointerEvents: "none",
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

const roofFor = (color: PixelBuildingColor) => `${color}Roof`;

const buildingTileFor = (building: PixelBuilding, xx: number, yy: number) => {
  if (yy < 2) return roofFor(building.color);
  return "wall";
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
            style={spriteStyle(buildingTileFor(building, xx, yy), xx, yy)}
          />
        )),
      )}
      <i className="pixel-sprite-tile pixel-building-door" style={spriteStyle("door", doorX, building.h - 1)} />
      {wallRows.flatMap((yy) => {
        const isGroundFloor = yy === building.h - 1;
        return windowColumnsFor(building.w, doorX, isGroundFloor).map((xx) => (
          <i
            key={`window-${index}-${xx}-${yy}`}
            className="pixel-sprite-tile pixel-building-window"
            style={spriteStyle("window", xx, yy)}
          />
        ));
      })}
      {building.crest && <i className="pixel-sprite-tile pixel-building-sign" style={spriteStyle("sign", doorX, signY)} />}
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
        return (
          <span key={`ground-wrap-${x}-${y}`}>
            <i
              key={`ground-${x}-${y}`}
              className={`pixel-sprite-tile ${groundClassFor(rows, x, y)}`}
              style={spriteStyle(terrainSpriteFor(rows, x, y), x, y)}
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
          style={{ ...spriteStyle(object.sprite, object.x, object.y, object.w ?? 1, object.h ?? 1), zIndex: 35 + object.y }}
        />
      ))}
    </div>
  );
}
