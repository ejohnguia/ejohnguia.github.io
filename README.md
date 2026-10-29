# Ezra John Guia — GitHub Platform Consultant

Personal portfolio/resume site deployed to GitHub Pages.

## Live Site

[https://ejohnguia.github.io](https://ejohnguia.github.io)

## Stack

- **HTML/CSS** — Vanilla, no build step
- **Fonts** — Archivo and IBM Plex Sans (Google Fonts), system monospace
- **Deployment** — GitHub Pages via GitHub Actions

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000`

## Deploy to GitHub Pages

1. Push to `main` branch
2. GitHub Actions workflow builds and deploys automatically
3. Configure Pages source: **GitHub Actions** (not `gh-pages` branch)

### Custom domain (optional)

Set the domain in the repository's **Settings → Pages** and include a valid `CNAME` file in the site root before deploying. No Actions secret is required.

## Project Structure

```
├── index.html      # Main page (semantic HTML, JSON-LD schema)
├── style.css       # Light 'ledger' theme (cream/teal), responsive grid, CSS variables
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Pages deployment
└── README.md
```

## Features

- Responsive light/dark theme (ledger design) with CSS Grid/Flexbox
- Mobile hamburger navigation (accessible, keyboard support)
- Selected experience metrics and a responsive experience timeline
- Skills grouped by GitHub/CI/CD, cloud, infrastructure, platform tooling, and languages
- Certifications with verified Credly/Microsoft links
- JSON-LD Person schema for SEO
- `prefers-reduced-motion` support
- Print-friendly résumé layout
- All external links: `rel="noopener noreferrer"`

## Customization

Edit `index.html` for content, `style.css` for design tokens (colors in `:root`).

### Brand assets

- `assets/icons/workflow-master.png` and `assets/images/og-background.png` are the original supplied artwork; keep them unchanged.
- `assets/icons/workflow-mark.svg` is the clean, transparent vector version of the full pipeline mark. The master PNG has a baked-in checkerboard, not an alpha channel.
- `assets/icons/favicon.svg`, its 16/32px PNG fallbacks, and the monochrome Safari pinned-tab SVG use the same six-lane geometry as `workflow-mark.svg`. The SVG favicon changes teal with the browser's color scheme.
- The header uses `workflow-mark.svg` as a silhouette with the site's selected theme color. Touch and manifest icons use the same full mark on cream.
- Favicon, touch-icon, manifest, social-image, and stylesheet URLs use a `v` query parameter to refresh cached assets when the branding changes. Update manifest icon URLs along with the manifest link when replacing those icons.
- `assets/images/og-image.png` is the 1200×630 social preview, composed from the supplied background, clean mark, and typeset name and title.

## License

MIT — feel free to fork and adapt.