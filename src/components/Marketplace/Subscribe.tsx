import React from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";

const Subscribe = () => {
  return (
    <div className="flex flex-col gap-6 lg:w-1/2 xl:w-1/3 w-full mx-auto max-w-[630px] my-32">
      <span className="font-actor text-[64px] leading-[107%]">
        Subscribe to our newsletter
      </span>
      <span className="font-abel text-xl">
        Join our community to learn about exclusive deals and latest news
      </span>
      <div className="flex w-full rounded-[5px] border-[3px] border-orange items-center bg-sp-gray-600 p-[1px]">
        <Input
          placeholder="Your email address"
          containerClass="w-full rounded-none"
          className="focus:!ring-0 focus:!border-none rounded-none"
        />
        <Button
          className="me-0 mb-0 w-1/3 rounded-[5px] h-[44px]"
          label="Subscribe"
        />
      </div>
    </div>
  );
};

export default Subscribe;
