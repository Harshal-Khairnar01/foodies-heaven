import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded bg-gray-400 bg-opacity-80">
      <nav className="lg:w-1/3 w-full mx-auto flex justify-between gap-3 lg:my-4">
        <Link
          href="/about"
          className=" text-sm lg:text-md font-bold duration-700 transition-all text-gray-700 hover:text-black"
        >
          About us
        </Link>
        <Link
          href="/contact"
          className=" text-sm lg:text-md font-bold duration-700 transition-all text-gray-700 hover:text-black"
        >
          Contact
        </Link>
        <Link
          href="/recipes"
          className=" text-sm lg:text-md font-bold duration-700 transition-all text-gray-700 hover:text-black"
        >
          Recipes
        </Link>
        {/* <Link
          href="/register"
          className=" text-sm lg:text-md font-bold duration-700 transition-all text-gray-700 hover:text-black"
        >
          Join Us
        </Link> */}
      </nav>
      <nav>
        <div className="w-1/2 mx-auto my-2">
          <div className="p-2 mx-auto flex justify-center">
            <Image src={"/logo2.png"} alt="logo" width={200} height={100} />
          </div>
        </div>
      </nav>
      <aside>
        <div className="mx-auto text-center font-extrabold text-sm lg:mt-5 flex flex-col items-center space-y-2">
          <h1 className="text-gray-800 flex items-center gap-1">
            © 2025 - All rights reserved.{" "}
          </h1>
          <p className="text-gray-600 flex items-center gap-1">
            Created with <span className="text-red-500 text-lg">❤️</span> by
            <Link
              href="/about"
              className=" hover:text-gray-900 transition duration-300"
            >
              Harshal Khairnar
            </Link>
          </p>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
