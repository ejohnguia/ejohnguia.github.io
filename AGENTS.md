# AGENTS.md — ejohnguia.github.io

Personal portfolio site (static HTML/CSS) deployed to GitHub Pages via GitHub Actions.

## Commands

**Local dev:**
```bash
python3 -m http.server 8000
# or
npx serve .
```

**Deploy:** Push to `main` branch — GitHub Actions deploys automatically to GitHub Pages.

**Required secret for custom domain:** `CNAME` (e.g., `ezrajohnguia.dev`)

## Structure

```
├── index.html      # Main page (semantic HTML, JSON-LD Person schema)
├── style.css       # Dark theme, CSS Grid/Flexbox, CSS variables in :root
├── .github/workflows/deploy.yml  # GitHub Pages deploy workflow
├── CNAME           # Optional custom domain (gitignored, set via secret)
└── assets/         # Static assets (icons, images, manifest)
```

## Stack

- Vanilla HTML/CSS — **no build step**
- Fonts: JetBrains Mono, IBM Plex Sans/Mono (Google Fonts)
- Dark theme, CSS variables in `:root`, CSS Grid/Flexbox layout
- JSON-LD Person schema for SEO
- `prefers-reduced-motion` support, accessible nav

## Deploy

- Trigger: push to `main` or manual workflow dispatch
- Uses `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- GitHub Pages source: **GitHub Actions** (not `gh-pages` branch)

## Customization

- Content: edit `index.html` (semantic HTML, JSON-LD schema in `<head>`)
- Design tokens: edit CSS variables in `style.css:1` (`:root`)
- Custom domain: add `CNAME` secret in GitHub repo settings (value: `yourdomain.com`)