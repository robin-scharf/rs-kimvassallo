import { getService, getGlobal } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, global] = await Promise.all([
    getService(slug),
    getGlobal(),
  ]);

  if (!service) {
    notFound();
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-[#f5f1ed] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-teal-700 hover:text-teal-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Service Content */}
      <article className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
            {service.title}
          </h1>

          {service.image && (
            <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={`${strapiUrl}${service.image.url}`}
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
              href="/#contact"
              className="inline-block bg-teal-800 text-white px-8 py-3 text-base font-medium hover:bg-teal-900 transition-colors"
            >
              Contact for More Information
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
