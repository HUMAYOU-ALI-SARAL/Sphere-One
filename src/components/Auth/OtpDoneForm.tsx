
'use client'
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

import Button from "@/components/Common/Button";
import styles from './styles.module.scss';

const OtpDoneForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <div className={`${styles.authForm} shadow rounded-lg max-w-md`}>
            <p className="text-3xl py-3 text-left">{t('auth:account_verified')}</p>
            <p className={`${styles.paraLink} font-inter`}>{t('auth:connect_your_account_web3')}</p>
            <Button
                className="mt-8 px-8 rounded font-extralight w-48 text-center"
                onClick={() => { router.push('/auth/wallet/start') }}
                label={t('common:next')}
            />
            <p className={`${styles.paraLink}`}><span className="text-orange">{t('auth:the_next_step_to_creating')}</span></p>
        </div>
    )
}

export default OtpDoneForm;