"use client";
import React, { useState } from "react";
import { Collapse as ReactCollapse } from 'react-collapse';
import { MdKeyboardArrowDown as OpenIcon } from "react-icons/md";
import { MdKeyboardArrowUp as CloseIcon } from "react-icons/md";

type Props = {
    label: string,
    children: React.ReactNode;
    containerClassNames?: string
};

const Collapse = ({ label, children, containerClassNames }: Props) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    return (
        <div className={`w-full ${containerClassNames || ''}`}>
            <div
                onClick={() => setIsOpened(!isOpened)}
                className="flex items-center justify-between h-[40px] cursor-pointer bg-sp-gray-600 rounded-[5px] px-4"
            >
                <span>{label}</span>
                {isOpened ? <CloseIcon size={24} /> : <OpenIcon size={24} />}
            </div>
            <div className="">
                <ReactCollapse isOpened={isOpened} >
                    {children}
                </ReactCollapse>
            </div>
        </div>
    );
};

export default Collapse;
