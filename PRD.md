# The Antiques - Product Requirements Document (PRD)

## 1. Project Overview

**Project Name:** The Antiques
**Type:** Showcase/Catalog Website (Non-transactional E-commerce)
**Tech Stack:** Next.js 15 + Payload CMS 3.0 + MongoDB + shadcn/ui + Tailwind CSS

### Vision
A beautiful, modern dark-themed website to showcase vintage and antique items. While it looks and feels like an e-commerce store, all transactions happen off-site through direct communication with the owner.

### Core Concept
- Users browse categories and items
- Users can make offers or inquiries on items
- Owner receives notifications and manages communication externally
- No cart, checkout, or payment processing

---

## 2. Technical Architecture

### Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.0 (embedded in Next.js) |
| Database | MongoDB (via @payloadcms/db-mongodb) |
| Styling | Tailwind CSS + shadcn/ui (customized, not default look) |
| Fonts | Inter or Outfit (sans-serif) |
| Deployment | TBD (Vercel-ready with Neon/MongoDB Atlas) |

### Payload CMS 3.0 Setup (IMPORTANT)

#### Installation Method
Use the official create-payload-app CLI for a clean setup:

```bash
# Create new project with website template (recommended)
pnpx create-payload-app@latest -t website

# Or create blank project
pnpx create-payload-app@latest
```

#### Required Packages
```bash
# Core Payload packages (included via create-payload-app)
payload
@payloadcms/next
@payloadcms/richtext-lexical

# Database adapter for MongoDB
@payloadcms/db-mongodb

# If using npm, may need legacy peer deps
npm i --legacy-peer-deps
```

#### Environment Variables (.env)
```env
PAYLOAD_SECRET=your-secret-key-minimum-32-chars
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/theantiques
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

#### payload.config.ts Structure
```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Offers } from './collections/Offers'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Products, Categories, Offers, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
})
```

### Project Structure (Payload 3.0 Native)
```
theantiques/
├── src/
│   ├── app/
│   │   ├── (frontend)/              # Public pages (route group)
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── layout.tsx           # Frontend layout
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx         # All categories
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Category detail
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Product detail
│   │   │   └── search/
│   │   │       └── page.tsx         # Search results
│   │   ├── (payload)/               # Payload admin (route group)
│   │   │   ├── admin/
│   │   │   │   └── [[...segments]]/
│   │   │   │       └── page.tsx     # Payload admin UI
│   │   │   └── api/
│   │   │       └── [...slug]/
│   │   │           └── route.ts     # Payload API routes
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── collections/                  # Payload collections
│   │   ├── Products.ts
│   │   ├── Categories.ts
│   │   ├── Offers.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/                      # Payload globals
│   │   └── SiteSettings.ts
│   ├── components/
│   │   ├── ui/                       # shadcn/ui (customized)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   └── Footer.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ImageGallery.tsx
│   │   ├── categories/
│   │   │   ├── CategoryCard.tsx
│   │   │   └── SubcategoryPills.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedSection.tsx
│   │   │   └── LifestyleGrid.tsx
│   │   └── forms/
│   │       ├── OfferForm.tsx
│   │       ├── SearchBar.tsx
│   │       └── NewsletterForm.tsx
│   ├── lib/
│   │   ├── payload.ts               # Payload client helper
│   │   └── utils.ts                 # Utility functions
│   └── payload.config.ts            # Payload configuration
├── public/
│   └── images/                       # Static images
├── .env                              # Environment variables
├── next.config.mjs                   # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json
└── package.json
```

---

## 3. Data Models (Payload Collections)

### Products Collection
```typescript
// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'price'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' }
    },
    { name: 'description', type: 'richText' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true }
      ]
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true
    },
    { name: 'price', type: 'number', required: true },
    {
      name: 'priceLabel',
      type: 'select',
      defaultValue: 'asking',
      options: [
        { label: 'Asking Price', value: 'asking' },
        { label: 'Starting At', value: 'starting' },
        { label: 'Estimate', value: 'estimate' },
        { label: 'Make Offer', value: 'offer' },
      ]
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Pending', value: 'pending' },
        { label: 'Sold', value: 'sold' },
      ],
      admin: { position: 'sidebar' }
    },
  ],
}
```

### Categories Collection
```typescript
// src/collections/Categories.ts
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      // For subcategories
    },
  ],
}
```

### Offers Collection (Inquiries)
```typescript
// src/collections/Offers.ts
import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'product', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'offerAmount', type: 'number' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' }
    },
  ],
}
```

### Media Collection
```typescript
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'full', width: 1920, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
```

### Newsletter Subscribers Collection
```typescript
// src/collections/NewsletterSubscribers.ts
import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
```

### Site Settings (Global)
```typescript
// src/globals/SiteSettings.ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'The Antiques' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'text' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['instagram', 'facebook', 'twitter', 'whatsapp'] },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'footerText', type: 'richText' },
  ],
}
```

---

## 4. Pages & Features

### 4.1 Homepage
- Hero section with tagline and CTA
- Featured categories grid (4-6 categories)
- Featured products carousel/grid
- Newsletter signup section
- About/intro section

### 4.2 Category Listing (`/categories`)
- Grid of all categories with images
- Category count (number of items)

### 4.3 Category Detail (`/categories/[slug]`)
- Category header with description
- Product grid with filtering options
- Pagination or infinite scroll

### 4.4 Product Detail (`/products/[slug]`)
- Image gallery with zoom capability
- Product title, description, price
- Status indicator (available/pending/sold)
- "Make an Offer" button → opens offer form modal
- Related products section

### 4.5 Search (`/search?q=...`)
- Full-text search across products
- Filter by category
- Sort by date, price

### 4.6 Offer Form (Modal)
- Fields: Name, Email, Phone (optional), Offer Amount (optional), Message
- Pre-filled with product information
- Sends email notification to owner
- Stores in Payload CMS for management

### 4.7 About Page (`/about`)
- Story/history of The Antiques
- Owner/team introduction (optional)
- Values or mission statement
- Image gallery or lifestyle shots

### 4.8 Contact Page (`/contact`)
- Contact information (email, phone, address)
- Contact form (name, email, subject, message)
- Social media links
- Map embed (optional)
- Business hours (if applicable)

### 4.9 Admin Dashboard (Payload CMS)
- Manage products (CRUD)
- Manage categories (CRUD)
- View and manage offers/inquiries
- Newsletter subscriber list
- Site settings

---

## 5. Design System

### Design Reference: Primearredo-inspired (Dark Theme Adaptation)
Based on the Italian furniture outlet Primearredo, adapted for a dark antique theme.

### Theme: Minimal/Modern Dark Mode

#### Colors
```css
/* Base */
--background: #09090b        /* Near black (zinc-950) */
--foreground: #fafafa        /* Off white */

/* Cards */
--card: #18181b              /* Zinc-900 */
--card-hover: #27272a        /* Zinc-800 */

/* Accent - Warm amber for antiques feel */
--accent: #d97706            /* Amber-600 */
--accent-light: #fbbf24      /* Amber-400 */

/* Text hierarchy */
--text-primary: #fafafa      /* White */
--text-secondary: #a1a1aa    /* Zinc-400 */
--text-muted: #71717a        /* Zinc-500 */

/* Borders & Dividers */
--border: #27272a            /* Zinc-800 */
--border-light: #3f3f46      /* Zinc-700 */

/* Status colors */
--status-available: #22c55e  /* Green */
--status-pending: #f59e0b    /* Amber */
--status-sold: #ef4444       /* Red */
```

#### Typography
- **Headings:** Inter or Outfit, medium/semibold weight
- **Body:** Inter, regular weight
- **Display text on images:** Larger, bolder for impact
- **Sizes:** Following Tailwind's type scale

### Key Design Patterns (from Primearredo reference)

#### 1. Header
- Logo on left
- Search bar in center (expandable on mobile)
- Navigation icons on right (wishlist, account)
- Mega menu on hover with:
  - Left: Main categories list
  - Center: Subcategories for selected category
  - Right: Featured products preview (3 items with images)

#### 2. Homepage Layout
- **Hero Section:** Full-width lifestyle image with overlay text and CTA
- **Section Titles:** Centered, with subtle description text below
- **Featured Categories:** Horizontal scroll of category cards with images
- **Featured Products:** Grid or horizontal scroll with product cards
- **Lifestyle Grids:** Mixed-size image cards with text overlays (like "I tuoi attimi di Relax")
- **Newsletter:** Clean signup section

#### 3. Category Page Layout
- Breadcrumb navigation
- Category title with expandable description
- **Subcategory Pills:** Horizontal scroll of subcategory images with labels
- **Filter Bar:** Dropdown filters (Category, Price, Material, etc.)
- **Product Grid:** 4 columns on desktop, 2 on mobile
- Load more button (not pagination)

#### 4. Product Cards (NOT typical shadcn style)
```
┌─────────────────────┐
│  [Status Badge]  ♡  │  ← Top right: status + wishlist
│                     │
│      [IMAGE]        │
│                     │
├─────────────────────┤
│  Brand/Maker        │  ← Smaller, muted text
│  Product Title      │  ← Bold, primary text
│  €1,200.00          │  ← Price, accent color optional
└─────────────────────┘
```

#### 5. Unique Elements (NOT generic shadcn)
- Image cards with gradient overlays and text
- Horizontal scrollable sections (no arrows, natural scroll)
- Subcategory chips with small circular/square images
- Status badges on product images (Available, Pending, Sold)
- Clean filter dropdowns with counts
- Large lifestyle imagery throughout
- Subtle hover animations (scale, shadow)

#### Components Style
- **Cards:** Clean with subtle hover lift effect, no heavy borders
- **Buttons:** Minimal, often just text with underline or subtle background
- **Transitions:** Smooth 200-300ms ease transitions
- **Spacing:** Generous whitespace (dark space in our case)
- **Images:** High quality, consistent aspect ratios per section
- **Rounded corners:** Subtle (8px) or none for editorial feel

---

## 6. User Flows

### Browse & Discover
```
Homepage → Browse Categories → Select Category → View Products → Product Detail
```

### Make an Offer
```
Product Detail → Click "Make an Offer" → Fill Form → Submit → Confirmation
```

### Search
```
Header Search → Enter Query → View Results → Product Detail
```

### Newsletter
```
Homepage/Footer → Enter Email → Submit → Confirmation
```

---

## 7. Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js 15 project with TypeScript
2. Set up Payload CMS with MongoDB
3. Configure Tailwind CSS + shadcn/ui
4. Create base layout (Header, Footer, Theme)
5. Set up Payload collections (Products, Categories)

### Phase 2: Core Features
1. Homepage with hero and featured sections
2. Categories listing and detail pages
3. Products listing with pagination
4. Product detail page with image gallery
5. Basic navigation and routing

### Phase 3: Interactive Features
1. Offer form modal with email notifications
2. Search functionality
3. Newsletter signup with storage
4. Offers collection in Payload

### Phase 4: Polish & Optimization
1. Image optimization and lazy loading
2. SEO meta tags and sitemap
3. Loading states and error handling
4. Performance optimization
5. Mobile responsiveness refinement

---

## 8. Success Metrics

- Fast page loads (< 2s LCP)
- Mobile-first responsive design
- Easy product management via Payload CMS
- Reliable offer submission and notification
- Clean, professional aesthetic

---

## 9. Files to Create

### Core Setup
- `package.json` - Dependencies
- `next.config.ts` - Next.js configuration
- `payload.config.ts` - Payload CMS configuration
- `tailwind.config.ts` - Tailwind configuration
- `src/app/layout.tsx` - Root layout with theme

### Payload Collections
- `src/collections/Products.ts`
- `src/collections/Categories.ts`
- `src/collections/Offers.ts`
- `src/collections/NewsletterSubscribers.ts`
- `src/globals/SiteSettings.ts`

### Pages
- `src/app/(frontend)/page.tsx` - Homepage
- `src/app/(frontend)/categories/page.tsx`
- `src/app/(frontend)/categories/[slug]/page.tsx`
- `src/app/(frontend)/products/[slug]/page.tsx`
- `src/app/(frontend)/search/page.tsx`

### Components
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/products/ProductCard.tsx`
- `src/components/products/ProductGrid.tsx`
- `src/components/products/ImageGallery.tsx`
- `src/components/forms/OfferForm.tsx`
- `src/components/forms/NewsletterForm.tsx`

---

## 10. Requirements Summary

| Requirement | Decision |
|-------------|----------|
| Styling approach | shadcn/ui + Tailwind CSS |
| Contact method | Offer form with optional price |
| Product fields | Basic (title, desc, images, category, price) |
| Extra features | Search, Featured items, Newsletter, Image gallery |
| Notifications | Email + Payload CMS dashboard |
| Database | MongoDB |
| Design style | Minimal/Modern dark theme |
