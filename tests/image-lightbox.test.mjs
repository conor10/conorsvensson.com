import assert from 'node:assert/strict';
import test from 'node:test';
import { linkPostImages } from '../src/utils/image-lightbox.mjs';

test('adds a full-size fallback and dimensions to each resolved post image', () => {
  const first = '<img src="/_astro/review.webp" width="1331" height="1149" alt="Review &amp; findings">';
  const second = '<img src="https://example.com/chart.png?x=1&amp;y=2" width="800" height="600" alt="Chart">';
  const result = linkPostImages(`<p>${first}</p><figure>${second}<figcaption>Caption</figcaption></figure>`);

  assert.match(result, /href="\/_astro\/review.webp" aria-label="Enlarge image: Review &amp; findings" data-pswp-width="1331" data-pswp-height="1149"/);
  assert.ok(result.includes(`${first}</a></p>`));
  assert.ok(result.includes('href="https://example.com/chart.png?x=1&amp;y=2"'));
  assert.ok(result.includes(`${second}</a><figcaption>Caption</figcaption>`));
});

test('preserves authored links, controls and opted-out images', () => {
  const img = '<img src="/image.png" width="1200" height="800" alt="Example">';
  const markup = `<a href="/destination">${img}</a><button>${img}</button><div data-no-zoom>${img}</div><img data-no-zoom src="/logo.png">`;
  assert.equal(linkPostImages(markup), markup);
});

test('wraps a picture as a whole while preserving its sources and alt text', () => {
  const picture = '<picture><source srcset="/image.avif" type="image/avif"><img src="/image.webp" width="1200" height="800" alt="Example"></picture>';
  const result = linkPostImages(picture);
  assert.ok(result.startsWith('<a class="post-image-link" href="/image.webp"'));
  assert.ok(result.endsWith(`${picture}</a>`));
});

test('leaves surrounding code, SVG, entities and scripts byte-for-byte intact', () => {
  const before = '<pre><code>&lt;img src="/example.png"&gt;</code></pre><script>const markup = \'<img src="/not-an-image.png">\';</script>';
  const after = '<svg viewBox="0 0 10 10"><path d="M0 0L10 10" /></svg><!-- a comment -->';
  const result = linkPostImages(`${before}<img src="/actual.png" width="100" height="100">${after}`);
  assert.ok(result.startsWith(before));
  assert.ok(result.endsWith(after));
  assert.equal(result.match(/class="post-image-link"/g)?.length, 1);
});

test('images without known dimensions retain a direct link without opening the viewer', () => {
  const result = linkPostImages('<img src="/image.png" alt="Example">');
  assert.match(result, /href="\/image.png"/);
  assert.ok(!result.includes('data-pswp-width'));
});
