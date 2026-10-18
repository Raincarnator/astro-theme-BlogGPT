import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import config from '../blog.config.ts';
import { articleFeatures } from '../src/lib/article-options.ts';
import { footerPeriod, characterCount } from '../src/lib/footer.ts';
import { stationaryHover } from '../src/lib/stationary-hover.ts';
import { createContent, parseNewArgs } from '../scripts/new.mjs';
import { frontmatter } from '../src/lib/content-files.ts';

test('singular CLI types, explicit template/title options and safe YAML quotes', async (t) => {
  const args = parseNewArgs([
    'post',
    'notes/hello',
    '--use',
    'bundle',
    '--title',
    '你好 "BlogGPT" \\ test',
  ]);
  assert.equal(args.type, 'post');
  assert.equal(args.template, 'bundle');
  const root = await mkdtemp(path.join(os.tmpdir(), 'bloggpt-new-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp('archetypes', path.join(root, 'archetypes'), { recursive: true });
  await createContent(
    root,
    args.type,
    args.slug,
    args.template,
    new Date(),
    args.title,
  );
  const content = await readFile(
    path.join(root, 'content/posts/notes/hello/index.mdx'),
    'utf8',
  );
  assert.equal(frontmatter(content).title, args.title);
  assert.equal(frontmatter(content).slug, args.slug);
  assert.equal(parseNewArgs(['category', 'travel']).template, 'default');
  assert.equal(
    parseNewArgs(['page', 'about', '--use', 'bundle']).template,
    'bundle',
  );
  for (const invalid of [
    ['post'],
    ['post', 'hello', '--use'],
    ['post', 'hello', '--unknown', 'x'],
    ['pages', 'about'],
    ['post', 'hello', 'bundle'],
    ['post', 'hello', 'bundle', '--use', 'default'],
  ])
    assert.throws(() => parseNewArgs(invalid));
});

test('all six explicit frontmatter switches override defaults in either direction', () => {
  const defaults = structuredClone(config.article);
  const names = [
    'math',
    'mermaid',
    'lightbox',
    'callouts',
    'toc',
    'shareCover',
  ];
  for (const enabled of [true, false]) {
    for (const name of names) {
      if (typeof defaults[name] === 'object') defaults[name].enabled = enabled;
      else defaults[name] = enabled;
    }
    assert.deepEqual(
      articleFeatures({}, defaults),
      Object.fromEntries(names.map((name) => [name, enabled])),
    );
    assert.deepEqual(
      articleFeatures(
        Object.fromEntries(names.map((name) => [name, !enabled])),
        defaults,
      ),
      Object.fromEntries(names.map((name) => [name, !enabled])),
    );
  }
});

test('stationary hover restarts on another entry and on motion within the same entry', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const seen = [];
  const dwell = stationaryHover(1000, (item) => seen.push(item));
  dwell.move('first');
  t.mock.timers.tick(800);
  dwell.move('second');
  t.mock.timers.tick(800);
  assert.deepEqual(seen, []);
  dwell.move('second');
  t.mock.timers.tick(999);
  assert.deepEqual(seen, []);
  t.mock.timers.tick(1);
  assert.deepEqual(seen, ['second']);
  dwell.move('first');
  dwell.cancel();
  t.mock.timers.tick(1001);
  assert.deepEqual(seen, ['second']);
});

test('footer year ranges, leap days, timezone boundaries, and body character counts', () => {
  assert.deepEqual(footerPeriod(2023, new Date('2026-01-01T00:00:00Z')), {
    years: '2023 – 2026',
    days: 1096,
  });
  assert.equal(
    footerPeriod(
      '2025-12-31',
      new Date('2025-12-31T16:00:00Z'),
      'Asia/Shanghai',
    ).days,
    1,
  );
  assert.equal(
    footerPeriod('2025-12-31', new Date('2025-12-31T16:00:00Z'), 'UTC').days,
    0,
  );
  assert.throws(() => footerPeriod('2026-02-31'));
  assert.equal(
    characterCount(
      '# 中文 ABC\n[链接](https://example.com)\n```js\nignored\n```',
    ),
    7,
  );
});
