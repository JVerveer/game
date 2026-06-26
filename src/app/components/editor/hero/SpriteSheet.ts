import { useEffect, useState } from "react";
import type { WizardAnimationDef } from "./heroAnimations";

export function useSpriteFrame(animation: WizardAnimationDef) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(0);

    const frameMs = 1000 / animation.fps;
    const id = window.setInterval(() => {
      setFrame(current => {
        const next = current + 1;

        if (next >= animation.frames) {
          return animation.loop ? 0 : animation.frames - 1;
        }

        return next;
      });
    }, frameMs);

    return () => window.clearInterval(id);
  }, [animation.id, animation.fps, animation.frames, animation.loop]);

  return frame;
}
