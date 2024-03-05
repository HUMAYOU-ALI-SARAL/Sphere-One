import React from "react";

import styles from "./styles.module.scss";
import { RareStarIcon } from "./Icons";

type Props = {
    text?: string
};

const SuperRareLabel = ({ text = "Super rare" }: Props) => {
    return (
        <div className={`${styles.superRateLabel} w-[157px] h-[40px] flex gap-x-2 items-center`}>
            <RareStarIcon />
            <p className="text-20">{text}</p>
        </div>
    );
};

export default SuperRareLabel;
