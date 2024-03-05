import React, { useCallback, useEffect, useState } from "react";
import NftItem from "@/components/Items/Nft/NftItem";
import { useGetUserBidsMutation, useSendNftDealMutation, useSendNftListingMutation } from "@/api/blockchainApi";
import { UserProfileType } from "@/types/user.type";
import { MIRROR_NODE_REFRESH_TIME, TRANSACTION_PAGE_LIMIT, WALLET_REGEX } from "@/constants/app.constants";
import { Bid, UserBidsType } from "@/types/blockchain.type";
import { useTranslate } from "@/providers/translate.provider";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import Button from "@/components/Common/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Pagination from "@/components/Common/Pagination";
import Loader from "@/components/Common/Loader";
import { floorDifference } from "@/utils/common";
import { formatDistanceStrict } from "date-fns";

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const Bids = ({ userProfile, isOwner }: Props) => {
  const { _t } = useTranslate();
  const router = useRouter();
  const [bids, setBids] = useState<Bid[]>([]);
  const { tinyBarToHbar, acceptBid, evmToToken } = useBladeWallet();
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [getBids] = useGetUserBidsMutation();
  const [nftListing] = useSendNftListingMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nftDeal] = useSendNftDealMutation();

  const tableHeader = [
    _t("NFT"),
    _t("Price (HBAR)"),
    _t("USD price"),
    _t("Floor difference"),
    _t("Expiration"),
    _t("From"),
    _t(""),
  ];

  const acceptOfferHandler = async (bid: Bid) => {
    try {
      const transactionId = await acceptBid(
        bid.tokenId.match(WALLET_REGEX) ? bid.tokenId : evmToToken(bid.tokenId),
        bid.serialNumber,
        bid.ownerEvmAddress,
        bid.amount
      );
      toast.success(_t("Success"));
      nftListing({
        nfts: [bid.nft],
        price: 0,
        isListed: false,
        listingEndTimestamp: 0,
      });
      nftDeal({
        ownerId: userProfile?.accountId!,
        buyerId: bid.ownerAccountId,
        transactionId,
        price: bid.amount,
        tokenId: evmToToken(bid.tokenId),
        serialNumber: bid.serialNumber,
      });

      setIsLoading(true);
      setTimeout(() => {
        fetchBids();
      }, MIRROR_NODE_REFRESH_TIME);
    }
    catch (error: any) {
      toast.error(error?.message);
    }
  };

  const fetchBids = useCallback(() => {
    setIsLoading(true);
    getBids({
      accountId: userProfile?.accountId!,
      page,
      pageSize: TRANSACTION_PAGE_LIMIT,
      type: UserBidsType.RECEIVED_BIDS
    })
      .unwrap()
      .then((response) => {
        const { bids } = response;
        setBids(bids);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      })
  }, [page]);

  useEffect(() => {
    fetchBids();
  }, [page]);

  return (
    <div className="w-full p-8 overflow-x-auto relative">
      {isLoading
        ? <Loader />
        :
        <div>
          <table className="min-w-full text-white">
            <thead className="bg-sp-gray-600">
              <tr>
                {tableHeader.map((name, index) => (
                  <th key={index} className="p-2">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bids?.map((bid, index) => (
                <tr key={`bid-${index}`} className="border-b border-gray-700">
                  <td className="p-2">
                    <div className="flex gap-2 justify-center">
                      <NftItem nft={bid.nft} />
                    </div>
                  </td>
                  <td className="p-2 text-center">{tinyBarToHbar(bid.amount)}</td>
                  <td className="p-2 text-center">{bid.amountInUsd}$</td>
                  <td className={`p-2 text-center`}>
                    <p>
                      {floorDifference(tinyBarToHbar(bid?.nft.price || 0n, false) as number, tinyBarToHbar(bid.amount, false) as number)}%
                      {" "}
                      {bid?.nft.price! > bid.amount ? _t("below") : _t("above")}
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
                  <td
                    className={`p-2 text-center text-orange ${bid.ownerAccountId ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (bid.ownerAccountId) {
                        router.push(`/profile/${bid.ownerAccountId}`);
                      }
                    }}
                  >
                    {bid.username || bid.ownerAccountId}
                  </td>
                  <td className="p-2 text-center">
                    {isOwner &&
                      <Button
                        type="button"
                        onClick={() => acceptOfferHandler(bid)}
                        className="text-white rounded-[5px]"
                        label={_t("Accept bid")}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex pt-6 items-center justify-end">
            <Pagination page={page} setPage={setPage} isLastPage={isLastPage} />
          </div>
        </div>
      }
    </div>
  );
};

export default Bids;
