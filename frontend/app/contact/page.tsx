import { getContact, getHeader, getFooter, getMenuItems } from '@/lib/api';
import { Section, Heading, Button } from '@/components/hoc';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';
import ContactForm from '@/components/ContactForm';
import ScrollToTop from '@/components/ScrollToTop';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export default async function ContactPage() {
  const [contact, header, footer, menuItems] = await Promise.allSettled([
    getContact(),
    getHeader(),
    getFooter(),
    getMenuItems(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <main className="min-h-screen relative">
      <HeaderSection header={header} menuItems={menuItems || []} />

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Button href="/" variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>

      {/* Page Title */}
      <Section className="bg-background text-center pt-8">
        <Heading level={1} className="text-foreground">
          {contact?.title || 'Contact'}
        </Heading>
        {contact?.description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {contact.description}
          </p>
        )}
      </Section>

      {/* Contact Details and Form */}
      <Section className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Heading level={2} className="text-foreground">
              Get in Touch
            </Heading>

            <div className="space-y-6">
              {contact?.email && (
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {contact?.phone && (
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {contact?.address && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      {contact.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>

      <FooterSection footer={footer} />
      <ScrollToTop />
    </main>
  );
}
