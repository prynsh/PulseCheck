// import Image from "next/image";
// import React from "react";
// import SignIn from "./Login";
// import Link from "next/link";

// const Topbar = () => {
//   return (
//     <div className="flex justify-center w-full fixed top-0 left-0 z-50 m-5">
//       <div
//         className="w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-xl 
//                       bg-white/5 backdrop-filter backdrop-blur-md border border-white/10 shadow-[inset_0_0_0.5px_0_rgba(255,255,255,0.2)]"
//       >
//         <Link href={"/"} className="flex items-center space-x-2 bg-[#f3da72] rounded-full pl-2">
//           <Image src="/heartbeat.png" alt="Logo" height={40} width={40} />
//           <h1 className="text-2xl text-white"></h1>
//         </Link>

//         <div className="flex space-x-2 text-white text-sm font-medium">
//           <a
//             href="#features"
//             className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
//           >
//             <span className="relative">Features</span>
//           </a>
//           <a
//             href="#how-it-works"
//             className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
//           >
//             <span className="relative">How it Works</span>
//           </a>
//           <a
//             href="#faq"
//             className="px-5 py-2.5 relative rounded-full group overflow-hidden text-[#b49758] font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
//           >
//             <span className="relative">FAQ</span>
//           </a>

//           <a
//             href="https://github.com/prynsh/PulseCheck"
//              target="_blank"
//             rel="noopener noreferrer"
//             className="px-5 py-2.5 relative rounded-full group overflow-hidden  bg-transparent text-[#b49758] inline-block transition-colors duration-200 hover:bg-[#f3da72] hover:text-black"
//           >
//             <span className="relative">Github</span>
//           </a>
//         </div>

//         <div>
//           <SignIn />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;


"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "./Login";
import { Menu, X } from "lucide-react";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#faq", label: "FAQ" },
    {
      href: "https://github.com/prynsh/PulseCheck",
      label: "Github",
      external: true,
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-4 py-3">
      <div
        className="relative w-full max-w-6xl mx-auto flex items-center justify-between 
                   rounded-xl px-4 sm:px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 
                   shadow-[inset_0_0_0.5px_0_rgba(255,255,255,0.2)]"
      >
        {/* Left: Logo or Hamburger */}
        <div className="flex items-center">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-[#f3da72] mr-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - sm+ only */}
          <Link
            href="/"
            className="hidden sm:flex items-center space-x-2 bg-[#f3da72] rounded-full pl-2 pr-3 py-1"
          >
            <Image src="/heartbeat.png" alt="Logo" height={32} width={32} />
            <h1 className="text-lg font-semibold text-black">PulseCheck</h1>
          </Link>
        </div>

        {/* Center: Nav Links - sm+ only */}
        <div className="hidden sm:flex space-x-3 text-sm font-medium text-[#b49758]">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full hover:bg-[#f3da72] hover:text-black transition"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full hover:bg-[#f3da72] hover:text-black transition"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Right: SignIn */}
        <div className="ml-auto sm:ml-0">
          <SignIn />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden mt-2 w-full max-w-6xl mx-auto rounded-xl px-4 py-4 bg-white/10 backdrop-blur border border-white/10 text-center">
          <div className="flex flex-col items-center space-y-3 text-sm text-[#b49758] font-medium">
            {/* Home button - only in mobile dropdown */}
            <Link
              href="/"
              className="px-4 py-2 rounded-full w-full hover:bg-[#f3da72] hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Other nav links */}
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full w-full hover:bg-[#f3da72] hover:text-black transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full w-full hover:bg-[#f3da72] hover:text-black transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
