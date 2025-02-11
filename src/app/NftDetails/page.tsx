"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store"; // Ensure this path is correct
import SellButton from "../Components/ResellNFT/Sell";
import BurnNFTButton from "../Components/BurnNFT/BurnNFT";
import { MarketItem } from "../Components/ExploreNFT/page";

export default function NftDetails() {
  const add = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [owner, setOwner] = useState<string>("");
  const [, setResell] = useState<boolean>(false);

  const selectedNftId = useSelector((state: RootState) => state.smartContract.NftId);
  console.log("NFT ID:", selectedNftId);

  const Address = useSelector((state: RootState) => state.smartContract.accountAddress);
  const nftData = useSelector((state: RootState) => state.smartContract.nftData);
  console.log("NFT Data:", nftData);

  const [nft, setNft] = useState<MarketItem | null>(null);

  useEffect(() => {
    if (nftData && selectedNftId) {
      const selectedNft: MarketItem | undefined = nftData.find(
        (nft: MarketItem) => nft.tokenId.toString() === selectedNftId.toString()
      );
      setNft(selectedNft || null); // Ensure it's never undefined
    }
  }, [nftData, selectedNftId]);

  // ✅ Move owner logic inside useEffect
  useEffect(() => {
    if (nft) {
      console.log("NFT:", nft.owner);
      setOwner(nft.owner === add ? nft.seller : nft.owner);
    }
  }, [nft]);

  useEffect(() => {
    if (nft?.sold) {
      setResell(true);
    }
  }, [nft]);

  // ✅ Convert Unix timestamp to readable date
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "Unknown";
    console.log(timestamp);
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format as a human-readable date
  };

  if (!nft) {
    return <p className="text-center text-xl text-gray-400">Loading NFT details...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{nft.metadata?.name || "Unnamed NFT"}</h1>
      <div className="text-center">
        {nft.metadata?.image && (
          <img
            src={nft.metadata.image}
            alt={nft.metadata.name || "NFT Image"}
            className="w-full sm:w-96 h-96 object-cover rounded-lg mx-auto"
          />
        )}
        <p className="text-gray-400 text-xl mt-4">
          <span className="text-red-400 font-bold text-xl"> Description: </span>
          {nft.metadata?.description || "No description available."}
        </p>
        <p className="mt-4 text-xl">
          <span className="text-blue-400 font-bold text-2xl"> Price:</span> {nft.price} ETH
        </p>
        <p className="mt-4 text-gray-400 text-2xl">
          <span className="text-orange-500 font-bold text-2xl">Owner: </span> 
          <span className="text-gray-300 break-words">{owner}</span>
        </p>
        <p className="mt-4 text-2xl text-gray-400">
          <span className="text-white font-bold text-2xl">NFT Id:</span> {nft.tokenId}
        </p>
        <p className="mt-4 text-2xl text-gray-400">
          <span className="text-white text-2xl">Created On:</span>{" "}
          {formatDate(nft.metadata?.time)}
        </p>
      </div>

      {/* Sell & Burn Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        {nft.sold && nft.owner === Address && <SellButton tokenId={nft.tokenId} />}
        {nft.sold && nft.owner === Address && <BurnNFTButton tokenId={nft.tokenId} />}
      </div>
    </div>
  );
}
