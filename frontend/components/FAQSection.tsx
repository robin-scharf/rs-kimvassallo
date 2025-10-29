"use client";
import { Faqs } from '@/types/strapi';
import React, { useEffect, useRef } from 'react';
import { getStrapiImageUrl } from '@/lib/utils';
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

  // Example offset graphic, replace src with Strapi singleType when available
  const offsetGraphic = {
    mobile: '/images/illustration-woman-online-mobile.svg',
    desktop: '/images/illustration-woman-online-desktop.svg',
    box: '/images/illustration-box-desktop.svg',
  };

  if (!data) {
    return (
        <div className="container mx-auto flex items-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="flex-auto flex flex-col md:flex-row items-center bg-white rounded-xl m-5 p-3 md:m-10 shadow-xl">
            <img className="md:hidden flex-none pb-4 translate-x-2" src={offsetGraphic.mobile} alt="Woman Online" />
            <div className="flex-none relative hidden md:block z-10 w-1/2">
              <img className="z-20 relative translate-x-8" src={offsetGraphic.desktop} alt="Woman Online" />
              <img className="z-40 absolute -bottom-8 left-12" src={offsetGraphic.box} alt="Box" />
            </div>
            <div className="flex-auto mb-2 w-full p-2">
              <h1 className="flex-none pl-3 text-3xl py-8 font-black tracking-wide">FAQ</h1>
              <p className="text-gray-400">FAQs information coming soon...</p>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="container mx-auto flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex-auto flex flex-col md:flex-row items-center bg-white rounded-xl m-5 p-3 md:m-10 shadow-xl">
        <img className="md:hidden flex-none pb-4 translate-x-2" src={offsetGraphic.mobile} alt="Woman Online" />
        <div className="flex-none relative hidden md:block z-10 w-1/2">
          <img className="z-20 relative translate-x-8" src={offsetGraphic.desktop} alt="Woman Online" />
          <img className="z-40 absolute -bottom-8 left-12" src={offsetGraphic.box} alt="Box" />
        </div>
        <div className="flex-auto mb-2 w-full p-2">
          <h1 className="flex-none pl-3 text-3xl py-8 font-black tracking-wide">FAQ</h1>
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
    </div>
  );
};
