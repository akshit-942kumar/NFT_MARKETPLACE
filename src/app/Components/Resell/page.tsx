'use client';

import { Suspense } from 'react';
import { useState } from "react";
import getContract from "@/app/GetContract/GetData";
import { ethers } from "ethers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, Wallet, Tag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function ResellContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Id = searchParams.get("tokenId");

  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleResellNFT = async () => {
    if (!price) {
      setError("Please enter a price to resell your NFT.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const contract = await getContract();
      const listingPrice = await contract.getListingPrice();
      const ListingPrice = listingPrice.toString();
      const priceInEther = ethers.parseEther(price);

      const transaction = await contract.resellNFT(Id, priceInEther, {
        value: ListingPrice,
        gasLimit: 6721975,
      });

      await transaction.wait();
      setSuccess(true);
      setPrice(""); // Reset input field after successful transaction

      // Redirect to Explore NFT page after successful listing
      setTimeout(() => {
        router.push("/Components/ExploreNFT");
      }, 3000);
    } catch (error) {
      console.error("Error reselling NFT:", error);
      setError("Failed to resell NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        className="max-w-lg w-full"
      >
        <Card className="bg-gray-800 text-white shadow-2xl border border-gray-700 rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              List Your NFT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-gray-300 text-lg font-semibold mb-2">
                Set Price
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter price in ETH"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mb-4 text-lg bg-gray-900 border border-gray-700 placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <Tag className="absolute right-4 top-3 text-gray-400" size={20} />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.5 }}
            >
              <Button
                onClick={handleResellNFT}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center py-3 rounded-lg font-semibold text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2" size={20} />
                    Sell NFT
                  </>
                )}
              </Button>
            </motion.div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="flex items-center bg-green-600 text-white p-3 rounded-lg mt-4 shadow-md"
              >
                <CheckCircle className="mr-2" size={24} />
                NFT listed successfully!
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                className="flex items-center bg-red-600 text-white p-3 rounded-lg mt-4 shadow-md"
              >
                <XCircle className="mr-2" size={24} />
                {error}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function Resell() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResellContent />
    </Suspense>
  );
}