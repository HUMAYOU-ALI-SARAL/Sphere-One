import React, { useState } from "react";

import Image from "next/image";
import Input from "@/components/Common/Input";
import { SearchIcon } from "@/components/Common/Icons";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (key: string) => {
    if (key === 'Enter') {
      router.push(`/marketplace/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col max-w-[1024px]">
        <Image alt="logo" src="/logo_xl.png" width={416} height={177} />
        <span className="font-actor text-[45px]">Collect. Connect. Thrive.</span>
        <span className="font-actor text-[25px]">
          Dive into the world of football NFTs, where you can discover iconic
          moments, exclusive collectibles, phygital memorabilia and even match day
          tickets. Join the game-changing marketplace that brings your favourite
          sport closer to you than ever before.
        </span>
      </div>
      <Input
        containerClass="w-2/3 mobile:w-full max-w-[660px]"
        placeholder="Search the marketplace"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyUp={(event) => handleSearch(event.key)}
        leftAdornment={
          <SearchIcon
            className="text-placeholder cursor-pointer"
            onClick={() => router.push(`/marketplace/search?q=${searchQuery}`)}
          />
        }
      />
    </>
  );
};

export default Search;
