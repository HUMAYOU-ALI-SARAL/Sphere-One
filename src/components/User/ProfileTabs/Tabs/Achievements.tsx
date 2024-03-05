import React, { useCallback, useEffect, useState } from "react";

import ItemsGrid from "./Common/ItemsGrid";

import { NftAchievement } from "@/types/blockchain.type";
import AchievementsItem from "@/components/Items/Achievement/AchievementsItem";

const Achievements = () => {
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [achievements, setAchievements] = useState<NftAchievement[]>([]);

  const fetchAchievements = useCallback(() => {
    const achievementsCount = Math.random() * 10;
    const achievements: NftAchievement[] = [];

    for (let index = 0; index <= achievementsCount; index++) {
      achievements.push({
        id: Math.random() * 100,
        image: `/img/presets/achievements/${Math.ceil(
          Math.random() * 5
        ).toString()}.png`,
        claimed: !!Math.round(Math.random()),
      });
    }

    setAchievements(achievements);
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className="flex flex-col w-full h-full px-48 py-24 gap-6">
      <ItemsGrid
        pagination
        page={page}
        isLastPage={isLastPage}
        setPage={setPage}
      >
        {achievements.length > 0 &&
          achievements.map((achievement) => (
            <AchievementsItem
              key={`${achievement.id}`}
              achievement={achievement}
            />
          ))}
      </ItemsGrid>
    </div>
  );
};

export default Achievements;
