import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: "Kim Vassallo, LCSW-R - Therapy for Women",
  description: "Licensed Clinical Social Worker specializing in women's health, perinatal mental health, and grief and loss support.",
};

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
