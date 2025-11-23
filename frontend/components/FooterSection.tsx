'use client';

import { Footer as FooterType } from '@/types/strapi';
import RichText from './RichText';
import Link from 'next/link';
import { Linkedin, Instagram, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';

interface FooterSectionProps {
  footer: FooterType | null;
}

/**
 * Footer Component with Social Icons
 * Clean centered design with photographer credit and copyright
 */
export default function FooterSection({ footer }: FooterSectionProps) {
  if (!footer) return null;

  const socialLinks = [
    {
      icon: Linkedin,
      url: footer.linkedinUrl,
      label: 'LinkedIn'
    },
    {
      icon: Instagram,
      url: footer.instagramUrl,
      label: 'Instagram'
    },
    {
      icon: Phone,
      url: footer.phone ? `tel:${footer.phone}` : null,
      label: 'Phone'
    },
    {
      icon: Mail,
      url: footer.email ? `mailto:${footer.email}` : null,
      label: 'Email'
    },
  ].filter(link => link.url);

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Social Icons */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url!}
                    target={link.label === 'LinkedIn' || link.label === 'Instagram' ? '_blank' : undefined}
                    rel={link.label === 'LinkedIn' || link.label === 'Instagram' ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    className={cn(
                      'text-muted-foreground hover:text-foreground',
                      ANIMATIONS.transition.default
                    )}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2} style={{ strokeLinecap: 'square', strokeLinejoin: 'miter' }} />
                  </a>
                );
              })}
            </div>
          )}

          {/* Copyright */}
          {footer.copyrightText && (
            <div className="text-sm text-muted-foreground">
              <RichText content={footer.copyrightText} />
            </div>
          )}

          {/* Privacy & Terms Links */}
          {(footer.privacyUrl || footer.termsUrl) && (
            <div className="flex items-center gap-6 text-sm">
              {footer.privacyUrl && (
                <Link
                  href={footer.privacyUrl}
                  className={cn(
                    'text-muted-foreground hover:text-foreground underline',
                    ANIMATIONS.transition.default
                  )}
                >
                  Privacy Policy
                </Link>
              )}
              {footer.termsUrl && (
                <Link
                  href={footer.termsUrl}
                  className={cn(
                    'text-muted-foreground hover:text-foreground underline',
                    ANIMATIONS.transition.default
                  )}
                >
                  Terms of Service
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
