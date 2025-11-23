import { getPrivacy, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading, Button } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import RichText from '@/components/RichText';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function PrivacyPage() {
  const [privacy, header, footer, menuItems] = await Promise.allSettled([
    getPrivacy(),
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

      {/* Page Title */}
      <Section className="bg-background text-center pt-8">
        <Heading level={1} className="text-foreground">
          {privacy?.title || 'Privacy Policy'}
        </Heading>
        {privacy?.lastUpdated && (
          <p className="text-sm text-muted-foreground mt-4">
            Last Updated: {new Date(privacy.lastUpdated).toLocaleDateString()}
          </p>
        )}
      </Section>

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

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
