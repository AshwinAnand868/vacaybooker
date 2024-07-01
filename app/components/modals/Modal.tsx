"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
                justify-center
                items-center
                flex
                bg-neutral-800/70
                fixed
                z-50
                inset-0
                outline-none
                focus:outline-none  
                overflow-x-hidden
                overflow-y-auto
            "
      >
        <div
          className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-auto
                "
        >
          {/* Content */}
          <div
            className={`
                    translate
                    duration-300
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                `}
          >
            <div
              className="
                        translate
                        h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        bg-white
                        outline-none
                        focus:outline-none
                    "
            >
              {/* Header */}
              <div
                className="
                            flex
                            items-center
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                        "
              >
                <button
                  className="
                                p-1
                                border-0
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                            "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>

                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto overflow-y-auto">{body}</div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                                flex
                                flex-row
                                items-center
                                gap-4
                                w-full
                            "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel!}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
