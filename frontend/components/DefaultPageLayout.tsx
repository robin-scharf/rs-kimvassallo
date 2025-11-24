'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
import BackNavigation from './BackNavigation';
import ScrollToTop from './ScrollToTop';
import { Heading } from './hoc';

interface DefaultPageLayoutProps {
  children: ReactNode;
  header: any;
  footer: any;
  menuItems: any[];
}

interface PageTitleContextType {
  setPageTitle: (title: ReactNode) => void;
}

const PageTitleContext = createContext<PageTitleContextType | null>(null);

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used within DefaultPageLayout');
  }
  return context;
}

// Pages that should NOT show header, footer, back navigation
const MINIMAL_PAGES = ['/'];

export default function DefaultPageLayout({
  children,
  header,
  footer,
  menuItems
}: DefaultPageLayoutProps) {
  const pathname = usePathname();
  const isMinimalPage = MINIMAL_PAGES.includes(pathname);
  const [customTitle, setCustomTitle] = useState<ReactNode | null>(null);

  // Reset custom title on route change
  useEffect(() => {
    setCustomTitle(null);
  }, [pathname]);

  // For minimal pages (homepage), just render children with ScrollToTop
  if (isMinimalPage) {
    return (
      <PageTitleContext.Provider value={{ setPageTitle: setCustomTitle }}>
        {children}
        <ScrollToTop />
      </PageTitleContext.Provider>
    );
  }

  // Determine the title to show
  const titleToShow = customTitle || (
    <Heading level={1} className="text-foreground">
      {getPageTitle(pathname)}
    </Heading>
  );

  // For all other pages, render full layout
  return (
    <PageTitleContext.Provider value={{ setPageTitle: setCustomTitle }}>
      <HeaderSection header={header} menuItems={menuItems} />
      <BackNavigation title={titleToShow} />
      {children}
      <FooterSection footer={footer} />
      <ScrollToTop />
    </PageTitleContext.Provider>
  );
}

// Helper to get page title based on pathname
function getPageTitle(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'Home';

  // Capitalize and format the last segment
  const lastSegment = segments[segments.length - 1];
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
