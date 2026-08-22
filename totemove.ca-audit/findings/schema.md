# Schema.org Structured Data Audit — ToteMove (totemove.ca)

**Audit date**: 2026-07-26  
**Business**: ToteMove — moving bin/tote rental, Brampton ON, service area business, pre-launch  
**Pages audited**: 4  
- `index.html` (homepage)  
- `blog/index.html` (blog listing)  
- `blog/moving-totes-vs-cardboard-boxes.html`  
- `blog/plastic-bins-vs-cardboard-boxes-moving.html`

---

## Severity key

- **CRITICAL** — Blocks rich result eligibility or violates Google guidelines
- **WARNING** — Reduces rich result quality or introduces validation errors
- **INFO** — Best practice gap; no immediate SERP impact
- **POLICY** — Schema type / feature retired or deprecated by Google
- **OPPORTUNITY** — Missing schema that would add SERP or entity value

---

## 1. Homepage — `index.html`

### 1a. LocalBusiness block

**Syntax validation**: PASS — valid JSON-LD, no syntax errors.  
**@context**: PASS — `https://schema.org` (correct, with https).  
**@type**: PASS — `LocalBusiness` is the correct type (see Q2 analysis below).

#### Issues found

**WARNING — `logo` is a plain URL string, not an ImageObject**

Google's guidelines require `logo` to be an `ImageObject` for Organization and LocalBusiness. A plain string URL is parsed but is lower-fidelity for entity disambiguation.

Current:
```json
"logo": "https://totemove.ca/logo.png"
```

Fix:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://totemove.ca/logo.png",
  "width": 160,
  "height": 44
}
```

Same fix applies to `image` property.

---

**WARNING — Missing `@id`**

`@id` is not required by Google's validators but is strongly recommended for linked data integrity. It allows other schema blocks (e.g., Article publisher) to reference the same entity using `@id` rather than repeating all properties.

Add at the top of the LocalBusiness block:
```json
"@id": "https://totemove.ca/#business"
```

---

**WARNING — Missing `sameAs`**

No social or GBP profiles linked. The footer contains a GBP review link (`https://g.page/r/CciR1pUMHVUHEBM/review`) but this is the review write URL, not the GBP listing page. Use the canonical GBP listing URL for `sameAs`.

Add when profiles are confirmed:
```json
"sameAs": [
  "https://www.google.com/maps?cid=YOUR_GBP_CID",
  "https://www.instagram.com/totemove",
  "https://www.facebook.com/totemove"
]
```

To find the GBP listing URL: go to your Google Business Profile dashboard, click "View on Maps," and copy the URL (it will contain a CID or place ID). Do not use the review link.

---

**INFO — Missing `geo` coordinates**

For a service area business without a public storefront, `geo` is optional but contributes to local ranking signals. The FAQ mentions "Mayfield & Hurontario" as the base location.

When a confirmed business address or operating latitude/longitude is available:
```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 43.7519,
  "longitude": -79.7624
}
```

(Coordinates above are approximate for the Mayfield/Hurontario intersection — confirm exact values before deploying.)

---

**INFO — `address` has no `streetAddress` or `postalCode`**

Acceptable for a service area business with no public storefront. No fix required. If a business PO box or suite address is obtained, add `streetAddress` and `postalCode`.

---

**INFO — `openingHoursSpecification` is a single object, not an array**

A single `OpeningHoursSpecification` object is technically valid per spec. An array is the safer form when deploying across validators. No breaking issue.

Optional refactor:
```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }
]
```

---

**OPPORTUNITY — Add `serviceArea` alongside `areaServed`**

`areaServed` with city objects is valid but `serviceArea` with a `GeoShape` polygon or `GeoCircle` gives Google more precise geographic targeting for service area businesses. Both can coexist.

Minimum viable addition:
```json
"serviceArea": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": 43.7315,
    "longitude": -79.7624
  },
  "geoRadius": "60000"
}
```

(60 km radius from central Brampton covers all 8 served cities. Refine as needed.)

---

**OPPORTUNITY — Missing `aggregateRating` (pre-launch)**

No reviews exist yet. Do not add `aggregateRating` with fabricated data — this violates Google's guidelines and can result in a manual penalty. Add once genuine reviews are collected post-launch.

Future implementation:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "1",
  "bestRating": "5",
  "worstRating": "1"
}
```

---

#### Complete corrected LocalBusiness block

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://totemove.ca/#business",
  "name": "ToteMove",
  "description": "Moving bin, tote, and plastic box rentals in Brampton and surrounding area. Industrial-strength reusable plastic moving bins, totes, and boxes with dolly included. Flat-rate pricing from $119.",
  "url": "https://totemove.ca",
  "telephone": "+14168450290",
  "email": "hello@totemove.ca",
  "logo": {
    "@type": "ImageObject",
    "url": "https://totemove.ca/totemove-logo.png",
    "width": 160,
    "height": 44
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://totemove.ca/outside-totes.png",
    "width": 600,
    "height": 520
  },
  "priceRange": "$119-$389",
  "currenciesAccepted": "CAD",
  "paymentAccepted": "Cash, Credit Card, E-Transfer",
  "areaServed": [
    {"@type": "City", "name": "Brampton"},
    {"@type": "City", "name": "Bolton"},
    {"@type": "City", "name": "Georgetown"},
    {"@type": "City", "name": "Orangeville"},
    {"@type": "City", "name": "Mississauga"},
    {"@type": "City", "name": "Acton"},
    {"@type": "City", "name": "Caledon"},
    {"@type": "City", "name": "Erin"}
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 43.7315,
      "longitude": -79.7624
    },
    "geoRadius": "60000"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brampton",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tote Rental Packages",
    "itemListElement": [
      {"@type": "Offer", "name": "Studio / 1-Bedroom Package", "price": "119", "priceCurrency": "CAD"},
      {"@type": "Offer", "name": "1 Bedroom Plus Package", "price": "149", "priceCurrency": "CAD"},
      {"@type": "Offer", "name": "2-Bedroom Package", "price": "189", "priceCurrency": "CAD"},
      {"@type": "Offer", "name": "3-Bedroom Package", "price": "229", "priceCurrency": "CAD"},
      {"@type": "Offer", "name": "4-Bedroom Package", "price": "299", "priceCurrency": "CAD"},
      {"@type": "Offer", "name": "5-Bedroom Package", "price": "389", "priceCurrency": "CAD"}
    ]
  },
  "sameAs": [
    "REPLACE_WITH_GBP_LISTING_URL",
    "REPLACE_WITH_INSTAGRAM_URL"
  ]
}
```

---

### 1b. FAQPage block (7 questions)

**Syntax validation**: PASS — valid JSON-LD.

#### Issues found

**POLICY — FAQ rich results retired by Google (May 7, 2026)**

Google retired FAQ rich results for all websites on May 7, 2026. As of the audit date (2026-07-26), this has already taken effect. The FAQPage schema produces no SERP feature (no expandable FAQ panel in search results).

Priority: **INFO** (not Critical). The markup itself is not harmful and may have unconfirmed value for AI/GEO visibility in tools like Gemini or ChatGPT that consume structured data. Removing it is optional; keeping it does no damage but yields no confirmed SERP benefit.

---

**WARNING — Schema FAQ and HTML FAQ are out of sync**

The FAQPage schema contains 7 questions. The visible HTML FAQ section contains 8 questions. The sets do not match:

| Question | In schema | In HTML |
|---|---|---|
| How many days before my move do you drop off? | YES | YES |
| How strong are the totes really? | YES | YES |
| What sizes are the totes? | YES | YES |
| Do you deliver everywhere in the area? | YES | **NO** |
| What's the difference between a moving tote and a moving bin? | YES | YES |
| Are plastic moving bins better than cardboard boxes? | YES | YES |
| Are your totes the same as plastic moving boxes? | YES | YES |
| Do you deliver on weekends? | **NO** | YES |
| Do I need to be home for delivery or pickup? | **NO** | YES |

Google's guidelines state that schema content must match visible page content. The schema contains a question ("Do you deliver everywhere in the area?") that does not appear in the visible HTML. This is a guideline violation.

Fix: Either remove the FAQPage block entirely (recommended given policy status), or sync the schema to exactly match the 8 HTML questions, removing "Do you deliver everywhere in the area?" and adding the two missing questions.

---

#### Corrected FAQPage block (if keeping)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many days before my move do you drop off?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "7 days before your move date — giving you a full week to pack before and a full week to unpack after."
      }
    },
    {
      "@type": "Question",
      "name": "How strong are the totes really?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Heavy-duty plastic. They don't sag, they don't rip, and hold up to 60 lbs."
      }
    },
    {
      "@type": "Question",
      "name": "What sizes are the totes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24 × 20 × 12 inches, gray plastic, with attached flat lids. They stack like Tetris in your truck."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver on weekends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we deliver and pick up 7 days a week, including weekends and holidays. Weekend dates do fill up faster, so we recommend reserving yours early."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be home for delivery or pickup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. Many customers leave instructions for a safe drop-off location. We coordinate with you in advance to make delivery and pickup as convenient as possible."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between a moving tote and a moving bin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They're the same thing — we use the terms interchangeably. A moving tote or moving bin is a reusable, stackable plastic container used instead of cardboard boxes. Ours measure 24 × 20 × 12 inches and hold up to 60 lbs each."
      }
    },
    {
      "@type": "Question",
      "name": "Are plastic moving bins better than cardboard boxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most moves, yes. Plastic moving bins are stronger, waterproof, and uniform in size — making them easier to stack in a truck. They don't collapse under weight, nothing needs taping, and there's nothing to break down or recycle afterward. You also skip the 12 trips to Home Depot."
      }
    },
    {
      "@type": "Question",
      "name": "Are your totes the same as plastic moving boxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basically yes. Our totes are reusable plastic moving boxes — they hold the same things cardboard moving boxes do, but snap shut without tape, won't collapse under weight, and get reused 400+ times instead of heading to the recycling bin after one move."
      }
    }
  ]
}
```

---

### 1c. Missing: WebSite schema

**OPPORTUNITY** — The homepage has no WebSite schema. Adding it establishes the site as a named entity and enables Google to display a sitelinks box.

Note: The site is a static landing page with no search functionality. Omit `SearchAction`.

Add this block to `<head>` in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://totemove.ca/#website",
  "name": "ToteMove",
  "url": "https://totemove.ca",
  "description": "Reusable plastic moving bin and tote rentals delivered to your door across Brampton, Caledon, Georgetown, and surrounding area.",
  "publisher": {
    "@id": "https://totemove.ca/#business"
  },
  "inLanguage": "en-CA"
}
```

---

## 2. Blog index — `blog/index.html`

**Schema blocks found**: None.

**OPPORTUNITY** — Add a `CollectionPage` schema to identify this as a content index:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ToteMove Blog — Moving Tips & Guides",
  "description": "Moving tips, packing guides, and local moving advice for Brampton, Mississauga, and the GTA from ToteMove.",
  "url": "https://totemove.ca/blog",
  "publisher": {
    "@type": "Organization",
    "@id": "https://totemove.ca/#business"
  },
  "inLanguage": "en-CA"
}
```

---

## 3. Blog post 1 — `blog/moving-totes-vs-cardboard-boxes.html`

### Article block

**Syntax validation**: PASS — valid JSON-LD.  
**@context**: PASS.

#### Issues found

**CRITICAL — Missing `image` property**

Google requires `image` (as `ImageObject`) for Article rich results. Without it, the article is ineligible for article-type rich results including Top Stories. This is the most impactful fix on both blog posts.

Add:
```json
"image": {
  "@type": "ImageObject",
  "url": "https://totemove.ca/outside-totes.png",
  "width": 600,
  "height": 520
}
```

If a dedicated article hero image is created (recommended), use that URL instead.

---

**WARNING — `@type` should be `BlogPosting`, not `Article`**

`BlogPosting` is a direct subtype of `Article` and is the semantically correct type for blog content. Google supports both for Article rich results, but `BlogPosting` more precisely signals editorial blog content to crawlers and AI systems.

Change:
```json
"@type": "BlogPosting"
```

---

**WARNING — `publisher.logo` is a plain URL string, not an ImageObject**

Google requires `publisher.logo` to be an `ImageObject` for Article rich results. For articles, the logo must fit within a 600x60px bounding box.

Current:
```json
"logo": "https://totemove.ca/logo.png"
```

Fix:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://totemove.ca/totemove-logo.png",
  "width": 160,
  "height": 44
}
```

---

**WARNING — `mainEntityOfPage` is a plain URL string**

Google recommends `mainEntityOfPage` as a `WebPage` object, not a bare URL string.

Current:
```json
"mainEntityOfPage": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes"
```

Fix:
```json
"mainEntityOfPage": {
  "@type": "WebPage",
  "@id": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes"
}
```

---

**MISSING — BreadcrumbList**

No breadcrumb schema on either blog post. Breadcrumbs appear in Google search result snippets and provide a clear content hierarchy signal.

Add this block alongside the Article block:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://totemove.ca"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://totemove.ca/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Moving Totes vs Cardboard Boxes: The Real Cost Comparison",
      "item": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes"
    }
  ]
}
```

---

#### Complete corrected Article block — blog post 1

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Moving Totes vs Cardboard Boxes: The Real Cost Comparison",
  "description": "A 2-bedroom move in the GTA costs $235 in cardboard boxes vs $189 in tote rentals. Full breakdown including tape, dolly rental, and disposal.",
  "image": {
    "@type": "ImageObject",
    "url": "https://totemove.ca/outside-totes.png",
    "width": 600,
    "height": 520
  },
  "author": {
    "@type": "Person",
    "name": "Steven",
    "jobTitle": "Founder, ToteMove"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToteMove",
    "url": "https://totemove.ca",
    "logo": {
      "@type": "ImageObject",
      "url": "https://totemove.ca/totemove-logo.png",
      "width": 160,
      "height": 44
    }
  },
  "datePublished": "2026-06-13",
  "dateModified": "2026-06-13",
  "url": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes"
  }
}
```

---

## 4. Blog post 2 — `blog/plastic-bins-vs-cardboard-boxes-moving.html`

### Article block

Same CRITICAL and WARNING issues as Blog post 1:

- CRITICAL: Missing `image`
- WARNING: `@type` should be `BlogPosting`
- WARNING: `publisher.logo` should be `ImageObject`
- WARNING: `mainEntityOfPage` should be `WebPage` object
- MISSING: BreadcrumbList

**INFO — `keywords` property**

The Article block includes a `keywords` property. This is a valid Schema.org property but Google does not use it for rich result ranking. It has no SERP impact. Keeping it is harmless.

---

#### Complete corrected Article block — blog post 2

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Are Plastic Bins Better Than Cardboard Boxes for Moving?",
  "description": "Plastic bins vs cardboard boxes for moving. A straight comparison of durability, cost, and eco impact across every factor that matters on moving day.",
  "image": {
    "@type": "ImageObject",
    "url": "https://totemove.ca/outside-totes.png",
    "width": 600,
    "height": 520
  },
  "author": {
    "@type": "Person",
    "name": "Steven",
    "jobTitle": "Founder, ToteMove"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToteMove",
    "url": "https://totemove.ca",
    "logo": {
      "@type": "ImageObject",
      "url": "https://totemove.ca/totemove-logo.png",
      "width": 160,
      "height": 44
    }
  },
  "datePublished": "2026-06-18",
  "dateModified": "2026-06-18",
  "url": "https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving"
  }
}
```

---

### FAQPage block (plastic-bins blog post, 5 questions)

**Syntax validation**: PASS.  
**Schema-to-HTML match**: PASS — the 5 questions in the schema match the 5 visible `<details>` FAQ items on the page.

**POLICY — Same retirement as homepage FAQPage**: Google retired FAQ rich results May 7, 2026. No SERP benefit. Priority: INFO.

---

#### BreadcrumbList for blog post 2

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://totemove.ca"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://totemove.ca/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Are Plastic Bins Better Than Cardboard Boxes for Moving?",
      "item": "https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving"
    }
  ]
}
```

---

## 5. Specific question responses

### Q2 — LocalBusiness vs MovingCompany / HomeAndConstructionBusiness?

**Keep `LocalBusiness`.**

`MovingCompany` (Schema.org subtype of `LocalBusiness`) implies a company that physically moves customers' belongings. ToteMove does not perform moving labor — it rents containers. Using `MovingCompany` would misrepresent the business to Google's entity classification system and could create signal confusion in local search. `HomeAndConstructionBusiness` is also incorrect.

`LocalBusiness` is the accurate, correct type for a service area business in a product-rental vertical where no exact subtype exists.

---

### Q3 — aggregateRating

Do not add until genuine customer reviews exist post-launch. Adding fabricated or placeholder ratings violates Google's guidelines and risks a manual action. When reviews are live on GBP, Google will often pull the rating automatically. Adding explicit `aggregateRating` schema is valuable once you have 3+ verified reviews.

---

### Q4 — Geo coordinates

Recommended to add, particularly as the site grows and GBP signals are established. Approximate coordinates for the Mayfield/Hurontario operating area are: `43.7519, -79.7624`. Confirm exact coordinates before deploying.

---

### Q5 — sameAs

The GBP review link in the footer (`https://g.page/r/CciR1pUMHVUHEBM/review`) is a review write URL — not the GBP listing URL. Do not use this as `sameAs`. The canonical GBP listing URL can be found in the GBP dashboard under "View on Maps" or via the Maps short URL for the place. Add `sameAs` as an array including the GBP listing URL and any social profiles (Instagram, Facebook) once confirmed.

---

### Q6 — ServiceArea schema

Add `serviceArea` with `GeoCircle` as shown in the corrected LocalBusiness block above. This supplements `areaServed` city objects and provides a geographic radius signal useful for SAB ranking. Both can coexist.

---

### Q7 — Article vs BlogPosting

**Use `BlogPosting`** on all blog posts. It is a subtype of `Article`, is semantically more precise for editorial blog content, and Google supports it fully for Article rich results. The current `Article` type is not wrong but `BlogPosting` is the better fit.

---

### Q8 — BreadcrumbList

**Yes, add BreadcrumbList to all blog posts.** BreadcrumbList produces breadcrumb display in SERP snippets and reinforces site hierarchy for Googlebot. The blog index page also warrants a breadcrumb: `Home > Blog`. JSON-LD blocks are provided above for both blog posts.

---

### Q9 — WebSite schema

**Yes, add WebSite schema to the homepage.** It establishes a named entity link and enables the Google sitelinks search box (if the site adds search later). Since the site is a static landing page without a search endpoint, omit `SearchAction`. The block is provided above under section 1c.

---

### Q10 — FAQPage validity

**Homepage FAQPage**: 7 questions in schema vs 8 in HTML; one schema question ("Do you deliver everywhere in the area?") has no visible counterpart in the HTML — this violates Google's schema-to-page-content matching requirement. Google may ignore or penalize schema whose content is not present on the page. Given FAQ rich results are also retired (May 7, 2026), the recommended action is to remove the FAQPage block from the homepage. If keeping, sync to the 8 HTML questions using the corrected block in section 1b.

**Blog post 2 FAQPage**: Schema matches HTML content exactly — no mismatch. Policy issue only (retired).

---

### Q11 — Review schema, HowTo schema, Service schema

- **Review schema**: No reviews exist yet. Do not implement. Future opportunity.  
- **HowTo schema**: NOT recommended. Google removed HowTo rich results in September 2023. Implementing HowTo schema provides no SERP benefit.  
- **Service schema**: A good addition as the site grows. `Service` can describe the tote rental service with `serviceType`, `provider`, `areaServed`, and `offers`. Example:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Moving Bin Rental",
  "name": "Plastic Moving Tote Rental",
  "description": "Delivery of reusable plastic moving bins and totes with a dolly included, to residential customers in Brampton and surrounding area.",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://totemove.ca/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Brampton"},
    {"@type": "City", "name": "Caledon"},
    {"@type": "City", "name": "Georgetown"},
    {"@type": "City", "name": "Mississauga"},
    {"@type": "City", "name": "Bolton"},
    {"@type": "City", "name": "Acton"},
    {"@type": "City", "name": "Erin"},
    {"@type": "City", "name": "Orangeville"}
  ],
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "119",
    "highPrice": "389",
    "priceCurrency": "CAD"
  },
  "url": "https://totemove.ca/#packages"
}
```

---

## 6. Summary of all actions

| Priority | File | Issue | Action |
|---|---|---|---|
| CRITICAL | blog/moving-totes-vs-cardboard-boxes.html | Missing `image` in Article | Add ImageObject |
| CRITICAL | blog/plastic-bins-vs-cardboard-boxes-moving.html | Missing `image` in Article | Add ImageObject |
| WARNING | index.html | `logo` is plain URL string | Change to ImageObject |
| WARNING | index.html | Missing `@id` on LocalBusiness | Add `@id` |
| WARNING | index.html | FAQPage schema-to-HTML mismatch (phantom question) | Remove or sync FAQ |
| WARNING | blog/moving-totes-vs-cardboard-boxes.html | `@type` is Article | Change to BlogPosting |
| WARNING | blog/plastic-bins-vs-cardboard-boxes-moving.html | `@type` is Article | Change to BlogPosting |
| WARNING | blog/moving-totes-vs-cardboard-boxes.html | `publisher.logo` is plain URL | Change to ImageObject |
| WARNING | blog/plastic-bins-vs-cardboard-boxes-moving.html | `publisher.logo` is plain URL | Change to ImageObject |
| WARNING | blog/moving-totes-vs-cardboard-boxes.html | `mainEntityOfPage` is plain URL | Change to WebPage object |
| WARNING | blog/plastic-bins-vs-cardboard-boxes-moving.html | `mainEntityOfPage` is plain URL | Change to WebPage object |
| POLICY | index.html | FAQPage retired May 7 2026 | No SERP benefit; consider removing |
| POLICY | blog/plastic-bins-vs-cardboard-boxes-moving.html | FAQPage retired May 7 2026 | No SERP benefit; consider removing |
| INFO | index.html | Missing `sameAs` | Add once GBP and social URLs confirmed |
| INFO | index.html | Missing `geo` coordinates | Add when business address confirmed |
| OPPORTUNITY | index.html | Missing WebSite schema | Add WebSite block |
| OPPORTUNITY | index.html | Missing `serviceArea` | Add GeoCircle |
| OPPORTUNITY | blog/moving-totes-vs-cardboard-boxes.html | Missing BreadcrumbList | Add block |
| OPPORTUNITY | blog/plastic-bins-vs-cardboard-boxes-moving.html | Missing BreadcrumbList | Add block |
| OPPORTUNITY | blog/index.html | No schema at all | Add CollectionPage |
| OPPORTUNITY | index.html | aggregateRating | Add post-launch when reviews exist |
| OPPORTUNITY | index.html | Service schema | Add for richer entity representation |
