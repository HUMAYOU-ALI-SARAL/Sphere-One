import React, { useCallback, useEffect, useState } from "react";
import { useGetCollectionsMutation } from "@/api/blockchainApi";

import Filters from "./Common/Filters";
import ItemsGrid from "./Common/ItemsGrid";
import CollectionItem from "@/components/Items/Collection/CollectionItem";

import { NFT_PAGE_LIMIT } from "@/constants/app.constants";
import { NftCollection } from "@/types/blockchain.type";
import { UserProfileType } from "@/types/user.type";

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const Collections = ({ userProfile }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [collections, setCollections] = useState<NftCollection[]>([]);

  const [getCollections, getCollectionsStatus] = useGetCollectionsMutation();

  const handleSearch = () => {
    if (page > 1) {
      setPage(1);
    } else {
      fetchCollections(searchQuery);
    }
  };

  const fetchCollections = useCallback(
    (searchQuery?: string) => {
      setIsLoading(true);
      getCollections({
        accountId: userProfile?.accountId,
        page,
        pageSize: NFT_PAGE_LIMIT,
        searchQuery,
      })
        .unwrap()
        .then((response) => {
          const { isLastPage, collections } = response;
          setCollections(collections);
          setIsLastPage(isLastPage);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [page]
  );

  useEffect(() => {
    fetchCollections();
  }, [page]);

  return (
    <div className="flex flex-col w-full h-full px-8 gap-6">
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <ItemsGrid
        isLoading={isLoading || getCollectionsStatus.isLoading}
        page={page}
        setPage={setPage}
        isLastPage={isLastPage}
        pagination
      >
        {collections.length > 0 &&
          collections.map((collection) => (
            <CollectionItem
              key={`${collection.token_id}`}
              collection={collection}
            />
          ))}
      </ItemsGrid>
    </div>
  );
};

export default Collections;
