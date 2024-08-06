import { useEffect, useState } from "react";

interface DevicePlayingIndicatorProps {
  isPlaying: boolean;
}

// each bool represents whether the dot is filled or not
type DotsFrame = [boolean, boolean, boolean, boolean];

// animations frames. each frame runs for 0.2s
// startup animation does not loop.
// playing animation will loop while isPlaying.
const startupAnimation: DotsFrame[] = [
  [true, false, true, false],
  [false, true, false, true],
  [true, false, true, false],
  [false, true, false, true],
  [true, true, true, true],
  [true, true, true, false],
  [true, true, false, false],
  [true, false, false, false],
  [false, false, false, false],
];

const playingAnimation: DotsFrame[] = [
  [true, false, false, false],
  [true, true, false, false],
  [true, true, true, false],
  [true, true, true, true],
  [true, true, true, false],
  [true, true, false, false],
  [true, false, false, false],
  [false, false, false, false],
];

const DevicePlayingIndicator = ({ isPlaying }: DevicePlayingIndicatorProps) => {
  const [isPlayingStartupAnimation, setIsPlayingStartupAnimation] =
    useState(false);
  const [dotsFrame, setDotsFrame] = useState<DotsFrame>([
    false,
    false,
    false,
    false,
  ]);

  const resetDotsFrame = () => {
    setDotsFrame([false, false, false, false]);
  };

  /** @returns `cancelFunc` for cancelling the animation */
  const playAnimation = (
    frames: DotsFrame[],
    loops: boolean,
    callback?: (finishReason: "cancelled" | "done") => void
  ) => {
    let frameIndex = 0;
    let lastFrameTs = Date.now();
    let cancelled = false;

    const cancelFunc = () => {
      cancelled = true;
    };

    const tick = () => {
      let shouldRun = true;
      let finishReason: "cancelled" | "done" | null = null;

      if (cancelled) {
        finishReason = "cancelled";
        shouldRun = false;
      }

      if (!loops && frameIndex >= frames.length) {
        finishReason = "done";
        shouldRun = false;
      }

      if (shouldRun) {
        // loop index if necessary
        if (frameIndex >= frames.length) {
          frameIndex = 0;
        }

        const now = Date.now();
        const delta = now - lastFrameTs;

        if (delta >= 200) {
          lastFrameTs = now;
          setDotsFrame(frames[frameIndex]);

          // go to next frame
          frameIndex++;
        }

        requestAnimationFrame(tick);
      } else if (callback) {
        callback(finishReason!);
      }
    };

    // start animating
    tick();

    return cancelFunc;
  };

  useEffect(() => {
    // plays startup animation. does not loop. attaches callback.
    // returns cancel function for unmounting.
    setIsPlayingStartupAnimation(true);

    return playAnimation(startupAnimation, false, () => {
      setIsPlayingStartupAnimation(false);
    });
  }, []);

  useEffect(() => {
    if (!isPlayingStartupAnimation) {
      if (isPlaying) {
        // play playing animation
        return playAnimation(playingAnimation, true);
      } else {
        // reset dots frame
        resetDotsFrame();
      }
    }
  }, [isPlaying]);

  return (
    <div className="bg-zinc-900 border-black border-[3px] rounded-lg p-3 grid grid-cols-4 gap-1">
      {dotsFrame.map((filled, index) => (
        <div
          key={index}
          className={`w-1 h-1 ${
            filled ? "bg-white screen-dot-glow" : "bg-transparent"
          } rounded-full`}></div>
      ))}
    </div>
  );
};

export default DevicePlayingIndicator;
