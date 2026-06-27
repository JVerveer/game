import type { CSSProperties } from "react";
import type { PixelBuilding, PixelObject, PixelBuildingColor } from "../data/cityMaps/sceneTypes";

const TILESET_URL = "/assets/limezu/world/terrain/modern_exteriors_complete_48x48.png";
const TILE_SIZE = 48;

// This file is intentionally easy to tune.
// Change only these coordinates until the terrain looks right.
const LIMEZU_TERRAIN = {
  grass: { col: 0, row: 0 },
  grassAlt: { col: 1, row: 0 },
  path: { col: 2, row: 0 },
  pathAlt: { col: 3, row: 0 },
  water: { col: 4, row: 0 },
  waterAlt: { col: 5, row: 0 },
  plaza: { col: 6, row: 0 },
  sand: { col: 7, row: 0 },
  tree: { col: 0, row: 8 },
  treeAlt: { col: 1, row: 8 },
  fence: { col: 4, row: 8 },
  flower: { col: 6, row: 8 },
  pier: { col: 10, row: 0 },
  mountain: { col: 9, row: 0 },
  cave: { col: 8, row: 0 },

  redRoof: { col: 0, row: 12 },
  blueRoof: { col: 1, row: 12 },
  purpleRoof: { col: 2, row: 12 },
  greenRoof: { col: 3, row: 12 },
  wall: { col: 0, row: 13 },
  door: { col: 1, row: 13 },
  window: { col: 2, row: 13 },
  bench: { col: 7, row: 8 },
  lamp: { col: 6, row: 8 },
  statue: { col: 8, row: 8 },
  fountain: { col: 9, row: 8 },
  sign: { col: 5, row: 8 },
  save: { col: 3, row: 0 },
} as const;

type LimeZuSpriteName = keyof typeof LIMEZU_TERRAIN;

const BUILDING_TILES = new Set(["A", "B", "H", "I", "P", "U"]);

const hashTile = (x: number, y: number) =>
  Math.abs((x * 928371 + y * 364479 + x * y * 97) % 100);

const spriteStyle = (name: LimeZuSpriteName, x: number, y: number, w = 1, h = 1): CSSProperties => {
  const coord = LIMEZU_TERRAIN[name] ?? LIMEZU_TERRAIN.grass;

  return {
    left: x * TILE_SIZE,
    top: y * TILE_SIZE,
    width: w * TILE_SIZE,
    height: h * TILE_SIZE,
    backgroundImage: `url(${TILESET_URL})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `-${coord.col * TILE_SIZE}px -${coord.row * TILE_SIZE}px`,
    imageRendering: "pixelated",
  };
};

const terrainSpriteFor = (rows: string[][], x: number, y: number): LimeZuSpriteName => {
  const tile = rows[y]?.[x] ?? "G";
  const roll = hashTile(x, y);

  if (tile === "G") return roll > 76 ? "grassAlt" : "grass";
  if (tile === "R" || tile === "O" || tile === "V" || tile === "Q" || tile === "N") return roll > 60 ? "pathAlt" : "path";
  if (tile === "J") return "pier";
  if (tile === "E") return "plaza";
  if (tile === "W") return roll > 50 ? "waterAlt" : "water";
  if (tile === "S") return "sand";
  if (tile === "X") return roll > 55 ? "grassAlt" : "grass";
  if (tile === "T") return roll > 67 ? "treeAlt" : "tree";
  if (tile === "F") return "fence";
  if (tile === "L" || tile === "Y") return "grass";
  if (tile === "M") return "mountain";
  if (tile === "C" || tile === "D") return "cave";
  if (BUILDING_TILES.has(tile)) return roll > 82 ? "grassAlt" : "grass";

  return roll > 76 ? "grassAlt" : "grass";
};

const decorationStyleFor = (tile: string, x: number, y: number): CSSProperties | null => {
  const roll = hashTile(x, y);

  if (tile === "X") {
    return {
      ...spriteStyle(roll > 50 ? "grassAlt" : "grass", x, y),
      zIndex: 3,
      opacity: 0.72,
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

const roofFor = (color: PixelBuildingColor): LimeZuSpriteName => `${color}Roof` as LimeZuSpriteName;

const buildingTileFor = (building: PixelBuilding, xx: number, yy: number): LimeZuSpriteName => {
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

export function LimeZuTerrainCoordinateDebug() {
  const entries = Object.entries(LIMEZU_TERRAIN);

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        top: 86,
        zIndex: 2000,
        width: 260,
        maxHeight: "70vh",
        overflow: "auto",
        backgroundColor: "rgba(15,20,22,0.96)",
        border: "2px solid rgba(255,255,255,0.18)",
        padding: 10,
        color: "#f7f0df",
        fontFamily: "monospace",
        fontSize: 11,
        pointerEvents: "auto",
      }}
    >
      <b>LimeZu terrain coords</b>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6, marginTop: 8 }}>
        {entries.map(([name, coord]) => (
          <div key={name} style={{ display: "grid", gap: 2 }}>
            <div
              style={{
                width: 48,
                height: 48,
                backgroundImage: `url(${TILESET_URL})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${coord.col * TILE_SIZE}px -${coord.row * TILE_SIZE}px`,
                imageRendering: "pixelated",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            />
            <span>{name}</span>
            <span>c{coord.col} r{coord.row}</span>
          </div>
        ))}
      </div>
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
          style={{ ...spriteStyle(object.sprite as LimeZuSpriteName, object.x, object.y, object.w ?? 1, object.h ?? 1), zIndex: 35 + object.y }}
        />
      ))}
    </div>
  );
}
