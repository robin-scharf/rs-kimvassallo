import { Service, ApproachItem, InfoItem, Global } from '@/types/strapi';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesSectionProps {
  data: Service[];
  approachItems: ApproachItem[];
  infoItems: InfoItem[];
  global: Global | null;
}

export default function ServicesSection({ data, approachItems, infoItems, global }: ServicesSectionProps) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';

  return (
    <>
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d5252] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-normal mb-12 uppercase tracking-widest text-center text-gray-300">
            Services
          </h2>

          {/* Services Grid - Columns with dividers */}
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mb-20">
              {data.map((service, index) => (
                <div
                  key={service.id}
                  className={`p-8 ${index < data.length - 1 ? 'border-r border-gray-500/30' : ''} ${index >= 3 ? 'border-t border-gray-500/30' : ''}`}
                >
                  {service.image && (
                    <div className="relative w-full h-48 mb-6 rounded overflow-hidden">
                      <Image
                        src={`${strapiUrl}${service.image.url}`}
                        alt={service.image.alternativeText || service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  {service.description && (
                    <div
                      className="text-sm text-gray-300 mb-4 prose prose-sm prose-invert"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  )}
                  {service.buttonText && service.slug && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block mt-4 text-sm text-teal-300 hover:text-teal-200 font-medium"
                    >
                      {service.buttonText} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mb-20">
              <p className="text-gray-300">Services information coming soon...</p>
            </div>
          )}

          {/* Info Items Section - Horizontal Scroll */}
          {infoItems && infoItems.length > 0 && (
            <div className="pt-12 border-t border-gray-500/30">
              <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                {infoItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-64 p-6 bg-[#3d6565] rounded"
                  >
                    <h3 className="text-base font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                    {item.buttonText && (
                      <button className="text-sm text-teal-300 hover:text-teal-200 font-medium">
                        {item.buttonText}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two Column Section: Approaches and Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-500/30 mt-12">
            {/* Approaches */}
            <div>
              <h3 className="text-sm font-normal uppercase tracking-widest mb-6 text-gray-300">
                Approaches
              </h3>
              {approachItems && approachItems.length > 0 ? (
                <ul className="space-y-3 text-sm">
                  {approachItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Coming soon...</p>
              )}
            </div>

            {/* Fees */}
            <div>
              <h3 className="text-sm font-normal uppercase tracking-widest mb-6 text-gray-300">
                Fees
              </h3>
              <p className="text-sm">
                {global?.therapyFee || 'Individual therapy (50-55 min): $150'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
