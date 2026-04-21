# conorsvensson.com

Personal site built with [Astro](https://astro.build/). TypeScript, MDX, content collections, RSS, sitemap, dual-theme Shiki syntax highlighting.

## Local development

```sh
npm install
npm run dev
```

Preview the production build locally:

```sh
npm run build
npm run preview
```

## Writing posts

Posts live in `src/content/writing/` as `.md` or `.mdx`. Each post requires frontmatter:

```yaml
---
title: "Post title"
description: "One-line summary used for OG/Twitter cards and the feed."
date: 2026-04-21
tags: ["agents", "web3"]
draft: false
---
```

Drafts (`draft: true`) are excluded from the site, the writing index, and the RSS feed.

- Feed: `/feed.xml` (full post content)
- Sitemap: `/sitemap.xml`

## Deploying to Cloudflare Pages

The site is a static build. Two options:

**Option A — Git integration (recommended)**

Connect the repo in the Cloudflare Pages dashboard with:

- Build command: `npm run build`
- Build output directory: `dist`

**Option B — Direct upload via Wrangler**

```sh
npm run build
npx wrangler pages deploy
```

`wrangler.toml` points to `./dist`, so no extra flags are needed. On first run, Wrangler will prompt you to create the Pages project.

## TODOs

Search the repo for `TODO` — you'll also find these called out:

- `src/consts.ts` — set `BUTTONDOWN_USERNAME` to your Buttondown username.
- `src/pages/index.astro` — tighten the home intro paragraph.
- `src/pages/about.astro` — refine the bio paragraph and confirm the contact email.
- `public/og-default.svg` — replace with a 1200×630 PNG for best social-card rendering (some platforms don't embed SVG reliably).
