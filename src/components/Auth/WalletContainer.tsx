'use client'
import Image from "next/image";
import Auth from "@/pages/layouts/auth.layout";
import styles from './styles.module.scss';

type TextProps = {
    text?: string,
    classNames?: string;
}

type Props = {
    pageTitle: string;
    children: React.ReactNode;
    leftSideFirstHeader?: TextProps;
    leftSideSecondHeader?: TextProps;
    leftSideDescription?: TextProps;
};

const WalletContainer = ({
    pageTitle,
    children,
    leftSideSecondHeader,
    leftSideDescription,
    leftSideFirstHeader,
}: Props) => {
    return (
        <Auth title={pageTitle}>
            <div className={`${styles.authPage}`}>
                <div className={`${styles.authContainer}`}>
                    <div className={`${styles.leftSideColumn}`}>
                        <Image quality={100} src="/img/auth/wallet/wallet-line.png" alt="line" width={50} height={0} />
                        <div className={`flex ml-12 flex-col justify-start mt-32`}>
                            <p className={`text-4xl font-abz font-normal ${leftSideFirstHeader?.classNames ?? ''}`}>{leftSideFirstHeader?.text ?? ''}</p>
                            <p className={`text-4xl font-abz font-normal ${leftSideSecondHeader?.classNames ?? ''}`}>{leftSideSecondHeader?.text ?? ''}</p>
                            <p className={`text-xl font-thin mt-5 ${leftSideDescription?.classNames ?? ''}`}>{leftSideDescription?.text ?? ''}</p>
                        </div>
                    </div>
                    <div className={`${styles.rightSideColumn}`}>
                        <div className={`${styles.container} w-full`}>
                            <Image
                                quality={100}
                                src="/img/auth/ball.png"
                                alt="ball"
                                width={500}
                                height={500}
                                className={`${styles.ballImgWallet}`}
                                sizes="100vw"
                            />
                            {children}
                            <Image
                                quality={100}
                                src="/img/auth/welcome/player.png"
                                alt="player"
                                width={650}
                                height={650}
                                sizes="100vw"
                                className={`${styles.playerImgWallet}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    )
}

export default WalletContainer;