"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from 'react-toastify';
import { useNft } from "@/providers/nft.provider";
import { useUser } from "@/providers/user.provider";
import { useCheckTokenAssociationMutation, useSendNftDealMutation } from "@/api/blockchainApi";

const BuyNow = () => {
    const { _t } = useTranslate();
    const { userProfile, accountBalance, refreshAccountBalance } = useUser();
    const [openBuyModal, setBuyModal] = useState<boolean>(false);
    const { isLoading, addBid, associateTokens, hbarToTinyBar } = useBladeWallet();
    const { nft, reFetchNft, listedInfo } = useNft();
    const [isAssociated, setIsAssociated] = useState<boolean>(false);
    const [checkTokenAssociated] = useCheckTokenAssociationMutation();
    const [nftDeal] = useSendNftDealMutation();

    const associatHandler = async () => {
        try {
            await associateTokens([nft?.token_id!], userProfile?.accountId!);
            toast.success(_t("Associate success"));
            setIsAssociated(true);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const buyHandler = async () => {
        if (hbarToTinyBar(accountBalance?.hbarBalance!) < listedInfo?.price!) {
            toast.error(_t("You don't have enough money to buy"));
            return;
        }
        try {
            const transactionId = await addBid(nft?.token_id!, nft?.serial_number!, listedInfo?.price!, true);
            setBuyModal(false);
            toast.success(_t("Success"));
            nftDeal({
                ownerId: nft?.owner?.accountId!,
                buyerId: userProfile?.accountId!,
                transactionId,
                price: listedInfo?.price!,
                tokenId: nft?.token_id!,
                serialNumber: nft?.serial_number!,
            });
            reFetchNft();
            refreshAccountBalance();
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
                className="w-full max-w-[436px] rounded-[5px] h-[50px] buy-button text-white"
                label={_t("Buy now")}
                onClick={() => {
                    setBuyModal(true);
                }}
            />
            <Tooltip noArrow anchorSelect=".buy-button" place="bottom">
                <p className="text-14">{_t("Buy this item for the specified price now")}</p>
            </Tooltip>

            <Modal
                show={openBuyModal}
                onClose={() => setBuyModal(false)}
            >
                <div className="p-10 flex flex-col text-white">
                    <p className="text-[24px] font-semibold">{_t("Buy now")}</p>
                    <p className="text-20 font-normal pt-2">{_t("Are you sure you want to buy this NFT now?")}</p>

                    <div className="flex flex-row items-center justify-end mt-20 gap-x-5">
                        <Button
                            onClick={() => setBuyModal(false)}
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
                            disabled={isLoading || !isAssociated}
                            onClick={() => buyHandler()}
                            className="rounded-[5px] w-1/3 h-[50px] text-white"
                            label={_t("Confirm")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BuyNow;