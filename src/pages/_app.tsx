import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ToastProvider from '@/providers/toast.provider';
import UserProvider from '@/providers/user.provider';
import BladeWalletProvider from '@/providers/blade-wallet.provider';
import TranslateProvider from '@/providers/translate.provider';
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='relative'>
      <Provider store={store}>
        <TranslateProvider>
          <ToastProvider>
            <BladeWalletProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </BladeWalletProvider>
          </ToastProvider>
        </TranslateProvider>
      </Provider>
    </div>
  )
}

export default appWithTranslation(MyApp);

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'auth',
      'footer',
      'header',
      'common',
    ])),
  },
});