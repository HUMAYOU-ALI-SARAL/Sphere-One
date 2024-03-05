"use client";
import React, { useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from 'react-toastify';
import { useNft } from "@/providers/nft.provider";

const CancelOffer = () => {
    const { _t } = useTranslate();

    const [openCancelOfferModal, setCancelOpenOfferModal] = useState<boolean>(false);
    const { deleteBid, isLoading } = useBladeWallet();
    const { nft, reFetchNft, userBidInfo } = useNft();

    const cancelOfferHandler = async () => {
        try {
            await deleteBid(nft?.token_id!, nft?.serial_number!, userBidInfo?.ownerEvmAddress!);
            toast.success(_t("Success"));
            reFetchNft();
            setCancelOpenOfferModal(false);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <>
            <Button
                type="button"
                className="rounded-[5px] text-white"
                label={_t("Cancel offer")}
                onClick={() => {
                    setCancelOpenOfferModal(true);
                }}
            />

            <Modal
                show={openCancelOfferModal}
                onClose={() => setCancelOpenOfferModal(false)}
            >
                <div className="p-10 flex flex-col text-white">
                    <p className="text-[24px] font-semibold">{_t("Cancel offer")}</p>
                    <p className="text-20 font-normal pt-2">{_t("Are you sure you want to cancel your offer?")}</p>

                    <div className="flex flex-row items-center justify-end mt-20 gap-x-5">
                        <Button
                            onClick={() => setCancelOpenOfferModal(false)}
                            className="rounded-[5px] w-1/3 h-[50px] text-white bg-transparent border hover:bg-red hover:border-red"
                            label={_t("Cancel")}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={() => cancelOfferHandler()}
                            className="rounded-[5px] w-1/3 h-[50px] text-white"
                            label={_t("Confirm")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CancelOffer;