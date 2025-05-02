"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SignIn = () => {
  const { data: session } = useSession();

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
              className="rounded-full"
            ></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><button onClick={() => signOut()} className="text-red-500 text-sm">
            SignOut
          </button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="border bg-black text-white Image-2 m-2 p-2 rounded-full"
    >
      Login
    </button>
  );
};

export default SignIn;
