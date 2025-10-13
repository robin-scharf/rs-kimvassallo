import { About } from '@/types/strapi';
import RichText from './RichText';
import Image from 'next/image';

interface AboutSectionProps {
  data: About;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 uppercase tracking-wide text-center">
          {data.title}
        </h2>

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

        <div className="space-y-6">
          {data.blocks && data.blocks.map((block, index) => (
            <div key={block.id || index}>
              {block.__component === 'shared.rich-text' && block.body && (
                <div className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <RichText content={block.body} />
                </div>
              )}
              {block.__component === 'shared.media' && block.file && (
                <div className="my-12 relative w-full max-w-md mx-auto aspect-video">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '')}${block.file.url}`}
                    alt={block.file.alternativeText || 'Image'}
                    fill
                    className="rounded-lg shadow-sm object-cover"
                  />
                </div>
              )}
              {block.__component === 'shared.quote' && block.body && (
                <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-muted-foreground bg-muted/30 rounded-r">
                  {block.title && <strong className="not-italic text-foreground">{block.title}: </strong>}
                  {block.body}
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
