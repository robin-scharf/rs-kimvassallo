# Copilot Instructions for rs-kimvassallo

## Project Overview

This is a **Strapi v5.27.0** headless CMS blog application built with TypeScript, using SQLite (default) with support for PostgreSQL/MySQL. The project uses **pnpm** as the package manager with a workspace configuration that forces native dependency rebuilds (better-sqlite3).

## Architecture & Structure

### Content Type System

Strapi uses a layered API architecture. Each content type lives in `src/api/{content-type}/`:

- **schema.json**: Defines data model, relations, and components (in `content-types/{name}/`)
- **controllers/**: Extends `factories.createCoreController()` for custom endpoint logic
- **services/**: Extends `factories.createCoreService()` for custom business logic
- **routes/**: Extends `factories.createCoreRouter()` for custom routing

**Content Types in this project:**

- `article` (collectionType): Main blog posts with title, slug (UID from title), cover image, author/category relations, blocks (dynamic zone)
- `author` (collectionType): Name, email, avatar, oneToMany with articles
- `category` (collectionType): Name, slug, oneToMany with articles
- `global` (singleType): Site-wide settings (siteName, favicon, siteDescription, defaultSeo)
- `about` (singleType): About page with dynamic blocks

### Dynamic Components

Reusable content blocks in `src/components/shared/`:

- `media.json`: Single file upload (images/videos/files)
- `rich-text.json`: Rich text editor content
- `quote.json`: Quote with title and body
- `slider.json`: Multiple image carousel
- `seo.json`: SEO metadata (metaTitle, metaDescription, shareImage)

Articles and About page use these via `blocks` dynamic zones.

### Configuration Files (config/)

- **database.ts**: Multi-database config (sqlite/postgres/mysql) via env vars. SQLite default: `.tmp/data.db`
- **server.ts**: Host/port configuration (default: 0.0.0.0:1337)
- **api.ts**: REST API defaults (defaultLimit: 25, maxLimit: 100, withCount: true)
- **middlewares.ts**: Standard Strapi middleware stack (logger, errors, security, cors, etc.)
- **plugins.ts**: Empty by default - configure plugin settings here
- **admin.ts**: Empty templates for custom admin panel configuration

### TypeScript Configuration

- **Root tsconfig.json**: CommonJS modules, ES2019 target, excludes admin/plugins/tests
- **src/admin/tsconfig.json**: Separate config for admin panel (React/Vite)
- Compiled output goes to `dist/`, excludes `.cache/`, `.tmp/`, `build/`

## Development Workflows

### Essential Commands

```bash
pnpm develop          # Start with auto-reload (development mode)
pnpm start            # Production mode (no auto-reload)
pnpm build            # Build admin panel
pnpm strapi console   # Interactive Strapi console
```

**Key functions:**

- `checkFileExistsBeforeUpload()`: Prevents duplicate file uploads
- `updateBlocks()`: Processes dynamic zone components, uploads media
- `createEntry()`: Wrapper for document creation with error handling

### Environment Variables

Database configured via env (see `config/database.ts`):

- `DATABASE_CLIENT`: 'sqlite' (default), 'postgres', or 'mysql'
- `DATABASE_URL`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`
- `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_SSL*`
- `APP_KEYS`: Required for session encryption (array)
- `HOST`, `PORT`: Server configuration

## Key Conventions

### API Naming Pattern

All API identifiers use the format `api::{content-type}.{content-type}`:

- Controllers: `factories.createCoreController('api::article.article')`
- Services: `factories.createCoreService('api::article.article')`
- Routes: `factories.createCoreRouter('api::article.article')`
- Queries: `strapi.query('api::article.article')`
- Documents: `strapi.documents('api::article.article')`

### Schema Conventions

- **collectionType** vs **singleType**: Use singleType for globals/settings (one instance)
- **draftAndPublish**: Set `true` for content needing editorial workflow
- **slug fields**: Use `type: "uid"` with `targetField` to auto-generate from another field
- **relations**: Define inversedBy/mappedBy for bidirectional relations
- **allowedTypes**: Always specify for media fields: `["images", "files", "videos"]`

### File Organization

- Media uploads stored in `public/uploads/` and `data/uploads/`
- Generated types in `types/generated/` (components.d.ts, contentTypes.d.ts)

## Working with Strapi

### Extending Controllers

```typescript
import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::article.article',
  ({ strapi }) => ({
    async find(ctx) {
      // Custom logic before
      const { data, meta } = await super.find(ctx)
      // Custom logic after
      return { data, meta }
    },
  })
)
```

### Accessing Services

```typescript
// In controllers or lifecycle hooks
const articles = await strapi.service('api::article.article').find({ filters: { ... } });
```

### Working with Documents API (Strapi v5)

```typescript
// Create with relations and dynamic zones
await strapi.documents('api::article.article').create({
  data: {
    title: 'My Article',
    author: authorId,
    blocks: [
      { __component: 'shared.rich-text', body: '...' },
      { __component: 'shared.media', file: uploadedFile },
    ],
    publishedAt: Date.now(), // Publish immediately
  },
})
```

## Important Notes

- **Strapi v5** uses the newer Documents API (`strapi.documents()`) instead of Entity Service
- Admin panel is a separate React app built with Vite (see `src/admin/`)
- Native dependencies (better-sqlite3) require rebuild on install via pnpm workspace config
- Dynamic zone components must include `__component` field matching the component path
