"use client";
import React, { useCallback, useEffect, useState } from "react";
import UserLayout from "../layouts/user.layout";
import Footer from "@/components/Marketplace/Footer";
import Header from "@/components/User/Header/Header";
import { useRouter } from "next/router";
import { useTranslate } from "@/providers/translate.provider";
import Input from "@/components/Common/Input";
import { SearchIcon } from "@/components/Common/Icons";
import Select from "@/components/Common/Select";
import { useGetNftsMutation } from "@/api/blockchainApi";
import { Nft, NftRequestTypes } from "@/types/blockchain.type";
import Pagination from "@/components/Common/Pagination";
import NftItem from "@/components/Items/Nft/NftItem";
import Loader from "@/components/Common/Loader";
import NoItems from "@/components/Common/NoItems";
import { useUser } from "@/providers/user.provider";

const SearchPage = () => {
  const router = useRouter();
  const searchQueryString = router.query.q as string || "";

  const { _t } = useTranslate();
  const [getNfts] = useGetNftsMutation();
  const { globalSearch } = useUser();

  const searchFilters = [
    {
      label: _t("Recently listed"),
      value: NftRequestTypes.RECENT_LISTINGS
    },
  ];

  const [query, setQuery] = useState<string>(searchQueryString);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [filter, setFilter] = useState<NftRequestTypes>(searchFilters[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleSearch = (searchQuery?: string) => {
    if (page > 1) {
      setPage(1);
    } else {
      fetchNfts(searchQuery);
    }
  }

  const fetchNfts = useCallback(
    (searchQuery?: string) => {
      setIsLoading(true);
      getNfts({
        page,
        pageSize: 8,
        searchQuery: searchQuery || query,
        type: filter,
      })
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
    [page, query, filter]
  );

  useEffect(() => {
    fetchNfts();
  }, [page]);

  useEffect(() => {
    if (globalSearch.length) {
      setQuery(globalSearch);
      handleSearch(globalSearch);
    }
  }, [globalSearch]);


  return (
    <UserLayout title={_t("Search")}>
      <Header />
      <div className="p-20">
        <p className="text-[32px]">{_t("Sphera Marketplace")}</p>
        <div className="pt-6 flex w-full flex-wrap items-center justify-between gap-3">
          <Input
            containerClass="w-2/3 mobile:w-full max-w-[658px]"
            placeholder={_t("Genesis SpheraHead...")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                handleSearch();
              }
            }}
            leftAdornment={
              <SearchIcon
                className="text-placeholder"
              />
            }
          />
          <Select
            options={searchFilters}
            onChange={(event) => setFilter(event.target.value as NftRequestTypes)}
          />
        </div>
        <div className="pt-16">
          <Pagination page={page} setPage={setPage} isLastPage={isLastPage} />
        </div>
        <div className="relative pt-16 flex items-center justify-center w-full">
          {isLoading
            ? <Loader />
            : <div className="relative flex flex-wrap gap-6 items-center w-full max-w-7xl">
              {nfts.length > 0 &&
                nfts.map((nft) => (
                  <NftItem key={`${nft.token_id}-${nft.serial_number}`} nft={nft} />
                ))
              }
            </div>
          }
        </div>
        {!nfts.length && !isLoading &&
          <div className="my-10">
            <NoItems />
          </div>
        }
      </div>
      <Footer />
    </UserLayout>
  );
};

export default SearchPage;
