"use client";
import React, { useState } from "react";
import Image from "next/image";

import { WalletConnect } from "@/components/WalletConnect";
import { WalletInfo } from "@/components/WalletInfo";
import { SendTransaction } from "@/components/TransactionCard";
import { Navbar } from "@/components/navbar";
import { LearnHero } from "@/components/LearnHero";

export default function Home() {
  const [walletAddr, setWalletAddr] = useState<string>("");

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
  return (
    <>
      <Navbar />
      <WalletConnect walletAddr={walletAddr} connectWallet={connectWallet} />
      {/* <WalletInfo /> */}
      <LearnHero />
      <div id="transactions-section" className="mt-20">
        {" "}
        {/* Adjust margin as needed */}
        <SendTransaction walletAddr={walletAddr} />
      </div>
    </>
  );
}
