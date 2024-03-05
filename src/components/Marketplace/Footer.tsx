"use client";
import { useTranslate } from "@/providers/translate.provider";
import Image from "next/image";
import Link from "next/link";
import {
  DiscordFilledIcon,
  FacebookFilledIcon,
  InstagramFilledIcon,
  TelegramFilledIcon,
  TwitterFilledIcon,
} from "../Common/Icons";

const Footer = () => {
  const { _t } = useTranslate();

  return (
    <div className="flex flex-col w-full py-6 gap-8 px-10 mt-auto">
      <div className="flex justify-between items-end font-extralight text-xl mobile:flex-wrap">
        <div className="flex flex-col">
          <Image alt="logo" src="/logo.png" width={136} height={48} />
          <span>{_t("The digital collectibles ecosystem")}</span>
          <span>{_t("providing new experiences for sports fans.")}</span>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <Link href="#">{_t("Privacy policy")}</Link>
            <Link href="#">{_t("Terms of service")}</Link>
          </div>
          <div className="flex flex-col">
            <Link href="#">{_t("About Us")}</Link>
            <Link href="#">{_t("Contact Us")}</Link>
          </div>
          <div className="flex flex-col">
            <Link href="#">{_t("News")}</Link>
            <Link href="#">{_t("FAQs")}</Link>
          </div>
        </div>
      </div>
      <div className="bg-white-50 h-[1px ] w-full"></div>
      <div className="flex w-full justify-between font-thin tablet:flex-wrap tablet:justify-start mobile:flex-wrap mobile:justify-start">
        <div className="flex">© Sphera 2023. All rights reserved.</div>
        <div className="flex items-center gap-6 mobile:flex-wrap">
          <span>Follow us</span>
          <FacebookFilledIcon />
          <TwitterFilledIcon />
          <InstagramFilledIcon />
          <TelegramFilledIcon />
          <DiscordFilledIcon />
        </div>
      </div>
    </div>
  );
};
export default Footer;
