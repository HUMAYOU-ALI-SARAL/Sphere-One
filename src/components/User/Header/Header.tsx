"use client";

import Image from "next/image";
import Link from "next/link";
import SphereLogo from "public/solo-logo.png";
import styles from "../styles.module.scss";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/providers/user.provider";

const navLinks = [
  {
    title: "Marketplace",
    url: "/marketplace",
  },
  {
    title: "Sphera Token",
    url: "#",
  },
  {
    title: "INO",
    url: "#",
  },
  {
    title: "FAQ",
    url: "#",
  },
  {
    title: "Community",
    url: "#",
  },
  {
    title: "Docs",
    url: "#",
  },
];

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setGlobalSearch } = useUser();

  const handleSearch = (key: string) => {
    if (key === 'Enter') {
      setGlobalSearch(searchQuery);
      router.push(`/marketplace/search?q=${searchQuery}` );
    }
  };
  return (
    <nav className={`px-10 ${styles.navbar} flex p-4 items-center z-[9999] relative`}>
      <Link href="/" className="mr-5 rtl:ml-5">
        <Image src={SphereLogo.src} alt="logo" width={55} height={58}></Image>
      </Link>
      <div
        className={`w-full flex flex-wrap items-center justify-between px-4 space-y-2`}
      >
        <input
          type="text"
          value={searchQuery}
          onKeyUp={(event) => handleSearch(event.key)}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="bg-sp-gray h-11 border border-gray-300 placeholder-neutral-500 text-white text-sm rounded-lg focus:ring-orange-hover focus:border-orange-hover p-2.5"
          placeholder="Search NFT Collections and Collectors"
        ></input>

        <div className="flex gap-x-8 mobile:flex-wrap">
          {navLinks.map((value, index: number) => (
            <Link
              className={`${styles.navbarLink}`}
              key={index}
              href={value.url}
            >
              {value.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <ProfileMenu />
          {/* <span className="ml-12 cursor-pointer">العربية</span> */}
        </div>
      </div>
    </nav>
  );
};
export default Header;
