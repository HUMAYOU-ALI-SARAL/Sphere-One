import Head from "next/head.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next/types";
import Header from "@/components/Auth/Header";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function AuthLayout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="auth-layout">
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({
  locale = "en",
}: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["auth", "footer", "header"])),
  },
});
