import MainContainer from "@/components/Auth/MainContainer";
import WelcomeForm from "@/components/Auth/WelcomeForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';


const Welcome = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer
        pageTitle={t("common:welcome")}
        leftSideFirstHeader={{ text: t("auth:sign_up")}}
        leftSideDescription={{ text: t("auth:sign_up_sphera_world_with_your_email_account")}}
      >
        <WelcomeForm />
      </MainContainer>
    </>
  )
}

export default Welcome;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
  props: {
      ...(await serverSideTranslations(locale, [
          'auth',
          'common'
      ])),
  },
});