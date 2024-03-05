"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/providers/user.provider";
import UserLayout from "@/pages/layouts/user.layout";
import Header from "@/components/User/Header/Header";
import Footer from "@/components/User/Footer";

import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { kFormatter, numberWithCommas } from "@/utils/common";

import InternetIcon from "@/public/icons/internet.png";
import TwitterIcon from "@/public/icons/twitter.png";
import TelegramIcon from "@/public/icons/telegram.png";
import ShareIcon from "@/public/icons/share.png";
import DiscordIcon from "@/public/icons/discord.png";


import { useTranslate } from "@/providers/translate.provider";
import Overview from "@/components/Collection/Tabs/Overview/Overview";
import Items from "@/components/Collection/Tabs/Items/Items";
import { useRouter } from "next/router";

import styles from "./styles.module.scss"
import { useGetCollectionsMutation } from "@/api/blockchainApi";
import { NftCollection } from "@/types/blockchain.type";
import Loader from "@/components/Common/Loader";

const socialLinks = [
  {
    name: 'intrenet',
    icon: InternetIcon,
    url: '#'
  },
  {
    name: 'twitter',
    icon: TwitterIcon,
    url: '#'
  },
  {
    name: 'discord',
    icon: DiscordIcon,
    url: '#',
    width: 36,
  },
  {
    name: 'telegram',
    icon: TelegramIcon,
    url: '#'
  },
  {
    name: 'share',
    icon: ShareIcon,
    url: '#'
  },
];

interface Tab {
  label: string;
  slug: string;
  component?: React.ReactNode;
}

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
      className={`cursor-pointer text-18 font-thin sp-gray-950 px-5 py-3 ${active ? "rounded-[5px] bg-sp-gray-600" : ""
        }`}
      onClick={setTab}
    >
      {label}
    </p>
  );
};

const CollectionPage = () => {
  const { _t } = useTranslate();
  const router = useRouter();
  const collectionId = router.query.id as string;
  const tab = router.query.tab as string;
  const [collection, setCollection] = useState<NftCollection>();

  const [getCollections, { isLoading }] = useGetCollectionsMutation();

  const fetchCollections = () => {
    getCollections({
      pageSize: 1,
      tokenId: collectionId!,
    })
      .unwrap()
      .then((response) => {
        const { collections } = response;
        if (collections.length) {
          setCollection(collections[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCollections();
  }, [collectionId]);

  const tabList: Tab[] = [
    /* {
      label: _t("Overview"),
      slug: "overview",
    }, */
    {
      label: _t("Items"),
      slug: "items",
    },
    /* {
      label: _t("Statistics"),
      slug: "statistics",
    },
    {
      label: _t("Activity"),
      slug: "Activity",
    }, */
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabList[0]);

  useEffect(() => {
    if (tab) {
      tabList.forEach((item, index) => {
        if (item.slug == tab) {
          setActiveTab(tabList[index]);
        }
      })
    }
  }, [tab]);

  return (
    <UserLayout title="Spheraheads" useBg={false}>
      <Header />
      <div className="relative h-full flex flex-grow flex-col">
        { !collection || isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={`${styles.bg} w-full`}>
              <div className="relative w-full h-[770px] flex items-start justify-end px-[40px] flex-col border-b-[1px] border-sp-gray-650">
                <div className="w-full">
                  <img src="/img/collection/spheraheads/avatar.png" alt="spheraheads" className="max-w-[109px]" />
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex">
                        <p className="text-[32px] font-bold py-4">{collection.name} {_t("Collection")}</p>
                        {/* <div className="flex items-center space-x-4 px-10">
                          {socialLinks.map((link, index: number) => (
                            <Link href={link.url} key={index}>
                              <Image src={link.icon} alt={link.name} width={link.width || 30} />
                            </Link>
                          ))}
                        </div> */}
                      </div>
                      {/* <p className="text-[16px] font-extralight max-w-[370px]">
                        {_t("Lorem ipsum dolor sit amet consectetur. Viverra duis amet tellus mauris tincidunt habitant consectetur.")}
                      </p> */}
                      {/* <div className="flex mt-5 text-[16px] gap-3 font-inter whitespace-nowrap 2xl:flex-wrap">
                        <div className="flex space-x-3">
                          <p className="font-normal">{_t("Total items:")}</p>
                          <p className="font-medium">{kFormatter(collection?.max_supply || 0)}</p>
                        </div>
                        <div className="flex space-x-3">
                          <p className="font-normal">{_t("Created:")}</p>
                          <p className="font-medium">{format(new Date(collection?.created_timestamp! || 0), "LLL u")}</p>
                        </div>
                        <div className="flex space-x-3">
                          <p className="font-normal">{_t("Royalties:")}</p>
                          <p className="font-medium">{collection?.royalty_fee! * 100 || 0}%</p>
                        </div>
                        <div className="flex space-x-3">
                          <p className="font-normal">{_t("Chain:")}</p>
                          <p className="font-medium">Hedera</p>
                        </div>
                      </div> */}
                      <div className="flex space-x-2 py-5 items-center">
                        {tabList.map((tab, index) => (
                          <Tab
                            setTab={() => setActiveTab(tab)}
                            key={index}
                            label={tab.label}
                            active={activeTab.slug === tab.slug}
                          />
                        ))}
                      </div>
                    </div>
                   {/*  <div className="flex gap-10 pt-10 whitespace-nowrap 2xl:flex-wrap pl-5 rtl:pr-5">
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-sp-gray-100 text-[22px]">{_t("Total Volume")}</p>
                        <p className="text-[32px] text-white font-bold">{numberWithCommas(collection?.total_supply || 0)}</p>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-sp-gray-100 text-[22px]">{_t("Floor Price")}</p>
                        <p className="text-[32px] text-white font-bold">{collection?.floor_price || 169}</p>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-sp-gray-100 text-[22px]">{_t("Best Offer")}</p>
                        <p className="text-[32px] text-white font-bold">{collection?.best_offer || 134}</p>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-sp-gray-100 text-[22px]">{_t("Listed")}</p>
                        <p className="text-[32px] text-white font-bold">{collection?.listed || 17}%</p>
                      </div>
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-sp-gray-100 text-[22px]">{_t("Owners")}</p>
                        <p className="text-[32px] text-white font-bold">{collection?.owners || 6678}</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {activeTab.slug === 'overview' &&
                <Overview collection={collection} />
              }
              {activeTab.slug === 'items' &&
                <Items collection={collection} />
              }
            </div>
          </>
        )}
      </div>
      <Footer />
    </UserLayout>
  );
};

export default CollectionPage;