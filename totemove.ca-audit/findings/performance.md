# Performance & Core Web Vitals — totemove.ca

Audit date: 2026-07-26  
Source: Static codebase analysis + curl measurements + Cloudflare response headers  
Note: PageSpeed Insights API returned 429 (quota exhausted); no CrUX field data available; no prior traffic volume sufficient to generate a CrUX origin record.

---

## Measured Baseline (curl, lab conditions)

| Measurement | Value | Assessment |
|---|---|---|
| TTFB (cold, Cloudflare edge) | 170 ms | Good (<200 ms) |
| Total HTML transfer time | 213 ms | Good |
| HTML payload | 29.7 KB | Good |
| CF-Cache-Status | HIT | Edge cache active |
| Protocol | HTTP/1.1 (H3 advertised via alt-svc) | OK |

---

## Estimated Core Web Vitals

These are derived from static analysis. Field data (CrUX) would be required for a definitive pass/fail against Google's 75th-percentile threshold.

| Metric | Estimated Value | Threshold | Status |
|---|---|---|---|
| LCP | 3.5 – 5.5 s (mobile) | ≤2.5 s | FAIL — Needs Improvement to Poor |
| CLS | ~0.0 | ≤0.1 | PASS — Excellent |
| INP | ~70 – 100 ms | ≤200 ms | PASS — Excellent |

### LCP rationale

The LCP element is `outside-totes.png` (hero image, above the fold, `loading="eager"`). Its download chain under a 4G mobile connection (approximately 10 Mbps, 40 ms RTT) is:

1. HTML TTFB: ~170 ms
2. style.css download: ~30–50 ms
3. CSS `@import` → Google Fonts CSS request (new round trip): ~80–120 ms
4. Hero image discovery and download: 1.1 MB at 10 Mbps ≈ 880 ms
5. Decode + render: ~50–100 ms

Estimated mobile LCP: **~3.5–5.5 s** — fails "Good" threshold.

Desktop (fast connection, Cloudflare edge near user): LCP likely 0.8–1.5 s, which passes.

### CLS rationale

All three images (`outside-totes.png`, `garage.png`, `totemove-logo.png`) have explicit `width` and `height` attributes. No ads, no dynamically injected content above the fold at load time, no web fonts causing layout reflow (fonts use `display=swap`, text is rendered in fallback first). CLS is expected to be near zero.

### INP rationale

`main.js` is 5 KB, loads with `defer`, and only performs: hamburger toggle, smooth scroll, city button toggle, and form validation. No synchronous blocking operations, no heavy third-party scripts at interaction time. INP is expected to be well within the Good threshold.

---

## Issues Found

### 1. Hero image too large — PRIMARY LCP CAUSE (Critical)

`outside-totes.png` is **1.1 MB** as a PNG. This is the page's LCP element (above the fold, `loading="eager"`, 600×520 declared dimensions).

- No WebP or AVIF variant exists
- No `<link rel="preload" as="image">` in the `<head>` — browser must discover the image only after parsing the `<img>` tag, which is delayed behind CSS and font downloads
- Expected savings: WebP at quality 80 ≈ 180–280 KB (75–85% reduction); AVIF ≈ 100–180 KB
- Impact: This single fix likely saves 800 ms – 2 s on mobile LCP

### 2. Google Fonts loaded via CSS @import — render-blocking chain (High)

Line 1 of `style.css`:
```
@import url("https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap");
```

This creates a serial waterfall on the critical path:
- HTML downloads → style.css downloads → @import triggers a second network request to fonts.googleapis.com → font WOFF2 files download
- Each hop adds a full network RTT before the next step starts
- The `preconnect` hints in `<head>` (fonts.googleapis.com, fonts.gstatic.com) partially help by pre-resolving DNS, but cannot eliminate the cascaded requests

Three font families with 10 weight/style combinations are requested: Antonio (3), Nunito (4), JetBrains Mono (3). Each weight is a separate file.

Impact on LCP: adds ~120–200 ms of render-blocking latency on mobile.

### 3. No preload hint for LCP image (High)

There is no `<link rel="preload" as="image" href="outside-totes.png">` in `<head>`. The browser cannot begin downloading the hero image until it parses the `<img>` tag in the body, which is delayed by CSS and font download. A preload hint lets the image download begin in parallel with CSS.

### 4. Secondary images also oversized PNG (Medium)

| Image | Size | Usage | Loading |
|---|---|---|---|
| `outside-totes.png` | 1.1 MB | Hero (LCP) | eager |
| `garage.png` | 1.7 MB | Stat block, below fold | lazy |
| `totemove-logo.png` | 931 KB | Header (160×44) and footer (48×48) | eager (header), lazy (footer) |

`totemove-logo.png` is displayed at 160×44 px maximum. Serving a 931 KB PNG for a 160 px logo is extremely wasteful — SVG would be ideal (likely <5 KB), or WebP at 160 px wide would be ~8–15 KB.

### 5. Image cache headers missing for main images (Medium)

The `_headers` file sets `Cache-Control: public, max-age=31536000, immutable` for `/logo.png` and `/logo.webp`, but has no explicit rules for:
- `/outside-totes.png`
- `/garage.png`
- `/totemove-logo.png`

Cloudflare Pages will apply its own edge TTL for these, but browser-level caching (Cache-Control to the client) is not guaranteed to be long-lived without explicit rules. Repeat visitors may re-download large PNG files.

### 6. Three Google Font families — consider subsetting (Low)

Antonio, Nunito, and JetBrains Mono together download approximately 10 font weight files. Consider:
- Dropping JetBrains Mono if only used for small UI elements (substitute `ui-monospace` from the OS)
- Using `text=` URL parameter to subset fonts to only characters used on the page
- Self-hosting the two fonts actually used for rendering critical text (reduces external round trips to zero)

### 7. Potential CSP conflict with Google Fonts (Investigate)

The enforced CSP is:
```
style-src 'self' 'unsafe-inline'
```

The `@import` in `style.css` requests a stylesheet from `https://fonts.googleapis.com`. Under `style-src 'self'`, cross-origin stylesheets are blocked unless the source is explicitly listed. The font WOFF2 files from `fonts.gstatic.com` additionally require a `font-src` directive (absent from the CSP, so falls back to `default-src 'self'`, blocking them).

If the CSP is enforced in the browser, Google Fonts may be silently blocked and the page falls back to system fonts. This would actually improve performance but should be a deliberate decision, not a silent failure. Test in Chrome DevTools console for CSP violations.

---

## What Is Working Well

- TTFB 170 ms: Cloudflare CDN edge is serving HTML very quickly
- Cache-Control for CSS and JS: `max-age=31536000, immutable` is correct
- `main.js` has `defer`: not render-blocking
- Cloudflare Analytics beacon has `defer`: not render-blocking
- All images have explicit `width` and `height` attributes: CLS prevention is solid
- `garage.png` (below fold) uses `loading="lazy"`: correct
- `preconnect` hints for `fonts.googleapis.com` and `fonts.gstatic.com` exist
- No Google Analytics or heavy third-party tag managers
- Minimal JavaScript (5 KB, vanilla)
- No layout-shifting ad units or injected third-party embeds
- HTML document is clean and semantic

---

## Prioritized Recommendations

### Priority 1 — Convert and compress hero image (Expected LCP improvement: 1–2.5 s)

Generate WebP and AVIF versions of `outside-totes.png` and serve them via `<picture>`:

```html
<picture>
  <source srcset="outside-totes.avif" type="image/avif" />
  <source srcset="outside-totes.webp" type="image/webp" />
  <img src="outside-totes.png" alt="Stacked moving totes ready for delivery"
       width="600" height="520" loading="eager" />
</picture>
```

Target: WebP ≤ 250 KB, AVIF ≤ 150 KB. Use `cwebp -q 82` or Squoosh.

### Priority 2 — Add `<link rel="preload">` for hero image (Expected: 100–300 ms LCP improvement)

Insert in `<head>` before the stylesheet link:

```html
<link rel="preload" as="image" href="outside-totes.avif"
      imagesrcset="outside-totes.avif" type="image/avif" />
```

Or for broadest support, preload the WebP:

```html
<link rel="preload" as="image" href="outside-totes.webp" />
```

### Priority 3 — Fix Google Fonts loading strategy (Expected: 80–200 ms LCP improvement)

Remove the `@import` from the top of `style.css`. Move the Google Fonts link to the HTML `<head>` as a non-blocking load:

```html
<!-- In <head>, after preconnects -->
<link rel="preload"
      href="https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" />
</noscript>
```

This loads fonts asynchronously. If you also add the Google Fonts URL to `style-src` in the CSP, font rendering will match the design intent:

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
```

### Priority 4 — Convert and compress remaining images

```
garage.png (1.7 MB)        → garage.webp (~300 KB), garage.avif (~200 KB)
totemove-logo.png (931 KB) → totemove-logo.svg (<5 KB ideal) or totemove-logo.webp (at 160px: ~10 KB)
```

Apply the same `<picture>` pattern for `garage.png`.

For the logo, SVG is strongly preferred — it is resolution-independent and would reduce the logo from 931 KB to typically 3–8 KB.

### Priority 5 — Add image cache headers to `_headers`

```
/outside-totes.png
  Cache-Control: public, max-age=31536000, immutable

/outside-totes.webp
  Cache-Control: public, max-age=31536000, immutable

/outside-totes.avif
  Cache-Control: public, max-age=31536000, immutable

/garage.png
  Cache-Control: public, max-age=31536000, immutable

/garage.webp
  Cache-Control: public, max-age=31536000, immutable

/garage.avif
  Cache-Control: public, max-age=31536000, immutable

/totemove-logo.png
  Cache-Control: public, max-age=31536000, immutable

/totemove-logo.webp
  Cache-Control: public, max-age=31536000, immutable
```

When changing image content, rename the file (e.g., `outside-totes-v2.webp`) to bust the cache.

---

## Projected Outcome After Fixes

| Metric | Before | After Priorities 1–3 | Assessment |
|---|---|---|---|
| LCP (mobile) | ~3.5–5.5 s | ~1.2–2.2 s | Good |
| CLS | ~0.0 | ~0.0 | Good |
| INP | ~70–100 ms | ~70–100 ms | Good |
| Total image weight | ~3.7 MB | ~500–700 KB | 85% reduction |
| Performance score (est.) | ~55–65 mobile | ~85–95 mobile | Significant improvement |

---

## Files Reviewed

- `index.html` — image attributes, loading hints, script placement, preconnect hints
- `style.css` — font import strategy, no layout-shift-causing rules found
- `main.js` — defer confirmed, lightweight vanilla JS only
- `_headers` — cache rules for HTML/CSS/JS/logo; images missing
- curl HEAD request — TTFB, response headers, cache status
- File system — image file sizes confirmed
