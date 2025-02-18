"use client";
import React from "react";
import { StaticImageData } from "next/image";

interface CardProps {
  url: string;
  coverImg: StaticImageData; // Keep StaticImageData type
  text: string;
}

const LongCard: React.FC<CardProps> = ({ url, coverImg, text }) => {
  return (
    <div className="flex items-center justify-center w-[75%] mx-auto my-2">
      {/* Outer Card with Gradient Border */}
      <div className="relative w-full h-[150px] rounded-[20px] bg-gradient-to-br from-[#00ff75] to-[#3700ff] transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.3)]">
        
        {/* Inner Card */}
        <div
          className="absolute inset-0 bg-[#1a1a1a] rounded-[20px] flex transition-all duration-200 hover:scale-[0.98] justify-around bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg.src})` }} // ✅ Fix: Use coverImg.src
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-[20px]"></div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center p-3 z-10">
            <h1 className="text-white text-lg font-semibold text-center">{text}</h1>

            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-gradient-to-r from-[#00ff75] to-[#3700ff] text-white px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 hover:brightness-110"
            >
              Learn More
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LongCard;
