# Kim Vassallo Website - Strapi CMS

A professional therapy website for Kim Vassallo, LCSW-R, built with Strapi v5.27.0 as a headless CMS.

## Website Structure

The website follows this page order:
1. **Home** - Hero section with name, credentials, and tagline
2. **About** - Professional background and experience
3. **Approach** - Therapeutic philosophy and methods
4. **Services** - List of services offered
5. **Contact** - Contact form and information

## Content Types

### Single Types (One instance each)
- **Home** (`api::home.home`) - Hero section content
  - Name, credentials, tagline, description, hero image
- **About** (`api::about.about`) - About section with dynamic blocks
- **Approach** (`api::approach.approach`) - Therapeutic approach content
- **Contact** (`api::contact.contact`) - Contact information
- **Global** (`api::global.global`) - Site-wide settings
  - Site name, description, location, SEO, etc.

### Collection Types (Multiple instances)
- **Service** (`api::service.service`) - Individual services
  - Title, description, order field for sorting

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Seed the database with Kim Vassallo content
pnpm seed

# Start development server
pnpm develop
```

### First-Time Setup

1. After running `pnpm develop`, the Strapi admin panel will open at `http://localhost:1337/admin`
2. Create your admin user account
3. Run `pnpm seed` to populate the site with Kim Vassallo content
4. The content will be accessible via the API

### Accessing Content via API

All content is available through the REST API:

- Home: `GET /api/home`
- About: `GET /api/about?populate=blocks`
- Approach: `GET /api/approach`
- Services: `GET /api/services?sort=order:asc`
- Contact: `GET /api/contact`
- Global: `GET /api/global?populate=defaultSeo`

### Managing Content

1. Log in to the admin panel at `http://localhost:1337/admin`
2. Navigate to Content Manager in the sidebar
3. Edit any of the content types:
   - **Home** - Update hero section
   - **About** - Edit about content (supports rich text blocks)
   - **Approach** - Modify therapeutic approach
   - **Services** - Add/edit/remove services
   - **Contact** - Update contact information
   - **Global** - Manage site-wide settings

## Content Structure Details

### Home Section
- **Name**: Kim Vassallo
- **Credentials**: LCSW-R
- **Tagline**: Individual therapy for women
- **Description**: Specialization areas
- **Hero Image**: Optional profile or hero image

### Services
Each service includes:
- Title
- Description
- Order (for sorting)

Default services include:
- Women's Issues
- Women's Health
- Pregnancy, Prenatal, Postpartum
- Grief and Loss
- Life Transitions
- Relationship Issues

### Dynamic Components

The About section uses dynamic blocks from `src/components/shared/`:
- **rich-text**: Formatted text content
- **media**: Images, videos, files
- **quote**: Highlighted quotes
- **slider**: Image carousels

## Development Commands

```bash
pnpm develop          # Start with auto-reload
pnpm start            # Production mode
pnpm build            # Build admin panel
pnpm seed             # Seed Kim Vassallo content
pnpm seed:example     # Seed example blog content (original)
pnpm strapi console   # Interactive Strapi console
```

## Database

- Default: SQLite (`.tmp/data.db`)
- Supports: PostgreSQL, MySQL (via environment variables)

## Design Notes

Based on the jmurbanlcsw.com design:
- Clean, professional therapy website
- Focus on women's health and perinatal mental health
- Emphasizes credentials and specializations
- Contact form instead of client portal
- No icon row (as per requirements)

## API Permissions

The seed script automatically sets public read permissions for:
- home (find)
- about (find)
- approach (find)
- service (find, findOne)
- contact (find)
- global (find)

Write permissions require authentication through the admin panel.

## Next Steps

To connect this CMS to a frontend:

1. Build a frontend application (React, Next.js, Vue, etc.)
2. Use the REST API endpoints listed above
3. Style according to the design inspiration
4. Implement contact form functionality
5. Deploy both Strapi (backend) and frontend separately

## Technologies

- **Strapi**: v5.27.0 (Headless CMS)
- **Database**: SQLite (default), PostgreSQL/MySQL supported
- **Package Manager**: pnpm
- **TypeScript**: Full TypeScript support
- **Node.js**: Required for Strapi

## Support

For Strapi documentation: https://docs.strapi.io/
