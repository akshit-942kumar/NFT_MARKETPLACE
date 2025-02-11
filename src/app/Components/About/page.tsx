"use client";
import { motion } from "framer-motion"; // Import framer-motion for animations

const About = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-800 via-gray-900 to-black opacity-60 animate-gradient"></div>

      {/* Title with fade-in animation */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        About the NFT Marketplace
      </motion.h1>

      {/* Description section */}
      <motion.div
        className="text-center max-w-4xl space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Introduction about Akshit Kumar */}
        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          The brilliant mind behind this **NFT Marketplace** is none other than **<span className="font-bold text-cyan-400">Developer Akshit Kumar</span>**. His passion for **blockchain**, **digital art**, and **cryptocurrency** has driven him to create a platform that empowers both creators and collectors to interact with the world of **NFTs**.
        </motion.p>

        {/* Project description */}
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          This platform allows users to **create, explore, buy, sell**, and **burn NFTs** (Non-Fungible Tokens). Built using **React.js**, **Next.js**, **Tailwind CSS**, and **Ethereum Smart Contracts**, the marketplace provides a seamless and user-friendly experience for **digital artists** and **collectors**.
        </motion.p>

        {/* Tech Stack and Features */}
        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Powered by **blockchain technology**, the marketplace ensures secure transactions and verified ownership of digital assets. **Developer Akshit Kumar** created this platform to **empower creators**, artists, and collectors to interact with the world of **NFTs** in a transparent and decentralized way.
        </motion.p>

        {/* Motivational Statement */}
        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          The mission of this NFT marketplace is to bring **NFTs** to the **mainstream**, providing an easy-to-use platform for users to engage with **digital art** and collectibles while embracing the **future of decentralized ownership**.
        </motion.p>

        {/* Call-to-action and Contact */}
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {/* If you're interested in learning more about this project or getting in touch with **<span className="font-bold text-cyan-400">Developer Akshit Kumar</span>**, feel free to **connect** with him and explore the platform. Join the revolution of **NFTs** and **blockchain**! */}
        </motion.p>

        {/* Social buttons */}
        <motion.div
          className="mt-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <a href="https://x.com/Akshit_Kumar92" target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
              Follow on Twitter
            </button>
          </a>
          <a href="mailto:akshitkumar0880@gmail.com">
            <button className="bg-teal-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-105">
              Contact 
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
