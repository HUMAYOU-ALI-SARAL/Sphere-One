
import Button from "@/components/Common/Button";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import styles from './styles.module.scss';

const WelcomeForm = () => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className={`${styles.authForm} shadow rounded-lg`}>
            <p className="text-3xl py-3">{t("auth:sign_in_or_create_an_account")}</p>
            <div className="mt-5 flex flex-col">
                <Button className="rounded-2 mb-3 font-normal" onClick={() => router.push('/auth/login')} label={t("auth:log_in")} />
                <Button className="rounded-2 font-normal" onClick={() => router.push('/auth/onboard')} label={t("auth:create_new_account")} />
            </div>
        </div>
    )
}

export default WelcomeForm;