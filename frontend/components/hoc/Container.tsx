import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SPACING } from '@/lib/constants';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container HOC - Provides consistent container width and centering
 * Use this for content that needs to be constrained within max-width
 */
export function Container({ children, className, size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div className={cn(sizeClasses[size], SPACING.container.centered, className)}>
      {children}
    </div>
  );
}
