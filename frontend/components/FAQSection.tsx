"use client";
import { Faqs } from '@/types/strapi';
import React, { useEffect, useRef } from 'react';
import { getStrapiImageUrl } from '@/lib/utils';
import RichText from './RichText';

interface FAQSectionProps {
  faqs: Faqs | null;
}

export default function FAQSection({ faqs }: FAQSectionProps) {
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

  // Use backend image if available, else show placeholder SVG
  const OffsetGraphic = ({ faqs }: { faqs?: Faqs | null }) => {
    if (faqs && faqs.graphic?.url) {
      return (
        <img
          src={getStrapiImageUrl(faqs.graphic.url)}
          alt={faqs.title || 'FAQ Graphic'}
          className="max-h-48 w-auto mx-auto"
        />
      );
    }
    return (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="80" fill="#E5E7EB" />
        <rect x="40" y="40" width="100" height="30" rx="8" fill="#A7F3D0" />
        <rect x="60" y="90" width="60" height="20" rx="6" fill="#C7D2FE" />
        <ellipse cx="90" cy="140" rx="30" ry="12" fill="#FDE68A" />
      </svg>
    );
  };

  if (!faqs) {
    return (
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-none flex justify-center items-center w-full md:w-1/3 mb-8 md:mb-0">
            <OffsetGraphic faqs={undefined} />
          </div>
          <div className="flex-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 uppercase tracking-wide text-center">FAQ</h2>
            <div className="text-center">
              <p className="text-gray-300">FAQs information coming soon...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" ref={faqRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-none flex justify-center items-center w-full md:w-1/3 mb-8 md:mb-0">
          <OffsetGraphic faqs={faqs} />
        </div>
        <div className="flex-auto w-full md:w-2/3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide text-center">{faqs.title}</h2>
          {faqs.subtitle && (
            <p className="text-lg text-center text-muted-foreground mb-8">{faqs.subtitle}</p>
          )}
          <div className="w-full mx-auto max-w-2xl">
            {faqs.faqs && faqs.faqs.length > 0 ? (
              faqs.faqs.map((faqItem) => (
                <details
                  key={faqItem.id}
                  className="group border-b border-gray-200 py-4 cursor-pointer bg-white text-black rounded-md mb-4 shadow-md"
                >
                  <summary className="flex justify-between items-center font-semibold text-lg group-open:text-primary transition-colors px-4 py-2">
                    {faqItem.question}
                    <span className="ml-2 text-primary transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                  </summary>
                  <div className="mt-2 text-gray-700 text-base px-4 pb-4">
                    <RichText content={faqItem.answer} />
                  </div>
                </details>
              ))
            ) : (
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300">No FAQs available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
