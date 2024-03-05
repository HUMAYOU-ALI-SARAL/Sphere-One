import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslate } from "@/providers/translate.provider";

import Button from "@/components/Common/Button";
import { Nft, NftCollection } from "@/types/blockchain.type";
import { useGetNftsMutation } from "@/api/blockchainApi";
import { SPHERA_WORLD } from "@/constants/app.constants";
import NftItem from "@/components/Items/Nft/NftItem";

import RecentPlayer from "@/public/img/collection/spheraheads/recent-player.png";
import RecentFlameBg from "@/public/img/collection/spheraheads/recent-flame.png";

interface IORecent {
    collection: NftCollection
};

const RecentBlock = ({collection} :IORecent) => {
    const { _t } = useTranslate();
    const [nfts, setNfts] = useState<Nft[]>([]);

    const [getNfts] = useGetNftsMutation();

    const fetchNfts = useCallback(
        () => {
            getNfts({
                pageSize: 8,
                nftCreator: SPHERA_WORLD,
                tokenId: collection.token_id,
            })
                .unwrap()
                .then((response) => {
                    const { nfts } = response;
                    setNfts(nfts);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        []
    );

    useEffect(() => {
        fetchNfts();
    }, [collection]);

    return (
        <div className="relative w-full">
            <div className="flex justify-center">
                <div className="flex flex-col flex-grow max-w-[1180px] ">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-[32px]">{_t("Recent Listings")}</p>
                        <Button
                            className="bg-sp-gray-600 text-white rounded-[5px]"
                            label={_t("See all")}
                        />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-8 pt-5">
                        {nfts.length > 0 &&
                            nfts.map((nft) => (
                                <NftItem key={`${nft.token_id}-${nft.serial_number}`} nft={nft} />
                            ))}
                    </div>
                </div>
            </div>

            <div className="grid-cols-12 grid relative pt-24">
                <div className="row-span-full col-start-2 col-end-7 max-w-[776px] pt-[40%] z-[2]">
                    <p className="text-[60px] font-abz tracking-[-3.6px]">{_t("Benefits")}:</p>
                    <p className="font-actor text-30 tracking-[-1.8px] leading-9 pt-5">{_t("Owning a SpheraHead unlocks a world of exclusive benefits, including monthly access to Sphera Moments™ Collectible Card Packs, discounts, early platform access, Sphera Token rewards, and more.")}</p>
                    <ol className="font-actor text-20 pl-8 rtl:pr-8 mt-5" style={{ listStyle: "disc" }}>
                        <li>{_t("Monthly Sphera Moments™ Drops")}</li>
                        <li>{_t("Discounts & Rewards")}</li>
                        <li>{_t("Prize Giveaways")}</li>
                        <li>{_t("VIP Community Access")}</li>
                        <li>{_t("IRL Meet-ups")}</li>
                    </ol>
                    <div className="text-20 flex gap-x-3 mt-5 font-light">
                        <p>{_t("Drop ends")}</p>
                        <p className="text-orange">March 8, 2023 at 12:00 PM</p>
                    </div>
                    <Button className="text-white text-20 font-abz w-[220px] h-[49px] rounded-[5px] mt-10" type="button" label={_t("View Collection")} />
                </div>
                <div className="row-span-full col-start-13 col-end-9">
                    <Image quality={100} sizes="100vw" src={RecentPlayer} alt="player" />
                </div>
                <div className="row-span-full col-span-full pt-[40%] z-[1]">
                    <Image quality={100} sizes="100vw" src={RecentFlameBg} alt="flame" style={{ width: "100%", maxHeight: "600px" }} />
                </div>
            </div>
        </div>
    );
};

export default RecentBlock;