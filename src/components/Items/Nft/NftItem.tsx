"use client";
import React from "react";

import { HeartIcon } from "../../Common/Icons";

import { Nft } from "@/types/blockchain.type";
import { useRouter } from "next/router";
import Checkbox from "@/components/Common/Checkbox";
import { useBladeWallet } from "@/providers/blade-wallet.provider";

const NftItem = ({
  nft,
  action,
  width,
  height,
  useSelect,
  onChange,
  isChecked,
}: {
  nft: Nft;
  action?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  useSelect?: boolean;
  onChange?: (state: boolean) => void;
  isChecked?: boolean;

}) => {
  const router = useRouter();
  const { tinyBarToHbar } = useBladeWallet();
  return (
    <div
      onClick={(event) => {
        const target = event.target as HTMLInputElement
        if (target.type !== 'checkbox') {
          router.push(`/nft/${nft.token_id}/?serial=${nft.serial_number}`)
        }
      }}
      className="bg-pattern shadow-[0px_4px_75px_-5px_rgba(0,0,0,0.07)] bg-sp-gray-600 relative overflow-hidden rounded-[10px] mobile:!w-full cursor-pointer"
      style={{ height: height || "356px", width: width || "283px" }}
    >
      {useSelect &&
        <div className="z-10 absolute right-3 top-3">
          <Checkbox
            checked={isChecked}
            value={`${nft.token_id}-${nft.serial_number}`}
            onChange={(event) => {
              if (onChange) {
                onChange(event.target.checked);
              }
            }}
          />
        </div>
      }

      <div className="absolute inset-0 h-[209px]">
        <img src={nft.metadata.image} className="object-cover w-full h-full" alt="image" />
      </div>
      <div className="absolute inset-0 top-[209px] flex justify-between p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col font-inter">
            <span className="text-sm">{nft?.token?.name}</span>
            <span className="text-base font-semibold">{nft.metadata.name}</span>
          </div>
          <div className="flex flex-col">
            {nft.price
              ?
              <span className="text-base">Price: {tinyBarToHbar(nft.price)} </span>
              : <>
                <span className="text-base">Token: {nft.token_id}</span>
                <span className="text-base">Serial Number: {nft.serial_number}</span>
              </>
            }
          </div>
        </div>

        <div className="hidden flex-col items-end justify-between">{/* flex */}
          <button className="hover:bg-orange-hover h-8 p-1 rounded-[3px] text-orange hover:text-white">
            <HeartIcon />
          </button>
          {action}
        </div>
      </div>
    </div>
  );
};

export default NftItem;
