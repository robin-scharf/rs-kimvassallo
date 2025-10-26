// Define MenuItem type for menuItems
interface MenuItem {
  id: string | number;
  title: string;
  link?: string;
}
import { getService, getHeader, getMenuItems, getFooter } from '@/lib/api';
import RichText from '@/components/RichText';
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
  const [service, header, menuItems, footer] = await Promise.all([
    getService(slug),
    getHeader(),
    getMenuItems(),
    getFooter(),
  ]);

  if (!service) {
    notFound();
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';

  return (
    <main className="min-h-screen relative">
      {/* Header Section (same as main page) */}
      {header && (
        <header className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
            <Link href="/" className="text-primary hover:text-primary-foreground font-medium text-lg">
              ← Back to Home
            </Link>
            <div>
              <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>{header.title}</span>
            </div>
            {menuItems && menuItems.length > 0 && (
              <nav className="flex gap-6">
                {menuItems.map((item: MenuItem) => (
                  <Link
                    key={item.id}
                    href={item.link || '#'}
                    className="text-primary hover:text-primary-foreground font-medium text-base"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </header>
      )}

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

      {/* Footer Section (same as main page) */}
      {footer && (
        <footer className="bg-background dark:bg-background border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {footer.copyrightText && (
              <RichText content={footer.copyrightText} />
            )}
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {footer.privacyLink && (
                <a
                  href={footer.privacyLink}
                  className="text-primary hover:text-primary-foreground font-medium text-sm"
                >
                  Privacy Policy
                </a>
              )}
              {footer.termsLink && (
                <a
                  href={footer.termsLink}
                  className="text-primary hover:text-primary-foreground font-medium text-sm"
                >
                  Terms of Service
                </a>
              )}
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
