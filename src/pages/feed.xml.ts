import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer as mdxContainerRenderer } from '@astrojs/mdx';
import { loadRenderers } from 'astro:container';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !import.meta.env.PROD || !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const renderers = await loadRenderers([mdxContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = [];
  for (const post of posts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    items.push({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
      content,
    });
  }

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items,
  });
}
