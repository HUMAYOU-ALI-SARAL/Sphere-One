import React from "react";
import { Modal as FlowModal } from 'flowbite-react';

type Props = {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: Props) => {
    return (
        <FlowModal theme={{
            content: {
                base: "relative h-full w-full p-4 md:h-auto",
                inner: "relative rounded-[20px] bg-sp-gray-850 flex flex-col"
            }
        }}
            show={show}
            
            onClose={onClose}
            position="center"
        >
            {children}
        </FlowModal>
    );
};

export default Modal;
