import MainContainer from "@/components/Auth/MainContainer";
import SignUpForm from "@/components/Auth/SignUpForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';

const Login = () => {
    const { t } = useTranslation();
    return (
        <>
            <MainContainer
                pageTitle={t("auth:sign_up")}
                leftSideFirstHeader={{ text: t("auth:sign_up") }}
                leftSideDescription={{ text: t("auth:sign_up_sphera_world_with_your_email_account") }}
            >
                <SignUpForm />
            </MainContainer>
        </>
    )
}

export default Login;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'auth',
            'common'
        ])),
    },
});