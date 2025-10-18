import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { getGlobal } from "@/lib/api";

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

// Use on-demand revalidation only (triggered by Strapi webhooks)
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();

  // Fallback values if API fails
  const fallbackTitle = "Kim Vassallo, LCSW-R - Therapy for Women";
  const fallbackDescription = "Licensed Clinical Social Worker specializing in women's health, perinatal mental health, and grief and loss support.";

  return {
    title: global?.defaultSeo?.metaTitle || global?.siteName || fallbackTitle,
    description: global?.defaultSeo?.metaDescription || global?.siteDescription || fallbackDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased ${lora.variable}`} style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
