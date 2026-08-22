# ToteMove SEO Audit — totemove.ca
**Audit Date:** 2026-07-26  
**Business:** ToteMove — Moving tote/bin/box rentals, Brampton ON (Service Area Business)  
**Stack:** Static HTML, Cloudflare Pages  
**Stage:** Pre-launch

---

## Overall SEO Health Score: 51 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality (E-E-A-T) | 23% | 41 | 9.4 |
| On-Page SEO | 20% | 50 | 10.0 |
| Schema / Structured Data | 10% | 58 | 5.8 |
| Performance (Core Web Vitals) | 10% | 40 | 4.0 |
| AI Search Readiness (GEO) | 10% | 39 | 3.9 |
| Images | 5% | 25 | 1.3 |
| **TOTAL** | | | **50.7 → 51** |

**Local SEO score (supplemental):** 48 / 100  
**SXO gap score:** 45 / 100  
**GEO readiness:** 39 / 100

The infrastructure is solid — Cloudflare edge, clean HTML, HTTPS enforced, valid schema syntax, no crawl blockers for Googlebot. Score is held back by three structural gaps: a keyword strategy misalignment ("bin" = garbage in Canadian English), blocked AI crawlers, and thin/duplicate content that will not survive a competitive SERP.

---

## 🚨 CRITICAL Issues (Fix Before Launch)

### C1 — "Moving bin" = garbage / dumpster in Canadian English
**Impact: Keyword strategy, title tag, all on-page copy**

Every SERP for "moving bin rental Brampton" and "moving bin rental GTA" returns **waste/dumpster disposal companies** — GTA Bins, Gorilla Bins, Maple Waste — not moving supply services. ToteMove cannot rank for that query in the moving-supply context without competing in the wrong lane entirely.

The title tag currently reads: *"Moving Bin & Tote Rentals in Brampton | ToteMove — From $119"*

**Fix:** Change title to "Moving Tote & Plastic Box Rentals in Brampton | ToteMove — From $119" or similar. Keep "bin" in body copy and FAQ (where context clarifies meaning) but remove it from the title tag and H1. Update the meta description accordingly.

---

### C2 — Cloudflare AI Scrape Shield is blocking ChatGPT, Claude AI, and Google AI Overviews
**Impact: Zero AI search visibility for 3 of the 5 major AI platforms**

Cloudflare's managed robots.txt injection is blocking:
- GPTBot (ChatGPT indexing)
- ClaudeBot (Claude AI / Anthropic)
- Google-Extended (Google AI Overviews / Gemini)
- CCBot (Common Crawl)

Bingbot (Copilot) and PerplexityBot are unaffected. The repository robots.txt is clean — this is injected by Cloudflare silently.

**Fix:** Cloudflare Dashboard → Security → Bots → AI Scrape Shield → **Off**. Then add explicit Allow rules to your robots.txt for GPTBot, OAI-SearchBot, ClaudeBot, and Google-Extended.

---

### C3 — No privacy policy (PIPEDA compliance violation)
**Impact: Legal, E-E-A-T trust**

The booking form collects name, phone, email, move date, and address. Under Canada's PIPEDA, this requires a publicly accessible privacy policy. This is a legal requirement, not just an SEO recommendation. Absence also hurts E-E-A-T trustworthiness signals.

**Fix:** Create `/privacy-policy` page. Minimum content: what data is collected, why, how it's stored, how long, and how to request deletion. Link it in the footer.

---

### C4 — Blog is not linked from the main site
**Impact: Blog earns zero internal PageRank**

The blog index and both blog posts exist at valid URLs and are in the sitemap. However, no page on the main site — not the nav, not the footer, not any body section — contains a link to `/blog`. Google will crawl it via sitemap, but none of the link authority built on the homepage flows to the blog.

**Fix:** Add "Blog" or "Moving Tips" link to the main site navigation (desktop + mobile) and to the footer.

---

### C5 — Both blog posts are cannibalizing each other
**Impact: Google suppresses both instead of ranking either**

- `/blog/moving-totes-vs-cardboard-boxes` — cost angle ($235 vs $189)
- `/blog/plastic-bins-vs-cardboard-boxes-moving` — general comparison (durability, eco, FAQ)

Both target "plastic bins vs cardboard boxes," "moving totes vs boxes," and the full comparison intent. They share no cross-links. Google picks one to rank and suppresses the other.

**Fix (Option A — 2 hours):** Pivot Post 2's H1 to a durability angle: "Why Plastic Moving Bins Hold Up Better Than Cardboard on Moving Day." Remove all pricing from Post 2. Add a cross-link at the top of each post to the other. This is the fastest resolution.

**Fix (Option B — best long-term):** After the site has traffic, merge Post 2 into Post 1 at the Post 1 URL. 301 redirect Post 2.

---

## 🔴 HIGH Issues (Fix Within 2 Weeks)

### H1 — Hero image is 1.1 MB PNG — primary LCP cause
Estimated mobile LCP: **3.5–5.5 seconds** (threshold: ≤2.5s → FAIL)

`outside-totes.png` is the LCP element (above fold, loading="eager"). At 1.1 MB on a 4G mobile connection, it alone adds ~880 ms after TTFB. No WebP or AVIF version exists. No `srcset`. No `<link rel="preload">` hint.

**Fix in order:**
1. Convert `outside-totes.png` to WebP (target ≤250 KB) and AVIF (≤150 KB)
2. Serve via `<picture>` element with AVIF → WebP → PNG fallback
3. Add `<link rel="preload" as="image" href="outside-totes.webp">` in `<head>`
4. Also convert `garage.png` (1.7 MB) and `totemove-logo.png` (931 KB)
5. Replace logo PNG with SVG (< 5 KB)

Projected improvement: mobile LCP drops to ~1.2–2.2s (Good).

---

### H2 — halton-hills.html and hillsburgh.html are fully orphaned
Both pages are in the sitemap, return 200, but receive **zero internal links** from any page on the site. The Locations section on every page lists only 8 cities — Halton Hills and Hillsburgh are absent. Additionally both pages have wrong active-city markers (halton-hills.html marks Georgetown as active; hillsburgh.html marks Erin as active).

**Fix:** Add both cities to the Locations section and footer on all pages. Fix the `active` class on each page. Update "8 towns, one corridor" heading to match actual count.

---

### H3 — Blog posts are too short for competitive ranking
- Post 1 (`moving-totes-vs-cardboard-boxes`): ~560 words (minimum 1,500)
- Post 2 (`plastic-bins-vs-cardboard-boxes-moving`): ~970 words (minimum 1,500)

Competitors (Frogbox, EasyBoxed, The Mover's Choice) have blog content at 1,200–2,500 words covering the same topics. Both posts have strong bones — cost table, verdict box, comparison table — but are surface-level in coverage.

**Fix for Post 1 additions:** packing technique with totes, environmental disposal cost of cardboard, what 14-day rental window means practically, FAQ of 3–4 questions.

**Fix for Post 2 additions:** moving-day timeline comparison, item-by-item packing guide (which items pack better in totes), a 3-bedroom Brampton scenario walkthrough.

---

### H4 — No About page
No About page exists. E-E-A-T authoritativeness for a new business depends heavily on founder credibility. "Steven, Founder" as an Article author provides almost nothing without a surname, bio, or destination URL. A knowledge graph cannot build an entity from a first name alone.

**Fix:** Create `/about` page. Minimum: founder full name, 1–2 paragraphs on background and why ToteMove was founded, location reference. Update Article schema `author.name` to full name and `author.url` to `/about`.

---

### H5 — Homepage H1 is a tagline, not a keyword heading
Current H1: *"Rent totes. Move smarter."*

This is brand copy, not a keyword-targeted heading. For local SEO, the H1 carries significant weight. It contains no service keyword and no location.

**Suggestion:** "Moving Tote & Plastic Box Rentals — Delivered to Brampton & Area" or similar that includes the primary service and region.

---

### H6 — Article schema missing `image` — blocks rich result eligibility
Google requires `image` (as `ImageObject`) on Article schema for Top Stories and article-type SERP features. Both blog posts are ineligible for rich results until this is added.

**Fix for both blog posts:**
```json
"image": {
  "@type": "ImageObject",
  "url": "https://totemove.ca/outside-totes.png",
  "width": 600,
  "height": 520
}
```

---

### H7 — FAQPage schema retired by Google on May 7, 2026
All three FAQPage blocks (homepage + both blog posts) now produce **zero SERP rich result**. The homepage FAQPage also has a ghost question ("Do you deliver everywhere in the area?") in the schema that has no matching `<details>` element in the HTML, which would disqualify it anyway. Two questions in the HTML are absent from the schema.

**Fix:** Remove FAQPage schema from homepage (it has the ghost question issue). The blog post FAQPage blocks are internally consistent — keep them for potential AI crawler value but do not expect SERP features from them.

---

### H8 — Homepage vs /brampton keyword cannibalization
Homepage title: "Moving Bin & Tote Rentals **in Brampton** | ToteMove — From $119"  
/brampton title: "ToteMove | Moving Tote Rentals **in Brampton**, ON — Delivered to Your Door"

Both pages directly compete for "moving tote rentals Brampton." Google will rank one and suppress the other, splitting authority.

**Fix (Option A):** Change homepage title to a regional framing: "Moving Tote & Plastic Box Rentals — Brampton, Peel Region & Halton Hills | ToteMove"  
**Fix (Option B):** Consolidate /brampton content back into homepage and 301 redirect.

---

### H9 — Google Review link absent from all 10 city page footers
The homepage footer includes the review link. None of the 10 city pages carry it. Review velocity is a top-3 local ranking factor, and city page visitors should be able to leave reviews as easily as homepage visitors.

**Fix:** Add `<a href="https://g.page/r/CciR1pUMHVUHEBM/review">Leave us a Google review</a>` to the footer of all 10 city pages.

---

### H10 — No citations built
Current citations: GBP only. Every other directory is likely a 404 for ToteMove.

**Priority citations to build (in order):**
1. Yelp Canada — `/biz/totemove-brampton`
2. Yellow Pages Canada — `yellowpages.ca`
3. 411.ca — auto-populates Canpages and other aggregators
4. HomeStars — dominant home services platform in Ontario
5. BBB Canada — free unaccredited profile, strong trust signal
6. Brampton Board of Trade — local authority backlink

NAP for all citations: **ToteMove | Brampton, ON (SAB) | (416) 845-0290 | totemove.ca**

---

## 🟡 MEDIUM Issues (Fix Within 30 Days)

### M1 — GBP primary category debate
The current category "Moving and Storage Service" places ToteMove in competition with full-service moving companies (Atlas, Allied, Cargo Cabbie). SXO and Local SEO analysis both recommend **"Moving Supply Store"** as primary with **"Equipment Rental Agency"** as secondary. "Moving Supply Store" is a nearly uncontested niche; "Moving and Storage Service" is a hyper-competitive one.

**Decision required:** This is a judgment call with real consequences. The previous advice to change to "Moving and Storage Service" was based on concerns that "Moving Supply Store" implies retail. The counter-argument is: winning in the right lane beats losing in the wrong lane. Recommend reverting to **Moving Supply Store** as primary.

---

### M2 — Google Fonts @import is render-blocking
`style.css` line 1 is `@import url("https://fonts.googleapis.com/css2?...")`. This creates a two-hop blocking chain: HTML → style.css → @import → fonts CSS → 10 font WOFF2 files. The preconnect hints help DNS but do not collapse the chain.

**Fix:** Remove the `@import` from `style.css`. Add `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` directly to `<head>` of every HTML file, above the stylesheet link but below the preconnect hints.

---

### M3 — No IndexNow implementation
IndexNow notifies Bing (and DuckDuckGo, Naver) of new/updated URLs within minutes. Key file returns 404.

**Fix:** Generate key at bing.com/indexnow, deploy `{key}.txt` to repo root, POST updated URLs to `https://api.indexnow.org/indexnow` on each new publish.

---

### M4 — No llms.txt
Returns 404. Adds an entity declaration and sitemap context for LLM crawlers (Perplexity, Claude, etc.).

**Fix:** Create `/llms.txt` in repo root with business description, URL list, and contact info. See findings/geo.md for the exact template.

---

### M5 — City pages are 95% duplicate content
10 city pages share the same How It Works, all 6 package cards, stat block, testimonial, and 5 FAQ entries word-for-word. Only H1 and one hero paragraph differ. Google's doorway page guidance targets this exact pattern.

**Minimum differentiation per page (prioritise Brampton, Mississauga, Caledon first):**
- 150–250 words of genuinely local content in a new body section
- 1–2 city-specific FAQ entries
- A booking heading that names the city
- A "You might also be interested in" section linking to nearby city pages and 1–2 blog posts

---

### M6 — Article schema type should be BlogPosting
Both blog posts use `@type: "Article"`. The correct subtype for editorial blog content is `BlogPosting`. This is a minor signal but requires a 2-second change.

---

### M7 — Missing BreadcrumbList schema on blog posts
BreadcrumbList produces breadcrumb display in SERP snippets (Home > Blog > Post Title). Both blog posts are missing it. See findings/schema.md for ready-to-use JSON-LD blocks.

---

### M8 — Missing WebSite schema on homepage
Establishes the named entity in Google's knowledge graph. Low-effort, meaningful for sitelinks.

**Fix for index.html:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToteMove",
  "url": "https://totemove.ca"
}
```

---

### M9 — HSTS max-age live is 180 days, not 365 (Cloudflare override)
`_headers` specifies 365 days. Live header shows 180 days. Cloudflare's HSTS dashboard setting overrides the file. The live header includes the `preload` directive, but 180 days fails the hstspreload.org requirement of 365 days minimum.

**Fix:** Cloudflare SSL/TLS → Edge Certificates → HSTS → set Max Age to 12 months.

---

### M10 — Business hours not visible on any page
Schema states Mon–Sun 08:00–20:00. No page shows hours in visible text. Customers and local ranking signals both benefit from visible hours.

**Fix:** Add to footer of all pages: "Hours: Mon – Sun, 8 AM – 8 PM"

---

### M11 — Blog index missing card for the third blog post
`blog/index.html` was created before `plastic-bins-vs-cardboard-boxes-moving.html` was confirmed to exist. The index shows only one post card.

**Fix:** Add a second post card to `blog/index.html` for the plastic-bins post.

---

### M12 — /blog canonical has trailing slash mismatch
`blog/index.html` declares `canonical: https://totemove.ca/blog`. Cloudflare Pages serves the file with a 307 at `https://totemove.ca/blog/` (trailing slash). The canonical points to a URL that redirects.

**Fix:** Change blog/index.html canonical to `https://totemove.ca/blog/`.

---

### M13 — LocalBusiness schema @type is generic
All 11 pages use `"@type": "LocalBusiness"`. The correct industry subtype is `["LocalBusiness", "HomeAndConstructionBusiness"]`.

---

### M14 — Missing geo coordinates in LocalBusiness schema
For a SAB with no visible street address, geo coordinates are the primary geographic pin Google uses for proximity calculations. None of the 11 pages include latitude/longitude.

**Fix:** Add precise coordinates for the Mayfield & Hurontario area to all LocalBusiness blocks:
```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 43.73456,
  "longitude": -79.76543
}
```
Verify coordinates in Google Maps before deploying.

---

### M15 — FAQ answers too short for AI citation (GEO)
Current FAQ answers: 20–55 words each. Optimal AI citability window: 134–167 words. At current length, FAQ answers are unlikely to be cited in Google AI Overviews or ChatGPT responses.

**Priority FAQ expansions:**
1. "What is a moving tote/bin rental and how does it work?" — new 130-word definitional entry
2. "Are plastic moving bins better than cardboard boxes?" — expand with weight rating, waterproofing, specific cost data

---

## 🔵 LOW / INFO Issues

| Issue | Fix |
|---|---|
| Sitemap lastmod dates stale by 40–67 days | Update 12 of 14 entries to 2026-07-26 |
| `<html lang="en">` should be `lang="en-CA"` | Update all 13 HTML files |
| Deprecated `<priority>` and `<changefreq>` in sitemap | Remove (Google has ignored since 2019) |
| LocalBusiness logo is plain URL string, not ImageObject | Wrap with `{"@type":"ImageObject","url":"...","width":160,"height":44}` |
| LocalBusiness missing `@id` field | Add `"@id": "https://totemove.ca/#business"` |
| LocalBusiness missing `sameAs` | Add GBP listing URL (not the review-write URL) after finding it in GBP dashboard |
| `serviceArea` GeoCircle absent | Add `{"@type":"GeoCircle","geoMidpoint":{"@type":"GeoCoordinates","latitude":43.73,"longitude":-79.77},"geoRadius":"60000"}` |
| Google Fonts blocking Google Fonts with CSP | Add `fonts.googleapis.com` to `style-src` and `fonts.gstatic.com` to `font-src` in _headers |
| 307 redirects on .html stripping (Cloudflare default) | Not fixable; monitor GSC for verification issues |
| Author schema uses first name only | Add surname to `author.name` in both Article blocks |
| "400+ reuses" stat has no source attribution | Add "(per manufacturer specification)" or link to source |
| cache rules in _headers missing for image files | Add Cache-Control: public, max-age=31536000 for outside-totes, garage, totemove-logo |

---

## Content Strategy: Next 5 Blog Posts

Based on SERP analysis and topic clustering. Publish in this order:

| # | Title | URL | Primary Keyword | Why First |
|---|---|---|---|---|
| 1 | How Many Moving Bins Do I Need? A Guide by Home Size | /blog/how-many-moving-bins-do-i-need | how many moving boxes do I need | Highest conversion ROI; ToteMove has first-party data (exact bin counts) |
| 2 | The Complete Moving Checklist for Brampton, ON (2026 Edition) | /blog/moving-checklist-brampton | moving checklist Brampton | High volume, local modifier kills national competition |
| 3 | How to Pack for a Move: Room by Room for GTA Renters | /blog/how-to-pack-for-a-move | how to pack for a move | Informational, feeds into bins-count post |
| 4 | Moving to Brampton: A Complete Neighbourhood Guide for 2026 | /blog/moving-to-brampton-neighbourhood-guide | moving to Brampton | Builds local authority, links naturally to all city pages |
| 5 | Eco-Friendly Moving: Why Renting Plastic Bins Beats Buying Cardboard | /blog/eco-friendly-moving-plastic-bins | eco-friendly moving | Completes comparison cluster, differentiates from cardboard movers |

Long-term: publish a 3,000–4,000 word pillar page "The Complete Moving Guide for Brampton and the GTA" once all 5 spokes are live.

---

## Competitor Landscape

Ranking competitors identified through SERP analysis:
- **Frogbox** — strongest competitor, city pages at 800–1,000 words, established domain
- **EasyBoxed** — Ontario-focused tote rental, similar model
- **The Mover's Choice** — plastic bins since 1988, established authority
- **Dumpster/bin rentals** (GTA Bins, Gorilla Bins) — wrong-lane competitors triggered by "moving bin" terminology

ToteMove differentiator: hyper-local to the Brampton/Peel/Halton corridor vs. GTA-wide competitors.

---

## Findings Files

| Specialist | File | Score |
|---|---|---|
| Technical SEO | findings/technical.md | 74/100 |
| Content / E-E-A-T | findings/content.md | 41/100 |
| Schema | findings/schema.md | ~58/100 |
| Local SEO | findings/local.md | 48/100 |
| GEO / AI Search | findings/geo.md | 39/100 |
| Performance | findings/performance.md | ~40/100 |
| Sitemap | findings/sitemap.md | ~80/100 |
| Backlinks | findings/backlinks.md | (pending) |
| SXO | findings/sxo.md | 45/100 |
| Content Cluster | findings/cluster.md | — |
