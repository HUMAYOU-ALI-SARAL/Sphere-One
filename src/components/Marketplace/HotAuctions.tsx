import React, { useEffect, useState } from "react";
import { useGetNftsMutation } from "@/api/blockchainApi";

import Button from "../Common/Button";
import NftItem from "../Items/Nft/NftItem";
import Loader from "../Common/Loader";

import { Nft, NftRequestTypes } from "@/types/blockchain.type";

const HotAuctions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<Nft[]>([]);

  const [getNfts, getNftsStatus] = useGetNftsMutation();

  const fetchNfts = () => {
    setIsLoading(true);

    getNfts({
      pageSize: 4,
      // type: NftRequestTypes.HOT_AUCTIONS, // TODO: Uncomment when backend will be ready
    })
      .unwrap()
      .then((response) => {
        const { nfts } = response;
        setNfts(nfts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNfts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <span className="text-[32px]">Hot Auctions</span>
        <Button
          className="bg-sp-gray-600 text-white rounded-[5px]"
          label="See all"
        />
      </div>
      <div className="relative flex gap-6 mobile:flex-col tablet:flex-wrap tablet:justify-center">
        {nfts.map((nft) => (
          <NftItem
            key={`${nft.token_id}-${nft.serial_number}`}
            nft={nft}
            width="25%"
          />
        ))}
        {(isLoading || getNftsStatus.isLoading) && <Loader />}
      </div>
    </>
  );
};

export default HotAuctions;
