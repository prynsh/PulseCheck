// "use client";
// import { FC } from "react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Real-time Monitoring",
//     description: "Pings your URLs every 5 minutes to ensure uptime.",
//   },
//   {
//     title: "Multi-channel Alerts (Slack Upcoming)",
//     description: "Get notified via Email, Discord, Slack etc.",
//   },
//   {
//     title: "Downtime History(Upcoming)",
//     description: "View logs and analytics for past incidents.",
//   },
//   {
//     title: "Customizable Intervals (Upcoming)",
//     description: "Choose how often each URL is pinged.",
//   },
// ];

// const FeatureCardsSection: FC = () => {
//   return (
//     <section className="w-full bg-black py-16 px-6 flex justify-center">
//       <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
//         {features.map((feature, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: idx * 0.2 }}
//             viewport={{ once: true, amount: 0.2 }}
//             className={`rounded-2xl border border-[#f3da72] shadow-lg p-6 transition-all duration-300 flex flex-col justify-between 
//               ${idx % 2 === 0 ? "min-h-[260px] md:min-h-[320px]" : "min-h-[180px]"} 
//               ${idx % 2 === 0 ? "md:row-span-2" : ""} 
//               hover:border-white`}
//           >
//             <h3 className="text-white text-xl font-semibold mb-2">
//               {feature.title}
//             </h3>
//             <p className="text-[#f3da72]">{feature.description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeatureCardsSection;


"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Real-time Monitoring",
    description: "Pings your URLs every 5 minutes to ensure uptime.",
    image: "/radar.png", // ✅ new
  },
  {
    title: "Multi-channel Alerts (Slack Upcoming)",
    description: "Get notified via Email, Discord, Slack etc.",
  },
  {
    title: "Downtime History(Upcoming)",
    description: "View logs and analytics for past incidents.",
    image: "/chart.jpg",
},
  {
    title: "Customizable Intervals (Upcoming)",
    description: "Choose how often each URL is pinged.",
    image: "",
  },
];

const FeatureCardsSection: FC = () => {
  return (
    <section className="w-full bg-black py-16 px-6 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`rounded-2xl border border-[#f3da72] shadow-lg p-6 transition-all duration-300 flex flex-col justify-between 
              ${idx % 2 === 0 ? "min-h-[260px] md:min-h-[320px]" : "min-h-[180px]"} 
              ${idx % 2 === 0 ? "md:row-span-2" : ""} 
              hover:border-white`}
          >
            <h3 className="text-white text-xl font-semibold mb-2">
              {feature.title}
            </h3>

            {/* ✅ Conditionally render image */}
            {feature.image && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={80}
                  className="object-contain"
                />
              </div>
            )}

            <p className="text-[#f3da72]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCardsSection;
