import { getAbout, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import BackNavigation from '@/components/BackNavigation';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/utils';
import RichText from '@/components/RichText';
import { AlternatingSections } from '@/components/AlternatingSections';
import ScrollToTop from '@/components/ScrollToTop';

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

      <BackNavigation
        title={
          <Heading level={1} className="text-foreground">
            {about?.title || 'About'}
          </Heading>
        }
      />

      {/* Intro Section with Profile Photo */}
      <Section id="about" className="bg-background pt-0">
        <div className="max-w-4xl mx-auto">
          {about?.subtitle && (
            <p className="text-lg text-muted-foreground mb-8 text-center">
              {about.subtitle}
            </p>
          )}

          {about?.profilePhoto && (
            <div className="flex justify-center mb-8">
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
            <div className="prose prose-lg max-w-none">
              <RichText content={about.content} />
            </div>
          )}

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
