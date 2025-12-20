# Claude Rules for The Antiques Project

## Project Overview
Building "The Antiques" - a showcase/catalog website for vintage items using Next.js 15 + Payload CMS 3.0 + MongoDB + Tailwind CSS.

---

## Critical Rules

### 1. Session Start Protocol
**ALWAYS read `todo.md` before doing anything else in a new chat session.**
This ensures you understand:
- What has been completed
- What is currently in progress
- What needs to be done next

### 2. Progress Tracking
**ALWAYS update `todo.md` as you work:**
- Mark tasks as `[x]` when completed
- Add notes under completed tasks if relevant
- Never leave a session without updating progress
- If a task is partially done, add a sub-item noting what remains

### 3. Code Style
**Write simple, elegant, effective code:**
- NO verbose or over-engineered solutions
- NO excessive comments (code should be self-documenting)
- NO unnecessary abstractions
- Prefer readability over cleverness
- Keep components focused and single-purpose
- Use TypeScript properly but don't over-type

### 4. Design Consistency
**Follow the established design system:**
- Reference: Primearredo-inspired, dark theme
- Colors: Zinc-based dark palette with amber accents
- Typography: Inter/Outfit, clean hierarchy
- Components: Custom styling, NOT default shadcn look
- See `PRD.md` Section 5 for full design specs

### 5. Git Rules
**NEVER run git commands automatically.**
- Do not run `git add`, `git commit`, `git push`, or any git commands
- Wait for explicit user instruction

### 6. End of Session Protocol
When user asks for commit message and next chat prompt, provide:

**Commit Message Format:**
```
Simple one-line message, no special characters except commas, describing what was done
```

**Next Chat Prompt Format:**
```
Continue development of The Antiques website.

Last session completed: [brief summary]

Current state: [what's working]

Next priority: [what to work on next]

Start by reading todo.md for full context.
```

---

## Tech Stack Reference

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.0 |
| Database | MongoDB |
| Styling | Tailwind CSS + shadcn/ui (customized) |
| Language | TypeScript |

### Key Commands
```bash
# Dev server
pnpm dev

# Payload admin
http://localhost:3000/admin
```

### Project Structure
```
src/
├── app/(frontend)/     # Public pages
├── app/(payload)/      # Payload admin
├── collections/        # Payload collections
├── components/         # React components
├── lib/               # Utilities
└── payload.config.ts  # Payload config
```

---

## Design Quick Reference

### Colors (CSS Variables)
```css
--background: #09090b    /* zinc-950 */
--card: #18181b          /* zinc-900 */
--accent: #d97706        /* amber-600 */
--text-primary: #fafafa
--text-secondary: #a1a1aa
--border: #27272a
```

### Key Design Patterns
- Mega menu with category preview
- Horizontal scrollable sections
- Product cards with status badges
- Image cards with gradient overlays
- Generous dark space (whitespace equivalent)

---

## File References
- `PRD.md` - Full product requirements
- `todo.md` - Development progress tracker
- `reference/` - Design reference images
