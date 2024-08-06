import type { Sound, SoundCategory } from "@util/sounds";
import { MusicNoteBeamed } from "react-bootstrap-icons";

export interface EditDialogAddSoundListProps {
  addSound: (sound: Sound) => void;
  selectedCategory: SoundCategory;
}

export function EditDialogAddSoundList({
  addSound,
  selectedCategory,
}: EditDialogAddSoundListProps) {
  return (
    <div
      className="px-3 flex flex-wrap items-center justify-start gap-2 w-full">
      {selectedCategory.sounds.map((sound) => (
        <button
          key={sound.id}
          onClick={() => addSound(sound)}
          className="text-zinc-400 border border-zinc-700 rounded-lg px-2.5 py-2 text-sm
                          hover:border-zinc-50 transition-all hover:text-zinc-50 flex items-center gap-1.5 h-fit">
          <MusicNoteBeamed className="w-3.5 h-3.5 min-w-3.5 min-h-3.5"></MusicNoteBeamed>
          <span className="text-nowrap text-ellipsis overflow-hidden">
            {sound.name}
          </span>
        </button>
      ))}
    </div>
  );
}
