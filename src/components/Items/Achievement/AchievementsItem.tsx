import React from "react";

import { NftAchievement } from "@/types/blockchain.type";

const AchievementsItem = ({ achievement }: { achievement: NftAchievement }) => {
  return (
    <div className="relative flex flex-col gap-4">
      <img
        alt="image"
        src={achievement.image}
        className="object-cover w-[149px] h-[168px]"
      />
      <button
        className={`h-[35px] p-1 rounded-[5px] border shadow-[0px_4px_80px_0px_rgba(255,127,42,0.35)] 
          ${achievement.claimed
            ? "bg-[linear-gradient(180deg,#484848_0%,#353535_100%)] hover:bg-[linear-gradient(0deg,#FF7F2A_0%,#833B0B_100%)]"
            : "bg-[linear-gradient(180deg,#FF7F2A_0%,#833B0B_100%)] hover:bg-[linear-gradient(0deg,#484848_0%,#353535_100%)]"
          }
        `}
      >
        {achievement.claimed ? "View" : "Claim"}
      </button>
    </div>
  );
};

export default AchievementsItem;
