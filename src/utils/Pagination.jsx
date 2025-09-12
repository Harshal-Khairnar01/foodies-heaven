"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ count, ITEM_PER_PAGE, paramKey = "page" }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get(paramKey)) || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + parseInt(ITEM_PER_PAGE) < count;

  const handleChangePage = (type, e) => {
    e.preventDefault();
    params.set(paramKey, type === "prev" ? page - 1 : page + 1);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-2 flex justify-between w-full">
      <button
        className={`px-2 py-1 rounded-md shadow-md ${
          hasPrev ? "bg-red-50 font-bold" : "cursor-not-allowed bg-gray-400"
        }`}
        disabled={!hasPrev}
        onClick={(e) => handleChangePage("prev", e)}
      >
        Previous
      </button>
      <button
        className={`px-2 py-1 rounded-md shadow-md ${
          hasNext ? "bg-red-50 font-bold" : "cursor-not-allowed bg-gray-400"
        }`}
        disabled={!hasNext}
        onClick={(e) => handleChangePage("next", e)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
