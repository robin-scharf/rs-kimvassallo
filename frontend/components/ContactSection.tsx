'use client';

import { Contact, Global } from '@/types/strapi';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface ContactSectionProps {
  data: Contact | null;
  global: Global | null;
}

export default function ContactSection({ data, global }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!data) {
    return (
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide text-center">
            Contact
          </h2>
          <p className="text-center text-muted-foreground">Contact information coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide text-center">
          {data.title}
        </h2>

        {data.description && (
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-6">
                {data.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <a href={`mailto:${data.email}`} className="text-primary hover:underline">
                        {data.email}
                      </a>
                    </div>
                  </div>
                )}

                {data.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <a href={`tel:${data.phone}`} className="text-primary hover:underline">
                        {data.phone}
                      </a>
                    </div>
                  </div>
                )}

                {data.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Location</p>
                      <p className="text-muted-foreground">{data.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>

              {submitted && (
                <p className="text-green-600 text-center font-medium animate-in fade-in duration-300">
                  Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4a5a5f] text-white mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* Left Column - Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
                {data.title || 'Contact'}
              </h3>
              <p className="text-sm mb-4">{global?.location || 'Location'}</p>

              <div className="space-y-2 text-sm">
                {global?.noSurprisesActLink && (
                  <a href={global.noSurprisesActLink} target="_blank" rel="noopener noreferrer" className="block hover:text-teal-300 transition-colors border-b border-white pb-1 mb-3 inline-block">
                    No Surprises Act
                  </a>
                )}
                {global?.footerText && (
                  <p className="text-sm leading-relaxed">
                    {global.footerText}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Location */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Main Location</h3>
              <p className="text-sm">{data.address}</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} {global?.siteName || 'Kim Vassallo, LCSW-R'}</span>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <span>·</span>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
            {global?.footerDisclaimer && (
              <p className="text-xs text-gray-400 text-center mt-6">
                {global.footerDisclaimer}
              </p>
            )}
          </div>
        </div>
      </footer>
    </section>
  );
}
