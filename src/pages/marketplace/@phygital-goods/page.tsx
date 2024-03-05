import React from "react";

import PhygitalGoods from "@/components/Marketplace/PhygitalGoods";

const PhygitalGoodsSection = () => {
  return (
    <div className="flex flex-col mobile:w-full xl:w-[70%] xl:mx-auto gap-8">
      <PhygitalGoods />
    </div>
  );
};

export default PhygitalGoodsSection;
