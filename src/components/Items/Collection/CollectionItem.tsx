import React from "react";
import { NftCollection } from "@/types/blockchain.type";
import { useRouter } from "next/router";
import { useTranslate } from "@/providers/translate.provider";

const CollectionItem = ({
  collection,
  action,
  width,
  height,
  onMarketPage,
}: {
  collection: NftCollection;
  action?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  onMarketPage?: boolean;
}) => {
  const router = useRouter();
  const { _t } = useTranslate();
  return (
    <div
      className="bg-pattern shadow-[0px_4px_75px_-5px_rgba(0,0,0,0.07)] bg-sp-gray-600 relative overflow-hidden mobile:!w-full max-w-[520px] rounded-[10px] cursor-pointer"
      style={{ height: height || "356px", width: width || "283px" }}
      onClick={() => { router.push(`/collection/${collection.token_id}?tab=items`) }}
    >
      <div className="absolute inset-0 h-[60%]">
        <img
          alt="image"
          src={collection?.metadata?.image}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 top-[60%] flex justify-between p-4">
        <div className="flex flex-col gap-3 items-start">
          <span className={onMarketPage ? 'text-30 uppercase font-bold' : 'text-base'}>{collection.name}</span>
          <div className="flex gap-6 font-inter items-start">

            <div className="flex flex-col items-start text-16">
              <span className="font-light text-sp-gray-999">{_t("Total")}</span>
              <span className="font-medium">
                {collection.total_supply}
              </span>
            </div>
            <div className="flex flex-col items-start text-16">
              <span className="font-light text-sp-gray-999">{_t("Price range")}</span>
              <span className="font-medium">
                12 - 57 HBAR
              </span>
            </div>
            <div className="flex flex-col items-start text-16">
              <span className="font-light text-sp-gray-999">{_t("Minted")}</span>
              <span className="font-medium">
                {collection.minted_count || 5}%
              </span>
            </div>
          </div>
          {onMarketPage &&
            <p className="text-14 font-light text-left">Lorem ipsum dolor sit amet consectetur. Viverra duis amet tellus mauris tincidunt habitant consectetur. Lorem ipsum dolor sit a...</p>
          }
        </div>
        <div>
        </div>
        <div className="flex flex-col items-end justify-between">
          {action}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
