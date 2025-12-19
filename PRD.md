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
| Database | MongoDB |
| Styling | Tailwind CSS + shadcn/ui |
| Fonts | Inter (sans-serif) for modern minimal look |
| Deployment | TBD (Vercel-ready) |

### Project Structure
```
theantiques/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (frontend)/         # Public-facing pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── categories/     # Category pages
│   │   │   ├── products/       # Product detail pages
│   │   │   └── search/         # Search results
│   │   └── (payload)/          # Payload admin routes
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── products/           # Product cards, grids, gallery
│   │   └── forms/              # Offer form, newsletter
│   ├── collections/            # Payload CMS collections
│   ├── lib/                    # Utilities, API helpers
│   └── styles/                 # Global styles
├── public/                     # Static assets
└── payload.config.ts           # Payload configuration
```

---

## 3. Data Models (Payload Collections)

### Products
```typescript
{
  title: string              // Product name
  slug: string               // URL-friendly identifier (auto-generated)
  description: richText      // Product description
  images: array<upload>      // Multiple product images
  category: relationship     // Link to Category
  price: number              // Asking price or estimate
  priceLabel: string         // e.g., "Starting at", "Estimate", "Make offer"
  featured: boolean          // Show on homepage
  status: enum               // 'available' | 'pending' | 'sold'
  createdAt: date
  updatedAt: date
}
```

### Categories
```typescript
{
  name: string               // Category name
  slug: string               // URL-friendly identifier
  description: text          // Category description
  image: upload              // Category thumbnail
  featured: boolean          // Show on homepage
}
```

### Offers (Inquiries)
```typescript
{
  product: relationship      // Link to Product
  name: string               // Customer name
  email: string              // Customer email
  phone: string              // Optional phone number
  offerAmount: number        // Optional offer price
  message: text              // Customer message
  status: enum               // 'new' | 'contacted' | 'closed'
  createdAt: date
}
```

### Newsletter Subscribers
```typescript
{
  email: string              // Subscriber email
  subscribedAt: date
  active: boolean
}
```

### Site Settings (Global)
```typescript
{
  siteName: string
  logo: upload
  contactEmail: string
  socialLinks: array
  footerText: richText
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

### 4.7 Admin Dashboard (Payload CMS)
- Manage products (CRUD)
- Manage categories (CRUD)
- View and manage offers/inquiries
- Newsletter subscriber list
- Site settings

---

## 5. Design System

### Theme: Minimal/Modern Dark Mode

#### Colors
```css
--background: #0a0a0a        /* Near black */
--foreground: #fafafa        /* Off white */
--card: #141414              /* Slightly lighter black */
--card-foreground: #fafafa
--primary: #fafafa           /* White for primary actions */
--primary-foreground: #0a0a0a
--secondary: #262626         /* Dark gray */
--muted: #262626
--muted-foreground: #a1a1a1  /* Gray text */
--accent: #262626
--border: #262626
--ring: #d4d4d4
```

#### Typography
- **Headings:** Inter, medium/semibold weight
- **Body:** Inter, regular weight
- **Sizes:** Following Tailwind's type scale

#### Components Style
- Clean, borderless cards with subtle shadows
- Smooth hover transitions
- Minimal use of borders (prefer spacing and shadows)
- Rounded corners (subtle, 8-12px)

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
