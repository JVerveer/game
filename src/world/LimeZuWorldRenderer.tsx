import type { CharacterAppearance } from "../editor/hero/characterTypes";
import { CharacterRenderer } from "../editor/hero/CharacterRenderer";
import { STARTER_EXTERIOR_WORLD_MAP } from "./worldAssets";
import type { WorldMap } from "./worldTypes";
import { ObjectLayer } from "./ObjectLayer";
import { TerrainLayer } from "./TerrainLayer";

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export function LimeZuWorldRenderer({
  map = STARTER_EXTERIOR_WORLD_MAP,
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

  // Safety fix:
  // If the old game position is outside the new LimeZu starter map,
  // the hero would render off-screen. Clamp it so the hero is always visible.
  const safeHeroPosition = {
    x: clamp(heroPosition.x, 0, map.width - 1),
    y: clamp(heroPosition.y, 0, map.height - 1),
  };

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
      <TerrainLayer map={map} />
      <ObjectLayer map={map} />

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
            zIndex: 1000 + npc.y,
            overflow: "visible",
          }}
          title={npc.name}
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
          left: safeHeroPosition.x * tileSize,
          top: safeHeroPosition.y * tileSize,
          width: tileSize,
          height: tileSize,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 9999,
          overflow: "visible",
          outline: "1px solid rgba(255,255,255,0.18)",
        }}
        title={`Hero ${safeHeroPosition.x}, ${safeHeroPosition.y}`}
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
