"use client";
import { Services } from '@/types/strapi';
import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesSectionProps {
  data: Services | null;
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  const [openCard, setOpenCard] = React.useState<string | null>(null);

  if (!data) {
    return (
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-normal mb-12 uppercase tracking-widest text-center text-gray-300">
            Services
          </h2>
          <div className="text-center">
            <p className="text-gray-300">Services information coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 uppercase tracking-wide text-center">
          {data.title || 'Services'}
        </h2>

        {/* Subtitle */}
        {data.subtitle && (
          <p className="text-lg text-center text-muted mb-8">
            {data.subtitle}
          </p>
        )}

        {/* Service Cards Grid */}
        {data.columns && data.columns.length > 0 ? (
          <>
            <ul className="flex flex-wrap gap-8 justify-center">
              {data.columns.map((column) => {
                // column type: ServiceColumn
                const isOpen = openCard === String(column.id);
                if (isOpen) return null; // Hide cards when overlay is open
                return (
                  <li key={column.id} className="relative flex-1 min-w-[320px] max-w-[420px]">
                    <motion.div
                      layout
                      initial={{ borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', scale: 0.97, opacity: 0 }}
                      animate={{ borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                      className={`bg-white overflow-hidden cursor-pointer rounded-md`}
                      onClick={() => setOpenCard(String(column.id))}
                    >
                      <div className="relative w-full h-48 mb-6">
                        {column.image && (
                          <motion.div
                            className="w-full h-full"
                            initial={false}
                            animate={{
                              x: 0,
                              y: 0,
                              boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                          >
                            <Image
                              src={
                                column.image.url.startsWith('/')
                                  ? `${strapiUrl}${column.image.url}`
                                  : column.image.url
                              }
                              alt={column.image.alternativeText || column.title}
                              fill
                              className="object-cover rounded-t"
                            />
                          </motion.div>
                        )}
                      </div>
                      <div className="px-6 pb-6 bg-white">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          <span className="text-black">{column.title}</span>
                        </h3>
                        {column.subtitle && (
                          <p className="text-sm text-black mb-4">
                            {column.subtitle}
                          </p>
                        )}
                        {column.description && (
                          <div
                            className="text-sm text-black mb-4 prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: column.description }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
            <AnimatePresence>
              {openCard && (
                <motion.div
                  key="overlay"
                  className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpenCard(null)}
                >
                  <motion.div
                    layout
                    className="bg-black rounded-md shadow-2xl overflow-hidden max-w-lg w-full relative"
                    initial={{ scale: 0.95, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 40 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                  >
                    {(() => {
                      const column = data.columns.find((c) => String(c.id) === openCard);
                      if (!column) return null;
                      return (
                        <>
                          <div className="relative w-full h-48 mb-6">
                            {column.image && (
                              <motion.div
                                className="w-full h-full"
                                initial={false}
                                animate={{
                                  x: -20,
                                  y: -20,
                                  boxShadow: '0 8px 32px rgba(0,0,0,0.24)'
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                              >
                                <Image
                                  src={
                                    column.image.url.startsWith('/')
                                      ? `${strapiUrl}${column.image.url}`
                                      : column.image.url
                                  }
                                  alt={column.image.alternativeText || column.title}
                                  fill
                                  className="object-cover rounded-t"
                                />
                              </motion.div>
                            )}
                          </div>
                          <div className="px-6 pb-6">
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                              <span className="text-black">{column.title}</span>
                            </h3>
                            {column.subtitle && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {column.subtitle}
                              </p>
                            )}
                            {column.description && (
                              <div
                                className="text-sm text-black mb-4 prose prose-sm"
                                dangerouslySetInnerHTML={{ __html: column.description }}
                              />
                            )}
                            {column.buttonText && column.buttonLink && (
                              <a
                                href={column.buttonLink}
                                className="inline-block mt-4 text-sm text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-200 font-medium"
                              >
                                {column.buttonText} →
                              </a>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300">No services available at this time.</p>
          </div>
        )}

        {/* Online Appointments Info */}
        {data.offersOnlineAppointments && (
          <div className="mt-12 pt-8 border-t border-gray-500/30 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              ✓ Online appointments available
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
