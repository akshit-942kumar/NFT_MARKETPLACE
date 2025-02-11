"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SellButton({ tokenId }: { tokenId: number }) {
  const router = useRouter();

  // Redirect to the resell NFT page on button click
  const handleClick = () => {
    router.push(`/Components/Resell?tokenId=${tokenId}`); // Navigate to the resell NFT page
    console.log("Token ID is:", tokenId);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }} // Reduced initial animation height
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      {/* Sell NFT Button above the burn button */}
      <Button
        onClick={handleClick}
        className="relative bottom-4 bg-gradient-to-r from-green-800 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl flex items-center"
      >
        <span className="mr-2">List NFT to Sell</span>
        <ArrowRight size={20} />
      </Button>
    </motion.div>
  );
}
