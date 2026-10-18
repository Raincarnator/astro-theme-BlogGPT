import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { searchTokens } from '../scripts/lib/search-tokens.mjs';
import { contextSnippets } from '../src/lib/search-context.ts';
import { parse } from 'parse5';

test('production Pagefind finds Chinese Markdown headings consistently in full, body and title scopes', async () => {
  const originalFetch = globalThis.fetch;
  const originalDocument = globalThis.document;
  let language = 'zh';
  // Exercise the shipped Pagefind API/WASM directly, serving its real index files
  // in memory. This is not a mock of the search algorithm or its tokenizer.
  globalThis.document = {
    currentScript: null,
    querySelector: () => ({ getAttribute: () => language }),
  };
  globalThis.fetch = async (input) => {
    const path = new URL(input).pathname;
    assert.match(path, /^\/pagefind(?:-title|-body)?\//);
    return new Response(
      await readFile(new URL(`../dist${path}`, import.meta.url)),
    );
  };
  const api = await import('../dist/pagefind/pagefind.js');
  const instances = [];
  const query = async (folder, term) => {
    const instance = api.createInstance({
      basePath: `https://search.invalid/${folder}/`,
    });
    instances.push(instance);
    const results = await instance.search(searchTokens(term), {
      filters: { kind: 'posts' },
    });
    return Promise.all(results.results.map((result) => result.data()));
  };
  try {
    const results = await query('pagefind', '搜索');
    const design = results.find((entry) =>
      entry.url.endsWith('/zh/posts/design/'),
    );
    assert.ok(
      design,
      'A title match must also retain all matching body paragraphs',
    );
    const snippets = contextSnippets(JSON.parse(design.meta.sections), '搜索');
    assert.ok(snippets.length >= 2);
    const html = await readFile('dist/zh/posts/design/index.html', 'utf8');
    const nodes = [];
    const visit = (node) => {
      nodes.push(node);
      (node.childNodes ?? []).forEach(visit);
    };
    visit(parse(html));
    for (const snippet of snippets) {
      const target = nodes.find((node) =>
        node.attrs?.some(
          (attr) => attr.name === 'id' && attr.value === snippet.id,
        ),
      );
      assert.ok(target, `Missing rendered paragraph ${snippet.id}`);
      assert.ok(
        ['p', 'table'].includes(target.tagName),
        'Body matches must link to the actual paragraph/table, not a preceding heading',
      );
    }
    const full = await query('pagefind', '博客');
    const welcome = full.find((entry) =>
      entry.url.endsWith('/zh/posts/welcome/'),
    );
    assert.ok(
      welcome,
      'The pinned welcome post must match 博客 in its Markdown heading',
    );
    assert.ok(
      JSON.parse(welcome.meta.sections).some(
        (section) => section.heading === '从聊天布局到博客',
      ),
    );
    assert.ok(
      (await query('pagefind-body', '从聊天布局到博客')).some((entry) =>
        entry.url.endsWith('/zh/posts/welcome/'),
      ),
    );
    assert.ok(
      !(await query('pagefind-title', '博客')).some((entry) =>
        entry.url.endsWith('/zh/posts/welcome/'),
      ),
    );
    language = 'en';
    assert.ok(
      (await query('pagefind', 'Markdown')).every((entry) =>
        entry.url.includes('/en/'),
      ),
    );
  } finally {
    for (const instance of instances) await instance.destroy();
    globalThis.fetch = originalFetch;
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
  }
});
