'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';

interface NavigationButtonProps {
  label: string;
  href: string;
  className?: string;
}

/**
 * Navigation Button Component
 * Styled button for navigation - clean, minimal with subtle shadow
 */
export function NavigationButton({ label, href, className }: NavigationButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block px-6 py-3 bg-white border border-gray-300',
        'text-foreground text-xs tracking-widest uppercase font-normal',
        'shadow-sm hover:shadow-md hover:border-gray-400',
        ANIMATIONS.transition.default,
        'text-left',
        className
      )}
    >
      {label}
    </Link>
  );
}

interface ButtonNavigationGridProps {
  items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
  columns?: number;
  className?: string;
}

/**
 * Button Navigation Grid Component
 * Grid layout of navigation buttons below the hero heading
 */
export function ButtonNavigationGrid({
  items,
  className
}: ButtonNavigationGridProps) {
  return (
    <nav
      className={cn(
        'flex flex-col gap-3',
        className
      )}
    >
      {items.map((item) => (
        <NavigationButton
          key={item.href}
          label={item.label}
          href={item.href}
          className="w-fit"
        />
      ))}
    </nav>
  );
}
