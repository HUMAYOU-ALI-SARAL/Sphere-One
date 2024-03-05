import React, { useState } from "react";
import styles from "../styles.module.scss";
import { useTranslate } from "@/providers/translate.provider";
import AllItems from "./Tabs/AllItems";
import Sphera from "./Tabs/Sphera";
import Collections from "./Tabs/Collections";
import Achievements from "./Tabs/Achievements";
import TransactionHistory from "./Tabs/TransactionHistory";
import Offers from "./Tabs/Offers";
import Bids from "./Tabs/Bids";
import Activity from "./Tabs/Activity";
import { UserProfileType } from "@/types/user.type";
import { useRouter } from "next/router";

interface Tab {
  label: string;
  slug: string;
  component?: React.ReactNode;
}

const Tab = ({
  label,
  active,
  setTab,
}: {
  label: string;
  setTab: () => void;
  active: boolean;
}) => {
  return (
    <p
      className={`cursor-pointer font-dm text-16 pb-2 z-10 ${active ? "text-orange border-b border-orange" : "text-sp-gray-200"
        }`}
      onClick={setTab}
    >
      {label}
    </p>
  );
};

type Props = {
  userProfile: UserProfileType;
  isOwner?: boolean;
};

const ProfileTabs = ({ userProfile, isOwner }: Props) => {
  const { _t } = useTranslate();
  const router = useRouter();
  const tabQuery = router.query.tab as string || null;
  const tabList: Tab[] = [
    {
      label: _t("All Items"),
      slug: "all",
      component: <AllItems userProfile={userProfile} />,
    },
    {
      label: _t("Sphera"),
      slug: "sphera",
      component: <Sphera userProfile={userProfile} isOwner={isOwner} />,
    },
    {
      label: _t("Collections"),
      slug: "collections",
      component: <Collections userProfile={userProfile} />,
    },
    {
      label: _t("Offers"),
      slug: "offers",
      component: <Offers userProfile={userProfile} isOwner={isOwner} />,
    },
    {
      label: _t("Bids"),
      slug: "bids",
      component: <Bids userProfile={userProfile} isOwner={isOwner} />,
    },
    {
      label: _t("Activity"),
      slug: "activity",
      component: <Activity />,
    },
    {
      label: _t("Achievements"),
      slug: "achievements",
      component: <Achievements />,
    },
    {
      label: _t("Transactions"),
      slug: "transactions",
      component: <TransactionHistory userProfile={userProfile} />,
    },
  ];

  let activeTabIndex = 0;

  if(tabQuery) {
    const index = tabList.findIndex((tab) => tab.slug === tabQuery);
    if (index > 0) {
      activeTabIndex = index;
    }
  }

  const [activeTab, setActiveTab] = useState<Tab>(tabList[activeTabIndex]);

  return (
    <div className={`${styles.profileTabs ?? ""} mt-5 flex-1`}>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex space-x-6 border-b border-sp-gray px-8">
          {tabList.map((tab, index) => (
            <Tab
              setTab={() => setActiveTab(tab)}
              key={index}
              label={tab.label}
              active={activeTab.slug === tab.slug}
            />
          ))}
        </div>
        <div className="flex w-full h-full">{activeTab?.component}</div>
      </div>
    </div>
  );
};

export default ProfileTabs;
