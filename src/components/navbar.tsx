"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuButton from "./MenuButton";
import Image from "next/image";
import logo from "../assets/logo.png"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Prices", path: "/prices" },
  { name: "Sell/Buy", path: "/transactions" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                bg-white/10 backdrop-blur-lg shadow-lg border border-white/20
                rounded-full px-6 py-2 md:py-4 max-w-4xl w-full flex items-center justify-between">
      
      {/* Logo with Space */}
      <div className="text-xl font-bold text-white flex-1">
        <Image src={logo} alt="no logo" className="w-[120px] h-[70px] filter invert"/>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className="text-white hover:text-blue-300 font-medium transition duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <MenuButton onClick={() => setIsMenuOpen((prev) => !prev)} />
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/10 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md p-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block text-white hover:text-blue-300 font-medium py-2 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
