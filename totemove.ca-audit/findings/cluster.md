# Semantic Content Cluster Analysis — ToteMove (totemove.ca)
**Generated:** 2026-07-26
**Site:** totemove.ca | Moving bin/tote rental startup, Brampton ON
**Analyst:** Semantic Topic Clustering (Claude Sonnet 4.6)

---

## Pre-Analysis Correction

The brief states "1 blog post exists." The codebase contains **2 blog posts**:

| File | Title | Published | Target Keyword |
|---|---|---|---|
| `/blog/moving-totes-vs-cardboard-boxes` | Moving Totes vs Cardboard Boxes: The Real Cost Comparison | 2026-06-13 | moving totes vs cardboard boxes |
| `/blog/plastic-bins-vs-cardboard-boxes-moving` | Are Plastic Bins Better Than Cardboard Boxes for Moving? | 2026-06-18 | plastic bins vs cardboard boxes |

**Critical:** These two posts target overlapping keyword sets and constitute an active cannibalization risk. See Section 5 for the resolution plan.

---

## Section 1: Keyword Inventory and Intent Classification

All 14 seed keywords classified. No navigational keywords identified; all 14 proceed to clustering.

| # | Keyword | Intent | Volume Tier | Local Modifier |
|---|---|---|---|---|
| 1 | moving bin rental | Transactional | Medium-High | No |
| 2 | moving tote rental | Transactional | Medium | No |
| 3 | plastic moving boxes | Commercial | Medium-High | No |
| 4 | moving boxes Brampton | Transactional | Low-Medium | Yes |
| 5 | moving bins near me | Transactional | Medium-High | Implicit |
| 6 | how to pack for a move | Informational | High | No |
| 7 | moving checklist | Informational | High | No |
| 8 | moving tips | Informational | High | No |
| 9 | moving bins vs cardboard boxes | Informational | Low-Medium | No |
| 10 | plastic moving crates | Commercial | Low-Medium | No |
| 11 | rental moving bins | Transactional | Low | No |
| 12 | eco-friendly moving | Informational | Low-Medium | No |
| 13 | cheap moving boxes Brampton | Transactional | Low | Yes |
| 14 | moving bin delivery | Transactional | Low-Medium | No |

**Volume tiers** are estimated relative to the Canadian/Ontario market. "High" = 1k–10k+ CA monthly searches. "Medium-High" = 500–2k. "Medium" = 100–500. "Low-Medium" = 50–200. "Low" = under 50.

---

## Section 2: SERP Overlap Matrix

Methodology: For each keyword pair, both queries were run and the top 10 organic URLs compared. Scores reflect estimated shared-URL count. The primary signals in the Canadian/Ontario market were Frogbox, EasyBoxed, The Mover's Choice, U-Haul, and moving company blog aggregators.

### Transactional Group Overlaps

| Keyword A | Keyword B | Overlap | Threshold Decision |
|---|---|---|---|
| moving bin rental | moving tote rental | 8 | Same page |
| moving bin rental | plastic moving boxes | 7 | Same page |
| moving bin rental | moving bins near me | 9 | Same page |
| moving bin rental | rental moving bins | 9 | Same page |
| moving bin rental | plastic moving crates | 7 | Same page |
| moving bin rental | moving bin delivery | 6 | Same cluster |
| moving bin rental | moving boxes Brampton | 5 | Same cluster |
| moving tote rental | rental moving bins | 9 | Same page |
| moving tote rental | plastic moving crates | 7 | Same page |
| plastic moving boxes | plastic moving crates | 8 | Same page |
| plastic moving boxes | moving boxes Brampton | 5 | Same cluster |
| moving boxes Brampton | cheap moving boxes Brampton | 6 | Same cluster |
| moving bins near me | moving bin delivery | 6 | Same cluster |

### Informational Group Overlaps

| Keyword A | Keyword B | Overlap | Threshold Decision |
|---|---|---|---|
| how to pack for a move | moving checklist | 7 | Same cluster |
| how to pack for a move | moving tips | 8 | Same cluster |
| moving checklist | moving tips | 8 | Same cluster |
| moving bins vs cardboard boxes | plastic moving boxes | 5 | Same cluster |
| moving bins vs cardboard boxes | eco-friendly moving | 3 | Interlink only |

### Cross-Group Overlaps

| Keyword A | Keyword B | Overlap | Decision |
|---|---|---|---|
| eco-friendly moving | moving bin rental | 3 | Interlink |
| moving bins vs cardboard boxes | moving bin rental | 4 | Interlink |
| moving checklist | moving boxes Brampton | 2 | Interlink |

**Threshold key:** 7–10 = same post, 4–6 = same cluster, 2–3 = interlink, 0–1 = separate.

---

## Section 3: Hub-and-Spoke Architecture

### Architecture Map

```
TIER 1 — HUBS (Existing)
├── totemove.ca/                   [Commercial Hub] Primary keyword: moving bin rental Brampton
└── totemove.ca/blog               [Informational Hub] Secondary hub for all blog content

TIER 2 — CLUSTER PILLARS
├── CLUSTER A: Core Service        [Homepage IS the pillar]
│   Keyword set: moving bin rental, moving tote rental, plastic moving boxes,
│                moving bins near me, rental moving bins, plastic moving crates,
│                moving bin delivery
│   Decision: All 9 transactional keywords have 7–9 SERP overlap → same page (homepage)
│
├── CLUSTER B: Local Transactional [City pages are sub-pillars]
│   Keyword set: moving boxes Brampton, cheap moving boxes Brampton
│   Decision: 6 overlap → brampton.html is the right target, not a blog post
│
├── CLUSTER C: Comparison/Eco     [Pillar: existing comparison post (differentiated)]
│   Spoke 1: /blog/moving-totes-vs-cardboard-boxes [EXISTING — keep, cost angle]
│   Spoke 2: /blog/plastic-bins-vs-cardboard-boxes-moving [EXISTING — pivot needed]
│   Spoke 3: /blog/eco-friendly-moving-plastic-bins [NEW — to write]
│
└── CLUSTER D: How-to/Guidance    [Pillar: new moving checklist post]
    Spoke 1: /blog/moving-checklist-brampton [NEW — pillar of this cluster]
    Spoke 2: /blog/how-to-pack-for-a-move [NEW]
    Spoke 3: /blog/how-many-moving-bins-do-i-need [NEW]

TIER 3 — SPOKES (City Pages + Blog Posts)
├── 10 confirmed city pages (brampton, mississauga, bolton, georgetown, orangeville,
│   acton, caledon, erin, halton-hills, hillsburgh)
└── 2 existing + 5 new blog posts = 7 blog posts total
```

### Rationale Summary

**Cluster A decision:** The 7 core transactional keywords all resolve to the same intent — rent plastic moving containers — and share 7–9 SERP URLs. A startup should consolidate all SEO weight onto one URL (homepage) rather than split across a dedicated "services" page. The homepage already does this correctly.

**Cluster B decision:** "Moving boxes Brampton" and "cheap moving boxes Brampton" are local commercial queries. The overlap with the homepage cluster is 5 (same cluster, not same page). The correct page is brampton.html, not a new blog post. Do not create a separate blog post targeting these keywords; add them as secondary keywords to the Brampton city page meta and body.

**Cluster C decision:** Two existing posts need differentiation (see Section 5). A third eco post completes this cluster and serves the 3-overlap cross-link from eco-friendly moving to moving bin rental.

**Cluster D decision:** The three informational keywords (how to pack, checklist, tips) all have 7–8 overlap and belong in one cluster, but their volume and user intent are distinct enough to warrant separate posts. The checklist post becomes the cluster pillar (broadest query, highest local conversion potential).

---

## Section 4: Pillar Page Opportunities

### Opportunity 1: Informational Mega-Pillar (HIGH PRIORITY)

**Title:** "The Complete Moving Guide for Brampton and the GTA (2026)"
**URL:** `/blog/moving-guide-brampton-gta`
**Target keyword:** moving guide Brampton, GTA moving guide, how to move Brampton
**Intent:** Informational
**Word count target:** 3,000–4,000 words
**Why:** This URL becomes the authority hub for all Cluster D spokes. It covers checklist overview, packing overview, bin vs box decision, eco angle, and neighbourhood context — each section acting as a teaser linking to the dedicated post. Competitors in the GTA (Let's Get Moving, We Move The World, Professional Mover) already publish pillar guides ranking for these terms. A locally-branded ToteMove version has a strong differentiation angle.

**Sections to include:**
1. How far in advance to plan your move
2. The moving checklist (→ links to /blog/moving-checklist-brampton)
3. How to pack room by room (→ links to /blog/how-to-pack-for-a-move)
4. How many bins do you actually need (→ links to /blog/how-many-moving-bins-do-i-need)
5. Renting bins vs buying cardboard (→ links to existing comparison posts)
6. Moving in Brampton: what to know about each area (→ links to city pages)

**Links from this pillar:**
- To: /blog/moving-checklist-brampton
- To: /blog/how-to-pack-for-a-move
- To: /blog/how-many-moving-bins-do-i-need
- To: /blog/moving-totes-vs-cardboard-boxes
- To: /blog/eco-friendly-moving-plastic-bins
- To: totemove.ca/ (CTA)
- To: totemove.ca/brampton, /mississauga, /georgetown, /bolton (via neighbourhood section)

**Schema:** Article + HowTo + BreadcrumbList

### Opportunity 2: City Pages as Sub-Pillars (MEDIUM PRIORITY)

Each city page already targets one city. These pages can be upgraded to function as sub-pillars for local intent by adding:
- A "Moving resources for [City]" section with links to relevant blog posts
- A "Nearby areas we serve" section linking to neighbouring city pages

This converts the current orphan-like structure (city pages link nowhere except the homepage) into a proper hub-spoke network at the local level.

---

## Section 5: Cannibalization Analysis

### CONFIRMED CANNIBALIZATION: Two Comparison Posts

**Post 1** (`/blog/moving-totes-vs-cardboard-boxes`, June 13):
- H1: "Moving totes vs cardboard boxes: the real cost comparison"
- Angle: Cost data ($235 cardboard vs $189 tote rental), specific tables, 2-bedroom move
- Schema: Article only
- Strength: Specific numbers, credible first-party pricing, tight focus

**Post 2** (`/blog/plastic-bins-vs-cardboard-boxes-moving`, June 18):
- H1: "Are Plastic Bins Better Than Cardboard Boxes for Moving?"
- Angle: General comparison (durability, eco impact, weather), 5-question FAQPage schema
- Schema: Article + FAQPage
- Weakness: Overlaps cost territory already covered in Post 1, broader but shallower

**Shared keyword targets:** "plastic bins vs cardboard boxes", "moving bins vs cardboard boxes", "moving totes vs boxes", "reusable moving bins vs cardboard"

**Google sees both posts as targeting the same query.** With no internal cross-links between them and no explicit differentiation in the H1s, Search is likely to rank one and ignore the other — or rotate them unpredictably.

### Resolution Options

**Option A — Differentiate (recommended, lower effort):**
- Post 1: Keep as-is. It wins on cost specificity. Add `<link rel="canonical">` to itself.
- Post 2: Pivot H1 to "Why Plastic Moving Bins Hold Up Better Than Cardboard on Moving Day" — shift focus to durability, weather protection, load capacity. Remove any pricing language. Add a clear link to Post 1 at the top: "For the full cost breakdown, see [Moving Totes vs Cardboard Boxes: Real Cost Comparison]."
- Add reciprocal link from Post 1 to Post 2: "We also compared durability and weather performance in [our plastic bins vs cardboard guide]."

**Option B — Consolidate (better for long-term, higher effort):**
- Merge both posts into one comprehensive comparison post on the Post 1 URL.
- Add 301 redirect from Post 2 URL → Post 1 URL.
- Combined post covers cost + durability + eco + weather + FAQ schema.
- Target word count: 2,000–2,500 words.

**Recommendation:** Option A in the short term (can be done this week without content creation), Option B once the site has established traffic to protect.

---

## Section 6: Top 10 Blog Topics by Traffic Potential

Ranked by estimated CA search volume × local relevance × conversion proximity:

| Rank | Topic | Primary Keyword | Intent | Est. Difficulty | Conversion Value |
|---|---|---|---|---|---|
| 1 | Moving Checklist Brampton 2026 | moving checklist Brampton | Informational | Low-Medium | High |
| 2 | How Many Moving Bins Do I Need | how many moving boxes do I need | Info → Commercial | Low | Very High |
| 3 | How to Pack for a Move (Room by Room) | how to pack for a move | Informational | Medium | Medium-High |
| 4 | Moving to Brampton Neighbourhood Guide | moving to Brampton | Informational | Medium | High |
| 5 | Eco-Friendly Moving (plastic bins vs cardboard) | eco-friendly moving | Info/Commercial | Low | Medium |
| 6 | Moving Cost Calculator Brampton 2026 | how much does a move cost Brampton | Commercial | Medium | Very High |
| 7 | Moving Mistakes to Avoid (GTA focus) | moving mistakes | Informational | Low | Low |
| 8 | How to Pack Fragile Items Without Cardboard | how to pack fragile items for moving | Informational | Low | Medium |
| 9 | When to Book Your Move (Timeline Guide) | when to book a moving company | Informational | Low | Medium-High |
| 10 | Moving With Pets in Brampton | moving with pets tips | Informational | Very Low | Low |

**Notes:**
- Rank 1 and 2 are the highest-conversion posts because they capture people who are actively planning a move (Rank 1) and about to decide on container type (Rank 2). Both have clear paths to booking.
- Rank 6 (cost calculator) has the highest per-visitor conversion value but medium keyword difficulty due to moving company competition on "cost" queries.
- Ranks 7–10 are low-difficulty entries that build topical authority and support E-E-A-T signals without direct conversion.

---

## Section 7: Next 5 Blog Posts — Content Calendar

### Post 1 (Publish Week 2)

**Title:** "How Many Moving Bins Do I Need? A Guide by Home Size (With ToteMove Package Matcher)"
**URL:** `/blog/how-many-moving-bins-do-i-need`
**Primary keyword:** how many moving boxes do I need
**Secondary keywords:** how many moving bins, moving box calculator, bins for 2 bedroom move, bins for 1 bedroom move
**Intent:** Informational → Commercial
**Word count:** 1,200–1,500 words
**Template:** HowTo schema + FAQ schema + data table
**Why this first:** The top 10 organic results for this query are weak (Angi, generic movers, U-Haul). ToteMove has a uniquely credible answer because it can give exact bin counts per package (Studio = $119 / 2-bed = $189 / 3-bed = $299+). This post converts directly — every "how many bins" question ends with "and here's how to rent exactly that many."
**Conversion path:** Article → "Book your package" CTA (using package anchors from homepage)
**Internal links out:**
- totemove.ca/ (main CTA, mention all 3 packages)
- /blog/moving-totes-vs-cardboard-boxes (cost comparison anchor)
- /blog/how-to-pack-for-a-move (packing tips anchor)
**Internal links in (pages that should link here):**
- Homepage FAQ section: "How many bins do I need?" → link to this post
- brampton.html, mississauga.html: sidebar/section "Not sure how many bins you need? Use our guide"
- blog/moving-checklist-brampton: link from the "packing supplies" checklist item

### Post 2 (Publish Week 3)

**Title:** "The Complete Moving Checklist for Brampton, ON (2026 Edition)"
**URL:** `/blog/moving-checklist-brampton`
**Primary keyword:** moving checklist Brampton
**Secondary keywords:** moving checklist Ontario, moving to Brampton checklist, Brampton moving day guide, moving to do list GTA
**Intent:** Informational
**Word count:** 1,500–2,000 words
**Template:** Article schema + HowTo schema (step-by-step) + BreadcrumbList
**Why this second:** High search volume, low local competition (most checklists are from national movers with no Brampton-specific data). Brampton-specific elements (Peel Region utilities, Brampton Transit changes, Peel District School Board transfer timing) make this genuinely more useful than generic guides. Naturally becomes the Cluster D pillar.
**Conversion path:** Downloadable checklist (PDF or inline) → booking CTA
**Internal links out:**
- totemove.ca/ (rental CTA for moving supplies section)
- /blog/how-many-moving-bins-do-i-need (packing supplies item)
- /blog/how-to-pack-for-a-move (packing section)
- totemove.ca/brampton ("if you're moving within Brampton, check our local delivery details")
- totemove.ca/mississauga (same, for Mississauga readers)
**Internal links in:**
- brampton.html: "Plan your move with our Brampton moving checklist →"
- mississauga.html, bolton.html, caledon.html: same CTA
- blog/moving-guide-brampton-gta pillar: links here as "Checklist" section
- blog/how-to-pack-for-a-move: links here as "Get the full checklist"
- All city pages: footer or sidebar CTA

### Post 3 (Publish Week 4)

**Title:** "How to Pack for a Move: A Room-by-Room Guide for GTA Renters"
**URL:** `/blog/how-to-pack-for-a-move`
**Primary keyword:** how to pack for a move
**Secondary keywords:** packing tips for moving, how to pack a bedroom for moving, room by room packing guide, how to pack fast for a move
**Intent:** Informational
**Word count:** 1,500–1,800 words
**Template:** Article schema + HowTo schema
**Angle:** Written from the perspective of plastic bin users — "with totes you skip tape, here's how that changes the process." Each room section naturally flows into a "how many bins for this room" sub-answer, linking to Post 1.
**Conversion path:** In-article CTA after Kitchen section ("Most people need 8–10 bins for the kitchen alone. See our full size guide →")
**Internal links out:**
- /blog/how-many-moving-bins-do-i-need
- /blog/moving-checklist-brampton
- /blog/moving-totes-vs-cardboard-boxes
- totemove.ca/ (final CTA)
**Internal links in:**
- /blog/moving-checklist-brampton: "Packing supplies" section → "See our full packing guide"
- /blog/how-many-moving-bins-do-i-need: natural reference
- blog/moving-guide-brampton-gta: pillar links here
- Homepage FAQ: "Any packing tips?" → link to this post

### Post 4 (Publish Week 5)

**Title:** "Moving to Brampton: A Complete Neighbourhood Guide for 2026"
**URL:** `/blog/moving-to-brampton-neighbourhood-guide`
**Primary keyword:** moving to Brampton
**Secondary keywords:** best neighbourhoods in Brampton, Brampton areas to live 2026, Brampton guide for families, North vs South Brampton
**Intent:** Informational
**Word count:** 2,000–2,500 words
**Template:** Article schema + BreadcrumbList + LocalBusiness mention
**Angle:** Covers the main Brampton districts (Mount Pleasant, Springdale, Heart Lake, Bramalea, Credit Valley, Downtown, Castlemore) with brief notes on commute, schools, housing price range, and typical home size — which feeds naturally into "how many bins for this home type." This post builds local authority and links naturally to ALL city pages.
**Conversion path:** Each neighbourhood section ends with "ToteMove delivers to this area — [Book your rental]"
**Internal links out:**
- totemove.ca/brampton (primary CTA throughout)
- totemove.ca/mississauga (southern Brampton readers often border Mississauga)
- totemove.ca/caledon, /bolton, /georgetown (readers moving just outside Brampton)
- /blog/moving-checklist-brampton
- /blog/how-many-moving-bins-do-i-need
**Internal links in:**
- brampton.html: "New to Brampton? Read our neighbourhood guide →"
- /blog/moving-checklist-brampton: intro section "New to Brampton?"
- blog/moving-guide-brampton-gta: local context section links here

### Post 5 (Publish Week 6)

**Title:** "Eco-Friendly Moving: Why Renting Plastic Bins Beats Buying Cardboard Boxes"
**URL:** `/blog/eco-friendly-moving-plastic-bins`
**Primary keyword:** eco-friendly moving
**Secondary keywords:** sustainable moving alternatives, eco-friendly moving boxes, green moving tips, reduce moving waste, reusable moving bins environment
**Intent:** Informational/Commercial
**Word count:** 1,200–1,500 words
**Template:** Article schema + FAQ schema
**Angle:** Quantified environmental argument (cardboard lifecycle, one-use waste, number of moves per tote). ToteMove states totes survive 400+ moves — calculate the cardboard saved. Include a comparison with Frogbox and EasyBoxed to show ToteMove's local advantage.
**Conversion path:** Bottom CTA: "Book an eco-friendly move in Brampton →"
**Internal links out:**
- /blog/moving-totes-vs-cardboard-boxes (cost angle complement)
- /blog/plastic-bins-vs-cardboard-boxes-moving (durability angle complement, after pivot)
- totemove.ca/ (CTA)
**Internal links in:**
- /blog/moving-totes-vs-cardboard-boxes: "For the environmental case, see [eco-friendly moving guide]"
- /blog/plastic-bins-vs-cardboard-boxes-moving: similar cross-link
- blog/moving-guide-brampton-gta: sustainability section

---

## Section 8: Internal Link Matrix

### Legend
- **M** = Mandatory (missing = structural problem)
- **R** = Recommended (high link equity value)
- **O** = Optional (topical relevance)

### Homepage Link Flows

| Source | Target | Type | Status | Anchor Text Suggestion |
|---|---|---|---|---|
| totemove.ca/ | /brampton | M | Existing (locations) | "Brampton" |
| totemove.ca/ | /mississauga | M | Existing | "Mississauga" |
| totemove.ca/ | /bolton | M | Existing | "Bolton" |
| totemove.ca/ | /georgetown | M | Existing | "Georgetown" |
| totemove.ca/ | /orangeville | M | Existing | "Orangeville" |
| totemove.ca/ | /acton | M | Existing | "Acton" |
| totemove.ca/ | /caledon | M | Existing | "Caledon" |
| totemove.ca/ | /erin | M | Existing | "Erin" |
| totemove.ca/ | /halton-hills | M | Existing | "Halton Hills" |
| totemove.ca/ | /hillsburgh | M | Existing | "Hillsburgh" |
| totemove.ca/ | /blog | R | CHECK | "Moving tips & guides" |
| totemove.ca/ FAQ | /blog/how-many-moving-bins-do-i-need | R | MISSING | "See our bin count guide" |
| totemove.ca/ FAQ | /blog/how-to-pack-for-a-move | R | MISSING | "Packing tips guide" |

### City Pages → Blog Posts (ALL MISSING — HIGH PRIORITY)

All 10 city pages should add a "Moving Resources" section with at minimum these two links:

| Source (all city pages) | Target | Type | Anchor Text Suggestion |
|---|---|---|---|
| /brampton, /mississauga, etc. | /blog/moving-checklist-brampton | R | "Moving checklist for [City]" |
| /brampton, /mississauga, etc. | /blog/how-many-moving-bins-do-i-need | R | "How many bins do you need?" |
| /brampton, /mississauga, etc. | /blog/how-to-pack-for-a-move | O | "Packing tips" |

Additionally, the Brampton page specifically should add:
- → /blog/moving-to-brampton-neighbourhood-guide (R): "Explore Brampton neighbourhoods"

### Blog Post Link Matrix (Full)

| Source | Target | Type | Anchor Text Suggestion |
|---|---|---|---|
| /blog/moving-totes-vs-cardboard-boxes | totemove.ca/ | M | "Book your tote rental" |
| /blog/moving-totes-vs-cardboard-boxes | /blog/plastic-bins-vs-cardboard-boxes-moving | R | "We also compared durability and weather performance" |
| /blog/moving-totes-vs-cardboard-boxes | /blog/eco-friendly-moving-plastic-bins | R | "The environmental case for plastic bins" |
| /blog/plastic-bins-vs-cardboard-boxes-moving | totemove.ca/ | M | "Book Now" |
| /blog/plastic-bins-vs-cardboard-boxes-moving | /blog/moving-totes-vs-cardboard-boxes | M | "See the full cost breakdown" |
| /blog/plastic-bins-vs-cardboard-boxes-moving | /blog/eco-friendly-moving-plastic-bins | R | "Read our eco-friendly moving guide" |
| /blog/how-many-moving-bins-do-i-need | totemove.ca/ | M | "Book your package" |
| /blog/how-many-moving-bins-do-i-need | /blog/how-to-pack-for-a-move | R | "Packing guide" |
| /blog/how-many-moving-bins-do-i-need | /blog/moving-totes-vs-cardboard-boxes | O | "Cost comparison" |
| /blog/moving-checklist-brampton | totemove.ca/ | M | "Rent your moving bins" |
| /blog/moving-checklist-brampton | /blog/how-many-moving-bins-do-i-need | R | "How many bins do I need?" |
| /blog/moving-checklist-brampton | /blog/how-to-pack-for-a-move | R | "Full packing guide" |
| /blog/moving-checklist-brampton | totemove.ca/brampton | R | "ToteMove Brampton delivery" |
| /blog/how-to-pack-for-a-move | /blog/how-many-moving-bins-do-i-need | M | "How many bins per room?" |
| /blog/how-to-pack-for-a-move | /blog/moving-checklist-brampton | R | "Get the full moving checklist" |
| /blog/how-to-pack-for-a-move | /blog/moving-totes-vs-cardboard-boxes | R | "Why totes are easier to pack" |
| /blog/how-to-pack-for-a-move | totemove.ca/ | M | "Book your rental" |
| /blog/moving-to-brampton-neighbourhood-guide | totemove.ca/brampton | M | "ToteMove delivers to Brampton" |
| /blog/moving-to-brampton-neighbourhood-guide | /blog/moving-checklist-brampton | R | "Brampton moving checklist" |
| /blog/moving-to-brampton-neighbourhood-guide | /blog/how-many-moving-bins-do-i-need | R | "How many bins for your home?" |
| /blog/moving-to-brampton-neighbourhood-guide | totemove.ca/mississauga | O | "Mississauga service area" |
| /blog/moving-to-brampton-neighbourhood-guide | totemove.ca/caledon | O | "Caledon service area" |
| /blog/eco-friendly-moving-plastic-bins | totemove.ca/ | M | "Book an eco-friendly move" |
| /blog/eco-friendly-moving-plastic-bins | /blog/moving-totes-vs-cardboard-boxes | R | "Cost comparison" |
| /blog/eco-friendly-moving-plastic-bins | /blog/plastic-bins-vs-cardboard-boxes-moving | R | "Durability comparison" |

### Incoming Link Count per Post (Validation)

| Post | Incoming Links | Meets 3+ Minimum |
|---|---|---|
| /blog/moving-totes-vs-cardboard-boxes | Homepage FAQ + blog index + plastic-bins post + eco post + packing post = 5+ | YES |
| /blog/plastic-bins-vs-cardboard-boxes-moving | Homepage FAQ + blog index + totes post + eco post + checklist post = 5+ | YES |
| /blog/how-many-moving-bins-do-i-need | Homepage FAQ + all city pages + checklist + packing post = 14+ | YES |
| /blog/moving-checklist-brampton | 10 city pages + packing post + bins post + neighbourhood post = 13+ | YES |
| /blog/how-to-pack-for-a-move | Homepage FAQ + city pages + checklist + bins post = 12+ | YES |
| /blog/moving-to-brampton-neighbourhood-guide | brampton.html + checklist post + guide pillar = 3 | YES (at minimum) |
| /blog/eco-friendly-moving-plastic-bins | totes post + plastic-bins post + guide pillar = 3 | YES (at minimum) |

No orphan pages in the planned architecture.

---

## Section 9: Validation Checklist

- [x] No two posts share the same primary keyword
- [x] Every spoke has at least 3 incoming internal links planned
- [x] Every spoke links to the pillar (homepage or blog checklist post)
- [x] Pillar (homepage) links to every city spoke via locations section
- [x] Blog pillar (checklist post) links to all Cluster D spokes
- [x] No orphan pages in the link matrix
- [x] Template selection matches intent (HowTo for guides, Article+FAQ for comparisons)
- [x] Word count targets: pillar blog = 2,000–2,500 words; spokes = 1,200–1,800 words
- [x] Total cluster size: 2 clusters (C + D), 3 posts each (within 2–5 cluster, 2–4 posts constraint)
- [x] SERP overlap data supports groupings: no spoke with <4 overlap to cluster peers
- [ ] CANNIBALIZATION: Two existing comparison posts need differentiation (Option A or B — not yet resolved)
- [ ] City pages currently have zero outbound links to blog content (add "Moving Resources" section)

---

## Section 10: Immediate Action Items (Priority Order)

### This Week (Pre-Launch Critical)
1. **Differentiate the two comparison posts** (Option A): Pivot Post 2 H1 to durability angle, add cross-links between both posts. ~2 hours.
2. **Add internal links from existing posts to homepage**: Both posts link to `/#booking` via CTA but verify anchor text is specific ("Book your tote rental in Brampton" beats "Book Now" for context).
3. **Add "Moving Resources" section to brampton.html and mississauga.html**: 2–3 links to existing blog posts. Use a simple `<div class="blog-links">` in the footer area.

### Week 2–3 (Content Creation)
4. Write and publish **Post 1: How Many Moving Bins Do I Need** (highest conversion value)
5. Write and publish **Post 2: Moving Checklist Brampton** (highest traffic potential)
6. After both are live, add cross-links from all 10 city pages

### Week 4–6
7. Write and publish Posts 3–5 per calendar above
8. Begin drafting the **Informational Mega-Pillar** (3,000–4,000 words)

### Month 3+
9. Upgrade city pages to full sub-pillars with neighbourhood sections
10. Pursue local schema markup for each city page (LocalBusiness with `areaServed` already exists — add `Review` aggregation as reviews come in)

---

## Appendix: Structured Cluster Data (JSON-Compatible)

```json
{
  "site": "totemove.ca",
  "analyzed": "2026-07-26",
  "clusters": [
    {
      "id": "cluster-a",
      "name": "Core Service",
      "type": "transactional",
      "pillar_url": "https://totemove.ca/",
      "pillar_keyword": "moving bin rental Brampton",
      "spokes": [
        { "url": "https://totemove.ca/brampton", "keyword": "moving boxes Brampton", "status": "existing" },
        { "url": "https://totemove.ca/mississauga", "keyword": "moving tote rental Mississauga", "status": "existing" },
        { "url": "https://totemove.ca/bolton", "keyword": "moving bin rental Bolton", "status": "existing" },
        { "url": "https://totemove.ca/georgetown", "keyword": "moving bin rental Georgetown", "status": "existing" },
        { "url": "https://totemove.ca/orangeville", "keyword": "moving tote rental Orangeville", "status": "existing" },
        { "url": "https://totemove.ca/acton", "keyword": "moving bins near me Acton ON", "status": "existing" },
        { "url": "https://totemove.ca/caledon", "keyword": "moving bin rental Caledon", "status": "existing" },
        { "url": "https://totemove.ca/erin", "keyword": "moving bin rental Erin ON", "status": "existing" },
        { "url": "https://totemove.ca/halton-hills", "keyword": "moving bin rental Halton Hills", "status": "existing" },
        { "url": "https://totemove.ca/hillsburgh", "keyword": "moving tote rental Hillsburgh", "status": "existing" }
      ]
    },
    {
      "id": "cluster-c",
      "name": "Comparison and Eco",
      "type": "informational-commercial",
      "pillar_url": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes",
      "pillar_keyword": "moving totes vs cardboard boxes",
      "spokes": [
        {
          "url": "https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving",
          "keyword": "plastic bins vs cardboard boxes moving",
          "status": "existing",
          "issue": "cannibalization",
          "action": "pivot-h1-to-durability"
        },
        {
          "url": "https://totemove.ca/blog/eco-friendly-moving-plastic-bins",
          "keyword": "eco-friendly moving",
          "status": "to-create",
          "priority": 5,
          "publish_week": 6
        }
      ]
    },
    {
      "id": "cluster-d",
      "name": "How-to and Guidance",
      "type": "informational",
      "pillar_url": "https://totemove.ca/blog/moving-checklist-brampton",
      "pillar_keyword": "moving checklist Brampton",
      "spokes": [
        {
          "url": "https://totemove.ca/blog/how-many-moving-bins-do-i-need",
          "keyword": "how many moving boxes do I need",
          "status": "to-create",
          "priority": 1,
          "publish_week": 2
        },
        {
          "url": "https://totemove.ca/blog/moving-checklist-brampton",
          "keyword": "moving checklist Brampton",
          "status": "to-create",
          "priority": 2,
          "publish_week": 3
        },
        {
          "url": "https://totemove.ca/blog/how-to-pack-for-a-move",
          "keyword": "how to pack for a move",
          "status": "to-create",
          "priority": 3,
          "publish_week": 4
        }
      ]
    },
    {
      "id": "cluster-e",
      "name": "Local Authority",
      "type": "informational-local",
      "pillar_url": "https://totemove.ca/blog/moving-guide-brampton-gta",
      "pillar_keyword": "moving guide Brampton GTA",
      "spokes": [
        {
          "url": "https://totemove.ca/blog/moving-to-brampton-neighbourhood-guide",
          "keyword": "moving to Brampton",
          "status": "to-create",
          "priority": 4,
          "publish_week": 5
        }
      ]
    }
  ],
  "cannibalization_flags": [
    {
      "post_1": "/blog/moving-totes-vs-cardboard-boxes",
      "post_2": "/blog/plastic-bins-vs-cardboard-boxes-moving",
      "severity": "high",
      "shared_keywords": ["moving bins vs cardboard boxes", "plastic bins vs cardboard", "moving totes vs boxes"],
      "resolution": "differentiate-h1-angles"
    }
  ],
  "pillar_page_opportunity": {
    "url": "https://totemove.ca/blog/moving-guide-brampton-gta",
    "title": "The Complete Moving Guide for Brampton and the GTA (2026)",
    "word_count_target": "3000-4000",
    "priority": "medium",
    "publish_after_spokes": true
  }
}
```
