import React from "react";
import type { HeroAppearance } from "./heroAppearance";
import { getHeroOption, getHeroOptionColor } from "./heroAppearance";

export type HeroPose =
  | "frontIdle"
  | "frontWalk1"
  | "frontWalk2"
  | "backIdle"
  | "backWalk1"
  | "backWalk2"
  | "sideIdle"
  | "sideWalk1"
  | "sideWalk2";

export type HeroFacing = "up" | "down" | "left" | "right";

const WIDTH = 32;
const HEIGHT = 48;

type Pixel =
  | "."
  | "O"
  | "S"
  | "s"
  | "q"
  | "R"
  | "E"
  | "e"
  | "W"
  | "M"
  | "H"
  | "h"
  | "d"
  | "C"
  | "c"
  | "w"
  | "T"
  | "t"
  | "l"
  | "v"
  | "P"
  | "p"
  | "K"
  | "k";

type Layer = readonly string[];

function normalize(layer: readonly string[]): Layer {
  return Array.from({ length: HEIGHT }, (_, y) => (layer[y] ?? "").padEnd(WIDTH, ".").slice(0, WIDTH));
}

function blank(): string[][] {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
}

function merge(canvas: string[][], layer: Layer) {
  layer.forEach((row, y) => row.split("").forEach((pixel, x) => {
    if (pixel !== ".") canvas[y][x] = pixel;
  }));
}

function shift(layer: Layer, dx: number, dy: number): Layer {
  const result = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
  layer.forEach((row, y) => row.split("").forEach((pixel, x) => {
    if (pixel === ".") return;
    const nx = x + dx;
    const ny = y + dy;
    if (result[ny]?.[nx] !== undefined) result[ny][nx] = pixel;
  }));
  return result.map(row => row.join(""));
}

function mirror(layer: Layer): Layer {
  return layer.map(row => row.split("").reverse().join(""));
}

function shade(hex: string, amount: number) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const FRONT_BODY = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OOOOOOOO............",
"..........OOSSSSSSSSOO..........",
".........OSSSSSSSSSSSSO.........",
"........OSSSSSSSSSSSSSO........",
".......OSSSSSSSSSSSSSSSO.......",
".......OSSSSSSSSSSSSSSSO.......",
"......OSSSSSSSSSSSSSSSSSO......",
"......OSSSSSSSSSSSSSSSSSO......",
"......OSSSSSSSSSSSSSSSSSO......",
".......OSSSSSSSSSSSSSSSO.......",
".......OSSSSSSSSSSSSSSSO.......",
"........OSSSSSSSSSSSSSO........",
".........OSSSSSSSSSSSO.........",
"..........OSSSSSSSSSO..........",
"...........OSSSSSSSO...........",
"............OSSSSSO............",
".............OSSSO.............",
"................................",
"................................",
"................................",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
"......OSSO...............OSSO...",
".....OSSSO..............OSSSO...",
".....OSSSO..............OSSSO...",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
]);

const FRONT_FACE = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OOOO..OOOO..........",
"...........OEEE....EEEO.........",
"...........OEWE....EWEO.........",
"...........OEEE....EEEO.........",
"............OqO....OqO..........",
"................................",
"..........R.............R.......",
"..............MMMM..............",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
]);

const BACK_HEAD = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OOOOOOOO............",
"..........OOHHHHHHHHOO..........",
".........OHHHHHHHHHHHHO.........",
"........OHHHHHHHHHHHHHHO........",
".......OHHHHHHHHHHHHHHHHO.......",
".......OHHHHHHHHHHHHHHHHO.......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHHHHHHHHHHHHHHHHO......",
".......OHHHHHHHHHHHHHHHHO.......",
".......OHHHHHHHHHHHHHHHHO.......",
"........OHHHHHHHHHHHHHHO........",
".........OHHHHHHHHHHHHO.........",
"..........OHHHHHHHHHHO..........",
"...........OHHHHHHHHO...........",
"............OHHHHHHO............",
".............OHHHHO.............",
]);

const SIDE_BODY = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OOOOOOO.............",
"..........OOSSSSSSSO............",
".........OSSSSSSSSSSO...........",
"........OSSSSSSSSSSSSO..........",
".......OSSSSSSSSSSSSSO..........",
".......OSSSSSSSSSSSSSSO.........",
".......OSSSSSSSSSSSSSSO.........",
"........OSSSSSSSSSSSSSO.........",
"........OSSSSSSSSSSSSO..........",
".........OSSSSSSSSSSO...........",
"..........OSSSSSSSSO............",
"...........OSSSSSSO.............",
"............OSSSO...............",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"....................OSSO........",
"....................OSSO........",
"....................OSSO........",
"....................OSSO........",
"....................OSSO........",
"....................OSSO........",
"...................OSSSO........",
"...................OSSSO........",
]);

const SIDE_FACE = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
".................OOOO...........",
".................OEEEO..........",
".................OEWEO..........",
".................OEEEO..........",
"..................OqO...........",
"................................",
".....................R..........",
"..................MMMM..........",
]);

const FRONT_HAIR_MESSY = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHHHOO.........",
"........OHHHHHHHHHHHHHHO........",
".......OHHHHHHHHHHHHHHHHO.......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHHHOOOOOOOOHHHHHO......",
".....OHHHHOO........OOHHHHO.....",
".....OHHHO............OHHHO.....",
".....OHHHO....H..H....OHHHO.....",
".....OHHH.....HH.HH.....HHHO....",
".....OHH......H...H......HHO....",
"................................",
]);

const FRONT_HAIR_SHORT = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHHHOO.........",
"........OHHHHHHHHHHHHHHO........",
".......OHHHHHHHHHHHHHHHHO.......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHOOOOOOOOOOOHHHHO......",
".....OHHOO...........OOHHO......",
".....OHHO.............OHHO......",
]);

const FRONT_HAIR_SPIKY = normalize([
"................................",
".............H..................",
".........H..HHH...H.............",
"........HHHHHHHHHHHH............",
".......OHHHHHHHHHHHHO...........",
"......OHHHHHHHHHHHHHHO..........",
".....OHHHHHHHHHHHHHHHHO.........",
".....OHHHHOOOOOOOOHHHHHO........",
".....OHHOO........OOHHHO........",
".....OHH.....H.H.....HHH........",
".....OH......H.HH......H........",
]);

const FRONT_HAIR_SWEPT = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHHHOO.........",
"........OHHHHHHHHHHHHHHO........",
".......OHHHHHHHHHHHHHHHHO.......",
"......OHHHHHHHHHHHHHHHHHHO......",
"......OHHHHHHHHHHHHHHHHHHO......",
".....OHHHHHHHHOOOOOOOHHHHO......",
".....OHHHOOOOO.......OHHHO......",
".....OHH.......HHHHHHHHHHO......",
".....OH.........HHHHHHHHO.......",
]);

const SIDE_HAIR_MESSY = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHOO...........",
"........OHHHHHHHHHHHHO..........",
".......OHHHHHHHHHHHHHHO.........",
"......OHHHHHHHHHHHHHHHHO........",
"......OHHHHHOOOOOOHHHHHO........",
".....OHHHHOO......OHHHHHO.......",
".....OHHHO.........OHHHHHO......",
".....OHHH....HH.....OHHHHO......",
".....OHH.....HHH......HHHO......",
"......H......H.H.......HH.......",
]);

const SIDE_HAIR_SHORT = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHOO...........",
"........OHHHHHHHHHHHHO..........",
".......OHHHHHHHHHHHHHHO.........",
"......OHHHHOOOOOOOHHHHHO........",
"......OHHOO.......OHHHHO........",
".....OHHHO.........OHHHO........",
]);

const SIDE_HAIR_SPIKY = normalize([
"................................",
".............H..................",
".........H..HHH...H.............",
"........HHHHHHHHHHHH............",
".......OHHHHHHHHHHHHO...........",
"......OHHHHHHHHHHHHHHO..........",
".....OHHHHHOOOOOOHHHHHO.........",
".....OHHHOO......OHHHHO.........",
".....OHH.....H.....HHHHO........",
"......H......HH......HH.........",
]);

const SIDE_HAIR_SWEPT = normalize([
"................................",
"................................",
"................................",
".........OOHHHHHHHHOO...........",
"........OHHHHHHHHHHHHO..........",
".......OHHHHHHHHHHHHHHO.........",
"......OHHHHHHHHHHHHHHHHO........",
"......OHHHHHOOOOOOHHHHHO........",
".....OHHHOO........HHHHHHO......",
".....OHH.....HHHHHHHHHHHO.......",
".....OH.......HHHHHHHHHO........",
]);

const HAT_CAP_FRONT = normalize([
"................................",
"................................",
"............OOOOOOO.............",
"..........OOCCCCCCCOO...........",
".........OCCCCCCCCCCCO..........",
"........OCCCCCCCCCCCCCO.........",
".......OCCCCCCCCCCCCCCCO........",
".........wwwwwwwwwww............",
"..................CCCCCCCO......",
"....................OOOOO.......",
]);

const HAT_CAP_SIDE = normalize([
"................................",
"................................",
"............OOOOOO..............",
"..........OOCCCCCCOO............",
".........OCCCCCCCCCCO...........",
"........OCCCCCCCCCCCCO..........",
"........OCCCCCCCCCCCCO..........",
".........wwwwwwww...............",
"..................CCCCCCCO......",
"....................OOOOO.......",
]);

const HAT_BEANIE_FRONT = normalize([
"................................",
"................................",
"............OOOOOOO.............",
"..........OOCCCCCCCOO...........",
".........OCCCCCCCCCCCO..........",
"........OCCCCCCCCCCCCCO.........",
".........OccccccccccO...........",
"..........OOOOOOOOOO............",
]);

const FRONT_SHIRT = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OSSSSSO............",
"...........OSSSSSSSO...........",
"..........OTTTTTTTTTO..........",
".........OTTTTTTTTTTTO.........",
"........OTTTTTTTTTTTTTO........",
"........OTTTTTTTTTTTTTO........",
".........OTTTTTTTTTTTO.........",
"..........OTTTTTTTTTO..........",
"..........OTTTTTTTTTO..........",
"...........OTTTTTTTO...........",
"............OTTTTTO............",
"................................",
"................................",
"................................",
]);

const SIDE_SHIRT = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"............OSSSO...............",
"...........OSSSSSO..............",
"..........OTTTTTTTO.............",
".........OTTTTTTTTTO............",
".........OTTTTTTTTTO............",
"..........OTTTTTTTO.............",
"..........OTTTTTTTO.............",
"...........OTTTTTO..............",
]);

const FRONT_PANTS = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"..........OPPPP..PPPPO..........",
"................................",
"................................",
]);

const SIDE_PANTS = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
"...........OPPPP.OPPPPO.........",
]);

const FRONT_SHOES = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"..........OKKKO..OKKKO..........",
".........OKKKKO..OKKKKO.........",
".........OKKKK....OKKKK.........",
"..........OOOO....OOOO..........",
]);

const SIDE_SHOES = normalize([
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"................................",
"...........OKKKO..OKKKKO........",
"..........OKKKKO..OKKKKKO.......",
"..........OKKKK....OKKKK........",
"...........OOOO....OOOO.........",
]);

function hairLayer(appearance: HeroAppearance, side: boolean) {
  const style = (getHeroOption("hair", appearance.hair) as { style?: string }).style ?? "messy";
  if (appearance.hair === "none") return normalize([]);
  if (side) {
    if (style === "short") return SIDE_HAIR_SHORT;
    if (style === "spiky") return SIDE_HAIR_SPIKY;
    if (style === "swept") return SIDE_HAIR_SWEPT;
    return SIDE_HAIR_MESSY;
  }
  if (style === "short") return FRONT_HAIR_SHORT;
  if (style === "spiky") return FRONT_HAIR_SPIKY;
  if (style === "swept") return FRONT_HAIR_SWEPT;
  return FRONT_HAIR_MESSY;
}

function hatLayer(appearance: HeroAppearance, side: boolean) {
  if (appearance.hat === "none") return normalize([]);
  if (appearance.hat === "dark-beanie") return HAT_BEANIE_FRONT;
  return side ? HAT_CAP_SIDE : HAT_CAP_FRONT;
}

function accessoryLayer(appearance: HeroAppearance, side: boolean) {
  if (appearance.sunglasses !== "none") {
    return side
      ? normalize(["","","","","","","","","",".................OOOOO..........",".................OEEEO..........",".................OEEEO.........."])
      : normalize(["","","","","","","","","","...........OOOO...OOOO..........","...........OEEO...OEEO..........","...........OEEOOOOOEEO.........."]);
  }

  if (appearance.facialHair === "mustache") {
    return side
      ? normalize(["","","","","","","","","","","","","","","","","...................MMM.........."])
      : normalize(["","","","","","","","","","","","","","","","","..............MMMM.............."]);
  }

  if (appearance.facialHair === "beard") {
    return side
      ? normalize(["","","","","","","","","","","","","","","","","..................MMMM.........","..................MMMM........."])
      : normalize(["","","","","","","","","","","","","","","","","............OMMMMMMMO...........",".............OMMMMOO............"]);
  }

  return normalize([]);
}

function poseParts(pose: HeroPose) {
  return {
    back: pose.startsWith("back"),
    side: pose.startsWith("side"),
    walk1: pose.endsWith("Walk1"),
    walk2: pose.endsWith("Walk2"),
  };
}

function buildSprite(appearance: HeroAppearance, pose: HeroPose) {
  const { back, side, walk1, walk2 } = poseParts(pose);
  const canvas = blank();

  const body = back ? BACK_HEAD : side ? SIDE_BODY : FRONT_BODY;
  const face = back ? normalize([]) : side ? SIDE_FACE : FRONT_FACE;
  const hair = back ? BACK_HEAD : hairLayer(appearance, side);
  const hat = hatLayer(appearance, side);
  const shirt = side ? SIDE_SHIRT : FRONT_SHIRT;
  const pants = side ? SIDE_PANTS : FRONT_PANTS;
  const shoes = side ? SIDE_SHOES : FRONT_SHOES;
  const acc = accessoryLayer(appearance, side);

  const legOffset = walk1 ? -1 : walk2 ? 1 : 0;
  const armOffset = walk1 ? 1 : walk2 ? -1 : 0;

  merge(canvas, body);
  merge(canvas, shirt);
  merge(canvas, shift(pants, 0, Math.abs(legOffset)));
  merge(canvas, shift(shoes, legOffset, Math.abs(legOffset)));
  merge(canvas, face);
  merge(canvas, hair);
  merge(canvas, hat);
  merge(canvas, acc);

  if (armOffset !== 0) {
    // Tiny pixel-map animation accents, not rectangle drawing.
    merge(canvas, normalize([
      "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
      armOffset > 0 ? ".....OSSO......................." : "........................OSSO....",
      armOffset > 0 ? ".....OSSO......................." : "........................OSSO....",
    ]));
  }

  return canvas;
}

function paletteFor(appearance: HeroAppearance): Record<Pixel, string> {
  const skin = getHeroOptionColor("skin", appearance.skin);
  const hair = getHeroOptionColor("hair", appearance.hair);
  const hat = getHeroOptionColor("hat", appearance.hat);
  const shirt = getHeroOptionColor("shirt", appearance.shirt);
  const pants = getHeroOptionColor("pants", appearance.pants);
  const shoes = getHeroOptionColor("shoes", appearance.shoes);

  return {
    ".": "transparent",
    O: "#1b1511",
    S: skin,
    s: shade(skin, -24),
    q: shade(skin, -42),
    R: "#d66d62",
    E: appearance.sunglasses === "none" ? "#120e0b" : "#111111",
    e: "#2c2119",
    W: "#fff8e8",
    M: "#1b1511",
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? shade(skin, 20) : shade(hair, 36),
    d: appearance.hair === "none" ? shade(skin, -20) : shade(hair, -40),
    C: appearance.hat === "none" ? "transparent" : hat,
    c: appearance.hat === "none" ? "transparent" : shade(hat, 40),
    w: "#fff8e8",
    T: shirt,
    t: shade(shirt, -38),
    l: shade(shirt, 42),
    v: shade(shirt, -58),
    P: pants,
    p: shade(pants, -34),
    K: shoes,
    k: shade(shoes, -24),
  };
}

export function heroPoseFor(
  facing: HeroFacing,
  isWalking: boolean,
  walkFrame = 0,
): HeroPose {
  const suffix = walkFrame % 2 === 0 ? "Walk1" : "Walk2";
  if (facing === "up") return isWalking ? (`back${suffix}` as HeroPose) : "backIdle";
  if (facing === "left" || facing === "right") return isWalking ? (`side${suffix}` as HeroPose) : "sideIdle";
  return isWalking ? (`front${suffix}` as HeroPose) : "frontIdle";
}

export function ProfessionalPixelHeroSprite({
  appearance,
  pose,
  pixelSize = 1,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const sprite = buildSprite(appearance, pose);
  const palette = paletteFor(appearance);

  return (
    <div
      style={{
        position: "relative",
        width: WIDTH * pixelSize,
        height: HEIGHT * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      {showShadow && (
        <div
          style={{
            position: "absolute",
            left: 8 * pixelSize,
            top: 44 * pixelSize,
            width: 16 * pixelSize,
            height: 3 * pixelSize,
            backgroundColor: "rgba(37,32,24,0.28)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${WIDTH}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${HEIGHT}, ${pixelSize}px)`,
        }}
      >
        {sprite.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${pose}-${x}-${y}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: palette[cell as Pixel],
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
