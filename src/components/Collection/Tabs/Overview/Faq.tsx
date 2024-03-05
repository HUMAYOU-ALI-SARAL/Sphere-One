import { useTranslate } from "@/providers/translate.provider";
import React from "react";
import Faq from "react-faq-component";
import { MdKeyboardArrowRight as ExpandIcon } from "react-icons/md";
import { MdKeyboardArrowUp as CollapseIcon } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import styles from "../../styles.module.scss";

const parentStyles = {
  bgColor: 'transparent',
  rowTitleColor: "white",
  rowContentColor: 'grey',
  arrowColor: "#fff",
  rowContentPaddingLeft: '10px',
};

const childStyles = {
  bgColor: 'transparent',
  rowTitleColor: "white",
  rowContentColor: 'grey',
  arrowColor: "#fff",
  rowContentPaddingLeft: '20px',
  rowContentPaddingTop: '20px',
  rowContentPaddingBottom: '20px',
};


const parentConfig = {
  animate: false,
  expandIcon: <ExpandIcon size={24} />,
  collapseIcon: <CollapseIcon size={24} />,
};

const childConfig = {
  animate: false,
  expandIcon: <HiPlus size={20} />,
  collapseIcon: <HiMinus size={20} />,
};


const SpheraFaq = () => {
  const { _t } = useTranslate();

  const educationData = {
    rows: [
      {
        title: `${_t("What is an NFT ?")}`,
        content: `${_t("Non-fungible tokens (NFTs) are unique identifiers that use blockchain technology to assign and prove ownership of a digital good. NFTs are stored in digital asset wallets, like Coinbase Wallet or MetaMask.")}`,
      },
      {
        title: `${_t("What is a wallet ?")}`,
        content: `${_t("Non-fungible tokens (NFTs) are unique identifiers that use blockchain technology to assign and prove ownership of a digital good. NFTs are stored in digital asset wallets, like Coinbase Wallet or MetaMask.")}`,

      },
      {
        title: `${_t("What does it mean to mint an NFT ?")}`,
        content: `${_t("Non-fungible tokens (NFTs) are unique identifiers that use blockchain technology to assign and prove ownership of a digital good. NFTs are stored in digital asset wallets, like Coinbase Wallet or MetaMask.")}`,

      },
      {
        title: `${_t("What happens after I mint an NFT ?")}`,
        content: `${_t("Non-fungible tokens (NFTs) are unique identifiers that use blockchain technology to assign and prove ownership of a digital good. NFTs are stored in digital asset wallets, like Coinbase Wallet or MetaMask.")}`,

      },
      {
        title: `${_t("What is 'Private Key' or 'Seed Phrase' ?")}`,
        content: `${_t("Non-fungible tokens (NFTs) are unique identifiers that use blockchain technology to assign and prove ownership of a digital good. NFTs are stored in digital asset wallets, like Coinbase Wallet or MetaMask.")}`,

      },
    ],
  };

  const parentData = {
    rows: [
      {
        title: `${_t("General")}`,
        content: "",
      },
      {
        title: `${_t("SpheraHeads")}`,
        content: "",
      },
      {
        title: `${_t("Education")}`,
        content: <Faq
          data={educationData}
          styles={childStyles}
          config={childConfig}
        />,
      },
    ],
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center pt-14 flex-col border-t-[1px] border-sp-gray-900">
      <div className="max-w-[1284px] flex justify-between w-full">
        <div>
          <p className={`${styles.faqTitle} max-w-[458px]`}>{_t("Frequently Asked Questions")}</p>
          <p className="font-actor text-24font-normal mt-5">{_t("We are here to help")}</p>
        </div>
        <div className={`sphera-faq max-w-[672px] w-full`}>
          <Faq
            data={parentData}
            styles={parentStyles}
            config={parentConfig}
          />
        </div>
      </div>
      <div className={`${styles.faqFooter} h-[564px]`}></div>
    </div>
  );
};

export default SpheraFaq;
