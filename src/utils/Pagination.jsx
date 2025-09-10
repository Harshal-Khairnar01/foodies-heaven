"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ count, ITEM_PER_PAGE }) => {
  // console.log(count, "from pagination...");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;

  const params = new URLSearchParams(searchParams);

  //   const ITEM_PER_PAGE = 3;

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + parseInt(ITEM_PER_PAGE) < count;

  const handleChangePage = (type, e) => {
    e.preventDefault();
    params.set("page", type === "prev" ? page - 1 : page + 1);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-2 flex justify-between">
      <button
        className={`px-2 py-1  text-bgSoft rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${
          hasPrev ? "bg-red-50 font-bold" : "cursor-not-allowed  bg-[#3b455d]"
        }`}
        disabled={!hasPrev}
        onClick={(e) => handleChangePage("prev", e)}
      >
        Previous
      </button>
      <button
        className={`px-2 py-1 text-bgSoft rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${
          hasNext ? "bg-red-50 font-bold" : "cursor-not-allowed bg-[#3b455d]"
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
