# Post citations

Every article rendered with `PostLayout` ends with a **Cite this post** section. The readable citation and expandable BibTeX entry are generated from the shared author constant, article title, original publication date, and canonical production URL. No per-post configuration or plugin is needed.

Both formats have copy buttons with accessible success/failure feedback. Without JavaScript, the citation text and native BibTeX disclosure remain available for manual copying. If browser clipboard access is unavailable or denied, the buttons explain that manual copying is needed.

BibTeX uses `@misc` for a blog post, protects title capitalisation, and escapes TeX special characters. Its citation key combines the author's surname, publication year, and URL slug, so editing a title does not change the key. Publication dates are formatted in UTC to avoid build-time timezone differences.

The component's styles are scoped and use the site's existing light/dark theme variables. It sits outside the image gallery and appears only on articles, not index or advisory pages.

Run the tests with `node --test tests/*.test.mjs` and check the rendered site with `npm run build`.
