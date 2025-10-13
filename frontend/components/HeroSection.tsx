import { Home, Global } from '@/types/strapi';

interface HeroSectionProps {
  data: Home;
  global: Global;
}

export default function HeroSection({ data, global }: HeroSectionProps) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  const heroImageUrl = data.heroImage?.url ? `${strapiUrl}${data.heroImage.url}` : null;

  return (
    <>
      {/* Header */}
      <header className="bg-[#f5f1ed] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
              {data.name}
              {data.credentials && <span className="font-normal">, {data.credentials}</span>}
            </h1>
            <p className="text-base text-gray-600">{global.location}</p>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex justify-center gap-12 text-base">
            <a href="#home" className="text-teal-700 hover:text-teal-800 font-medium">Home</a>
            <a href="#about" className="text-teal-700 hover:text-teal-800 font-medium">About</a>
            <a href="#services" className="text-teal-700 hover:text-teal-800 font-medium">Services</a>
            <a href="#contact" className="text-teal-700 hover:text-teal-800 font-medium">Location</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section
        id="home"
        className="relative bg-cover bg-center min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: heroImageUrl
            ? `linear-gradient(rgba(168, 118, 112, 0.7), rgba(168, 118, 112, 0.7)), url(${heroImageUrl})`
            : 'linear-gradient(rgba(168, 118, 112, 0.7), rgba(168, 118, 112, 0.7))',
          backgroundColor: '#a87670',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
            {data.tagline}
          </h2>

          {data.description && (
            <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
              {data.description}
            </p>
          )}

          <a
            href="#contact"
            className="inline-block bg-teal-800 text-white px-8 py-3 text-base font-medium hover:bg-teal-900 transition-colors"
          >
            Contact
          </a>
        </div>
      </section>
    </>
  );
}