# Sitemap Audit — totemove.ca

**Audit date**: 2026-07-26  
**Source**: `sitemap.xml` from local codebase (deployed to Cloudflare Pages)  
**Sitemap URL**: https://totemove.ca/sitemap.xml

---

## Validation Checklist

| Check | Status | Notes |
|-------|--------|-------|
| XML well-formed | PASS | Valid XML 1.0, correct sitemaps namespace |
| URL count (≤50,000) | PASS | 14 URLs — no sitemap index needed |
| All HTML pages covered | PASS | 14 HTML files map to 14 sitemap entries |
| No noindex pages in sitemap | PASS | All pages carry `index, follow`; no `X-Robots-Tag: noindex` in `_headers` |
| Canonical URLs match sitemap locs | PASS | Every checked page's canonical matches its sitemap `<loc>` exactly |
| Trailing-slash consistency | PASS | Home only carries trailing slash; consistent with canonicals |
| robots.txt Sitemap directive | PASS | `Sitemap: https://totemove.ca/sitemap.xml` is present |
| Google verification file excluded | PASS | `google8f81e81c15b8c92a.html` is absent from sitemap |
| Sitemap index file | NOT NEEDED | 14 URLs — threshold is 50,000 |
| Location page quality gate | PASS | 10 city pages — below the 30-page warning threshold |
| `priority` tags | FAIL | Present on all 14 entries; Google has ignored this tag since 2019 |
| `changefreq` tags | FAIL | Present on all 14 entries; Google has ignored this tag since 2019 |
| `lastmod` accuracy | FAIL | See detail below — most dates are 34–70 days stale |

---

## Sitemap Contents vs. Codebase

### URL inventory (actual sitemap.xml — 14 URLs)

| URL | lastmod in sitemap | Last git change | Gap |
|-----|-------------------|----------------|-----|
| `https://totemove.ca/` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/brampton` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/mississauga` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/caledon` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/georgetown` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/halton-hills` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/acton` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/hillsburgh` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/erin` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/orangeville` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/bolton` | 2026-05-17 | 2026-07-23 | 67 days stale |
| `https://totemove.ca/blog` | 2026-06-18 | 2026-06-18 | ACCURATE |
| `https://totemove.ca/blog/moving-totes-vs-cardboard-boxes` | 2026-06-13 | 2026-07-23 | 40 days stale |
| `https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving` | 2026-06-18 | 2026-07-23 | 35 days stale |

Significant changes that should have updated lastmod but did not:
- `2026-07-22`: Tote dimensions corrected to 24×20×12 inches across all pages and blog posts (factual content change)
- `2026-07-22`: Rental period changed from 7-day to 14-day across all pages (pricing change)
- `2026-07-23`: Navigation phone number added to all pages
- `2026-07-23`: "Reserve" buttons changed to "Book Now" across all pages and blog posts
- `2026-07-23`: Booking form updated (7-day option removed, 14-day promoted to standard)
- `2026-07-23`: FAQ drop-off answer updated

### Coverage gaps

**Pages in filesystem but missing from sitemap**: None.

**Pages in sitemap but not in filesystem**: None.

**Orphan pages**: None detected.

---

## Discrepancy vs. Task Brief

The task brief stated "11 city pages" and listed a total of 14 URLs while omitting the second blog post. The actual sitemap contains:

- 1 home page
- **10 city pages** (not 11 as stated in brief)
- 1 blog index
- **2 blog posts** (the brief listed only 1; `/blog/plastic-bins-vs-cardboard-boxes-moving` was not mentioned)

The URL total of 14 is correct, but the composition differs from the brief. The local `sitemap.xml` is the authoritative source; the brief description contained an error.

---

## Issue Detail

### FAIL — Stale lastmod dates (High priority)

**All 11 home + city pages** carry `2026-05-17`. Multiple significant content changes occurred in July 2026 — including corrected tote dimensions, repriced rental periods, a new booking form field, and navigation changes — none of which triggered a sitemap update. Google uses lastmod as a crawl-budget hint. Persistent staleness reduces the signal value and can deprioritize recrawl of updated content.

**Recommended correction**: Update all home and city page entries to `2026-07-23`. Update both blog post entries to `2026-07-23`. Leave `/blog` at `2026-06-18` (accurate — no changes to the blog index since that date).

### FAIL — Deprecated tags present (Low priority)

All 14 entries include `<changefreq>` and `<priority>`. Google publicly confirmed it ignores both tags. Bing also ignores `priority`. They add ~30% to sitemap file size with no indexing benefit.

Entries should use only `<loc>` and `<lastmod>`:

```xml
<url>
  <loc>https://totemove.ca/brampton</loc>
  <lastmod>2026-07-23</lastmod>
</url>
```

### INFO — blog changefreq=weekly is aspirational

`/blog` is set to `changefreq=weekly`. The blog has 2 posts published over a 5-week span (June 13 to June 18, 2026). Since Google ignores `changefreq`, this has no functional consequence, but it illustrates why the tag provides no signal value.

### CANNOT VERIFY — Google Search Console submission

Sitemap submission to Google Search Console cannot be confirmed from the codebase. Verify at: Search Console > Sitemaps > submit `https://totemove.ca/sitemap.xml`. The Google verification file (`google8f81e81c15b8c92a.html`) is present and deployed, confirming site ownership is established.

---

## Recommended sitemap.xml

Replace the current file with the following. All deprecated tags removed, all lastmod values corrected.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://totemove.ca/</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/brampton</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/mississauga</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/caledon</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/georgetown</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/halton-hills</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/acton</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/hillsburgh</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/erin</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/orangeville</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/bolton</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/blog</loc>
    <lastmod>2026-06-18</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/blog/moving-totes-vs-cardboard-boxes</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
  <url>
    <loc>https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving</loc>
    <lastmod>2026-07-23</lastmod>
  </url>
</urlset>
```

---

## Structured Findings (for audit-data.json)

```json
{
  "category": "Sitemap",
  "url": "https://totemove.ca/sitemap.xml",
  "audit_date": "2026-07-26",
  "total_urls": 14,
  "checks": [
    { "id": "xml_valid", "status": "pass", "label": "XML well-formed" },
    { "id": "url_count", "status": "pass", "label": "URL count ≤50,000", "value": 14 },
    { "id": "coverage", "status": "pass", "label": "All HTML pages in sitemap" },
    { "id": "no_noindex", "status": "pass", "label": "No noindex pages in sitemap" },
    { "id": "canonical_match", "status": "pass", "label": "Sitemap locs match canonical tags" },
    { "id": "robots_directive", "status": "pass", "label": "Sitemap referenced in robots.txt" },
    { "id": "verification_excluded", "status": "pass", "label": "Google verification file excluded" },
    { "id": "location_gate", "status": "pass", "label": "Location page quality gate (10 pages, threshold 30)" },
    {
      "id": "lastmod_accuracy",
      "status": "fail",
      "severity": "high",
      "label": "lastmod dates reflect last significant change",
      "detail": "12 of 14 URLs have stale lastmod. Home + 10 city pages show 2026-05-17; last significant change was 2026-07-23. Two blog posts show 2026-06-13 and 2026-06-18 respectively; both were last changed 2026-07-23."
    },
    {
      "id": "deprecated_tags",
      "status": "fail",
      "severity": "low",
      "label": "No deprecated tags (priority, changefreq)",
      "detail": "All 14 entries include priority and changefreq. Both are ignored by Google."
    }
  ],
  "orphan_pages": [],
  "sitemap_only_urls": [],
  "action_items": [
    {
      "priority": "high",
      "action": "Update lastmod for all home and city pages to 2026-07-23",
      "file": "sitemap.xml"
    },
    {
      "priority": "high",
      "action": "Update lastmod for /blog/moving-totes-vs-cardboard-boxes and /blog/plastic-bins-vs-cardboard-boxes-moving to 2026-07-23",
      "file": "sitemap.xml"
    },
    {
      "priority": "low",
      "action": "Remove all priority and changefreq tags from sitemap.xml",
      "file": "sitemap.xml"
    },
    {
      "priority": "medium",
      "action": "Verify sitemap submitted in Google Search Console",
      "file": null
    }
  ]
}
```
