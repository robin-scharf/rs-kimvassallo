'use client';

import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/utils';
import { Section, Heading } from './hoc';
import RichText from './RichText';
import { StrapiImage } from '@/types/strapi';

interface AboutSectionItem {
  id: number;
  title: string;
  content: string;
  graphic?: StrapiImage;
  graphicPosition: 'left' | 'right';
}

interface AlternatingSectionsProps {
  sections: AboutSectionItem[];
}

/**
 * Alternating Sections Component
 * Renders sections with alternating image/text layout (zigzag pattern)
 * Used for About page sections
 */
export function AlternatingSections({ sections }: AlternatingSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        const isImageLeft = section.graphicPosition === 'left';
        const imageUrl = section.graphic
          ? getStrapiImageUrl(section.graphic.url)
          : null;

        return (
          <Section key={section.id} className="bg-background">
            <div className={`
              grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center
              ${!isImageLeft ? 'lg:grid-flow-dense' : ''}
            `}>
              {/* Image/Graphic */}
              {imageUrl && (
                <div className={`
                  relative aspect-[4/3] lg:aspect-square
                  ${!isImageLeft ? 'lg:col-start-2' : ''}
                `}>
                  <Image
                    src={imageUrl}
                    alt={section.graphic?.alternativeText || section.title}
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={imageUrl.includes('placeholder')}
                  />
                </div>
              )}

              {/* Text Content */}
              <div className={`
                space-y-6
                ${!isImageLeft && imageUrl ? 'lg:col-start-1 lg:row-start-1' : ''}
                ${!imageUrl ? 'lg:col-span-2 max-w-3xl mx-auto' : ''}
              `}>
                <Heading level={2} className="text-foreground">
                  {section.title}
                </Heading>
                <div className="prose prose-lg max-w-none">
                  <RichText content={section.content} />
                </div>
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
}
