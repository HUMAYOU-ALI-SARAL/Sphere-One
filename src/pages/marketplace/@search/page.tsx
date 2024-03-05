import React from "react";

import Search from "@/components/Marketplace/Search";

const SearchSection = () => {
  return (
    <div className="flex flex-col items-center text-center mobile:w-full xl:w-[70%] xl:mx-auto gap-8">
      <Search />
    </div>
  );
};

export default SearchSection;
