import FaqItem from "@/components/ui/FAQ";


const faqs = [
  {
    question: "How frequently do you ping my site?",
    answer: "All the websites are pinged every 5 minutes"
  },
  {
    question: "Can I monitor multiple URLs?",
    answer: "Yes. You can add upto 5 URLs per account."
  },
  {
    question: "What counts as downtime?",
    answer: "Anything that doesn't return 200 status code is counted as downtime."
  },
  {
    question: "How do alerts work?",
    answer: ""
  },
];

export default function FaqSection() {
  return (
    <section className=" py-16 px-4">
      <div className="">
        <h2 className="text-4xl text-white font-semibold mb-6">Answers to a few good questions.</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
