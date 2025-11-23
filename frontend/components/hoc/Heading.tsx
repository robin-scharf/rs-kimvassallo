import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/lib/constants';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Heading HOC - Provides consistent heading styles
 * Use this for all headings to maintain typography consistency
 */
export function Heading({ children, level, className, as }: HeadingProps) {
  const Tag = (as || `h${level}`) as ElementType;
  const headingClass = TYPOGRAPHY.heading[`h${level}` as keyof typeof TYPOGRAPHY.heading];

  return (
    <Tag className={cn(headingClass, TYPOGRAPHY.headingFont, className)} style={{ fontFamily: 'var(--font-playfair)' }}>
      {children}
    </Tag>
  );
}
