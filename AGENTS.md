# AGENTS.md — ejohnguia.github.io

Personal portfolio site (static HTML/CSS) deployed from the `main` branch to GitHub Pages.

## Commands

**Local dev:**
```bash
python3 -m http.server 8000
# or
npx serve .
```

**Checks:** Node.js 22 and Python 3; run `npm ci`, `npx playwright install chromium`, then `npm test`. Node.js dependencies are development-only.

**Deploy:** Push to `main` branch — GitHub Pages' branch deployment runs automatically. The repository workflow validates the site; it does not deploy.

**Custom domain:** Configure the domain in repository Settings → Pages and add a valid `CNAME` file at the site root if needed.

## Structure

```
├── index.html      # Main page (semantic HTML, JSON-LD Person schema)
├── style.css       # Editorial light/dark theme, CSS Grid/Flexbox, CSS variables in :root
├── .github/workflows/validate.yml  # HTML and browser checks
├── tests/          # Playwright checks
└── assets/         # Static assets (icons, images, manifest)
```

## Stack

- Vanilla HTML/CSS — **no build step**
- Fonts: Archivo and IBM Plex Sans (Google Fonts), system monospace
- Editorial light/dark theme, CSS variables in `:root`, CSS Grid/Flexbox layout
- Base CSS precedes responsive overrides; print overrides come last
- `.wrap` controls horizontal gutters only; section rules own vertical spacing
- JSON-LD Person schema for SEO
- `prefers-reduced-motion` support, accessible nav

## Deploy

- Trigger: GitHub Pages branch deployment on pushes to `main`
- GitHub Pages source: `main` branch, `/ (root)`
- Validation runs on pushes to `main` and pull requests with `contents: read`

## Customization

- Content: edit `index.html` (semantic HTML, JSON-LD schema in `<head>`)
- Design tokens: edit CSS variables in `style.css:1` (`:root`)
- Custom domain: configure GitHub Pages settings and include a valid `CNAME` file at the site root