"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";


const Search = ({ placeholder, className, paramKey = "search" }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set(paramKey.includes("Page") ? paramKey : "page", 1);

    if (e.target.value) {
      e.target.value.length > 0 && params.set(paramKey, e.target.value);
    } else {
      params.delete(paramKey);
    }

    replace(`${pathname}?${params}`);
  }, 100);

  return (
    <div className={`flex My gap-3 p-2 items-center rounded-b-xl max-w-max  ${className}`}>
      <MdSearch  />
      <input
        className="bg-transparent border-none outline-none "
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
