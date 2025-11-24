import { getTerms, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import BackNavigation from '@/components/BackNavigation';
import RichText from '@/components/RichText';
import ScrollToTop from '@/components/ScrollToTop';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function TermsPage() {
  const [terms, header, footer, menuItems] = await Promise.allSettled([
    getTerms(),
    getHeader(),
    getFooter(),
    getMenuItems(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen relative">
      <HeaderSection header={header} menuItems={menuItems || []} />

      <BackNavigation
        title={
          <div>
            <Heading level={1} className="text-foreground">
              {terms?.title || 'Terms of Service'}
            </Heading>
            {terms?.lastUpdated && (
              <p className="text-sm text-muted-foreground mt-2">
                Last Updated: {new Date(terms.lastUpdated).toLocaleDateString()}
              </p>
            )}
          </div>
        }
      />

      {/* Content Section */}
      {terms?.content && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <RichText content={terms.content} />
            </div>
          </div>
        </Section>
      )}

      {!terms && (
        <Section className="bg-background text-center">
          <p className="text-muted-foreground">Content not available. Please check back later.</p>
        </Section>
      )}

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
