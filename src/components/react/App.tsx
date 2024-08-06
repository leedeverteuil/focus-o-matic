import { useEffect, useState } from "react";
import Device from "./Device/Device";
import {
  getMixes,
  playButtonClick,
  playMixSounds,
  saveMixes,
  stopSounds,
  type Mix,
} from "@util/sounds";
import EditDialog from "./EditDialog/EditDialog";

const App = () => {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [currentMixIndex, setCurrentMixIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const currentMix: Mix | null = mixes[currentMixIndex];

  useEffect(() => {
    setMixes(getMixes());
  }, []);

  // handlers for device
  const handleNextMix = () => {
    playButtonClick();

    // no mixes
    if (mixes.length === 0) return;

    // move forward
    let nextIndex = currentMixIndex + 1;

    // handle wrap around
    if (nextIndex >= mixes.length) {
      nextIndex = 0;
    }

    setCurrentMixIndex(nextIndex);

    // if playing, play new mix
    if (isPlaying) {
      const mixAtNextIndex = mixes[nextIndex];
      if (mixAtNextIndex) {
        playMixSounds(mixAtNextIndex);
      }
    }
  };

  const handlePreviousMix = () => {
    playButtonClick();

    // no mixes
    if (mixes.length === 0) return;

    // move backward
    let nextIndex = currentMixIndex - 1;

    // handle wrap around
    if (nextIndex < 0) {
      nextIndex = mixes.length - 1;
    }

    setCurrentMixIndex(nextIndex);

    // if playing, play new mix
    if (isPlaying) {
      const mixAtNextIndex = mixes[nextIndex];
      if (mixAtNextIndex) {
        playMixSounds(mixAtNextIndex);
      }
    }
  };

  const handleCreate = () => {
    playButtonClick();

    // stop playing
    stopSounds();
    setIsPlaying(false);

    // determine number for name in new mix
    let num = 1;
    mixes.forEach((m) => {
      // regex for checking and extracting the number
      const regex = /Untitled Mix (\d+)/;

      // check and extract number
      const match = m.name.match(regex);
      if (match) {
        const n = parseInt(match[1]);
        if (n >= num) {
          num = n + 1;
        }
      }
    });

    // push new mix to mixes
    const newMixes: Mix[] = [
      ...mixes,
      {
        id: `${Date.now()}`,
        name: `Untitled Mix ${num}`,
        soundsWithVolumes: [
          { soundId: "birds", volume: 1 },
          { soundId: "wind-in-trees", volume: 0.5 },
        ],
      },
    ];
    saveMixes(newMixes);
    setMixes(newMixes);

    // navigate to that mix
    setCurrentMixIndex(newMixes.length - 1);

    // edit that mix
    setIsEditing(true);
  };

  const handleEdit = () => {
    playButtonClick();
    setIsEditing(true);
  };

  const handleTogglePlaying = () => {
    playButtonClick();
    if (isPlaying) {
      stopSounds();
      setIsPlaying(false);
    } else {
      playMixSounds(currentMix);
      setIsPlaying(true);
    }
  };

  const handleSaveEdit = (mix: Mix) => {
    // overwrite mix in array
    const newMixes = mixes.map((m) => (m.id === mix.id ? mix : m));
    saveMixes(newMixes);
    setMixes(newMixes);
    setIsEditing(false);
  };

  const onEditTestPlay = () => {
    if (isPlaying) {
      stopSounds();
      setIsPlaying(false);
    }
  };

  const onEditClose = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    // stop playing
    stopSounds();
    setIsPlaying(false);

    // remove from list
    const newMixes = mixes.filter((m) => m.id !== currentMix?.id);
    setMixes(newMixes);
    saveMixes(newMixes);

    // navigate to previous mix
    if (newMixes.length === 0) {
      setCurrentMixIndex(0);
    } else {
      let newMixIndex = currentMixIndex - 1;
      if (newMixIndex < 0) {
        newMixIndex = 0;
      }
      setCurrentMixIndex(newMixIndex);
    }
  };

  return (
    <>
      {/* device */}
      <Device
        isPlaying={isPlaying}
        currentMix={currentMix}
        handleTogglePlaying={handleTogglePlaying}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleNextMix={handleNextMix}
        handlePreviousMix={handlePreviousMix}></Device>

      {/* edit dialog */}
      <EditDialog
        mix={isEditing ? currentMix : null}
        onTestPlay={onEditTestPlay}
        onClose={onEditClose}
        handleSaveEdit={handleSaveEdit}
        handleDelete={handleDelete}></EditDialog>
    </>
  );
};

export default App;
