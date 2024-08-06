import {
  PauseFill,
  PlayFill,
  SkipEndFill,
  SkipStartFill,
} from "react-bootstrap-icons";
import DevicePlayingIndicator from "./DevicePlayingIndicator";
import type { Mix } from "@util/sounds";
import DeviceScreen from "./DeviceScreen";

interface DeviceProps {
  currentMix: Mix | null;
  isPlaying: boolean;
  handleTogglePlaying: () => void;
  handlePreviousMix: () => void;
  handleNextMix: () => void;
  handleEdit: () => void;
  handleCreate: () => void;
}

const Device = ({
  currentMix,
  isPlaying,
  handleEdit,
  handleNextMix,
  handlePreviousMix,
  handleTogglePlaying,
  handleCreate,
}: DeviceProps) => {
  return (
    <main className="w-full mt-24 flex flex-col items-center justify-center p-3">
      {/* top piece */}
      <div className="w-full max-w-sm">
        {/* aux chord */}
        <AuxChord></AuxChord>

        <div
          className="relative z-40 flex items-center justify-between rounded-t-md rounded-b-sm transition-shadow p-4
                    w-full device-top-shading max-w-sm bg-cyan-950">
          {/* left side */}
          <div>
            <p className="font-semibold text-cyan-100/70 tracking-widest text-base select-none italic">
              FOCUS-O-MATIC
            </p>
            <p className="text-cyan-100/25 text-xs select-none">
              Ambience Generation Device
            </p>
          </div>

          {/* right side */}
          {/* playing indicator */}
          <DevicePlayingIndicator
            isPlaying={isPlaying}></DevicePlayingIndicator>
        </div>
      </div>

      {/* bottom piece */}
      <div
        className="text-xs text-zinc-50 rounded-b-md rounded-t-sm
                 transition-shadow p-4 w-full device-bottom-shading max-w-sm bg-cyan-900 z-50">
        {/* screen */}
        <DeviceScreen
          isPlaying={isPlaying}
          currentMix={currentMix}></DeviceScreen>

        {/* edit and create buttons */}
        <div className="mt-2.5 px-4 flex justify-between items-center">
          {/* edit */}
          <button
            onClick={handleEdit}
            className="device-button device-button-shading !py-1 !bg-cyan-950">
            <span>Edit</span>
          </button>

          {/* fill the space */}
          <div className="w-24 h-1.5 bg-cyan-950/30 rounded-full"></div>

          {/* create */}
          <button
            onClick={handleCreate}
            className="device-button device-button-shading !py-1 !bg-cyan-950">
            <span>Create</span>
          </button>
        </div>

        {/* middle buttons */}
        <div className="mt-3 flex items-center justify-center gap-2.5">
          {/* previous track */}
          <button
            onClick={handlePreviousMix}
            className="device-button device-button-shading !px-3 !py-3 flex items-center justify-center !min-w-0">
            <SkipStartFill className="w-6 h-6"></SkipStartFill>
          </button>

          {/* play / pause */}
          <button
            onClick={handleTogglePlaying}
            className="device-button device-button-shading !px-3 !py-3 flex items-center justify-center !min-w-0">
            <PlayFill className="w-6 h-6"></PlayFill>
            <PauseFill className="w-6 h-6"></PauseFill>
          </button>

          {/* next track */}
          <button
            onClick={handleNextMix}
            className="device-button device-button-shading !px-3 !py-3 flex items-center justify-center !min-w-0">
            <SkipEndFill className="w-6 h-6"></SkipEndFill>
          </button>
        </div>
      </div>
    </main>
  );
};

const AuxChord = () => {
  return (
    <div
      className="absolute z-10 transition-all aux-animation hover:-top-28 -top-11
                  right-[calc(50%-120px)] xs:right-[calc(50%-150px)]">
      <div className="w-2 h-24 bg-slate-600 mx-auto aux-shading"></div>
      <div className="w-4 h-14 bg-slate-600 rounded-sm mx-auto aux-shading"></div>
      <div className="w-3 h-3 bg-yellow-500 aux-shading rounded-b-sm mx-auto"></div>
      <div className="w-2 h-4 bg-yellow-500 aux-shading mx-auto"></div>
      <div className="w-2 h-[1.5px] bg-black mx-auto"></div>
      <div className="w-2 h-2.5 bg-yellow-500 aux-shading mx-auto"></div>
      <div className="w-2 h-[1.5px] bg-black mx-auto"></div>
      <div className="w-1.5 h-3 bg-yellow-500 aux-shading mx-auto rounded-b-lg"></div>
    </div>
  );
};

export default Device;
