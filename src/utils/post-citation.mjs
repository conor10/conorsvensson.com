const texEscapes = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};

const escapeTex = (text) => text.replace(/[\\{}&%$#_~^]/g, (character) => texEscapes[character]);
const keyPart = (text) => text
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

/**
 * Generate both formats from the same metadata, independently of the build timezone.
 * @param {{ author: string, title: string, date: Date, url: string }} metadata
 */
export function createPostCitation({ author, title, date, url }) {
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const year = date.getUTCFullYear();
  const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getUTCMonth()];
  const slug = new URL(url).pathname.split('/').filter(Boolean).pop() ?? 'post';
  const key = `${keyPart(author.trim().split(/\s+/).at(-1) ?? author)}${year}-${keyPart(slug)}`;
  const textBeforeUrl = `${author} (${formattedDate}). ${title}${/[.!?]$/.test(title) ? '' : '.'}`;

  return {
    textBeforeUrl,
    text: `${textBeforeUrl} ${url}`,
    bibtex: `@misc{${key},
  author = {${escapeTex(author)}},
  title = {{${escapeTex(title)}}},
  year = {${year}},
  month = ${month},
  url = {${url}}
}`,
  };
}
