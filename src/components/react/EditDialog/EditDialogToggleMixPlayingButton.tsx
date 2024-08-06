import { PauseFill, PlayFill } from "react-bootstrap-icons";

interface EditDialogToggleMixPlayingButtonProps {
  isPlaying: boolean;
  toggleMixPlaying: () => void;
}

const EditDialogToggleMixPlayingButton = ({
  isPlaying,
  toggleMixPlaying,
}: EditDialogToggleMixPlayingButtonProps) => {
  return (
    <button
      onClick={toggleMixPlaying}
      className="text-zinc-400 bg-zinc-800 py-2 px-5 rounded-xl flex items-center
                        justify-center text-xs hover:text-zinc-50 ">
      {/* icon */}
      {isPlaying ? (
        <PauseFill className="w-5 h-5"></PauseFill>
      ) : (
        <PlayFill className="w-5 h-5"></PlayFill>
      )}

      {/* a11y */}
      {isPlaying ? (
        <span className="sr-only">Pause</span>
      ) : (
        <span className="sr-only">Play</span>
      )}
    </button>
  );
};

export default EditDialogToggleMixPlayingButton;
