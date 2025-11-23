import { getAbout, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading, Button } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/utils';
import RichText from '@/components/RichText';
import { AlternatingSections } from '@/components/AlternatingSections';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function AboutPage() {
  const [about, header, footer, menuItems] = await Promise.allSettled([
    getAbout(),
    getHeader(),
    getFooter(),
    getMenuItems(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen relative">
      <HeaderSection header={header} menuItems={menuItems || []} />

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Button href="/" variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      {/* Intro Section with Profile Photo */}
      <Section id="about" className="bg-background pt-8">
        <div className="max-w-4xl mx-auto">
          <Heading level={1} className="text-foreground mb-6 text-center">
            {about?.title || 'About'}
          </Heading>

          {about?.subtitle && (
            <p className="text-lg text-muted-foreground mb-8 text-center">
              {about.subtitle}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {about?.profilePhoto && (
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={getStrapiImageUrl(about.profilePhoto.url)}
                    alt={about.profilePhoto.alternativeText || 'Profile photo'}
                    fill
                    className="object-cover"
                    priority
                    unoptimized={getStrapiImageUrl(about.profilePhoto.url).includes('placeholder')}
                  />
                </div>
              </div>
            )}

            {about?.content && (
              <div className="flex-1 prose prose-lg max-w-none">
                <RichText content={about.content} />
              </div>
            )}
          </div>

          {!about && (
            <p className="text-center text-muted-foreground">Content not available. Please check back later.</p>
          )}
        </div>
      </Section>

      {/* Additional Sections with Alternating Layout */}
      {about?.sections && about.sections.length > 0 && (
        <AlternatingSections sections={about.sections} />
      )}

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
