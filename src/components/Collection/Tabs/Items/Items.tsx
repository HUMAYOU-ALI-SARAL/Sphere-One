"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslate } from "@/providers/translate.provider";
import Sidebar, { SidebarFiltersType } from "./Sidebar";
import Filters from "@/components/User/ProfileTabs/Tabs/Common/Filters";
import { Nft, NftCollection, NftsRequest } from "@/types/blockchain.type";
import { useGetNftsMutation } from "@/api/blockchainApi";
import ItemsGrid from "@/components/User/ProfileTabs/Tabs/Common/ItemsGrid";
import NftItem from "@/components/Items/Nft/NftItem";
import NoItems from "@/components/Common/NoItems";

const Tab = ({
    label,
    active,
    setTab,
}: {
    label: string;
    setTab: () => void;
    active: boolean;
}) => {
    return (
        <p
            className={`min-w-14 text-center cursor-pointer font-dm text-16 pb-2 z-10 text-white ${active ? " border-b border-white" : ""
                }`}
            onClick={setTab}
        >
            {label}
        </p>
    );
};

interface IItems {
    collection: NftCollection;
};

const Items = ({ collection }: IItems) => {
    const { _t } = useTranslate();
    const [getNfts] = useGetNftsMutation();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(true);
    const [sidebarFilters, setSidebarFilters] = useState<SidebarFiltersType>();
    const tabList = [
        {
            label: _t("All"),
            slug: "all",
        },
        {
            label: _t("For sale"),
            slug: "sale",
        },
        {
            label: _t("Live auctions"),
            slug: "live",
        },
    ];
    const [activeTab, setActiveTab] = useState(tabList[0]);

    const fetchNfts = useCallback(
        (searchQuery?: string) => {
            setIsLoading(true);
            let query: NftsRequest = {
                page,
                pageSize: 16,
                searchQuery,
                tokenId: collection?.token_id,
                //sidebarFilters,
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
        [page, filter, collection, sidebarFilters]
    );

    const handleSearch = () => {
        if (page > 1) {
            setPage(1);
        } else {
            fetchNfts(searchQuery);
        }
    };

    useEffect(() => {
        fetchNfts();
    }, [collection, filter, sidebarFilters]);

    return (
        <div className="flex w-full mb-20 min-h-[895px]">
            {/* <Sidebar isLoading={isLoading} collection={collection} onChange={setSidebarFilters} /> */}
            <div className="mt-5 flex flex-grow flex-col">
                <div className="flex space-x-6 border-b border-sp-gray px-8 w-full">
                    {tabList.map((tab, index) => (
                        <Tab
                            setTab={() => setActiveTab(tab)}
                            key={index}
                            label={tab.label}
                            active={activeTab.slug === tab.slug}
                        />
                    ))}
                </div>
                <div className="mt-5 px-8 w-full"> {/* max-w-[1268px] */}
                    <div className="flex justify-end pr-1">
                        <Filters
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                            onFilter={setFilter}
                        />
                    </div>
                    <div className="mt-10">
                        <ItemsGrid
                            isLoading={isLoading}
                            page={page}
                            setPage={setPage}
                            isLastPage={isLastPage}
                            pagination
                        >
                            {nfts.length > 0 &&
                                nfts.map((nft) => (
                                    <NftItem
                                        key={`${nft.token_id}-${nft.serial_number}`}
                                        nft={nft}
                                    />
                                ))}
                        </ItemsGrid>
                        {!nfts.length && !isLoading &&
                            <div className="my-10">
                                <NoItems />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Items;