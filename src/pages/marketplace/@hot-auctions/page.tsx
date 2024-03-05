import React from "react";

import HotAuctions from "@/components/Marketplace/HotAuctions";

const HotAuctionsSection = () => {
  return (
    <div className="flex flex-col mobile:w-full xl:w-[70%] xl:mx-auto gap-8">
      <HotAuctions />
    </div>
  );
};

export default HotAuctionsSection;
