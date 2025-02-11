"use client";
import "./globals.css"; // Ensure this file exists and includes global styles

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>NFT Marketplace By Akshit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other <meta>, <link>, or <script> tags here if necessary */}
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
