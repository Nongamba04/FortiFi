"use client";
import React from "react";
import Image from "next/image";

interface CryptoCardProps {
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  priceChange: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ name, category, price, imageUrl, priceChange }) => {
  const isNegative = parseFloat(priceChange) < 0;
  const arrowColor = isNegative ? "text-red-500" : "text-green-500";

  return (
    <div className="relative w-48 h-72 overflow-x-auto bg-white/10 backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center text-white transition-transform duration-200 ease-in-out group hover:scale-105 hover:-rotate-1 overflow-hidden border border-white/20 shadow-lg">
      
      {/* Crypto Image */}
      <Image
        src={imageUrl}
        alt={`${name} logo`}
        width={100}
        height={100}
        className="absolute top-10 transition-all duration-200 ease-in-out z-10 group-hover:scale-110 group-hover:blur-md animate-float"
      />

      {/* Text Content */}
        
      <div className="opacity-0 flex flex-col items-center justify-center gap-2 z-20 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
        <span className="text-xs text-gray-800">{category}</span>
        <p className="text-md font-bold flex items-center gap-1">
          ${price}
          <span className={`flex items-center justify-center ${arrowColor}`}>
            {/* Inline SVG for better color control */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1792 1792"
              fill="currentColor"
              width="12"
              height="12"
              className={`${isNegative ? "rotate-180 translate-y-[2px]" : ""}`}
            >
              <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z" />
            </svg>
            {`${isNegative ? "": "+"}`}{priceChange}%
          </span>
        </p>
      </div>
      <p className="text-lg font-bold z-20 ">{name}</p>
    </div>
  );
};

export default CryptoCard;
