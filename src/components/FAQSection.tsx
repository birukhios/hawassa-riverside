"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            Questions, answered.
          </h2>
          <p className="mt-5 text-xl text-ink-2 text-balance">
            Everything you need to know about supporting Hawassa.
          </p>
        </div>

        <div className="border-t border-black/8">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={index} className="border-b border-black/8">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left group"
                >
                  <span className="text-lg sm:text-xl font-medium text-ink group-hover:text-lake transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-mist flex items-center justify-center transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="w-4 h-4 text-ink-2" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-ink-2 leading-relaxed text-[17px] max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-ink-2 text-lg mb-5">Still have questions?</p>
          <a
            href="mailto:support@hawassafund.org"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-lake text-white font-medium hover:bg-lake-deep transition-colors"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
