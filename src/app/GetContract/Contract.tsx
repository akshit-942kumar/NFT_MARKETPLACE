"use client";

import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { setAccountAddress } from "../Redux/CreateSlice";
import { useState, useEffect } from "react";

export default function Contract() {
  const [address, setAddress] = useState<string | null>(
    typeof window !== "undefined" ? sessionStorage.getItem("walletAddress") : null
  ); // Get address from sessionStorage
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [pendingAddress, setPendingAddress] = useState<string | null>(null); // Temporarily store account change
  const dispatch = useDispatch();

  // Listen for account changes when the component mounts
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setPendingAddress(accounts[0]); // Temporarily store the new account address
        console.log("MetaMask account changed to:", accounts[0]);
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged); // Clean up listener
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        alert("MetaMask not detected. Please install MetaMask.");
        setLoading(false);
        return;
      }

      // Request accounts from MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setAddress(walletAddress); // Update address after click
      dispatch(setAccountAddress(walletAddress));

      // Store the address in sessionStorage
      sessionStorage.setItem("walletAddress", walletAddress);

      console.log("Wallet Connected:", walletAddress);

      // Reload the window after wallet connection to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bottom-12 right-4 z-20">
      <button
        onClick={connectWallet}
        className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        } text-white shadow-lg transform active:scale-95 focus:outline-none`}
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin border-t-2 border-white w-6 h-6 rounded-full mx-auto"></div>
        ) : address ? (
          <span>
            <span className="text-black">Connected:</span>
            <span>{` ${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          </span>
        ) : pendingAddress ? (
          // If account has been changed but not yet clicked, show pending address
          <span>
            <span className="text-black">Switching to:</span>
            <span>{` ${pendingAddress.slice(0, 6)}...${pendingAddress.slice(-4)}`}</span>
          </span>
        ) : (
          "Connect Wallet"
        )}
      </button>
    </div>
  );
}
