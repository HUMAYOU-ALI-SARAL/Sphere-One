import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { useUser } from "@/providers/user.provider";
import Head from "next/head.js";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  useBg?: boolean
};

export default function UserLayout({ children, title, useBg = true }: Props) {
  const { init: initBlade } = useBladeWallet();
  const { userProfile } = useUser();
  useEffect(() => {
    if (userProfile) {
      // console.log("userProfile", userProfile)
      // const account = localStorage.getItem('walletAccount');
      // if (account) {
        
      //   const accountInfo: any = JSON.parse(account);
      //   console.log(accountInfo?.accountId)
      // }
      initBlade();
    }
  }, [userProfile])

  // const { userProfile, setUserProfile } = useUser();
  // useEffect(() => {
  //   if (userProfile) {
  //     const account = localStorage.getItem('walletAccount');
  //     if (account) {
  //       const accountInfo = JSON.parse(account);
  //       if (accountInfo?.accountId) {
  //         setUserProfile({ ...userProfile, accountId: accountInfo.accountId });
  //       }
  //     }
  //   }
  // }, [userProfile, setUserProfile]);


  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`relative flex flex-col bg-black text-white w-full h-full z-0 min-h-[100vh] ${useBg ? 'bg-pattern' : ''}`}>
        {children}
      </div>
    </>
  );
}
