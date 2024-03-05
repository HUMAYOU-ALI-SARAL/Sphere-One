import React from "react";

const Featured = () => {
  return (
    <div className="relative h-[680px]">
      <img
        alt="image"
        className="w-full object-contain"
        src="/img/featured/featured-1.png"
      />
      <div className="absolute bottom-0 w-full">
        <div className="relative flex flex-col border border-[#f90] bg-pattern h-[254px] mx-10 rounded-[43px] items-center justify-end text-center p-10">
          <img
            alt="image"
            className="w-1/6 absolute left-10"
            src="/img/featured/logo-champions-league.png"
          />
          <img
            alt="image"
            className="w-1/6 absolute right-10"
            src="/img/featured/logo-champions-league.png"
          />
          <div className="relative w-1/2">
            <img
              alt="image"
              className="w-[27%] rotate-[-11.826deg] absolute bottom-0 left-0 -translate-x-1/2"
              src="/img/featured/tickets.png"
            />
            <img
              alt="image"
              className="w-[27%] rotate-[-11.826deg] absolute bottom-0 right-0 translate-x-1/2"
              src="/img/featured/tickets.png"
            />
            <img
              alt="image"
              className="absolute w-2/3 bottom-0 left-1/2 -translate-x-1/2"
              src="/img/featured/featured-2.png"
            />
          </div>
          <span className="w-1/2 font-actor text-[28px] leading-[115.5%]">
            PARTICIPATE IN OUR LAUNCH EVENT TO RECEIVE AN ENTRY INTO OUR PRIZE
            DRAW FOR TICKETS TO THE CHAMPIONS LEAGUE AND MORE!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Featured;
