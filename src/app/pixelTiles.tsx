import type { CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";

const TILESET_URL = "/tilesets/satiria.png";
const TILE_SIZE = 48;
const ATLAS_COLS = 8;

const ATLAS: Record<string, number> = {
  grass: 0,
  path: 1,
  tallGrass: 2,
  water: 3,
  shore: 4,
  tree: 5,
  fence: 6,
  flower: 7,
  redRoof: 8,
  blueRoof: 9,
  purpleRoof: 10,
  greenRoof: 11,
  wall: 12,
  door: 13,
  window: 14,
  plaza: 16,
  pier: 17,
  bench: 18,
  lamp: 19,
  statue: 20,
  fountain: 21,
  sign: 22,
  save: 23,
  grassAlt: 24,
  mediumTree: 32,
  largeTree: 34,
  tallGrassAlt: 28,
  treeAlt: 29,
};

const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const hashTile = (x: number, y: number) => Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);

const spriteStyle = (name: string, x: number, y: number, w = 1, h = 1): CSSProperties => {
  const index = ATLAS[name] ?? ATLAS.grass;
  const ax = index % ATLAS_COLS;
  const ay = Math.floor(index / ATLAS_COLS);
  return {
    left: x * TILE_SIZE,
    top: y * TILE_SIZE,
    width: w * TILE_SIZE,
    height: h * TILE_SIZE,
    backgroundImage: `url(${TILESET_URL})`,
    backgroundPosition: `-${ax * TILE_SIZE}px -${ay * TILE_SIZE}px`,
    backgroundSize: `${ATLAS_COLS * TILE_SIZE}px auto`,
  };
};

const terrainSpriteFor = (rows: string[][], x: number, y: number) => {
  const tile = rows[y]?.[x] ?? "G";
  const roll = hashTile(x, y);

  if (tile === "G") return roll > 76 ? "grassAlt" : "grass";

  // Walk/path-style terrain
  if (tile === "R" || tile === "O" || tile === "V" || tile === "Q" || tile === "N") return "path";

  // Supported tileset sprites
  if (tile === "J") return "pier";
  if (tile === "E") return "plaza";
  if (tile === "W") return "water";
  if (tile === "S") return "shore";
  if (tile === "X") return roll > 55 ? "tallGrassAlt" : "tallGrass";
  if (tile === "T") return roll > 67 ? "treeAlt" : "tree";
  if (tile === "F") return "fence";
  if (tile === "L" || tile === "Y") return "flower";

  // Fallbacks for terrain that does not have unique sprites in satiria.png yet.
  if (tile === "M") return roll > 50 ? "largeTree" : "mediumTree";
  if (tile === "C" || tile === "D") return "plaza";

  // Building tiles use normal ground underneath the generated building sprite.
  if (BUILDING_TILES.has(tile)) return roll > 82 ? "grassAlt" : "grass";

  return roll > 76 ? "grassAlt" : "grass";
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
  if (tile === "R" || tile === "O" || tile === "V" || tile === "E" || tile === "Q" || tile === "N") {
    return `pixel-ground-road ${edgeMaskFor(rows, x, y, "road")}`;
  }
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
      {rows.map((row, y) => row.map((_, x) => (
        <i
          key={`ground-${x}-${y}`}
          className={`pixel-sprite-tile ${groundClassFor(rows, x, y)}`}
          style={spriteStyle(terrainSpriteFor(rows, x, y), x, y)}
        />
      )))}

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
