'use client';

import { useEffect, ReactNode } from 'react';
import { usePageTitle } from './DefaultPageLayout';

interface PageTitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle(children);
  }, [children, setPageTitle]);

  return null;
}
