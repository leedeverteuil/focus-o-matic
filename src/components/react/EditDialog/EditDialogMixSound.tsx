import { getSound } from "@util/sounds";
import { MusicNoteBeamed, Trash } from "react-bootstrap-icons";

interface EditDialogMixSoundProps {
  soundId: string;
  volume: number;
  handleUpdateVolume: (volume: number) => void;
  handleDelete: () => void;
}

const EditDialogMixSound = ({
  soundId,
  volume,
  handleUpdateVolume,
  handleDelete,
}: EditDialogMixSoundProps) => {
  const sound = getSound(soundId);
  if (sound === null) return null;

  return (
    <li className="w-full px-3 py-2 border rounded-xl border-zinc-700 flex flex-col justify-between">
      {/* top bar */}
      <div className="flex items-start justify-between">
        {/* sound label */}
        <p className="text-zinc-50 text-sm font-semibold">
          {sound.name}
        </p>

        {/* delete button */}
        <button
          onClick={handleDelete}
          className="text-zinc-500 hover:text-red-500 transition-colors">
          <Trash className="w-4 h-4"></Trash>
        </button>
      </div>

      {/* volume slider */}
      <div className="">
        {/* volume label for screen readers */}
        <label htmlFor="volume" className="sr-only">
          Volume
        </label>

        {/* volume slider input */}
        <input
          id="volume"
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={(e) => handleUpdateVolume(e.target.valueAsNumber)}
          className="slider"
        />
      </div>
    </li>
  );
};

export default EditDialogMixSound;
