import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border border-black/10 bg-white shadow-2xl">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-black/10 last:border-b-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="group w-full flex items-start justify-between gap-5 p-5 md:p-6 text-left bg-white hover:bg-[#f8f0e2] transition"
          >
            <span className="flex gap-4">
              <span className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center bg-[#334D2B] font-heading text-sm font-bold text-[#F37121]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-heading font-semibold leading-none text-2xl md:text-3xl text-[#334D2B] group-hover:text-[#F37121] transition">
                {item.question}
              </span>
            </span>
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2EBDF] text-[#F37121] transition group-hover:bg-[#F37121] group-hover:text-white">
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-6 md:px-6 md:pb-7 sm:pl-[4.75rem] text-zinc-700 leading-relaxed text-base md:text-lg">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
