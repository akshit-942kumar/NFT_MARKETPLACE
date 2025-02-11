"use client";
import { motion } from "framer-motion"; // Import framer-motion for animations
import Contract from "@/app/GetContract/Contract";
import Link from "next/link";
import UpdateListingFeeButton from "../UpdateFees/Update";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
export default function Home() {
  const owner =process.env.NEXT_PUBLIC_OWNER_ADDRESS
  const [address,setAddress]=useState<string>()
  async function get(){
  const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        setAddress(walletAddress)

  }
  useEffect(()=>{
    get()
  },[])

  
  return (
    <div className="flex flex-col bg-black items-center justify-center h-screen relative animate-gradient">
      {/* Position the contract button at the top-right corner */}
      <div className="absolute top-20 right-4 z-10">
        <Contract />
      </div>

      {/* Position the Update Listing Fee button below the contract button */}
      { owner==address ? 
        (<div className="absolute top-20 right-6 z-20">
        <UpdateListingFeeButton />
      </div>) :(null)

      }
      

      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-800 via-black to-gray-900 opacity-50 z-0"></div>

      {/* Content (heading and buttons) */}
      <motion.h1
        className="text-4xl text-white font-bold z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        Welcome to the NFT Marketplace
      </motion.h1>
      <p className="text-gray-400 mt-4 z-10">Discover, Collect & Sell NFTs</p>

      <div className="mt-6 flex space-x-4 z-10">
        {/* Button to create NFT */}
        <Link href="/Components/NFT">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition">
            Create NFT
          </button>
        </Link>

        {/* Button to explore NFTs */}
        <Link href="/Components/ExploreNFT">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Explore NFTs
          </button>
        </Link>
      </div>
    </div>
  );
}
