import { ethers } from "ethers";
import { useState } from "react";
import getContract from "@/app/GetContract/GetData";

const BuyNFTButton = ({ nftId, price }: { nftId: number, price: string }) => {
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);  // State to control success popup visibility
  const [showModal, setShowModal] = useState(false);  // State to toggle modal visibility

  const buyNFT = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required to buy NFTs.");
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();

      const tx = await contract.createMarketSale(nftId, {
        value: ethers.parseEther(price.toString()) // Send exact price
         // Adjust gas limit if needed
      });

      await tx.wait(); // Wait for transaction to complete
      // setSuccess(true);  // Set success state to true
      setShowModal(true);  // Show modal after success

      // Optionally reload the page after a few seconds (not immediately)
      // setTimeout(() => {
      //   window.location.reload(); // Reload the page after 1 second delay
      // }, 3000); // Delay 3 seconds before page reload

    } catch (error) {
      console.error("Error buying NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Hide the modal
    // Reload the page 1 second after closing the modal

      window.location.reload(); // 1 second delay before reloading
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
      {/* NFT Card Container */}
      <button
        onClick={buyNFT}
        className="absolute right-4 bottom-4 px-8 py-4 bg-black text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>

      {/* Modal Popup for Successful Purchase */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center mb-4">NFT Purchased Successfully!</h2>
            <p className="text-center">You have successfully purchased this NFT. </p>
            <button
              onClick={handleCloseModal}  // Close the modal and reload the page after 1 second
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
