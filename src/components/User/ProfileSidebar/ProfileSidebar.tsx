import { useTranslate } from "@/providers/translate.provider";
import styles from "../styles.module.scss";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { LuClock4 as ClockIcon } from "react-icons/lu";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import { useUser } from "@/providers/user.provider";
import Link from "next/link";

const ProfileSidebar = () => {
  const { _t } = useTranslate();
  const { logOut } = useUser();

  const menuItems = [
    {
      title: _t("Transaction history"),
      url: "/profile?tab=transactions",
      icon: <ClockIcon size={20} />,
      classNames: "",
    },
    {
      title: _t("Settings"),
      url: "/profile?edit=true",
      icon: <SettingsIcon size={20} />,
      classNames: "",
    },
  ];

  return (
    <div
      className={`${
        styles.profileSidebar ?? ""
      } w-96 border-sp-gray border-r ml-5`}
    >
      <div className="h-[895px]"></div>
      <div className="w-83 mx-auto mb-8 pt-7 text-orange text-center hover:text-neutral-600 border-t-2 border-orange">
        {_t("View All")}
      </div>
      <div className="border-sp-gray pt-6 border-t">
        <div className=" w-60 mx-auto">
          {menuItems.map((value, index) => (
            <Link
              href={value.url}
              key={index}
              className="flex hover:bg-neutral-600 my-6"
            >
              {value.icon}
              <span className="ml-2">{value.title}</span>
            </Link>
          ))}
          <div
            className="flex hover:bg-neutral-600 cursor-pointer mb-16"
            onClick={() => {
              logOut();
            }}
          >
            <LogoutIcon size={20} color="#FF5E5E" />
            <span className="text-red-500 ml-2">Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
