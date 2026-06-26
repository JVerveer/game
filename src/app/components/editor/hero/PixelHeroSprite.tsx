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

const WIDTH = 24;
const HEIGHT = 32;

function emptySprite() {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
}

function put(sprite: string[][], x: number, y: number, value: string) {
  if (sprite[y]?.[x] !== undefined) sprite[y][x] = value;
}

function rect(sprite: string[][], x: number, y: number, w: number, h: number, value: string) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      put(sprite, xx, yy, value);
    }
  }
}

function ellipse(sprite: string[][], cx: number, cy: number, rx: number, ry: number, value: string) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) put(sprite, x, y, value);
    }
  }
}

function outlineAround(sprite: string[][]) {
  const next = sprite.map(row => [...row]);
  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (sprite[y][x] === ".") continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (next[ny]?.[nx] === ".") next[ny][nx] = "O";
      }
    }
  }
  return next;
}

function drawBaseBody(pose: HeroPose) {
  const s = emptySprite();
  const isBack = pose.startsWith("back");
  const isSide = pose.startsWith("side");
  const isWalk = pose.endsWith("Walk");

  if (isSide) {
    rect(s, 10, 14, 6, 3, "S");
    ellipse(s, 12, 9, 5, 6, "S");
    rect(s, 16, 9, 2, 3, "S");

    rect(s, 8, 17, 9, 8, "T");
    rect(s, 14, 18, 3, 8, "s");
    rect(s, 14, 25, 3, 3, "S");

    rect(s, 9, 24, 4, isWalk ? 7 : 6, "P");
    rect(s, 14, 24, 4, isWalk ? 5 : 6, "P");
    rect(s, isWalk ? 7 : 8, 30, 6, 2, "K");
    rect(s, isWalk ? 15 : 14, isWalk ? 28 : 30, 6, 2, "K");
    return s;
  }

  rect(s, 10, 14, 4, 3, "S");
  ellipse(s, 11, 9, 6, 6, isBack ? "H" : "S");

  if (!isBack) {
    rect(s, 5, 9, 2, 4, "S");
    rect(s, 17, 9, 2, 4, "S");
  }

  rect(s, 7, 17, 10, 8, "T");

  const leftArmY = isWalk ? 18 : 17;
  const rightArmY = isWalk ? 17 : 17;
  rect(s, 4, leftArmY, 3, 8, isBack ? "T" : "S");
  rect(s, 17, rightArmY, 3, 8, isBack ? "T" : "S");

  if (!isBack) {
    rect(s, 4, leftArmY + 7, 3, 3, "S");
    rect(s, 17, rightArmY + 7, 3, 3, "S");
  }

  const leftLegH = isWalk ? 7 : 6;
  const rightLegH = isWalk ? 5 : 6;
  rect(s, 8, 24, 4, leftLegH, "P");
  rect(s, 13, 24, 4, rightLegH, "P");
  rect(s, isWalk ? 6 : 8, 30, 6, 2, "K");
  rect(s, isWalk ? 14 : 13, isWalk ? 28 : 30, 6, 2, "K");

  return s;
}

function drawHairAndFace(base: string[][], appearance: HeroAppearance, pose: HeroPose) {
  const s = base.map(row => [...row]);
  const isBack = pose.startsWith("back");
  const isSide = pose.startsWith("side");

  if (appearance.hair !== "none") {
    if (isSide) {
      rect(s, 7, 3, 9, 4, "H");
      rect(s, 6, 6, 4, 8, "H");
      rect(s, 14, 6, 4, 6, "H");
      put(s, 16, 8, "H");
      put(s, 15, 9, "H");
      put(s, 14, 10, "H");
    } else if (isBack) {
      rect(s, 5, 3, 13, 5, "H");
      rect(s, 5, 7, 13, 8, "H");
      rect(s, 7, 14, 9, 3, "H");
    } else {
      rect(s, 5, 3, 13, 4, "H");
      rect(s, 4, 7, 4, 7, "H");
      rect(s, 16, 7, 4, 7, "H");
      put(s, 7, 7, "H");
      put(s, 8, 8, "H");
      put(s, 9, 9, "H");
      put(s, 11, 7, "H");
      put(s, 11, 8, "H");
      put(s, 12, 9, "H");
      put(s, 14, 7, "H");
      put(s, 14, 8, "H");
      put(s, 13, 9, "H");
    }
  }

  if (!isBack) {
    if (appearance.sunglasses === "none") {
      if (isSide) {
        rect(s, 14, 9, 2, 3, "E");
        put(s, 14, 9, "W");
      } else {
        rect(s, 8, 9, 2, 3, "E");
        rect(s, 14, 9, 2, 3, "E");
        put(s, 8, 9, "W");
        put(s, 14, 9, "W");
      }
    } else {
      if (isSide) {
        rect(s, 13, 9, 4, 2, "E");
      } else {
        rect(s, 7, 9, 5, 2, "E");
        rect(s, 13, 9, 5, 2, "E");
        rect(s, 12, 10, 1, 1, "E");
      }
    }

    if (isSide) rect(s, 14, 13, 3, 1, "M");
    else rect(s, 9, 13, 6, 1, "M");

    if (appearance.facialHair === "mustache") {
      if (isSide) rect(s, 13, 12, 4, 1, "M");
      else rect(s, 8, 12, 8, 1, "M");
    }

    if (appearance.facialHair === "beard") {
      if (isSide) {
        rect(s, 13, 12, 4, 3, "M");
        rect(s, 12, 14, 3, 2, "M");
      } else {
        rect(s, 7, 12, 10, 3, "M");
        rect(s, 9, 14, 6, 2, "M");
      }
    }
  }

  if (appearance.hat !== "none") {
    if (isSide) {
      rect(s, 6, 2, 12, 3, "C");
      rect(s, 9, 0, 6, 3, "C");
      rect(s, 15, 5, 5, 1, "C");
    } else {
      rect(s, 4, 2, 16, 3, "C");
      rect(s, 8, 0, 8, 3, "C");
      if (!isBack) rect(s, 15, 5, 5, 1, "C");
    }
  }

  return s;
}

function buildSprite(pose: HeroPose, appearance: HeroAppearance) {
  const body = drawBaseBody(pose);
  const detailed = drawHairAndFace(body, appearance, pose);
  return outlineAround(detailed).map(row => row.join(""));
}

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
    s: shade(skin, -25),
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, -30),
    E: appearance.sunglasses === "none" ? EYE : "#111111",
    W: WHITE,
    M: OUTLINE,
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

export function PixelHeroSprite({
  appearance,
  pose,
  pixelSize = 4,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const palette = paletteFor(appearance);
  const sprite = buildSprite(pose, appearance);
  const width = WIDTH;
  const height = HEIGHT;

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
            left: 5 * pixelSize,
            top: (height - 2) * pixelSize,
            width: 14 * pixelSize,
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
