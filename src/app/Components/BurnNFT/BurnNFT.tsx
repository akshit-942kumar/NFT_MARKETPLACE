import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import getContract from "@/app/GetContract/GetData";
import { useRouter } from "next/navigation";  // Import useRouter for navigation

export default function BurnNFTButton({ tokenId }: { tokenId: number }) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Initialize router

  // Function to handle NFT burning
  const handleBurnNFT = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const contract = await getContract();
      const listingPrice = await contract.getListingPrice();
      const transaction = await contract.burnNFT(tokenId, { value: listingPrice });
      await transaction.wait();
      setSuccess(true);

      // Redirect to the Explore NFTs page after successful burn
      setTimeout(() => {
        router.push("/Components/ExploreNFT"); // Navigate to Explore NFTs page
      }, 3000);  // Redirect after a 2-second delay to give the user time to see the success message
    } catch (error) {
      console.log(error);
      setError("Failed to burn NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle opening and closing the confirmation popup
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {/* Burn NFT Button at the bottom-left */}
        <Button
          onClick={handlePopupToggle}
          className="relative left-4 bottom-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all mr-3 transform hover:scale-105 hover:shadow-2xl flex items-center"
        >
          <span className="mr-3">Burn NFT</span>
        </Button>
      </motion.div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="relative bg-gray-800 text-white p-6 rounded-lg w-96 shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {/* Close Button in Top Right */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
              onClick={handlePopupToggle}
            >
              <XCircle size={24} />
            </button>

            <h3 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to burn this NFT?
            </h3>
            <div className="flex justify-between">
              <Button
                onClick={handleBurnNFT}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Yes"}
              </Button>
              <Button
                onClick={handlePopupToggle}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                No
              </Button>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="flex items-center bg-green-600 text-white p-2 rounded-lg mt-4"
              >
                <CheckCircle className="mr-2" size={20} />
                NFT burned successfully!
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="flex items-center bg-red-600 text-white p-2 rounded-lg mt-4"
              >
                <XCircle className="mr-2" size={20} />
                {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
