import { Carousel } from "react-responsive-carousel";
import { useTranslate } from "@/providers/translate.provider";

import Button from "../Common/Button";
import { MdOutlineKeyboardArrowLeft as ArrowLeftIcon } from "react-icons/md";
import { MdOutlineKeyboardArrowRight as ArrowRightIcon } from "react-icons/md";
import { useRouter } from "next/router";

const Arrow = ({ left, onClick }: { left?: boolean; onClick: () => void }) => {
  return (
    <button
      className={`
                rounded-full w-12 h-12 bg-sp-gray flex items-center justify-center 
                absolute z-10 cursor-pointer opacity-80 ${left ? "left-5 rtl:right-5" : "right-5 rtl:left-5"
        }
                `}
      style={{ bottom: "45%" }}
    >
      {left ? (
        <ArrowLeftIcon onClick={onClick} size={34} />
      ) : (
        <ArrowRightIcon onClick={onClick} size={34} />
      )}
    </button>
  );
};

const HeroSlider = () => {
  const { _t } = useTranslate();
  const router = useRouter();
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={10000}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(clickHandler) => <Arrow onClick={clickHandler} left />}
      renderArrowNext={(clickHandler) => <Arrow onClick={clickHandler} />}
    >
      <div className="relative">
        <img src="/img/slider/marketplace.png" alt="image" />
        <div className="absolute top-8 left-16">
          <img src="/logo_xl.png" className="h-36" alt="image" />
        </div>
        <div className="absolute bottom-[10%] left-[6%] right-[6%] font-actor flex items-end justify-between">
          <div className="flex flex-col items-start text-start w-2/3 gap-2">
            <Button
              className="text-white rounded-sm bg-red w-fit"
              label="Live Drop"
            />
            <span className="font-abz text-[60px]">
              SpheraHeads: Genesis Edition
            </span>
            <span className="text-xl font-light">
              Drop ends{" "}
              <span className="text-orange">March 8, 2023 at 12:00 PM</span>
            </span>
            <span className="text-xl">
              Current public price: <span className="text-2xl">Free</span>
            </span>
            <span className="text-xl font-light">
              Each digital collectible/NFT is unique and randomly generated for
              Spheras early subscribers, tapping into a userbase of....{" "}
              <span className="text-orange underline cursor-pointer">
                Read more
              </span>
            </span>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Total Supply
                </span>
                <span className="font-abz text-[25px]">10,000</span>
              </div>
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Total Minted
                </span>
                <span className="font-abz text-[25px]">4,675</span>
              </div>
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Unique Holders
                </span>
                <span className="font-abz text-[25px]">4,675</span>
              </div>
            </div>
          </div>
          <Button type="button" className="text-white rounded-[5px]" label="Claim Now" />
        </div>
      </div>
      <div className="relative">
        <img src="/img/slider/marketplace.png" alt="image" />
        <div className="absolute top-8 left-16">
          <img src="/logo_xl.png" className="h-36" alt="image" />
        </div>
        <div className="absolute bottom-[10%] left-[6%] right-[6%] font-actor flex items-end justify-between">
          <div className="flex flex-col items-start text-start w-2/3 gap-2">
            <Button
              className="text-white rounded-sm bg-red w-fit"
              label="Live Drop"
            />
            <span className="font-abz text-[60px]">
              SpheraHeads: Genesis Edition
            </span>
            <span className="text-xl font-light">
              Drop ends{" "}
              <span className="text-orange">March 8, 2023 at 12:00 PM</span>
            </span>
            <span className="text-xl">
              Current public price: <span className="text-2xl">Free</span>
            </span>
            <span className="text-xl font-light">
              Each digital collectible/NFT is unique and randomly generated for
              Spheras early subscribers, tapping into a userbase of....{" "}
              <span className="text-orange underline cursor-pointer">
                Read more
              </span>
            </span>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Total Supply
                </span>
                <span className="font-abz text-[25px]">10,000</span>
              </div>
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Total Minted
                </span>
                <span className="font-abz text-[25px]">4,675</span>
              </div>
              <div className="flex flex-col">
                <span className="font-abz text-xl text-sp-gray-900">
                  Unique Holders
                </span>
                <span className="font-abz text-[25px]">4,675</span>
              </div>
            </div>
          </div>
          <Button type="button" className="text-white rounded-[5px]" label="Claim Now" />
        </div>
      </div>
    </Carousel>
  );
};

export default HeroSlider;
