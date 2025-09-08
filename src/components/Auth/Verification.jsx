"use client";

import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import axios from "axios";

const Verification = ({ email, onVerificationSuccess }) => {
  const [invalidError, setInvalidError] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationCode = Object.values(verifyNumber).join("");
    if (verificationCode.length !== 4) {
      toast.error("Please enter a 4-digit code.");
      setInvalidError(true);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/verify", {
        email,
        verificationCode,
      });

      if (res.status === 200) {
        toast.success("Account verified successfully!");
        onVerificationSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setInvalidError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const sanitizedValue = value.length > 1 ? value.slice(0, 1) : value;

    const newVerifyNumber = { ...verifyNumber, [index]: sanitizedValue };
    setVerifyNumber(newVerifyNumber);

    if (sanitizedValue === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (sanitizedValue.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-1 lg:p-2">
      <style jsx>{`
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="w-11/12 lg:w-full max-w-lg p-2 flex flex-col items-center gap-6 rounded-3xl ">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Verify Your Account
        </h1>
        <h2 className="text-gray-600 text-base text-center font-medium">
          A verification code has been sent to your email.
        </h2>

        <div className="w-24 h-24 rounded-full flex items-center justify-center  bg-green-500 text-white shadow-md">
          <VscWorkspaceTrusted size={50} />
        </div>

        <div className="w-full flex justify-center gap-4 mt-2">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              ref={inputRefs[index]}
              className={`w-14 h-14 text-center text-gray-600 text-3xl font-bold bg-transparent border-b-2 outline-none transition-all duration-200 ${
                invalidError ? "border-red-500" : "border-gray-300"
              } focus:border-red-600 focus:shadow-sm`}
              maxLength={1}
              value={verifyNumber[key]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>

        <button
          type="button"
          className={`mt-4 w-2/3 lg:w-1/2 p-3 font-semibold rounded-full text-white bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={verificationHandler}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </div>
  );
};

export default Verification;
