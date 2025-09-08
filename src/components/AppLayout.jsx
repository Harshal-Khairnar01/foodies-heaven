// components/AppLayout.jsx (Updated)
"use client";

import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

const AppLayout = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Header session={session} />
      <main className="mt-24 flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
