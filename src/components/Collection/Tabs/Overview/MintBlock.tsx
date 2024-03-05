import React from "react";
import Image from "next/image";
import { numberWithCommas } from "@/utils/common";
import { useTranslate } from "@/providers/translate.provider";
import BgImage from "@/public/img/collection/spheraheads/half-bg.png";
import Logo from "@/public/logo_xl.png";
import { FaCircle as CircleIcon } from "react-icons/fa6";
import {
    FreeIcon,
    InfoIcon,
    SHeadFlameIcon,
    SHeadCrownIcon,
    SHeadAchiveIcon,
    SHeadClipboardIcon,
    SHeadDiskIcon,
} from "@/components/Common/Icons";
import { LuLink as LinkIcon } from "react-icons/lu";
import { FaCircleCheck as CheckIcon } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline as CheckOutIcon } from "react-icons/io";
import { FiCrosshair as CrossIcon } from "react-icons/fi";
import CountdownTimer from "@/components/Common/CountdownTimer";
import Button from "@/components/Common/Button";
import { NftCollection } from "@/types/blockchain.type";

const InfoBlock = ({ name, value }: { name: string, value: string }) => {
    return (
        <div className="px-8 py-5 rounded-[5px] border border-orange bg-sp-bg-orange-100 flex flex-col text-20 font-normal">
            <p className="text-orange">{name}</p>
            <p>{value}</p>
        </div>
    );
};

const InfoIconBlock = ({ text, icon, textWeight }: { text: string, icon: React.ReactNode, textWeight: string }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {icon}
            <p className={`text-16 font-normal text-center mt-3`} style={{ width: `${textWeight}` }}>{text}</p>
        </div>
    );
};

interface IMintBlock {
    collection: NftCollection;
};

const MintBlock = ({ collection }: IMintBlock) => {
    const { _t } = useTranslate();
    const infoBlockList = [
        {
            name: _t("Total Supply"),
            value: numberWithCommas(collection?.total_items || 10000)
        },
        {
            name: _t("Royalties"),
            value: `${collection?.royalty_fee! * 100 || 5}%`
        },
        {
            name: _t("Minted"),
            value: `${collection?.minted_count || 6678}%`
        },
    ];

    const infoIconBlockList = [
        {
            text: _t("First Access to all Sphera Releases"),
            icon: <SHeadFlameIcon />,
            textWeight: "172px",
        },
        {
            text: _t("Raffle entries for $Sphera Tokens and other rewards"),
            icon: <SHeadCrownIcon />,
            textWeight: "167px",
        },
        {
            text: _t("Access to special events and meetups"),
            icon: <SHeadAchiveIcon />,
            textWeight: "167px",
        },
        {
            text: _t("Win a Signed Ronaldo, Neymar or Benzema Saudi League Team Jersey"),
            icon: <SHeadCrownIcon />,
            textWeight: "228px",
        },
        {
            text: _t("Whitelist on future NFT collections"),
            icon: <SHeadClipboardIcon />,
            textWeight: "228px",
        },
        {
            text: _t("Closed community access on Discord"),
            icon: <SHeadDiskIcon />,
            textWeight: "172px",
        },

    ];
    return (
        <div className="relative py-20">
            <div className="flex">
                <Image sizes="100vw" src={BgImage} alt="image" />
                <div className="max-w-[810px] w-full pl-10 rlt:pr-10">
                    <div className="flex items-center w-full justify-between">
                        <Image sizes="100vw" src={Logo.src} width={309} height={132} alt="image" />
                        <div className="rounded-[2px] px-2 py-1 bg-red text-white flex items-center gap-x-2">
                            <CircleIcon fill="#fff" size={12} />
                            <p className="font-actor">{_t("Live Drop")}</p>
                        </div>
                    </div>
                    <div className="mt-6 ml-7 rtl:mr-7">
                        <div className="text-20 flex gap-x-3 font-light">
                            <p>{_t("Drop ends")}</p>
                            <p className="text-orange">March 8, 2023 at 12:00 PM</p>
                        </div>
                        <div className="text-20 flex gap-x-3 font-light items-center py-5">
                            <CircleIcon fill="#FF7F2A" size={12} />
                            <p className="">{_t("Current public price")}:</p>
                            <p className="text-24">{_t("Free")}</p>
                            <FreeIcon />
                        </div>
                        <p className="text-[60px] font-abz tracking-[-3.6px] font-normal">{_t("SpheraHeads: Genesis Edition")}</p>
                        <div className="py-5">
                            <CountdownTimer timestamp={Date.now() + 50000000} />
                        </div>
                        <div className="flex gap-x-4">
                            {infoBlockList.map((item, index) => (
                                <InfoBlock name={item.name} value={item.value} key={index} />
                            ))}
                        </div>
                        <div className="text-20 font-extralight py-6">
                            <p>
                                {_t("Each digital collectible/NFT is unique and randomly generated for Sphera's early subscribers, tapping into a userbase of 30M+ football fans.")}
                            </p>
                            <p className="pt-6">
                                {_t("Claim your sports avatar for FREE and show support for your favorite team and interact with other fans on the Sphera platform.")}
                            </p>
                        </div>
                        <div className="text-20 ">
                            <p className="pb-3 font-semibold">{_t("Minting Steps")}:</p>
                            <div className="flex gap-x-4 items-center">
                                <LinkIcon stroke="#FF7F2A" size={24} />
                                <p className="font-abz font-normal">{_t("Connect your account")}</p>
                                <CheckIcon fill="#FF7F2A" className="bg-white rounded-full" size={24} />
                            </div>
                            <div className="flex gap-x-4 items-center pt-2">
                                <CheckOutIcon fill="#FF7F2A" size={24} />
                                <p className="font-abz font-normal">{_t("Follow Spheraworld Twitter")}</p>
                            </div>
                            <div className="flex gap-x-4 items-center pt-2">
                                <CrossIcon stroke="#FF7F2A" size={24} />
                                <p className="font-abz font-normal">{_t("Claim SpheraHead")}</p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-2">
                                <p className="px-5 py-2 text-sp-gray-950 border-sp-gray-700 bg-sp-gray-600 border rounded-[5px]">1</p>
                                <InfoIcon className="cursor-pointer" />
                            </div>
                            <Button className="text-white text-20 font-abz mt-4 w-[220px] h-[49px] rounded-[5px]" type="button" label={_t("Mint SpheraHead")} />
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-center">
                <div className="flex flex-grow justify-between  mt-20 max-w-[1290px]">
                    {infoIconBlockList.map((item, index) => (
                        <InfoIconBlock text={item.text} textWeight={item.textWeight} icon={item.icon} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default MintBlock;