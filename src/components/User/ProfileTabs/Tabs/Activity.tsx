import React, { useState } from "react";

import ProfileAvatar from "@/components/Common/ProfileAvatar";
import NftItem from "@/components/Items/Nft/NftItem";

import { ActivityType, IActivity, generateActivity } from "@/helpers/mockups";

const TYPE_TO_COLOR: Record<ActivityType, string> = {
  canceled: "bg-red-500",
  approved: "bg-green",
  rejected: "bg-red-700",
  purchased: "bg-green",
};

const Activity = () => {
  const [activity, setActivity] = useState<IActivity[]>(generateActivity());

  return (
    <div className="w-full p-8 overflow-x-auto">
      <table className="min-w-full text-white">
        <thead className="bg-sp-gray-600">
          <tr>
            <th className="p-2">NFT</th>
            <th className="p-2">Price (SPT)</th>
            <th className="p-2">USD Price</th>
            <th className="p-2">Type</th>
            <th className="p-2">Date</th>
            <th className="p-2">From</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((activity, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-2 text-center">
                <div className="flex gap-2 justify-center">
                  <NftItem nft={activity.nft} />
                </div>
              </td>
              <td className="p-2 text-center">{activity.priceSPT}</td>
              <td className="p-2 text-center">{activity.usdPrice}</td>
              <td className="p-2 text-center">
                <div
                  className={`p-2 uppercase rounded-full text-12 ${
                    TYPE_TO_COLOR[activity.type]
                  }`}
                >
                  {activity.type}
                </div>
              </td>
              <td className="p-2 text-center">
                {activity.date.toLocaleDateString()}
              </td>
              <td className="p-2 text-center">
                <div className="flex gap-2 justify-center">
                  <ProfileAvatar className="w-6 h-6" />
                  {activity.from.username}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;
