import { getPrivacy } from '@/lib/api';
import { Section, Heading } from '@/components/hoc';
import RichText from '@/components/RichText';
import PageTitle from '@/components/PageTitle';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function PrivacyPage() {
  const privacy = await getPrivacy();

  return (
    <>
      <PageTitle>
        <div>
          <Heading level={1} className="text-foreground">
            {privacy?.title || 'Privacy Policy'}
          </Heading>
          {privacy?.lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: {new Date(privacy.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>
      </PageTitle>

      {/* Content Section */}
      {privacy?.content && (
        <Section className="bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <RichText content={privacy.content} />
            </div>
          </div>
        </Section>
      )}

      {!privacy && (
        <Section className="bg-background text-center">
          <p className="text-muted-foreground">Content not available. Please check back later.</p>
        </Section>
      )}
    </>
  );
}
