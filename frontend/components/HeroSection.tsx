'use client';

import Image from 'next/image';
import { Hero, Header, Global } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/utils';
import { ButtonNavigationGrid } from './ButtonNavigation';
import { NAVIGATION, PLACEHOLDERS } from '@/lib/constants';

interface HeroSectionProps {
  hero: Hero | null;
  header: Header | null;
  global: Global | null;
}

/**
 * Hero Section Component - Split Layout
 * Left: Name, credentials, tagline, navigation grid
 * Right: Professional photo
 */
export default function HeroSection({ hero, header, global }: HeroSectionProps) {
  // Get professional photo or fallback
  const photoUrl = hero?.professionalPhoto
    ? getStrapiImageUrl(hero.professionalPhoto.url)
    : PLACEHOLDERS.hero;

  const photoAlt = hero?.professionalPhoto?.alternativeText ||
    header?.name ||
    'Professional photo';

  // Use hero data for all text elements
  const title = hero?.title || 'Kim Vassallo';
  const subtitle = hero?.subtitle || '';
  const introText = hero?.introText || '';

  return (
    <section className="flex items-center justify-center p-[30px]" style={{ backgroundColor: global?.backgroundColor || '#f5f5f5' }}>
      {/* Inner container with border */}
      <div className="w-full max-w-[1400px] flex flex-col sm:grid sm:grid-cols-2 gap-0 bg-white shadow-sm min-h-[calc(100vh-60px)]">
        {/* Professional Photo - appears first on mobile */}
        <div className="relative min-h-[40vh] sm:min-h-full sm:order-2 p-[30px] bg-white dark:bg-black">
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              className="object-cover object-top sm:object-center grayscale"
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              unoptimized={photoUrl.includes('placeholder')}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-24 sm:order-1" style={{ fontFamily: 'var(--font-raleway)' }}>
          <div className="max-w-lg space-y-12">
            {/* Title (Name) */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-foreground leading-tight uppercase" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {title}
              </h1>
              {/* Subtitle (Credentials) */}
              {subtitle && (
                <h2 className="text-sm sm:text-base tracking-wide text-muted-foreground max-w-md leading-relaxed uppercase">
                  {subtitle}
                </h2>
              )}
            </div>

            {/* Intro Text */}
            {introText && (
              <p className="text-base sm:text-lg text-foreground max-w-md leading-relaxed">
                {introText}
              </p>
            )}

            {/* Navigation Grid */}
            <ButtonNavigationGrid
              items={NAVIGATION.items}
              columns={1}
              className="mt-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}