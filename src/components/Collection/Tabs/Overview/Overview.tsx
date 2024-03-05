import React from "react";
import { useTranslate } from "@/providers/translate.provider";
import Faq from "@/components/Collection/Tabs/Overview/Faq";
import MintBlock from "./MintBlock";
import ClaimBlock from "./ClaimBlock";
import RecentBlock from "./RecentBlock";
import { NftCollection } from "@/types/blockchain.type";

interface IOverview {
    collection: NftCollection
};

const Overview = ({ collection }: IOverview) => {
    const { _t } = useTranslate();

    return (
        <>
            <MintBlock collection={collection} />
            <ClaimBlock />
            <RecentBlock collection={collection} />
            <Faq />
        </>
    )
};

export default Overview;