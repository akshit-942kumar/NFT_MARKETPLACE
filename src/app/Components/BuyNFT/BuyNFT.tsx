import { ethers } from "ethers";
import { useState } from "react";
import getContract from "@/app/GetContract/GetData";
import { motion } from "framer-motion";

const BuyNFTButton = ({ nftId, price }: { nftId: number, price: string }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buyNFT = async () => {
    if (!window.ethereum) {
      setError("MetaMask is required to buy NFTs.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const contract = await getContract();

      const tx = await contract.createMarketSale(nftId, {
        value: ethers.parseEther(price.toString()),
      });

      await tx.wait(); // Wait for transaction to complete
      setShowModal(true); // Show modal after success
    } catch (error: unknown) {
      console.error("Error buying NFT:", error);

      // Check if the error is an instance of Error
      if (error instanceof Error) {
        // Check for insufficient funds error
        if (
          error.message.includes("insufficient funds")
        ) {
          setError(
            "You don't have enough Ether to buy this NFT. Please add more funds to your wallet."
          );
        } else {
          setError(
            "An error occurred while processing the transaction. Please try again."
          );
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page after closing the modal
  };

  const handleCloseError = () => {
    setError(null); // Close the error message
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative text-white">
      {/* NFT Card Container */}
      <button
        onClick={buyNFT}
        className="absolute right-4 bottom-4 px-8 py-4 bg-black text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>

      {/* Error Message at Top of Screen */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
          className="fixed inset-0 flex m-4 items-center justify-center z-50"
        >
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg w-[30rem] text-center">
            <div className="mb-4">{error}</div>
            <button
              onClick={handleCloseError}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal Popup for Successful Purchase */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center mb-4">
              NFT Purchased Successfully!
            </h2>
            <p className="text-center">
              You have successfully purchased this NFT.
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNFTButton;
