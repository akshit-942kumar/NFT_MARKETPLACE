"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string) => {
    if (pathname === href) {
      // If on the same page, force a refresh
      router.refresh();
    } else {
      // Otherwise, navigate to the page
      router.push(href);
    }
  };

  return (
    <nav className="bg-gradient-to-r  bg-black z-30 from-blue-900 via-gray-900 to-teal-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide cursor-pointer hover:text-cyan-400 transition">
          NFT MARKETPLACE
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <NavLink href="/" label="Home" handleClick={handleClick} />
          <NavLink href="/Components/About" label="About" handleClick={handleClick} />
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component with Click Handling
const NavLink = ({ href, label, handleClick }: { href: string; label: string; handleClick: (href: string) => void }) => {
  return (
    <span
      className="relative text-lg font-medium cursor-pointer group hover:text-cyan-300 transition"
      onClick={() => handleClick(href)} // Use handleClick for both navigation and refresh
    >
      {label}
      {/* Animated Underline */}
      <span className="absolute left-0 -bottom-1 w-0 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
    </span>
  );
};

export default Navbar;
