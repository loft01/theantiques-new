# Next Session Prompt

Copy and paste this to start the next session:

---

Continue development of The Antiques website.

IMPORTANT: Start by reading these files for context:
- claude.md (development rules)
- todo.md (progress tracker)
- PRD.md (full requirements)

## Current Issue to Fix First

The Payload admin panel at /admin shows this error:
```
Cannot destructure property 'config' of 'ue(...)' as it is undefined.
```

Last attempted fix: Updated next.config.ts to explicitly pass configPath to withPayload. Need to:
1. Delete the .next folder to clear cache
2. Restart dev server
3. Test /admin again

If still broken, may need to check @payloadcms/next version compatibility or reinstall dependencies.

## Session 1 Completed

- Full project setup with Next.js 15 + Payload CMS 3.0
- All Payload collections created (Users, Media, Categories, Products, Offers, NewsletterSubscribers)
- SiteSettings global created
- Tailwind configured with dark theme colors
- shadcn/ui initialized
- Base layout with Header and Footer components
- Basic homepage with placeholder sections
- Planning documents (PRD.md, claude.md, todo.md)

## Current State

- Dependencies installed
- MongoDB Atlas configured (.env.local has credentials)
- Frontend at localhost:3000 works
- Admin panel at localhost:3000/admin has config error

## After Fixing Admin Panel, Next Priorities

1. Verify admin panel works and create first admin user
2. Create ProductCard component (custom design, not default shadcn)
3. Create CategoryCard component
4. Build MegaMenu for header navigation
5. Connect homepage to fetch real data from Payload CMS

## Tech Stack

Next.js 15, Payload CMS 3.0, MongoDB Atlas, Tailwind CSS, shadcn/ui

## Design Reference

Site should look like Primearredo (see reference/ folder) but with dark theme. Amber accents (#d97706). NOT default shadcn look.

---

# Commit Message

```
Added shadcn/ui, attempted Payload admin fix with explicit configPath
```
