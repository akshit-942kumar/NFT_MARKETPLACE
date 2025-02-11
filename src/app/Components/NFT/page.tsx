"use client";
import { useState } from "react";
import { uploadFileToPinata } from "../CreateNFT/uploadFile";
import { uploadMetadataToPinata } from "../CreateNFT/uploadData";
import { ethers } from "ethers";
import { motion } from "framer-motion";
// import abi from "../../GetContract/abi.json"
import { FaUpload, FaSpinner, FaCheckCircle } from "react-icons/fa";
import  getContract  from "../../GetContract/GetData"; // Import the getContract function
import { NFTMetaData } from "@/app/Redux/CreateSlice";

const NFTPage = () => {
  // const [nftMetadata, setNftMetadata] = useState<any>(null);
  
  const [nftImageUrl, setNftImageUrl] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [nftDescription, setNftDescription] = useState<string>("");
  const [nftPrice, setNftPrice] = useState<string>(""); // Price in Ether
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      try {
        const uploadedImageUrl = await uploadFileToPinata(file);
        setNftImageUrl(uploadedImageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMintNFT = async () => {
    if (!nftImageUrl || !nftPrice) {
      alert("Please upload an image and set a price.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const metadata:NFTMetaData = {
      name: nftName,
      description: nftDescription,
      image: nftImageUrl,
      time: Math.floor(Date.now() / 1000).toString()
    };

    try {
      
      const metadataUrl = await uploadMetadataToPinata(metadata);
      // setNftMetadata(metadata);
      console.log("Metadata URL:", metadataUrl);

      const get = await getContract()
      // const contract =new ethers.Contract("0xC4D0195E6B10420A1FDa93a15C3b52862D186422",abi.abi,signer)
      
      
      // const provider=  new ethers.BrowserProvider(Window.ethereum)
      
      const listingPrice = await get.getListingPrice()
      console.log("listing price",typeof(listingPrice.toString()))
      const price:string=(listingPrice).toString()


      const priceInEther = ethers.parseEther(nftPrice); // This is optional but keeps it clean
      
      // Call the smart contract's createNFT function
      const transaction = await get.createNFT(metadataUrl, priceInEther,{
        value:price,
       gasLimit:6721975
        // Send the payment with the transaction in Ether
      });

      const receipt=await transaction.wait();
      console.log("Transaction Receipt:", receipt);
      

      // Show the success popup message
      setPopupMessage("NFT Minted Successfully!");

      // Hide the popup message after 3 seconds
      setTimeout(() => setPopupMessage(null), 4000);
    } catch (error) {
      console.log("Error minting NFT:", error);
      setError("Failed to mint NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#1f1f1f] p-6 text-white relative">
      
      {/* Slide-in NFT Minted Message */}
      {popupMessage && (
        <motion.div
          className="absolute top-4 left-0 w-full bg-green-500 text-white p-4 rounded-r-lg shadow-md text-center z-10"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaCheckCircle className="inline mr-2" />
          {popupMessage}
        </motion.div>
      )}

      {/* Attractive Mint Your NFT Section */}
      <motion.h1
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Mint Your NFT
      </motion.h1>

      <div className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-md overflow-auto">
        <input
          type="text"
          placeholder="Enter NFT Name"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
        />
        <textarea
          placeholder="Enter NFT Description"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={nftDescription}
          onChange={(e) => setNftDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter NFT Price (in ETH)"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={nftPrice}
          onChange={(e) => setNftPrice(e.target.value)}
        />
        <motion.label
          className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaUpload className="text-3xl text-gray-500" />
          <span className="mt-2 text-sm font-medium">Upload NFT Image</span>
          <input type="file" className="hidden" onChange={handleFileChange} disabled={isLoading} />
        </motion.label>
        {nftImageUrl && (
          <motion.img
            src={nftImageUrl}
            alt="NFT Preview"
            className="mt-4 w-full rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
        <motion.button
          onClick={handleMintNFT}
          disabled={isLoading}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Mint NFT"}
        </motion.button>
      </div>

      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
};

export default NFTPage;
