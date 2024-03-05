"use client";
import Image from "next/image";
import Link from "next/link";
import Language from "../Common/Language";

const Header = () => {
  return (
    <div className="auth-header px-8 pt-8 flex w-full justify-between">
      <Link href="/">
        <Image alt="logo" src="/logo.png" width={136} height={48} />
      </Link>
      <Language />
    </div>
  );
};

export default Header;
