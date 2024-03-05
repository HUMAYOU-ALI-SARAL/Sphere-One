import React from "react";
import Countdown, { zeroPad } from 'react-countdown';

interface ICountdown {
    timestamp: number,
};


const TimeBlock = ({ time, name }: { time: number, name: string }) => {
    return (
        <div className="flex flex-col">
            <div className="w-[62px] h-[62px] rounded-[5px] bg-sp-gray-800 flex items-center justify-center">
                <span className="text-20">{zeroPad(time)}</span>
            </div>
            <span className="text-16 pt-2">{name}</span>
        </div>
    );
};

const renderer = ({ days, hours, minutes, seconds }: any) => {

    const timerList = [
        {
            time: days,
            name: "Days",
        },
        {
            time: hours,
            name: "Hours",
        },
        {
            time: minutes,
            name: "Minutes",
        },
        {
            time: seconds,
            name: "Seconds",
        },
    ];

    return (
        <div className="flex gap-6">
            {timerList.map((value, index) => (
                <TimeBlock time={value.time} name={value.name} key={index} />
            ))}
        </div>
    );

};

const CountdownTimer = ({ timestamp }: ICountdown) => {
    return (
        <Countdown
            date={timestamp}
            renderer={renderer}
        />
    );
};

export default CountdownTimer;