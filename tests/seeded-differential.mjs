import assert from 'node:assert/strict';
import { build } from '../official-kit/site-generator-speed-01-run-20261122-kit/baselines/makefun-site/vendor/makefun-site/index.js';
import { run } from '../solve.js';

const templates = {
  page: '<html><title>{{ page.title }}</title><main>{{{ page.content }}}</main><aside>{% for t in page.tags %}<a href="{{ t.url }}">{{ t.name }}</a>{% endfor %}</aside>{% include "footer" %}</html>',
  post: '<article>{{ page.title }}|{{ page.date_long }}|{{ page.reading_minutes }}|{{ page.newer.title }}</article>',
  index: '{% for p in posts %}<a href="{{ p.url }}">{{ p.title }}</a>{% endfor %}<i>{{ pager.number }}/{{ pager.total }}</i>',
  tag: '<h1>{{ tag.name }}</h1>{% for p in tag.posts %}{{ p.title }};{% endfor %}',
  tags: '{% for t in tags %}{{ t.slug }}={{ t.count }};{% endfor %}',
  footer: '<footer>{{ site.title }} {{ loop.index }}</footer>',
};
const bodies = [
  'plain & < > " \' text\nsecond line [peer](../posts/post-0.md#part) [static](../assets/a.css) [broken](missing.md)',
  '# Same Heading\n\n## Same Heading\n### Café & tea\n\n#### Closing ###',
  '```js\nconst x = "<&>";\n\n```\n\nAfter fence.',
  '> quote one  \n> quote **two**\n>\n>   quote three\n\n---\n***',
  '- alpha\n  continued line\n- *beta*\n\n3. first\n4. second',
  String.raw`slash \ \*escaped\* and **strong *em*** plus \\backslash and [a\]b](https://example.test/?a=1&b=2)`,
  '## !!!\n\n[empty]() [bad](two words) [anchor](#frag) ! <script>alert(1)</script>',
  'line one\nline two\n\n    indented text\n= underline\n\n```\nunterminated fence',
];
let seed = 0x51a7e;
function next(max) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed % max;
}
function execute(input) {
  let expected, actual, expectedError, actualError;
  try { expected = build(input); } catch (error) { expectedError = `${error.name}: ${error.message}`; }
  try { actual = run(input); } catch (error) { actualError = `${error.name}: ${error.message}`; }
  assert.equal(actualError, expectedError, 'candidate and reference error behavior differs');
  if (expectedError === undefined) assert.deepStrictEqual(actual, expected);
}

for (let n = 0; n < 64; n++) {
  const posts = 1 + next(4);
  const pages = 1 + next(3);
  const files = [];
  for (let i = 0; i < posts; i++) {
    const title = [`Post ${i}`, 'Café & tea', 'Same title', 'quotes "and" \\ slash'][next(4)];
    const tags = [['alpha, beta'], ['Café, alpha'], ['beta, gamma'], ['alpha, ALPHA']][next(4)][0];
    files.push({
      path: `posts/post-${i}.md`,
      content: `---\ntitle: "${title}"\ndate: 2026-11-${String(i + 1).padStart(2, '0')}\ntags: [${tags}]\nsummary: summary ${n}-${i}\n---\n${bodies[next(bodies.length)]}`,
    });
  }
  for (let i = 0; i < pages; i++) {
    const fm = n % 7 === 0 ? `---\ntitle: Page ${i}\nunknown: value\n---\n` : `---\ntitle: Page ${i}\ntags: [alpha, empty-ish]\nslug: page-${i}\n---\n`;
    files.push({ path: `docs/section-${i}/page-${i}.md`, content: fm + bodies[next(bodies.length)] });
  }
  files.push({ path: 'assets/a.css', content: `body{content:"${n}"}` });
  files.push({ path: 'index.html', content: 'shadow static' });
  files.push({ path: 'posts/undated.md', content: '---\ntitle: Undated\n---\nnot emitted' });
  execute({
    site: { title: `site ${n} & <x>`, base_url: 'https://example.test/root///', per_page: 1 + next(3), recent: next(5) },
    templates,
    files,
  });
}
console.log('seed=0x51a7e cases=64: exact reference matches');
