"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAccountAddress, setNftData, setNftId } from "@/app/Redux/CreateSlice";
import { ethers } from "ethers";
import getContract from "@/app/GetContract/GetData";
import BuyNFTButton from "../BuyNFT/BuyNFT";
import axios from "axios";
import { motion } from "framer-motion";
import { Dispatch } from "@reduxjs/toolkit";


export interface MarketItem {
  tokenId: number;
  owner: string;
  seller: string;
  price: string;
  NftURI: string;
  sold: boolean;
  metadata?: NFTMetadata; // Add this line
}


interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  time: number;
}

export default function ExploreNFT() {
  const [address, setAddress] = useState<string | null>(null);
  const [nfts, setNfts] = useState<MarketItem[]>([]);
  const [metadata, setMetadata] = useState<Record<number, NFTMetadata>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch(); 

  useEffect(() => {
    fetchNFTs();
    getAddress();
  }, []);

  const getAddress = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const add = await signer.getAddress();
      setAddress(add);
      dispatch(setAccountAddress(add));
      console.log("Address:", add);
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  const fetchNFTs = async () => {
    try {
      const contract = await getContract();
      const nftData = await contract.getAllNft();
      console.log("NFT Data:", nftData);

      const formattedNFTs: MarketItem[] = nftData.map((item: MarketItem) => ({
        tokenId: Number(item.tokenId),
        owner: item.owner,
        seller: item.seller,
        price: ethers.formatEther(item.price),
        NftURI: item.NftURI,
        sold: item.sold
      }));

      setNfts(formattedNFTs);
      fetchMetadataForNFTs(formattedNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNFT = (nftId: number, dispatch: Dispatch) => {
    dispatch(setNftId(nftId.toString()));
  };

  const fetchMetadataForNFTs = async (nfts: MarketItem[]) => {
    const metadataMap: Record<number, NFTMetadata> = {};
    await Promise.all(
      nfts.map(async (nft) => {
        try {
          const response = await axios.get<NFTMetadata>(nft.NftURI);
          metadataMap[nft.tokenId] = response.data;
        } catch (error) {
          console.error(`Error fetching metadata for NFT ${nft.tokenId}:`, error);
        }
      })
    );

    setMetadata(metadataMap);

    const additionalData: MarketItem[] = nfts.map((nft) => ({
      ...nft,
      metadata: metadataMap[nft.tokenId]
    }));

    additionalData.sort((a, b) => (b.metadata?.time || 0) - (a.metadata?.time || 0));
    dispatch(setNftData(additionalData));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        Explore NFTs
      </motion.h1>

      {loading ? (
        <p className="text-center text-lg">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-lg">No NFTs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts
            .sort((a, b) => (metadata[b.tokenId]?.time || 0) - (metadata[a.tokenId]?.time || 0))
            .map((nft) => {
              const nftMetadata = metadata[nft.tokenId];
              return (
                <div key={nft.tokenId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  {nftMetadata ? (
                    <>
                      <img
                        src={nftMetadata.image}
                        alt={nftMetadata.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <h2 className="text-xl font-bold mt-4">{nftMetadata.name}</h2>
                      <p className="text-gray-400 mt-2">{nftMetadata.description}</p>
                      <p className="mt-2 font-semibold">Price: {nft.price} ETH</p>
                      <Link href="/NftDetails">
                        <button
                          onClick={() => handleSelectNFT(nft.tokenId, dispatch)}
                          className="mt-4 text-blue-500 hover:underline"
                        >
                          See Details
                        </button>
                      </Link>
                      {nft.sold ? (
                        <p className="text-xl text-red-500 mt-3">Not For Sale Currently</p>
                      ) : (
                        <p className="text-xl text-green-700 mt-3">For Sale</p>
                      )}
                      {!nft.sold && nft.seller !== address ? (
                        <BuyNFTButton nftId={nft.tokenId} price={nft.price} />
                      ) : null}
                    </>
                  ) : (
                    <p className="text-gray-400">Loading...</p>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
