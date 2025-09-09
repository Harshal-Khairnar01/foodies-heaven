"use client";

import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

const AppLayout = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col min-h-screen text-black">
      <Header session={session} />
      <main className="mt-24 flex-1 w-full mx-auto relative">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
