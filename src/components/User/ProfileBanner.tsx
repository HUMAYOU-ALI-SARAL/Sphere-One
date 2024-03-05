"use client";
import Image from "next/image";
import { format } from "date-fns";
import ImageUploading from "react-images-uploading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserProfileType } from "@/types/user.type";
import { AccountBalanceType } from "@/types/blockchain.type";
import { CiCalendar as CalendarIcon } from "react-icons/ci";
import { FiCopy as CopyIcon } from "react-icons/fi";
import TwitterIcon from "@/public/icons/twitter.png";
import ProfileAvatar from "@/public/img/profile/default-avatar.png";
import DefaultBg from "@/public/img/profile/banner.png";
import { FiEdit2 as EditIcon } from "react-icons/fi";
import AchievOne from "@/public/img/achievements/logo-1.png";
import styles from "./styles.module.scss";
import { useUploadUserImageMutation } from "@/api/userApi";
import { useAppDispatch } from "@/hooks/app";
import { setUserProfile } from "@/reducers/user.slice";
import { useTranslate } from "@/providers/translate.provider";
import { numberWithCommas } from "@/utils/common";
import { BladeSDK } from "@bladelabs/blade-sdk.js";
import { useGetAccountBalanceMutation } from "@/api/blockchainApi"; 




const AccountInfo = ({ accountId }: { accountId: string }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const handleCopyAccountId = () => {
    navigator.clipboard.writeText(accountId)
      .then(() => { toast.success("Account address copied to clipboard"); })
      .catch((error) => { console.error("Failed to copy AccountID:", error); });
  };

  return (
    <div className="flex items-center font-extralight -px-10">
      <span>Account address</span>
      <span
        className="mx-2 text-orange underline cursor-pointer"
        onClick={() => { setHidden(!hidden) }}
      >
        {hidden ? "Show" : "Hide"}
      </span>
      <span style={{ lineHeight: "7px" }} className={`${hidden ? "" : "text-orange"}`} >
        {hidden ? "**********" : accountId}
      </span>
      <CopyIcon className="ml-2 cursor-pointer" onClick={() => { handleCopyAccountId(); }} />
    </div>
  );
};



type Props = {
  userProfile: UserProfileType;
  accountBalance: AccountBalanceType;
  isEdit?: boolean | undefined;
};



const ProfileBanner = ({ userProfile, accountBalance, isEdit }: Props) => {
  const [uploadImage, { isSuccess, data }] = useUploadUserImageMutation();
  const dispatch = useAppDispatch();
  const { _t } = useTranslate();
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    // make object from BladeSDK
    const bladeSDK = new BladeSDK();
    bladeSDK.init("IX6IEUJLn4qqKWbbgQkAnArBzwbcNIQ4IYejRnEXEZSfzJ7eFLuqa5QKIvpZqmzn", "testnet", "spherawebsdk82673", "");

    const getBalance = async () => {
      const balance = await bladeSDK.getBalance("0.0.3120870");
      setBalance(balance.hbars)
      // console.log("getBalance ===>", balance);
    }
    getBalance();
    
  }, [])




  const handleImageUpload = async (imageList: any, name: string) => {
    let formData = new FormData();
    formData.append(name, imageList[0].file);
    await uploadImage(formData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserProfile(data));
      toast.success(_t("Success"));
    }
  }, [isSuccess, data]);

  return (
    <div className={`relative w-full ${styles.profileBanner}`}>
      <div className="relative">
        <Image
          alt="banner"
          src={userProfile?.bgImgUrl ? process.env.NEXT_PUBLIC_BACKEND_URL + userProfile.bgImgUrl : DefaultBg.src}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", maxHeight: "725px" }}
          quality={100}
        />
        {isEdit && (
          <ImageUploading
            value={[]}
            onChange={(imageList) => {
              handleImageUpload(imageList, "bgImg");
            }}
            dataURLKey="data_url"
          >
            {({ onImageUpload }) => (
              <div
                onClick={onImageUpload}
                className="cursor-pointer z-10 absolute inset-y-2/3 right-5 rtl:left-5 w-12 h-12 rounded-full bg-white opacity-70 flex items-center justify-center"
              >
                <EditIcon stroke="#000" size={30} />
              </div>
            )}
          </ImageUploading>
        )}
        <div className="absolute w-full bottom-5">
          <div className="flex items-center w-full">
            <div className="relative">
              <div className="rounded-full w-72 h-72 tablet:w-52 tablet:h-52 mobile:w-28 mobile:h-28">
                <Image
                  alt="avatar"
                  src={
                    userProfile?.profileImgUrl
                      ? process.env.NEXT_PUBLIC_BACKEND_URL +
                      userProfile.profileImgUrl
                      : ProfileAvatar.src
                  }
                  fill
                  quality={100}
                  className="rounded-full"
                />
              </div>

              {isEdit && (
                <ImageUploading
                  value={[]}
                  onChange={(imageList) => {
                    handleImageUpload(imageList, "profileImg");
                  }}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload }) => (
                    <div
                      onClick={onImageUpload}
                      className="cursor-pointer absolute bottom-0 right-7 rtl:left-7 w-12 h-12 rounded-full bg-white opacity-70 flex items-center justify-center"
                    >
                      <EditIcon stroke="#000" size={30} />
                    </div>
                  )}
                </ImageUploading>
              )}
            </div>

            <div className="flex items-start justify-between w-full px-10 flex-wrap">
              <div className="flex flex-col">
                <div className="flex items-start">
                  <span className="text-24 font-semibold pt-2">{`${userProfile?.firstName || ""
                    } ${userProfile?.lastName || ""}`}</span>
                  <div className="items-center hidden">
                    <Image className="mx-2" alt="twitter" src={TwitterIcon} />
                    <div>
                      <span className="font-thin text-20 mr-1">Followers:</span>
                      <span className="text-orange text-26 font-light">
                        42.0k
                      </span>
                    </div>
                    <div className="ml-3">
                      <span className="font-thin text-20 mr-1">Following:</span>
                      <span className="text-orange text-26 font-light">
                        365
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`${styles.profileLinear}`}></span>
                <div className="mt-2 flex items-center">
                  <span className="text-orange text-14">
                    @{userProfile.username}
                  </span>
                  <CalendarIcon className="mx-2" />
                  <span className="font-thin">
                    {/* Joined {format(new Date(userProfile.createdAt), "qo LLL u")} */}
                  </span>
                </div>
                <div>
                  <AccountInfo accountId={userProfile.accountId} />
                </div>
                {userProfile.bio && (
                  <div className="flex mt-2">
                    <span>Bio:</span>
                    <span className="ml-2 font-extralight max-w-md">
                      {userProfile.bio}
                    </span>
                  </div>
                )}
              </div>
              {!isEdit && (
                <>
                  <div className="flex items-start flex-col">
                    <span className="font-thin text-20">Achievements:</span>
                    <div className="flex space-x-5 mt-2">
                      <Image className="" alt="achieve" src={AchievOne} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-thin text-20">Account Balance:</span>
                    <span className="text-40 font-semibold">
                      ${accountBalance?.balanceInUSD}
                      {/* ${balance} */}
                    </span>
                    <span className="text-30 font-medium text-sp-gray-100">
                      {/* {accountBalance?.hbarBalance && numberWithCommas(Math.round(accountBalance.hbarBalance * Math.pow(10, 2)) / Math.pow(10, 2))}{" "} */}
                      ${balance}
                      HBAR
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileBanner;
