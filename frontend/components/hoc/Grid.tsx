import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SPACING } from '@/lib/constants';

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Grid HOC - Provides responsive grid layout
 * Use this for consistent grid-based layouts
 */
export function Grid({
  children,
  className,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 'lg'
}: GridProps) {
  const gapClasses = {
    sm: 'gap-4 md:gap-6',
    md: 'gap-6 md:gap-8',
    lg: SPACING.grid.gap,
  };

  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const colClasses = cn(
    'grid',
    cols.default && gridCols[cols.default],
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  );

  return (
    <div className={cn(colClasses, gapClasses[gap], className)}>
      {children}
    </div>
  );
}
