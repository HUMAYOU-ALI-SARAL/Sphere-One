"use client"
import { useTranslate } from "@/providers/translate.provider";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { RiShareLine as ShareIcon } from "react-icons/ri";
import { LuEye as EyeIcon } from "react-icons/lu";
import Faq from "react-faq-component";
import { BsChevronCompactDown as ExpandIcon } from "react-icons/bs";
import DefaultImg from "@/public/solo-logo.png";
import SuperRareLabel from "../Common/SuperRareLabel";
import { InfoIcon } from "../Common/Icons";
import List from "./Actions/List";
import Offer from "./Actions/Offer";
import Details from "./InfoRows/Details";
import PriceHistory from "./InfoRows/PriceHistory";
import Offers from "./InfoRows/Offers";
import Activity from "./InfoRows/Activity";
import Comments from "./InfoRows/Comments";
import Transfer from "./Actions/Transfer";
import Link from "next/link";
import { useNft } from "@/providers/nft.provider";
import UnList from "./Actions/UnList";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import Burn from "./Actions/Burn";
import BuyNow from "./Actions/BuyNow";

const infoStyles = {
    bgColor: 'transparent',
    rowTitleColor: "white",
    rowContentColor: 'grey',
    arrowColor: "#fff",
    rowContentPaddingLeft: '10px',
};

const infoConfig = {
    animate: true,
    openOnload: 0,
    expandIcon: <ExpandIcon size={24} />,
    collapseIcon: <ExpandIcon size={24} />,
};

const Attributes = ({ name, value }: { name: string, value: string }) => {
    return (
        <div className="px-6 w-1/2 py-4 rounded-[5px] max-w-[269px] border border-orange bg-sp-bg-orange-100 flex flex-col text-16 font-normal">
            <p className="text-orange">{name}</p>
            <p>{value}</p>
        </div>
    );
};

const NftOverview = () => {
    const router = useRouter();
    const { _t } = useTranslate();
    const { nft, listedInfo, userBidInfo } = useNft();
    const { tinyBarToHbar } = useBladeWallet();

    const infoData = {
        rows: [
            {
                title: `${_t("Details")}`,
                content: <Details />,
            },
            {
                title: `${_t("Price history")}`,
                content: <PriceHistory />,
            },
            {
                title: `${_t("Activity")}`,
                content: <Activity />
            },
            {
                title: `${_t("Offers")}`,
                content: <Offers />
            },
            /* {
                title: `${_t("Comments (0)")}`,
                content: <Comments />
            }, */
        ],
    };

    return (
        <>
            <div className="border-t border-sp-gray px-10 pb-40">
                <div className="pt-10">
                    <span className="font-3 cursor-pointer" onClick={() => { router.back() }}>{"< "}{_t("BACK")}</span>
                    <div className="flex w-full h-full mt-6">
                        <div className="flex w-full max-w-[630px] flex-col">
                            <div className="w-full  h-[655px]  border rounded-[6px] border-sp-gray relative">
                                <Image fill className="p-1 rounded-[6px] object-contain" src={nft?.metadata?.image || DefaultImg} alt="image" />
                            </div>
                            <div className="flex mt-6 px-8">
                                <div className="flex w-full flex-col">
                                    <p className="text-20 font-medium mb-3">{_t("Attributes")}</p>
                                    <div className="flex gap-6 flex-wrap">
                                        {nft?.metadata?.attributes.map((item, index) => (
                                            <Attributes key={index} name={item.trait_type} value={item.value} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-start pl-10 rtl:pr-10">
                            <div className="flex w-full items-center justify-between">
                                <p className="font-semibold text-[36px]">{nft?.metadata?.name}</p>
                                <ShareIcon className="cursor-pointer" size={32} />
                            </div>
                            <Link
                                className="text-20 text-orange py-1"
                                href={`/collection/${nft?.token.token_id}?tab=items`}
                            >
                                {nft?.token.name}
                            </Link>
                            <div className="flex text-20 gap-x-2">
                                <p>{_t("owned by")}</p>
                                {nft?.owner?.id && (
                                    <Link href={nft?.youAreOwner ? '/profile' : `/profile/${nft.owner.accountId}`} >
                                        <span className="text-orange">{nft.owner?.username || nft.owner?.accountId}</span>
                                        {nft?.youAreOwner && <span className="text-orange pl-1 rtl:pr-1">{_t("(You)")}</span>}
                                    </Link>
                                )}

                            </div>
                            <div className="my-[32px]">
                                <SuperRareLabel />
                            </div>
                            <div className="items-center gap-x-1 hidden">
                                <EyeIcon size={24} />
                                <p className="text-20 font-light">21 {_t("views")}</p>
                            </div>
                            {listedInfo?.isListed &&
                                <div className="mt-3 text-20">
                                    <p>{_t("Price")}: {tinyBarToHbar(listedInfo.price)}</p>
                                </div>
                            }
                            {listedInfo?.isListed && userBidInfo?.active &&
                                <div className="mt-3 text-20">
                                    <p>{_t("Your offer")}: {tinyBarToHbar(userBidInfo.amount)}</p>
                                </div>
                            }
                            {nft?.youAreOwner
                                ? (
                                    <div className="flex w-full flex-col">
                                        <div className="flex w-full gap-6 mt-10 flex-wrap max-w-[900px]">
                                            {<List isUpdate={listedInfo?.isListed} />}
                                            <Transfer />
                                            {listedInfo?.isListed && <UnList />}
                                            <Burn />
                                        </div>
                                        <div className="flex items-center mt-2 gap-x-2">
                                            <InfoIcon />
                                            <p className="font-14 font-normal">{_t("Hover over buttons to see tooltips")}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex w-full gap-6 mt-10 flex-wrap">
                                        {listedInfo?.isListed ? (
                                            <>
                                                <BuyNow />
                                                <Offer isEdit={userBidInfo?.active} />
                                            </>
                                        ) : (
                                            <p className="text-20">{_t('Not listed yet')}</p>
                                        )}
                                    </div>
                                )}

                            <div className="nft-info flex w-full flex-col mt-10">
                                <Faq
                                    data={infoData}
                                    styles={infoStyles}
                                    config={infoConfig}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NftOverview;