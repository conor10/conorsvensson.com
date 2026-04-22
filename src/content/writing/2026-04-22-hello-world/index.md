---
title: "Hello, world"
description: "A placeholder post to verify typography, code blocks, and co-located images render correctly."
date: 2026-04-22
tags: ["meta", "astro"]
draft: true
---

This post exists purely so the typography, syntax highlighting, and image
pipeline have something to chew on before the real writing starts. You can
delete this folder once you've written something to replace it.

![Example co-located image — this file lives in the same folder as the post.](./example.svg)

## A bit of code

Here's a small TypeScript snippet so you can see how the `github-light` and
`github-dark` Shiki themes render under each mode:

```ts
type Post = {
  title: string;
  tags: string[];
  date: Date;
};

function firstTagged(posts: Post[], tag: string): Post | undefined {
  return posts.find((p) => p.tags.includes(tag));
}

const latest: Post = {
  title: "Hello, world",
  tags: ["meta", "astro"],
  date: new Date(),
};

console.log(firstTagged([latest], "meta"));
```

And a shell snippet, for good measure:

```sh
git add . && git commit -m "publish" && git push
```

Inline code looks like this: `await fetch('/feed.xml')`.

## Longer prose

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur.

> Block quotes get a subtle left border and muted colour, so sidebars and
> pull quotes stay quiet against the body text.

That's it. Replace this with something real.
