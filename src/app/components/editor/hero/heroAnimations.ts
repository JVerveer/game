export type WizardAnimationId =
  | "idle"
  | "idle2"
  | "walk"
  | "run"
  | "jump"
  | "attack1"
  | "attack2"
  | "attack3"
  | "hurt"
  | "dead";

export type WizardFacing = "up" | "down" | "left" | "right";

export type WizardAnimationDef = {
  id: WizardAnimationId;
  src: string;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  fps: number;
  loop: boolean;
  anchorX: number;
  anchorY: number;
  scale: number;
};

const ROOT = "/sprites/wizard";

export const WIZARD_ANIMATIONS: Record<WizardAnimationId, WizardAnimationDef> = {
  idle: {
    id: "idle",
    src: `${ROOT}/Idle.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 6,
    fps: 6,
    loop: true,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  idle2: {
    id: "idle2",
    src: `${ROOT}/Idle_2.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 5,
    fps: 6,
    loop: true,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  walk: {
    id: "walk",
    src: `${ROOT}/Walk.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 7,
    fps: 9,
    loop: true,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  run: {
    id: "run",
    src: `${ROOT}/Run.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 8,
    fps: 12,
    loop: true,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  jump: {
    id: "jump",
    src: `${ROOT}/Jump.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 11,
    fps: 10,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  attack1: {
    id: "attack1",
    src: `${ROOT}/Attack_1.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 10,
    fps: 13,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  attack2: {
    id: "attack2",
    src: `${ROOT}/Attack_2.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 4,
    fps: 13,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  attack3: {
    id: "attack3",
    src: `${ROOT}/Attack_3.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 7,
    fps: 13,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  hurt: {
    id: "hurt",
    src: `${ROOT}/Hurt.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 4,
    fps: 8,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
  dead: {
    id: "dead",
    src: `${ROOT}/Dead.png`,
    frameWidth: 128,
    frameHeight: 128,
    frames: 4,
    fps: 7,
    loop: false,
    anchorX: 64,
    anchorY: 100,
    scale: 1,
  },
};

export function wizardAnimationForState({
  moving,
  running = false,
  attacking = false,
  jumping = false,
  hurt = false,
  dead = false,
}: {
  moving: boolean;
  running?: boolean;
  attacking?: boolean;
  jumping?: boolean;
  hurt?: boolean;
  dead?: boolean;
}): WizardAnimationId {
  if (dead) return "dead";
  if (hurt) return "hurt";
  if (attacking) return "attack1";
  if (jumping) return "jump";
  if (running) return "run";
  if (moving) return "walk";
  return "idle";
}
