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

Paths apply consistently to theme-generated navigation, canonical URLs, language switching, search, RSS, Sitemap and bundle assets. The theme does not automatically migrate links in article bodies or custom HTML/JS. After changing `posts.pathPrefix`, the language prefix policy or deployment directory, authors must check relative links, images and attachment paths against the final published URLs, especially links across publication years or to standalone pages.

For example, linking from `/zh/posts/2026/hello/` to `/zh/posts/2025/older/` requires `../../2025/older/`; linking to `/zh/about/` requires `../../../about/`. After rendering, the build checks local relative URLs in content (including paths starting with `/`), resources and HTML anchors. Invalid targets produce warnings naming the source page and destination, without failing the build or correcting links. External URLs are not checked over the network.

Path segments use relative directories; the first segment `page` is reserved for pagination. Empty or parent segments, queries, percent encoding and unknown placeholders fail validation. When changing published paths, configure redirects at the host for old addresses.
