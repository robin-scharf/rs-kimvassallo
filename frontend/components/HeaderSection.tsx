import { Header, MenuItem } from '@/types/strapi';

interface HeaderSectionProps {
  header: Header | null;
  menuItems: MenuItem[];
}

export default function HeaderSection({ header, menuItems }: HeaderSectionProps) {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
            {header?.name || 'Welcome'}
            {header?.credentials && <span className="font-normal">, {header.credentials}</span>}
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-200">{header?.location || 'Location'}</p>
        </div>
        <nav className="mt-8 flex justify-center gap-12 text-base">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <a
                key={item.id}
                href={item.anchor}
                className="text-primary hover:text-primary-foreground font-medium"
              >
                {item.label}
              </a>
            ))
          ) : (
            <>
                <a href="#about" className="text-primary hover:text-primary-foreground font-medium">About</a>
                <a href="#services" className="text-primary hover:text-primary-foreground font-medium">Services</a>
                <a href="#contact" className="text-primary hover:text-primary-foreground font-medium">Contact</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
