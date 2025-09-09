"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const UserDropdown = ({ setLogoutOpen, isMobile }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) return null;

  return (
    <div
      className={`relative ${isMobile ? "" : "hidden lg:block"}`}
      ref={dropdownRef}
    >
      <Image
        width={50}
        height={50}
        alt={session.user.username || "user avatar"}
        src={session.user.image || "/chef.png"}
        className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-opacity duration-300 ${
          pathname === "/account" ? "border-red-600" : "border-black"
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 p-3 bg-white shadow-lg rounded-md overflow-hidden z-[10000]">
          <Link
            href="/account"
            className="block px-5 py-2  text-base font-semibold rounded-md text-gray-700 hover:bg-gray-200"
            onClick={() => setDropdownOpen(false)}
          >
            Account
          </Link>
          <button
            onClick={() => {
              setDropdownOpen(false);
              setLogoutOpen(true);
            }}
            className=" w-full text-left px-5 py-2  text-base font-semibold rounded-md text-red-600 hover:bg-gray-200 flex items-center gap-3"
          >
            <span>Logout</span>
            <FiLogOut size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
