import { getAbout } from '@/lib/api';
import { Heading } from '@/components/hoc';
import AboutSection from '@/components/AboutSection';
import { AlternatingSections } from '@/components/AlternatingSections';
import PageTitle from '@/components/PageTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageTitle>
        <Heading level={1} className="text-foreground">
          {about?.title || 'About'}
        </Heading>
      </PageTitle>

      {/* Intro Section with Profile Photo */}
      <AboutSection about={about} />

      {/* Additional Sections with Alternating Layout */}
      {about?.sections && about.sections.length > 0 && (
        <AlternatingSections sections={about.sections} />
      )}
    </>
  );
}
