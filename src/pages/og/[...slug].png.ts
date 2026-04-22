import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const posts = await getCollection(
  'writing',
  ({ data }) => !import.meta.env.PROD || !data.draft,
);

const pages = Object.fromEntries(
  posts.map((post) => [post.id, { data: post.data }]),
);

const routes = await OGImageRoute({
  pages,
  param: 'slug',
  // The route filename already ends in `.png.ts`, which Astro turns into a
  // `.png` URL suffix. The library's default `getSlug` also appends the
  // extension, which would double it to `.png.png`. Override to use the
  // raw id as the slug and let the route filename supply the extension.
  getSlug: (path) => path,
  getImageOptions: (_path, page) => ({
    title: page.data.title,
    description: new Date(page.data.date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    bgGradient: [
      [15, 15, 16],
      [23, 24, 26],
    ],
    border: { color: [122, 162, 247], width: 3, side: 'inline-start' },
    padding: 60,
    logo: {
      path: './public/favicon-96x96.png',
      size: [72],
    },
    fonts: [
      './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
      './node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2',
    ],
    font: {
      title: {
        size: 72,
        families: ['Inter'],
        weight: 'Bold',
      },
      description: {
        size: 30,
        families: ['Inter'],
        weight: 'Normal',
        color: [154, 155, 160],
      },
    },
  }),
});

export const getStaticPaths = routes.getStaticPaths;
export const GET = routes.GET;
