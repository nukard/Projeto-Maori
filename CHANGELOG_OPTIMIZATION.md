# Optimization Changelog

## Summary
- Added a build-time Nunjucks shortcode that injects intrinsic dimensions, lazy-loading, and async decoding for every JPEG/PNG image while keeping hero media eager when needed.
- Updated header and footer templates to reuse the shortcode so all decorative imagery ships with width/height metadata and fetch priorities.
- Introduced a Cloudflare Pages `_headers` file that marks CSS, JS, SVG, and image assets as immutable and enables quick revalidation for HTML.
- Documented the initial performance audit and queued follow-up work that requires external tooling (responsive image generation, critical CSS, automated Lighthouse runs).

## Metrics
Automated Lighthouse/WebPageTest runs were blocked by the sandbox’s network restrictions, so quantitative deltas are unavailable. Qualitative gains include:

- CLS risk reduction from intrinsic `width`/`height` on 60+ gallery and hero images.
- Lower initial bandwidth pressure thanks to native `loading="lazy"` on non-critical imagery.
- Repeat-view improvements from long-lived CDN caching hints for static assets.

## Risk & Rollback
- The new `image` shortcode only touches build output; removing it and reverting the template changes will restore the previous markup if any regression appears.
- The caching headers live in `public/_headers`; deleting the file is sufficient to roll back CDN behavior.
- No business logic or client-side scripts were modified, and `npm run build` passes with the updated configuration.
