import Loader from "@/components/Common/Loader";
import Pagination from "@/components/Common/Pagination";
import React, { PropsWithChildren } from "react";

type ItemsGridProps = {
  pagination?: boolean;
  page?: number;
  setPage?: (page: number) => void;
  isLoading?: boolean;
  isLastPage?: boolean;
} & PropsWithChildren;

const ItemsGrid = ({
  children,
  pagination,
  page,
  setPage,
  isLoading,
  isLastPage,
}: ItemsGridProps) => {
  return (
    <>
      <div className="relative flex flex-wrap gap-6">
        {children}
        {isLoading && <Loader />}
      </div>
      {pagination && page !== undefined && setPage && (
        <div className="flex w-full justify-end items-center mt-5">
          <Pagination page={page} setPage={setPage} isLastPage={isLastPage} />
        </div>
      )}
    </>
  );
};

export default ItemsGrid;
