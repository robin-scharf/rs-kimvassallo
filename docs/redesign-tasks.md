# Frontend Redesign Tasks - Milja Brecher-DeMuro Style

## Design Analysis

Based on the reference website (https://miljabrecherdemuro.com/) and the provided screenshot, here are the key design characteristics:

### Visual Design

- **Clean, minimalist aesthetic** with lots of white space
- **Split hero section**: Left side has text/navigation, right side has large professional photo
- **Typography**: Uppercase headings with letter spacing, clean sans-serif font (Helvetica-like)
- **Color scheme**: Neutral palette with dark gray text on light/off-white background
- **Simple button-style navigation**: White background buttons with border/shadow
- **Footer**: Minimal footer with social icons and copyright

### Layout Structure

- Hero takes full viewport height with 50/50 split (text left, image right)
- Navigation as button-grid layout below the main heading
- Sections use alternating image/text layout (zigzag pattern)
- No traditional header bar - everything is in the hero

### Typography Hierarchy

- Large uppercase name/title with thin font weight
- Smaller uppercase subtitle/credentials with letter spacing
- Body text is clean and readable
- Button-style navigation items in uppercase

---

## Required Pages

### 1. Home/Landing Page (/)

- Hero section with split layout (text left, photo right)
- Navigation button grid
- About section preview (optional)

### 2. About Page (/about)

- Copy content from current homepage About section
- Multiple sections with alternating graphic/text layout
- Each section: graphic + markdown text, alternating left/right

### 3. Individual Therapy Page (/individual-therapy)

Sections:

- Themes (intro content)
- Approach (methodology content)
- FAQ (accordion component)
- Groups + Workshops (additional offerings)

### 4. Contact Page (/contact)

- Contact details display
- Contact form

---

## Implementation Plan

### Phase 1: Backend/Strapi Structure Updates

#### Task 1.1: Update Hero Content Type

- Modify hero schema to support split layout
- Add professional photo field
- Update subtitle/credentials styling
- Remove background image (not needed for new design)

#### Task 1.2: Create Individual Therapy Content Type

- Create new single type: `individual-therapy`
- Fields:
  - `title` (string)
  - `themesTitle` (string)
  - `themesContent` (richtext)
  - `approachTitle` (string)
  - `approachContent` (richtext)
  - `faqTitle` (string)
  - `faqItems` (component, repeatable) - question/answer pairs
  - `groupsTitle` (string)
  - `groupsContent` (richtext)

#### Task 1.3: Update About Content Type

- Modify about schema to support multiple sections
- Add repeatable component: `about-section`
  - `title` (string)
  - `content` (richtext/markdown)
  - `graphic` (media - image)
  - `graphicPosition` (enum: 'left' | 'right')
- Keep backward compatibility or migrate existing data

#### Task 1.4: Update Menu Items

- Update menu items to reflect new navigation structure
- Remove services/hero related items
- Add: About, Individual Therapy, Contact

#### Task 1.5: Update Header Content Type (or remove)

- Decision needed: Keep header minimal or integrate into hero?
- Recommendation: Integrate into hero for cleaner design

---

### Phase 2: Frontend Design System Updates

#### Task 2.1: Update Typography & Design Tokens

- Update `globals.css` with new design system
- Typography: Helvetica Neue or system sans-serif stack
- Color variables: neutral palette (grays, off-white)
- Remove dark mode or simplify to light-only theme
- Add letter-spacing utilities for uppercase headings

#### Task 2.2: Update Layout Component

- Simplify layout for cleaner, minimal design
- Remove unnecessary theme toggle
- Update font family to match reference design

#### Task 2.3: Create Button Navigation Component

- New component for button-grid navigation style
- White background, subtle border/shadow
- Uppercase text with letter spacing
- Hover states

---

### Phase 3: Page & Component Development

#### Task 3.1: Redesign Hero Section

- Complete redesign for split layout (text left, photo right)
- Large professional photo on right (full height)
- Left side: name, credentials, tagline, button navigation grid
- Remove background image support
- Ensure responsive design (stack on mobile)

#### Task 3.2: Create/Update About Page

- New page at `/about` route
- Implement alternating section layout component
- Section component: image + markdown content
- Alternate positioning (left/right zigzag pattern)
- Responsive grid layout

#### Task 3.3: Create Individual Therapy Page

- New page at `/individual-therapy` route
- Section-based layout for themes, approach, FAQ, groups
- Integrate FAQ accordion component
- Rich text rendering for content sections

#### Task 3.4: Update Contact Page

- Simplify design to match new aesthetic
- Clean form layout
- Contact information display
- Ensure form styling matches design system

#### Task 3.5: Update/Create Shared Components

- **AlternatingSections**: For about page sections
- **FAQAccordion**: Reusable FAQ component
- **ButtonNavigation**: Button grid for hero
- **RichText**: Ensure markdown rendering works well

#### Task 3.6: Update Footer

- Minimal footer design
- Social media icons
- Copyright text
- Remove or simplify links

---

### Phase 4: Cleanup & Removal

#### Task 4.1: Remove Unused Content Types

- Remove or deprecate: services (replaced by individual-therapy)
- Remove: article-related types if not needed
- Remove: terms-of-service, privacy-policy (unless needed)

#### Task 4.2: Remove Unused Components

- ServicesSection component
- HeroSection (rebuild from scratch)
- Other unused sections

#### Task 4.3: Update Homepage

- Remove old sections (services, FAQ from home)
- Keep minimal: hero + optional preview
- Or redirect to about page

---

### Phase 5: Content Migration & Testing

#### Task 5.1: Content Migration

- Migrate existing About content to new structure
- Create placeholder content for Individual Therapy page
- Update navigation menu items in Strapi

#### Task 5.2: Responsive Testing

- Test on mobile, tablet, desktop
- Ensure alternating sections work responsively
- Verify image loading and optimization

#### Task 5.3: API Integration Testing

- Test all new API endpoints
- Verify data fetching for new pages
- Check error handling

#### Task 5.4: Final Design Polish

- Typography refinement
- Spacing adjustments
- Color/contrast verification
- Animation/transition polish (if any)

---

## Questions Before Implementation

Before proceeding, please confirm:

1. **Header Decision**: Should we remove the separate header component and integrate everything into the hero? (Recommended: YES)

2. **Hero Photo**: Do you have a professional photo ready for the hero section, or should we use the existing About section photo?

3. **Navigation Structure**: Confirm final navigation items:

   - About
   - Individual Therapy
   - Contact
   - Any others?

4. **Services Content**: The current "services" content type - should this be completely replaced by "individual-therapy", or do you want to keep some services functionality?

5. **Dark Mode**: Should we remove dark mode support entirely and go light-only? (Recommended: YES for cleaner, simpler design)

6. **About Page Sections**: How many sections do you envision for the About page? (e.g., 3-5 sections with alternating layouts?)

7. **FAQ Source**: Should FAQs live on the Individual Therapy page, or also appear elsewhere?

8. **Homepage Content**: Should the homepage be minimal (just hero + navigation), or include any preview sections?

9. **Contact Form Backend**: Do you want to keep the current contact form structure, or integrate with an email service?

10. **Social Media Links**: Which social platforms should be in the footer? (Facebook, Instagram, Phone, Email - as shown in reference?)
