import { Approach } from '@/types/strapi';

interface ApproachSectionProps {
  data: Approach;
}

export default function ApproachSection({ data }: ApproachSectionProps) {
  return (
    <section id="approach" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 uppercase tracking-wide text-center">
          {data.title}
        </h2>

        <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {data.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
