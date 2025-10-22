import { Header, MenuItem } from '@/types/strapi';

interface HeaderSectionProps {
  header: Header | null;
  menuItems: MenuItem[];
}

export default function HeaderSection({ header, menuItems }: HeaderSectionProps) {
  return (
    <header className="bg-[#f5f1ed] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-lora), Lora, serif' }}>
            {header?.name || 'Welcome'}
            {header?.credentials && <span className="font-normal">, {header.credentials}</span>}
          </h1>
          <p className="text-base text-gray-600">{header?.location || 'Location'}</p>
        </div>
        <nav className="mt-8 flex justify-center gap-12 text-base">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <a
                key={item.id}
                href={item.anchor}
                className="text-teal-700 hover:text-teal-800 font-medium"
              >
                {item.label}
              </a>
            ))
          ) : (
            <>
              <a href="#about" className="text-teal-700 hover:text-teal-800 font-medium">About</a>
              <a href="#services" className="text-teal-700 hover:text-teal-800 font-medium">Services</a>
              <a href="#contact" className="text-teal-700 hover:text-teal-800 font-medium">Contact</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
