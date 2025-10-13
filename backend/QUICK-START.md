# 🚀 Quick Start Guide - Kim Vassallo Website

## What's Been Built

A complete Strapi CMS backend for the Kim Vassallo therapy website, based on the design from jmurbanlcsw.com. All content is managed through Strapi.

## ✅ What's Ready

### Content Types Created:

1. **Home** - Hero section (name: "Kim Vassallo", credentials, tagline)
2. **About** - Professional background with rich text blocks
3. **Approach** - Therapeutic philosophy section
4. **Services** - Collection of therapy services offered
5. **Contact** - Contact information and form data
6. **Global** - Site-wide settings (SEO, location, etc.)

### Page Order (as requested):

- Home / About / Approach / Services / Contact

## 🎯 Next Steps

### 1. Start Strapi Development Server

```bash
cd /mnt/d/Code/rs-kimvassallo
pnpm develop
```

This will:

- Start Strapi on `http://localhost:1337`
- Open the admin panel automatically
- Prompt you to create an admin account (first time only)

### 2. Create Your Admin Account

When the admin panel opens:

1. Enter your admin email
2. Create a strong password
3. Enter your name
4. Click "Let's start"

### 3. Seed the Database

In a new terminal, run:

```bash
cd /mnt/d/Code/rs-kimvassallo
pnpm seed
```

This will populate your Strapi CMS with Kim Vassallo content:

- Home hero section
- About text
- Approach content
- 6 therapy services
- Contact information
- Global site settings

### 4. View Your Content

After seeding, go to the Strapi admin panel:

1. Click **Content Manager** in the left sidebar
2. You'll see all content types:
   - **Home** - Click to edit hero section
   - **About** - Edit professional background
   - **Approach** - Edit therapeutic philosophy
   - **Service** - View/edit all 6 services
   - **Contact** - Edit contact info
   - **Global** - Edit site-wide settings

### 5. Access Content via API

Your content is available through REST API endpoints:

```bash
# Home
GET http://localhost:1337/api/home

# About (with blocks)
GET http://localhost:1337/api/about?populate=blocks

# Approach
GET http://localhost:1337/api/approach

# Services (sorted by order)
GET http://localhost:1337/api/services?sort=order:asc

# Contact
GET http://localhost:1337/api/contact

# Global settings
GET http://localhost:1337/api/global?populate=defaultSeo
```

## 📝 Content Management

### Editing Content

1. Log in to admin panel: `http://localhost:1337/admin`
2. Go to **Content Manager**
3. Select the content type you want to edit
4. Make your changes
5. Click **Save**
6. Content updates are immediately available via API

### Adding Services

1. Go to **Content Manager** → **Service**
2. Click **Create new entry**
3. Fill in:
   - Title (e.g., "Anxiety Treatment")
   - Description
   - Order (number for sorting, e.g., 7)
4. Click **Save**

### Editing About Section

The About section supports **dynamic blocks**:

- **Rich Text**: Formatted paragraphs
- **Media**: Images or files
- **Quote**: Highlighted quotes
- **Slider**: Image carousel

To edit:

1. Content Manager → About
2. Click on **Blocks** section
3. Add/edit/remove blocks as needed

## 🎨 Design Notes

Based on jmurbanlcsw.com:

- ✅ Clean, professional therapist website
- ✅ Name changed to "Kim Vassallo"
- ✅ No icon row (excluded as requested)
- ✅ Contact CTA is just "contact" (not client portal)
- ✅ Contact form at bottom of page (data structure ready)
- ✅ Focus on women's health, perinatal mental health

## 📊 Current Content

### Services Included:

1. Women's Issues
2. Women's Health
3. Pregnancy, Prenatal, Postpartum
4. Grief and Loss
5. Life Transitions
6. Relationship Issues

### Hero Section:

- **Name**: Kim Vassallo
- **Credentials**: LCSW-R
- **Tagline**: Individual therapy for women
- **Specialization**: Women's health, perinatal mood and anxiety disorders, grief and loss

## 🔧 Troubleshooting

### If seed fails:

The seed script only runs once. To re-seed:

1. Delete the `.tmp/data.db` file
2. Restart Strapi: `pnpm develop`
3. Run seed again: `pnpm seed`

### To reset everything:

```bash
# Stop Strapi (Ctrl+C)
rm -rf .tmp/data.db
pnpm develop
# Create admin account again
pnpm seed
```

## 🌐 Building a Frontend

This is a **headless CMS** - you need a separate frontend to display the website.

### Recommended Stack:

- **Next.js** (React framework with SSR/SSG)
- **Tailwind CSS** (for styling like the inspiration site)
- **React Hook Form** (for contact form)

### Frontend Setup (example with Next.js):

```bash
npx create-next-app@latest kim-vassallo-frontend
cd kim-vassallo-frontend
npm install axios
```

### Fetch Data Example:

```javascript
// In your Next.js pages/components
const res = await fetch('http://localhost:1337/api/home')
const { data } = await res.json()
console.log(data) // { name: "Kim Vassallo", ... }
```

## 📚 Documentation

- **Strapi Docs**: https://docs.strapi.io/
- **REST API Docs**: https://docs.strapi.io/dev-docs/api/rest
- **Full README**: See `KIM-VASSALLO-README.md`

## ✨ Ready to Go!

Your Strapi CMS is fully configured and ready to use. All content is managed through the admin panel, and you can fetch it via the REST API to build your frontend.

Run `pnpm develop` to get started! 🚀
