// Design System Constants
// These constants define the visual language of the application

// SPACING
export const SPACING = {
  section: {
    py: 'py-16 md:py-24 lg:py-32',
    px: 'px-4 sm:px-6 lg:px-8',
  },
  container: {
    maxWidth: 'max-w-7xl',
    centered: 'mx-auto',
  },
  grid: {
    gap: 'gap-8 md:gap-12 lg:gap-16',
  },
} as const

// TYPOGRAPHY
export const TYPOGRAPHY = {
  heading: {
    h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider uppercase',
    h2: 'text-3xl sm:text-4xl md:text-5xl font-light tracking-wider uppercase',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-light tracking-wide uppercase',
    h4: 'text-xl sm:text-2xl md:text-3xl font-light tracking-wide uppercase',
  },
  // Use Playfair Display for sub-page headings
  headingFont: 'font-playfair',
  subtitle: {
    large:
      'text-lg sm:text-xl md:text-2xl font-light tracking-widest uppercase',
    medium:
      'text-base sm:text-lg md:text-xl font-light tracking-widest uppercase',
    small:
      'text-sm sm:text-base md:text-lg font-light tracking-widest uppercase',
  },
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
  },
} as const

// NAVIGATION
export const NAVIGATION = {
  items: [
    { label: 'ABOUT', href: '/about', anchor: '#about' },
    {
      label: 'INDIVIDUAL THERAPY',
      href: '/individual-therapy',
      anchor: '#individual-therapy',
    },
    { label: 'CONTACT', href: '/contact', anchor: '#contact' },
  ],
} as const

// SOCIAL MEDIA
export const SOCIAL_MEDIA = {
  linkedin: {
    label: 'LinkedIn',
    icon: 'Linkedin',
  },
  instagram: {
    label: 'Instagram',
    icon: 'Instagram',
  },
  phone: {
    label: 'Phone',
    icon: 'Phone',
  },
  email: {
    label: 'Email',
    icon: 'Mail',
  },
} as const

// ANIMATIONS
export const ANIMATIONS = {
  transition: {
    default: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
  },
  hover: {
    lift: 'hover:-translate-y-1',
    scale: 'hover:scale-105',
  },
} as const

// BREAKPOINTS (for reference - matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// PLACEHOLDER IMAGES
export const PLACEHOLDERS = {
  hero: '/photos/hero_photo.png',
  profile: '/photos/hero_photo.png',
  section: '/photos/hero_photo.png',
} as const
