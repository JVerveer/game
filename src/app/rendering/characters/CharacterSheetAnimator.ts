import { useEffect, useState } from "react";

export function useCharacterAnimationFrame({
  frames,
  enabled = true,
  frameDurationMs = 140,
}: {
  frames: number[];
  enabled?: boolean;
  frameDurationMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);

    if (!enabled || frames.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex(current => (current + 1) % frames.length);
    }, frameDurationMs);

    return () => window.clearInterval(id);
  }, [enabled, frameDurationMs, frames.join(",")]);

  return frames[index] ?? frames[0] ?? 0;
}
