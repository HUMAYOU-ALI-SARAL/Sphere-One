import React, { useEffect, useState } from "react";

import Button from "../Common/Button";
import NftItem from "../Items/Nft/NftItem";

import { generateNfts } from "@/helpers/mockups";
import { Nft } from "@/types/blockchain.type";

const PhygitalGoods = () => {
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchNfts = async () => {
      //setNfts(generateNfts());
    };

    fetchNfts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <span className="text-[32px]">Phygital Goods</span>
        <Button
          className="bg-sp-gray-600 text-white rounded-[5px]"
          label="See all"
        />
      </div>
      <div className="relative flex gap-6 mobile:flex-col mobile:flex-wrap">
        {nfts.slice(0, 3).map((nft) => (
          <NftItem
          key={`${nft.token_id}-${nft.serial_number}`}
          nft={nft}
          width="33%"
        />
        ))}
      </div>
    </>
  );
};

export default PhygitalGoods;
