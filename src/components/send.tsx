"use client"
import React, { useState } from 'react'
import { ethers, BrowserProvider } from 'ethers'

export const SendTransaction = () => {
    const [reciever, setReciever] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    const handleTransaction = async () => {
        if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            try {
                const tx = await signer.sendTransaction({
                    to: reciever,
                    value: ethers.parseEther(amount)
                });

                console.log(`Transaction successful, Hash: ${tx.hash}`)
            } catch (error) {
                console.error('Error sending transaction:', error);
            }
        } else {
            console.log('MetaMask not installed');
        }
    }

    return (
        <div
            className="flex flex-col items-center min-h-screen justify-center p-6 "
            
        >
            <h1>Send Eth</h1>
            <input
                type="text"
                placeholder="Receiver Address"
                value={reciever}
                onChange={(e) => setReciever(e.target.value)}
                className="p-2 border rounded mb-4 w-72 text-black "
            />
            <input
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded mb-4 w-72 text-black"
            />
            <button
                onClick={handleTransaction}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
                Send ETH
            </button>
        </div>
    )
}
