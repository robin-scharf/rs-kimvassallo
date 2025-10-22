import { About } from '@/types/strapi';
import RichText from './RichText';
import Image from 'next/image';

interface AboutSectionProps {
  data: About | null;
}

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) {
    return (
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 uppercase tracking-wide text-center">
            About
          </h2>
          <p className="text-center text-muted-foreground">Content coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative flex overflow-hidden w-full bg-background">
      {/* Static Dot Pattern Background */}
      <div className="absolute inset-0 z-10 pointer-events-none w-full h-full" aria-hidden="true">
        <svg
          className="dot-pattern-animated"
          width="100%"
          height="100%"
          viewBox="100 50 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', left: 0, top: 0, width: '100vw', height: '100vh', minHeight: '400px', minWidth: '100vw' }}
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.2" fill="#e2e8f0" opacity="1" />
            </pattern>
          </defs>
          <rect width="100vw" height="100vh" fill="url(#dots)" />
        </svg>
        <style>{`
          .dot-pattern-animated {
        animation: dotMove 30s linear infinite;
          }
          @keyframes dotMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(100px, 100px); }
          }
        `}</style>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 uppercase tracking-wide text-center">
          {data.title}
        </h2>

        {/* Subtitle */}
        {data.subtitle && (
          <p className="text-lg text-center text-muted-foreground mb-8">
            {data.subtitle}
          </p>
        )}

        {/* Profile Photo */}
        {data.profilePhoto && (
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '')}${data.profilePhoto.url}`}
                alt={data.profilePhoto.alternativeText || 'Profile photo'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content - Richtext */}
        {data.content && (
          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            <RichText content={data.content} />
          </div>
        )}
      </div>
    </section>
  );
}
