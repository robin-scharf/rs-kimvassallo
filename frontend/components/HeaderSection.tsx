import { Header, MenuItem } from '@/types/strapi';
import Link from 'next/link';

interface HeaderSectionProps {
  header: Header | null;
  menuItems: MenuItem[];
}

export default function HeaderSection({ header, menuItems }: HeaderSectionProps) {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            {header?.name || 'Welcome'}
          </h1>
        </div>
        <nav className="mt-6 flex justify-center gap-12 text-base">
          {menuItems && menuItems.length > 0 && menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.anchor}
              className="text-primary hover:text-primary-foreground font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
