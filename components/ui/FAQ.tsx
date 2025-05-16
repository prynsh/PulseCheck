'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#f3da72] py-4 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-normal text-white">{question}</h4>
        {open ? <ChevronUp className="text-[#f3da72]" /> : <ChevronDown className="text-white" />}
      </div>
      {open && (
        <p className="mt-2 text-sm text-[#f3da72] transition-all duration-200">
          {answer}
        </p>
      )}
    </div>
  );
}
