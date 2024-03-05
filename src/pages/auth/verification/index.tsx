"use client"
import MainContainer from "@/components/Auth/MainContainer";
import OtpForm from "@/components/Auth/OtpForm";
import OtpDoneForm from "@/components/Auth/OtpDoneForm";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';

const Verification = () => {

    const { t } = useTranslation();
    const [otpDone, setOtpDone] = useState<boolean>(false);

    return (
        <>
            <MainContainer
                pageTitle={t("auth:account_verification")}
                leftSideFirstHeader={
                    {
                        text: otpDone ? t("auth:congratulations") : t("auth:alright"),
                        classNames: 'text-orange'
                    }
                }
                leftSideSecondHeader={
                    {
                        text: otpDone ? t("auth:account_verified") : t("auth:account_verification"),
                        classNames: 'whitespace-nowrap'
                    }
                }
                leftSideDescription={
                    {
                        text: otpDone ? "" : t("auth:code_has_been_sent_to_your_email_address")
                    }
                }
            >
                {otpDone ? <OtpDoneForm /> : <OtpForm onDone={() => setOtpDone(true)} />}

            </MainContainer>
        </>
    )
}

export default Verification;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'auth',
            'common'
        ])),
    },
});
