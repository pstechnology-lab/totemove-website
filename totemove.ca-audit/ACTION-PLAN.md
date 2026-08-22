# ToteMove SEO Action Plan
**Audit Date:** 2026-07-26 | **Overall Health Score: 51/100**

---

## Phase 1 — Critical Fixes (This Week, Before You Accept Any Bookings)

These directly block rankings or have legal implications.

| # | Action | Effort | Expected Impact |
|---|---|---|---|
| **1** | **Disable Cloudflare AI Scrape Shield** (Dashboard → Security → Bots → AI Scrape Shield → Off) | 5 min | ChatGPT, Claude AI, Google AI Overviews can now crawl and cite your site |
| **2** | **Fix title tag** — remove "Moving Bin" (= garbage in CA), use "Moving Tote & Plastic Box Rentals" | 10 min | Correct keyword lane vs. dumpster rental competitors |
| **3** | **Add Blog link to main nav and footer** of index.html and all city pages | 30 min | Blog earns internal PageRank, Google discovers via nav not just sitemap |
| **4** | **Create /privacy-policy page** — PIPEDA compliance for form data collection | 2 hrs | Legal requirement; trust signal |
| **5** | **Differentiate the two comparison blog posts** — pivot Post 2 to durability angle, add cross-links between them | 2 hrs | Stops cannibalization, both posts can now rank independently |

---

## Phase 2 — High Impact (Week 1–2)

| # | Action | Effort | Expected Impact |
|---|---|---|---|
| **6** | **Convert images to WebP/AVIF** — outside-totes.png (1.1 MB), garage.png (1.7 MB), totemove-logo.png (931 KB) | 2 hrs | LCP: 3.5–5.5s → 1.2–2.2s (fail → pass); Lighthouse +30 pts |
| **7** | **Add preload hint for hero image** in `<head>` of all pages with the hero | 15 min | Free 100–300ms LCP improvement |
| **8** | **Fix halton-hills.html + hillsburgh.html** — add to nav Locations section on all pages, fix active-city class | 1 hr | Pages no longer orphaned; "8 towns" copy updated |
| **9** | **Add Blog link to main site nav** (already in Phase 1 — confirm done) | — | — |
| **10** | **Add Google Review link to all 10 city page footers** | 30 min | Review velocity improvement sitewide |
| **11** | **Create /about page** — founder full name, bio, why ToteMove exists | 2 hrs | E-E-A-T authoritativeness, enables author.url in schema |
| **12** | **Add `image` to Article schema on both blog posts** (unblocks rich results) | 15 min | Google Discover + article rich results eligibility |
| **13** | **Remove FAQPage schema from homepage** (retired by Google May 7 2026; ghost question present) | 10 min | Removes invalid schema signal |
| **14** | **Fix homepage H1** — add service + location keywords | 10 min | Local SEO signal improvement |
| **15** | **GBP category decision** — revert to "Moving Supply Store" as primary + "Equipment Rental Agency" secondary | 5 min | Compete in correct niche, not vs. full-service movers |

---

## Phase 3 — Content & Schema (Weeks 2–4)

| # | Action | Effort | Expected Impact |
|---|---|---|---|
| **16** | **Expand blog Post 1** to 1,500+ words (add packing tips, eco angle, 14-day window, Q&A) | 3 hrs | Competitive content depth |
| **17** | **Expand blog Post 2** to 1,500+ words (durability deep-dive, item-by-item guide, scenario) | 3 hrs | Competitive content depth |
| **18** | **Move Google Fonts from CSS @import to HTML `<link>`** in all HTML files | 1 hr | Eliminates render-blocking chain, LCP improvement |
| **19** | **Add `author full name`** to Article schema and blog bylines | 15 min | Knowledge graph entity building |
| **20** | **Change Article @type to BlogPosting** on both blog posts | 5 min | Correct semantic type |
| **21** | **Add BreadcrumbList schema** to both blog posts | 30 min | SERP breadcrumb display |
| **22** | **Add WebSite schema** to homepage | 10 min | Named entity + sitelinks |
| **23** | **Fix LocalBusiness @type** to `["LocalBusiness","HomeAndConstructionBusiness"]` on all pages | 30 min | Industry vertical signal |
| **24** | **Add geo coordinates** to LocalBusiness schema on all pages | 30 min | Primary geographic pin for SAB proximity |
| **25** | **Fix /blog canonical** trailing slash (→ `https://totemove.ca/blog/`) | 5 min | Resolves 307 redirect ambiguity |
| **26** | **Add visible business hours** to all page footers | 20 min | Local trust signal |
| **27** | **Add blog index card** for plastic-bins post in blog/index.html | 20 min | Correct blog index |
| **28** | **Create /llms.txt** in repo root | 30 min | LLM crawler entity declaration (Perplexity, Claude) |
| **29** | **Update sitemap lastmod dates** to 2026-07-26 on 12 of 14 entries; remove `<priority>` and `<changefreq>` | 20 min | Accurate recrawl signaling |
| **30** | **Expand FAQ answers** for AI citability (target 130–160 words for top 3 questions) | 1 hr | Google AI Overview citation potential |

---

## Phase 4 — Local Authority (Month 2)

| # | Action | Effort | Expected Impact |
|---|---|---|---|
| **31** | **Build citations:** Yelp CA, Yellow Pages CA, 411.ca, HomeStars, BBB Canada, Brampton Board of Trade | 3 hrs | Local pack ranking; AI visibility citations |
| **32** | **Implement IndexNow** (Bing fast indexing) | 1 hr | New content indexed by Bing within hours, not weeks |
| **33** | **Add unique content to Brampton + Mississauga city pages** first (150–250 new words each, local FAQ) | 2 hrs each | De-duplicate, improve ranking of highest-value pages |
| **34** | **Publish Blog Post 1:** "How Many Moving Bins Do I Need?" | 4 hrs | Highest conversion ROI, fills bins-count query |
| **35** | **Publish Blog Post 2:** "Moving Checklist for Brampton, ON 2026" | 5 hrs | Highest traffic potential, Brampton-local |
| **36** | **Add "Moving Resources" section to all city pages** linking to blog posts | 1 hr | Internal linking loop, engagement boost |
| **37** | **Set HSTS max-age to 12 months in Cloudflare dashboard** | 5 min | Meets preload list threshold |
| **38** | **Set `lang="en-CA"` on all pages** | 20 min | Locale signal for Canadian content |
| **39** | **Fix LocalBusiness logo to ImageObject** on all pages | 30 min | Schema completeness |
| **40** | **Add `@id` to LocalBusiness** and `sameAs` (GBP listing URL) | 15 min | Entity graph connection |

---

## Phase 5 — Ongoing

| # | Action | Cadence |
|---|---|---|
| **41** | Publish new blog post | Every 2–3 weeks (5 posts planned; see content calendar in FULL-AUDIT-REPORT.md) |
| **42** | Request Google review from every customer | 48 hours after tote pickup via direct link |
| **43** | Target 1 new review per 14 days (within 18-day velocity rule) | Ongoing |
| **44** | Add unique content to remaining 8 city pages | 1 page per week |
| **45** | Capture SEO drift baseline | After Phase 2 complete |
| **46** | Seek first local press mention (Brampton Guardian, Orangeville Banner) | Month 3–4 |
| **47** | Add `aggregateRating` schema once 5+ genuine reviews exist | When ready |
| **48** | Write pillar page: "Complete Moving Guide for Brampton and the GTA" | After 5 blog spokes are live |

---

## Quick Reference: What to Do First in 30 Minutes

1. Cloudflare Dashboard → Security → Bots → AI Scrape Shield → **Off** (5 min)
2. Change GBP primary category → **Moving Supply Store** (5 min)
3. Edit homepage `<title>` tag: replace "Moving Bin" with "Moving Tote & Plastic Box" (5 min)
4. Add `<a href="/blog">Blog</a>` to the `<nav>` in `index.html` (5 min)
5. Add "Blog" to footer of `index.html` (5 min)
6. Done. You've addressed 3 of the 5 Critical issues.

---

## What a 75/100 Looks Like

To get from 51 → 75, complete Phases 1–3 (items 1–30). That's roughly 25–30 hours of work spread over 4 weeks. The jump will be most visible in:
- AI search visibility (from ~10% to ~80% — blocked crawlers → allowed)
- LCP (fail → pass, ~2× faster on mobile)
- Organic click-through (correct keyword lane, better title tags)
- Local pack proximity (geo coordinates + correct GBP category)
