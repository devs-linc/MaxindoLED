# Maxindo LED — Website Handoff

A brand-new, production-ready, bilingual (Indonesian + English) marketing site built to fix every issue from the SEO audit (old site graded F). Built with **Astro 6 + Tailwind v4 + Preact**, output is static HTML for peak performance, deployed to **Vercel**.

**Status:** ✅ Builds clean — **77 pages** (38 ID + 38 EN), `astro check` 0 errors, unit tests pass. Design verified in-browser ("Cinematic Dark").

---

## Run it locally

```bash
cd maxindoled-site
npm install
npm run dev       # http://localhost:4321  (→ /id/)
npm run build     # static output to dist/
npm run preview   # serve the built site
npm test          # vitest (i18n + calculator logic)
```

## What's built

- **Pages (each in `/id/…` and `/en/…`):** Home, Services (overview + 8 service pages), Equipment catalog (3 categories + indexable per-item pages with **Product schema & IDR pricing**), Event Types (6), Rental Calculator (interactive, sends an itemized quote to WhatsApp), Portfolio gallery (lightbox), Articles/Blog (3), About, Contact.
- **SEO baked in:** unique titles/meta, canonical, **hreflang id/en + x-default**, Open Graph/Twitter, JSON-LD (**LocalBusiness, Organization, Product, Breadcrumb, FAQPage, Article**), auto `sitemap-index.xml`, `robots.txt`, correct `<html lang>` per locale, one H1/page, descriptive image ALT.
- **Performance:** static HTML, near-zero JS (Preact islands only for nav/calculator/gallery), Astro image pipeline → AVIF/WebP responsive, system font stack (no web-font download).
- **Conversion:** WhatsApp CTAs throughout + floating button + calculator → WhatsApp handoff.
- **`vercel.json`:** 301 redirects from old PHP URLs (`/product.php`, `/kalkulator.php`, etc.) to the new equivalents.

## Deploy to Vercel

1. Create a GitHub repo and push this folder:
   ```bash
   git remote add origin https://github.com/<you>/maxindoled-site.git
   git push -u origin master
   ```
2. In Vercel → **Add New Project** → import the repo. Framework preset auto-detects **Astro**; build `npm run build`, output `dist`. Deploy.
3. Add the domain **maxindoled.com** in Vercel → Project → Settings → Domains, and point DNS (A/CNAME) as Vercel instructs.

## ⛳ Before go-live — fill in real data (search for `TODO`)

| Where | What to set |
|---|---|
| `src/consts.ts` | Real **WhatsApp number** (`whatsapp`), `phoneDisplay`, exact map **geo** lat/lng, branded email |
| `src/pages/[lang]/contact.astro` | **Formspree form ID** (replace `your-id`) — or wire your preferred form handler |
| `src/content/**` (Keystatic later) | Replace **placeholder.png** with real equipment/event/article photos; refine copy & prices |
| `public/og-default.jpg`, `public/favicon.svg` | Real brand OG image + logo/favicon |
| `src/pages/[lang]/portfolio/index.astro` | Real event photos for the gallery |

## After launch (your Google accounts)

- **Google Search Console:** verify the domain, submit `https://maxindoled.com/sitemap-index.xml`.
- **Google Analytics 4:** add the GA4 tag (drop the snippet into `src/layouts/Base.astro` `<head>`).
- **Google Business Profile:** create/claim for the Tangerang address — pairs with the LocalBusiness schema for Maps / "near me".

## Optional next phase

- **Keystatic CMS** (already installed) for non-technical editing of equipment & articles — needs the Vercel adapter + a server-rendered `/keystatic` admin route. Until then, content is editable as Markdown in `src/content/`.
- Add more equipment items, event types, and articles (just add Markdown files — pages generate automatically).

---
Built 2026-06-08. Reference spec: `../docs/superpowers/specs/2026-06-08-maxindoled-redesign-design.md`; plan: `../docs/superpowers/plans/2026-06-08-maxindoled-redesign.md`.
