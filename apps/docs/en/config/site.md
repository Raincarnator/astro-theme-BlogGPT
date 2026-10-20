# Site and appearance

This page covers common settings. See the [complete configuration reference](./reference.md) for every field, type and default.

## Site address and languages

```ts
site: {
  title: { zh: '我的站点', en: 'My site' },
  baseUrl: 'https://blog.example.org/',
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  localePrefixPolicy: 'redirect-to-default',
  timezone: 'Asia/Shanghai',
},
```

Set `baseUrl` to the complete production root; for a subdirectory, use `https://example.org/blog/`. The theme handles navigation, assets and sharing addresses consistently.

`locales` enables languages and `defaultLocale` sets the default. Single-language sites keep one code. `localePrefixPolicy` sets the prefix policy; see [Languages and translations](../content/languages.md).

After changing the language prefix policy or deployment directory, authors must check that relative content links still point to the correct URLs. The theme does not migrate these links automatically; the build warns about invalid local relative URLs.

## Author and copy

`author` sets the name, biography, avatar and social links. `text` centralizes the homepage heading, Tab labels, search prompts, 404 copy and footer descriptions. Display copy, including `author.name` and `author.bio`, accepts strings or localized maps.

Place a local avatar at `public/images/avatar.webp` and configure `/images/avatar.webp`. Other public assets follow the same path rule.

## Appearance

```ts
appearance: {
  defaultTheme: 'system',
  pageTransition: 'fade',
  codeThemes: { light: 'github-light', dark: 'github-dark' },
  showCodeLineNumbers: false,
  categoryCoverStyle: 'thumbnail',
},
```

`defaultTheme` accepts `light`, `dark` or `system`; saved reader choices take priority. `pageTransition` uses `fade` for a fade or `none` for direct switching.

`codeThemes` sets light and dark code themes by names supported by the installed Shiki / Expressive Code.

`categoryCoverStyle` accepts `thumbnail`, right-fading `fade` or full-image `background`. Individual categories override it with frontmatter `coverStyle`.

## Lists and dates

| Field               | Purpose                              |
| ------------------- | ------------------------------------ |
| `posts.perPage`     | Articles per listing page            |
| `posts.homeLimit`   | Articles on the homepage             |
| `posts.menuLimit`   | Recent articles in the plus menu     |
| `posts.randomLimit` | Candidates for random recent reading |

For the last two fields, a positive integer above the article count, such as `99999`, includes all. The sidebar’s Recent section independently shows all unpinned public articles, newest first.

Click the current page number to enter a destination. Submit with Enter or by leaving the field; Escape cancels. Clicking the maximum page number opens the last page.

`posts.dateFormat` uses native Intl options, such as `{ dateStyle: 'long' }`. Display uses the current interface language and `site.timezone`.

## Footer

```ts
footer: {
  since: '2026-01-01',
  author: { zh: '站点维护者', en: 'Site maintainer' },
  showAttribution: true,
  license: {
    label: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
},
```

The first footer line combines copyright, elapsed days and article statistics. The second uses `text.footerDescription`; the third shows Powered by Astro & BlogGPT and the content license.

`since` accepts a year or date string. An empty `author` follows `author.name`. `showAttribution` controls theme attribution; choose `license` for your blog content. Theme code uses Apache-2.0.

The final line stays in English, and the license label is a plain string.
