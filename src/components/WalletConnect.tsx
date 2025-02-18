"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { fetchCrypto } from "../utils/fetchCrypto.js";
import ethereum from "../assets/ethereum.svg";
import btc from "../assets/btc.svg";
import sol from "../assets/sol.svg";
import PricingCard from "./Card";
import CryptoCard from "./CryptoCard";

// Define expected crypto data structure
interface CryptoData {
  usd: number;
  usd_24h_change: number;
}

// Define type for fetched crypto object
interface CryptoApiResponse {
  [key: string]: CryptoData;
}

// Define type for crypto icons mapping
const cryptoIcons: Record<string, string> = {
  ethereum: ethereum,
  bitcoin: btc,
  solana: sol,
};

export const WalletConnect = () => {
  const [walletAddr, setWalletAddr] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cryptoData, setCryptoData] = useState<CryptoApiResponse | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddr(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

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
    const fetchCryptoPrices = async () => {
      try {
        const data: CryptoApiResponse = await fetchCrypto();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row justify-center items-center gap-6 py-16 px-2 ">

      {/* Wallet Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4 z-20">
        <PricingCard
          title="My Wallet"
          description="Portfolio:"
          price={balance}
          address={walletAddr ? walletAddr : "No account connected"}
          buttonText={walletAddr ? `Connected` : "Connect"}
          onClick={connectWallet}
        />
      </div>

      {/* Crypto Cards Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start gap-2">
        <h1 className="font-bold text-xl">Top Coins</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-items-center z-20">
          {cryptoData
            ? Object.entries(cryptoData).map(([key, value]) => (
                <CryptoCard
                  key={key}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}

                  category="Blockchain"
                  price={`${value.usd.toFixed(2)}`}
                  imageUrl={cryptoIcons[key.toLowerCase()] ?? ethereum}
                  priceChange={`${value.usd_24h_change.toFixed(2)}`}
                />
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
