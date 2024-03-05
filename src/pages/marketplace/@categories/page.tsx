import React from "react";

import Categories from "@/components/Marketplace/Categories";

const CategoriesSection = () => {
  return (
    <div className="flex flex-col items-center text-center w-full xl:w-[80%] xl:mx-auto gap-8">
      <Categories />
    </div>
  );
};

export default CategoriesSection;
