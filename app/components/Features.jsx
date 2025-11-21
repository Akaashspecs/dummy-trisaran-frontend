"use client";
import { useEffect, useState } from "react";

const Features = () => {
  const cards = [
    {
      name: "Welcome to Your Dashboard",
      desc: "Track your leads, performance, and payouts easily.",
      bg_color: "bg-blue-400/30",
    },
    {
      name: "Grow Your Business",
      desc: "Access exclusive offers and financial tools to expand your reach.",
      bg_color: "bg-orange-400/30",
    },

    {
      image: "/Vikram-Mishra.jpg",
      name: "Get Support Anytime",
      desc: "Our dedicated support team is available whenever you need help.",
      bg_color: "bg-red-400/30",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [cards.length]);

  return (
    <div className=" flex flex-col items-center ">
      <div className=" relative w-full overflow-hidden rounded-2xl shadow-lg h-full ">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full min-h-[250px]  "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            height: 100,
          }}
        >
          {cards.map((item, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center  h-full   ${item.bg_color}`}
            >
              <div className=" h-full p-7  md:w-[50%] flex justify-center flex-col items-center">
                <div className="text-2xl font-semibold text-center">
                  {item.name}
                </div>{" "}
                <div className="font-poppins leading-5 md:leading-7 text-sm sm:text-base md:text-lg text-gray-700  text-center">
                  {item.desc}
                </div>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
