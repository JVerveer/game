import type { CharacterAppearance } from "../editor/hero/characterTypes";
import { CharacterRenderer } from "../editor/hero/CharacterRenderer";
import { STARTER_LIMEZU_WORLD_MAP } from "./worldAssets";
import type { WorldMap } from "./worldTypes";
import { WorldAtlasTile } from "./WorldAtlasTile";

export function LimeZuWorldRenderer({
  map = STARTER_LIMEZU_WORLD_MAP,
  heroAppearance,
  heroPosition,
  heroFacing,
  heroMoving,
}: {
  map?: WorldMap;
  heroAppearance: CharacterAppearance;
  heroPosition: { x: number; y: number };
  heroFacing: "up" | "down" | "left" | "right";
  heroMoving: boolean;
}) {
  const tileSize = map.tileSize;

  return (
    <div
      style={{
        position: "relative",
        width: map.width * tileSize,
        height: map.height * tileSize,
        imageRendering: "pixelated",
        overflow: "hidden",
        backgroundColor: "#6fa85f",
      }}
    >
      {map.terrain.map((row, y) =>
        row.split("").map((code, x) => {
          const tile = map.terrainLegend[code] ?? map.terrainLegend.G;
          return (
            <div
              key={`terrain-${x}-${y}`}
              style={{
                position: "absolute",
                left: x * tileSize,
                top: y * tileSize,
                width: tileSize,
                height: tileSize,
              }}
            >
              <WorldAtlasTile
                atlasId={tile.atlas}
                col={tile.col}
                row={tile.row}
                tileSize={tileSize}
              />
            </div>
          );
        }),
      )}

      {map.objects.map(object => (
        <div
          key={object.id}
          style={{
            position: "absolute",
            left: object.x * tileSize,
            top: object.y * tileSize,
            width: tileSize * (object.width ?? 1),
            height: tileSize * (object.height ?? 1),
            zIndex: object.z ?? 20 + object.y,
          }}
        >
          <WorldAtlasTile
            atlasId={object.atlas}
            col={object.col}
            row={object.row}
            tileSize={tileSize}
            width={object.width ?? 1}
            height={object.height ?? 1}
          />
        </div>
      ))}

      {map.npcs.map((npc, index) => (
        <div
          key={npc.id}
          style={{
            position: "absolute",
            left: npc.x * tileSize,
            top: npc.y * tileSize,
            width: tileSize,
            height: tileSize,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 100 + npc.y,
            overflow: "visible",
          }}
        >
          <CharacterRenderer
            appearance={{
              ...heroAppearance,
              hairColor: index % 2 === 0 ? "brown" : "black",
              outfitColor: index % 2 === 0 ? "green" : "blue",
            }}
            facing={npc.facing}
            animation="idle"
            pixelSize={1}
            showShadow
          />
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: heroPosition.x * tileSize,
          top: heroPosition.y * tileSize,
          width: tileSize,
          height: tileSize,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 200 + heroPosition.y,
          overflow: "visible",
        }}
      >
        <CharacterRenderer
          appearance={heroAppearance}
          facing={heroFacing}
          animation={heroMoving ? "walk" : "idle"}
          pixelSize={1}
          showShadow
        />
      </div>
    </div>
  );
}
