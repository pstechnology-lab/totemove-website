# Technical SEO Audit — totemove.ca
**Date:** 2026-07-26
**Auditor:** Claude Technical SEO (claude-sonnet-4-6)
**Site:** https://totemove.ca
**Platform:** Static HTML / Cloudflare Pages
**Business type:** Service Area Business — Moving bin/tote rental, Brampton ON

---

## Summary Score: 74 / 100

| Category | Score | Status |
|---|---|---|
| Crawlability | 88/100 | Pass with notes |
| Indexability | 72/100 | Fail — canonical/redirect mismatch + orphan pages |
| Security | 85/100 | Pass with notes — HSTS preload threshold not met live |
| URL Structure | 72/100 | Fail — 307 temp redirects, blog trailing-slash gap |
| Mobile | 92/100 | Pass |
| Core Web Vitals (source signals) | 78/100 | Pass with notes |
| Structured Data | 82/100 | Pass with notes |
| JavaScript Rendering | 97/100 | Pass — static SSR |
| IndexNow Protocol | 0/100 | Not implemented |

---

## Verified Live Facts

| Check | Expected | Live Result | Pass? |
|---|---|---|---|
| HTTP → HTTPS | 301 redirect | 301 Permanent | Yes |
| www → non-www | 301 redirect | 301 Permanent | Yes |
| robots.txt accessible | 200 | 200 | Yes |
| Sitemap declared in robots.txt | Yes | https://totemove.ca/sitemap.xml | Yes |
| Sitemap valid | Yes | Valid urlset, 14 URLs | Yes |
| All page images return 200 | Yes | logo.png, outside-totes.png, garage.png all 200 | Yes |
| `/blog` redirect | 301 ideally | 307 Temporary → /blog/ | Warning |
| `/brampton.html` extension strip | — | 307 Temporary → /brampton | Info |
| IndexNow key file | — | 404 — not implemented | Fail |

---

## Issues by Severity

---

### HIGH — Orphan Pages: `/halton-hills` and `/hillsburgh`

**Severity:** High
**Affected files:** `halton-hills.html`, `hillsburgh.html`
**Affected URLs:** https://totemove.ca/halton-hills, https://totemove.ca/hillsburgh

Both pages exist, are in the sitemap, and return 200. However, neither is linked from any navigable page on the site:

- The homepage city buttons list 8 cities (Brampton, Caledon, Georgetown, Acton, Bolton, Erin, Orangeville, Mississauga). Halton Hills and Hillsburgh are absent.
- The homepage footer Locations column lists the same 8 cities.
- Every city page carries an identical 8-city navigation block — again, no Halton Hills or Hillsburgh.
- No other page on the site links to either URL via an `<a href>`.

The only path a crawler has to discover these pages is through the sitemap. Googlebot will index sitemap-only URLs, but they carry lower PageRank and may be ranked below pages with genuine inbound internal links.

Additionally, the `active` class on the location buttons is wrong on both orphan pages:
- `halton-hills.html` — Georgetown is marked active (should have no active class or a Halton Hills button)
- `hillsburgh.html` — Erin is marked active (Hillsburgh is distinct from Erin village)

**Fix:** Add Halton Hills and Hillsburgh to the Locations section on every page (homepage and all city pages). The section currently says "8 towns, one corridor" — update to "10 towns" or restructure as a proper nav grid. Also fix the `active` class on each page.

---

### HIGH — Blog Not Linked from Main Site

**Severity:** High
**Affected:** Homepage, all city pages
**Affected content:** https://totemove.ca/blog and both blog posts

The blog (`/blog`) and its two posts (`/blog/moving-totes-vs-cardboard-boxes`, `/blog/plastic-bins-vs-cardboard-boxes-moving`) are not linked from any element on the main site:

- No blog link in the main site navigation
- No blog link in the homepage or city page footers
- The blog pages link back to the main site but the main site does not link forward to the blog

Blog posts about "moving totes vs cardboard boxes" and "plastic bins vs cardboard boxes" are exactly the informational content that can attract top-of-funnel organic traffic and pass link equity back to the service pages. If they are not reachable from the main site, that equity loop is broken.

**Fix:** Add a "Blog" or "Moving Tips" link to the main site navigation and footer. A link from the homepage body (e.g., "Read our moving guides →") near the FAQ section would also help.

---

### HIGH — `/blog` Canonical Mismatch with Served URL

**Severity:** High
**Affected file:** `blog/index.html`
**Canonical declared:** `https://totemove.ca/blog`
**URL actually served (after redirect):** `https://totemove.ca/blog/`

Cloudflare Pages serves `blog/index.html` at `/blog/` and issues a **307 Temporary Redirect** from `/blog` → `/blog/`. The canonical tag in the rendered page at `/blog/` declares `https://totemove.ca/blog` (no trailing slash) — which does not match the effective URL.

This is a canonical-redirect disagreement. When Googlebot fetches the canonical URL `/blog`, it receives a 307 to `/blog/`, then finds a canonical pointing back to `/blog`. While Google can resolve this, it creates unnecessary confusion and may delay or depress indexing signals.

The 307 (Temporary) redirect type also signals to crawlers that the redirect may change — 301 (Permanent) is preferred for stable redirects.

**Root cause:** Cloudflare Pages "Pretty URLs" behavior adds trailing slashes to directory-style URLs. The canonical should be updated to match the served URL.

**Fix options:**
1. Update the canonical in `blog/index.html` to `https://totemove.ca/blog/` (match the served URL).
2. Alternatively, add `[[redirects]]` in `_redirects` to force `/blog/` → `/blog` (301) and keep the canonical as `/blog`. But this fights Cloudflare Pages' default behavior and may cause a redirect loop.

Recommended: Option 1 — change the canonical to `/blog/` so the declared canonical matches the served URL.

---

### MEDIUM — HSTS `max-age` Discrepancy: preload threshold not met live

**Severity:** Medium
**`_headers` file value:** `max-age=31536000; includeSubDomains; preload` (365 days)
**Live response value:** `max-age=15552000; includeSubDomains; preload` (180 days)

The live `Strict-Transport-Security` header is serving 180 days (15,552,000 seconds), not the 365 days (31,536,000 seconds) specified in `_headers`. Cloudflare's SSL/TLS dashboard HSTS setting (likely set to 6 months) appears to be overriding the `_headers` file.

**Why this matters:** HSTS preloading via hstspreload.org requires `max-age >= 31536000`. The live header includes `preload` but fails the minimum max-age threshold. If this domain has already been submitted to the preload list using the 365-day value, the mismatch could cause preload list removal checks to fail.

**Fix:** In the Cloudflare SSL/TLS dashboard → Edge Certificates → HSTS, set Max Age to "12 months (recommended)" (31536000 seconds). This will bring the live header in line with `_headers` and satisfy HSTS preload requirements.

---

### MEDIUM — Google Fonts Loaded via CSS `@import` (render-blocking risk)

**Severity:** Medium
**File:** `style.css` line 1

```css
@import url("https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap");
```

CSS `@import` statements are render-blocking: the browser cannot proceed rendering until it downloads `style.css`, parses the `@import`, then downloads the Google Fonts CSS, then downloads the actual font files. This chain can add 300–800ms to LCP on mobile connections, especially for three font families at multiple weights.

The HTML `<head>` includes `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com`, which helps reduce TCP setup time, but these hints fire before `style.css` parses the `@import`, so the timing benefit is partial.

**Fix:** Remove the `@import` from `style.css`. In `index.html` (and all other pages), replace it with direct stylesheet links in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" />
```

This converts the font load from a two-step render-blocking chain to a single parallel fetch that begins as soon as the browser parses `<head>`. The `display=swap` parameter is already in the URL, so invisible text during font load is not an issue.

Note: The site's hero CTA and H1 are rendered in Antonio (a display font). Antonio is the likely LCP text candidate on mobile — loading it as early as possible is high priority.

---

### MEDIUM — No IndexNow Implementation

**Severity:** Medium
**Status:** Not implemented (key file returns 404)

IndexNow is a push-based URL notification protocol supported by Bing, Yandex, and Naver. For a new site like ToteMove, rapid indexing on Bing is valuable since Bing also powers DuckDuckGo and is used in Apple Maps / Siri search suggestions — both relevant for a local service business.

**Fix:** 
1. Generate an IndexNow API key at https://www.bing.com/indexnow/getstarted
2. Deploy the key file as `{key}.txt` at `https://totemove.ca/{key}.txt`
3. On each content update, POST to `https://api.indexnow.org/indexnow` with the updated URLs

For a static site on Cloudflare Pages, this can be automated with a Cloudflare Worker or Pages Function triggered on deploy.

---

### LOW — Sitemap URL Count Differs from Known Facts

**Severity:** Low / Info
**Stated in brief:** 13 URLs
**Actual sitemap:** 14 URLs

The sitemap now contains 14 URLs, not 13. The second blog post (`/blog/plastic-bins-vs-cardboard-boxes-moving`, `lastmod: 2026-06-18`) was added after the brief was written. The sitemap is correct — this note is only to confirm the actual state.

Sitemap URLs:
1. `https://totemove.ca/` (priority 1.0)
2-11. 10 city pages at priority 0.8 (brampton, mississauga, caledon, georgetown, halton-hills, acton, hillsburgh, erin, orangeville, bolton)
12. `https://totemove.ca/blog` (priority 0.7)
13. `https://totemove.ca/blog/moving-totes-vs-cardboard-boxes` (priority 0.7)
14. `https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving` (priority 0.7)

---

### LOW — HTML `.html` Extension Redirects are 307 Temporary, not 301 Permanent

**Severity:** Low
**Examples:**
- `https://totemove.ca/brampton.html` → 307 → `/brampton`
- `https://totemove.ca/google8f81e81c15b8c92a.html` → 307 → `/google8f81e81c15b8c92a`

Cloudflare Pages' Pretty URLs feature strips `.html` extensions via 307 Temporary Redirect. While these URLs are unlikely to appear in external links, 307 signals to crawlers that the redirect is temporary and may change. 301 is preferred for permanent URL canonicalization.

This cannot be controlled directly in `_redirects` for individual pages when Pretty URLs is enabled globally. If consistent 301s are needed, consider disabling Cloudflare Pages' Pretty URLs and managing all `.html` → clean URL redirects explicitly in `_redirects`.

**Impact on Google Search Console verification:** The `google8f81e81c15b8c92a.html` file redirects (307) to `/google8f81e81c15b8c92a`. GSC HTML file verification follows redirects, so verification should work. Monitor GSC to confirm the property remains verified.

---

### LOW — Robots.txt: Cloudflare-Managed AI Crawler Blocks

**Severity:** Low / Info
**Status:** Working as intended — documented for awareness

The live robots.txt contains a Cloudflare-managed section (between `# BEGIN` and `# END Cloudflare Managed Content` markers) that blocks these agents:

- `Amazonbot` (Amazon Alexa/indexing)
- `Applebot-Extended` (Apple AI training)
- `Bytespider` (TikTok/ByteDance crawler)
- `CCBot` (Common Crawl, used for LLM training)
- `ClaudeBot` (Anthropic — content training)
- `CloudflareBrowserRenderingCrawler`
- `Google-Extended` (Google Bard/Gemini training data)
- `GPTBot` (OpenAI)
- `meta-externalagent` (Meta AI training)

The universal `User-agent: *` block allows standard search crawlers (Googlebot, Bingbot, etc.). The Content-Signal declaration (`search=yes, ai-train=no, use=reference`) is a Cloudflare-specific extension to robots.txt — it is not part of the RFC 9309 standard and is ignored by crawlers that do not implement it.

**No action required.** This is an appropriate configuration for a business that wants search indexing but opts out of AI training data collection.

---

### LOW — Hreflang Not Implemented

**Severity:** Low
**Decision:** Not needed at this time

The site serves a single language (English) for a Canadian audience. There is no French version. Hreflang tags (`<link rel="alternate" hreflang="en-CA">`) are only required when the same page is served in multiple languages or when targeting multiple regional variants (e.g., `en-CA` vs `en-US`).

**Recommendation:** If a French version (`fr-CA`) is added in future (relevant for Brampton/Mississauga markets that have French-speaking residents), implement hreflang at that point. For now, a standalone `hreflang="en-CA"` self-referencing tag would have no practical indexing effect.

---

### LOW — Blog: No rel=prev/next (Not Needed Yet)

**Severity:** Low / Info

The blog currently has 2 posts, both listed on a single index page. Pagination tags (`rel="prev"`, `rel="next"`) are not needed. Implement if and when the blog index page requires pagination.

---

### INFO — `<html lang="en">` vs `lang="en-CA"`

**Severity:** Info

All pages declare `<html lang="en">`. The more specific `lang="en-CA"` would be more precise for a business operating exclusively in Canada and may marginally improve screen-reader locale handling. This has no direct Google ranking effect.

**Fix:** Change `lang="en"` to `lang="en-CA"` on all HTML pages.

---

### INFO — OG Image is Logo on Blog Posts

**Severity:** Info

Both blog posts declare `og:image` pointing to `https://totemove.ca/logo.png`. Social shares of blog articles will display the company logo rather than a representative article image. Rich social previews typically drive higher click rates on platforms like Facebook and LinkedIn.

**Recommendation:** Create a simple 1200×630px Open Graph image for each blog article (even a minimal branded card with the article title) and update `og:image` accordingly.

---

### INFO — Article Structured Data: Missing `image` Property

**Severity:** Info

Both blog post `Article` JSON-LD blocks do not include an `image` property. Google's Article rich result documentation recommends (and in some contexts requires) an `image` property representing the article's primary image. Without it, the article may not qualify for Google Discover cards.

**Fix:** Add an `"image"` field to each `Article` block once proper OG images are created (see note above).

---

## Crawlability

**Score: 88/100 — Pass**

| Check | Status |
|---|---|
| robots.txt returns 200 | Pass |
| Sitemap declared in robots.txt | Pass |
| Sitemap returns 200 and is valid XML | Pass |
| `User-agent: *` allows all standard crawlers | Pass |
| No pages set to `noindex` | Pass |
| No canonical chains (canonical → redirect → page) | Pass (except /blog — see High issue) |
| Google verification file accessible (via redirect) | Pass with caveat (307 redirect) |

Robots.txt note: the Cloudflare-managed section places a second `User-agent: *` / `Allow: /` block after the individual bot blocks. This is redundant but harmless — standard crawlers read the first matching block.

---

## Indexability

**Score: 72/100 — Fail**

| Check | Status |
|---|---|
| Canonical tags present on all pages | Pass |
| Canonical tags self-referencing | Pass |
| Canonical URL matches served URL — homepage | Pass (`https://totemove.ca/`) |
| Canonical URL matches served URL — city pages | Pass |
| Canonical URL matches served URL — blog index | FAIL (`/blog` canonical but `/blog/` served) |
| Canonical URL matches served URL — blog posts | Pass |
| Internal links to all sitemap URLs | FAIL (halton-hills, hillsburgh, blog not linked) |
| No thin/duplicate content | Pass |

---

## Security

**Score: 85/100 — Pass with notes**

All headers confirmed live on `https://totemove.ca/`:

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains; preload` | Warning — max-age < 31536000 (preload threshold) |
| `Content-Security-Policy` | Restrictive; allows self + CF analytics + Formspree | Pass |
| `X-Frame-Options` | `DENY` | Pass |
| `X-Content-Type-Options` | `nosniff` | Pass |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Pass |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=()` | Pass |
| HTTP → HTTPS redirect | 301 Permanent | Pass |
| www → non-www redirect | 301 Permanent | Pass |
| TLS (inferred from Cloudflare Full Strict) | TLS 1.2/1.3 | Pass |

The CSP `script-src` allows `https://static.cloudflareinsights.com` (Cloudflare Web Analytics beacon). The analytics token (`f04b742b38ae4cddaa2a935f19557f96`) is visible in HTML source — this is expected and by design for client-side analytics; no action needed.

---

## URL Structure

**Score: 72/100 — Fail**

| Check | Status |
|---|---|
| Clean URLs (no `.html` extension in canonical URLs) | Pass |
| No parameters in indexable URLs | Pass |
| No index.html accessible (redirects to `/`) | Pass (301 from `_redirects`) |
| HTTP → HTTPS | Pass (301) |
| www → non-www | Pass (301) |
| `/blog` trailing slash consistency | FAIL — 307 temp, canonical mismatch |
| `.html` extension redirects | 307 Temp (minor — should be 301 Permanent) |

---

## Mobile

**Score: 92/100 — Pass**

| Check | Status |
|---|---|
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Pass — all pages |
| No `user-scalable=no` restriction | Pass |
| Mobile nav present (hamburger menu) | Pass |
| Touch targets — CTA buttons use padding-based sizing | Pass |
| Font sizes — body uses `clamp()` and rem units | Pass |
| No Flash / plugin content | Pass |
| Images have explicit `width` and `height` attributes | Pass (prevents CLS) |

---

## Core Web Vitals (Source Signals)

**Score: 78/100 — Pass with notes**

This is a source-code assessment, not a field data measurement. Lab data should be verified with PageSpeed Insights.

| Signal | Assessment |
|---|---|
| LCP candidate | Hero H1 text (Antonio font) or hero image — font loading chain is a risk |
| LCP risk | Google Fonts via CSS `@import` delays text paint (see Medium issue above) |
| CLS risk | Images have explicit `width`/`height` — low CLS risk. Fonts use `font-display: swap` (via Google Fonts URL param) — minimal CLS from FOUT |
| INP risk | Minimal JavaScript (mobile nav, smooth scroll, form validation). No heavy frameworks. Low INP risk |
| Render blocking | `style.css` is render-blocking (normal). Google Fonts `@import` adds a second blocking chain |
| Image optimization | Hero image (`outside-totes.png`) uses `loading="eager"` — correct for LCP. Below-fold images use `loading="lazy"` — correct |
| Cache policy | CSS/JS/images: `max-age=31536000, immutable` (1 year). HTML: `max-age=0, must-revalidate`. Correct |

---

## Structured Data

**Score: 82/100 — Pass with notes**

| Page | Schema Types | Valid | Notes |
|---|---|---|---|
| Homepage (`/`) | LocalBusiness, FAQPage | Yes (2 blocks, 4534 bytes total) | areaServed lists 8 cities — missing Halton Hills, Hillsburgh |
| City pages | LocalBusiness | Yes (all city pages verified) | addressLocality is Brampton on all pages including halton-hills, hillsburgh |
| Blog posts | Article, FAQPage (plastic-bins post only) | Yes | Missing `image` property |

**LocalBusiness `areaServed` inconsistency:** The homepage `LocalBusiness` schema lists 8 cities in `areaServed` but Halton Hills and Hillsburgh are excluded. Update to include all 10 served areas.

**`addressLocality` on city pages:** All city pages, including `/halton-hills` and `/hillsburgh`, declare `"addressLocality": "Brampton"` in the `PostalAddress`. This is technically the business's base address (correct per Service Area Business guidelines), but reviewers and tools may flag it as inconsistent with the page's declared city. Consider using `"addressLocality": "Brampton"` consistently for the business address and relying on `areaServed` to communicate coverage.

---

## JavaScript Rendering

**Score: 97/100 — Pass**

The site is static HTML (SSR). The render_page tool confirmed `is_spa: false`. JavaScript (`main.js`) handles only:
- Mobile hamburger menu toggle
- Smooth scroll
- City button active state toggle
- Booking form validation and Formspree submission

All content — including title, description, H1, body text, structured data, and internal links — is present in the raw HTML response. No rendering dependency for indexable content. Googlebot will index all content without JavaScript execution.

---

## IndexNow Protocol

**Score: 0/100 — Not Implemented**

No IndexNow key file found at common paths (`/indexnow.txt`, `/bing.xml`). See Medium issue above for implementation steps. Given this is a new, growing site, rapid Bing indexing of new blog posts and city pages is a meaningful competitive advantage.

---

## Prioritized Action List

| Priority | Issue | Effort | Impact |
|---|---|---|---|
| 1 | Add `/halton-hills` and `/hillsburgh` to all page navigation and footer | Low (edit HTML in all pages) | High — completes internal link graph |
| 2 | Add blog link to main site nav and footer | Low (edit HTML in all pages) | High — makes blog crawlable from main site |
| 3 | Fix `/blog` canonical to `https://totemove.ca/blog/` | Trivial (1 line in blog/index.html) | High — resolves canonical/redirect mismatch |
| 4 | Fix HSTS max-age in Cloudflare dashboard to 12 months | Low (Cloudflare dashboard setting) | Medium — meets HSTS preload threshold |
| 5 | Move Google Fonts from CSS `@import` to HTML `<link rel="stylesheet">` | Low (edit all HTML files, style.css) | Medium — improves LCP on all pages |
| 6 | Fix active `city-btn` class on halton-hills.html (Georgetown → none or Halton Hills) | Trivial | Low — UX/accuracy fix |
| 7 | Fix active `city-btn` class on hillsburgh.html (Erin → none or Hillsburgh) | Trivial | Low — UX/accuracy fix |
| 8 | Implement IndexNow | Low-Medium (key file + deploy hook) | Medium — faster Bing/Yandex indexing |
| 9 | Add `image` property to Article schema on blog posts | Low | Low — enables Google Discover eligibility |
| 10 | Change `<html lang="en">` to `lang="en-CA"` site-wide | Trivial | Negligible ranking effect, correct practice |
| 11 | Add OG images for blog posts | Medium (design + code) | Low-Medium — improves social sharing |
| 12 | Update `areaServed` in homepage LocalBusiness schema to include Halton Hills and Hillsburgh | Trivial | Low — schema completeness |
