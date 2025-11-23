import { getHeader, getHero, getFooter, getGlobal } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import FooterSection from '@/components/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';

// Force dynamic rendering to ensure fresh data from Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function Home() {
  // Fetch required data with fallbacks
  const [header, hero, footer, global] = await Promise.allSettled([
    getHeader(),
    getHero(),
    getFooter(),
    getGlobal(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": header?.name || hero?.title || "Kim Vassallo",
    "jobTitle": header?.credentials || "Licensed Clinical Social Worker",
    "description": hero?.introText || global?.siteDescription || "Licensed Clinical Social Worker specializing in therapy for women",
    "url": "https://kimvassallo.com",
    ...(footer?.email && { "email": footer.email }),
    ...(footer?.phone && { "telephone": footer.phone }),
    ...(footer?.linkedinUrl && { "sameAs": [footer.linkedinUrl, footer.instagramUrl].filter(Boolean) }),
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen relative">
        {/* Header hidden for hero-only layout */}
        {/* <HeaderSection header={header} menuItems={[]} /> */}

        {/* Hero with split layout and navigation */}
        <HeroSection hero={hero} header={header} global={global} />

        {/* Footer with social icons */}
        <FooterSection footer={footer} />

        <ScrollToTop />
      </main>
    </>
  );
}