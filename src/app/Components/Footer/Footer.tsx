"use client";
import { FaTwitter, FaGithub } from "react-icons/fa"; // Import icons for social media

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-teal-700 text-white p-8 text-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Dark overlay for contrast */}
      
      {/* Content */}
      <div className="relative z-10">
        <p className="text-lg mb-4">
          &copy; {new Date().getFullYear()} <strong>NFT Marketplace</strong>. All rights reserved.
        </p>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://x.com/Akshit_Kumar92" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-cyan-400 transition-all">
            <FaTwitter />
          </a>
          <a href="https://github.com/akshit-942kumar" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-cyan-400 transition-all">
            <FaGithub />
          </a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
