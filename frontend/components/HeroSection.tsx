import { Home, Hero, Global } from '@/types/strapi';

interface HeroSectionProps {
  data: Home | null;
  hero: Hero | null;
  global: Global | null;
}

export default function HeroSection({ data, hero, global }: HeroSectionProps) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';

  // Use hero background image if available, otherwise fallback to home heroImage
  const backgroundImageUrl = hero?.backgroundImage?.url
    ? `${strapiUrl}${hero.backgroundImage.url}`
    : (data?.heroImage?.url ? `${strapiUrl}${data.heroImage.url}` : null);

  const backgroundColor = hero?.backgroundColor || '#b08080';
  const title = hero?.title || data?.tagline || 'Professional Therapy Services';
  const subtitle = hero?.subtitle || data?.description || '';
  const ctaButtonText = hero?.ctaButtonText || 'Contact';
  const ctaButtonLink = hero?.ctaButtonLink || '#contact';

  return (
    <>
      {/* Header */}
      <header className="bg-[#f5f1ed] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
              {data?.name || 'Welcome'}
              {data?.credentials && <span className="font-normal">, {data.credentials}</span>}
            </h1>
            <p className="text-base text-gray-600">{global?.location || 'Location'}</p>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex justify-center gap-12 text-base">
            <a href="#about" className="text-teal-700 hover:text-teal-800 font-medium">About</a>
            <a href="#services" className="text-teal-700 hover:text-teal-800 font-medium">Services</a>
            <a href="#contact" className="text-teal-700 hover:text-teal-800 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section
        id="hero"
        className="relative bg-cover bg-center min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: backgroundImageUrl
            ? `linear-gradient(rgba(168, 118, 112, 0.7), rgba(168, 118, 112, 0.7)), url(${backgroundImageUrl})`
            : undefined,
          backgroundColor: backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
            {title}
          </h2>

          {subtitle && (
            <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
              {subtitle}
            </p>
          )}

          <a
            href={ctaButtonLink}
            className="inline-block bg-teal-800 text-white px-8 py-3 text-base font-medium hover:bg-teal-900 transition-colors"
          >
            {ctaButtonText}
          </a>
        </div>
      </section>
    </>
  );
}