import { getIndividualTherapy } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import AboutSection from '@/components/AboutSection';
import { AlternatingSections } from '@/components/AlternatingSections';
import { FAQAccordion } from '@/components/FAQAccordion';
import PageTitle from '@/components/PageTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function IndividualTherapyPage() {
  const therapy = await getIndividualTherapy();

  return (
    <>
      <PageTitle>
        <Heading level={1} className="text-foreground">
          {therapy?.title || 'Individual Psychotherapy'}
        </Heading>
      </PageTitle>

      {/* Intro Section with Profile Photo */}
      <AboutSection about={therapy} />

      {/* Additional Sections with Alternating Layout */}
      {therapy?.sections && therapy.sections.length > 0 && (
        <AlternatingSections sections={therapy.sections} />
      )}

      {/* FAQ Section at the bottom */}
      {therapy?.faqItems && therapy.faqItems.length > 0 && (
        <Section className="bg-muted/30">
          <FAQAccordion
            items={therapy.faqItems}
            title={therapy.faqTitle}
          />
        </Section>
      )}
    </>
  );
}
