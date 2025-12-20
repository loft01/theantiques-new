# The Antiques - Development Todo

> **IMPORTANT**: Update this file as you complete tasks. Mark items with `[x]` when done.

---

## Phase 1: Project Foundation

### 1.1 Initialize Project
- [x] Create Next.js 15 project with Payload CMS (manual setup)
- [x] Configure MongoDB as database adapter
- [ ] Verify project runs with `pnpm dev`
- [ ] Set up environment variables (.env)
  - [ ] PAYLOAD_SECRET
  - [ ] DATABASE_URI (MongoDB connection string)
  - [ ] NEXT_PUBLIC_SERVER_URL

### 1.2 Configure Tailwind & Theme
- [x] Install and configure Tailwind CSS
- [x] Set up dark theme color palette in `tailwind.config.ts`
- [x] Configure CSS variables in `globals.css`
- [ ] Install shadcn/ui CLI and initialize
- [ ] Install required shadcn components (button, dialog, input, etc.)
- [ ] Customize shadcn theme to match design (NOT default look)

### 1.3 Set Up Payload Collections
- [x] Create `src/collections/Media.ts` with image sizes
- [x] Create `src/collections/Categories.ts`
- [x] Create `src/collections/Products.ts`
- [x] Create `src/collections/Offers.ts`
- [x] Create `src/collections/NewsletterSubscribers.ts`
- [x] Create `src/globals/SiteSettings.ts`
- [x] Update `payload.config.ts` with all collections and globals
- [ ] Verify admin panel works at `/admin`
- [ ] Create initial admin user

---

## Phase 2: Layout & Navigation

### 2.1 Base Layout
- [x] Create `src/app/(frontend)/layout.tsx` with dark theme
- [x] Set up font (Inter)
- [x] Create `src/components/layout/Header.tsx`
  - [x] Logo
  - [x] Navigation links
  - [ ] Search bar (expandable on mobile)
- [ ] Create `src/components/layout/MegaMenu.tsx`
  - [ ] Main categories list
  - [ ] Subcategories display
  - [ ] Featured products preview (3 items)
- [x] Create `src/components/layout/Footer.tsx`
  - [x] Site info
  - [x] Navigation links
  - [x] Social links
  - [ ] Newsletter signup (functional)
  - [x] Copyright

### 2.2 Mobile Navigation
- [x] Create mobile menu (hamburger)
- [ ] Mobile search
- [x] Responsive header

---

## Phase 3: Homepage

### 3.1 Hero Section
- [x] Create hero section in homepage (basic structure)
- [ ] Create `src/components/home/Hero.tsx` (separate component)
- [ ] Full-width image with overlay (needs real image)
- [ ] Title and subtitle from SiteSettings
- [x] CTA button

### 3.2 Featured Categories
- [x] Basic category grid on homepage (placeholder)
- [ ] Create `src/components/categories/CategoryCard.tsx`
- [ ] Create horizontal scrollable section
- [ ] Fetch featured categories from Payload

### 3.3 Featured Products
- [x] Basic product grid on homepage (placeholder)
- [ ] Create `src/components/products/ProductCard.tsx`
  - [ ] Status badge (Available/Pending/Sold)
  - [ ] Image with hover effect
  - [ ] Title, category, price
- [ ] Create `src/components/products/ProductGrid.tsx`
- [ ] Fetch featured products from Payload

### 3.4 Lifestyle/Promo Sections
- [ ] Create `src/components/home/LifestyleGrid.tsx`
- [ ] Mixed-size image cards with text overlays
- [ ] Make content manageable from CMS (optional)

### 3.5 Newsletter Section
- [x] Basic newsletter form on homepage (UI only)
- [ ] Create `src/components/forms/NewsletterForm.tsx`
- [ ] API route to save subscriber
- [ ] Success/error states

### 3.6 Homepage Assembly
- [x] Create `src/app/(frontend)/page.tsx`
- [x] Combine basic sections
- [ ] Test responsiveness

---

## Phase 4: Category Pages

### 4.1 Categories Listing
- [ ] Create `src/app/(frontend)/categories/page.tsx`
- [ ] Grid of all categories
- [ ] Show product count per category

### 4.2 Category Detail Page
- [ ] Create `src/app/(frontend)/categories/[slug]/page.tsx`
- [ ] Category header with description
- [ ] Create `src/components/categories/SubcategoryPills.tsx`
- [ ] Product grid for category
- [ ] Filter bar (price, status, sort)
- [ ] Load more functionality (not pagination)

---

## Phase 5: Product Pages

### 5.1 Product Detail Page
- [ ] Create `src/app/(frontend)/products/[slug]/page.tsx`
- [ ] Create `src/components/products/ImageGallery.tsx`
  - [ ] Main image display
  - [ ] Thumbnail navigation
  - [ ] Zoom on hover/click
- [ ] Product info section (title, price, description)
- [ ] Status indicator
- [ ] "Make an Offer" button
- [ ] Related products section

### 5.2 Offer Form Modal
- [ ] Create `src/components/forms/OfferForm.tsx`
- [ ] Fields: Name, Email, Phone (optional), Offer Amount (optional), Message
- [ ] Pre-fill product info
- [ ] API route to save offer
- [ ] Email notification (optional, can add later)
- [ ] Success confirmation

---

## Phase 6: Search

### 6.1 Search Functionality
- [ ] Create `src/components/forms/SearchBar.tsx`
- [ ] Create `src/app/(frontend)/search/page.tsx`
- [ ] Search API route or use Payload's built-in search
- [ ] Results display with ProductGrid
- [ ] No results state
- [ ] Filter by category option

---

## Phase 7: Static Pages

### 7.1 About Page
- [ ] Create `src/app/(frontend)/about/page.tsx`
- [ ] Story/history section
- [ ] Team or owner info (optional)
- [ ] Values or mission
- [ ] Consider making content editable via Payload global

### 7.2 Contact Page
- [ ] Create `src/app/(frontend)/contact/page.tsx`
- [ ] Contact information display
- [ ] Contact form
- [ ] Map embed (optional)
- [ ] Social links

### 7.3 Additional Pages (if needed)
- [ ] Privacy Policy
- [ ] Terms of Service

---

## Phase 8: Polish & Optimization

### 8.1 SEO
- [ ] Add metadata to all pages
- [ ] Create `src/app/sitemap.ts`
- [ ] Add Open Graph images
- [ ] Structured data for products (optional)

### 8.2 Performance
- [ ] Image optimization (Next.js Image component)
- [ ] Lazy loading for below-fold content
- [ ] Check Core Web Vitals

### 8.3 UX Polish
- [ ] Loading states (skeletons)
- [ ] Error states
- [ ] Empty states
- [ ] Smooth transitions and animations
- [ ] Mobile responsiveness check

### 8.4 Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader labels
- [ ] Color contrast check

---

## Phase 9: Testing & Launch Prep

### 9.1 Testing
- [ ] Test all user flows
- [ ] Test offer submission
- [ ] Test newsletter signup
- [ ] Test on multiple devices
- [ ] Test on multiple browsers

### 9.2 Content
- [ ] Add sample categories
- [ ] Add sample products
- [ ] Configure site settings
- [ ] Add real images

### 9.3 Deployment
- [ ] Set up MongoDB Atlas (or other hosted MongoDB)
- [ ] Deploy to Vercel (or chosen platform)
- [ ] Configure environment variables in production
- [ ] Test production build

---

## Notes & Decisions

### Design Decisions
- Dark theme based on Primearredo reference
- Amber accent color for antiques feel
- Custom product cards (not default shadcn)
- Horizontal scroll for featured sections

### Technical Decisions
- Using Payload's built-in API (no separate backend)
- Media stored locally in public/media (can switch to cloud later)
- No authentication for public users (admin only)

---

## Session Log

> Add notes here about what was done in each session

### Session 1 - Dec 20, 2024
- Created PRD.md with full requirements
- Created claude.md with development rules
- Created todo.md with detailed plan
- Set up project structure manually (CLI had TTY issues)
- Created all Payload collections: Users, Media, Categories, Products, Offers, NewsletterSubscribers
- Created SiteSettings global
- Created payload.config.ts with MongoDB adapter
- Set up Tailwind with dark theme colors
- Created base layout with Header and Footer
- Created basic homepage with placeholder sections
- **Next:** Install dependencies, set up MongoDB, test the setup
