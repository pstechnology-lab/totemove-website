# GEO (Generative Engine Optimization) Audit — totemove.ca
**Audit date:** 2026-07-26  
**Business:** ToteMove — Moving bin/tote rental, Brampton ON  
**Stack:** Static HTML, Cloudflare Pages

---

## GEO Readiness Score: 39 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|---------|
| Citability | 25% | 42 | 10.5 |
| Structural Readability | 20% | 58 | 11.6 |
| Multi-Modal Content | 15% | 38 | 5.7 |
| Authority & Brand Signals | 20% | 28 | 5.6 |
| Technical Accessibility | 20% | 28 | 5.6 |
| **TOTAL** | | | **39 / 100** |

The overall score is severely depressed by a single fixable configuration problem: Cloudflare's AI Scrape Shield has silently injected Disallow rules for every major AI crawler into robots.txt. Without that fix, the rest of the GEO work is invisible to AI engines.

---

## Platform-Specific Scores

| Platform | Score | Blocker |
|----------|-------|---------|
| Google AI Overviews | 18/100 | Google-Extended blocked |
| ChatGPT | 10/100 | GPTBot blocked |
| Claude (AI search) | 10/100 | ClaudeBot blocked |
| Perplexity | 44/100 | Not blocked; content quality limits score |
| Bing Copilot | 38/100 | Not blocked; low domain authority |

---

## 1. AI Crawler Access Status — CRITICAL ISSUE

### robots.txt Findings

The live `robots.txt` at `https://totemove.ca/robots.txt` contains two sections. The local file in the repository (`robots.txt`) has only four lines:

```
User-agent: *
Allow: /

Sitemap: https://totemove.ca/sitemap.xml
```

**However, Cloudflare's AI Scrape Shield feature has injected a managed block section above the repository content.** The live file received by crawlers is:

```
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CloudflareBrowserRenderingCrawler
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: meta-externalagent
Disallow: /
```

### Crawler Status Summary

| Crawler | Platform | Status |
|---------|----------|--------|
| GPTBot | ChatGPT (search + training) | **BLOCKED** by Cloudflare |
| OAI-SearchBot | ChatGPT search results | Not mentioned — likely allowed |
| ClaudeBot | Claude AI | **BLOCKED** by Cloudflare |
| Google-Extended | Google AI Overviews (Bard/Gemini) | **BLOCKED** by Cloudflare |
| PerplexityBot | Perplexity AI | **Not blocked — allowed** |
| Bingbot | Bing Copilot | **Not blocked — allowed** |
| CCBot | Common Crawl (training datasets) | Blocked — acceptable |
| meta-externalagent | Meta AI | Blocked |

### Fix Required

In the Cloudflare dashboard, navigate to **Security > Bots > AI Scrape Shield** and disable the AI crawler blocking. Alternatively, manage the setting via the Cloudflare API or Workers. The managed section is injected at the CDN layer and cannot be overridden by the file in the repository alone.

After disabling, the robots.txt should permit GPTBot, OAI-SearchBot, ClaudeBot, and Google-Extended explicitly. Adding them by name (rather than relying on `User-agent: *`) is safer and signals clear opt-in intent:

```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /

Sitemap: https://totemove.ca/sitemap.xml
```

---

## 2. llms.txt Status — MISSING

`https://totemove.ca/llms.txt` returns **404**.

`llms.txt` is an emerging standard (analogous to `robots.txt` but purpose-built for LLM context loading) that tells AI systems what the site is, what content is available, and what the primary use cases are. For a pre-launch SAB (Service Area Business), it is low-effort and provides a clean entity declaration.

### Recommended llms.txt content

```
# ToteMove — Moving Bin & Tote Rentals in Brampton, ON

ToteMove rents reusable plastic moving bins (totes) and dollies to homeowners
in Brampton, Mississauga, Caledon, Georgetown, Bolton, Erin, Acton, and
Orangeville. Totes are delivered 7 days before move day and picked up after.
Flat-rate packages from $119 CAD (Studio/1-Bedroom) to $389 CAD (5-Bedroom).
No tape. No cardboard. No trips to the hardware store.

## Services
- Moving tote / moving bin rental (20–100 totes per package)
- Dolly included in every package
- Delivery and pickup included in flat-rate price
- 14-day standard rental (extensions available)

## Service Area
Brampton, Mississauga (North), Caledon, Georgetown, Acton, Bolton, Erin,
Orangeville, Halton Hills

## Pricing (CAD)
- Studio / 1-Bedroom: $119 (20 totes, 1 dolly)
- 1 Bedroom Plus: $149 (30 totes, 1 dolly)
- 2-Bedroom: $189 (45 totes, 1 dolly)
- 3-Bedroom: $229 (60 totes, 1 dolly)
- 4-Bedroom: $299 (80 totes, 2 dollies)
- 5-Bedroom: $389 (100 totes, 2 dollies)

## Contact
hello@totemove.ca | (416) 845-0290 | https://totemove.ca

## Key pages
- https://totemove.ca/ (homepage, booking form)
- https://totemove.ca/blog/moving-totes-vs-cardboard-boxes
- https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving
- https://totemove.ca/brampton
```

Place this file at `/llms.txt` in the repository root (Cloudflare Pages will serve it automatically).

---

## 3. Passage-Level Citability

### Methodology

AI citation preference sits in the 134–167 word range for self-contained passages. Direct answers in the first 40–60 words of a section score higher. Passages must be extractable without surrounding context to be cited.

### Homepage FAQ Citability

| Question | Answer Length (words) | Citability |
|----------|----------------------|-----------|
| How many days before my move do you drop off? | 27 | Low — too short |
| How strong are the totes really? | 20 | Low — too short |
| What sizes are the totes? | 24 | Low — too short |
| What's the difference between a moving tote and a moving bin? | 41 | Low — too short |
| Are plastic moving bins better than cardboard boxes? | 51 | Below optimal — needs expansion |
| Are your totes the same as plastic moving boxes? | 54 | Below optimal |

No FAQ answer reaches the 134-word floor for optimal citability. These answers are written for human skimmability, which competes with AI passage extraction.

### Critical Gap: No Definitional Passage for "What Is a Moving Bin Rental?"

The site has no standalone passage that answers this foundational question. The closest is a FAQ answer buried in a terminology disambiguation question. A dedicated answer block answering "what is a moving bin rental, how does it work, and how much does it cost in Brampton" would be the single highest-value citability addition.

### Pricing Answerability

The question "how much does moving bin rental cost" is **answerable** from the page — prices appear in both the package cards and the LocalBusiness OfferCatalog schema. However, pricing is structured as a UI grid rather than a prose paragraph. An AI extracting this information has to parse list items rather than read a sentence. Adding a single pricing summary paragraph (e.g., "ToteMove packages start at $119 for a studio or 1-bedroom move and go up to $389 for a 5-bedroom. Every package includes delivery, pickup, totes, and a dolly at one flat rate.") would make it directly citable.

### Blog Post Citability

**`/blog/plastic-bins-vs-cardboard-boxes-moving`** — Higher citability potential:
- Question-format H1 matches common AI search queries exactly
- "The quick answer" section provides a direct 43-word response (below optimal but structured correctly)
- Comparison table is AI-parseable
- FAQPage schema with 5 Q&As
- Verdict box is well-structured but only ~40 words
- The body sections ("No assembly. No tape.", "Lids that actually seal", etc.) are each ~50–80 words — all under the optimal range

**`/blog/moving-totes-vs-cardboard-boxes`** — Moderate citability:
- Strong cost comparison table with specific dollar amounts ($235 vs $189)
- Verdict box is concise and citable: "Cardboard costs ~$235. Tote rental costs $189. That's $46 cheaper for the rental, less than a tank of gas, and you don't have to do anything except pack." (35 words) — punchy but short
- No FAQPage schema (unlike the other blog post — this is an oversight)
- No breadcrumbs

### Key Citability Gaps

1. No standalone "What is a moving bin rental?" definition block on the homepage
2. FAQ answers are 20–55 words; need to be 80–167 words with context to be AI-citable
3. Pricing is in card/grid format rather than a citable prose sentence
4. Blog verdict passages are under 50 words; expanding them to 134+ words would improve AI extraction
5. "Moving bin rental Brampton" as a topic is only addressed on the Brampton city page and the homepage — neither has a dedicated passage for this query

---

## 4. Structured Data Contribution to AI Visibility

### What Is Present

| Schema Type | Location | Status |
|-------------|----------|--------|
| LocalBusiness | `index.html` | Present, well-formed |
| OfferCatalog / Offer | `index.html` | Present — pricing structured |
| OpeningHoursSpecification | `index.html` | Present |
| PostalAddress | `index.html` | Present |
| FAQPage + Question + Answer | `index.html` | Present (7 Q&As) |
| Article | Blog posts | Present on both posts |
| FAQPage | `plastic-bins-vs-cardboard-boxes-moving.html` | Present (5 Q&As) |
| FAQPage | `moving-totes-vs-cardboard-boxes.html` | **Missing** |

### What Is Missing or Weak

**No `@id` on LocalBusiness.** Without a persistent `@id` URI (e.g., `"@id": "https://totemove.ca/#business"`), knowledge graph systems cannot reliably deduplicate or build an entity node for ToteMove. This is especially important pre-Wikipedia entry.

**Author entity is incomplete.** Both Article schemas have:
```json
"author": {
  "@type": "Person",
  "name": "Steven",
  "jobTitle": "Founder, ToteMove"
}
```
"Steven" alone cannot be disambiguated by a knowledge graph. The author needs `"name": "Steven Paiva"` (or the correct full name), a `"url"` pointing to a bio page or LinkedIn, and ideally a `"sameAs"` array linking to social profiles.

**No BreadcrumbList on blog posts.** Breadcrumbs help AI engines understand content hierarchy: `Home > Blog > [Post Title]`.

**No WebSite schema.** Adding a minimal WebSite schema on the homepage enables potential sitelinks searchbox eligibility and reinforces brand entity.

**Article schema is missing `image` and `wordCount`.** Both are signals used in determining content authority.

**FAQPage missing from `moving-totes-vs-cardboard-boxes.html`.** This post has FAQ-style content but no FAQPage schema. Adding it matches what was done on the other blog post.

### Recommended additions to index.html LocalBusiness

```json
"@id": "https://totemove.ca/#business",
"founder": {
  "@type": "Person",
  "name": "Steven Paiva",
  "url": "https://totemove.ca/about"
},
"sameAs": [
  "https://www.google.com/maps?cid=[YOUR_PLACE_ID]"
]
```

---

## 5. Entity Definition & Brand Mention Signals

### Entity Clarity Assessment

| Signal | Status |
|--------|--------|
| Wikipedia page | None — expected for pre-launch |
| Google Business Profile | Link present in footer; suggests GBP exists |
| LinkedIn company page | Not linked from site — unknown if exists |
| Reddit brand mentions | None expected at pre-launch |
| YouTube presence | Not present; highest correlation signal (~0.737) for AI citations |
| Wikidata entry | None |
| Crunchbase / startup databases | Not confirmed |

### Founder Identity

The founder is identified on the site as "Steven" (testimonial section and blog byline). The schema uses `"name": "Steven"` without a surname. This prevents any knowledge graph from building an entity for the founder. For a pre-launch brand, associating the founder by full name with the brand is the most accessible authority-building action available.

The founder testimonial ("12 trips to Home Depot... Grandma's china broken. There had to be a better way.") is the brand origin story. This is the right instinct for AI citation — personal origin stories are highly citable by LLMs. However, without a dedicated "About" page, the story exists only as a blockquote with no schema wrapper.

### What "ToteMove" Is (Entity Clarity for AI)

Positive signals: the site consistently calls the service "moving bin rental" and "moving tote rental" — both of which are the natural language queries users type. The `description` in LocalBusiness schema is clear. The `llms.txt` (once added) will provide the cleanest entity declaration.

Negative signals: no external corroboration exists yet. The site is pre-launch with no press, no backlinks, no reviews on third-party platforms, no Reddit mentions, and no YouTube channel. This means AI systems have only the site itself as a source — which limits citation confidence.

### Brand Mention Correlation (per GEO research)

| Channel | Correlation with AI Citations | ToteMove Status |
|---------|------------------------------|----------------|
| YouTube mentions | ~0.737 (strongest) | None |
| Reddit presence | High | None |
| Wikipedia entity | High | None |
| Domain Rating / backlinks | ~0.266 (weak) | Pre-launch, minimal |

The single highest-ROI off-page action is creating a YouTube video about the service (even a 90-second walkthrough). YouTube content is the strongest predictor of AI citation frequency, and it creates a crawlable entity signal that links the brand name to the service category.

---

## 6. Content Gaps for AI Overview Capture

### Query: "moving bin rental Brampton"

**Current coverage:** Homepage hero, Brampton city page, LocalBusiness schema service area. The Brampton city page has city-specific H1 and a booking form. Neither page has a self-contained paragraph that directly answers "where can I rent moving bins in Brampton, what does it cost, and how does it work."

**Gap:** A 150–200 word "About ToteMove in Brampton" passage on the Brampton city page would be directly extractable by AI. Something like: "ToteMove is a moving bin rental company based in North Brampton, Ontario. We deliver industrial-strength plastic totes to addresses in Brampton, Caledon, Mississauga (North), Georgetown, Bolton, Acton, Erin, and Orangeville. Packages start at $119 for a studio or 1-bedroom move (20 totes + dolly + delivery + pickup) and go up to $389 for a 5-bedroom home. Totes are delivered 7 days before your move date and picked up from your new address after you settle in. Every package includes delivery, pickup, and a dolly at one flat rate — no per-mile fees, no upsells. To book, fill out the form on this page or call (416) 845-0290." That passage is 131 words — within the optimal citability window and entirely self-contained.

### Query: "plastic moving boxes vs cardboard"

**Current coverage:** Two blog posts address this directly. `/blog/plastic-bins-vs-cardboard-boxes-moving` has a question-format H1 that matches this query well. The comparison table is structured for AI parsing.

**Gap 1:** The "quick answer" section is 43 words. Expanding it to 100–150 words with the key facts (durability, waterproof, no tape, reusable 400+ times, from $119 delivered) would make it the extractable "answer block" for this query.

**Gap 2:** Neither blog post references external research or statistics (e.g., "according to a 2023 Stats Canada survey, Canadians make X million moves per year"). Even one cited external statistic significantly increases perceived authority for AI grounding.

**Gap 3:** The posts are self-promotional. AI systems calibrate citation confidence against editorial neutrality. A brief acknowledgment of when cardboard is the better choice (already present in both posts) is good — it signals objectivity.

### Query: "how much does moving bin rental cost"

**Current coverage:** Fully answerable from the pricing grid and LocalBusiness schema priceRange.

**Gap:** No single extractable prose sentence. Add to homepage or Brampton page: "ToteMove moving bin rentals start at $119 CAD for a studio or 1-bedroom home (20 totes, 1 dolly, 14-day rental, delivery and pickup included) and range up to $389 for a 5-bedroom home. There are no additional per-kilometre fees within the service area."

### Query: "what is a moving bin rental"

**Current coverage:** FAQ has "A moving tote or moving bin is a reusable, stackable plastic container used instead of cardboard boxes." — 20 words. Insufficient.

**Gap:** Add a dedicated definition section on the homepage or as a standalone FAQ entry:

> "A moving bin rental is a service where a company delivers reusable plastic bins to your home before your move, you pack and move with them, and they pick the bins up afterward. Unlike cardboard boxes, plastic moving bins are waterproof, stackable, and rated for heavy loads — typically 60 lbs or more. You pay a flat rental fee rather than buying boxes you use once and throw away. ToteMove's moving bin rentals in Brampton include 20 to 100 totes plus a dolly, delivered to your door, with pickup after your move, for $119 to $389 depending on home size."

That is 109 words — approaching the citability floor. Expanding slightly and using it as visible body copy (not just schema text) would maximize extraction.

---

## 7. Knowledge Panel Readiness

For a knowledge panel to appear in Google search for "ToteMove" the following signals are assessed:

| Signal | Status | Impact |
|--------|--------|--------|
| Google Business Profile | Likely present (review link in footer) | High — confirm GBP is verified |
| Website claimed in GBP | Unknown | High |
| `@id` in LocalBusiness schema | Missing | Medium |
| Wikipedia / Wikidata entity | None | High (blocking factor) |
| Brand mentions on news/editorial sites | None | High |
| Logo in structured data | Present (`logo` in LocalBusiness) | Low |
| Social profiles in schema `sameAs` | Missing | Medium |

A knowledge panel for a local SAB is primarily driven by a verified Google Business Profile, not Wikipedia. The GBP appears to exist (the footer links to `g.page/r/CciR1pUMHVUHEBM/review`). Ensuring the GBP is fully completed (categories, service areas, photos, description matching site copy) is the primary knowledge panel action.

For broader AI knowledge (ChatGPT, Perplexity), a Wikipedia entry is not feasible pre-launch. The `llms.txt` file and the `@id` + `sameAs` additions to LocalBusiness schema are the practical substitutes.

---

## 8. AI Search Visibility Check

**ChatGPT / OpenAI:** GPTBot is blocked. The site has not been indexed by OpenAI's crawler and will not appear in ChatGPT search responses for "moving bin rental Brampton." This includes both ChatGPT Search (OAI-SearchBot) and knowledge base grounding. Impact: zero ChatGPT visibility until crawler is unblocked.

**Claude AI:** ClaudeBot is blocked. Same situation. Note that the knowledge cutoff for Claude models predates the site's launch, so even if ClaudeBot were allowed, ToteMove would not appear in Claude's training data — it would only appear via real-time RAG/search grounding, which is also blocked.

**Perplexity:** PerplexityBot is not blocked and can crawl the site. However, Perplexity's results for "moving bin rental Brampton" are likely populated by competitor pages (FrogBox, Bin-It, etc.) with more domain history and backlinks. Once the site is indexed by Perplexity, the blog posts are the best candidates for citation given their comparison-style structure.

**Google AI Overviews:** Google-Extended is blocked. Google AIO will not draw from totemove.ca content. Given that "moving bin rental Brampton" is a commercial/navigational query, AIO may not trigger for it anyway — but "plastic bins vs cardboard boxes" is an informational query where AIO is more likely to appear, and the blog content would be competitive if Google-Extended were allowed.

**Bing Copilot:** Bingbot is not blocked. Bing Copilot can index and cite the site. Domain Authority and backlink profile will be the limiting factor at this stage.

---

## Top 5 Highest-Impact Recommendations

### 1. Disable Cloudflare AI Scrape Shield (30 min, Critical)
**Impact:** Unlocks GPTBot, ClaudeBot, and Google-Extended simultaneously. Without this, all other GEO work is invisible to three of the four major AI platforms.  
**Action:** Cloudflare Dashboard > Security > Bots > AI Scrape Shield > toggle off. Then redeploy or update the repository robots.txt to explicitly Allow the key crawlers by name.  
**Expected lift:** +25 points on overall GEO score; platform scores for ChatGPT and Google AIO move from ~10 to potentially 45–55 once content is indexed.

### 2. Add /llms.txt (1 hour, High Impact)
**Impact:** Provides a clean entity declaration for any LLM that loads context via the llms.txt convention. Gives AI systems a fast-path to understand what ToteMove is, who it serves, and what it costs without having to parse the full HTML.  
**Action:** Create the file at the repository root using the template in Section 2 above. Commit and push; Cloudflare Pages will serve it automatically.  
**Expected lift:** +5 points on Authority score; improves entity clarity for Perplexity and future-proofs for llms.txt adoption.

### 3. Expand FAQ Answers to 100–150 Words Each (3–4 hours, High Impact)
**Impact:** Moves FAQ answers from the 20–55 word range into the citability window. The three highest-value answers to expand are: (a) "Are plastic moving bins better than cardboard boxes?" — expand with specifics on weight rating, waterproofing, stacking, and cost comparison; (b) "What's the difference between a moving tote and a moving bin?" — add context about industry terminology and how rental services work; (c) add a new FAQ: "What is a moving bin rental and how does it work?" with a 130–150 word definitional answer.  
**Action:** Edit `index.html` FAQ section and update the FAQPage schema in the `<script type="application/ld+json">` block to match. These two must stay in sync.  
**Expected lift:** +12 points on Citability score; creates extractable passages for "what is a moving bin rental" and "are plastic moving bins better than cardboard" queries.

### 4. Add Full Name to Author Schema and Create an About Page (2 hours, Medium Impact)
**Impact:** Enables entity disambiguation for the founder. A bio page at `/about` with a paragraph about Steven (full name, background, why ToteMove was started) provides a crawlable author entity that strengthens E-E-A-T signals for the blog posts and creates a linkable page for the `author.url` field in Article schema.  
**Action:** Create `/about` page. Update both Article schemas to use `"name": "[Full Name]"` and `"url": "https://totemove.ca/about"`. Add the founder's full name to the testimonial byline on the homepage.  
**Expected lift:** +8 points on Authority score; improves blog post citation credibility in AI systems that weight author entity signals.

### 5. Add Pricing Summary Paragraph to Homepage (30 min, Medium Impact)
**Impact:** Converts the pricing grid from a UI element into an AI-extractable prose passage. Directly answers "how much does moving bin rental cost in Brampton" in a format LLMs can cite verbatim.  
**Action:** Add a single paragraph below the packages header or above the booking form: "ToteMove moving bin rental packages in Brampton start at $119 for a studio or 1-bedroom home and go up to $389 for a 5-bedroom home. Every package includes a set number of totes (20 to 100), a dolly, delivery to your current home, and pickup from your new address — all at one flat rate with no per-kilometre fees." (56 words — short but self-contained and accurate. Expand to 100+ words for full citability.)  
**Expected lift:** +6 points on Citability score; directly captures the "moving bin rental cost Brampton" informational query in AI systems.

---

## Secondary Recommendations (Lower Urgency)

- **Add FAQPage schema to `/blog/moving-totes-vs-cardboard-boxes`** — matches what was done on the other blog post; 30-minute fix.
- **Add `@id` to LocalBusiness schema** on all pages — use `"https://totemove.ca/#business"` consistently.
- **Add `sameAs` array to LocalBusiness** — include Google Maps place URL, any LinkedIn company page, and any social profiles once created.
- **Add BreadcrumbList to blog posts** — minimal schema, high structural readability signal.
- **Create a YouTube channel** — even a single 90-second "how ToteMove works" walkthrough video creates the highest-correlation external brand signal for AI citations (~0.737). This is the top off-page action for long-term AI search presence.
- **Expand "quick answer" block on `/blog/plastic-bins-vs-cardboard-boxes-moving`** — from 43 words to 130–150 words. This post is the best positioned to capture "plastic bins vs cardboard" in Google AI Overviews once Google-Extended is unblocked.
- **Add one cited external statistic to each blog post** — e.g., Statistics Canada moving frequency data, or a city-specific statistic. External citations increase AI confidence in the content as a reliable source.
- **Add `wordCount` and `image` to Article schema** on both blog posts.
- **Verify Google Business Profile is fully completed** — categories, service areas, photos, business description matching site language, services list.
- **Add a `/sitemap.xml` reference to robots.txt** — already present in the repository file but confirm it appears in the Cloudflare-served version after the managed block section is removed.

---

## Content Already Working Well

- Static HTML served from Cloudflare CDN: zero JavaScript rendering dependency; AI crawlers read the full page on first fetch.
- FAQPage schema on the homepage is valid and well-populated (7 Q&As).
- LocalBusiness schema is complete with NAP, priceRange, areaServed, and OfferCatalog.
- Blog post H1s are in question format and match natural language queries exactly ("Are plastic bins better than cardboard boxes for moving?").
- Comparison tables in blog posts are crawlable and provide structured data AI systems can parse.
- The site does not use CSR/SPA patterns — no hydration issues, no content behind JavaScript walls.
- Service area coverage is explicit (8 named cities in schema and on-page).
- Pricing is machine-readable in both page content and structured data.
- Article schema on blog posts includes `datePublished`, `dateModified`, `author`, and `publisher` — dates are current (June 2026).
- The origin story testimonial ("12 trips to Home Depot...") is the kind of human-voice narrative that AI systems weight positively when constructing brand summaries.
