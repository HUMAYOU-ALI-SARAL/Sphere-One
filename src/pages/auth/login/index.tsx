import MainContainer from "@/components/Auth/MainContainer";
import LoginForm from "@/components/Auth/LoginForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from "next-i18next";

const Login = () => {
    const { t } = useTranslation();
    return (
        <MainContainer
            pageTitle={t("common:welcome")}
            leftSideFirstHeader={{ text: t("auth:sign_in") }}
            leftSideDescription={{ text: t("auth:sign_in_to_sphera_world") }}
        >
            <LoginForm />
        </MainContainer>
    )
}

export default Login;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
    props: {
        ...(await serverSideTranslations(locale, ['auth', 'common'])),
    },
});