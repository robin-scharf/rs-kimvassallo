'use client';

import { About } from '@/types/strapi';
import RichText from './RichText';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/utils';
import { Section } from './hoc';

interface AboutSectionProps {
  about: About | null;
}

/**
 * About Section Component
 * Displays the intro section with profile photo and content
 */
export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section id="about" className="bg-background !py-6 md:!py-8 lg:!py-10 pt-0">
      <div className="max-w-4xl mx-auto">
        {about?.subtitle && (
          <p className="text-lg text-muted-foreground mb-8 text-center">
            {about.subtitle}
          </p>
        )}

        {about?.profilePhoto && (
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <Image
                src={getStrapiImageUrl(about.profilePhoto.url)}
                alt={about.profilePhoto.alternativeText || 'Profile photo'}
                fill
                className="object-cover"
                priority
                unoptimized={getStrapiImageUrl(about.profilePhoto.url).includes('placeholder')}
              />
            </div>
          </div>
        )}

        {about?.content && (
          <div className="prose prose-lg max-w-none">
            <RichText content={about.content} />
          </div>
        )}

        {!about && (
          <p className="text-center text-muted-foreground">
            Content not available. Please check back later.
          </p>
        )}
      </div>
    </Section>
  );
}
