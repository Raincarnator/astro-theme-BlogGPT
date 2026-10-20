import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  cp,
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  access,
} from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

test(
  'production routes retain hidden translations while every discovery entry uses the selected version',
  { timeout: 180000 },
  async (t) => {
    const workspace = process.cwd();
    const temporary = path.join(workspace, '.astro');
    await mkdir(temporary, { recursive: true });
    const root = await mkdtemp(path.join(temporary, 'visibility-test-'));
    t.after(async () => {
      assert.equal(path.dirname(root), temporary);
      await rm(root, { recursive: true, force: true });
    });
    for (const file of [
      'src',
      'content',
      'custom',
      'public',
      'scripts',
      'astro.config.ts',
      'blog.config.ts',
      'friends.config.ts',
      'tsconfig.json',
      'package.json',
    ])
      await cp(path.join(workspace, file), path.join(root, file), {
        recursive: true,
      });
    const config = (
      await readFile(path.join(root, 'blog.config.ts'), 'utf8')
    ).replace(
      'export default config;',
      `config.site.localePrefixPolicy = 'omit-default-prefix';
config.posts.pathPrefix = '[year]/';
config.site.locales.push('en-US-u-nu-latn');
config.article.shareCover.enabled = false;
export default config;`,
    );
    await writeFile(path.join(root, 'blog.config.ts'), config);
    const bundle = path.join(root, 'content/posts/test-visibility');
    await mkdir(bundle);
    const hidden =
      '---\ntitle: TEST-HIDDEN-EN\nslug: test-visibility\ndate: 2026-01-01\nhidden: true\ntags: [visibility-check]\n---\nHidden English body.\n';
    await writeFile(path.join(bundle, 'index.en.md'), hidden);
    await writeFile(
      path.join(bundle, 'index.zh.md'),
      '---\ntitle: TEST-PUBLIC-ZH\nslug: test-visibility\ndate: 2026-01-01\ntags: [visibility-check]\n---\n[Invalid sibling](../missing-article/)\n',
    );
    await writeFile(path.join(bundle, 'download.txt'), 'Published attachment');
    const build = () =>
      new Promise((resolve, reject) => {
        const child = spawn(
          process.execPath,
          [path.join(workspace, 'node_modules/astro/bin/astro.mjs'), 'build'],
          {
            cwd: root,
            windowsHide: true,
            stdio: ['ignore', 'pipe', 'pipe'],
          },
        );
        let output = '';
        child.stdout.on('data', (chunk) => {
          output += chunk;
        });
        child.stderr.on('data', (chunk) => {
          output += chunk;
        });
        child.on('error', reject);
        child.on('close', (code) => resolve({ code, output }));
      });
    const result = await build();
    assert.equal(result.code, 0, result.output);
    assert.match(
      result.output,
      /Invalid relative URL in \/posts\/2026\/test-visibility\/.*missing-article/,
    );
    const output = (file) => readFile(path.join(root, 'dist', file), 'utf8');
    const en = await output('en/posts/2026/test-visibility/index.html');
    assert.match(en, /TEST-HIDDEN-EN/);
    assert.match(en, /noindex,nofollow/);
    assert.doesNotMatch(en, /data-search-record="posts"/);
    await access(
      path.join(root, 'dist/en/posts/2026/test-visibility/download.txt'),
    );
    const zh = await output('posts/2026/test-visibility/index.html');
    assert.match(zh, /data-search-record="posts"/);
    assert.match(zh, /href="\/posts\/2026\/missing-article\/"/);
    assert.match(await output('posts/index.html'), /TEST-PUBLIC-ZH/);
    // Check all English generated HTML, including pagination, sidebar, taxonomy,
    // completion, random candidates and statistics, for accidental fallback links.
    const { readdir } = await import('node:fs/promises');
    for (const file of await readdir(path.join(root, 'dist/en'), {
      recursive: true,
    })) {
      const normalized = file.replaceAll('\\', '/');
      if (
        !normalized.endsWith('.html') ||
        normalized === 'posts/2026/test-visibility/index.html'
      )
        continue;
      const html = await output(`en/${file}`);
      assert.doesNotMatch(
        html,
        /TEST-HIDDEN-EN|TEST-PUBLIC-ZH|\/en\/posts\/2026\/test-visibility\//,
        normalized,
      );
    }
    assert.doesNotMatch(await output('en/rss.xml'), /test-visibility/);
    const regional = await output(
      'en-US-u-nu-latn/posts/2026/test-visibility/index.html',
    );
    assert.match(regional, /lang="en-US-u-nu-latn"/);
    // Invalid slugs must fail even though the differing translation is hidden.
    await writeFile(
      path.join(bundle, 'index.en.md'),
      hidden.replace('slug: test-visibility', 'slug: different'),
    );
    const invalid = await build();
    assert.notEqual(invalid.code, 0);
    assert.match(invalid.output, /Article translations must use the same slug/);
  },
);
