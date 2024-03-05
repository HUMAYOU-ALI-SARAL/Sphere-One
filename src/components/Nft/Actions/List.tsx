"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from "react-toastify";
import Input from "@/components/Common/Input";
import { useUser } from "@/providers/user.provider";
import { useNft } from "@/providers/nft.provider";
import { useCheckNftAllowanceMutation, useSendNftListingMutation } from "@/api/blockchainApi";
import DataPicker from "react-datepicker";
import { addMinutes } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
    isUpdate?: boolean;
};

const List = ({ isUpdate }: Props) => {

    const listMinTime = addMinutes(new Date(), 5);

    const { _t } = useTranslate();
    const [checkNftAllowance] = useCheckNftAllowanceMutation();
    const [nftListing] = useSendNftListingMutation();
    const { giveAllowanceForNFT, listNFT, isLoading, tinyBarToHbar, hbarToTinyBar } = useBladeWallet();
    const { userProfile } = useUser();
    const { nft, reFetchNft, listedInfo } = useNft();

    const [openListModal, setOpenListModal] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [endTime, setEndTime] = useState<Date | null>(listMinTime);

    const allowHandler = async () => {
        try {
            await giveAllowanceForNFT(userProfile?.accountId!, [{ tokenId: nft?.token_id!, serialNumber: nft?.serial_number! }]);
            toast.success(_t("Allowance success"));
            setIsAllowed(true);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const listHandler = async () => {
        if (endTime && endTime < new Date()) {
            toast.error(_t("Wrong listing end time"));
            return;
        }
        try {
            await listNFT([{ tokenId: nft?.token_id!, serialNumber: nft?.serial_number!, priceHBAR: amount }]);
            toast.success(_t("Success"));
            setOpenListModal(false);
            reFetchNft();
            nftListing({
                nfts: [nft!],
                price: hbarToTinyBar(amount),
                isListed: true,
                listingEndTimestamp: endTime?.getTime()!,
            });
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (nft && userProfile) {
            checkNftAllowance({
                ownerId: userProfile.accountId,
                spenderId: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ID!,
                tokenId: nft.token_id,
                serialNumber: nft.serial_number,
            })
                .unwrap()
                .then((response) => {
                    const { hasAllowance } = response;
                    setIsAllowed(hasAllowance);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [nft, userProfile, checkNftAllowance]);

    useEffect(() => {
        if(listedInfo?.isListed) {
            setEndTime(new Date(listedInfo.listingEndTimestamp));
            setAmount(tinyBarToHbar(listedInfo.price, false) as number);
        }
    }, [listedInfo]);

    return (
        <>
            <Button
                type="button"
                className="w-full max-w-[436px] rounded-[5px] text-white h-[50px] list-button"
                label={isUpdate ? _t("Update") : _t("Sell")}
                onClick={() => {
                    setOpenListModal(true)
                }}
            />
            <Tooltip noArrow anchorSelect=".list-button" place="bottom">
                {isUpdate ? _t("Update listing settings") : _t("Sell")}
            </Tooltip>

            <Modal
                show={openListModal}
                onClose={() => {
                    setOpenListModal(true);
                }}
            >
                <div className="p-14 flex flex-col text-white">
                    <p className="text-[36px] font-semibold">{isUpdate ? _t("Update") : _t("Listing")}</p>
                    <p className="text-[30px] font-semibold py-8">{nft?.metadata.name}</p>
                    <div className="flex flex-col">
                        <label className="text-20 pb-4 " htmlFor="amount">{_t("Listing Price")}</label>
                        <Input
                            name="amount"
                            id="amount"
                            type="number"
                            placeholder={_t("Amount")}
                            value={String(amount)}
                            onChange={(event) => setAmount(Number(event.target.value))}
                        />
                    </div>
                    <div className="flex flex-col pt-8">
                        <label className="text-20 pb-4" htmlFor="dateEnd">{_t("Chose listing end")}</label>
                        <DataPicker
                            selected={endTime}
                            onChange={(date) => setEndTime(date)}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            startDate={listMinTime}
                            minDate={listMinTime}
                            showTimeSelect
                            className="w-full bg-sp-gray-600 h-11 border border-none placeholder-neutral-500 text-white text-sm rounded-lg focus:ring-orange-hover focus:border-orange-hover py-2.5 px-4"
                        />
                    </div>
                    <div className="flex flex-col pt-20 gap-y-5">
                        {!isAllowed &&
                            <Button
                                onClick={() => allowHandler()}
                                disabled={isLoading || isAllowed}
                                className="rounded-[5px] h-[50px] text-white"
                                label={_t("Give Allowance")}
                            />
                        }

                        <Button
                            onClick={() => listHandler()}
                            disabled={!isAllowed || isLoading}
                            className="rounded-[5px] h-[50px] text-white"
                            label={_t("List")}
                        />
                        <Button
                            onClick={() => setOpenListModal(false)}
                            className="rounded-[5px] h-[50px] text-white bg-red hover:bg-rose-700"
                            label={_t("Cancel")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default List;