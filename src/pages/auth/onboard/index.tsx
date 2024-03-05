import Header from "@/components/Auth/Header";
import Image from "next/image";
import Button from "@/components/Common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next/types';

import styles from '../styles.module.scss';

const OnBoard = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const router = useRouter();

  const changeStepHandler = (nextStep: number) => {
    if (nextStep < 0) return;
    if (nextStep === steps.length) {
      router.push('/auth/signup');
    } else {
      setCurrentStep(nextStep);
    }
  }

  const steps = [
    {
      styles: {
        marginTop: '150px',
      },
      leftSideHeaderFirstText: t("auth:welcome_to"),
      leftSideHeaderSecondText: t("auth:sphera_world"),
      leftSideDescriptionText: t("auth:become_the_league_champion"),
      cardHeaderFirstText: t("auth:connecting_football"),
      cardHeaderSecondText: t("auth:world_of_web3"),
      cardDescriptionText: t("auth:future_of_fan_engagement_and_sport"),
    },
    {
      styles: {
        marginTop: '220px',
      },
      leftSideHeaderFirstText: t("auth:connecting"),
      leftSideHeaderSecondText: t("auth:fans"),
      leftSideDescriptionText: t("auth:connect_friends_and_make_new"),
      cardHeaderFirstText: t("auth:join_global_community"),
      cardHeaderSecondText: t("auth:football_enthusiasts"),
      cardDescriptionText: t("auth:sphera_will_become_the_leading_hub"),
    },
    {
      styles: {
        marginTop: '260px',
      },
      leftSideHeaderFirstText: t("auth:collect_your"),
      leftSideHeaderSecondText: t("auth:favourite_moments"),
      leftSideDescriptionText: t("auth:build_the_ultimate_collection_of_the_greatest"),
      cardHeaderFirstText: t("auth:find_new_passion_for"),
      cardHeaderSecondText: t("auth:collecting_digital_assets"),
      cardDescriptionText: t("auth:own_iconic_football_moments_digital_collectibles"),
    },
    {
      styles: {
        marginTop: '260px',
      },
      leftSideHeaderFirstText: t("auth:connect_with_your_favourite"),
      leftSideHeaderSecondText: t("auth:clubs_and_players"),
      leftSideDescriptionText: t("auth:access_collections_from_some_your_favourite"),
      cardHeaderFirstText: t("auth:own_memorabilia_from_your"),
      cardHeaderSecondText: t("auth:favourite_players"),
      cardDescriptionText: t("auth:connect_new_ways_with_your_favourite"),
    },
    {
      styles: {
        marginTop: '330px',
      },
      leftSideHeaderFirstText: t("auth:earn_rewards_and"),
      leftSideHeaderSecondText: t("auth:prizes"),
      leftSideDescriptionText: t("auth:earn_digital_collectibles_memorabilia"),
      cardHeaderFirstText: t("auth:find_new_passion_for"),
      cardHeaderSecondText: t("auth:collecting_digital_assets"),
      cardDescriptionText: t("auth:own_iconic_football_moments_digital_collectibles"),
    },
    {
      styles: {
        marginTop: '350px',
      },
      leftSideHeaderFirstText: t("auth:create_your"),
      leftSideHeaderSecondText: t("auth:account_today"),
      leftSideDescriptionText: t("auth:setup_your_sphera_world_profile"),
      cardHeaderFirstText: t("auth:create_your_account_and_setup"),
      cardHeaderSecondText: t("auth:your_web3_wallet"),
      cardDescriptionText: t("auth:to_access_the_sphera_World_platform"),
    },
  ];

  return (
    <div className={`${styles.onboardPage} auth-layout`} style={{ backgroundImage: `url(/img/auth/onboard/background-step-${currentStep}.png)` }}>
      <Header />
      <div className={`${styles.onboardContainer}`}>
        <div className={`${styles.leftSideColumn}`}>
          <Image quality={100} src={`/img/auth/onboard/line-step-${currentStep}.png`} alt="line" width={50} height={0} className={`${styles.lineImg}`} />
          <div className="flex ml-12 flex-col" style={steps[currentStep].styles}>
            <div className="text-4xl font-abz font-normal">
              <p>{steps[currentStep].leftSideHeaderFirstText}</p>
              <p className="text-orange">{steps[currentStep].leftSideHeaderSecondText}</p>
            </div>
            <p className="text-xl font-thin mt-5">{steps[currentStep].leftSideDescriptionText}</p>
          </div>
        </div>
        <div className={`${styles.rightSideColumn}`}>
          <div className="m-auto w-10/12">
            <div className={`${styles.onBoardSlide}`}>
              <div className={`${styles.sliderCard}`} style={{ backgroundImage: `url(/img/auth/onboard/card-step-${currentStep}.png)` }}>
                <div className={`${styles.textArea} font-abz`}>
                  <h1>
                    {steps[currentStep].cardHeaderFirstText} <span className='text-orange'>{steps[currentStep].cardHeaderSecondText}</span>
                  </h1>

                  <p>{steps[currentStep].cardDescriptionText}</p>
                </div>
              </div>
              <div className={`${styles.stepsLine}`}>
                {steps.map((value: any, index: number) => (
                  <div
                    key={index}
                    className={index === currentStep ? 'bg-orange' : ' bg-white'}
                  ></div>
                ))}
              </div>
              <div className='flex justify-center items-center mt-5'>
                <Button
                  className="w-32 rounded-xl mr-3 bg-stone-500 font-normal"
                  label={t("common:previous")}
                  onClick={() => changeStepHandler(currentStep - 1)}
                />
                <Button
                  className="font-normal rounded-xl w-32"
                  label={t("common:next")}
                  onClick={() => changeStepHandler(currentStep + 1)}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OnBoard;

export const getServerSideProps = async ({ locale = 'en' }: GetServerSidePropsContext) => ({
  props: {
      ...(await serverSideTranslations(locale, [
          'auth',
          'common'
      ])),
  },
});