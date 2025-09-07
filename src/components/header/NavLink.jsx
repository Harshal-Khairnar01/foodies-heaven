"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

function NavLink({ item }) {
  const pathName = usePathname();
  return (
    <div>
      <Link
        prefetch={true}
        href={item.path}
        className={`mx-4 p-2 font-bold ${
          pathName == item.path
            ? "border-b-2 border-red-500 text-black rounded-lg"
            : "text-gray-400"
        } `}
      >
        {item.title}
      </Link>
    </div>
  );
}

export default NavLink;
