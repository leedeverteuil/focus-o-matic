import {
  categories,
  playMixSounds,
  stopSounds,
  updateMixVolumes,
  type Mix,
  type Sound,
  type SoundCategory,
} from "@util/sounds";
import Dialog from "../Dialog";
import { CaretDown, Trash } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { EditDialogCategoriesList } from "./EditDialogCategoriesList";
import { EditDialogAddSoundList } from "./EditDialogAddSoundList";
import { EditDialogVolumeAdjuster } from "./EditDialogVolumeAdjuster";
import isEqual from "lodash.isequal";
import EditDialogToggleMixPlayingButton from "./EditDialogToggleMixPlayingButton";

interface EditDialogProps {
  mix: Mix | null;
  onClose?: () => void;
  onTestPlay: () => void;
  handleSaveEdit: (mix: Mix) => void;
  handleDelete: (mix: Mix) => void;
}

const EditDialog = ({
  mix,
  onClose,
  handleSaveEdit,
  onTestPlay,
  handleDelete,
}: EditDialogProps) => {
  const [initialMix, setInitialMix] = useState<Mix | null>(null);
  const [mixCopy, setMixCopy] = useState<Mix | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory>(
    categories[0]
  );

  const hasChanged = !isEqual(initialMix, mixCopy);
  const isNameEmpty = mixCopy?.name.trim() === "";
  const isOpen = mix !== null;

  // copy the initial mix to make changes
  // also save the initial mix to detect if changed
  useEffect(() => {
    if (mix !== null) {
      const mixStr = JSON.stringify(mix);
      setInitialMix(JSON.parse(mixStr));
      setMixCopy(JSON.parse(mixStr));
    }
  }, [mix]);

  // handle sound addition clicks
  const addSound = (sound: Sound) => {
    // add to selected sounds if not already in there
    if (mixCopy !== null) {
      const soundsWithVolumes = mixCopy.soundsWithVolumes;
      if (!soundsWithVolumes.find((swv) => swv.soundId === sound.id)) {
        // add new and render
        soundsWithVolumes.push({ soundId: sound.id, volume: 0.5 });
        setMixCopy({ ...mixCopy, soundsWithVolumes });

        // if playing
        if (isPlaying) {
          playMix();
        }
      }
    }
  };

  const updateVolume = (soundId: string, volume: number) => {
    if (mixCopy !== null) {
      const obj = mixCopy.soundsWithVolumes.find(
        (swv) => swv.soundId === soundId
      );

      if (obj) {
        obj.volume = volume;
        updateMixVolumes(mixCopy);
        setMixCopy({ ...mixCopy });
      }
    }
  };

  const deleteSoundFromMix = (soundId: string) => {
    if (mixCopy !== null) {
      // remove sound id from soundsWithVolumes
      mixCopy.soundsWithVolumes = mixCopy.soundsWithVolumes.filter(
        (swv) => swv.soundId !== soundId
      );
      setMixCopy({ ...mixCopy });

      // restart with correct sounds
      if (isPlaying) {
        playMix();
      }
    }
  };

  const toggleMixPlaying = () => {
    if (isPlaying) {
      stopMix();
    } else {
      // make sure root mixes stop too
      onTestPlay();

      playMix();
    }
  };

  const playMix = () => {
    stopMix();
    if (mixCopy !== null) {
      playMixSounds(mixCopy);
      setIsPlaying(true);
    }
  };

  const stopMix = () => {
    stopSounds();
    setIsPlaying(false);
  };

  const onNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mixCopy) {
      setMixCopy({ ...mixCopy, name: e.target.value });
    }
  };

  const handleClose = () => {
    if (isPlaying) {
      // stop sounds
      stopSounds();
    }

    // reset playing state
    setIsPlaying(false);

    // parent on close callback
    if (onClose) {
      onClose();
    }
  };

  const saveMix = () => {
    if (mixCopy !== null) {
      handleSaveEdit(mixCopy);
    }
  };

  const handleDeleteInner = (mix: Mix) => {
    // close the dialog
    handleClose();

    // let outer deal with deletion
    handleDelete(mix);
  };

  return (
    <Dialog
      isOpen={isOpen}
      clickOutsideToClose={true}
      onClose={handleClose}
      dialogClass="!max-w-3xl">
      {/* heading */}
      <header className="text-zinc-50 font-semibold text-xl">Edit Mix</header>

      {/* sound adder */}
      <div className="w-full border rounded-2xl border-zinc-800 p-3 mt-2 flex items-start justify-start">
        {/* sidebar for categories */}
        <EditDialogCategoriesList
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        {/* list out sounds */}
        <EditDialogAddSoundList
          addSound={addSound}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* some design stuff */}
      <div className="flex items-center justify-between py-2 text-zinc-800 px-3">
        <CaretDown className=" w-6 h-6"></CaretDown>
        <CaretDown className=" w-6 h-6"></CaretDown>
        <CaretDown className=" w-6 h-6"></CaretDown>
      </div>

      <div className="w-full border rounded-2xl border-zinc-800 p-3">
        {/* volume adjuster for mix sounds */}
        <EditDialogVolumeAdjuster
          mixCopy={mixCopy}
          updateVolume={updateVolume}
          deleteSoundFromMix={deleteSoundFromMix}
        />

        {/* update name of mix */}
        <div className="space-y-0.5 mt-5">
          <label htmlFor="name" className="text-xs font-medium text-zinc-500">
            Enter a name for this mix
          </label>

          <input
            type="text"
            id="name"
            placeholder="Example Mix #1"
            onChange={(e) => onNameValueChange(e)}
            value={mixCopy?.name ?? ""}
            autoComplete="off"
            className="flex w-full px-3 py-2 text-sm transition-all bg-zinc-800 rounded-md
                      shadow-sm outline-none appearance-none focus:outline-none focus:ring-4
                      focus:ring-purple-400/20 border border-zinc-800 focus:border-purple-500 text-zinc-50"
          />
        </div>

        <div className="flex items-center gap-2 mt-3 justify-between">
          <div className="flex items-center gap-2">
            {/* save button */}
            <button
              onClick={saveMix}
              disabled={!hasChanged || isNameEmpty}
              className="bg-purple-700 rounded-xl w-full sm:w-fit py-2 px-16 text-purple-100 text-sm font-medium
                    transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Save mix
            </button>

            {/* toggle playing button */}
            <EditDialogToggleMixPlayingButton
              isPlaying={isPlaying}
              toggleMixPlaying={
                toggleMixPlaying
              }></EditDialogToggleMixPlayingButton>
          </div>

          {/* delete button */}
          <button
            onClick={() => handleDeleteInner(mix!)}
            className="text-zinc-400 bg-zinc-800 py-2 px-5 rounded-xl flex items-center
                        justify-center text-xs hover:text-red-50 hover:bg-red-500 transition-colors">
            {/* icon */}
            <Trash className="w-5 h-5"></Trash>

            {/* a11y */}
            <span className="sr-only">Delete Mix</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDialog;
