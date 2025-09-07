"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSession } from "next-auth/react";
import CustomModal from "@/utils/CustomModal";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import Links from "./Links";
import { CgMenuRightAlt } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={`fixed top-0 left-0 overflow-hidden w-full text-black mx-auto h-24 flex items-center z-20 transition-colors duration-500 bg-[url("/nav.png")] `}
      style={{
        backgroundSize: "cover",
      }}
    >
      <div className="lg:w-11/12 w-full mx-auto flex lg:p-3 justify-between items-center p-4">
        <div className="p-2 flex-shrink-0">
          <Image
            src={"/logo2.png"}
            alt="logo"
            width={130}
            height={100}
            className="h-auto"
          />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Links />
          {session?.user ? (
            <Link href="/account" className={`ml-3 relative group w-20 h-12`}>
              <Image
                width={50}
                height={50}
                alt={session?.user?.username}
                src={session?.user?.avatar?.url || "/chef.png"}
                className={`${
                  pathname === "/account" ? "border-red-600" : "border-black"
                } w-12 h-12 rounded-full mx-4 cursor-pointer border-2 duration-600 transition-opacity`}
              />
            </Link>
          ) : (
            <HiOutlineUserCircle
              size={30}
              onClick={() => setOpen(true)}
              className={`cursor-pointer dark:text-gray-400 dark:hover:text-white transition-colors duration-200`}
            />
          )}
        </div>

        <div className="flex gap-4 items-center lg:hidden justify-end">
          {session?.user ? (
            <Link href="/account" className={`ml-3 relative group w-20 h-12`}>
              <Image
                width={50}
                height={50}
                alt={session?.user?.username}
                src={session?.user?.avatar?.url || "/chef.png"}
                className={`${
                  pathname === "/account" ? "border-red-600" : "border-black"
                } w-12 h-12 rounded-full mx-4 cursor-pointer border-2 duration-600 transition-opacity`}
              />
            </Link>
          ) : (
            <HiOutlineUserCircle
              size={30}
              onClick={() => setOpen(true)}
              className={`cursor-pointer text-gray-400 hover:text-white transition-colors duration-200`}
            />
          )}

          {menuOpen ? (
            <FiX
              className="text-3xl mr-1 cursor-pointer dark:text-white text-black"
              onClick={toggleMenu}
            />
          ) : (
            <CgMenuRightAlt
              className="text-3xl mr-1 cursor-pointer dark:text-white text-black"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>

      {menuOpen && (
        <div
        className="lg:hidden"
          onClick={toggleMenu}
        >
          <Links />
        </div>
      )}

      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          component={route === "Login" ? Login : SignUp}
          setRoute={setRoute}
        />
      )}
    </div>
  );
};

export default Header;
