import { getHome, getHero, getAbout, getApproach, getServices, getContact, getGlobal, getApproachItems, getInfoItems, getFooter } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ApproachSection from '@/components/ApproachSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';

// Force dynamic rendering to ensure fresh data from Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function Home() {
  // Fetch all data with fallbacks to prevent build failures
  const [home, hero, about, approach, services, contact, global, approachItems, infoItems, footer] = await Promise.allSettled([
    getHome(),
    getHero(),
    getAbout(),
    getApproach(),
    getServices(),
    getContact(),
    getGlobal(),
    getApproachItems(),
    getInfoItems(),
    getFooter(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen">
      <HeroSection data={home} hero={hero} global={global} />
      <AboutSection data={about} />
      <ApproachSection data={approach} />
      <ServicesSection data={services || []} approachItems={approachItems || []} infoItems={infoItems || []} global={global} />
      <ContactSection data={contact} global={global} />
      {footer && (
        <footer className="bg-[#f5f1ed] border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {footer.legalText && (
              <p className="text-sm text-gray-600 mb-4">{footer.legalText}</p>
            )}
            {footer.links && footer.links.length > 0 && (
              <div className="flex justify-center items-center gap-6 flex-wrap">
                {footer.links.map((link: { id: number; url: string; label: string; openInNewTab: boolean }) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-teal-700 hover:text-teal-800 font-medium text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>
      )}
      <ScrollToTop />
    </main>
  );
}

