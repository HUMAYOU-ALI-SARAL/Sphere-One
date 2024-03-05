import { useTranslate } from "@/providers/translate.provider";
import React from "react";
import { NoItemsIcon } from "./Icons";

const NoItems = () => {
    const { _t } = useTranslate();
    return (
        <div className="flex text-sp-gray-200 flex-col items-center justify-center">
            <NoItemsIcon />
            <p className="text-20 font-medium mt-2">{_t("No items found")}</p>
            <p className="text-16 font-normal">{_t("Try adjusting your search or filter to find what you’re looking for")}</p>
        </div>
    );
};

export default NoItems;
