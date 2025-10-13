# Kim Vassallo Website - Strapi CMS

A professional therapy website CMS for **Kim Vassallo, LCSW-R**, built with Strapi v5.27.0. This project provides a complete headless CMS backend based on the design inspiration from jmurbanlcsw.com.

## 🎯 Project Overview

This Strapi application manages all content for the Kim Vassallo therapy website:
- **Home**: Hero section with credentials and tagline
- **About**: Professional background
- **Approach**: Therapeutic philosophy
- **Services**: Therapy services offered
- **Contact**: Contact information

All content is managed through the Strapi admin panel and accessible via REST API.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm develop
```
This opens `http://localhost:1337/admin` where you'll create your admin account.

### 3. Seed Database
```bash
pnpm seed
```
This populates the CMS with Kim Vassallo content.

**📖 See `QUICK-START.md` for detailed setup instructions.**

## 📋 Available Commands

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
pnpm develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
pnpm start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
pnpm build
```

### `seed`

Seed the database with Kim Vassallo website content.

```
pnpm seed
```

## 🌐 API Endpoints

Once seeded, access your content at:

- **Home**: `GET /api/home`
- **About**: `GET /api/about?populate=blocks`
- **Approach**: `GET /api/approach`
- **Services**: `GET /api/services?sort=order:asc`
- **Contact**: `GET /api/contact`
- **Global**: `GET /api/global?populate=defaultSeo`

## 📁 Content Types

### Single Types (One Instance)
- `home` - Hero section
- `about` - About page with dynamic blocks
- `approach` - Therapeutic approach
- `contact` - Contact information
- `global` - Site-wide settings

### Collection Types (Multiple Instances)
- `service` - Individual therapy services

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
pnpm strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
