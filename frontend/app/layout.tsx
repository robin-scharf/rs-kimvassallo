import type { Metadata } from "next";
import { Inter, Raleway, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getGlobal, getHeader, getFooter, getMenuItems } from "@/lib/api";
import { ThemeProvider } from "../components/ThemeProvider";
import DefaultPageLayout from "../components/DefaultPageLayout";

// Primary font: Inter for clean, modern look similar to Helvetica
const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Hero font: Raleway for elegant, sophisticated look
const raleway = Raleway({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

// Heading font: Playfair Display for sub-page headings
const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Use short revalidation (1 second) as fallback + on-demand revalidation via webhooks
// This ensures fresh data while allowing webhook-based instant updates
export const revalidate = 1;

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();

  // Fallback values if API fails
  const fallbackTitle = "Kim Vassallo, LCSW-R - Therapy for Women";
  const fallbackDescription = "Licensed Clinical Social Worker specializing in women's health, perinatal mental health, and grief and loss support.";

  return {
    title: global?.defaultSeo?.metaTitle || global?.siteName || fallbackTitle,
    description: global?.defaultSeo?.metaDescription || global?.siteDescription || fallbackDescription,
    icons: {
      icon: [
        { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/icon-180.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global layout data
  const [header, footer, menuItems] = await Promise.allSettled([
    getHeader(),
    getFooter(),
    getMenuItems(),
  ]).then(results => results.map(result => result.status === 'fulfilled' ? result.value : null));

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${raleway.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DefaultPageLayout
            header={header}
            footer={footer}
            menuItems={menuItems || []}
          >
            {children}
          </DefaultPageLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
