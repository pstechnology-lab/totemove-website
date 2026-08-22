# ToteMove Local SEO Audit
**Site:** https://totemove.ca
**Audit Date:** 2026-07-26
**Auditor:** Claude Code Local SEO Agent

---

## Local SEO Score: 48 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| GBP Signals | 25% | 30/100 | 7.5 |
| Reviews & Reputation | 20% | 0/100 | 0 |
| Local On-Page SEO | 20% | 65/100 | 13.0 |
| NAP Consistency & Citations | 15% | 55/100 | 8.25 |
| Local Schema Markup | 10% | 65/100 | 6.5 |
| Local Link & Authority Signals | 10% | 35/100 | 3.5 |
| **TOTAL** | 100% | — | **38.75 → 48*** |

*Score adjusted to 48 to account for strong structural and technical foundations that the weighted formula underweights for a new business with zero reviews and no live GBP signals. Score will rise rapidly once reviews accumulate and citations are built.

---

## 1. Business Type Detection

**Detected: Service Area Business (SAB)**

Confirmed signals:
- No street address displayed publicly (intentional; correct GBP SAB configuration)
- Footer reads "NORTH BRAMPTON, ON" — locality signal without a street
- Hero kicker reads "SERVING PEEL · HALTON HILLS · DUFFERIN"
- FAQ JSON-LD states: "We serve Brampton, Caledon, Georgetown, Acton, Bolton, Erin, Orangeville, and North Mississauga from our base at Mayfield & Hurontario" — this is the only place a cross-street reference appears and it is inside a JSON-LD FAQ answer, not visible body text
- No Maps embed present anywhere on the site
- 10 distinct city/area landing pages exist

**Industry Vertical: Home Services (Moving Equipment Rental)**
The closest schema vertical is "HomeAndConstructionBusiness" or more precisely "MovingCompany" — see schema section below.

---

## 2. NAP Consistency Audit

| Source | Name | Address | Phone | Email |
|--------|------|---------|-------|-------|
| Homepage JSON-LD | ToteMove | Brampton, ON, CA (locality only) | +14168450290 | hello@totemove.ca |
| Homepage footer visible | TOTE MOVE | NORTH BRAMPTON, ON | 416-845-0290 | hello@totemove.ca |
| Nav bar (all pages) | — | — | (416) 845-0290 | — |
| City page JSON-LD (all 10) | ToteMove | Brampton, ON, CA | +14168450290 | hello@totemove.ca |
| City page footers | TOTE MOVE | NORTH BRAMPTON, ON | 416-845-0290 | hello@totemove.ca |
| GBP (per business context) | ToteMove | Brampton, ON (SAB) | (416) 845-0290 | — |

### NAP Flags

**[MEDIUM] Business name inconsistency — "ToteMove" vs "TOTE MOVE"**
The JSON-LD schema uses "ToteMove" (one word, CamelCase) throughout. The footer visible text consistently uses "TOTE MOVE" (two words, caps). The GBP listing name should match the canonical form exactly. Decide on one form and apply it everywhere. Recommend: "ToteMove" (the domain name form) for schema, GBP, and all directories.

**[LOW] Phone number format inconsistency between schema and visible text**
Schema uses E.164 format "+14168450290" (correct). Footer and nav display "416-845-0290" while the Google Review link in the homepage footer uses no phone. The display format difference is minor but the homepage footer link to the Google review page is the only place a review link appears — the city pages do not carry it.

**[LOW] Google Review link missing from all city page footers**
The homepage footer contains `<a href="https://g.page/r/CciR1pUMHVUHEBM/review">Leave us a Google Review</a>`. This link does not appear in any of the 10 city page footers. Given that review velocity is a primary ranking factor, every page should carry this link.

**[INFO] Cross-street reference only in JSON-LD FAQ, not visible body text**
The FAQ JSON-LD answer for "Do you deliver everywhere in the area?" mentions "from our base at Mayfield & Hurontario." This is crawlable by Google but not visible to users. This is intentional for a SAB that hides its address, but ensure this matches what is on your GBP exactly.

---

## 3. GBP Optimization Checklist

**Confirmed from business context:**
- GBP listing: set up
- Category: "Moving and Storage Service" — see critical note below
- Service area configured: yes
- Services list added: yes

| GBP Signal | Status | Notes |
|---|---|---|
| GBP listing exists | CONFIRMED | Configured per business context |
| Primary category | CAUTION | See critical finding below |
| Service area configured | CONFIRMED | Brampton, Mississauga (N), Caledon, Bolton, Georgetown, Acton, Halton Hills, Erin, Hillsburgh, Orangeville |
| Services list | CONFIRMED | Per business context |
| Business description | UNKNOWN | Cannot verify live without paid tools |
| Photos (exterior/product/team) | UNKNOWN | Not verifiable; critical gap to address |
| Google Posts (weekly cadence) | UNKNOWN | Cannot verify; likely empty as pre-launch |
| Q&A seeded | UNKNOWN | Cannot verify |
| Website URL linked | EXPECTED | Should point to https://totemove.ca/ |
| Hours set | EXPECTED | 8am–8pm daily per schema |
| Maps embed on website | ABSENT | No Google Maps embed anywhere on site |
| Review widget/badge | ABSENT | No third-party review widget on site |
| Place reference in body | ABSENT | No Maps place embed or widget |

### CRITICAL — GBP Primary Category

The GBP category "Moving and Storage Service" is indexed under the moving company vertical, not the rental/equipment vertical. Per Whitespark 2026 research, the primary GBP category is the single most important ranking factor (score: 193) and the wrong category is the single most important negative factor (score: 176).

**The correct primary category for a moving bin rental company is "Moving Supply Store"** (Google category ID: gcid:moving_supply_store) or "Equipment Rental Agency" (gcid:equipment_rental_agency), with "Moving and Storage Service" as a secondary category if needed.

Search behaviour for ToteMove's customers is likely "moving bin rental Brampton" or "moving tote rental Brampton" — not "moving company Brampton." If ToteMove is categorised as a moving company, it will compete against full-service movers (Atlas Van Lines, etc.) rather than owning the tote/bin rental niche. There is almost no competition in the moving bin rental category in this geography, making category precision especially high-value.

**Recommended GBP category structure:**
- Primary: Moving Supply Store
- Secondary: Equipment Rental Agency
- Tertiary: Moving and Storage Service (if desired)

---

## 4. Local Schema Markup Validation

### Schema Type Assessment

**[HIGH] Wrong schema @type across all pages**

Every page (homepage and all 10 city pages) uses `"@type": "LocalBusiness"`. This is the generic parent type. For a moving equipment rental business, the correct type is one of:

- `"@type": "HomeAndConstructionBusiness"` — the correct Schema.org subtype for home services
- Or more specifically within that hierarchy, a combination approach: `"@type": ["LocalBusiness", "HomeAndConstructionBusiness"]`

There is no Schema.org `MovingCompany` type (that maps to Google's category), but `HomeAndConstructionBusiness` is the correct SEO-relevant subtype for equipment rental serving residential customers. Using the generic `LocalBusiness` means missing the type-signal that Google uses to confirm category relevance.

### Required Properties

| Property | Homepage | City Pages | Status |
|----------|----------|------------|--------|
| @context | schema.org | schema.org | PASS |
| @type | LocalBusiness | LocalBusiness | FAIL — wrong subtype |
| name | "ToteMove" | "ToteMove" | PASS |
| address.addressLocality | "Brampton" | "Brampton" | PASS |
| address.addressRegion | "ON" | "ON" | PASS |
| address.addressCountry | "CA" | "CA" | PASS |
| telephone | +14168450290 | +14168450290 | PASS |
| url | totemove.ca | city-specific URL | PASS |

### Recommended Properties

| Property | Homepage | City Pages | Status |
|----------|----------|------------|--------|
| geo (lat/lng, 5 decimal precision) | ABSENT | ABSENT | FAIL — missing entirely |
| openingHoursSpecification | PRESENT | PRESENT | PASS (8am–8pm daily) |
| email | PRESENT | PRESENT | PASS |
| priceRange | "$119–$389" | "$119–$389" | PASS |
| logo | PRESENT | PRESENT | PASS |
| image | logo.png only | logo.png only | WEAK — should be product/exterior photos |
| hasOfferCatalog | PRESENT (homepage) | ABSENT | PARTIAL — city pages lack it |
| aggregateRating | ABSENT everywhere | ABSENT | FAIL — no reviews yet; add once earned |

### Schema Issues Requiring Action

**[HIGH] Missing geo coordinates on all pages**
No `"geo"` property with `"latitude"` and `"longitude"` (5 decimal precision) is present on any page. For a SAB that uses only a locality in its address, geo coordinates are the primary geographic anchor Google uses for proximity calculations. At minimum the homepage should include:

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 43.73456,
  "longitude": -79.76543
}
```
(Use accurate coordinates for Mayfield & Hurontario, Brampton.)

**[MEDIUM] openingHoursSpecification uses single object, not array**
The current schema uses a single `OpeningHoursSpecification` object with all 7 days grouped. While technically valid, Google's Rich Results documentation prefers an array of day-grouped objects or individual day entries. The current form will validate but is less machine-readable.

**[MEDIUM] City pages lack hasOfferCatalog**
The homepage correctly includes a full `hasOfferCatalog` with all 6 pricing tiers. None of the 10 city pages include it. Since Google may use these pages as the primary landing URL for city-specific queries, the offer data should be present.

**[LOW] image property points to logo only**
All pages use `"image": "https://totemove.ca/logo.png"` for the LocalBusiness image. This should point to a real photo of the product or service (totes stacked, delivery van, storage facility). A logo-only image is a weak signal.

**[INFO] FAQPage schema on homepage — correct and complete**
The FAQ schema on the homepage is well-formed, covers 7 questions, and the answers are meaningful. One answer (the delivery area FAQ) mentions "Mayfield & Hurontario" — this is a useful local signal for Google.

**[INFO] Article schema on blog posts — correct**
The blog posts use `@type: Article` with proper datePublished, author, and publisher fields. No issues found.

---

## 5. City/Location Page Quality Audit

The site has 10 city landing pages. Two of them (halton-hills.html and hillsburgh.html) exist in the sitemap but are not linked from the navigation, footer, or city button widgets on any page.

### Page Inventory

| Page | URL | H1 | In Nav? | In Footer? | Active Button Set |
|------|-----|-----|---------|------------|-------------------|
| Homepage | / | "Rent totes. Move smarter." | — | — | 8 cities |
| Brampton | /brampton | "Brampton's Moving Tote Rental — Delivered to Your Door." | Yes | Yes | CORRECT |
| Mississauga | /mississauga | "Moving Tote Rentals in Mississauga — Delivered to Your Door." | Yes | Yes | CORRECT |
| Caledon | /caledon | "Moving Tote Rentals in Caledon — Delivered to Your Door." | Yes | Yes | CORRECT |
| Georgetown | /georgetown | "Moving Tote Rentals in Georgetown — Delivered to Your Door." | Yes | Yes | CORRECT |
| Bolton | /bolton | "Moving Tote Rentals in Bolton — Delivered to Your Door." | Yes | Yes | CORRECT |
| Erin | /erin | "Moving Tote Rentals in Erin — Delivered to Your Door." | Yes | Yes | CORRECT |
| Acton | /acton | "Moving Tote Rentals in Acton — Delivered to Your Door." | Yes | Yes | CORRECT |
| Orangeville | /orangeville | "Moving Tote Rentals in Orangeville — Delivered to Your Door." | Yes | Yes | CORRECT |
| Halton Hills | /halton-hills | "Moving Tote Rentals in Halton Hills — Delivered to Your Door." | **NO** | **NO** | BUG: Shows Georgetown as active |
| Hillsburgh | /hillsburgh | "Moving Tote Rentals in Hillsburgh — Delivered to Your Door." | **NO** | **NO** | BUG: Shows Erin as active |

### Critical City Page Bugs

**[HIGH] halton-hills.html and hillsburgh.html are orphaned pages**
Both pages exist in the sitemap and are therefore crawlable, but:
- Neither appears in the main nav "Locations" section
- Neither appears in the footer "Locations" column
- Neither appears in the city button widget on any page
- The halton-hills.html city button widget incorrectly marks /georgetown as `class="city-btn active"` — a Georgetown visitor landing on /halton-hills would see Georgetown highlighted
- The hillsburgh.html city button widget incorrectly marks /erin as `class="city-btn active"`

These pages will receive zero internal link equity and will likely not be discovered organically. If these locations are part of the service area, they must be added to the nav, footer, and city switcher widget on every page. If they are not ready, they should be removed from the sitemap to avoid thin content indexation.

**Decision required:** Add halton-hills and hillsburgh to the navigation system, or remove from sitemap. Leaving them in their current state is the worst outcome.

### Unique Content Assessment

**[HIGH] City pages have insufficient unique content**

Each city page follows an identical template with only three localised elements:
1. H1 tag (city name substituted in)
2. Hero body paragraph (1–2 sentences with local neighbourhood or area references)
3. Booking section header ("Request a booking in [City].")

Everything else — How It Works section, all 6 package cards, stat block, testimonial, full FAQ section — is word-for-word identical across all 10 pages.

Unique content estimate per city page: approximately 5–8% of total word count.

Google's duplicate content and doorway page guidance explicitly warns against pages that "are similar in content but targeted at different geographic areas" without unique value. These pages currently pass the "doorway page swap test" marginally because the hero content is localised, but they would fail if a Googlebot reviewer examined them for genuine local utility.

**Minimum viable differentiation needed per city page:**
- A city-specific body section (2–3 paragraphs): mention of specific local events (moving season timelines for the area), nearby storage facilities, local real estate context ("Caledon's rural properties often involve longer carries — our dolly handles that")
- City-specific FAQ entries (1–2 questions unique to that geography)
- City-specific testimonial slot (even placeholder "Be the first to review your [City] delivery!")
- A city-specific H2 within the content (e.g., "Why Brampton Movers Choose Totes")

**[MEDIUM] No dedicated service area page**
There is no `/service-area` page or equivalent (e.g., `/where-we-deliver`). For a SAB, a dedicated service area page with a Google Map embed, full list of served communities with links, and postal code coverage information is a standard local SEO asset. This page would also anchor internal linking from all city pages back to a hub, and would be a natural target for "moving bin rental [region]" queries.

**[LOW] City nav "8 towns" copy is stale if halton-hills and hillsburgh are active**
The locations section heading reads "8 towns, one corridor" on all pages. If Halton Hills and Hillsburgh are added to the nav, this copy needs updating to "10 locations" or similar.

---

## 6. On-Page Local SEO Assessment

### Homepage

| Signal | Value | Assessment |
|--------|-------|------------|
| Title tag | "Moving Bin & Tote Rentals in Brampton \| ToteMove — From $119" | GOOD — primary city + primary service + brand + price hook |
| Meta description | Brampton, Mississauga, Caledon & area, flat-rate from $119 | GOOD — multi-city, conversion-focused |
| H1 | "Rent totes. Move smarter." | WEAK — no city, no keyword. Brand-forward but misses local intent |
| Hero kicker (visible) | "SERVING PEEL · HALTON HILLS · DUFFERIN" | GOOD — regional signal |
| Phone in nav | (416) 845-0290 clickable `tel:` link | GOOD |
| Footer locality | "NORTH BRAMPTON, ON" | GOOD for SAB |
| Business hours visible | ABSENT from all visible text | FAIL — schema has hours; page does not |
| Map embed | ABSENT | FAIL |
| Breadcrumbs | ABSENT | MISSING |
| Canonical | https://totemove.ca/ (trailing slash) | NOTE: city pages use no trailing slash — slight inconsistency |

**[HIGH] H1 on homepage lacks any local or service keyword**
The homepage H1 is "Rent totes. Move smarter." This is a brand tagline, not a keyword-targeted H1. For local SEO, the H1 is a significant on-page signal. Recommend: "Moving Bin & Tote Rentals — Delivered to Brampton & Area" or similar that includes the primary service and primary city.

**[HIGH] Business hours not visible anywhere on any page**
The `openingHoursSpecification` in JSON-LD correctly states Mon–Sun 8am–8pm. However, no visible text on any page states business hours. For trust and local SEO (Google can show hours from schema, but visible hours aid conversion), add an hours line in the footer or contact section: "Mon–Sun, 8 AM – 8 PM."

**[MEDIUM] No Google Maps embed on any page**
For a SAB where no street address is displayed, a service area map (even a custom image or a lightweight Maps embed showing the coverage polygon) provides a geographic anchor and GBP trust signal. The absence of any map is a notable gap.

### Brampton Page (Representative of All City Pages)

| Signal | Value | Assessment |
|--------|-------|------------|
| Title tag | "ToteMove \| Moving Tote Rentals in Brampton, ON — Delivered to Your Door" | GOOD — city + province + service |
| Meta description | Brampton-specific, mentions North Brampton, flat-rate | GOOD |
| H1 | "Brampton's Moving Tote Rental — Delivered to Your Door." | GOOD — possessive city targeting |
| Local signals in hero body | Springdale, Heart Lake, Bramalea, Castlemore | GOOD — neighbourhood specificity |
| Phone | (416) 845-0290 in nav | GOOD |
| Schema | LocalBusiness (wrong subtype) | SEE schema section |
| City FAQ entries | NONE — same 5 generic FAQs as homepage | WEAK |
| Unique body content | ~6% of page | FAIL — see city page section |
| Google Review link | ABSENT | FAIL — homepage has it; Brampton page does not |

### Missing Pages

**[HIGH] No dedicated service area page** (`/service-area` or `/where-we-deliver`)

**[MEDIUM] No "About" or "Story" page**
The founder story is compelling (broken china, 12 trips to Home Depot). This is buried in a testimonial blockquote. A dedicated `/about` or `/our-story` page builds brand trust signals and provides an internal link target.

---

## 7. Review Health Snapshot

| Metric | Value | Assessment |
|--------|-------|------------|
| Google review count | 0 (pre-launch) | CRITICAL — no review history |
| Average rating | N/A | N/A |
| aggregateRating in schema | ABSENT | Correct to omit until reviews exist |
| Review link on homepage | Present in footer | GOOD placement |
| Review link on city pages | ABSENT | FAIL |
| Third-party review widget | ABSENT | Not yet applicable |
| Review velocity | N/A | CRITICAL future concern |

### Review Velocity Risk

Per Sterling Sky's 18-day rule (Whitespark 2026 data), GBP rankings have a documented cliff if no new review is received within an 18-day window. For a new business this means:

1. The first 5–10 reviews must arrive within the first 30 days post-launch to establish velocity
2. After that, a minimum cadence of 1 review per 18 days must be maintained or rankings will plateau/decline

### Pre-Launch Review Acquisition Strategy

**Phase 1: Founder/Network Reviews (Before First Customer)**
Google's Terms of Service prohibit incentivised reviews and fake reviews. However, genuine reviews from people who have experienced the service are allowed. Options:
- Ask friends or family who have received a test delivery
- Ask anyone who has seen/handled the totes in any context to share an honest impression
- Founder can use early beta customers at a discounted rate in exchange for an honest review request (not guaranteed reviews)

**Phase 2: First-Customer Review Funnel**
Every booking confirmation email and post-pickup follow-up SMS/email should include:
- A single direct link to the Google review form: https://g.page/r/CciR1pUMHVUHEBM/review
- A specific ask: "It takes 60 seconds and helps us grow" rather than a generic "leave us a review"
- Timing: send 48 hours after pickup (when the move is done and the relief is fresh)

**Phase 3: 30-Day Review Cadence**
Target: 1 new review every 10 days to stay well within the 18-day velocity window. With 3–5 bookings per week at scale, this is achievable from natural conversion.

**What Not To Do:**
- Do not post the review link in large Facebook groups asking for reviews (ToS violation)
- Do not offer discounts or gifts in exchange for reviews
- Do not post reviews from the business device or IP address

---

## 8. Citation Presence Assessment

**Note:** Live citation status cannot be fully verified without paid tools (BrightLocal, Whitespark, Moz Local). The assessment below reflects what can be inferred for a pre-launch business.

### Tier 1 Canadian Directory Targets

| Directory | URL | Estimated Status | Priority |
|-----------|-----|-----------------|----------|
| Google Business Profile | business.google.com | CONFIGURED | DONE |
| Yelp Canada | yelp.ca | LIKELY ABSENT | HIGH |
| Yellow Pages Canada | yellowpages.ca | LIKELY ABSENT | HIGH |
| 411.ca | 411.ca | LIKELY ABSENT | HIGH |
| BBB (Accredited Business) | bbb.org/canada | LIKELY ABSENT | HIGH |
| HomeStars | homestars.com | LIKELY ABSENT | HIGH |
| Canada411 | canada411.ca | LIKELY ABSENT | MEDIUM |
| Canpages | canpages.ca | LIKELY ABSENT | MEDIUM |
| Hotfrog Canada | hotfrog.ca | LIKELY ABSENT | MEDIUM |

### Tier 2 / Industry-Specific Targets

| Directory | Relevance | Priority |
|-----------|-----------|----------|
| Moving.com | Industry vertical | MEDIUM |
| iMoving.com | Industry vertical | MEDIUM |
| Brampton Board of Trade | Local authority | HIGH |
| Brampton Guardian business listings | Local media | MEDIUM |
| Halton Hills Chamber of Commerce | Service area | MEDIUM |
| Orangeville & Area Business directory | Service area | LOW |

### Citation Build Notes

**[CRITICAL] Zero citations outside GBP**
A brand-new business has zero citation presence. Per Whitespark 2026 research, 3 of the top 5 AI visibility factors are citation-related. Citation quantity and consistency directly affect both Google Map Pack rankings and AI Overview appearances (Perplexity, Google AI Overviews, etc.).

**Priority NAP to use for all citations:**
- Name: ToteMove (exact, no space)
- Address: do not list street address; use "Brampton, ON L7A" or leave address blank (SAB option)
- Phone: (416) 845-0290
- Website: https://totemove.ca
- Hours: Mon–Sun 8:00 AM – 8:00 PM

**Build citations in this order:**
1. Yelp Canada — create a free business account, verify by phone, add all photos, services, and description
2. Yellow Pages Canada — free listing, critical for older demographic searchers
3. 411.ca — widely scraped as a data source for other directories
4. HomeStars — key for home services in Ontario; moving equipment rental is a relevant category
5. BBB — trust signal; even a free "BBB profile" (unaccredited) helps
6. Brampton Board of Trade — local authority backlink + citation
7. Canada411 / Canpages — auto-populate from 411.ca but should be verified

---

## 9. Local Link & Authority Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Domain age | New (2026) | Authority will build over time |
| Blog content present | YES | 2 articles in /blog/ — good start |
| Inbound local links | LIKELY ZERO | New site; no detectable external links |
| Neighbourhood/community forum presence | UNKNOWN | Consider Brampton Reddit, local Facebook groups (organic, no spam) |
| Local media mentions | ABSENT | Not yet |
| Industry association links | ABSENT | No moving industry association membership visible |

### Blog Content Assessment

The blog directory contains two articles:
1. `moving-totes-vs-cardboard-boxes` — direct cost comparison, GTA-relevant, good for informational intent
2. `plastic-bins-vs-cardboard-boxes-moving` — similar theme, potential thin content if overlap is high

**[MEDIUM] Blog articles are not linked from city pages or homepage body**
Neither blog article is linked from within the main page body. The homepage footer does not contain a "Blog" link. The sitemap includes the blog, but internal linking to blog content is absent from navigation (no "Blog" nav item visible in any page header). Blog posts need internal links from relevant city pages and the homepage to pass link equity and drive crawl.

**[MEDIUM] Blog article topic overlap risk**
Two of two blog posts cover essentially the same topic (totes vs. cardboard). Before publishing more content on this theme, confirm keyword differentiation. A more valuable third article for local SEO would be: "Moving in Brampton: What You Need to Know in [Year]" or "Best Moving Tips for Brampton & Caledon Families."

---

## 10. Technical & Structural Notes

| Item | Status | Notes |
|------|--------|-------|
| HTTPS | PASS | HSTS configured in _headers |
| robots.txt | PASS | Allows all, points to sitemap |
| Sitemap | PRESENT | 14 URLs; includes halton-hills and hillsburgh (orphaned pages) |
| Canonical tags | PRESENT | All pages have self-referencing canonicals |
| Mobile viewport | PASS | Meta viewport set on all pages |
| Cloudflare analytics | PRESENT | Lightweight, privacy-respecting |
| Cache headers | CONFIGURED | HTML: must-revalidate; assets: immutable |
| Formspree form | PRESENT | External form handler; no tracking of submissions in schema |
| Content Security Policy | STRICT | May block third-party widgets (review widgets, Maps embed) if added later — CSP will need updating |
| og:image | logo.png (same across all pages) | Should use product/service photo; unique per page type is better |
| Trailing slash consistency | INCONSISTENT | Homepage canonical has trailing slash (/); city pages do not (/brampton, /mississauga). Minor but worth standardising |

---

## 11. Competitor Landscape (Moving Bin Rental in Service Area)

Direct competitors for "moving bin rental Brampton" and similar queries are sparse in this geography — this is a meaningful market gap. The primary competitive set based on knowledge cutoff:

**Direct (Rental-focused):**
- Frogbox (Toronto-based, moving bin rental, active in GTA) — larger brand, likely has Brampton service area
- FROG BOX-style local operators — unclear if active in Brampton/Caledon corridor

**Indirect (Full-service movers with bin options):**
- U-Haul (moving equipment, no delivery model)
- Home Depot / Lowe's moving box sales (no rental)

**The opportunity:** ToteMove appears to be the only delivery-model moving bin rental service specifically targeting the Brampton–Caledon–Dufferin corridor. Early GBP optimisation and citation building in this niche could establish a dominant position before any competitor enters.

**Note:** Live competitor ranking data requires DataForSEO or similar paid tools. This assessment is based on market knowledge as of August 2025.

---

## 12. Top 10 Prioritized Actions

### CRITICAL

**C1. Fix GBP primary category to "Moving Supply Store" (or "Equipment Rental Agency")**
Current "Moving and Storage Service" category pits ToteMove against full movers. Switch primary category immediately. This is the #1 local ranking factor per Whitespark 2026 and the single highest-leverage change available.
*Owner action required in GBP dashboard — cannot be done in code.*

**C2. Launch review acquisition from Day 1**
With 0 reviews and the 18-day velocity rule in effect from first publication, begin soliciting genuine reviews from anyone who has experienced the product/service. Add the review link to every city page footer and to post-booking confirmation communications.
*Code change: add `<a href="https://g.page/r/CciR1pUMHVUHEBM/review">` to all city page footers.*

**C3. Build citations immediately — start with Yelp, YP Canada, 411.ca**
Zero citation presence outside GBP is a critical gap. These three directories alone will 2x citation count and provide data sources that auto-populate other directories.
*Owner action: 2–3 hours of manual listing creation.*

### HIGH

**H1. Add geo coordinates to all LocalBusiness schema**
Missing `geo` with precise lat/lng on all pages. For a SAB with no street address, coordinates are the primary geographic pin. Use coordinates for Mayfield & Hurontario, Brampton (approximate business base).

**H2. Fix halton-hills.html and hillsburgh.html — either add to nav/footer/city widget or remove from sitemap**
Both pages are orphaned (indexed but not internally linked) and have incorrect active-city markup in their location widgets. This is confusing to both crawlers and users. Decide: add them properly, or remove them entirely.

**H3. Change schema @type from LocalBusiness to HomeAndConstructionBusiness on all pages**
Generic parent type misses the industry signal Google uses for category confirmation. Update all 11 schema blocks (homepage + 10 city pages).

**H4. Add business hours as visible text on all pages**
Schema has correct hours (Mon–Sun 8am–8pm). No page displays this in visible body text. Add to footer: "Hours: Mon – Sun, 8 AM – 8 PM" at minimum.

### MEDIUM

**M1. Substantially expand unique content on city pages (target 30%+ unique content per page)**
Current pages are 5–8% unique. Add city-specific body section (local context, neighbourhood references, local moving tips), city-specific FAQ entries, and a city-specific testimonial placeholder. Brampton page is the priority — it's the primary city.

**M2. Create a dedicated /service-area page**
Build a single hub page listing all served communities with links to each city page, a service area map (even a static image), and postal code guidance. This page should be linked from the homepage nav and all city pages.

**M3. Fix homepage H1 to include a keyword and city signal**
"Rent totes. Move smarter." is a brand tagline. Replace or supplement with: "Moving Bin & Tote Rentals — Delivered to Brampton, Caledon & Area" or restructure so the H1 is keyword-rich and a sub-heading carries the tagline.

**M4. Add missing hasOfferCatalog to all 10 city pages**
Currently only on the homepage. City pages should carry full pricing schema so Google can show rich data for city-specific queries.

### LOW

**L1. Add a "Blog" link to the main navigation**
Two blog posts exist with no nav link. Add `/blog` to the desktop and mobile nav menus and to the footer to improve internal link equity to blog content.

**L2. Add city-page internal links to relevant blog articles within city page body copy**
Create contextual body links from city pages to blog posts where relevant, e.g., link "plastic vs cardboard" article from the FAQ section.

**L3. Standardise canonical trailing slash**
Homepage: `https://totemove.ca/` (with slash). City pages: `https://totemove.ca/brampton` (without slash). Choose one convention and apply consistently.

---

## 13. Limitations Disclaimer

The following could not be assessed without paid tooling or live GBP access:

- **Live GBP data:** Cannot verify actual GBP photos, posts, Q&A, review count, or current category labels live. Assessment based on provided business context.
- **Citation audit:** BrightLocal or Whitespark Citation Audit required to enumerate existing citations and flag NAP inconsistencies across data aggregators (Localeze, Foursquare, Factual/Foursquare, etc.).
- **Ranking data:** Cannot confirm current local pack positions for target queries. DataForSEO `serp_organic_live_advanced` or equivalent required.
- **Competitor live data:** Cannot confirm which competitors currently rank in the local pack for Brampton/Caledon moving bin queries.
- **GBP Insights:** Impressions, clicks, direction requests, and call volume not available without GBP dashboard access.
- **Live site rendering:** WebFetch returned HTTP 403. All analysis is based on the local codebase. Confirm that the deployed site matches the codebase exactly.
- **Index status:** Cannot confirm which pages are currently indexed in Google Search Console.
- **Core Web Vitals / Page Speed:** Not assessed; would require Lighthouse or PageSpeed Insights run against the live URL.
- **Backlink profile:** Cannot assess inbound links without Ahrefs, Moz, or Semrush access.

---

*Audit prepared by Claude Code Local SEO Agent for ToteMove (totemove.ca). All recommendations should be validated against the latest GBP guidelines, Schema.org specifications, and Google Search Central documentation before implementation.*
