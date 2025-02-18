"use client"
import React, { useState } from 'react';

interface MenuButtonProps {
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({onClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative w-12 h-12 rounded-md border-none bg-[#040f16] text-[#f5f5f5] font-semibold text-lg flex items-center overflow-hidden transition-all duration-500 ease-in-out shadow-sm hover:shadow-lg focus:outline-none"
    >
      {/* Icon */}
      <span
        className={`absolute flex justify-center items-center h-10 ${
          isHovered ? 'w-[150px]' : 'w-[70px]'
        } transition-all duration-500 `}
      >
        <svg viewBox="0 0 175 80" width="40" height="40">
          <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
          <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
          <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
        </svg>
      </span>

      {/* Text */}
      {/* <span
        className={`transform ${
          isHovered ? 'opacity-0' : 'translate-x-14'
        } transition-all duration-500`}
      >
        MENU
      </span> */}
    </button>
  );
};

export default MenuButton;
