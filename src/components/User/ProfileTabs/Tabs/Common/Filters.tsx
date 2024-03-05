import Checkbox from "@/components/Common/Checkbox";
import { BigGridIcon, GridIcon, SearchIcon } from "@/components/Common/Icons";
import Input from "@/components/Common/Input";
import Select from "@/components/Common/Select";
import { Nft } from "@/types/blockchain.type";
import React, { useState } from "react";
import Modal from "@/components/Common/Modal";
import { useGetAccountIdByUserNameMutation } from "@/api/userApi";
import { useUser } from "@/providers/user.provider";
import Button from "@/components/Common/Button";
import { useTranslate } from "@/providers/translate.provider";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { toast } from "react-toastify";
import DataPicker from "react-datepicker"
import { addMinutes } from "date-fns";
import { useSendNftListingMutation } from "@/api/blockchainApi";

import "react-datepicker/dist/react-datepicker.css";
import { WALLET_REGEX } from "@/constants/app.constants";


const Filters = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onSelectAll,
  selectedNFTs,
  reFetchNFTs,
  onFilter,
  useActions = false,
}: {
  useActions?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearch?: () => void;
  reFetchNFTs?: () => void;
  onSelectAll?: (state: boolean) => void;
  onFilter?: (value: string) => void;
  selectedNFTs?: Nft[];

}) => {
  const listMinTime = addMinutes(new Date(), 5);
  const [openTransferModal, setOpenTransferModal] = useState<boolean>(false);
  const [recipientInput, setRecipientInput] = useState<string>("");
  const { transferNft, giveAllowanceForNFT, listNFT, isLoading, hbarToTinyBar } = useBladeWallet();
  const [fetchUserAccountId, fetchStatus] = useGetAccountIdByUserNameMutation();
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<Date | null>(listMinTime);
  const { userProfile } = useUser();
  const [nftListing] = useSendNftListingMutation();
  const { _t } = useTranslate();

  const transferHandler = async (walletId: string) => {
    try {
      const NFTs: { serialNumber: number, tokenId: string }[] = [];
      selectedNFTs?.forEach((nft) => {
        NFTs.push({ serialNumber: nft.serial_number, tokenId: nft.token_id });
      });
      await transferNft(userProfile?.accountId!, walletId, NFTs);
      toast.success(_t("Success"));
      setOpenTransferModal(false);
      if (reFetchNFTs) {
        reFetchNFTs();
      }
      if (onSelectAll) {
        onSelectAll(false);
      }

    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const allowHandler = async () => {
    try {
      const NFTs: { serialNumber: number, tokenId: string }[] = [];
      selectedNFTs?.forEach((nft) => {
        NFTs.push({ serialNumber: nft.serial_number, tokenId: nft.token_id });
      });
      await giveAllowanceForNFT(userProfile?.accountId!, NFTs);
      toast.success(_t("Allowance success"));
      setIsAllowed(true);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const listHandler = async () => {
    try {
      const NFTs: { serialNumber: number, tokenId: string, priceHBAR: number }[] = [];
      selectedNFTs?.forEach((nft) => {
        NFTs.push({ serialNumber: nft.serial_number, tokenId: nft.token_id, priceHBAR: amount });
      });
      await listNFT(NFTs);
      toast.success(_t("Success"));
      setOpenListModal(false);
      if (reFetchNFTs) {
        reFetchNFTs();
      }
      if (onSelectAll) {
        onSelectAll(false);
      }

      nftListing({
        nfts: selectedNFTs!,
        price: hbarToTinyBar(amount),
        isListed: true,
        listingEndTimestamp: endTime?.getTime()!,
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

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

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 font-inter text-base">
        {useActions &&
          <>
            <Checkbox onChange={(event) => {
              if (onSelectAll) {
                onSelectAll(event.target.checked);
              }
            }} label="Select all" />
            <span className="cursor-pointer"
              onClick={() => {
                if (selectedNFTs?.length) {
                  setOpenListModal(true);
                }
              }}>{_t("List")}</span>
            <span className="cursor-pointer" onClick={() => {
              if (selectedNFTs?.length) {
                setOpenTransferModal(true);
              }
            }}>{_t("Transfer")}</span>
          </>
        }

        <div className="flex gap-6 items-center">
          <Input
            leftAdornment={
              <SearchIcon className="text-placeholder cursor-pointer" onClick={onSearch} />
            }
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery && setSearchQuery(event.target.value)
            }
            onKeyUp={handleSearch}
            placeholder="Genesis SpheraHead..."
          />
          <button className="hover:bg-slate-200 hover:text-orange p-1 rounded-md">
            <GridIcon />
          </button>
          <button className="hover:bg-slate-200 hover:text-orange p-1 rounded-md">
            <BigGridIcon />
          </button>
        </div>
        <div className="flex gap-6 items-center">
          <Select
            options={[
              { label: "All", value: "all" },
              { label: "Listed", value: "listed" }
            ]}
            onChange={(event) => {
              if (onFilter) {
                onFilter(event.target.value || '')
              }
            }}
            label="Status:"
          />
        </div>
      </div>
      <Modal
        show={openListModal}
        onClose={() => {

          setOpenListModal(true);
        }}
      >
        <div className="p-14 flex flex-col text-white">
          <p className="text-[36px] font-semibold">{_t("Batch Listing")}</p>
          <div className="flex flex-col">
            <label className="text-20 pb-4 " htmlFor="amount">{_t("Listing Price")}</label>
            <Input
              name="amount"
              id="amount"
              type="number"
              placeholder={_t("Amount")}
              value={String(amount)}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </div>
          <div className="flex flex-col pt-8">
            <label className="text-20 pb-4" htmlFor="dateEnd">{_t("Chose listing end")}</label>
            <DataPicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              startDate={listMinTime}
              minDate={listMinTime}
              showTimeSelect
              className="w-full bg-sp-gray-600 h-11 border border-none placeholder-neutral-500 text-white text-sm rounded-lg focus:ring-orange-hover focus:border-orange-hover py-2.5 px-4"
            />
          </div>

          <div className="flex flex-col pt-20 gap-y-5">
            <Button
              onClick={() => allowHandler()}
              disabled={isLoading || isAllowed}
              className="rounded-[5px] h-[50px] text-white"
              label={_t("Give Allowance")}
            />
            <Button
              onClick={() => listHandler()}
              disabled={!isAllowed || isLoading}
              className="rounded-[5px] h-[50px] text-white"
              label={_t("List")}
            />
            <Button
              onClick={() => setOpenListModal(false)}
              className="rounded-[5px] h-[50px] text-white bg-red hover:bg-rose-700"
              label={_t("Cancel")}
            />
          </div>
        </div>
      </Modal>
      <Modal
        show={openTransferModal}
        onClose={() => setOpenTransferModal(false)}
      >
        <div className="p-10 flex flex-col text-white">
          <p className="text-[20px] font-semibold">{_t("Batch transfer")}</p>
          <p className="text-16 pt-4">{_t("All of the selected items will be transferred.")}</p>
          <label className="text-16 my-5" htmlFor="recipient">{_t("Recipient")}</label>
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

export default Filters;
