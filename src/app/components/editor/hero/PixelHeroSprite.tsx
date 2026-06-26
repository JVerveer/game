import React from "react";
import type { HeroAppearance } from "./heroAppearance";
import { getHeroOptionColor } from "./heroAppearance";

export type HeroPose =
  | "frontIdle"
  | "frontWalk"
  | "backIdle"
  | "backWalk"
  | "sideIdle"
  | "sideWalk";

const OUTLINE = "#252018";
const EYE = "#14110f";
const WHITE = "#fffef0";
const SHADOW = "rgba(37,32,24,0.24)";

const SPRITES: Record<HeroPose, string[]> = {
  frontIdle: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "...OHHSSSSHHO...",
    "..OSSSSSSSSSO..",
    "..OSSESSSESSO..",
    "...OSSSSSSSO...",
    "....OSMMMMSO....",
    "....OTTTTTTO....",
    "...OTTTTTTTTO...",
    "...OSSTTTTSSO...",
    "....OPPPPPO....",
    "....OPP.OPPO....",
    "....OKK.OKKO....",
    "....OKK.OKKO....",
  ],
  frontWalk: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "...OHHSSSSHHO...",
    "..OSSSSSSSSSO..",
    "..OSSESSSESSO..",
    "...OSSSSSSSO...",
    "....OSMMMMSO....",
    "...OTTTTTTTTO...",
    "..OSSTTTTTSSO...",
    "....OTTTTTO.....",
    "...OPPP.OPPO....",
    "...OPP...OPPO...",
    "..OKK.....OKKO..",
    "..OKK......OKO..",
  ],
  backIdle: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "..OHHHHHHHHHHO..",
    "..OHHHHHHHHHHO..",
    "...OHHHHHHHO....",
    "....OHSSSSO.....",
    "....OSTTTTSO....",
    "....OTTTTTTO....",
    "...OTTTTTTTTO...",
    "...OSSTTTTSSO...",
    "....OPPPPPO....",
    "....OPP.OPPO....",
    "....OKK.OKKO....",
    "....OKK.OKKO....",
  ],
  backWalk: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "..OHHHHHHHHHHO..",
    "..OHHHHHHHHHHO..",
    "...OHHHHHHHO....",
    "....OHSSSSO.....",
    "...OSTTTTTTSO...",
    "...OTTTTTTTTO...",
    "..OSSTTTTTSSO...",
    "....OTTTTTO.....",
    "...OPPP.OPPO....",
    "...OPP...OPPO...",
    "..OKK.....OKKO..",
    "..OKK......OKO..",
  ],
  sideIdle: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "...OHHHSSSSO....",
    "...OHSSSSSSSO...",
    "...OSSSSESSSO...",
    "....OSSSSSSO....",
    ".....OSMMMSO....",
    "....OTTTTTTO....",
    "...OTTTTTTTTO...",
    ".....OSSTSSO....",
    "......OPPPPO....",
    "......OPPPO.....",
    ".....OKKKO......",
    ".....OKKKO......",
  ],
  sideWalk: [
    "................",
    ".....OOOOOO.....",
    "....OHHHHHHO....",
    "...OHHHHHHHHO...",
    "...OHHHSSSSO....",
    "...OHSSSSSSSO...",
    "...OSSSSESSSO...",
    "....OSSSSSSO....",
    ".....OSMMMSO....",
    "...OTTTTTTTTO...",
    "....OTTTTTTO....",
    ".....OSSTSSO....",
    ".....OPP.OPPO...",
    "....OPP...OPPO..",
    "...OKKO....OKO..",
    "...OKO..........",
  ],
};

function shade(hex: string, amount: number) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function paletteFor(appearance: HeroAppearance) {
  const skin = getHeroOptionColor("skin", appearance.skin);
  const hair = getHeroOptionColor("hair", appearance.hair);
  const hat = getHeroOptionColor("hat", appearance.hat);
  const shirt = getHeroOptionColor("shirt", appearance.shirt);
  const pants = getHeroOptionColor("pants", appearance.pants);
  const shoes = getHeroOptionColor("shoes", appearance.shoes);

  return {
    ".": "transparent",
    O: OUTLINE,
    S: skin,
    s: shade(skin, -28),
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, -30),
    E: appearance.sunglasses === "none" ? EYE : "#111111",
    W: WHITE,
    M: appearance.facialHair === "none" ? skin : OUTLINE,
    T: shirt,
    t: shade(shirt, -32),
    P: pants,
    p: shade(pants, -30),
    K: shoes,
    k: shade(shoes, -25),
    C: appearance.hat === "none" ? "transparent" : hat,
    c: appearance.hat === "none" ? "transparent" : shade(hat, -30),
  };
}

function applyAccessories(
  base: string[],
  appearance: HeroAppearance,
  pose: HeroPose,
) {
  const matrix = base.map(row => row.split(""));
  const isBack = pose.startsWith("back");
  const isSide = pose.startsWith("side");

  const set = (x: number, y: number, v: string) => {
    if (matrix[y]?.[x] !== undefined && matrix[y][x] !== ".") matrix[y][x] = v;
  };

  if (appearance.hat !== "none") {
    for (let x = 4; x <= 11; x++) set(x, 1, "C");
    for (let x = 5; x <= 10; x++) set(x, 0, "C");
    if (!isBack) {
      for (let x = isSide ? 9 : 10; x <= 13; x++) set(x, 2, "C");
    }
  }

  if (appearance.sunglasses !== "none" && !isBack) {
    if (isSide) {
      set(10, 6, "E");
      set(11, 6, "E");
    } else {
      set(6, 6, "E");
      set(7, 6, "E");
      set(9, 6, "E");
      set(10, 6, "E");
      set(8, 6, "E");
    }
  }

  if (appearance.facialHair === "mustache" && !isBack) {
    if (isSide) {
      set(10, 7, "M");
      set(11, 7, "M");
    } else {
      set(6, 7, "M");
      set(7, 7, "M");
      set(8, 7, "M");
      set(9, 7, "M");
    }
  }

  if (appearance.facialHair === "beard" && !isBack) {
    if (isSide) {
      set(9, 7, "M");
      set(10, 7, "M");
      set(10, 8, "M");
    } else {
      for (let x = 5; x <= 10; x++) set(x, 7, "M");
      for (let x = 6; x <= 9; x++) set(x, 8, "M");
    }
  }

  return matrix.map(row => row.join(""));
}

export function PixelHeroSprite({
  appearance,
  pose,
  pixelSize = 5,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const palette = paletteFor(appearance);
  const sprite = applyAccessories(SPRITES[pose], appearance, pose);
  const width = sprite[0].length;
  const height = sprite.length;

  return (
    <div
      style={{
        position: "relative",
        width: width * pixelSize,
        height: height * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      {showShadow && (
        <div
          style={{
            position: "absolute",
            left: 3 * pixelSize,
            top: (height - 1) * pixelSize,
            width: 10 * pixelSize,
            height: 2 * pixelSize,
            backgroundColor: SHADOW,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${width}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${height}, ${pixelSize}px)`,
        }}
      >
        {sprite.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const backgroundColor = palette[cell as keyof typeof palette] ?? "transparent";
            return (
              <div
                key={`${pose}-${x}-${y}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor,
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
