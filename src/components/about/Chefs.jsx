"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import DotLoader from "@/utils/DotLoader";

export default function Chefs() {
  const [chefs, setChefs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await axios.get("/api/chefs");
        setChefs(response.data?.user || []);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChefs();
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center text-2xl font-bold text-red-500">
      <DotLoader/>
      </div>
    );
  }

  return (
    <div className="flex my-2 flex-row items-center justify-center mb-2 w-full">
      {chefs.map((testimonial) => (
        <div
          className="-mr-4 relative group"
          key={testimonial.id}
          onMouseEnter={() => setHoveredIndex(testimonial.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === testimonial.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-20 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

                <div className="font-bold text-white relative z-30 text-base">
                  {testimonial.username || "Unknown Chef"}
                </div>
                <div className="text-white text-xs">{testimonial.email}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <Image
            onMouseMove={handleMouseMove}
            height={500}
            width={500}
            src={testimonial.image || "/chef.png"}
            alt={testimonial.username || "Chef"}
            className="object-cover !m-0 !p-0 object-top rounded-full lg:h-20 w-14 lg:w-20 h-14 border-2 group-hover:scale-110 group-hover:z-30 border-white relative transition duration-500 bg-black"
          />
        </div>
      ))}
    </div>
  );
}
