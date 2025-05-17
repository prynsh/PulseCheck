// "use client";
// import { motion } from "framer-motion";
// import HoverButton from "./component/HoverButton";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { GlobeDemo } from "./component/GlobeComponent";
// import StepsSection from "./component/StepsCard";
// import FaqSection from "./component/FaqComponent";
// import FeatureCardsSection from "./component/Feature";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 },
// };

// const staggerContainer = {
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// export default function Home() {
//   const router = useRouter();

//   return (
//     <motion.div
//       className="flex-col flex justify-center items-center text-white min-h-screen w-screen"
//       initial="hidden"
//       animate="visible"
//       variants={staggerContainer}
//     >
//       <motion.div
//         className="flex justify-center flex-col items-center pt-32 space-y-7"
//         variants={staggerContainer}
//       >
//         <motion.div variants={fadeInUp}>
//           <Button className="border border-[#f3da72] font-semibold shadow-md shadow-amber-200 rounded-full px-10">
//             Give a Star on Github
//           </Button>
//         </motion.div>

//         <motion.h1
//           className="text-8xl font-bold text-center"
//           variants={fadeInUp}
//         >
//           <span className="text-[#f3da72]">Ping</span> It.{" "}
//           <span className="text-[#f3da72]">Find</span> It. <br />
//           <span className="text-[#f3da72]">Fix</span> It.
//         </motion.h1>

//         <motion.h3 className="text-lg text-zinc-400" variants={fadeInUp}>
//           Reliable uptime monitoring and instant alerts when your site is
//           unreachable or returns an error code.
//         </motion.h3>

//         <motion.h4 className="text-center text-white" variants={fadeInUp}>
//           No credit card required. <br />
//           Never miss a downtime again. Monitor your site in less than 60
//           seconds.
//         </motion.h4>

//         <motion.div className="flex space-x-2 items-center" variants={fadeInUp}>
//           <HoverButton
//             text="Start Monitoring for Free"
//             onClick={() => {
//               router.push("/signin");
//             }}
//           />
//           <Button className="rounded-full p-5 px-4 bg-black text-white border border-white shadow-md shadow-orange-400 hover:bg-black">
//             View Demo
//           </Button>
//         </motion.div>
//       </motion.div>

//       <motion.div id="features" className="py-32" variants={fadeInUp}>
//         <FeatureCardsSection />
//       </motion.div>

//       <motion.div
//         id="how-it-works"
//         className="py-32 px-4 flex justify-center items-stretch gap-10 w-full max-w-7xl"
//         variants={fadeInUp}
//       >
//         <div className="flex-1 flex justify-center">
//           <StepsSection />
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <GlobeDemo />
//         </div>
//       </motion.div>

//       <motion.div id="faq" variants={fadeInUp}>
//         <FaqSection />
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HoverButton from "./component/HoverButton";
import { GlobeDemo } from "./component/GlobeComponent";
import StepsSection from "./component/StepsCard";
import FaqSection from "./component/FaqComponent";
import FeatureCardsSection from "./component/Feature";
import FadeInWhenVisible from "./component/FadeWhenVisible";
import Typewriter from "./component/TypeWriter";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex-col flex justify-center items-center text-white min-h-screen w-screen">
      <div className="flex justify-center flex-col items-center pt-32 space-y-7 w-full px-4">
        <FadeInWhenVisible delay={0.1}>
          <Button className="border border-[#f3da72] font-semibold shadow-md shadow-amber-200 rounded-full px-10">
            <a href="https://github.com/prynsh/PulseCheck"
             target="_blank"
            rel="noopener noreferrer">Give a Star on Github</a>
          </Button>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <h1 className="text-8xl font-bold text-center">
            <span className="text-[#f3da72]">Ping</span> It.{" "}
            <span className="text-[#f3da72]">Find</span> It. <br />
            <span className="text-[#f3da72]">Fix</span> It.
          </h1>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <Typewriter
            text="Reliable uptime monitoring and instant alerts when your site is unreachable or returns an error code."
            speed={30}
            className="text-lg text-zinc-400 text-center"
          />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.4}>
          <h4 className="text-center text-white">
            No credit card required. <br />
            Never miss a downtime again. Monitor your site in less than 60
            seconds.
          </h4>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.5}>
          <div className="flex space-x-2 items-center">
            <HoverButton
              text="Start Monitoring for Free"
              onClick={() => router.push("/dashboard")}
            />
            <Button className="rounded-full p-5 px-4 bg-black text-white border border-white shadow-md shadow-orange-400 hover:bg-black">
              View Demo
            </Button>
          </div>
        </FadeInWhenVisible>
      </div>

      <FadeInWhenVisible delay={0.1}>
        <div id="features" className="py-32 w-full px-4">
          <FeatureCardsSection />
        </div>
      </FadeInWhenVisible>

      <div
        id="how-it-works"
        className="py-32 px-4 flex justify-center items-stretch gap-10 w-full max-w-7xl"
      >
        <FadeInWhenVisible delay={0.7}>
          <div className="flex-1 flex justify-center">
            <StepsSection />
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.8}>
          <div className="flex-1 flex justify-center items-center">
            <GlobeDemo />
          </div>
        </FadeInWhenVisible>
      </div>

      <FadeInWhenVisible delay={0.9}>
        <div id="faq" className="w-full px-4">
          <FaqSection />
        </div>
      </FadeInWhenVisible>
    </div>
  );
}
