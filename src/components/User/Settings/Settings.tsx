'use client'

import { useTranslate } from "@/providers/translate.provider";
import { useState } from "react";
import DetailTab from "./DetailTab";
import PasswordTab from "./PasswordTab";
import { useUser } from "@/providers/user.provider";

type TabProps = {
    label: string,
    setTab: (slug: string) => void,
    slug: string,
    active: boolean
};

const Tab = ({ label, slug, active, setTab }: TabProps) => {
    return (
        <p className={`cursor-pointer font-dm ${active ? "text-orange" : "text-sp-gray-200"}`} onClick={() => setTab(slug)}>{label}</p>
    )
}

const Settings = () => {
    const { _t } = useTranslate();
    const tabList = [
        {
            label: _t("My details"),
            slug: 'detail'
        },
        {
            label: _t("Password"),
            slug: 'password'
        },
        {
            label: _t("Notifications"),
            slug: 'notifications'
        },
    ];

    const [activeTab, setActiveTab] = useState<string>(tabList[0].slug);
    const { userProfile } = useUser();

    return (
        <div className="flex w-full p-20 flex-col">
            <div className="flex space-x-10 mb-14">
                {tabList.map((value, index) => (
                    <Tab
                        setTab={setActiveTab}
                        key={index}
                        label={value.label}
                        slug={value.slug}
                        active={activeTab === value.slug}
                    />
                ))}
            </div>
            <div>
                {activeTab === 'detail' && userProfile && <DetailTab userProfile={userProfile} />}
                {activeTab === 'password' && <PasswordTab />}
            </div>
        </div>
    )
}
export default Settings;