# AGENTS.md — ejohnguia.github.io

Personal portfolio site (static HTML/CSS) deployed to GitHub Pages via GitHub Actions.

## Commands

**Local dev:**
```bash
python3 -m http.server 8000
# or
npx serve .
```

**Deploy:** Push to `main` branch — GitHub Pages' branch deployment runs automatically. The repository workflow is manual-only.

**Custom domain:** Configure the domain in repository Settings → Pages and add a valid `CNAME` file at the site root if needed.

## Structure

```
├── index.html      # Main page (semantic HTML, JSON-LD Person schema)
├── style.css       # Light 'ledger' theme (cream/teal), CSS Grid/Flexbox, CSS variables in :root
├── .github/workflows/deploy.yml  # GitHub Pages deploy workflow
└── assets/         # Static assets (icons, images, manifest)
```

## Stack

- Vanilla HTML/CSS — **no build step**
- Fonts: Archivo and IBM Plex Sans (Google Fonts), system monospace
- Light "ledger" theme (cream/teal), CSS variables in `:root`, CSS Grid/Flexbox layout
- JSON-LD Person schema for SEO
- `prefers-reduced-motion` support, accessible nav

## Deploy

- Trigger: GitHub Pages branch deployment on pushes to `main`; the repository workflow is manual-only
- Uses `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- GitHub Pages source: `main` branch

## Customization

- Content: edit `index.html` (semantic HTML, JSON-LD schema in `<head>`)
- Design tokens: edit CSS variables in `style.css:1` (`:root`)
- Custom domain: configure GitHub Pages settings and include a valid `CNAME` file at the site root