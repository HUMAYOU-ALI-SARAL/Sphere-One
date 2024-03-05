import React from "react";
import { DEFAULT_PROFILE_AVATAR } from "@/constants/app.constants";

const ProfileAvatar = ({
  profileImgUrl,
  className,
}: {
  profileImgUrl?: string;
  className?: string;
}) => {
  return (
    <img
      alt="avatar"
      src={
        profileImgUrl
          ? process.env.NEXT_PUBLIC_BACKEND_URL + profileImgUrl
          : DEFAULT_PROFILE_AVATAR
      }
      className={`rounded-full object-contain overflow-hidden ${
        className ?? ""
      }`}
    />
  );
};

export default ProfileAvatar;
