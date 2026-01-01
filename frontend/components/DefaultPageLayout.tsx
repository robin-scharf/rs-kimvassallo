'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, createContext, useContext, useState, useCallback } from 'react';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
import BackNavigation from './BackNavigation';
import ScrollToTop from './ScrollToTop';
import { Heading } from './hoc';
import { Header, Footer, MenuItem } from '@/types/strapi';

interface DefaultPageLayoutProps {
  children: ReactNode;
  header: Header;
  footer: Footer;
  menuItems: MenuItem[];
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

  // Store custom title with pathname to auto-reset on route change
  const [titleState, setTitleState] = useState<{ pathname: string; title: ReactNode | null }>({
    pathname,
    title: null
  });

  // Get current title, resetting if pathname changed
  const customTitle = titleState.pathname === pathname ? titleState.title : null;

  const setCustomTitle = useCallback((title: ReactNode) => {
    setTitleState({ pathname, title });
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
