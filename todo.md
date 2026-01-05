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
- [x] Verify admin panel works at `/admin`
- [x] Create initial admin user

---

## Phase 2: Layout & Navigation

### 2.1 Base Layout
- [x] Create `src/app/(frontend)/layout.tsx` with dark theme
- [x] Set up font (Inter)
- [x] Create `src/components/layout/Header.tsx`
  - [x] Logo
  - [x] Navigation links
  - [ ] Search bar (expandable on mobile)
- [x] Create `src/components/layout/MegaMenu.tsx`
  - [x] Main categories list
  - [x] Subcategories display
  - [x] Featured products preview (3 items)
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
- [x] Create `src/components/home/Hero.tsx` (separate component)
- [x] Full-width image with overlay (needs real image)
- [ ] Title and subtitle from SiteSettings
- [x] CTA button

### 3.2 Featured Categories
- [x] Basic category grid on homepage (placeholder)
- [x] Create `src/components/categories/CategoryCard.tsx`
- [x] Create horizontal scrollable section (CategoryScroll)
- [ ] Fetch featured categories from Payload

### 3.3 Featured Products
- [x] Basic product grid on homepage (placeholder)
- [x] Create `src/components/products/ProductCard.tsx`
  - [x] Status badge (Available/Pending/Sold)
  - [x] Image with hover effect
  - [x] Title, category, price
- [x] Create `src/components/products/ProductGrid.tsx`
- [ ] Fetch featured products from Payload

### 3.4 Lifestyle/Promo Sections
- [x] Create `src/components/home/LifestyleGrid.tsx`
- [x] Mixed-size image cards with text overlays
- [ ] Make content manageable from CMS (optional)

### 3.5 Newsletter Section
- [x] Basic newsletter form on homepage (UI only)
- [x] Create `src/components/forms/NewsletterForm.tsx`
- [x] API route to save subscriber
- [x] Success/error states

### 3.6 Homepage Assembly
- [x] Create `src/app/(frontend)/page.tsx`
- [x] Combine basic sections
- [ ] Test responsiveness

---

## Phase 4: Category Pages

### 4.1 Categories Listing
- [x] Create `src/app/(frontend)/categories/page.tsx`
- [x] Grid of all categories
- [x] Show product count per category

### 4.2 Category Detail Page
- [x] Create `src/app/(frontend)/categories/[slug]/page.tsx`
- [x] Category header with description
- [x] Create `src/components/categories/SubcategoryPills.tsx`
- [x] Product grid for category
- [x] Filter bar (price, status, sort)
- [x] Load more functionality (not pagination)

---

## Phase 5: Product Pages

### 5.1 Product Detail Page
- [x] Create `src/app/(frontend)/products/[slug]/page.tsx`
- [x] Create `src/components/products/ImageGallery.tsx`
  - [x] Main image display
  - [x] Thumbnail navigation
  - [x] Zoom on hover/click
- [x] Product info section (title, price, description)
- [x] Status indicator
- [x] "Make an Offer" button
- [x] Related products section

### 5.2 Offer Form Modal
- [x] Create `src/components/forms/OfferModal.tsx` (and `OfferButton.tsx`)
- [x] Fields: Name, Email, Phone (optional), Offer Amount (optional), Message
- [x] Pre-fill product info
- [x] API route to save offer (`/api/offers`)
- [ ] Email notification (optional, can add later)
- [x] Success confirmation

---

## Phase 6: Search

### 6.1 Search Functionality
- [x] Create `src/components/forms/SearchBar.tsx`
- [x] Create `src/app/(frontend)/search/page.tsx`
- [x] Search API route or use Payload's built-in search
- [x] Results display with ProductGrid
- [x] No results state
- [x] Filter by category option

---

## Phase 7: Static Pages

### 7.1 About Page
- [x] Create `src/app/(frontend)/about/page.tsx`
- [x] Story/history section
- [x] Team or owner info (optional) - skipped, not needed for MVP
- [x] Values or mission
- [ ] Consider making content editable via Payload global (optional)

### 7.2 Contact Page
- [x] Create `src/app/(frontend)/contact/page.tsx`
- [x] Contact information display
- [x] Contact form (with ContactForm component)
- [x] Created ContactMessages collection in Payload
- [x] Created /api/contact route
- [ ] Map embed (optional)
- [x] Social links

### 7.3 Additional Pages (if needed)
- [ ] Privacy Policy
- [ ] Terms of Service

---

## Phase 8: Polish & Optimization

### 8.1 SEO (Completed - structural parts)
- [x] Add metadata to all pages (title, description, keywords, OpenGraph)
- [x] Create `src/app/sitemap.ts` (dynamic, includes all categories/products)
- [x] Create `src/app/robots.ts`
- [ ] Add Open Graph images (deferred to after UI redesign)
- [x] Structured data for products (JSON-LD Product schema)

### 8.2 Performance (Deferred to after UI redesign)
- [ ] Image optimization (Next.js Image component)
- [ ] Lazy loading for below-fold content
- [ ] Check Core Web Vitals

### 8.3 UX Polish (Deferred to after UI redesign)
- [ ] Loading states (skeletons)
- [ ] Error states
- [ ] Empty states
- [ ] Smooth transitions and animations
- [ ] Mobile responsiveness check

### 8.4 Accessibility (Structural parts completed)
- [x] Keyboard navigation (skip link added)
- [x] Screen reader labels (aria-labels on icon buttons)
- [ ] Color contrast check (deferred to after UI redesign)

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

### Session 2 - Dec 20, 2024
- Fixed Payload admin panel config error
- Root cause: (payload)/layout.tsx was missing the RootLayout wrapper that provides config context
- Fixed layout.tsx to use RootLayout from @payloadcms/next/layouts with proper serverFunction
- Fixed page.tsx and not-found.tsx to use the actual importMap instead of empty object
- Created custom.scss for Payload admin
- Fixed nested html/body layout issue (root layout now passes through children)
- Created first admin user successfully

### Session 3 - Dec 20, 2024
- Created ProductCard component with status badges, wishlist button, hover effects
- Created ProductGrid component
- Created CategoryCard and CategoryScroll with drag-to-scroll
- Created MegaMenu with subcategories and featured products preview
- Updated Header with MegaMenu integration
- Created Hero component with scroll indicator
- Created LifestyleGrid with mixed-size cards
- Created NewsletterForm with API route (saves to Payload)
- Created Categories listing page
- Created Category detail page with filters and SubcategoryPills
- **Next:** Product detail page, then connect to Payload CMS

### Session 4 - Dec 20, 2024
- Created Product detail page (`/products/[slug]`)
- Created ImageGallery component with thumbnail navigation and fullscreen zoom modal
- Created OfferButton and OfferModal components for making offers
- Created Offer API route (`/api/offers`) that saves to Payload
- Product page includes: breadcrumb, status badge, price, dimensions, description, related products
- All components tested and working with demo data
- **Next:** Connect all pages to fetch real data from Payload CMS (Phase 5 complete, move to data integration)

### Session 5 - Dec 20, 2024
- Connected all pages to Payload CMS (no more hardcoded demo data)
- Created `src/lib/payload.ts` with data fetching functions
- Created seed script (`pnpm seed`) to populate database with demo content
- Updated Homepage to fetch featured products and categories from Payload
- Updated Categories listing to fetch all categories with product counts
- Updated Category detail page to fetch products by category
- Updated Product detail page to fetch product and related items
- Updated Header/MegaMenu to fetch categories with subcategories dynamically
- Fixed ImageGallery to handle products without images
- Database now contains: 6 categories, 10 subcategories, 12 products
- **Next:** Phase 6 (Search) or Phase 7 (Static Pages)

### Session 6 - Dec 20, 2024
- Implemented Phase 6: Search functionality
- Created `SearchBar` component with expandable header variant and full-width page variant
- Integrated search bar into Header (desktop expandable, mobile in nav menu)
- Created `/search` results page with ProductGrid display
- Added `searchProducts` function to payload.ts using Payload's `contains` operator
- Added `SearchFilters` component with category dropdown filter
- Implemented empty state and no results states
- Search works across product title and description fields
- Enhanced search with immersive modal experience:
  - Created `SearchModal` component with dark overlay and backdrop blur
  - Real-time search results as you type (debounced 300ms)
  - Keyboard navigation (Arrow keys, Enter, Escape)
  - Cmd/Ctrl+K keyboard shortcut to open search
  - Shows top 5 results with product images, prices, and status
  - "View all results" link to full search page
  - Quick category links when no query
  - Created `/api/search` API route for real-time results
- **Next:** Phase 7 (Static Pages - About, Contact)

### Session 7 - Dec 20, 2024
- Implemented Phase 7: Static Pages
- Created About page (`/about`) with:
  - Hero section
  - Story/history section
  - Values section with 4 value cards
  - Quote block
  - CTA section linking to categories and contact
- Created Contact page (`/contact`) with:
  - Hero section
  - Contact information (email, phone, location, response time)
  - Social links (Instagram, Facebook)
  - ContactForm component with subject dropdown
- Created ContactMessages Payload collection
- Created `/api/contact` route for form submissions
- Updated payload.config.ts with ContactMessages collection
- **Next:** Phase 8 (Polish & Optimization) or additional static pages (Privacy, Terms)

### Session 8 - Dec 20, 2024
- Implemented Phase 8 SEO & Structure (non-visual parts only, saving visual polish for UI redesign):
- Added metadata to all pages:
  - Homepage: title, description, keywords, OpenGraph
  - Search page: title, description
  - (Categories, Products, About, Contact already had metadata)
- Created `src/app/sitemap.ts`:
  - Dynamic sitemap including all static pages
  - Auto-generates category pages from database
  - Auto-generates product pages from database
- Created `src/app/robots.ts`:
  - Allows all pages except /admin/ and /api/
  - Links to sitemap.xml
- Added JSON-LD structured data for products:
  - Product schema with name, description, price, availability
  - Proper OpenGraph metadata with images
- Accessibility improvements:
  - Added skip link to main content in layout
  - Added aria-labels to icon buttons in header
  - Added aria-expanded for mobile menu toggle
- **Next:** UI Redesign, then complete remaining Phase 8 visual polish

### Session 9 - Dec 20, 2024
- **FULL UI REDESIGN** based on locked design rulebook
- Created `design.md` with immutable design rules derived from UI reference
- Implemented design tokens as CSS variables in `globals.css`:
  - Spacing system (8px base unit)
  - Color palette (monochromatic dark theme with semantic colors)
  - Typography scale (display, title-1/2/3, body, caption, small)
  - Border radius tokens (16px cards, 12px inputs, pill buttons)
  - Shadow and elevation tokens
  - Animation/transition tokens (200ms normal, 300ms slow)
- Updated `tailwind.config.ts` with custom theme values
- Created CSS component classes: btn-primary, btn-secondary, input, badge-*, card
- Redesigned all components following the locked rulebook:
  - Header: 64px height, bg-secondary, proper text colors (no amber)
  - Footer: bg-secondary, border-top, proper typography
  - ProductCard: 1:1 aspect ratio, 16px radius, semantic status badges
  - CategoryCard: square aspect, gradient overlay, proper typography
  - SubcategoryPills: pill style with active/inactive states
  - SearchModal: 50% overlay, card-style results
  - OfferModal: 24px radius, proper form inputs
  - NewsletterForm: input and btn-primary classes
  - ContactForm: input class, proper labels
  - Hero: card-style with gradient, btn-primary/secondary
  - ImageGallery: card-style main image, 80px thumbnails
  - SearchBar: input class for page variant, proper icon colors
  - SearchFilters: input class for select
- Updated all page layouts:
  - Homepage: max-w-7xl px-6, text-title-1 section headers
  - Category page: proper breadcrumbs, typography, filters
  - Product page: display typography, semantic badges, btn-secondary
  - About page: card pattern, border-text-primary for quote
  - Contact page: icon containers with proper styling
  - Search page: bg-bg-secondary header, text tokens throughout
- Key changes from previous design:
  - Removed all amber/accent colors (monochromatic only)
  - Standardized all spacing to 8px base unit
  - Consistent border radius across components
  - Proper typography hierarchy throughout
  - Semantic status colors only (success, warning, error)
- **Next:** Test visually, complete remaining Phase 8 polish (loading states, etc.)

### Session 10 - Dec 21, 2024
- **COMPLETE UI REDESIGN** based on FF-design.md (Framer template inspired)
- Created `FF-design.md` with comprehensive design system:
  - Editorial over transactional approach
  - Whitespace as structure principle
  - Typography-focused design
- Implemented new FF design tokens in `globals.css`:
  - New color palette: bg-primary (#0E0E0E), bg-secondary (#141414), bg-tertiary (#1B1B1B)
  - Border colors: border-primary (#2A2A2A), border-secondary (#333333)
  - Text colors: text-primary (#EDEDED), text-secondary (#B5B5B5), text-tertiary (#7A7A7A)
  - Typography: text-manifesto (48-56px), text-section-title (24-28px), text-body (16px)
  - Pill buttons (999px radius), outline-only style
  - Section padding: 96px vertical (64px mobile)
- Created new CSS utilities:
  - `.container-editorial` - 1400px max-width with gutter padding
  - `.grid-editorial` - 3-column responsive grid
  - `.section-padding` - Consistent vertical spacing
  - `.btn-pill` / `.btn-pill-filled` - Pill-shaped buttons
  - `.input-field` / `.textarea-field` - Minimal border-only inputs
  - `.link-arrow` - Links with animated arrow
  - `.ticker` - Scrolling announcement bar
- Redesigned Header:
  - Minimal nav bar: Menu (left), Brand (center), Search (right)
  - Full-screen menu overlay with split layout
  - Scrolling ticker bar below nav
- Redesigned Footer:
  - Newsletter bar with inline form
  - 3-column grid with links
- Redesigned ProductCard:
  - Gray container (#1B1B1B) with product inside
  - Product name and price below
  - Optional "New" tag
- Created new homepage sections:
  - Hero with categories sidebar (desktop) + full-width image
  - ManifestoSection with large centered text
  - FeaturedProductsSection with 3-column grid
  - CinematicBreak (full-width image, no text)
  - HighlightedObject (50/50 split layout)
  - EditorialStories (3-column story cards)
  - QuoteSection (centered testimonial with avatar)
- Redesigned About page:
  - Dark hero image bar
  - Large manifesto text block
  - Three-column info blocks
  - Full-width image with centered title overlay
- Redesigned Contact page:
  - Split layout: address (left), form (right)
  - Large typography for address
  - Minimal form with link-arrow submit
  - Full-width landscape image below
- Updated all category and product pages:
  - Breadcrumb navigation
  - Section headers with text-manifesto
  - Editorial grid layouts
  - Pill button styles for filters
- Updated SearchModal:
  - Full-screen overlay design
  - Large search input with manifesto-style placeholder
  - Minimal result cards
- **Dev server running at http://localhost:3000**
- **Next:** Visual testing, add real images, responsive polish

### Session 11 - Jan 2, 2026
- **Homepage Refinements & Theme Switching**
- Removed side menu from hero section (now full-width)
- Added CategoryIconsSection under hero with:
  - `showOnHomepage` checkbox field in Categories collection
  - `icon` select field in Categories collection
  - Custom SVG icons for each category
  - Product count display
  - `getHomepageCategories` function in payload.ts
- Implemented dark/light theme switching:
  - Created ThemeProvider context with localStorage persistence
  - Created ThemeToggle component (sun/moon icons)
  - Updated CSS variables to RGB format for Tailwind opacity support
  - Updated tailwind.config.ts with CSS variable colors
- Created SectionHeader component for consistent title/subtitle styling
- Replaced ManifestoSection with ServicesSection (4 services: Progettazione, Shop, Noleggio, Showroom)
- Changed product grid from 3 to 4 columns on desktop
- Replaced CinematicBreak with SplitImageSection (half image, half centered text)
- Removed HighlightedObject section before testimonials
- Applied custom SVG icons from public/icons for Illuminazione and Arredamento categories
- Made category icons bigger (w-16 h-16, 64px)
- Attempted Payload admin thumbnail preview but reverted due to breaking row clickability
- **Next:** Visual testing, responsive polish, add real content

### Session 12 - Jan 5, 2026
- **UI Polish & Mobile Experience Improvements**
- Removed theme toggle functionality (keeping dark theme only):
  - Deleted ThemeProvider and ThemeToggle components
  - Removed light theme CSS variables from globals.css
  - Updated layout.tsx to always use dark theme
- Made separator lines thicker and more visible:
  - Increased border colors visibility (#373737, #464646)
  - Changed all borders from 1px to 2px across all sections
  - Updated dividers, ticker, product grid, Header, Footer, HomeSections
- Category icon field changes:
  - Removed `showOnHomepage` flag (all parent categories now shown on homepage)
  - Changed `icon` from select dropdown to upload field for custom icons
  - Updated `getHomepageCategories` to fetch all parent categories and handle uploaded media
  - Created script to clear old string icon values causing MongoDB CastError
  - Made icons larger (128px)
- Added ManifestoSection back between featured products and testimonials
- Added LoadingBar component for page transitions with progress animation
- Services section updates:
  - Changed to 1:1 aspect-square ratio
  - Made full-width (edge-to-edge)
  - Added border lines consistent with product grid
  - Updated service images to new paths
- Mobile carousel improvements:
  - Converted categories and services to horizontal carousels on mobile
  - Added auto-scroll with center snapping
  - Carousels pause on hover/touch interaction
- Menu featured products:
  - Added hover functionality to show category's featured products
  - Changed from thumbnail to card size images for better quality
- Offer modal improvements:
  - Changed button and modal title to "Richiedi Info"
  - Added dynamic offer acceptability with colored borders and icons:
    - Premium (≥ asking): amber/gold with Crown icon "Offerta Fantastica!"
    - Good (≤10% off): green with CheckCircle "Offerta buona"
    - Low (10-20% off): yellow with AlertTriangle "Offerta bassa"
    - Too low (>20% off): red with XCircle "Offerta troppo bassa", submit disabled
- Testimonials section updates:
  - Added 6 testimonials with quotes and authors
  - Removed profile picture/avatar
  - Changed to horizontal swipeable carousel with snap points
  - Added auto-scroll every 5 seconds
  - Added title "Cosa Dicono di Noi" and subtitle
  - Added dot indicators for navigation
- Removed SplitImageSection from homepage
- **Next:** Visual testing on mobile devices, verify testimonial carousel swipe
