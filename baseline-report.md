# Baseline Performance Audit

## Environment & Tooling
- Built the static site with `npm run build` to capture the production output Eleventy generates for Cloudflare Pages.
- Attempted to run Lighthouse (mobile preset) locally via `npx lighthouse`, but the npm registry is blocked in this environment (HTTP 403), so automated field data could not be collected.
- WebPageTest and PageSpeed Insights also require external network access, which is unavailable here; these runs are noted as blocked for transparency.

## Home page (`/`)
- **Likely LCP element:** the hero slider uses full-viewport background images on `.slide-bg` elements, so the first slide background (`images/praya.jpg`) is the primary render blocker for Largest Contentful Paint.【F:src/pages/index-home.njk†L13-L68】
- **Heavy media:** five hero backgrounds exceed 5 MB each; for example `images/cyano.jpg` is ~13.9 MB and `images/praya.jpg` is ~8.9 MB.【289f48†L1-L10】【25931f†L1-L4】
- **CSS/JS bytes:** the page loads `styles-home.css` (49.6 KB) plus shared styles (12.9 KB), along with `script-home.js` (9.0 KB) and the shared script bundle (6.6 KB).【64db5d†L1-L11】【559885†L1-L10】
- **CLS risks:** all inline `<img>` tags below the fold render without intrinsic dimensions, so browser layout shifts are likely once large gallery assets download.【F:src/pages/index-home.njk†L169-L219】
- **Third parties:** Google Fonts and Font Awesome CSS each add additional render-blocking requests in the `<head>`.【F:src/_includes/layouts/base.njk†L7-L17】

## Praya detail page (`/praya/`)
- **Likely LCP element:** the hero `<img src="/images/praya-hero.jpg">` sits at the top of the document and is the first large element rendered.【F:src/pages/praya.njk†L13-L18】
- **Heavy media:** the page reuses multiple >9 MB JPEGs in galleries and floor plans (e.g., `praya-apt-02.jpg` at ~13.5 MB, `praya-leisure-09.jpg` at ~10.4 MB).【289f48†L1-L10】
- **CLS risks:** dozens of gallery images render without width/height constraints, amplifying layout shifts during load.【F:src/pages/praya.njk†L96-L204】
- **JS payload:** `script-praya.js` (~6 KB) augments the large shared script bundle (6.6 KB).【559885†L1-L10】

## Litoral guide page (`/litoral-do-parana/`)
- **Likely LCP element:** the parallax hero relies on a 200 vh background image (`/images/praya-leisure-12.jpg`), so this asset dominates initial paint time.【F:src/pages/litoral-do-parana.njk†L9-L39】【F:public/styles-litoral.css†L40-L58】
- **Inline media:** the first visible inline `<img>` (`/images/praya-hero.jpg`) lacks fixed dimensions and loads eagerly, potentially shifting content in the “Conheça Matinhos” section.【F:src/pages/litoral-do-parana.njk†L47-L75】
- **Supporting assets:** the template ships a dedicated stylesheet (`styles-litoral.css`, 11.4 KB) plus shared CSS and JavaScript bundles, matching the homepage dependencies.【64db5d†L1-L11】【559885†L1-L10】

## Cross-cutting findings
- **Total media weight:** raw assets under `public/images/` consume ~220 MB; the ten largest JPEGs range from 9 MB to 14 MB each, overwhelming bandwidth budgets for mobile visitors.【6df213†L1-L2】【289f48†L1-L10】
- **Lack of responsive formats:** all templates link directly to static JPEGs without WebP/AVIF fallbacks or size-specific variants, forcing every client to download the original high-resolution sources.【F:src/pages/index.njk†L38-L129】
- **Caching headers:** Cloudflare Pages defaults to short-lived caching; there is no `_headers` file to mark static assets (`*.css`, `*.js`, `/images/*`) as immutable, leaving CDN performance on the table.【F:public/shared-components.css†L1-L40】
- **Build output:** Eleventy copies every raw image into `_site/` without processing, so the production build inherits the heavy files noted above.【7b2398†L1-L10】

## Blocked measurements
- **Lighthouse:** `npx lighthouse` → npm registry returned HTTP 403, preventing installation of the CLI in this environment.【95cb08†L1-L6】
- **WebPageTest:** remote execution requires external network access, which is unavailable here.
- **PageSpeed Insights:** same restriction as WebPageTest; cannot reach Google’s API endpoints from this container.
