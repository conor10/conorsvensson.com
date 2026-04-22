# conorsvensson.com

Personal site built with [Astro](https://astro.build/). TypeScript, MDX, content collections, RSS, sitemap, dual-theme Shiki syntax highlighting. Deployed to GitHub Pages at [conorsvensson.com](https://conorsvensson.com).

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

In `dev` mode, draft posts are visible so you can iterate on them. They're excluded from `build` (and therefore from the live site, sitemap, and feed).

## Writing posts

Posts live in `src/content/writing/` as a folder per post. To add a new one:

1. Create a folder named `YYYY-MM-DD-post-slug/`, e.g. `src/content/writing/2026-04-22-context-windows/`.
2. Add an `index.md` inside it with frontmatter (see below).
3. Drop any images into the same folder and reference them with a relative path, e.g. `![alt](./diagram.png)`. Astro processes them through the image pipeline automatically (resize, format conversion, content-hashed URL).

The date prefix on the folder name is for filesystem ordering only. It's stripped to produce the URL — `2026-04-22-context-windows/` becomes `/writing/context-windows/`. Posts are sorted on the index by the `date` field in frontmatter, not by folder name.

### Frontmatter

```yaml
---
title: "Post title"
date: 2026-04-22
description: "One-line summary used for OG/Twitter cards and the feed."
tags: ["agents", "web3"]   # optional
draft: false               # optional, defaults to false
---
```

- `draft: true` hides the post from the production build (and the sitemap and feed), but it still renders in `npm run dev` so you can iterate.

### Feeds

- RSS feed (full post content): `/feed.xml`
- Sitemap: `/sitemap-index.xml`

Both regenerate on every build.

## Deploying

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`. No manual step needed.

## TODOs

- `public/og-default.svg` — consider replacing with a 1200×630 PNG for best social-card rendering (some platforms don't embed SVG reliably).
