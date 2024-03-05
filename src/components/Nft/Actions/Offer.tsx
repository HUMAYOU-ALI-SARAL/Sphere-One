"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from 'react-toastify';
import Input from "@/components/Common/Input";
import { useNft } from "@/providers/nft.provider";
import { useCheckTokenAssociationMutation, useSendNftBidMutation, useSendNftDealMutation } from "@/api/blockchainApi";
import { useUser } from "@/providers/user.provider";
import { addDays, addMinutes } from "date-fns";
import DataPicker from "react-datepicker";
import Select from "@/components/Common/Select";


type Props = {
    isEdit?: boolean
}

const Offer = ({ isEdit }: Props) => {
    const { _t } = useTranslate();
    const offerDayOptions = [
        {
            value: "1",
            label: _t("1 day"),
        },
        {
            value: "3",
            label: _t("3 days"),
        },
        {
            value: "5",
            label: _t("5 days"),
        },
        {
            value: "7",
            label: _t("7 days"),
        },
        {
            value: "10",
            label: _t("10 days"),
        },
        {
            value: "15",
            label: _t("15 days"),
        },
        {
            value: "30",
            label: _t("30 days"),
        },
    ];

    const { nft, reFetchNft, listedInfo } = useNft();
    const { userProfile, accountBalance, refreshAccountBalance } = useUser();
    const { addBid, associateTokens, isLoading, tinyBarToHbar } = useBladeWallet();
    const [sendNftBid] = useSendNftBidMutation();
    const [checkTokenAssociated] = useCheckTokenAssociationMutation();
    const [nftDeal] = useSendNftDealMutation();

    const [openOfferModal, setOpenOfferModal] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [isAssociated, setIsAssociated] = useState<boolean>(false);

    const [offerDay, setOfferDay] = useState<string>(offerDayOptions[3].value);

    const associatHandler = async () => {
        try {
            await associateTokens([nft?.token_id!], userProfile?.accountId!);
            toast.success(_t("Associate success"));
            setIsAssociated(true);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const offerHandler = async () => {
        if (accountBalance?.hbarBalance! < amount) {
            toast.error(_t("You don't have enough money to make offer"));
            return;
        }
        try {
            const transactionId = await addBid(nft?.token_id!, nft?.serial_number!, amount);
            toast.success(_t("Success"));
            reFetchNft();
            refreshAccountBalance();
            /* sendNftBid({
                transactionId,
                bidEndTimestamp: addDays(new Date(), Number(offerDay)).getTime(),
            }); */
            setOpenOfferModal(false);

            if (tinyBarToHbar(listedInfo?.price!, false) as number <= amount) {
                nftDeal({
                    ownerId: nft?.owner?.accountId!,
                    buyerId: userProfile?.accountId!,
                    transactionId,
                    price: listedInfo?.price!,
                    tokenId: nft?.token_id!,
                    serialNumber: nft?.serial_number!,
                });
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (nft && userProfile) {
            checkTokenAssociated({
                tokenId: nft.token_id,
                accountId: userProfile.accountId
            })
                .unwrap()
                .then((response) => {
                    const { isAssociated } = response;
                    setIsAssociated(isAssociated);
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [nft, userProfile, checkTokenAssociated]);

    return (
        <>
            <Button
                type="button"
                className="w-full max-w-[436px] rounded-[5px] text-orange hover:text-white h-[50px] offer-button bg-transparent border border-orange"
                label={isEdit ? _t("Update offer") : _t("Make offer")}
                onClick={() => {
                    setOpenOfferModal(true);
                }}
            />
            <Tooltip anchorSelect=".offer-button" place="bottom">
                {isEdit ? _t("Update your offer") : _t("Make an offer to the owner of this item")}
            </Tooltip>

            <Modal
                show={openOfferModal}
                onClose={() => setOpenOfferModal(false)}
            >
                <div className="p-10 flex flex-col text-white">
                    <p className="text-[24px] font-semibold">{isEdit ? _t("Update offer") : _t("Make offer")}</p>
                    <div className="flex flex-col">
                        <div className="flex flex-col pt-8">
                            <label className="text-20 my-5" htmlFor="amount">{_t("Amount")}</label>
                            <Input
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder={_t("Amount")}
                                value={String(amount)}
                                onChange={(event) => setAmount(Number(event.target.value))}
                            />
                        </div>
                        {/* <div className="flex flex-col pt-8">
                            <label className="text-20 pb-4" htmlFor="dateEnd">{_t("Valid for")}</label>
                            <Select
                                defaultValue={offerDayOptions[3].value}
                                className="w-full"
                                options={offerDayOptions}
                                onChange={(event) => setOfferDay(event.target.value)}
                            />
                        </div> */}
                    </div>

                    <div className="flex flex-row items-center justify-end mt-20 gap-x-5">
                        <Button
                            onClick={() => setOpenOfferModal(false)}
                            className="rounded-[5px] w-1/3 h-[50px] text-white bg-transparent border hover:bg-red hover:border-red"
                            label={_t("Cancel")}
                        />
                        {!isAssociated &&
                            <Button
                                onClick={() => associatHandler()}
                                disabled={isLoading || isAssociated}
                                className="rounded-[5px] w-1/3 h-[50px] text-white"
                                label={_t("Associate token")}
                            />
                        }
                        <Button
                            disabled={!isAssociated || isLoading}
                            onClick={() => offerHandler()}
                            className="rounded-[5px] w-1/3 h-[50px] text-white"
                            label={_t("Make Offer")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Offer;