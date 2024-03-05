import React, { useEffect, useState } from "react";
import { useGetCollectionsMutation } from "@/api/blockchainApi";

import Button from "../Common/Button";
import Loader from "../Common/Loader";
import CollectionItem from "../Items/Collection/CollectionItem";

import { NftCollection } from "@/types/blockchain.type";

const UpcomingCollections = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<NftCollection[]>([]);

  const [getCollections, getCollectionsStatus] = useGetCollectionsMutation();

  const fetchCollections = () => {
    setIsLoading(true);
    getCollections({
      pageSize: 3,
    })
      .unwrap()
      .then((response) => {
        const { collections } = response;
        setCollections(collections);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <span className="text-[32px]">Upcoming Collections</span>
        <Button
          className="bg-sp-gray-600 text-white rounded-[5px]"
          label="See all"
        />
      </div>
      <div className="relative flex gap-6 mobile:flex-col mobile:flex-wrap">
        {collections.slice(0, 3).map((collection) => (
          <CollectionItem
            key={collection.token_id}
            collection={collection}
            height={507}
            width="33%"
            action={
              <Button className="text-white rounded-[5px]" label="Whitelist" />
            }
          />
        ))}
        {(isLoading || getCollectionsStatus.isLoading) && <Loader />}
      </div>
    </>
  );
};

export default UpcomingCollections;
