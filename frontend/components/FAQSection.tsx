"use client";
import { Faqs } from '@/types/strapi';
import React, { useEffect, useRef } from 'react';
import RichText from './RichText';

interface FAQSectionProps {
  data: Faqs[] | null;
}

export default function FAQSection({ data }: FAQSectionProps) {
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!faqRef.current) return;
      const details = faqRef.current.querySelectorAll('details');
      details.forEach((detail) => {
        if (detail instanceof HTMLDetailsElement && detail.open) {
          if (!detail.contains(event.target as Node)) {
            detail.open = false;
          }
        }
      });
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!data) {
    return (
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-[#7f6edc] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-normal mb-12 uppercase tracking-widest text-center text-gray-300">
            FAQs
          </h2>
          <div className="text-center">
            <p className="text-gray-300">FAQs information coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-primary to-[#7f6edc] py-16 px-4"
      style={{ zIndex: 1 }}
    >
      <div ref={faqRef} className="relative bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl p-8 md:p-16">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
          <div className="w-full">
            {data?.map((faqItem) => (
              <details
                key={faqItem.id}
                className="group border-b border-gray-200 py-4 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-gray-900 text-lg group-open:text-purple-700 transition-colors">
                  {faqItem.question}
                  <span className="ml-2 text-purple-500">&#9660;</span>
                </summary>
                <div className="mt-2 text-gray-700 text-base">
                  <RichText content={faqItem.answer} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
