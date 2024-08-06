import { useEffect, useRef, type ReactNode } from "react";
import { X } from "react-bootstrap-icons";

interface DialogProps {
  isOpen: boolean;
  clickOutsideToClose?: boolean;
  onClose?: () => void;
  dialogClass?: string;
  children?: ReactNode;
}

// function Modal({ openModal, closeModal, children }) {
//   const ref = useRef();

//   useEffect(() => {
//     if (openModal) {
//       ref.current?.showModal();
//     } else {
//       ref.current?.close();
//     }
//   }, [openModal]);

//   return (
//     <dialog
//       ref={ref}
//       onCancel={closeModal}
//     >
//       {children}
//       <button onClick={closeModal}>
//         Close
//       </button>
//     </dialog>
//   );
// }

const Dialog = ({
  isOpen,
  clickOutsideToClose,
  onClose,
  dialogClass,
  children,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    // manually close the dialog
    dialogRef.current?.close();

    // callback functionality
    onClose && onClose();
  };

  // close the dialog when clicking outside
  const onClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target === dialogRef.current && clickOutsideToClose === true) {
      closeDialog();
    }
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    }
    else if (!isOpen) {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <div className="w-full h-full contents">
      <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={onClick}
        className={`dialog-animations card-shadow bg-zinc-900 fixed w-[calc(100%-2rem)] max-w-lg z-[999] p-0 mx-auto border border-zinc-800 rounded-2xl
                  backdrop:bg-zinc-900/50 backdrop:backdrop-blur-sm ${
                    dialogClass ?? ""
                  }`}>
        {/* close dialog button */}
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 text-zinc-50">
          <X className="w-6 h-6" />
          <span className="sr-only">Close dialog</span>
        </button>

        {/* dialog content */}
        <div onClick={(e) => e.stopPropagation()} className="p-5">
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Dialog;
