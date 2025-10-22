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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
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