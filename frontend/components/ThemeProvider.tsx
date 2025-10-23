'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
  fixedTheme?: boolean;
}

export function ThemeProvider({ children, fixedTheme = true, ...props }: ThemeProviderProps) {
  if (fixedTheme) {
    return <div className="light">{children}</div>;
  }
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
