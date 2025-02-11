"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";  // Assuming you're using a button component from your UI library
import getContract from "@/app/GetContract/GetData";  // Your contract interaction file
import { XCircle, CheckCircle } from "lucide-react";  // For showing icons in the popup

export default function UpdateListingFeeButton() {
  const [showPopup, setShowPopup] = useState(false);  // State for popup visibility
  const [newListingFee, setNewListingFee] = useState<string>("");  // State for new fee input
  const [loading, setLoading] = useState(false);  // Loading state for the transaction
  const [success, setSuccess] = useState(false);  // Success state for showing success message
  const [error, setError] = useState<string | null>(null);  // Error state for transaction errors

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);  // Toggle the popup visibility
  };

  const handleFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewListingFee(event.target.value);  // Update the fee input state
  };

  const updateListingFee = async () => {
    if (!newListingFee || isNaN(Number(newListingFee)) || Number(newListingFee) <= 0) {
      alert("Please enter a valid fee.");
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();

      // Call the contract function to update the listing price
      const tx = await contract.UpdateListingPrice(ethers.parseEther(newListingFee), {
        value: ethers.parseEther(newListingFee), // Sending the value along with the transaction
        gasLimit: 6721975,  // Adjust gas limit if necessary
      });

      await tx.wait();  // Wait for the transaction to be mined

      setSuccess(true);  // Update the success state to show success message
      setError(null);  // Reset error message
      setNewListingFee("");  // Clear the input field
    } catch (error) {
      console.error("Error updating listing fee:", error);
      setError("Transaction failed. Please try again.");
      setSuccess(false);  // Set success to false if the transaction fails
    } finally {
      setLoading(false);  // Set loading to false once the transaction is complete
    }
  };

  return (
    <div className="relative top-8 right-6 z-20">
      {/* Button positioned on the screen */}
      <Button
        onClick={handlePopupToggle}
        className="px-7 py-5 ml-30 bg-pink-600 hover:bg-slate-900 font-bold text-white rounded-lg z-10"
      >
        Update Listing Fee
      </Button>

      {/* Popup for entering new listing fee */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96 relative">
            {/* Close button on the form */}
            <button
              onClick={handlePopupToggle}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
            >
              <XCircle size={24} />
            </button>

            <h3 className="text-xl font-semibold text-center mb-4">Enter New Listing Fee</h3>
            <input
              type="number"
              placeholder="Enter new fee in ETH"
              value={newListingFee}
              onChange={handleFeeChange}
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
            <Button
              onClick={updateListingFee}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg"
              disabled={loading}
            >
              {loading ? "Processing..." : "Update Fee"}
            </Button>

            {/* Success Message */}
            {success && (
              <div className="flex items-center bg-green-600 text-white p-3 rounded-lg mt-4">
                <CheckCircle className="mr-2" size={24} />
                Listing fee updated successfully!
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center bg-red-600 text-white p-3 rounded-lg mt-4">
                <XCircle className="mr-2" size={24} />
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
