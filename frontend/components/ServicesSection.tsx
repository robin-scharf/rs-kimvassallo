import { Service, ApproachItem, InsuranceProvider, Global } from '@/types/strapi';

interface ServicesSectionProps {
  data: Service[];
  approachItems: ApproachItem[];
  insuranceProviders: InsuranceProvider[];
  global: Global;
}

export default function ServicesSection({ data, approachItems, insuranceProviders, global }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d5252] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-normal mb-12 uppercase tracking-widest text-center text-gray-300">
          Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {data.map((service) => (
            <div
              key={service.id}
              className="bg-[#3d6565] px-6 py-4 text-center"
            >
              <h3 className="text-base font-semibold text-white">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Three Column Section: Approaches, Insurance, Fees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-gray-500/30">
          {/* Approaches */}
          <div>
            <h3 className="text-sm font-normal uppercase tracking-widest mb-6 text-gray-300">
              Approaches
            </h3>
            <ul className="space-y-3 text-sm">
              {approachItems.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>

          {/* Insurance Accepted */}
          <div>
            <h3 className="text-sm font-normal uppercase tracking-widest mb-6 text-gray-300">
              Insurance Accepted
            </h3>
            <ul className="space-y-3 text-sm">
              {insuranceProviders.map((provider) => (
                <li key={provider.id}>{provider.name}</li>
              ))}
            </ul>
          </div>

          {/* Fees */}
          <div>
            <h3 className="text-sm font-normal uppercase tracking-widest mb-6 text-gray-300">
              Fees
            </h3>
            <p className="text-sm">
              {global.therapyFee || 'Individual therapy (50-55 min): $150'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
