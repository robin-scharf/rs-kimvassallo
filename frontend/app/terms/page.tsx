import { getTerms } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import RichText from '@/components/RichText';
import PageTitle from '@/components/PageTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function TermsPage() {
  const terms = await getTerms();

  return (
    <>
      <PageTitle>
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
      </PageTitle>

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
    </>
  );
}
