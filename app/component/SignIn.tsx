"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session } = useSession();
  const router= useRouter();
  if (session && session.user) {
    return (
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={session.user.image!}
              height={30}
              width={30}
              alt="image"
              className="rounded-full cursor-pointer"
            ></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="hover:border-none  focus:border-none border-none outline-none"><button onClick={() => signOut()} className="text-white flex items-center cursor-pointer ">
            Sign Out<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-white ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>

          </button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <div>
      <button
  onClick={() => router.push("/signin")}
  className="px-5 py-2 relative rounded-full group overflow-hidden bg-transparent text-white inline-block transition-colors duration-200 hover:bg-zinc-300 hover:text-black"
>
  <span className="relative">Login</span>
</button>

    </div>
  );
};

export default SignIn;
