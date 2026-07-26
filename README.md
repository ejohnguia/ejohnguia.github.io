# Ezra John Guia — Cloud Infrastructure & Platform Engineer

Personal portfolio/resume site deployed to GitHub Pages.

## Live Site

[https://ejohnguia.github.io](https://ejohnguia.github.io)

## Stack

- **HTML/CSS** — Vanilla, no build step
- **Fonts** — JetBrains Mono, IBM Plex Sans/Mono (via Google Fonts)
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

### Required Secrets (if using custom domain)

| Secret | Description |
|--------|-------------|
| `CNAME` | Custom domain (e.g., `ezrajohnguia.dev`) |

## Project Structure

```
├── index.html      # Main page (semantic HTML, JSON-LD schema)
├── style.css       # Dark theme, responsive grid, CSS variables
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Pages deployment
├── CNAME           # Optional: custom domain
└── README.md
```

## Features

- Responsive dark theme with CSS Grid/Flexbox
- Mobile hamburger navigation (accessible, keyboard support)
- Key metrics strip summarizing career impact (see live site for current figures)
- Experience timeline with pipeline visual
- Skills grid (Cloud, IaC/GitOps, AI Tooling, Programming Languages)
- Certifications with verified Credly/Microsoft links
- JSON-LD Person schema for SEO
- `prefers-reduced-motion` support
- All external links: `rel="noopener noreferrer"`

## Customization

Edit `index.html` for content, `style.css` for design tokens (colors in `:root`).

## License

MIT — feel free to fork and adapt.