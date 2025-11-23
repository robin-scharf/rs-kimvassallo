'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';
import RichText from './RichText';
import { Heading } from './hoc';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

/**
 * FAQ Accordion Component
 * Reusable accordion for FAQ sections
 * Can be used on any page
 */
export function FAQAccordion({ items, title, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <Heading level={2} className="text-foreground text-center mb-12">
          {title}
        </Heading>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id}
              className={cn(
                'border border-border bg-card',
                ANIMATIONS.transition.default
              )}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className={cn(
                  'w-full px-6 py-4 text-left flex items-center justify-between',
                  'hover:bg-accent/50',
                  ANIMATIONS.transition.default
                )}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground flex-shrink-0',
                    ANIMATIONS.transition.default,
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Answer Content */}
              <div
                className={cn(
                  'overflow-hidden',
                  ANIMATIONS.transition.default
                )}
                style={{
                  maxHeight: isOpen ? '1000px' : '0',
                }}
              >
                <div className="px-6 pb-4 pt-2 text-muted-foreground">
                  <RichText content={item.answer} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
