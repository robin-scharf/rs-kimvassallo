
"use client";

"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hero } from '@/types/strapi';

interface HeroSectionProps {
  hero: Hero | null;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';

  const backgroundImageUrl = hero?.backgroundImage?.url
    ? `${strapiUrl}${hero.backgroundImage.url}`
    : null;

  const backgroundColor = hero?.backgroundColor || '#b08080';
  const title = hero?.title || 'Professional Therapy Services';
  const subtitle = hero?.subtitle || '';
  const ctaButtonText = hero?.ctaButtonText || 'Contact';
  const ctaButtonAnchor = hero?.ctaButtonAnchor || '#contact';

  return (
    <section
      id="hero"
      className="relative min-h-[400px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={hero?.backgroundImage?.alternativeText || title}
          fill
          priority
          className="object-cover z-0"
        />
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
          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
        )}

        <a
          href={ctaButtonAnchor}
          className="inline-block bg-teal-800 text-white px-8 py-3 text-base font-medium hover:bg-teal-900 transition-colors"
        >
          {ctaButtonText}
        </a>
      </motion.div>
    </section>
  );
}