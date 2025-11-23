import { ReactNode } from 'react';
import { SPACING } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * Section HOC - Provides consistent section spacing and container wrapper
 * Use this to wrap page sections for consistent layout
 */
export function Section({
  children,
  className,
  id,
  fullWidth = false,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && SPACING.section.py,
        !fullWidth && SPACING.section.px,
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={cn(SPACING.container.maxWidth, SPACING.container.centered)}>
          {children}
        </div>
      )}
    </section>
  );
}
