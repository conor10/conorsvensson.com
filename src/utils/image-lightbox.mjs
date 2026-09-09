import { ELEMENT_NODE, parse, walkSync } from 'ultrahtml';

/**
 * Add image links after Astro has resolved and optimised Markdown/MDX images.
 * Insert at parser offsets so scripts, SVGs and the rest of the post retain
 * their exact original markup.
 * @param {string} markup
 * @returns {string}
 */
export function linkPostImages(markup) {
  /** @type {{ start: number; end: number; opening: string }[]} */
  const links = [];

  walkSync(parse(markup), (node) => {
    if (node.type !== ELEMENT_NODE || node.name !== 'img') return;

    // Preserve authored links and controls, and allow opt-out on a container.
    for (let ancestor = node; ancestor; ancestor = ancestor.parent) {
      if (ancestor.type !== ELEMENT_NODE) continue;
      if (['a', 'button', 'script', 'template'].includes(ancestor.name)
        || 'data-no-zoom' in ancestor.attributes) return;
    }

    const { src, alt = '', width, height } = node.attributes;
    if (!src || !/^(?:https?:\/\/|\/(?!\/)|\.\.?\/)/i.test(src)) return;

    const target = node.parent?.type === ELEMENT_NODE && node.parent.name === 'picture'
      ? node.parent
      : node;
    if (!target.loc[1]) return;

    // Attribute values are already HTML-escaped by Astro. Only a literal quote
    // (possible in a single-quoted attribute) needs escaping when copied here.
    const href = src.replaceAll('"', '&quot;');
    const label = (alt ? `Enlarge image: ${alt}` : 'Enlarge image').replaceAll('"', '&quot;');
    const hasDimensions = Number(width) > 0 && Number(height) > 0
      && Number.isFinite(Number(width)) && Number.isFinite(Number(height));
    const dimensions = hasDimensions
      ? ` data-pswp-width="${Number(width)}" data-pswp-height="${Number(height)}"`
      : '';

    links.push({
      start: target.loc[0].start,
      end: target.loc[1].end,
      opening: `<a class="post-image-link" href="${href}" aria-label="${label}"${dimensions}>`,
    });
  });

  for (const { start, end, opening } of links.sort((a, b) => b.start - a.start)) {
    markup = `${markup.slice(0, start)}${opening}${markup.slice(start, end)}</a>${markup.slice(end)}`;
  }
  return markup;
}
