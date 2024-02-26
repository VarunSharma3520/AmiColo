import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(Components)/Header/Navbar";
import Footer from "./(Components)/Footer/Footer";
import Nav from "./(Components)/Header/Private/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AmiColo",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* Navbar Common to All Pages */}

        <Navbar />
        <Nav/>

        {/* All the other pages gets displayed here */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
