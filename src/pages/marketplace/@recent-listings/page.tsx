import React from "react";

import RecentListings from "@/components/Marketplace/RecentListings";

const RecentListingsSection = () => {
  return (
    <div className="flex flex-col w-full xl:w-[70%] xl:mx-auto gap-8">
      <RecentListings />
    </div>
  );
};

export default RecentListingsSection;
