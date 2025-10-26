"use client";

"use client";
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from '@/types/strapi';
import React, { useRef } from 'react';

interface HeroSectionProps {
  hero: Hero | null;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  // Use direct media URL from Strapi, prepending origin only if needed

  let backgroundImageUrl: string | null = null;
  if (hero?.backgroundImage?.url) {
    // If the URL is absolute (starts with http/https), use as-is
    if (/^https?:\/\//.test(hero.backgroundImage.url)) {
      backgroundImageUrl = hero.backgroundImage.url;
    } else if (hero.backgroundImage.url.startsWith('/')) {
      // Only prepend Strapi origin if relative path
      const strapiOrigin = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/api$/, '') || 'http://localhost:1337';
      backgroundImageUrl = `${strapiOrigin}${hero.backgroundImage.url}`;
    } else {
      // Unexpected format, use as-is
      backgroundImageUrl = hero.backgroundImage.url;
    }
  }
  console.log('Image URL from Strapi:', hero?.backgroundImage?.url);
  console.log('Final backgroundImageUrl:', backgroundImageUrl);

  const backgroundColor = hero?.backgroundColor || '#b08080';
  const title = hero?.title || 'Professional Therapy Services';
  const subtitle = hero?.subtitle || '';
  const ctaButtonText = hero?.ctaButtonText || 'Contact';
  const ctaButtonAnchor = hero?.ctaButtonAnchor || '#contact';

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]); // Move downward on scroll

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[400px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      {backgroundImageUrl && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale, y, willChange: 'transform' }}
        >
          <Image
            src={backgroundImageUrl}
            alt={hero?.backgroundImage?.alternativeText || title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(rgba(168, 118, 112, 0.7), rgba(168, 118, 112, 0.7))'
      }} />
      {/* Animated Content */}
      <motion.div
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
        )}

        <a
          href={ctaButtonAnchor}
          className="inline-block bg-primary text-primary-foreground px-8 py-3 text-base font-medium hover:bg-primary/90 transition-colors rounded-md"
        >
          {ctaButtonText}
        </a>
      </motion.div>
    </section>
  );
}