"use client";
import { useTranslate } from "@/providers/translate.provider";
import Link from "next/link";

const Footer = () => {
  const { _t } = useTranslate();
  return (
      <div className="flex w-100 px-10 pb-6 justify-between font-thin tablet:flex-wrap tablet:justify-start mobile:flex-wrap mobile:justify-start">
          <div className="flex">
              <p className="underline">{_t("© All Rights Reserved 2024 Sphera Inc ltd")}</p>
              <p className="px-6">|</p>
              <p className="underline">{_t("Powered by: Kooora")}</p>
          </div>
          <div className="flex">
              <Link href="#" className="underline mr-10 rtl:ml-10">{_t("Contact us")}</Link>
              <div className="flex">
                  <Link href="#" className="underline">{_t("Privacy policy")}</Link>
                  <p className="px-6">|</p>
                  <Link href="#" className="underline">{_t("Terms of use")}</Link>
              </div>
          </div>
      </div>
  )
}  
export default Footer;
