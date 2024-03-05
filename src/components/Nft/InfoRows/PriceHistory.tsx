import { useGetNftPriceHistoryMutation } from "@/api/blockchainApi";
import { useNft } from "@/providers/nft.provider";
import { format } from "date-fns";
import { useTranslate } from "@/providers/translate.provider";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import DataPicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "@/components/Common/Loader";
import { useBladeWallet } from "@/providers/blade-wallet.provider";


const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <span className="cursor-pointer flex justify-end w-[140px]" onClick={onClick} ref={ref}>{value}</span>
));

CustomDateInput.displayName = 'CustomDateInput';

type HistoryType = {
    day: string;
    price: number;
};

const PriceHistory = () => {
    const { _t } = useTranslate();
    const [getHistory, { isLoading }] = useGetNftPriceHistoryMutation();
    const { nft } = useNft();
    const [filterDate, setFilterDate] = useState<Date>(new Date());
    const [priceHistory, setPriceHistory] = useState<HistoryType[]>([]);
    const { tinyBarToHbar } = useBladeWallet();

    const fetchHistory = useCallback(() => {
        getHistory({
            timestamp: filterDate.getTime(),
            tokenId: nft?.token_id!,
            serialNumber: nft?.serial_number!,
        })
            .unwrap()
            .then((response) => {
                const { history } = response;
                const formatedHistory: HistoryType[] = [];
                history.forEach((history) => {
                    formatedHistory.push({
                        day: format(history.timestamp, "d"),
                        price: tinyBarToHbar(history.price, false) as number,
                    });
                });
                setPriceHistory(formatedHistory);
            })
            .catch((error) => { console.log(error) })
    }, [filterDate, nft, getHistory]);

    useEffect(() => {
        fetchHistory();
    }, [filterDate])

    return (
        <div className="flex flex-col w-full px-6 py-5 text-16 font-light text-white gap-y-4 h-[360px]">
            <div className="flex w-full items-center justify-between">
                <p>{_t("Volume (HBAR)")}</p>
                <div>
                    <DataPicker
                        selected={filterDate}
                        onChange={(date) => setFilterDate(date || new Date())}
                        dateFormat="MMMM, yyyy"
                        showMonthYearPicker
                        customInput={<CustomDateInput />}
                    />
                </div>

            </div>
            {priceHistory.length
                ? <div className="relative">
                    {isLoading
                        ? <Loader />
                        : <ResponsiveContainer width="100%" minHeight={300}>
                            <BarChart data={priceHistory}>
                                <CartesianGrid stroke="#3D3D3D" vertical={false} />
                                <XAxis tickLine={false} dataKey="day" fill="#ffffff" stroke="#3D3D3D" />
                                <YAxis tickLine={false} axisLine={false} />
                                <Bar barSize={55} dataKey="price" fill="#FF7F2A" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </div>
                : <p className="text-center text-sp-gray-950">{_t("No available data")}</p>
            }
        </div >
    );
};

export default PriceHistory;
