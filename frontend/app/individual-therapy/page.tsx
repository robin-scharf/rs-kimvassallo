import { getIndividualTherapy, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import BackNavigation from '@/components/BackNavigation';
import RichText from '@/components/RichText';
import { FAQAccordion } from '@/components/FAQAccordion';
import ScrollToTop from '@/components/ScrollToTop';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function IndividualTherapyPage() {
  const [therapy, header, footer, menuItems] = await Promise.allSettled([
    getIndividualTherapy(),
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
            {therapy?.title || 'Individual Psychotherapy'}
          </Heading>
        }
      />

      {/* Content Section */}
      {therapy?.content && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <RichText content={therapy.content} />
            </div>
          </div>
        </Section>
      )}

      {/* Approach Section */}
      {therapy?.approachContent && (
        <Section className="bg-background">
          <div className="max-w-4xl mx-auto">
            {therapy.approachTitle && (
              <Heading level={2} className="text-foreground mb-8">
                {therapy.approachTitle}
              </Heading>
            )}
            <div className="prose prose-lg max-w-none">
              <RichText content={therapy.approachContent} />
            </div>
          </div>
        </Section>
      )}

      {/* FAQ Section */}
      {therapy?.faqItems && therapy.faqItems.length > 0 && (
        <Section className="bg-muted/30">
          <FAQAccordion
            items={therapy.faqItems}
            title={therapy.faqTitle}
          />
        </Section>
      )}

      {/* Groups + Workshops Section */}
      {therapy?.groupsContent && (
        <Section className="bg-background">
          <div className="max-w-4xl mx-auto">
            {therapy.groupsTitle && (
              <Heading level={2} className="text-foreground mb-8">
                {therapy.groupsTitle}
              </Heading>
            )}
            <div className="prose prose-lg max-w-none">
              <RichText content={therapy.groupsContent} />
            </div>
          </div>
        </Section>
      )}

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
