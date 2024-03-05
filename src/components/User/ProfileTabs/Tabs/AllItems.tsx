import React, { useCallback, useEffect, useState } from "react";
import { useGetNftsMutation } from "@/api/blockchainApi";

import Filters from "./Common/Filters";
import ItemsGrid from "./Common/ItemsGrid";
import NftItem from "@/components/Items/Nft/NftItem";

import { NFT_PAGE_LIMIT } from "@/constants/app.constants";
import { Nft, NftsRequest } from "@/types/blockchain.type";
import { UserProfileType } from "@/types/user.type";

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const AllItems = ({ userProfile }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [getNfts, getNftsStatus] = useGetNftsMutation();

  const handleSearch = () => {
    if (page > 1) {
      setPage(1);
    } else {
      fetchNfts(searchQuery);
    }
  };

  const fetchNfts = useCallback(
    (searchQuery?: string) => {
      setIsLoading(true);
      let query: NftsRequest = {
        accountId: userProfile?.accountId,
        page,
        pageSize: NFT_PAGE_LIMIT,
        searchQuery,
      };
      if (filter && filter === 'listed') {
        query = { ...query, isMarketListed: true };
      }
      getNfts(query)
        .unwrap()
        .then((response) => {
          const { isLastPage, nfts } = response;
          setNfts(nfts);
          setIsLastPage(isLastPage);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [page, filter]
  );

  useEffect(() => {
    fetchNfts();
  }, [page, filter]);

  return (
    <div className="flex flex-col w-full h-full px-8 gap-6">
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onFilter={setFilter}
      />
      <ItemsGrid
        isLoading={isLoading || getNftsStatus.isLoading}
        page={page}
        setPage={setPage}
        isLastPage={isLastPage}
        pagination
      >
        {nfts.length > 0 &&
          nfts.map((nft) => (
            <NftItem key={`${nft.token_id}-${nft.serial_number}`} nft={nft} />
          ))}
      </ItemsGrid>
    </div>
  );
};

export default AllItems;
