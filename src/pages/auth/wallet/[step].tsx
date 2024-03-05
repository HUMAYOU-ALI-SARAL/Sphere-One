'use client'
import { useUser } from '@/providers/user.provider';
import WalletContainer from "@/components/Auth/WalletContainer";
import WalletForm from "@/components/Auth/WalletForm";
import Button from "@/components/Common/Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import BaldeLogo from "public/img/auth/wallet/blade-logo.png";
import MoonPayLogo from "public/img/auth/wallet/moon-pay-logo.png";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';
import styles from '../styles.module.scss';
import { BladeSDK } from "@bladelabs/blade-sdk.js";
import { useEffect, useState } from "react";


const wallets = [
    {
        logo: BaldeLogo,
        alt: "blade",
        nextUrl: "/auth/wallet/blade?import=true"
    },
    /* {
        logo: Metamask,
        alt: "metamask",
        nextUrl: "#",
    },
    {
        logo: Hashpack,
        alt: "hashpack",
        nextUrl: "#",
    },
    {
        logo: WalletConnect,
        alt: "wallet-connect",
        nextUrl: "#",
    }, */
];

interface AccountInfo {
    accountId: string;
    evmAddress: string;
    privateKey: string;
    publicKey: string;
    seedPhrase: string;
}

interface Props {
    step: string;
    t: (key: string) => string;
}


const Wallet = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const step = router.query.step;
    const { setOpenMoonPay } = useUser();
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const [seedPhrase, setSeedPhrase] = useState(Array(12).fill(''));

    const handleChange = (index: any, value: any) => {
        const newSeedPhrase: any = [...seedPhrase];
        newSeedPhrase[index] = value;
        setSeedPhrase(newSeedPhrase);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isComplete = seedPhrase.every((word) => word.trim() !== '');
        if (!isComplete) {
            alert('Please fill in all the input fields.');
            return;
        }

        const localStorageData = JSON.parse(localStorage.getItem('walletAccount') || '{}');
        const localStorageSeedPhrase = localStorageData.seedPhrase;

        // Compare input data with seed phrase from local storage
        const isSeedPhraseMatch = seedPhrase.join(' ') === localStorageSeedPhrase;

        if (isSeedPhraseMatch) {
            // Join the seedPhrase array into a single string
            const seedPhraseString = seedPhrase.join(' ');
            const result = await bladeSDK.getKeysFromMnemonic(seedPhraseString, true);
            console.log("result", result)

            // Use useRouter to navigate to the next page
            // router.push('/auth/wallet/connected');
        } else {
            alert('Seed phrase does not match. Please check your inputs.');
        }
    };


    // make object from BladeSDK
    const bladeSDK = new BladeSDK();
    bladeSDK.init("IX6IEUJLn4qqKWbbgQkAnArBzwbcNIQ4IYejRnEXEZSfzJ7eFLuqa5QKIvpZqmzn", "testnet", "spherawebsdk82673", "A4zJtfARB2ks3JXDxnpt");



    const createWalletAccount = async () => {
        const createAccount = await bladeSDK.createAccount();
        if (createAccount.accountId) {
            localStorage.setItem('walletAccount', JSON.stringify(createAccount));
            setAccountInfo(createAccount as AccountInfo);
        }
    };

    const closePopup = () => {
        setAccountInfo(null);
        router.push('/auth/wallet/connected')
    };





    return (
        <>
            <WalletContainer
                pageTitle={t("common:wallet")}
                leftSideFirstHeader={
                    {
                        text: t("auth:connecting_to")
                    }
                }
                leftSideSecondHeader={
                    {
                        text: t("auth:web3"),
                        classNames: "text-orange"
                    }
                }
                leftSideDescription={
                    {
                        text: t("auth:chose_how_you_would_like_to_connect")
                    }
                }
            >
                <WalletForm>
                    {step === 'start' &&
                        <div className="flex flex-col w-72">
                            <p className="font-abz text-3xl text-white">{t("auth:select_wallet_setup")}</p>
                            <p className="font-thin text-base mt-4 text-white">{t("auth:to_fully_access_the_sphera_world_platform")}</p>
                            <Button
                                className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                onClick={() => { router.push('/auth/wallet/hedera-setup') }}
                                label={t("common:next")}
                            />
                        </div>
                    }
                    {step === 'hedera-setup' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:hedera_wallet_setup")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:to_fully_access_the_sphera_world_platform")}</p>
                                <Button
                                    className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                    onClick={() => { router.push('/auth/wallet/select') }}
                                    label={t("common:next")}
                                />
                            </div>
                            <Image
                                quality={100}
                                src="/img/auth/wallet/hedera-logo.png"
                                alt="hedera"
                                width={235}
                                height={90}
                                className={`${styles.hederaLogo}`}
                            />
                        </div>
                    }
                    {step === 'select' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:select_your_wallet_type")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:chose_whether_you_would_like_to_create")}</p>
                                <div className='flex gap-x-2'>
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { router.push('/auth/wallet/create-new') }}
                                        label={t("auth:new_wallet")}
                                    />
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { router.push('/auth/wallet/connect') }}
                                        label={t("common:import")}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    <>
                        {step === 'create-new' && (
                            <div className="flex flex-col items-center relative">
                                <div className="flex flex-col">
                                    <p className="font-abz text-3xl text-white">Create New Wallet</p>
                                    <p className="font-thin text-base mt-4 text-white w-72">
                                        {t('auth:chose_whether_you_would_like_to_create')}
                                    </p>
                                    <div className="flex gap-x-2">
                                        <Button
                                            className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                            onClick={createWalletAccount}
                                            label="Create New Wallet"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {accountInfo && (
                            <div className="w-[100%] absolute top-0 right-[-100px] bottom-0  flex justify-center items-center" style={{ zIndex: 100000 }}>
                                <div className="bg-black p-4 rounded-lg border-2 border-white ml-[-200px] w-[870px]">
                                    <h2 className="w-full text-center text-xl font-bold mb-2">Wallet Created Successfully</h2>
                                    <p className='w-full text-center'>Please save the following information securely. Do not share it with anyone.</p>
                                    <ul className="mt-2 mb-4">
                                        <li>Account ID:  <span className="text-[14px]">{accountInfo.accountId}</span></li>
                                        <li>EVM Address: <br /> <span className="text-[14px]">{accountInfo.evmAddress}</span></li>
                                        <li>Private Key: <br /> <span className="text-[14px]">{accountInfo.privateKey}</span></li>
                                        <li>Public Key: <br /><span className="text-[14px]"> {accountInfo.publicKey}</span></li>
                                        <li>Seed Phrase: <br /> <span className="text-[14px]">{accountInfo.seedPhrase}</span></li>
                                    </ul>
                                    <button onClick={closePopup} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
                                </div>
                            </div>
                        )}
                    </>
                    {step === 'connect' && (
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t('auth:connect_existing_wallet')}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t('auth:connect_your_existing_wallet')}</p>
                                <div className="walletsBtnWrapper">
                                    <form onSubmit={handleSubmit}>
                                        <div className="w-[500px] flex flex-col gap-2 mt-2">
                                            {[...Array(3)].map((row, rowIndex) => (
                                                <div key={rowIndex} className="flex justify-between items-center gap-2">
                                                    {[...Array(4)].map((_, index) => (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            name={`seed${rowIndex * 4 + index + 1}`}
                                                            value={seedPhrase[rowIndex * 4 + index]}
                                                            onChange={(e) => handleChange(rowIndex * 4 + index, e.target.value)}
                                                            required
                                                            className="w-1/4 bg-gray-800 text-white rounded-md"
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                            <button type="submit" className="mt-4 bg-orange text-white rounded-md p-2">Import Wallet</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'connected-moonpay' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:wallet_connected_succesfully")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:congratulations_your_account_is_now_created")}</p>
                                <div className='flex gap-x-2 items-center justify-center mt-8'>
                                    <Button
                                        className="px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { setOpenMoonPay(true) }}
                                        label={t("common:top_up")}
                                    />
                                    <Link href="https://www.moonpay.com/learn" target='blank' >
                                        <Button className="px-8 rounded font-extralight w-48 text-center" label={t("common:tutorial")} />
                                    </Link>
                                    <Link className="font-extralight mb-2 text-base text-white" href='/auth/wallet/connected'>{t("common:skip")}</Link>
                                </div>
                                <div className="flex mt-2">
                                    <p className="font-extralight text-base text-white mr-2">{t("auth:powered_by")}:</p>
                                    <Image src={MoonPayLogo.src} alt="moonpay" width={113} height={21} />
                                </div>
                            </div>
                        </div>
                    }
                    {step === 'connected' &&
                        <div className="flex flex-col items-center relative">
                            <div className="flex flex-col">
                                <p className="font-abz text-3xl text-white">{t("auth:wallet_connected_succesfully")}</p>
                                <p className="font-thin text-base mt-4 text-white w-72">{t("auth:congratulations_your_account_is_now_created")}</p>
                                <div className='flex gap-x-2 items-center'>
                                    <Button
                                        className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                        onClick={() => { router.push('/profile') }}
                                        label={t("auth:visit_profile")}
                                    />
                                    <Link href="https://discord.com/invite/CwM2H5GUcR" target='blank' >
                                        <Button
                                            className="mt-8 px-8 rounded font-extralight w-48 text-center"
                                            label={t("auth:join_community")}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
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


{/* {wallets.map((value, index: number) => (
                        <div className={`${styles.walletsBtn}`} key={index}>
                        <Image
                        quality={100}
                        src={value.logo.src}
                                                alt={value.alt}
                                                width={value.logo.width}
                                                height={value.logo.height}
                                                sizes="100vh"
                                                onClick={() => { router.push(value.nextUrl) }}
                                            />
                                        </div>
                                    ))} */}