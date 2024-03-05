import React from "react";

import { useUser } from "@/providers/user.provider";
import UserLayout from "../layouts/user.layout";
import Header from "@/components/User/Header/Header";
import SearchSection from "./@search/page";
import CategoriesSection from "./@categories/page";
import HeroSliderSection from "./@hero-slider/page";
import PhygitalGoodsSection from "./@phygital-goods/page";
import HotAuctionsSection from "./@hot-auctions/page";
import RecentListingsSection from "./@recent-listings/page";
import Footer from "@/components/Marketplace/Footer";
import UpcomingCollectionsSection from "./@upcoming-collections/page";
import Subscribe from "@/components/Marketplace/Subscribe";
import Featured from "@/components/Marketplace/Featured";
import SliderSection from "./@slider/page";

const Marketplace = () => {
  const { userProfile } = useUser();

  return (
    <>
      {userProfile && (
        <UserLayout title="Marketplace">
          <Header />
          <HeroSliderSection />
          <div className="flex flex-col w-full mt-12 px-10 gap-12 items-center justify-center">
            <SearchSection />
            <CategoriesSection />
            <SliderSection />
            {/* <UpcomingCollectionsSection /> */}
            <div className="flex items-center w-full justify-center flex-col max-w-[1200px]">
              {/* <PhygitalGoodsSection /> */}
              <span className="text-[50px] uppercase font-bold text-center">
                Coming soon
              </span>
              {/* <HotAuctionsSection /> */}
              <RecentListingsSection />
            </div>
            <Subscribe />
          </div>
          <Featured />
          <Footer />
        </UserLayout>
      )}
    </>
  );
};

export default Marketplace;
