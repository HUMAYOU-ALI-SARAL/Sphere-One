"use client";
import UserLayout from "@/pages/layouts/user.layout";
import Header from "@/components/User/Header/Header";
import Footer from "@/components/User/Footer";
import Settings from "@/components/User/Settings/Settings";
import ProfileBanner from "@/components/User/ProfileBanner";
import ProfileTabs from "@/components/User/ProfileTabs/ProfileTabs";
import Slider from "@/components/Slider/Slider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { UserProfileType } from "@/types/user.type";
import { AccountBalanceType } from "@/types/blockchain.type";
import { useGetUserByIdMutation } from "@/api/userApi";
import { useGetAccountBalanceMutation } from "@/api/blockchainApi";

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [accountBalance, setAccountBalance] = useState<AccountBalanceType | null>(null);

  const [fetchUserProfile, { isSuccess: profileSuccess, data: profileData }] = useGetUserByIdMutation();
  const [fetchAccountBalance, { isSuccess: balanceSuccess, data: balanceData }] = useGetAccountBalanceMutation();

  const router = useRouter();
  const userId = router.query.id;

  // useEffect(() => {
  //   if (balanceSuccess && balanceData) {
  //     console.log("balanceData",balanceData);
  //     setAccountBalance(balanceData);
  //   }
  // }, [balanceSuccess]);

  // useEffect(() => {
  //   if (profileSuccess && profileData) {
  //     setUserProfile(profileData);
  //     if (profileData.accountId) {
  //       fetchAccountBalance(profileData.accountId);
  //     }
  //   }
  // }, [profileSuccess, profileData]);

  // useEffect(() => {
  //   if (userId) {
  //     fetchUserProfile(userId);
  //   }
  // }, [userId]);

  return (
    <>
      {userProfile && (
        <UserLayout title="Profile Setting">
          <Header />
          <ProfileBanner
            accountBalance={accountBalance!}
            userProfile={userProfile}
            isEdit={false}
          />
          <div className={`${styles.profileBg}`}>
            <div className="bg-sp-gray w-full" style={{ height: "1px" }}></div>
            <div className="mt-10">
              <Slider />
            </div>
            <div className={`${styles.profileContent ?? ""} flex my-8 border-t border-sp-gray`}>
              <ProfileTabs userProfile={userProfile} />
            </div>
            <Footer />
          </div>
        </UserLayout>
      )}
    </>
  );
}

export const getServerSideProps = async ({
  locale = "en",
}: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
