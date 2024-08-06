import { getMixDescription, type Mix } from "@util/sounds";
import { useEffect, useRef } from "react";

interface DeviceScreenProps {
  isPlaying: boolean;
  currentMix: Mix | null;
}

const DeviceScreen = ({ currentMix, isPlaying }: DeviceScreenProps) => {
  const paraRef = useRef<HTMLParagraphElement>(null);

  const description = currentMix
    ? getMixDescription(currentMix)
    : "No description";

  // run animation when isPlaying
  useEffect(() => {
    if (isPlaying) {
      // determine how much para ref is cut off
      const scrollWidth = paraRef.current?.scrollWidth!;
      const clientWidth = paraRef.current?.clientWidth!;
      const cutoffPx = scrollWidth - clientWidth;

      let cancelled = false;
      let currentTranslateX = 0;
      let timeSpentOnMax = 0;
      let timeSpentOnMin = 0;
      let lastTs = 0;

      // animate
      const tick = (ts: number) => {
        // calc delta time
        const dt = ts - lastTs;
        lastTs = ts;

        // handle cancellation
        if (cancelled) return;

        // check if spent enough time on min
        if (timeSpentOnMin >= 1000) {
          // spent enough time on max, needs to reset back to 0 smoothly
          if (timeSpentOnMax >= 1000) {
            currentTranslateX = Math.min(
              0,
              currentTranslateX + 50 * (dt / 1000)
            );

            // made it back. reset timers
            if (currentTranslateX === 0) {
              timeSpentOnMax = 0;
              timeSpentOnMin = 0;
            }
          }
          // is on max, but hasn't spent enough time
          else if (currentTranslateX <= -cutoffPx) {
            timeSpentOnMax += dt;
          }
          // not on max yet, move towards max
          else {
            currentTranslateX = currentTranslateX - 50 * (dt / 1000);
          }
        }
        // not enough time on min
        else {
          timeSpentOnMin += dt;
        }

        // set translateX
        paraRef.current?.style.setProperty(
          "transform",
          `translateX(${currentTranslateX}px)`
        );

        // next tick
        requestAnimationFrame(tick);
      };

      tick(0);

      return () => (cancelled = true);
    } else {
      // reset para ref translate
      paraRef.current?.style.setProperty("transform", "translateX(0)");
    }

    // empty to silence ts
    return () => {};
  }, [isPlaying, currentMix]);

  return (
    <div className="py-4 px-5 bg-zinc-900 border-[3px] border-black rounded-md w-full overflow-clip">
      <p
        ref={paraRef}
        className={`font-screen text-4xl transition-shadow-colors text-nowrap whitespace-pre ${
          isPlaying ? "screen-text-glow text-white" : "text-zinc-600"
        }`}>
        {currentMix?.name ?? "Mix Not Found"}
        <span> - {description}</span>
      </p>
    </div>
  );
};

export default DeviceScreen;
