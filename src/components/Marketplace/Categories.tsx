import React from "react";

const CategoryItem = ({
  label,
  className,
}: { label: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`relative overflow-hidden py-[100px] px-12 cursor-pointer border border-orange rounded-t-[10px] ${className ?? ""
      }`}
  >
    <div className="absolute inset-0">
      <img
        alt="image"
        src="/img/presets/categories/1.png"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black-80 to-black-80">
      <span className="text-[30px] font-bold">{label}</span>
    </div>
  </div>
);

const Categories = () => {
  return (
    <>
      <span className="text-[31px]">
        Look for items, collections and accounts
      </span>
      <span className="text-20 font-light max-w-[500px]">
        There are 10,000 SpheraHeads available in the market. Dive into the
        sphera world.
      </span>
      <div className="flex justify-center w-full gap-6 mobile:flex-wrap">
        <CategoryItem className="w-1/3 mobile:w-full max-w-[444px]" label="ALL COLLECTIONS" />
        <CategoryItem className="w-1/3 mobile:w-full max-w-[444px]" label="RECENT LISTINGS" />
        <CategoryItem className="w-1/3 mobile:w-full max-w-[444px]" label="TRENDING" />
      </div>
    </>
  );
};

export default Categories;
