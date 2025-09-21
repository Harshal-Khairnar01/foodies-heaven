"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { FaSquareFacebook } from "react-icons/fa6";
import Link from "next/link";
import DotLoader from "@/utils/DotLoader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

 
  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please enter your last name";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!validateForm()) {
      toast.error("Please correct the form errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const { firstName, lastName, email, phone, message } = formData;
      const name = `${firstName} ${lastName}`;
      const response = await axios.post("/api/contact", {
        name,
        email,
        phone,
        message,
      });

      if (response.status === 200) {
        toast.success("Feedback submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full lg:py-7 overflow-hidden">
        <div className="lg:w-9/12 mx-auto lg:my-2 flex flex-col  lg:flex-row justify-between shadow-[2px_15px_20px_6px_#8b8586] ">
          <div
            className="lg:w-2/6 w-full order-2 lg:order-1 flex flex-col justify-end p-4 gap-10"
            style={{
              backgroundImage: "url('/Contact.jpg')",
              backgroundSize: "cover",
            }}
          >
            <div className=" p-5 font-bold flex flex-col bg-gray-200 bg-opacity-80 rounded-r-xl  lg:bg-transparent">
              <h1 className="p-1">Email : contact@example.com</h1>
              <h1 className="p-1">Phone : (+91) 686 427 XXXX</h1>
            </div>
            <div className="flex justify-center gap-12 p-2 text-red-500 mb-6 ">
              <Link href="#" className="bg-white rounded-md">
                <FaInstagramSquare
                  className="shadow-[2px_15px_20px_6px_#706a6b] hover:scale-125 transition-all transform duration-[300ms]"
                  size={28}
                />
              </Link>

              <Link href="#" className="bg-white rounded-md">
                <FaSquareFacebook
                  className="shadow-[2px_15px_20px_6px_#706a6b] hover:scale-125 transition-all transform duration-[300ms]"
                  size={28}
                />
              </Link>
              <Link href="#" className="bg-white rounded-md">
                <FaTwitterSquare
                  className="shadow-[2px_15px_20px_6px_#706a6b] hover:scale-125 transition-all transform duration-[300ms]"
                  size={28}
                />
              </Link>
            </div>
          </div>
          <div className="lg:w-4/6 w-full lg:order-2 order-1  bg-gradient-to-br from-red-500 via-red-400 to-red-500 flex flex-col lg:px-5 lg:py-4 lg:gap-4 pag-2">
            <div className="w-full p-5">
              <h1 className=" text-3xl font-bold text-gray-900 text-shadow-[2px_2px_6px_#8b8586]  lg:px-2 py-1 uppercase">
                Get In Touch
              </h1>
              <p className="mt-1 lg:pl-3 px-1  text-sm text-black text-justify ">
                Welcome to our contact page! We&apos;re here to help with any
                questions, feedback, or partnership inquiries related to our
                recipes and website.
              </p>
            </div>
            <div className="px-5">
              <div className="relative">
                {isLoading && (
                  <>
                    <div className="  absolute top-0 left-0 w-full flex h-[300px] justify-center items-center   z-40  ">
                    <DotLoader/>
                    </div>
                  </>
                )}
                <form onSubmit={handleSubmit} className="px-2 py-2">
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="mt-1 relative z-0 lg:w-1/2 w-full mb-5 group">
                      <input
                        type="text"
                        name="firstName"
                        placeholder=""
                        id="firstName"
                        className="block py-2.5 px-2 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="firstName"
                        className="px-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
                      >
                        <FaUser size={16} /> First Name*
                      </label>
                      {errors.firstName && (
                        <div className="text-gray-800 text-sm mt-1">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="mt-1 relative z-0 lg:w-1/2 w-full mb-5 group">
                      <input
                        type="text"
                        name="lastName"
                        placeholder=""
                        id="lastName"
                        className="block py-2.5 px-2 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="lastName"
                        className="px-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
                      >
                        <FaUser size={16} /> Last Name*
                      </label>
                      {errors.lastName && (
                        <div className="text-gray-800 text-sm mt-1">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="mt-1 relative z-0 w-full mb-5 group">
                      <input
                        type="email"
                        name="email"
                        placeholder=""
                        id="email"
                        className="block py-2.5 px-2 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="email"
                        className="px-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
                      >
                        <MdEmail size={16} /> Email*
                      </label>
                      {errors.email && (
                        <div className="text-gray-800 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className=" mt-5">
                    <div className="mt-1 relative z-0 w-full mb-5 group">
                      <input
                        type="tel"
                        placeholder=""
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-2 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="phone"
                        className="px-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
                      >
                        <MdLocalPhone size={16} /> Phone*
                      </label>
                      {errors.phone && (
                        <div className="text-gray-800 text-sm mt-1">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className=" mt-5">
                    <div className="mt-1 relative z-0 w-full mb-5 group">
                      <textarea
                        rows={3}
                        type="text"
                        placeholder=""
                        name="message"
                        id="message"
                        className="block py-2.5 px-2 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                        value={formData.message}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="message"
                        className="px-2 peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-200 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center gap-2"
                      >
                        <LuMessagesSquare size={16} /> Message*
                      </label>
                      {errors.message && (
                        <div className="text-gray-800 text-sm mt-1">
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 mb-5">
                    <button
                      type="submit"
                      className="text-red-700 bg-white block py-2.5 px-2 w-full text-lg font-semibold shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] transition-all hover:scale-105 duration-1000 "
                      disabled={isLoading}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}