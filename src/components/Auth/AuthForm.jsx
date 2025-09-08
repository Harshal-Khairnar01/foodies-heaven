"use client";

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Verification from "./Verification";

const AuthForm = ({ origin, setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/" });
      if (result?.error) toast.error("Google sign-in failed!");
    } catch {
      toast.error("Something went wrong with Google login");
    }
  };

  const onVerificationSuccess = () => {
    reset();
    setVerificationStep(false);
    setRoute("signIn");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (origin === "signIn") {
        const res = await signIn("credentials", { ...data, redirect: false });
        if (res?.ok) {
          toast.success("Logged in successfully");
          reset();
          router.push("/");
          router.refresh();
          setOpen(false);
        } else {
          toast.error(res?.error || "Invalid email or password!");
        }
      } else {
        const res = await axios.post("/api/auth/register", {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        });
        if (res.status === 201) {
          toast.success("Verification code sent to your email!");
          setEmailForVerification(data.email);
          setVerificationStep(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (verificationStep) {
    return (
      <Verification
        email={emailForVerification}
        onVerificationSuccess={onVerificationSuccess}
      />
    );
  }

  return (
    <div className="w-full flex justify-center items-center p-2 lg:p-2">
      <div className="w-11/12 lg:p-2 p-2 flex flex-col justify-center gap-3 rounded-2xl shadow-[#ffdddd_0px_25px_50px_-12px] bg-bgWhite">
        <h1 className="px-3 py-1 text-red-500 text-xl font-extrabold">
          {origin === "signIn" ? "Sign In" : "Sign Up"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col px-2"
        >
          {origin === "signUp" && (
            <>
              <div className="mt-3 relative z-0 w-full mb-5 group">
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder=""
                  className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-low peer"
                />
                <label
                  htmlFor="name"
                  className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>

              <div className="mt-3 relative z-0 w-full mb-5 group">
                <input
                  {...register("username", {
                    required: "Username is required.",
                  })}
                  type="text"
                  id="username"
                  placeholder=""
                  className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-low peer"
                />
                <label
                  htmlFor="username"
                  className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="mt-3 relative z-0 w-full mb-5 group">
            <input
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address.",
                },
              })}
              type="email"
              id="email"
              placeholder=""
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-low peer"
            />
            <label
              htmlFor="email"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-3 relative z-0 w-full mb-5 group">
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              type={!show ? "password" : "text"}
              id="password"
              placeholder=""
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-low peer"
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            <label
              htmlFor="password"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            disabled={loading}
            value={
              loading
                ? "Processing..."
                : origin === "signIn"
                ? "Login"
                : "Register"
            }
            className={`mt-3 cursor-pointer bg-gradient-to-r font-bold from-red-600 to-red-400 my-3 mx-2 text-bgWhite rounded-3xl w-1/2 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full mt-3 flex items-center justify-center gap-2 border border-red-600 rounded-3xl p-2 mx-2 hover:bg-red-100 cursor-pointer transition-all duration-200 delay-75 text-gray-800 font-semibold text-sm"
          >
            <FcGoogle size={22} />
            {origin === "signUp"
              ? "Sign Up with Google"
              : "Sign In with Google"}
          </button>

          <>
            {origin === "signIn" ? (
              <h5 className="text-sm text-gray-500 px-2 mt-3">
                Don&apos;t have an Account?
                <span
                  className="cursor-pointer ml-3 font-extrabold text-xs text-red-500 hover:border-b-2 border-red-500"
                  onClick={() => setRoute("signUp")}
                >
                  Register
                </span>
              </h5>
            ) : (
              <h5 className="text-sm text-gray-500 px-2 mt-3">
                Already have an Account?
                <span
                  className="cursor-pointer ml-3 font-extrabold text-xs text-red-500 hover:border-b-2 border-red-500"
                  onClick={() => setRoute("signIn")}
                >
                  Login
                </span>
              </h5>
            )}
          </>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
