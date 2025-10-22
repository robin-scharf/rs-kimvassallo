# Tasks for rs-kimvassallo Improvements

## Phase 1: Backend (Strapi) Changes - ✅ COMPLETED

### 1.1 Create Hero Content Type (singleType) - ✅ DONE

- ✅ Created `hero` singleType with:
  - `title` (text)
  - `subtitle` (text)
  - `backgroundImage` (media - single image)
  - `backgroundColor` (string - color picker/hex)
  - `ctaButtonText` (string)
  - `ctaButtonLink` (string)

### 1.2 Modify Home Content Type - ✅ DONE

- ✅ Home content type already exists and works alongside hero
- Hero is fetched separately for the background section

### 1.3 Create/Update Services Collection Type - ✅ DONE

- ✅ Updated `service` collectionType with:
  - `title` (string)
  - `description` (richtext) - changed from text
  - `image` (media - single image) - NEW
  - `buttonText` (string - optional) - NEW
  - `slug` (UID from title) - NEW
  - `order` (integer for sorting)

### 1.4 Create Info Section Collection Type - ✅ DONE

- ✅ Created `info-item` collectionType with:
  - `title` (string)
  - `description` (text)
  - `buttonText` (string - optional)
  - `order` (integer for sorting)

### 1.5 Create Footer SingleType - ✅ DONE

- ✅ Created `footer` singleType with:
  - `legalText` (text)
  - `links` (component - repeatable):
    - `label` (string)
    - `url` (string)
    - `openInNewTab` (boolean)

### 1.6 Update Privacy Policy & Terms of Service - ✅ DONE

- ✅ `privacy-policy` singleType already has richtext content field
- ✅ `terms-of-service` singleType already has richtext content field

## Phase 2: Frontend Changes - ✅ COMPLETED

### 2.1 Navigation Menu Updates - ✅ DONE

- ✅ Removed "home" link from menu
- ✅ Updated About, Services, Contact links to anchor tags (#about, #services, #contact)
- ✅ Smooth scrolling enabled in layout.tsx (scroll-smooth class)

### 2.2 Scroll to Top Button - ✅ DONE

- ✅ Created ScrollToTop component with custom styling
- ✅ Positioned bottom-right
- ✅ Shows when scrolled > 10% of page height
- ✅ Smooth scroll behavior
- ✅ Added to main page

### 2.3 Hero Section Background - ✅ DONE

- ✅ Fetches hero data from Strapi (including backgroundImage)
- ✅ Applies background image to hero section
- ✅ Fallback to backgroundColor if no image
- ✅ Updated hero section with title/subtitle/CTA from Strapi
- ✅ Falls back to home data if hero not available

### 2.4 About Section Fixes - ✅ DONE

- ✅ Duplicate "ABOUT" header already removed (uses data.title)
- ✅ Installed react-markdown and remark-gfm
- ✅ Updated RichText component to properly render markdown with bold/italic

### 2.5 Services Section Redesign - ✅ DONE

- ✅ Fetches services collection from Strapi
- ✅ Displays in columns (3-column grid) with light borders between
- ✅ Each service shows: image, title, description
- ✅ Optional button linking to `/services/[slug]` page
- ✅ Responsive design with proper styling

### 2.6 Info Section Below Services - ✅ DONE

- ✅ Fetches info-items collection from Strapi
- ✅ Displays in horizontal flexbox with equal spacing
- ✅ Horizontal scroll if too many items
- ✅ Same background color as services (#2d5252)
- ✅ Shows title, description, optional button

### 2.7 Create Service Detail Pages - ✅ DONE

- ✅ Created `/services/[slug]/page.tsx` dynamic route
- ✅ Fetches individual service by slug
- ✅ Displays service detail page with image and full description
- ✅ Back to home link and CTA to contact

### 2.8 Footer Updates - ✅ DONE

- ✅ Fetches footer data from Strapi
- ✅ Center aligned footer
- ✅ Displays legal text
- ✅ Displays links in row with spacing-around
- ✅ Respects openInNewTab setting

### 2.9 Privacy & Terms Pages - ✅ DONE

- ✅ Already fetch content from Strapi
- ✅ Use RichText component for proper markdown rendering
- ✅ Routes work: `/privacy-policy` and `/terms-of-service`

## Phase 3: Testing & Verification - 🟡 READY FOR TESTING

### Backend Testing (Strapi Admin)

- [ ] Login to Strapi admin at http://localhost:1337/admin
- [ ] Verify all new content types appear:
  - Hero
  - Info Items
  - Footer
- [ ] Verify updated Services collection type has new fields
- [ ] Create test content for each:
  - Hero: Add title, subtitle, upload background image, set color
  - Services: Add services with images, descriptions, slugs
  - Info Items: Add fee information
  - Footer: Add legal text and links

### Frontend Testing

- [ ] Test all navigation anchor links scroll smoothly
- [ ] Test scroll-to-top button appears/disappears correctly
- [ ] Verify hero background loads from Strapi (upload image via admin)
- [ ] Verify about section markdown rendering (test **bold** and _italic_)
- [ ] Test services collection display with images
- [ ] Test service detail pages by clicking service buttons
- [ ] Test info section horizontal scrolling
- [ ] Verify footer displays correctly with links
- [ ] Test privacy policy and terms pages render richtext properly

## Next Steps for You

1. **Access Strapi Admin**: http://localhost:1337/admin
2. **Populate Content**:
   - Go to Hero and add your hero section content with background image
   - Go to Services and add your service offerings with images
   - Go to Info Items and add fee/information cards
   - Go to Footer and configure footer links
3. **Test Frontend**: http://localhost:3000
4. **Upload Background Image**: Upload your hero background image via Strapi admin

## API Endpoints Available

- `GET /api/hero` - Hero section data
- `GET /api/services` - All services
- `GET /api/services?filters[slug][$eq]={slug}` - Single service by slug
- `GET /api/info-items` - Information items
- `GET /api/footer` - Footer content
- All existing endpoints still work

## Notes

- Both backend (Strapi) and frontend (Next.js) are running
- All TypeScript errors resolved
- react-markdown installed for proper markdown rendering
- Services can now link to detail pages
- Footer is fully customizable from Strapi
