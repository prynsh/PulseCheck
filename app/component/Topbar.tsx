import Image from "next/image";
import React from "react";
import SignIn from "./Login";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="flex justify-center w-full fixed top-0 left-0 z-50 m-5">
      <div
        className="w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-xl 
                      bg-white/5 backdrop-filter backdrop-blur-md border border-white/10 shadow-[inset_0_0_0.5px_0_rgba(255,255,255,0.2)]"
      >
        <Link href={"/"} className="flex items-center space-x-2 bg-[#f3da72] rounded-full pl-2">
          <Image src="/heartbeat.png" alt="Logo" height={40} width={40} />
          <h1 className="text-2xl text-white"></h1>
        </Link>

        <div className="flex space-x-2 text-white text-sm font-medium">
          <a
            href="#features"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
          >
            <span className="relative">Features</span>
          </a>
          <a
            href="#how-it-works"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
          >
            <span className="relative">How it Works</span>
          </a>
          <a
            href="#faq"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
          >
            <span className="relative">FAQ</span>
          </a>

          <a
            href="https://github.com/prynsh/PulseCheck"
             target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden  bg-transparent text-[#b49758] inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
          >
            <span className="relative">Github</span>
          </a>
        </div>

        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
