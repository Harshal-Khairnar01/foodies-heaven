"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
import Links from "./Links";
import { CgMenuRightAlt } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import CustomModal from "@/utils/CustomModal";
import AuthForm from "../Auth/AuthForm";
import ConfirmModal from "@/utils/ConfirmModal";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [authOpen, setAuthOpen] = useState(false);
  const [authRoute, setAuthRoute] = useState("signIn");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-24 flex items-center z-[9999] bg-[url('/nav.png')] bg-cover transition-colors duration-500">
      <div className="lg:w-11/12 w-full mx-auto flex justify-between items-center p-4 lg:p-3">
        <div className="p-2 flex-shrink-0">
          <Image
            src="/logo2.png"
            alt="Website logo"
            width={130}
            height={100}
            className="h-auto"
          />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Links />
          {session?.user ? (
            <UserDropdown setLogoutOpen={setLogoutOpen} />
          ) : (
            <HiOutlineUserCircle
              size={30}
              onClick={() => {
                setAuthRoute("signIn");
                setAuthOpen(true);
              }}
              className="cursor-pointer text-gray-400 hover:text-gray-800 transition-colors duration-200"
            />
          )}
        </div>

        <div className="flex lg:hidden items-center gap-4 justify-end">
          {session?.user ? (
            <UserDropdown setLogoutOpen={setLogoutOpen} isMobile={true} />
          ) : (
            <HiOutlineUserCircle
              size={30}
              onClick={() => {
                setAuthRoute("signIn");
                setAuthOpen(true);
              }}
              className="cursor-pointer text-gray-400 hover:text-gray-800 transition-colors duration-200"
            />
          )}
          {mobileMenuOpen ? (
            <FiX
              className="text-3xl cursor-pointer text-black"
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <CgMenuRightAlt
              className="text-3xl cursor-pointer text-black"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute top-24 left-0 w-full bg-white shadow-md z-[9998]"
            ref={mobileMenuRef}
          >
            <Links />
          </div>
        )}
      </div>

      {authOpen && (
        <CustomModal
          open={authOpen}
          setOpen={setAuthOpen}
          component={AuthForm}
          origin={authRoute}
          setRoute={setAuthRoute}
        />
      )}

      <ConfirmModal
        open={logoutOpen}
        setOpen={setLogoutOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={() => signOut({ callbackUrl: "/" })}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Header;
