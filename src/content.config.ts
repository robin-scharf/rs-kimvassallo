import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const site = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/site" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      ctaText: z.string().optional(),
      ctaUrl: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number().default(0),
      icon: z.string().optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      ctaText: z.string().default("Book an introductory call"),
      ctaUrl: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const faq = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
    category: z.string().default("general"),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/policies" }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const settings = defineCollection({
  loader: file("./src/content/settings.json"),
  schema: z.object({
    siteName: z.string(),
    tagline: z.string(),
    description: z.string(),
    email: z.string(),
    bookingUrl: z.string(),
    address: z.string().optional(),
    kvk: z.string().optional(),
    nip: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    navLinks: z.array(z.object({ label: z.string(), href: z.string() })),
    footerLinks: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

export const collections = { site, services, blog, faq, policies, settings };
