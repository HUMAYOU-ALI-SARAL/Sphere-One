"use client";
import { useGetNftBidsMutation, useSendNftDealMutation, useSendNftListingMutation } from "@/api/blockchainApi";
import Button from "@/components/Common/Button";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { useNft } from "@/providers/nft.provider";
import { useTranslate } from "@/providers/translate.provider";
import { useUser } from "@/providers/user.provider";
import { Bid } from "@/types/blockchain.type";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CancelOffer from "../Actions/CancelOffer";
import { floorDifference } from "@/utils/common";
import { formatDistanceStrict } from "date-fns";

const Offers = () => {
    const [getBids] = useGetNftBidsMutation();
    const [nftListing] = useSendNftListingMutation();
    const { nft, reFetchNft, listedInfo } = useNft();
    const { _t } = useTranslate();
    const { tinyBarToHbar, acceptBid } = useBladeWallet();
    const { userProfile } = useUser();
    const [nftDeal] = useSendNftDealMutation();

    const [bids, setBids] = useState<Bid[]>([]);

    const tableHeader = [
        _t("Price (HBAR)"),
        _t("USD price"),
        _t("Floor difference"),
        _t("Expiration"),
        _t("From"),
        _t(""),
    ];

    const acceptOfferHandler = async (bid: Bid) => {
        try {
            const transactionId = await acceptBid(nft?.token_id!, nft?.serial_number!, bid.ownerEvmAddress, bid.amount);
            toast.success(_t("Success"));
            nftListing({
                nfts: [nft!],
                price: 0,
                isListed: false,
                listingEndTimestamp: 0,
            });
            nftDeal({
                ownerId: nft?.owner?.accountId!,
                buyerId: bid.ownerAccountId,
                transactionId,
                price: bid.amount,
                tokenId: nft?.token_id!,
                serialNumber: nft?.serial_number!,
            });
            reFetchNft();
        }
        catch (error: any) {
            toast.error(error?.message);
        }
    };

    const fetchBidsHistory = useCallback(() => {
        getBids({
            tokenId: nft?.token_id!,
            serialNumber: nft?.serial_number!,
        })
            .unwrap()
            .then((response) => {
                const { bids } = response;
                setBids(bids);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchBidsHistory();
    }, []);
    return (
        <div className="flex flex-col w-full px-6 py-5 text-16 font-light text-white gap-y-4">
            {bids.length ? (
                <table className="min-w-full text-white font-light">
                    <thead className="bg-sp-gray-600">
                        <tr>
                            {tableHeader.map((name, index) => (
                                <th key={index} className="p-2">{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={`bid-${index}`} className="border-b border-sp-gray-700">
                                <td className="p-2 text-center">{tinyBarToHbar(bid.amount)}</td>
                                <td className="p-2 text-center">{bid.amountInUsd}$</td>
                                <td className="p-2 text-center">
                                    <p>
                                        {floorDifference(tinyBarToHbar(listedInfo?.price || 0n, false) as number, tinyBarToHbar(bid.amount, false) as number)}%
                                        {" "}
                                        {listedInfo?.price! > bid.amount ? _t("below") : _t("above")}
                                    </p>
                                </td>
                                <td className="p-2 text-center">
                                    {bid.bidEndTimestamp &&
                                        <p>
                                            {_t("in")}
                                            {" "}
                                            {formatDistanceStrict(bid.bidEndTimestamp, new Date())}
                                        </p>
                                    }
                                </td>
                                <td className="p-2 text-center text-orange">{bid.username || bid.ownerAccountId}</td>
                                <td className="p-2 text-center">
                                    {userProfile?.evmAddress && (listedInfo?.owner.toLocaleLowerCase() === userProfile.evmAddress.toLocaleLowerCase()) &&
                                        <Button type="button" onClick={() => acceptOfferHandler(bid)} className="text-white rounded-[5px]" label={_t("Accept offer")} />
                                    }
                                    {userProfile?.accountId && (bid.ownerAccountId === userProfile.accountId) &&
                                        <CancelOffer />
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-sp-gray-950">{_t("No available data")}</p>
            )}
        </div>
    );
};

export default Offers;
