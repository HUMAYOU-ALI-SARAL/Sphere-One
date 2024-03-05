import { useGetNftActivityHistoryMutation } from "@/api/blockchainApi";
import { useBladeWallet } from "@/providers/blade-wallet.provider";
import { useNft } from "@/providers/nft.provider";
import { useTranslate } from "@/providers/translate.provider";
import { useUser } from "@/providers/user.provider";
import { NftActivityEventTypes, NftActivityHistory } from "@/types/blockchain.type";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Activity = () => {
    const [getActivities] = useGetNftActivityHistoryMutation();
    const { nft } = useNft();
    const { _t } = useTranslate();
    const { tinyBarToHbar } = useBladeWallet();

    const [activities, setActivities] = useState<NftActivityHistory[]>([]);
    const { userProfile } = useUser();

    const tableHeader = [
        _t("Event"),
        _t("Price"),
        _t("From"),
        _t("To"),
        _t("Date"),
    ];

    const fetchActivitiesHistory = useCallback(() => {
        getActivities({
            tokenId: nft?.token_id!,
            serialNumber: nft?.serial_number!,
        })
            .unwrap()
            .then((response) => {
                const { history } = response;
                setActivities(history);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchActivitiesHistory();
    }, []);
    return (
        <div className="flex flex-col w-full px-6 py-5 text-16 font-light text-white gap-y-4">
            {activities.length ? (
                <table className="min-w-full text-white font-light">
                    <thead className="bg-sp-gray-600">
                        <tr>
                            {tableHeader.map((name, index) => (
                                <th key={index} className="p-2">{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <tr key={`bid-${index}`} className="border-b border-sp-gray-700">
                                <td className="p-2 text-center capitalize">{activity.eventType}</td>
                                <td className="p-2 text-center">{tinyBarToHbar(activity?.price || 0n)}</td>
                                <td className="p-2 text-center text-orange">
                                    {activity.eventType !== NftActivityEventTypes.MINT ? (
                                        <Link href={`/profile/${activity.from.accountId}`} >
                                            {activity.from.username || activity.from.accountId}
                                        </Link>
                                    ) : (
                                        <>
                                            {_t("Null address")}
                                        </>
                                    )}
                                </td>
                                <td className="p-2 text-center text-orange">
                                    <Link href={activity.to.accountId == userProfile?.accountId ? '/profile' : `/profile/${activity.to.accountId}`} >
                                        {activity.to.username || activity.to.accountId}
                                        {activity.to.accountId == userProfile?.accountId && <span className="text-orange pl-1 rtl:pr-1">{_t("(You)")}</span>}
                                    </Link>
                                </td>
                                <td className="p-2 text-center">{formatDistanceToNowStrict(activity.timestamp)} {_t("ago")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-sp-gray-950">{_t("No available data")}</p>
            )}
        </div>
    );
};

export default Activity;
