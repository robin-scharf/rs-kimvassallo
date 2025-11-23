# Frontend Redesign - Implementation Complete

## Overview

The frontend has been redesigned to match the Milja Brecher-DeMuro aesthetic (https://miljabrecherdemuro.com/) with a clean, minimalist design.

## Key Features Implemented

### 1. Design System

- **Google Fonts**: Using Inter (similar to Helvetica) for clean typography
- **Color Palette**: Neutral grays with off-white background
- **Dark Mode**: Maintained and inverted to match light theme aesthetic
- **Design Tokens**: Centralized constants in `/lib/constants.ts`

### 2. Backend Structure (Strapi)

#### New Content Types:

- **Individual Therapy** (`/api/individual-therapy`)
  - Sections: Themes, Approach, FAQ, Groups + Workshops
  - FAQ items as repeatable component

#### Updated Content Types:

- **Hero**: Added `professionalPhoto`, `tagline` fields
- **About**: Added `sections` (repeatable component with alternating layout)
- **Footer**: Added social media links (LinkedIn, Instagram, phone, email) and photographer credit

#### New Components:

- **FAQ Item** (`/components/faq/item.json`)
- **About Section** (`/components/about/section.json`)

### 3. Frontend Components

#### HOC Components (`/components/hoc/`):

- **Section**: Consistent section spacing and container wrapper
- **Container**: Width-constrained containers with sizing options
- **Grid**: Responsive grid layouts
- **Heading**: Typography-consistent headings

#### Feature Components:

- **ButtonNavigation**: Clean button-style navigation grid
- **HeroSection**: Split layout (text left, photo right)
- **AlternatingSections**: Zigzag layout for About page sections
- **FAQAccordion**: Reusable accordion component
- **ContactForm**: Dummy form (ready for backend integration)
- **FooterSection**: Minimal footer with social icons

### 4. Pages

- **Home** (`/`): Minimal hero with navigation grid
- **About** (`/about`): Profile intro + alternating sections
- **Individual Therapy** (`/individual-therapy`): Themes, Approach, FAQ, Groups
- **Contact** (`/contact`): Contact details + form

### 5. Removed/Deprecated

- Old ServicesSection component
- Old HeroSection with parallax
- FAQ standalone page (now component)

## File Structure

```
frontend/
├── app/
│   ├── about/page.tsx
│   ├── individual-therapy/page.tsx
│   ├── contact/page.tsx
│   └── page.tsx (home)
├── components/
│   ├── hoc/ (HOC components)
│   ├── AlternatingSections.tsx
│   ├── ButtonNavigation.tsx
│   ├── ContactForm.tsx
│   ├── FAQAccordion.tsx
│   ├── FooterSection.tsx
│   ├── HeaderSection.tsx
│   ├── HeroSection.tsx
│   └── RichText.tsx
├── lib/
│   ├── api.ts (updated endpoints)
│   ├── constants.ts (design tokens)
│   └── utils.ts
└── types/
    └── strapi.ts (updated types)
```

## Next Steps

1. **Content Entry**: Add content to Strapi for all new content types
2. **Images**: Upload professional photos and section graphics
3. **Contact Form**: Integrate with email service or form handler
4. **Testing**: Test responsive design across devices
5. **SEO**: Update meta tags and SEO settings in Strapi
6. **Deployment**: Deploy updated backend and frontend

## Design Notes

- Typography uses uppercase with letter spacing for headings
- Buttons have minimal style with subtle shadow
- Navigation is presented as button grid, not traditional nav bar
- Footer includes photographer credit (as shown in reference)
- All sections use consistent spacing from constants
- Dark mode inverts colors but maintains the clean aesthetic

## Placeholder Images

Place placeholder images in `/public/images/`:

- `placeholder-hero.jpg` - For hero section
- `placeholder-profile.jpg` - For about profile
- `placeholder-section.jpg` - For section graphics

These will be replaced by actual Strapi images once uploaded.
