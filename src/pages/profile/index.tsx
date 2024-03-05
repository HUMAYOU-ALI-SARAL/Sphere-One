"use client";
import UserLayout from "@/pages/layouts/user.layout";
import Header from "@/components/User/Header/Header";
import Footer from "@/components/User/Footer";
import Settings from "@/components/User/Settings/Settings";
import ProfileBanner from "@/components/User/ProfileBanner";
import ProifileSidebar from "@/components/User/ProfileSidebar/ProfileSidebar";
import ProfileTabs from "@/components/User/ProfileTabs/ProfileTabs";
import Slider from "@/components/Slider/Slider";
import { useUser } from "@/providers/user.provider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";
import { useRouter } from "next/router";
import Loader from "@/components/Common/Loader";
import styles from "./styles.module.scss";
import { useGetAccountBalanceMutation } from "@/api/blockchainApi";
import { useEffect } from "react";

export default function SettingsPage() {
  const { userProfile, accountBalance } = useUser();

  const [fetchAccountBalance, { isSuccess: balanceSuccess, data: balanceData }] = useGetAccountBalanceMutation();
  const router = useRouter();
  const isEdit = !!router.query.edit;

  useEffect(() => {
    // const account = localStorage.getItem('walletAccount');
    // if (account) {
    //   console.log(JSON.parse(account));
    // }
  }, []);

  // const refreshAccountBalance = async () => {
  //   if (userProfile?.accountId && !isBalanceLoading) {
  //     await fetchAccountBalance(userProfile.accountId);
  //   }
  // };

  return (
    <UserLayout title="Profile Setting">
      <Header />
      {(userProfile)
        ? (
          <>
            <ProfileBanner accountBalance={accountBalance!} userProfile={userProfile} isEdit={isEdit} />
            <div className={`${styles.profileBg}`}>
              <div className="bg-sp-gray w-full" style={{ height: "1px" }}></div>
              {isEdit ? (
                <Settings />
              ) : (
                <div className="mt-10">
                  <Slider />
                </div>
              )}
              <div className={`${styles.profileContent ?? ""} flex my-8 border-t border-sp-gray`}>
                {!isEdit && (
                  <>
                    <ProifileSidebar />
                    <ProfileTabs userProfile={userProfile} isOwner />
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )
      }
      <Footer />
    </UserLayout>
  );
}

export const getServerSideProps = async ({
  locale = "en",
}: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
