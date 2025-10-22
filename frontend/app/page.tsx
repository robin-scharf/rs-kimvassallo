import { getHeader, getMenuItems, getHero, getAbout, getServices, getContact, getGlobal, getFooter } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import HeaderSection from '@/components/HeaderSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';

// Force dynamic rendering to ensure fresh data from Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function Home() {
  // Fetch all data with fallbacks to prevent build failures
  const [header, menuItems, hero, about, services, contact, global, footer] = await Promise.allSettled([
    getHeader(),
    getMenuItems(),
    getHero(),
    getAbout(),
    getServices(),
    getContact(),
    getGlobal(),
    getFooter(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen">
      <HeaderSection header={header} menuItems={menuItems || []} />
      <HeroSection hero={hero} />
      <AboutSection data={about} />
      <ServicesSection data={services} />
      <ContactSection data={contact} />
      {footer && (
        <footer className="bg-[#f5f1ed] border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {footer.copyrightText && (
              <div
                className="text-sm text-gray-600 mb-4 prose prose-sm mx-auto"
                dangerouslySetInnerHTML={{ __html: footer.copyrightText }}
              />
            )}
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {footer.privacyLink && (
                <a
                  href={footer.privacyLink}
                  className="text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Privacy Policy
                </a>
              )}
              {footer.termsLink && (
                <a
                  href={footer.termsLink}
                  className="text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Terms of Service
                </a>
              )}
            </div>
          </div>
        </footer>
      )}
      <ScrollToTop />
    </main>
  );
}

