'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';

/**
 * Contact Form Component - Dummy Form for now
 * Will be replaced with actual submission logic later
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dummy submission - replace with actual API call later
    setTimeout(() => {
      setSubmitMessage('Thank you for your message. We will get back to you soon!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
  };

  return (
    <div className="bg-card p-8 shadow-sm border border-border">
      <h3 className="text-2xl font-light tracking-wide uppercase text-foreground mb-6">
        Send a Message
      </h3>

      {submitMessage && (
        <div className="mb-6 p-4 bg-accent/50 border border-border text-foreground">
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn(
              'w-full px-4 py-3 border border-input bg-background',
              'text-foreground placeholder-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              ANIMATIONS.transition.default
            )}
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn(
              'w-full px-4 py-3 border border-input bg-background',
              'text-foreground placeholder-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              ANIMATIONS.transition.default
            )}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 border border-input bg-background',
              'text-foreground placeholder-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              ANIMATIONS.transition.default
            )}
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={cn(
              'w-full px-4 py-3 border border-input bg-background',
              'text-foreground placeholder-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring resize-none',
              ANIMATIONS.transition.default
            )}
            placeholder="How can we help you?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full px-8 py-4 bg-primary text-primary-foreground',
            'font-light tracking-widest uppercase',
            'hover:bg-primary/90',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            ANIMATIONS.transition.default
          )}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
