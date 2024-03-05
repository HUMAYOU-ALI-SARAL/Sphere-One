"use client";
import React, { useState } from "react";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { Tooltip } from 'react-tooltip';
import Modal from "@/components/Common/Modal";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from 'react-toastify';
import Input from "@/components/Common/Input";
import { useGetAccountIdByUserNameMutation } from "@/api/userApi";
import { useUser } from "@/providers/user.provider";
import { useNft } from "@/providers/nft.provider";
import { useCheckTokenAssociationMutation, useSendNftListingMutation } from "@/api/blockchainApi";
import { WALLET_REGEX } from "@/constants/app.constants";

const Transfer = () => {
    const { _t } = useTranslate();

    const [openTransferModal, setOpenTransferModal] = useState<boolean>(false);
    const { transferNft, isLoading } = useBladeWallet();
    const [recipientInput, setRecipientInput] = useState<string>("");
    const [nftListing] = useSendNftListingMutation();
    const [fetchUserAccountId, fetchStatus] = useGetAccountIdByUserNameMutation();
    const [checkTokenAssociated] = useCheckTokenAssociationMutation();
    const { userProfile } = useUser();
    const { nft, reFetchNft } = useNft();

    const checkUser = async () => {
        if (recipientInput.match(WALLET_REGEX)) {
            await transferHandler(recipientInput);
        } else {
            fetchUserAccountId(recipientInput).unwrap()
                .then(async (response) => {
                    const { accountId } = response;
                    await transferHandler(accountId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const transferHandler = async (walletId: string) => {
        checkTokenAssociated({
            tokenId: nft?.token_id!,
            accountId: walletId
        })
            .unwrap()
            .then(async (response) => {
                const { isAssociated } = response;
                if (isAssociated) {
                    try {
                        await transferNft(userProfile?.accountId!, walletId, [{ serialNumber: nft?.serial_number!, tokenId: nft?.token_id! }]);
                        toast.success(_t("Success"));
                        setOpenTransferModal(false);
                        nftListing({
                            nfts: [nft!],
                            price: 0,
                            isListed: false,
                            listingEndTimestamp: 0,
                        });
                        reFetchNft();
                    } catch (error: any) {
                        toast.error(error?.message);
                    }
                } else {
                    toast.error(_t("The recipient cannot accept this NFT"))
                }

            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <>
            <Button
                type="button"
                className="w-full max-w-[436px] rounded-[5px] text-orange hover:text-white h-[50px] offer-button bg-transparent border border-orange"
                label={_t("Transfer")}
                onClick={() => {
                    setOpenTransferModal(true);
                }}
            />
            <Tooltip noArrow anchorSelect=".offer-button" place="bottom">
                {_t("Transfer this NFT")}
            </Tooltip>

            <Modal
                show={openTransferModal}
                onClose={() => setOpenTransferModal(false)}
            >
                <div className="p-10 flex flex-col text-white">
                    <p className="text-[24px] font-semibold">{_t("Transfer")}</p>
                    <label className="text-20 my-5" htmlFor="recipient">{_t("Recipient")}</label>
                    <Input
                        type="text"
                        name="recipient"
                        id="recipient"
                        placeholder={_t("Enter address or name")}
                        value={recipientInput}
                        onChange={(event) => setRecipientInput(event.target.value)}
                    />

                    <div className="flex flex-row items-center justify-end mt-10 gap-x-5">

                        <Button
                            onClick={() => setOpenTransferModal(false)}
                            className="rounded-[5px] w-1/3 h-[50px] text-white bg-transparent border hover:bg-red hover:border-red"
                            label={_t("Cancel")}
                        />
                        <Button
                            disabled={isLoading || fetchStatus.isLoading || !recipientInput}
                            onClick={() => checkUser()}
                            className="rounded-[5px] w-1/3 h-[50px] text-white"
                            label={_t("Transfer")}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Transfer;