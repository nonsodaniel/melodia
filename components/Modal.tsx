import React, { ReactNode } from "react";
import * as ModalDialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface IModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: ReactNode;
}

const Modal = ({
  title,
  description,
  isOpen,
  onChange,
  children,
}: IModalProps) => {
  return (
    <ModalDialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <ModalDialog.Portal>
        <ModalDialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-neutral-900/90" />
        <ModalDialog.Content
          className="fixed drop-shadow-md border border-neutral-700 top-[50%]
         left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh]
          w-full md:w-[90vw md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
        >
          <ModalDialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </ModalDialog.Title>
          <ModalDialog.Description className="text-sm leading-normal text-center font-bold mb-5">
            {description}
          </ModalDialog.Description>
          <div className="">{children}</div>
          <ModalDialog.Close asChild>
            <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-centet justify-center rounded-full focus:outline-none"></button>
          </ModalDialog.Close>
        </ModalDialog.Content>
      </ModalDialog.Portal>
    </ModalDialog.Root>
  );
};

export default Modal;
