import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./component/Provider";
import Topbar from "./component/Topbar";
import Footer from "./component/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseCheck",
  description: "Ping It. Find It. Fix It.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      //bg-[#293251]
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black scroll-smooth`}
      >
        <Providers>
          <Topbar/>
        {children}
        <Toaster/>
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
