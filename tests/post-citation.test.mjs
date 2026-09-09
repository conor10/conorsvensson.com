import assert from 'node:assert/strict';
import test from 'node:test';
import { createPostCitation } from '../src/utils/post-citation.mjs';

const metadata = {
  author: 'Conor Svensson',
  title: 'Building an evals framework for audits',
  date: new Date('2026-08-19T00:00:00Z'),
  url: 'https://conorsvensson.com/writing/building-an-evals-framework-for-audits/',
};

test('produces a readable citation and a blog-appropriate BibTeX entry', () => {
  const citation = createPostCitation(metadata);
  assert.equal(citation.text, `Conor Svensson (19 August 2026). Building an evals framework for audits. ${metadata.url}`);
  assert.equal(citation.bibtex, `@misc{svensson2026-building-an-evals-framework-for-audits,
  author = {Conor Svensson},
  title = {{Building an evals framework for audits}},
  year = {2026},
  month = aug,
  url = {${metadata.url}}
}`);
});

test('preserves title capitalisation and escapes TeX characters without changing the readable citation', () => {
  const title = 'AI & R&D: 50% of $x_{1} ~ \\ # ^?';
  const citation = createPostCitation({ ...metadata, title });
  assert.ok(citation.text.includes(`${title} ${metadata.url}`));
  assert.ok(citation.bibtex.includes('title = {{AI \\& R\\&D: 50\\% of \\$x\\_\\{1\\} \\textasciitilde{} \\textbackslash{} \\# \\textasciicircum{}?}}'));
});

test('uses the UTC publication date and a slug-based key that survives title edits', () => {
  const citation = createPostCitation({ ...metadata, title: 'Revised title', date: new Date('2026-12-31T23:30:00-02:00') });
  assert.ok(citation.text.startsWith('Conor Svensson (1 January 2027).'));
  assert.ok(citation.bibtex.startsWith('@misc{svensson2027-building-an-evals-framework-for-audits,'));
  assert.ok(citation.bibtex.includes('year = {2027},\n  month = jan,'));
});
