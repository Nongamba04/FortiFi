"use client";
import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import copy from "../assets/copy.svg";

interface WalletAddress {
  walletAddr: string;
}

export const SendTransaction: React.FC<WalletAddress> = ({ walletAddr }) => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("buy");

  const handleTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.ethereum) {
      console.log("MetaMask not installed");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: receiver,
        value: ethers.parseEther(amount),
      });
      console.log(`Transaction successful, Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddr);
    alert("Wallet address copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-1/2 mx-auto">
      <div className="flex flex-col items-center justify-center bg-[#212121] shadow-lg shadow-green-500 rounded-lg border border-green-500 p-6 w-full min-h-[320px]">
        <div className="flex w-full">
          <button
            className={`flex-1 text-center py-3 font-semibold transition-all ${
              activeTab === "buy"
                ? "text-white bg-[#1a1a1a] rounded-tl-xl"
                : "text-gray-500 bg-[#222]"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Send
          </button>
          <button
            className={`flex-1 text-center py-3 font-semibold transition-all ${
              activeTab === "sell"
                ? "text-white bg-[#1a1a1a] rounded-tr-xl"
                : "text-gray-500 bg-[#222]"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Deposit
          </button>
        </div>

        <form
          onSubmit={handleTransaction}
          className="w-full bg-[#1a1a1a] flex flex-col justify-between min-h-[200px]"
        >
          <div className="mt-8 space-y-4 flex-grow flex flex-col justify-center">
            {activeTab === "buy" ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Recipient Address"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                />

                <p className="font-medium text-sm">
                  Note:-Only ERC-20 availale(Gas Fee: 0.0024ETH)
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between bg-transparent border border-gray-500 rounded-md p-3 text-white">
                <span className="text-xs sm:text-sm md:text-lg font-medium text-gray-400 block mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                  {walletAddr}
                </span>
              </div>
            )}
          </div>

          <button
            type={activeTab === "buy" ? "submit" : "button"}
            className="w-full mt-6 py-3 bg-transparent border border-green-400 text-green-400 font-semibold rounded-md hover:bg-green-400 hover:text-black transition"
            onClick={activeTab === "sell" ? copyToClipboard : undefined}
          >
            {activeTab === "buy" ? "Send ETH" : "Copy Address"}
          </button>
        </form>
      </div>
    </div>
  );
};
