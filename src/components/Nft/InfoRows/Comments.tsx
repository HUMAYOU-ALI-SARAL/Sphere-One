import { useTranslate } from "@/providers/translate.provider";
import React from "react";


const Comments = () => {
    const { _t } = useTranslate();
    return (
        <div className="flex flex-col w-full px-6 py-5 text-16 font-light text-white gap-y-4">
            <p className="text-center text-sp-gray-950">{_t("No comments yet")}</p>
        </div>
    );
};

export default Comments;
