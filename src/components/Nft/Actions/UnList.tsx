"use client";
import React, { useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from "react-toastify";
import { useNft } from "@/providers/nft.provider";
import { useSendNftListingMutation } from "@/api/blockchainApi";


const UnList = () => {
    const { _t } = useTranslate();
    const { unlistNFT, isLoading } = useBladeWallet();
    const [nftListing] = useSendNftListingMutation();
    const { nft, reFetchNft } = useNft();

    const [openUnListModal, setOpenUnListModal] = useState<boolean>(false);

    const unListHandler = async () => {
        try {
            await unlistNFT(nft?.token_id!, nft?.serial_number!);
            toast.success(_t("Success"));
            setOpenUnListModal(false);
            reFetchNft();
            nftListing({
                nfts: [nft!],
                price: 0,
                isListed: false,
                listingEndTimestamp: 0,
            });
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <>
            <Button
                type="button"
                className="w-full max-w-[436px] rounded-[5px] text-orange hover:text-white h-[50px] unlist-button bg-transparent border border-orange"
                label={_t("Remove listing")}
                onClick={() => {
                    setOpenUnListModal(true)
                }}
            />
            <Tooltip noArrow anchorSelect=".unlist-button" place="bottom">
                {_t("Remove listing")}
            </Tooltip>

            <Modal
                show={openUnListModal}
                onClose={() => {

                    setOpenUnListModal(true);
                }}
            >
                <div className="p-14 flex flex-col text-white">
                    <p className="text-[36px] font-semibold">{_t("Remove listing")}</p>
                    <p className="text-[30px] font-semibold py-8">{nft?.metadata.name}</p>

                    <div className="flex flex-col pt-20 gap-y-5">
                        <Button
                            onClick={() => unListHandler()}
                            disabled={isLoading}
                            className="rounded-[5px] h-[50px] text-white"
                            label={_t("Confirm")}
                        />
                        <Button
                            onClick={() => setOpenUnListModal(false)}
                            className="rounded-[5px] h-[50px] text-white bg-red hover:bg-rose-700"
                            label={_t("Cancel")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UnList;