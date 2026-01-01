import { getService } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStrapiImageUrl } from '@/lib/utils';
import PageTitle from '@/components/PageTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageTitle>
        <span className="text-foreground">{service.title}</span>
      </PageTitle>

      {/* Service Content */}
      <article className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          {service.image && (
            <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={getStrapiImageUrl(service.image.url)}
                alt={service.image.alternativeText || service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {service.description && (
            <div
              className="prose prose-lg prose-neutral max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          )}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/contact"
              className="inline-block bg-teal-800 text-white px-8 py-3 text-base font-medium hover:bg-teal-900 transition-colors"
            >
              Contact for More Information
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
