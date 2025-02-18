import React from "react";
import Image from "next/image";
import LongCard from "./LongCard";
import btcImg from "../assets/c1.webp";
import tradingImg from "../assets/c2.png";
import geometric from "../assets/geometric.svg";
import AsciiSphere from "./AsciiSphere";

const assets = [
  {
    url: "https://blog.kraken.com/crypto-education/kraken-101-the-beginners-guide-to-bitcoin-btc",
    coverImg: btcImg,
    title: "Crypto 101: The Beginner’s Guide to Bitcoin (BTC)",
  },
  {
    url: "https://onetrading.com/blogs/crypto-fundamentals-crypto-trading-strategies-for-beginners",
    coverImg: tradingImg,
    title: "Learn Crypto: Trading Strategies for Beginners",
  },
];

export const LearnHero = () => {
  return (
    <section className=" text-white flex flex-col items-center justify-center text-center">
      {/* Icon & Title */}
      <div className="flex flex-col items-center mb-6">
      {/* <AsciiSphere /> */}
        <h1 className="text-3xl font-bold">New To Crypto?</h1>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col items-center w-full gap-6">
        {assets.map((item, index) => (
          <LongCard key={index} url={item.url} coverImg={item.coverImg} text={item.title} />
        ))}
      </div>
    </section>
  );
};
