import React from "react";

const Pagination = ({
  page,
  isLastPage,
  setPage,
}: {
  page: number;
  setPage: (page: number) => void;
  isLastPage?: boolean;
}) => {
  return (
    <nav>
      <div className="flex items-center gap-3">
        <button
          className="disabled:text-placeholder"
          disabled={page === 1}
          onClick={() => (page > 1 ? setPage(page - 1) : "")}
        >
          Prev
        </button>

        {page > 1 ? (
          <button
            className="bg-sp-gray-700 h-6 w-7 rounded-[3px] text-placeholder"
            onClick={() => setPage(page - 1)}
          >
            {page - 1}
          </button>
        ) : (
          ""
        )}

        <button
          className="bg-sp-gray-700 h-6 w-7 rounded-[3px]"
          onClick={() => setPage(page)}
        >
          {page}
        </button>

        {isLastPage ? (
          ""
        ) : (
          <button
            className="bg-sp-gray-700 h-6 w-7 rounded-[3px] text-placeholder"
            onClick={() => setPage(page + 1)}
          >
            {page + 1}
          </button>
        )}

        <button
          className="disabled:text-placeholder"
          disabled={isLastPage}
          onClick={() => (isLastPage ? "" : setPage(page + 1))}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
