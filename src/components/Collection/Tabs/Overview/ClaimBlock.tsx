import React from "react";
import Image from "next/image";
import { useTranslate } from "@/providers/translate.provider";

import ClaimPlayer from "@/public/img/collection/spheraheads/claim-player.png";
import ClaimFlameBg from "@/public/img/collection/spheraheads/claim-flame-bg.png";

import styles from "../../styles.module.scss";

const ClaimBlock = () => {
    const { _t } = useTranslate();

    return (
        <div className={`relative pt-20 ${styles.claimBlockBg}`}>
            <div className="flex font-blink font-normal">
                <Image sizes="100vw" src={ClaimPlayer} alt="image" />
                <div>
                    <div className="flex mt-20">
                        <p className="text-50">1.</p>
                        <div className="flex flex-col ml-10 rtl:mr-10">
                            <div className="flex items-center">
                                <div className="w-[91px] h-1 bg-sp-gray-920 "></div>
                                <p className="text-50 ml-5 rtl:mr-5">{_t("Claim Your Free SpheraHead")}</p>
                            </div>
                            <div className="text-24">
                                <ol className="px-5 max-w-[940px]" style={{ listStyle: "decimal" }}>
                                    <li>{_t("Click the 'Claim Now' Button: It's your first step to becoming a proud Sphera Head owner.")}</li>
                                    <li>{_t("Sign Up: If you're new to Sphera World, sign up for an account. It's quick, easy, and secures your spot in the digital collectibles revolution.")}</li>
                                    <li>{_t("Confirm Your Claim: Once you've made your choice, confirm your claim, and your Sphera Head will be securely stored in your digital wallet.")}</li>
                                </ol>
                                <div className="flex flex-col mt-20 -pl-5">
                                    <div className="flex items-center">
                                        <p className="text-50">2.</p>
                                        <div className="w-[91px] h-1 bg-sp-gray-920 ml-10 mr-5"></div>
                                        <p className="text-50">{_t("Connect with Like-Minded Fans")}</p>
                                    </div>
                                    <div className="text-24 ml-[90px]">
                                        <ol className="max-w-[940px]" style={{ listStyle: "decimal" }}>
                                            <li>{_t("Claim Your Free Sphera Head: If you haven't already, follow the steps to claim your free Sphera Head. This is your entry ticket to our vibrant community.")}</li>
                                            <li>{_t("Explore Our Community: Once you own a Sphera Head, visit our Discord to dive into discussions, see what others are collecting, and join in the conversation.")}</li>
                                            <li>{_t("Participate in Events: Keep an eye on our community events, where you can participate, win prizes, and connect with fellow members.")}</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-[300px]">
                <Image quality={100} sizes="100vw" src={ClaimFlameBg} alt="image" style={{ width: "100%" }} />
            </div>
        </div>
    );
};

export default ClaimBlock;