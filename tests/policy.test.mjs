import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isPublished,
  canRender,
  canDiscover,
  safeSlug,
} from '../src/lib/policy.ts';

const now = new Date('2026-10-14T00:00:00Z');
const post = (overrides = {}) => ({
  date: new Date('2026-01-01'),
  draft: false,
  hidden: false,
  ...overrides,
});
test('drafts and scheduled articles cannot leak into production or discovery', () => {
  for (const data of [
    post({ draft: true }),
    post({ date: new Date('2099-01-01') }),
  ]) {
    assert.equal(isPublished(data, now), false);
    assert.equal(canRender(data, false, true, now), false);
    assert.equal(canDiscover(data, now), false);
    assert.equal(canRender(data, true, true, now), true);
    assert.equal(canRender(data, true, false, now), false);
  }
});
test('unlisted articles have a route but never appear in discovery', () => {
  assert.equal(canRender(post({ hidden: true }), false, false, now), true);
  assert.equal(canDiscover(post({ hidden: true }), now), false);
  assert.equal(canDiscover(post(), now), true);
});
test('nested historical slugs are retained but ambiguous routes are rejected', () => {
  assert.equal(safeSlug('/2024/hello/'), '2024/hello');
  assert.equal(safeSlug('中文文章'), '中文文章');
  for (const invalid of [
    '',
    '../secret',
    'foo/../bar',
    'foo?x=1',
    'foo#bar',
    'foo\\bar',
    'foo//bar',
  ])
    assert.throws(() => safeSlug(invalid));
});

test('internal configuration validation retains locale, pagination, and width checks', async () => {
  const { validateConfig } = await import('../src/lib/validate-config.ts');
  const { default: config } = await import('../blog.config.ts');
  assert.doesNotThrow(() => validateConfig(config));
  for (const mutate of [
    (c) => {
      c.site.locales = ['en'];
    },
    (c) => {
      c.posts.perPage = 0;
    },
    (c) => {
      c.sidebar.width.default = 1000;
    },
  ]) {
    const invalid = structuredClone(config);
    mutate(invalid);
    assert.throws(() => validateConfig(invalid));
  }
  const { introPageSlug } = await import('../src/lib/intro-config.ts');
  assert.equal(introPageSlug(config, 'categories'), 'categories');
  assert.equal(
    introPageSlug(
      { ...config, sidebar: { ...config.sidebar, items: [], menu: [] } },
      'categories',
    ),
    undefined,
  );
});
