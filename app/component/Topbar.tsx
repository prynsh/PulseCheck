// import Image from 'next/image'
// import React from 'react'
// import SignIn from './SignIn'

// const Topbar = () => {
//   return (
//     <div className='flex justify-center  backdrop-blur-none   '>
//         <div className='border rounded-full flex justify-between items-center m-3 p-3 w-5xl overflow-x-hidden'>
//             <div>
//                 <Image src='/heartbeat.png' alt='Logo' height={50} width={50} ></Image>
//             </div>
//             <div className='flex space-x-10 w-1/3'>
//             <div>
//                 Features
//             </div>
//             <div>
//                 Github
//             </div>
//             </div>
//             <div>
//             <SignIn/>
//             </div>
//             </div>
//     </div>
//   )
// }

// export default Topbar

import Image from "next/image";
import React from "react";
import SignIn from "./SignIn";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="flex justify-center w-full fixed top-0 left-0 z-50 m-5">
      <div
        className="w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-xl 
                      bg-white/5 backdrop-filter backdrop-blur-md border border-white/10 shadow-[inset_0_0_0.5px_0_rgba(255,255,255,0.2)]"
      >
        <Link href={"/"} className="flex items-center space-x-2">
          <Image src="/heartbeat.png" alt="Logo" height={40} width={40} />
          <h1 className="text-2xl text-white">PulseCheck</h1>
        </Link>

        <div className="flex space-x-2 text-white text-sm font-medium">
          <a
            href="#_"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden text-white font-medium bg-transparent inline-block transition-colors duration-200 hover:bg-gray-200 hover:text-black"
          >
            <span className="relative">Features</span>
          </a>

          <a
            href="#_"
            className="px-5 py-2.5 relative rounded-full group overflow-hidden  bg-transparent text-white inline-block transition-colors duration-200 hover:bg-zinc-300 hover:text-black"
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
