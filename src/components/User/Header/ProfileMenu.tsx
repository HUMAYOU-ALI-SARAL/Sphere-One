"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuClock4 as ClockIcon } from "react-icons/lu";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useUser } from "@/providers/user.provider";
import RefreshIcon from "@/public/icons/refresh.png";
import ProfileAvatar from "@/public/img/profile/default-avatar.png";
import styles from "../styles.module.scss";
import { numberWithCommas } from "@/utils/common";
import { useTranslate } from "@/providers/translate.provider";
import { BsCurrencyDollar as TopUpIcon } from "react-icons/bs";


const menuItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: <ClockIcon size={20} />,
    classNames: "",
  },
  {
    title: "Transaction history",
    url: "/profile?tab=transactions",
    icon: <ClockIcon size={20} />,
    classNames: "",
  },
  {
    title: "Settings",
    url: "/profile?edit=true",
    icon: <SettingsIcon size={20} />,
    classNames: "",
  },
];

const DropDown = ({ isShowed }: { isShowed: boolean }) => {
  const { _t } = useTranslate();
  const [show, setShow] = useState<boolean>(false);
  const { logOut, setOpenMoonPay } = useUser();

  return (
    <div
      className={`${styles.dropdown ?? ""} ${show || isShowed ? "visible" : "invisible"
        }`}
      onMouseOver={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <div className="p-6 space-y-5">
        <div
          className="flex hover:bg-neutral-600 cursor-pointer"
          onClick={() => setOpenMoonPay(true)}
        >
          <TopUpIcon size={20} />
          <span className="ml-2">{_t("Top UP")}</span>
        </div>
        {menuItems.map((value, index) => (
          <Link
            href={value.url}
            key={index}
            className="flex hover:bg-neutral-600"
          >
            {value.icon}
            <span className="ml-2">{value.title}</span>
          </Link>
        ))}
        <div
          className="flex hover:bg-neutral-600 cursor-pointer"
          onClick={() => {
            logOut();
          }}
        >
          <LogoutIcon size={20} color="#FF5E5E" />
          <span className="text-red-500 ml-2">{_t("Log out")}</span>
        </div>
      </div>
    </div>
  );
};

const ProfileMenu = () => {
  const { userProfile, accountBalance, refreshAccountBalance, isBalanceLoading } = useUser();
  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      className="relative w-60 h-11 bg-sp-gray rounded-xl flex items-center px-2"
      onMouseOver={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <Image
        className={`cursor-pointer ${ isBalanceLoading && 'animate-spin' }`}
        onClick={() => refreshAccountBalance()}
        alt="refresh"
        src={RefreshIcon}
      />
      <div className="text-neutral-500 font-normal text-base ml-3">
        <span>
          {accountBalance?.hbarBalance && numberWithCommas(Math.round(accountBalance.hbarBalance * Math.pow(10, 2)) / Math.pow(10, 2))}
        </span>
        <span className="ml-1">HBAR</span>
      </div>

      <Image
        alt="avatar"
        className="absolute -right-1 rounded-full"
        style={{ width: "50px", height: "50px" }}
        src={
          userProfile?.profileImgUrl
            ? process.env.NEXT_PUBLIC_BACKEND_URL + userProfile.profileImgUrl
            : ProfileAvatar.src
        }
        width={50}
        height={50}
        quality={100}
      />
      <DropDown isShowed={show} />
    </div>
  );
};

export default ProfileMenu;
