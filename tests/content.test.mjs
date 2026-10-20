import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  access,
  cp,
  rm,
} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {
  fileIdentity,
  chooseVariants,
  assertUniqueSlugs,
  assertMatchingPostSlugs,
} from '../src/lib/content-variants.ts';
import {
  contentFiles,
  contentKinds,
  frontmatter,
} from '../src/lib/content-files.ts';
import { bundleAssets } from '../src/integrations/content-bundles.ts';
import { createContent } from '../scripts/new.mjs';
import config from '../blog.config.ts';

const variant = (locale, key = 'group/welcome', slug = 'welcome') => ({
  data: { _key: key, _locale: locale, slug },
});

test('article translations require one slug even for hidden and unpublished versions', () => {
  const entries = [variant('zh'), variant('en'), variant(undefined)];
  assert.equal(assertMatchingPostSlugs(entries), entries);
  assert.doesNotThrow(() =>
    assertMatchingPostSlugs([
      ...entries,
      variant('en', 'another/article', 'another-slug'),
    ]),
  );
  for (const status of [
    { hidden: true },
    { draft: true },
    { date: new Date('2099-01-01') },
  ])
    assert.throws(
      () =>
        assertMatchingPostSlugs([
          entries[0],
          {
            data: {
              ...variant('en', 'group/welcome', 'different').data,
              ...status,
            },
          },
        ]),
      /same slug: group\/welcome.*zh: welcome.*en: different/,
    );
});
async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'bloggpt-content-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
async function put(root, file, content = 'attachment') {
  const target = path.join(root, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
  return target;
}

test('filename variants follow exact, neutral, default, then configured language order', () => {
  const exact = variant('en'),
    neutral = variant(undefined),
    fallback = variant('zh'),
    other = variant('fr');
  const choose = (entries) =>
    chooseVariants(entries, 'en', 'zh', ['zh', 'fr', 'de']);
  assert.deepEqual(choose([fallback, neutral, other, exact]), [exact]);
  assert.deepEqual(choose([fallback, neutral, other]), [neutral]);
  assert.deepEqual(choose([other, fallback]), [fallback]);
  assert.deepEqual(
    chooseVariants([variant('de'), other], 'en', 'zh', ['fr', 'de']),
    [other],
  );
  assert.deepEqual(chooseVariants([exact], 'zh', 'zh', ['zh']), []);
  assert.throws(() => choose([exact, exact]), /Duplicate content variant/);
  assert.deepEqual(fileIdentity('nested/welcome.en.mdx', ['zh', 'en']), {
    key: 'nested/welcome',
    locale: 'en',
    bundle: false,
  });
  assert.deepEqual(fileIdentity('nested/story/index.zh.md', ['zh', 'en']), {
    key: 'nested/story/index',
    locale: 'zh',
    bundle: true,
  });
  assert.equal(
    chooseVariants(
      [exact, variant('en', 'different/welcome', 'different-url')],
      'en',
      'zh',
      ['zh', 'en'],
    ).length,
    2,
  );
  assert.throws(
    () =>
      assertUniqueSlugs([exact, variant('en', 'different/welcome')], 'pages'),
    /Duplicate/,
  );
});

test('all four collections discover nested standalone files and treat index subtrees as attachments', async (t) => {
  const root = await fixture(t);
  for (const kind of contentKinds) {
    const base = `content/${kind}`;
    await put(
      root,
      `${base}/deep/folder/welcome.zh.mdx`,
      '---\ntitle: Hello\nslug: hello\n---\n',
    );
    await put(
      root,
      `${base}/deep/folder/welcome.en.md`,
      '---\ntitle: Hello\nslug: hello\n---\n',
    );
    await put(
      root,
      `${base}/another/story/index.zh.md`,
      '---\ntitle: Story\nslug: story\n---\n',
    );
    await put(
      root,
      `${base}/another/story/index.en.mdx`,
      '---\ntitle: Story\nslug: story\n---\n',
    );
    await put(root, `${base}/another/story/attachment.md`, 'not frontmatter');
    await put(
      root,
      `${base}/another/story/nested/index.mdx`,
      'also an attachment',
    );
    assert.deepEqual(await contentFiles(path.join(root, base), ['zh', 'en']), [
      'another/story/index.en.mdx',
      'another/story/index.zh.md',
      'deep/folder/welcome.en.md',
      'deep/folder/welcome.zh.mdx',
    ]);
  }
});

test('disabled unregistered locales retain their family and bundle boundaries in every collection', async (t) => {
  const root = await fixture(t);
  const enabled = ['en'];
  for (const suffix of ['ja', 'pt-BR', 'en-US-u-nu-latn', 'iw']) {
    const file = `nested/index.${suffix}.mdx`;
    const identity = fileIdentity(file, enabled);
    assert.deepEqual(identity, fileIdentity(file, [...enabled, suffix]));
    assert.equal(identity.key, 'nested/index');
    assert.equal(identity.bundle, true);
  }
  assert.equal(fileIdentity('hello.iw.md', enabled).locale, 'he');
  assert.deepEqual(fileIdentity('hello.v2.md', enabled), {
    key: 'hello.v2',
    locale: undefined,
    bundle: false,
  });
  const entries = ['hello.en.md', 'hello.ja.md', 'only-ja.ja.md'].map(
    (file) => {
      const identity = fileIdentity(file, enabled);
      return variant(identity.locale, identity.key);
    },
  );
  assert.deepEqual(chooseVariants(entries, 'en', 'en', enabled), [entries[0]]);
  assert.deepEqual(chooseVariants(entries, 'ja', 'en', ['en', 'ja']), [
    entries[1],
    entries[2],
  ]);
  for (const kind of contentKinds) {
    const base = `content/${kind}`;
    await put(root, `${base}/only-ja/index.ja.md`);
    await put(root, `${base}/only-ja/attachment.md`);
    await put(root, `${base}/only-ja/nested/index.en.mdx`);
    assert.deepEqual(await contentFiles(path.join(root, base), enabled), [
      'only-ja/index.ja.md',
    ]);
  }
});

test('bundle manifest copies arbitrary resources for the selected locale and introduction mount, never standalone siblings or unpublished bundles', async (t) => {
  const root = await fixture(t);
  for (const kind of contentKinds) {
    const date = kind === 'posts' ? 'date: 2026-01-01\n' : '';
    await put(
      root,
      `content/${kind}/managed/story/index.zh.md`,
      `---\ntitle: Chinese\nslug: story\n${date}---\n`,
    );
    await put(
      root,
      `content/${kind}/managed/story/index.en.mdx`,
      `---\ntitle: English\nslug: ${kind === 'posts' ? 'story' : 'translated-story'}\n${date}---\n`,
    );
    for (const file of [
      'image.svg',
      'video.mp4',
      'archive.zip',
      'code.py',
      'demo.html',
      'nested/resource.md',
    ])
      await put(
        root,
        `content/${kind}/managed/story/${file}`,
        Buffer.from([0, 1, 2, 255]),
      );
    await put(
      root,
      `content/${kind}/separate/article.md`,
      `---\ntitle: Separate\nslug: separate\n${date}---\n`,
    );
    await put(root, `content/${kind}/separate/uncopied.txt`);
    await put(
      root,
      `content/${kind}/draft/index.md`,
      `---\ntitle: Draft\nslug: draft\ndraft: true\n${date}---\n`,
    );
    await put(root, `content/${kind}/draft/private.txt`);
  }
  await put(
    root,
    'content/posts/future/index.md',
    '---\ntitle: Later\nslug: later\ndate: 2099-01-01\n---\n',
  );
  await put(root, 'content/posts/future/private.txt');
  const custom = structuredClone(config);
  custom.sidebar.items = [
    {
      id: 'links',
      type: 'builtin',
      route: 'links',
      page: 'story',
      icon: 'link',
      label: 'Friends',
    },
  ];
  custom.sidebar.menu = [];
  const assets = await bundleAssets(root, custom);
  for (const kind of contentKinds)
    for (const [locale, slug] of [
      ['zh', 'story'],
      ['en', 'translated-story'],
    ])
      for (const file of [
        'image.svg',
        'video.mp4',
        'archive.zip',
        'code.py',
        'demo.html',
        'nested/resource.md',
      ])
        assert.ok(
          assets.has(
            `${locale}/${kind === 'pages' ? '' : `${kind}/`}${kind === 'posts' ? 'story' : slug}/${file}`,
          ),
        );
  assert.ok(assets.has('zh/links/nested/resource.md'));
  assert.equal(
    [...assets.keys()].some((key) =>
      /index\.(zh|en)|uncopied|private/.test(key),
    ),
    false,
  );
  const mono = structuredClone(custom);
  mono.site.locales = ['zh'];
  assert.equal(
    [...(await bundleAssets(root, mono)).keys()].some((key) =>
      key.startsWith('en/'),
    ),
    false,
  );
  await put(root, 'content/posts/managed/story/index.html');
  await assert.rejects(bundleAssets(root, custom), /overwrite/);
});

test('archetypes create all four default and named bundles, replace paths/text, preserve binary bytes, and preflight conflicts', async (t) => {
  const root = await fixture(t);
  await cp('archetypes', path.join(root, 'archetypes'), { recursive: true });
  for (const kind of contentKinds) {
    await createContent(
      root,
      kind,
      'one',
      'default',
      new Date('2026-01-02T03:04:05Z'),
    );
    const single = await readFile(
      path.join(root, `content/${kind}/one.mdx`),
      'utf8',
    );
    assert.equal(frontmatter(single).slug, 'one');
    assert.equal(single.includes('{{'), false);
    if (kind === 'posts')
      assert.equal(
        new Date(frontmatter(single).date).toISOString(),
        '2026-01-02T03:04:05.000Z',
      );
    await createContent(root, kind, 'two', 'bundle');
    await access(path.join(root, `content/${kind}/two/index.mdx`));
    await assert.rejects(
      access(path.join(root, `content/${kind}/two/resources/readme.txt`)),
    );
    await assert.rejects(createContent(root, kind, 'one'), /overwrite/);
  }
  await put(
    root,
    'archetypes/pages/custom/[slug]/[year]/index.[template].mdx',
    '{{ slug }} {{ type }} {{ template }} {{ date }} {{ datetime }} {{ timestamp }}',
  );
  await createContent(root, 'pages', "reader's-notes", 'default');
  assert.equal(
    frontmatter(
      await readFile(
        path.join(root, "content/pages/reader's-notes.mdx"),
        'utf8',
      ),
    ).slug,
    "reader's-notes",
  );
  const binary = Buffer.from([0, 255, 128, 42]);
  await put(root, 'archetypes/pages/custom/[slug]/raw.zip', binary);
  await createContent(
    root,
    'pages',
    'three',
    'custom',
    new Date('2026-01-02T03:04:05Z'),
  );
  assert.equal(
    await readFile(
      path.join(root, 'content/pages/three/2026/index.custom.mdx'),
      'utf8',
    ),
    'three page custom 2026-01-02 2026-01-02T03:04:05.000Z 1767323045000',
  );
  assert.deepEqual(
    await readFile(path.join(root, 'content/pages/three/raw.zip')),
    binary,
  );
  await put(root, 'archetypes/pages/conflict/a.mdx', 'new');
  await put(root, 'archetypes/pages/conflict/z.mdx', 'new');
  await put(root, 'content/pages/z.mdx', 'existing');
  await assert.rejects(
    createContent(root, 'pages', 'x', 'conflict'),
    /overwrite/,
  );
  await assert.rejects(access(path.join(root, 'content/pages/a.mdx')));
  await assert.rejects(createContent(root, 'pages', '../escape'), /traversal/);
  await assert.rejects(
    createContent(root, 'pages', 'x', '../escape'),
    /Template name/,
  );
});

// Browser swaps must never resolve media against the previous document's URL.
test('rendered relative URLs honor the destination route and base without changing scripts, anchors, or remote URLs', async () => {
  const { contentUrls } = await import('../src/lib/content-urls.ts');
  const html = `<html><head><script>const x='<img src="./leave.js">';</script></head><body><a href="./outside">outside</a><main><img src='./cover.svg'><video src="clip.mp4" poster="./poster.png"></video><a href="./download.zip?a=1&amp;b=2">download</a><a href="#heading">anchor</a><img src="https://example.org/a.png"><source srcset="./small.png 1x, ./large.png 2x"><script>const y='<img src="./also-leave.js">';</script><img src="data:image/png;base64,AA=="></main></body></html>`;
  const result = contentUrls(
    html,
    new URL('https://example.com/blog/en/posts/my-story/'),
  );
  assert.ok(result.includes('src="/blog/en/posts/my-story/cover.svg"'));
  assert.ok(result.includes('src="/blog/en/posts/my-story/clip.mp4"'));
  assert.ok(result.includes('poster="/blog/en/posts/my-story/poster.png"'));
  assert.ok(
    result.includes('href="/blog/en/posts/my-story/download.zip?a=1&amp;b=2"'),
  );
  assert.ok(
    result.includes(
      'srcset="/blog/en/posts/my-story/small.png 1x, /blog/en/posts/my-story/large.png 2x"',
    ),
  );
  for (const unchanged of [
    'href="#heading"',
    'https://example.org/a.png',
    'data:image/png;base64,AA==',
    `const x='<img src="./leave.js">';`,
    `const y='<img src="./also-leave.js">';`,
    'href="./outside"',
  ])
    assert.ok(result.includes(unchanged));
});

test('content links only mark external HTTP URLs, comparing the configured site even in local preview', async () => {
  const { contentUrls } = await import('../src/lib/content-urls.ts');
  const result = contentUrls(
    '<main><div class="article-content"><a href="https://astro.build/">external</a><a href="//astro.build/docs">protocol-relative</a><a href="https://example.com/zh/">internal absolute</a><a href="../local/">internal relative</a><a href="#heading">anchor</a><a href="mailto:demo@example.com">email</a></div><a href="https://astro.build/">UI</a></main>',
    new URL('http://localhost:4322/zh/posts/demo/'),
    new URL('https://example.com'),
  );
  assert.equal((result.match(/data-external/g) ?? []).length, 2);
  assert.ok(result.includes('href="https://example.com/zh/">'));
  assert.ok(result.includes('href="mailto:demo@example.com">'));
});

test('URL classification ignores surrounding ASCII whitespace without changing absolute targets', async () => {
  const { contentUrls } = await import('../src/lib/content-urls.ts');
  const attributes = [
    'href=" https://external.test/docs "',
    'href="\t//external.test/docs\n"',
    'src="\nhttps://cdn.test/a.png\n"',
    'href=" mailto:demo@example.com "',
    'href=" #heading "',
    'href=" /root/path "',
    'src=" data:image/png;base64,AA== "',
    'href="   "',
  ];
  const result = contentUrls(
    `<main><div class="article-content">${attributes.map((attribute) => `<${attribute.startsWith('src') ? 'img' : 'a'} ${attribute}>`).join('')}<a href=" \t./download.zip?x=1&amp;y=2\n ">download</a></div></main>`,
    new URL('https://example.com/blog/en/posts/story/'),
  );
  for (const attribute of attributes)
    assert.ok(result.includes(attribute), attribute);
  assert.equal((result.match(/data-external/g) ?? []).length, 2);
  assert.ok(
    result.includes('href="/blog/en/posts/story/download.zip?x=1&amp;y=2"'),
  );
});
