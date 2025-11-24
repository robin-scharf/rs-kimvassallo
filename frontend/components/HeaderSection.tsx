'use client';

import { Header, MenuItem } from '@/types/strapi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderSectionProps {
  header: Header | null;
  menuItems: MenuItem[];
}

export default function HeaderSection({ header, menuItems }: HeaderSectionProps) {
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            {header?.name || 'Welcome'}
          </h1>
        </div>
        <nav className="mt-6 flex justify-center gap-8 text-base">
          {menuItems && menuItems.length > 0 && menuItems.map((item) => {
            // Match exact path or if current path starts with the slug (for nested routes)
            const isActive = pathname === item.slug || (item.slug !== '/' && pathname.startsWith(item.slug));
            return (
              <Link
                key={item.id}
                href={item.slug}
                className={`
                  px-4 py-2 rounded-md transition-all duration-200
                  ${isActive
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-primary/5 dark:hover:bg-primary/10'
                  }
                `}
                style={{
                  fontFamily: isActive ? 'var(--font-playfair), serif' : 'var(--font-inter), sans-serif',
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
