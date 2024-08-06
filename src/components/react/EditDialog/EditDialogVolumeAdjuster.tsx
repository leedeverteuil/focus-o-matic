import type { Mix } from "@util/sounds";
import EditDialogMixSound from "./EditDialogMixSound";

interface EditDialogVolumeAdjusterProps {
  deleteSoundFromMix: (soundId: string) => void;
  mixCopy: Mix | null;
  updateVolume: (soundId: string, volume: number) => void;
}

export function EditDialogVolumeAdjuster({
  deleteSoundFromMix,
  mixCopy,
  updateVolume,
}: EditDialogVolumeAdjusterProps) {
  return (
    <>
      <p className="text-zinc-500 text-xs font-medium w-full py-1 mb-1">
        Adjust the volumes of each sound
      </p>

      {/* list out sounds in mix */}
      <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 w-full">
        {mixCopy?.soundsWithVolumes.map((swv) => (
          <EditDialogMixSound
            key={swv.soundId}
            soundId={swv.soundId}
            volume={swv.volume}
            handleUpdateVolume={(volume) => {
              updateVolume(swv.soundId, volume);
            }}
            handleDelete={() => {
              deleteSoundFromMix(swv.soundId);
            }}></EditDialogMixSound>
        ))}
      </ul>
    </>
  );
}
