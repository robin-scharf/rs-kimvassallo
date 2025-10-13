import { getHome, getAbout, getApproach, getServices, getContact, getGlobal, getApproachItems, getInsuranceProviders } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ApproachSection from '@/components/ApproachSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

export default async function Home() {
  const [home, about, approach, services, contact, global, approachItems, insuranceProviders] = await Promise.all([
    getHome(),
    getAbout(),
    getApproach(),
    getServices(),
    getContact(),
    getGlobal(),
    getApproachItems(),
    getInsuranceProviders(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection data={home} global={global} />
      <AboutSection data={about} />
      <ApproachSection data={approach} />
      <ServicesSection data={services} approachItems={approachItems} insuranceProviders={insuranceProviders} global={global} />
      <ContactSection data={contact} global={global} />
    </main>
  );
}

