# Optimization Plan

## Ready to implement safely

1. **Register a reusable image shortcode that injects intrinsic dimensions**  
   *Change:* Extend `.eleventy.js` with a synchronous helper that inspects JPEG/PNG headers (no extra npm packages) and emits `<img>` tags with `width`, `height`, `decoding="async"`, and `loading="lazy"` by default, while allowing explicit overrides for hero assets. Update Nunjucks templates to call the shortcode instead of hard-coded `<img>` tags.  
   *Expected impact:* Establishes intrinsic aspect ratios to suppress layout shifts (CLS) and enables native lazy loading for non-critical media, cutting early network contention on gallery-heavy pages.  
   *Safety:* Pure server-side rendering change—markup and CSS classes stay identical, scripts keep working, and the helper guards missing metadata to avoid build failures.

2. **Ship Cloudflare Pages caching hints via `_headers`**  
   *Change:* Add a passthrough `_headers` file with long-lived `Cache-Control` for CSS/JS/images (`max-age=31536000, immutable`) and a short TTL for HTML.  
   *Expected impact:* Ensures static assets are cached aggressively at the CDN edge, reducing repeat-visit latency without altering site behavior.  
   *Safety:* Configuration-only; can be rolled back by deleting the file.

## Proposed (requires tooling or further validation)

- **Adopt `@11ty/eleventy-img` for responsive AVIF/WebP output**  
  Blocked in this environment because the npm registry returns HTTP 403, so the dependency cannot be installed. Once available, this would drastically shrink hero and gallery payloads while retaining JPEG fallbacks.

- **Re-encode legacy JPEG backgrounds**  
  Large background assets (5–14 MB) should be recompressed to modern formats and served via `image-set(...)`. This needs an image processing toolchain (e.g., Sharp, Squoosh CLI) that is not currently accessible.

- **Critical CSS extraction + deferred main bundle**  
  After measuring with Lighthouse, inline the above-the-fold rules for the homepage and move the remaining CSS to a deferred stylesheet to unblock rendering. Requires tooling support (Lightning CSS or similar) to avoid manual regressions.

- **Automated Lighthouse/WebPageTest regression tracking**  
  Network restrictions prevented collecting a true baseline. Once external access is available, integrate scripted Lighthouse runs in CI to quantify improvements and guard against regressions.
