# Files and URLs

## Four content types

| Directory             | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `content/posts/`      | Articles                                       |
| `content/pages/`      | Standalone pages and builtin introductions     |
| `content/categories/` | Category definitions, covers and introductions |
| `content/tags/`       | Tag definitions, covers and introductions      |

All four support `.md`, `.mdx` and nested management directories.

## Files and slugs

When `slug` is omitted, a standalone file uses its filename without the language suffix; an index entry uses its containing folder’s name. An explicit slug preserves the address when moving management folders. For example:

```text
content/posts/notes/2026/hello.zh.md
```

With `slug: hello`, the default address is `/zh/posts/hello/`. Adjust relative image paths and MDX imports when moving files.

## Standalone files and bundles

A standalone file holds one entry. For attachments, use `index.md`, `index.mdx` or a language variant as a folder’s entry. Other files are published with the bundle. See [Bundles and attachments](./bundles.md).

Standalone pages can use `content/pages/[slug]/index.[lang].md` or `.mdx`. Categories and tags may live directly under their respective directories or in additional management folders.

## Article path segments

The default article path is `/[lang]/posts/[slug]/`. `posts.pathPrefix` adds directories between posts and the slug:

| Setting             | Example address               |
| ------------------- | ----------------------------- |
| `''` or omitted     | `/zh/posts/hello/`            |
| `'[year]/'`         | `/zh/posts/2026/hello/`       |
| `'[year]/[month]/'` | `/zh/posts/2026/07/hello/`    |
| `'notes/[year]/'`   | `/zh/posts/notes/2026/hello/` |

Supported placeholders are `[year]`, `[month]` and `[day]`, using publication time in `site.timezone`. Month and day are zero-padded. A trailing `/` is recommended. The slug stays last and can include subpaths.

`site.localePrefixPolicy: 'omit-default-prefix'` omits the default-language segment. Subdirectory deployments prepend the path from `site.baseUrl`. See [language prefix policies](./languages.md#language-prefix-policies).

Paths apply consistently to navigation, canonical URLs, language switching, search, RSS, Sitemap and bundle assets. Default article absolute paths and sibling relative links in bodies resolve to the new addresses, preserving queries and anchors. Adjust URLs in custom HTML/JS as needed.

Path segments use relative directories; the first segment `page` is reserved for pagination. Empty or parent segments, queries, percent encoding and unknown placeholders fail validation. When changing published paths, configure redirects at the host for old addresses.
