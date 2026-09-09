# Post image zoom

[PhotoSwipe](https://photoswipe.com/) opens post images in a lightbox. Click an image to fit it to the screen, then click the zoom button or image to view it at its native resolution. Touch users can pinch to zoom and drag to pan. Escape or the close button returns to the post; arrow keys navigate between images.

Existing Markdown image syntax works unchanged. `PostImages.astro` runs in the post layout after Astro resolves image assets, so generated links point at the full-size optimised image. The main viewer is loaded when an image is opened. Images remain direct links with JavaScript disabled.

Images already inside links or buttons retain their existing behaviour. To exclude an image or group, put `data-no-zoom` on the image or a surrounding element in MDX. Images without known width and height remain direct links; Astro supplies these dimensions automatically for local Markdown images.

The viewer follows the site's theme and PhotoSwipe respects reduced-motion preferences. Image quality is limited by the source asset, so use high-resolution originals for text-heavy screenshots.

Implementation:

- `src/components/PostImages.astro`: viewer configuration and styles.
- `src/utils/image-lightbox.mjs`: adds image links to rendered post HTML without rewriting the rest of the content.

Verification:

```sh
node --test tests/image-lightbox.test.mjs
npm run build
```
