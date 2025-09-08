import React from "react";
import Chefs from "./Chefs";

const AboutPage = () => {
  return (
    <div className=" px-4 lg:p-0">
      <div className=" py-5">
        <div className=" lg:w-9/12 w-full mx-auto  p-2 lg:p-5 rounded-md bg-[#f72d2d] my-5 relative">
          <p className=" p-5 text-white text-lg">
            Welcome to Foodie&apos;s Heaven, where culinary dreams come to life!
            Are you ready to join a vibrant community of food enthusiasts and
            share your passion for cooking with the world? Look no further! As
            the creator of this gastronomic paradise, I, Harshal Khairnar,
            invite you to embark on a culinary journey like no other. Whether
            you&apos;re a seasoned chef or a kitchen novice, Foodie&apos;s
            Heaven is your platform to showcase your talent and creativity. Best
            of all, it&apos;s completely free! So why wait? Sign up today and
            let your recipes shine in the spotlight of Foodie&apos;s Heaven!
          </p>
        </div>
      </div>

      <div className=" lg:w-9/12 w-full mx-auto  bg-[#212121]  flex justify-end items-center flex-col gap-10 p-5 rounded-md my-2 overflow-hidden">
        <h1 className=" text-center text-gray-200 font-bold text-3xl">
          Our Chefs
        </h1>
        <p className=" lg:px-5 px-2  text-gray-400">
          Join our recipe community today and become a chef! Create an account
          to start adding your favorite recipes and share your culinary
          creations with the world. Manage your profile, upload your recipes,
          and connect with fellow food enthusiasts. Don&apos;t wait sign up now
          and turn your passion for cooking into a shared experience!
        </p>
        <Chefs />
      </div>
    </div>
  );
};

export default AboutPage;
