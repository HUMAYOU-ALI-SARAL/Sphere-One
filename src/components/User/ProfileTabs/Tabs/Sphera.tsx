import React, { useCallback, useEffect, useState } from "react";
import { useGetNftsMutation } from "@/api/blockchainApi";

import NftItem from "@/components/Items/Nft/NftItem";
import Filters from "./Common/Filters";
import ItemsGrid from "./Common/ItemsGrid";

import { Nft, NftsRequest } from "@/types/blockchain.type";
import { MIRROR_NODE_REFRESH_TIME, NFT_PAGE_LIMIT, SPHERA_WORLD } from "@/constants/app.constants";
import { UserProfileType } from "@/types/user.type";

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const Sphera = ({ userProfile, isOwner }: Props) => {

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

  const selectAllHandler = (state: boolean) => {
    const newNFTs: Nft[] = []
    nfts.forEach((item) => {
      const clone = { ...item };
      clone.checked = state;
      newNFTs.push(clone);
    })
    setNfts(newNFTs);
  };

  const nftSelectHandler = (tokenId: string, serial: number, state: boolean) => {
    const newNFTs: Nft[] = []
    nfts.forEach((item) => {
      const clone = { ...item };
      if (clone.token_id === tokenId && clone.serial_number === serial) {
        clone.checked = state;
      }
      newNFTs.push(clone);
    })
    setNfts(newNFTs);
  };

  const reFetchNFTs = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchNfts();
    }, MIRROR_NODE_REFRESH_TIME);
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
          const newNFTs: Nft[] = []
          nfts.forEach((item) => {
            const clone = { ...item };
            clone.checked = false;
            newNFTs.push(clone);
          })
          setNfts(newNFTs);
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
        onSelectAll={(state) => selectAllHandler(state)}
        selectedNFTs={nfts.filter((item) => item.checked)}
        reFetchNFTs={reFetchNFTs}
        useActions={isOwner}
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
            <NftItem
              useSelect={isOwner}
              onChange={(state) => nftSelectHandler(nft.token_id, nft.serial_number, state)}
              isChecked={nft.checked}
              key={`${nft.token_id}-${nft.serial_number}`}
              nft={nft}
            />
          ))}
      </ItemsGrid>
    </div>
  );
};

export default Sphera;
