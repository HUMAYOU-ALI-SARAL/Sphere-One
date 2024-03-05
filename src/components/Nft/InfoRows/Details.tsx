import React from "react";
import { useTranslate } from "@/providers/translate.provider";
import Link from "next/link";
import { useNft } from "@/providers/nft.provider";


const Details = () => {
    const { _t } = useTranslate();
    const { nft } = useNft();
    return (
        <div className="flex flex-col w-full px-6 py-5 text-16 font-light text-white gap-y-4">
            <div className="flex items-center justify-between">
                <p>{_t("Token ID")}</p>
                <Link 
                className="text-orange" 
                target="blank" 
                href={`${process.env.NEXT_PUBLIC_HASH_SCAN_TOKEN_URL}${nft?.token_id}`} 
                >{nft?.token_id}
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <p>{_t("Chain")}</p>
                <p>Hedera Hashgraph Network</p>
            </div>
            {nft?.token.royalty_fee &&
                <div className="flex items-center justify-between">
                    <p>{_t("Creator Earnings")}</p>
                    <p>{nft.token.royalty_fee * 100}%</p>
                </div>
            }
        </div>
    );
};

export default Details;
