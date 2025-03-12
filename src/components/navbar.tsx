"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuButton from "./MenuButton";
import Image from "next/image";
import logo from "../assets/logo.png";
import { smoothScrollTo } from "@/utils/smoothScrollTo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Sell/Buy", path: "/transactions", sectionId: "transactions-section" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Function to handle scrolling
  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    event.preventDefault();
    smoothScrollTo(sectionId);
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <nav
  className="fixed top-0 left-0 right-0 z-50
  bg-white/10 backdrop-blur-lg shadow-lg border border-white/20
  rounded-full my-2 mx-auto px-6 py-2 md:py-3 max-w-4xl w-full flex items-center justify-between"
>
      {/* Logo with Space */}
      <div className="text-xl font-bold text-white flex-1">
        <Link
        href="/">
        <Image
          src={logo}
          alt="no logo"
          className="w-[120px] h-[70px] filter invert"
        /></Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) =>
          link.sectionId ? (
            <a
              key={link.name}
              href={`#${link.sectionId}`}
              onClick={(e) => handleSmoothScroll(e, link.sectionId!)}
              className="text-white hover:text-blue-300 font-medium transition duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              href={link.path}
              className="text-white hover:text-blue-300 font-medium transition duration-300"
            >
              {link.name}
            </Link>
          )
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <MenuButton onClick={() => setIsMenuOpen((prev) => !prev)} />
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/10 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-md p-4 md:hidden">
          {navLinks.map((link) =>
            link.sectionId ? (
              <a
                key={link.name}
                href={`#${link.sectionId}`}
                onClick={(e) => handleSmoothScroll(e, link.sectionId!)}
                className="block text-white hover:text-blue-300 font-medium py-2 transition duration-300 cursor-pointer"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className="block text-white hover:text-blue-300 font-medium py-2 transition duration-300"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};
