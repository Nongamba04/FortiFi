import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ethers, BrowserProvider } from "ethers";
import PricingCard from "./Card";
import CryptoCard from "./CryptoCard";
import ethereum from "../assets/ethereum.svg";
import btc from "../assets/btc.svg";
import sol from "../assets/sol.svg";
import doge from "../assets/doge.svg";
import bnb from "../assets/bnb.svg";
import chainlink from "../assets/chainlink.svg";
import hedera from "../assets/hedera.svg";
import litecoin from "../assets/litecoin.svg";
import xrp from "../assets/xrp.svg";
import shiba from "../assets/shiba.svg";
import cardano from "../assets/cardano.svg";
import avalanche from "../assets/avalanche.svg";
import stEther from "../assets/staked_ether.svg";
import sui from "../assets/sui.svg";
import stellar from "../assets/stellar.svg";
import tether from "../assets/tether.svg";
import usdc from "../assets/usdc.svg";
import tron from "../assets/tron.svg";
import wbtc from "../assets/wbtc.svg";
import wsteth from "../assets/wsteth.svg";
import ton from "../assets/ton.svg";

import leftScroll from "../assets/left_arrow.svg";
import rightScroll from "../assets/right_arrow.svg";

// Define expected crypto data structure
interface CryptoData {
  usd: number;
  usd_24h_change: number;
}

// Define type for fetched crypto object
interface CryptoApiResponse {
  [key: string]: CryptoData;
}

interface WalletAddress {
  walletAddr: string;
  connectWallet: () => void;
}

// Define type for crypto icons mapping
const cryptoIcons: Record<string, string> = {
  ethereum: ethereum,
  bitcoin: btc,
  solana: sol,
  dogecoin: doge,
  binancecoin: bnb,
  "avalanche-2": avalanche,
  chainlink: chainlink,
  cardano: cardano,
  "hedera-hashgraph": hedera,
  litecoin: litecoin,
  ripple: xrp,
  "shiba-inu": shiba,
  "staked-ether": stEther,
  sui: sui,
  stellar: stellar,
  tether: tether,
  "usd-coin": usdc,
  tron: tron,
  "wrapped-bitcoin": wbtc,
  "wrapped-steth": wsteth,
  "the-open-network": ton,
};

const cryptoTitles: Record<string, string> = {
  ethereum: "ETH",
  bitcoin: "BTC",
  solana: "SOL",
  dogecoin: "DOGE",
  binancecoin: "BNB",
  "avalanche-2": "AVAX",
  chainlink: "LINK",
  cardano: "ADA",
  "hedera-hashgraph": "HBAR",
  litecoin: "LTC",
  ripple: "XRP",
  "shiba-inu": "SHIB",
  "staked-ether": "stETH",
  sui: "SUI",
  stellar: "XLM",
  tether: "USDT",
  "usd-coin": "USDC",
  tron: "TRX",
  "wrapped-bitcoin": "WBTC",
  "wrapped-steth": "wstETH",
  "the-open-network": "TON",
};

const cryptoCategories: Record<string, string> = {
  ethereum: "DeFi, PoS, Smart Contracts",
  bitcoin: "PoW, Store of Value",
  solana: "PoS, Smart Contracts",
  dogecoin: "PoW, Meme Coin",
  binancecoin: "Exchange Token, PoS",
  "avalanche-2": "PoS, Smart Contracts",
  chainlink: "DeFi, Oracle",
  cardano: "PoS, Smart Contracts",
  "hedera-hashgraph": "PoS, DAG",
  litecoin: "PoW, Payments",
  ripple: "Payments, Banking",
  "shiba-inu": "Meme Coin, DeFi",
  "staked-ether": "Staking, PoS",
  sui: "PoS, Smart Contracts",
  stellar: "Payments, Banking",
  tether: "Stablecoin, Payments",
  "usd-coin": "Stablecoin, Payments",
  tron: "PoS, Smart Contracts",
  "wrapped-bitcoin": "Tokenized BTC, DeFi",
  "wrapped-steth": "Staking, PoS",
  "the-open-network": "PoS, Smart Contracts",
};

// API function to fetch top 20 crypto prices
const fetchCryptoPrices = async (): Promise<CryptoApiResponse | null> => {
  try {
    const response = await fetch("http://localhost:5000/crypto-prices");
    if (!response.ok) throw new Error("Failed to fetch crypto prices");
    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return null;
  }
};

export const WalletConnect: React.FC<WalletAddress> = ({
  walletAddr,
  connectWallet,
}) => {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cryptoData, setCryptoData] = useState<CryptoApiResponse | null>(null);

  // Ref for scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getBalance = async () => {
      if (window.ethereum && walletAddr) {
        setLoading(true);
        try {
          const provider = new BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(walletAddr);
          setBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (walletAddr) getBalance();
  }, [walletAddr]);

  useEffect(() => {
    const loadCryptoData = async () => {
      const data = await fetchCryptoPrices();
      setCryptoData(data);
    };
    loadCryptoData();
  }, []);

  // Scroll function
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center gap-6 py-16 px-2">
      {/* Wallet Section */}
      <div className="w-full md:w-[60%] flex flex-col items-center gap-4 z-20">
        <PricingCard
          title="My Wallet"
          description="Portfolio:"
          price={isLoading ? "Loading..." : balance}
          address={walletAddr || "No account connected"}
          buttonText={walletAddr ? "Connected" : "Connect"}
          onClick={connectWallet}
        />
      </div>

      {/* Crypto Cards Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start gap-2 relative">
        <h1 className="font-bold text-xl">Top Coins</h1>

        {/* Scroll Buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full z-10 hover:bg-white/30"
        >
          <Image src={leftScroll} alt="Scroll Left" width={30} height={30} />
        </button>

        {/* Scrollable Crypto Cards */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 py-4 no-scrollbar"
        >
          {cryptoData ? (
            Object.entries(cryptoData).map(([key, value]) => (
              <div key={key} className="snap-center shrink-0">
                <CryptoCard
                  name={
                    cryptoTitles[key.toLowerCase()] ||
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }
                  category={cryptoCategories[key.toLowerCase()] || "Blockchain"} // Use category mapping
                  price={`${value.usd.toFixed(2)}`}
                  imageUrl={cryptoIcons[key.toLowerCase()] ?? ethereum}
                  priceChange={`${value.usd_24h_change.toFixed(2)}`}
                />
              </div>
            ))
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full z-10 hover:bg-white/30"
        >
          <Image src={rightScroll} alt="Scroll Right" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};
