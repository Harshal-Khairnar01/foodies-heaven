"use client";

import React, { useMemo } from "react";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";

const Links = () => {
  const { data: session } = useSession();

  const links = useMemo(() => {
    const commonLinks = [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Recipes", path: "/recipes" },
      { title: "Contact", path: "/contact" },
    ];

    if (session?.user?.isAdmin) {
      commonLinks.push({ title: "Admin", path: "/admin" });
    }

    return commonLinks;
  }, [session]);

  return (
    <div
      className="
        flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-0 fixed lg:relative top-24 lg:top-0 left-0 w-screen lg:w-auto h-screen lg:h-auto bg-[#eef3f6] lg:bg-transparent p-20 lg:p-0 z-20
      "
    >
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
    </div>
  );
};

export default Links;
