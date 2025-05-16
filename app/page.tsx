"use client";
import axios from "axios";
import { useState } from "react";
import HoverButton from "./component/HoverButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Globe } from "@/components/ui/globe";
import { GlobeDemo } from "./component/GlobeComponent";
import StepsSection from "./component/StepsCard";
import FaqSection from "./component/FaqComponent";

export default function Home() {
  const router = useRouter();
  return (
    <div className=" flex-col flex justify-center items-center text-white min-h-screen w-screen  ">
      <div className="flex justify-center flex-col items-center  pt-30 space-y-7">
        <div>
          <Button className="border border-[#f3da72] font-semibold  shadow-md  shadow-amber-200 rounded-full px-10">
            Give a Star on Github
          </Button>
        </div>
        <h1 className="text-8xl font-bold text-center">
          <span className="text-[#f3da72]">Ping</span> It.{" "}
          <span className="text-[#f3da72]">Find</span> It. <br />{" "}
          <span className="text-[#f3da72]">Fix</span> It.
        </h1>
        <h3 className="text-lg text-zinc-400">
          Reliable uptime monitoring and instant alerts when your site is
          unreachable or returns an error code.
        </h3>
        <h4 className="text-center text-white">
          No credit card required. <br />
          Never miss a downtime again. Monitor your site in less than 60
          seconds.
        </h4>
        <div className="flex space-x-2 items-center">
          <HoverButton
            text="Start Monitoring for Free"
            onClick={() => {
              router.push("/signin");
            }}
          ></HoverButton>
          <Button className=" rounded-full p-5 px-4 bg-black text-white border border-white shadow-md shadow-orange-400   hover:bg-black">
            View Demo
          </Button>
        </div>
      </div>
      <div className="py-32 px-10 w-full max-w-7xl flex  justify-between items-center gap-10">
        {/* Steps Card Section */}
        <div className="w-1/2 h-full">
          <div className="h-full">
            <StepsSection />
          </div>
        </div>

        {/* Globe Section */}
        <div className="w-1/2 h-full">
          <div className="h-full">
            <GlobeDemo />
          </div>
        </div>
      </div>
      <div>
        <FaqSection/>
      </div>
    </div>
  );
}
