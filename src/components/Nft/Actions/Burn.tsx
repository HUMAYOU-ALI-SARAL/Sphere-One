"use client";
import React, { useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from 'react-toastify';
import { useNft } from "@/providers/nft.provider";
import { useUser } from "@/providers/user.provider";
import { useRouter } from "next/router";
import { MIRROR_NODE_REFRESH_TIME } from "@/constants/app.constants";
import { useSendNftListingMutation } from "@/api/blockchainApi";

const Burn = () => {
    const { _t } = useTranslate();
    const router = useRouter();

    const [openBurnModal, setBurnOfferModal] = useState<boolean>(false);
    const { burnTokens, isLoading } = useBladeWallet();
    const [nftListing] = useSendNftListingMutation();
    const { nft, setIsLoading } = useNft();
    const { userProfile } = useUser();

    const burnHandler = async () => {
        try {
            await burnTokens(userProfile?.accountId!, [{ serialNumber: nft?.serial_number!, tokenId: nft?.token_id! }]);
            setBurnOfferModal(false);
            toast.success(_t("Success"));
            setIsLoading(true);
            nftListing({
                nfts: [nft!],
                price: 0,
                isListed: false,
                listingEndTimestamp: 0,
            });
            setTimeout(() => {
                router.push("/profile");
            }, MIRROR_NODE_REFRESH_TIME)
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <>
            <Button
                type="button"
                className="w-full max-w-[436px] rounded-[5px] h-[50px] bg-transparent text-red border border-red hover:text-white burn-button"
                label={_t("Burn")}
                onClick={() => {
                    setBurnOfferModal(true);
                }}
            />
            <Tooltip noArrow anchorSelect=".burn-button" place="bottom">
                <p>{_t("Destroy this NFT.")}</p>
                <p className="text-red-600">{_t("Once you burn an NFT, you can't recover it")}</p>
            </Tooltip>

            <Modal
                show={openBurnModal}
                onClose={() => setBurnOfferModal(false)}
            >
                <div className="p-10 flex flex-col text-white">
                    <p className="text-[24px] font-semibold">{_t("Burn NFT")}</p>
                    <p className="text-20 font-normal pt-2">{_t("Are you sure you want to burn NFT?")}</p>

                    <div className="flex flex-row items-center justify-end mt-20 gap-x-5">
                        <Button
                            onClick={() => setBurnOfferModal(false)}
                            className="rounded-[5px] w-1/3 h-[50px] text-white bg-transparent border hover:bg-red hover:border-red"
                            label={_t("Cancel")}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={() => burnHandler()}
                            className="rounded-[5px] w-1/3 h-[50px] text-white"
                            label={_t("Confirm")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Burn;