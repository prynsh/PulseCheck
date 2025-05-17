// import FaqItem from "@/components/ui/FAQ";


// const faqs = [
//   {
//     question: "How frequently do you ping my site?",
//     answer: "All the websites are pinged every 5 minutes"
//   },
//   {
//     question: "Can I monitor multiple URLs?",
//     answer: "Yes. You can add upto 5 URLs per account."
//   },
//   {
//     question: "What counts as downtime?",
//     answer: "Anything that doesn't return 200 status code is counted as downtime."
//   },
//   {
//     question: "How do alerts work?",
//     answer: ""
//   },
// ];

// export default function FaqSection() {
//   return (
//     <section className=" py-16 px-4">
//       <div className="">
//         <h2 className="text-4xl text-white font-semibold mb-6">Answers to a few good questions.</h2>
//         <div className="space-y-4">
//           {faqs.map((faq, idx) => (
//             <FaqItem key={idx} question={faq.question} answer={faq.answer} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import FaqItem from "@/components/ui/FAQ";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How frequently do you ping my site?",
    answer: "All the websites are pinged every 5 minutes"
  },
  {
    question: "Can I monitor multiple URLs?",
    answer: "Yes. You can add up to 5 URLs per account."
  },
  {
    question: "What counts as downtime?",
    answer: "Anything that doesn't return 200 status code is counted as downtime."
  },
  {
    question: "How do alerts work?",
    answer: "Alerts are sent instantly to your preferred channels like Email, Discord, or Slack."
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl text-white font-semibold mb-6">
          Answers to a few good questions.
        </h2>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <FaqItem question={faq.question} answer={faq.answer} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
