import { getHome, getAbout, getApproach, getServices, getContact, getGlobal, getApproachItems, getInsuranceProviders } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ApproachSection from '@/components/ApproachSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

// Force dynamic rendering to ensure fresh data from Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function Home() {
  // Fetch all data with fallbacks to prevent build failures
  const [home, about, approach, services, contact, global, approachItems, insuranceProviders] = await Promise.allSettled([
    getHome(),
    getAbout(),
    getApproach(),
    getServices(),
    getContact(),
    getGlobal(),
    getApproachItems(),
    getInsuranceProviders(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen">
      <HeroSection data={home} global={global} />
      <AboutSection data={about} />
      <ApproachSection data={approach} />
      <ServicesSection data={services || []} approachItems={approachItems || []} insuranceProviders={insuranceProviders || []} global={global} />
      <ContactSection data={contact} global={global} />
    </main>
  );
}

