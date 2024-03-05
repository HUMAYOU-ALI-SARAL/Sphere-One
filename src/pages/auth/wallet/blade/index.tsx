'use client'
import WalletContainer from "@/components/Auth/WalletContainer";
import WalletForm from "@/components/Auth/WalletForm";
import Button from "@/components/Common/Button";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { useGetAccountBalanceMutation } from "@/api/blockchainApi"
import { setAccountBalance, setUserProfile } from "@/reducers/user.slice";

import BaldeLogo from "public/img/auth/wallet/blade-logo.png";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';
import { useAppDispatch } from "@/hooks/app";
import { useGetProfileMutation, useSaveAccountIdMutation } from "@/api/userApi";
import { BladeSDK } from "@bladelabs/blade-sdk.js";

const Wallet = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { init: initBlade, hasExtension, walletAccountId, walletSession } = useBladeWallet();
    const [fetchAccountBalance, { isSuccess: accountSuccess, data: accountData }] = useGetAccountBalanceMutation();
    const [fetchUserProfile, { isSuccess: profileSuccess, data: profileData }] = useGetProfileMutation();
    const [saveAccountId] = useSaveAccountIdMutation();
    const isImport = router.query.import;


    useEffect(() => {
        if (hasExtension === false) {
            toast.error(t("auth:please_download_the_blade_wallet"));
        }
    }, [hasExtension]);

    useEffect(() => {
        if (profileSuccess && profileData) {
            dispatch(setUserProfile(profileData));
        }
    }, [profileSuccess, profileData]);

    useEffect(() => {
        if (walletSession && walletAccountId) {
            toast.success(t("auth:wallet_id_connected", { id: walletAccountId }));
            saveAccountId({ accountId: walletAccountId.toString() }).then(() => {
                console.log("walletAccountId", walletAccountId);
                fetchAccountBalance(walletAccountId);
                fetchUserProfile({});
            });
        }
    }, [walletSession, walletAccountId]);

    useEffect(() => {
        if (accountSuccess && accountData) {
            console.log("accountData", accountData)
            dispatch(setAccountBalance(accountData));
            router.push('/auth/wallet/connected-moonpay');
        }
    }, [accountSuccess, accountData]);

    return (
        <>
            <WalletContainer
                pageTitle={t("auth:wallet_blade")}
                leftSideFirstHeader={{ text: t("auth:connecting_to") }}
                leftSideSecondHeader={{ text: t("auth:web3"), classNames: "text-orange" }}
                leftSideDescription={{ text: t("auth:chose_how_you_would_like_to_connect") }}
            >
                <WalletForm>
                    <div className="flex flex-col items-center relative">
                        <div className="flex flex-col">
                            <p className="font-abz text-3xl text-white">{t("auth:download_blade")}</p>
                            <p className="font-thin text-base mt-4 text-white w-80">{t("auth:blade_wallet_web3_asset_management_tool")}</p>
                            <Image
                                alt="blade"
                                quality={100}
                                src={BaldeLogo.src}
                                width={BaldeLogo.width}
                                height={BaldeLogo.height}
                                sizes="100vh"
                                className="mt-5"
                                style={{ filter: "brightness(0.7)" }}
                            />
                            {/* <Button 
                                  className="mt-8 px-8 rounded font-extralight w-48 text-center" 
                                  onClick={() => initBlade()} 
                                  label={isImport ? t("common:import") : t("auth:create_wallet")} 
                             /> */}
                            <Button className="mt-8 px-8 rounded font-extralight w-48 text-center" label="create_wallet" onClick={() => router.push('/auth/wallet/select')} />
                            {/* <button onClick={getAccountInfo}>getAccountInfo</button> */}
                            {/* <button onClick={createWalletAccount}>createWalletAccount</button> */}
                            {/* <button onClick={getInfo}>getInfo</button> */}

                            <Link
                                target="_blank"
                                className="text-orange font-thin text-base mt-1"
                                href="https://bladewallet.io/">{t("auth:find_out_more")}</Link>
                        </div>
                    </div>
                </WalletForm>
            </WalletContainer>
        </>
    )
}

export default Wallet;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'auth',
            'common'
        ])),
    },
});