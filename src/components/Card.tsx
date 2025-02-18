"use client";
import React from "react";
import GlowingButton from "./GlowingButton";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  address: string;
  buttonText: string;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  address,
  buttonText,
  onClick,
}) => {
  return (
    <div className="relative max-w-sm sm:w-full mx-auto p-1 rounded-[20px] transition-all duration-300">
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-green-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-md"></div>

      {/* Card Container */}
      <div className="relative flex flex-col bg-black border border-white/20 rounded-[20px] shadow-lg p-4 sm:p-6 md:p-8 transition-transform transform group hover:scale-105">
        <div className="flex flex-col justify-between h-full">
          {/* Card Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title & Description */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Price & Address */}
            <div className="mt-4 sm:mt-6">
              <p>
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  ${price}
                </span>
              </p>
              <span className="text-xs sm:text-sm md:text-lg font-medium text-gray-400 block mt-2">
                {address}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 sm:mt-8">
            <GlowingButton label={buttonText} onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
