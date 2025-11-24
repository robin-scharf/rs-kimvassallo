import { getAbout, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Heading } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import BackNavigation from '@/components/BackNavigation';
import AboutSection from '@/components/AboutSection';
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
      <AboutSection about={about} />

      {/* Additional Sections with Alternating Layout */}
      {about?.sections && about.sections.length > 0 && (
        <AlternatingSections sections={about.sections} />
      )}

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
