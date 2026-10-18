# Frontmatter

Frontmatter is YAML between the two opening --- lines of a .md or .mdx file. Each language file has its own metadata and body.

```yaml
---
title: 我的第一篇文章
slug: hello
description: 用一句话说明这篇文章讨论什么。
date: '2026-10-16T09:00:00+08:00'
categories: [guide]
tags: [astro, content]
image: ./cover.webp
featured: false
draft: false
---
```

Translate the sample title and description for each sibling while retaining technical identifiers and publication settings.

## Common fields for all four kinds

| Field         | Type / Required                    | When omitted                                                                 | Meaning and input                                                                                                                                                                                                        |
| ------------- | ---------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`       | string / Yes                       | No default                                                                   | Reading/list/browser/search title. Use a string in each file's language.                                                                                                                                                 |
| `slug`        | string / No                        | Standalone filename without language suffix; index uses containing directory | Stable URL identifier, e.g. hello or notes/hello, without language or posts prefixes. Empty segments, dot paths, query/fragment characters and backslashes are rejected. Explicit slugs preserve URLs when folders move. |
| `description` | string / No                        | Empty string                                                                 | Summary for lists, SEO, search, sharing and statistics; no automatic excerpt is generated.                                                                                                                               |
| `image`       | string / No                        | No cover                                                                     | Above-title reading cover, list thumbnail or taxonomy cover. Accepts /images/a.webp, bundled ./a.webp or a complete HTTPS URL. Not every entry needs one.                                                                |
| `cover`       | string / No                        | Same as image                                                                | Compatibility alias; image takes priority when both exist. Prefer image in new content.                                                                                                                                  |
| `draft`       | boolean / No                       | false                                                                        | Excluded from production; development preview follows showDraftsInDev.                                                                                                                                                   |
| `hidden`      | boolean / No                       | false                                                                        | Articles retain direct access but leave discovery; not access control. Other kinds are discussed below.                                                                                                                  |
| `coverStyle`  | thumbnail / fade / background / No | appearance.categoryCoverStyle                                                | Cover style for category index cards.                                                                                                                                                                                    |
| `math`        | boolean / No                       | article.math                                                                 | Math enhancement.                                                                                                                                                                                                        |
| `mermaid`     | boolean / No                       | article.mermaid                                                              | Diagram enhancement.                                                                                                                                                                                                     |
| `lightbox`    | boolean / No                       | article.lightbox                                                             | Content-image gallery.                                                                                                                                                                                                   |
| `callouts`    | boolean / No                       | article.callouts                                                             | Callout enhancement.                                                                                                                                                                                                     |
| `toc`         | boolean / No                       | article.toc.enabled                                                          | Reading outline.                                                                                                                                                                                                         |
| `shareCover`  | boolean / No                       | article.shareCover.enabled                                                   | Satori share card, independent of ordinary covers or the share button.                                                                                                                                                   |
| `display`     | partial display object / No        | Inherit article.display field by field                                       | Reading controls listed below.                                                                                                                                                                                           |

All four content types recognize common fields. Body enhancements apply across content types; reading details and controls apply to articles and standalone pages.

## Publication and update dates

These fields apply to **posts and pages**. Posts require at least one publication field; page dates are optional.

| Field         | Type                  | Rule                                                                                    |
| ------------- | --------------------- | --------------------------------------------------------------------------------------- |
| `date`        | Parseable date string | Preferred publication timestamp for display, order, archives and publication decisions. |
| `published`   | Parseable date string | Compatibility alias, ignored when date exists.                                          |
| `pubDatetime` | Parseable date string | Third-priority publication alias.                                                       |
| `updated`     | Parseable date string | Preferred last-update timestamp; no inference from filesystem times.                    |
| `modDatetime` | Parseable date string | Second-priority update alias.                                                           |
| `lastmod`     | Parseable date string | Third-priority update alias.                                                            |

Prefer offset ISO timestamps, e.g. '2026-10-16T09:00:00+08:00' explicitly means 9 a.m. in UTC+8. A date-only '2026-10-16' is parsed as UTC midnight, then displayed in site.timezone. Values must be parseable by JavaScript; use an explicit date or timestamp as above.

Last update appears at the end of the body beside tags only when present and different from publication. display.updated hides it. Metadata supplies update dates. See publication states below for article scheduling.

## Article-only fields

| Field        | Type / Required         | When omitted | Meaning                                                               |
| ------------ | ----------------------- | ------------ | --------------------------------------------------------------------- |
| `categories` | string or string[] / No | []           | Category slugs, e.g. [guide, writing], defined in content/categories. |
| `category`   | string or string[] / No | []           | Compatibility input merged and deduplicated with categories.          |
| `tags`       | string or string[] / No | []           | Tag slugs, e.g. [astro, markdown], defined in content/tags.           |
| `featured`   | boolean / No            | false        | Pin in the sidebar without changing publication time.                 |

Articles use definition slugs to associate categories and tags. These fields apply to posts.

## Reading display switches

Global defaults are article.display. Override only the fields you need. When both levels omit a field, its default is true.

```yaml
display:
  title: true
  author: false
  published: true
  readingTime: true
  updated: true
  tags: true
  share: true
  navigation: true
```

| Field                 | Shown when true                        | Effect of false                                             |
| --------------------- | -------------------------------------- | ----------------------------------------------------------- |
| `display.title`       | Title, description and categories      | Hide the visual title, retaining cover and search/SEO title |
| `display.author`      | Author avatar and name                 | Hide author information                                     |
| `display.published`   | Configured publication date            | Hide the date without changing publication state            |
| `display.readingTime` | Estimated reading minutes              | Hide the estimate                                           |
| `display.updated`     | Update date differing from publication | Hide the bottom update message                              |
| `display.tags`        | Bottom article tags                    | Hide tag links without deleting relations                   |
| `display.share`       | Share button, popover and copy         | Hide controls without making content private                |
| `display.navigation`  | Previous and next articles             | Hide adjacent navigation                                    |

Standalone pages use article reading styles and applicable controls, but have no article tags or neighbors. List summaries are unaffected by reading-page display settings.

## Override enhancements

```yaml
math: true
mermaid: false
lightbox: true
callouts: true
toc: false
shareCover: false
```

Both true and false override global configuration. Omission alone means inheritance. Disabling an enhancement preserves basic Markdown rendering. Disabling Satori permits the ordinary image as the share preview.

## Publication states

- Draft or future posts have no production route and are excluded from lists, search, RSS and Sitemap. Development can preview them with showDraftsInDev; public discovery still excludes unpublished content.
- Hidden posts retain direct URLs, receive noindex, and leave lists, search, archives, taxonomy article lists, RSS and Sitemap. hidden controls discovery visibility; the content remains public through its URL.
- Draft pages are excluded in production. Hidden pages remain directly accessible and receive noindex; adjust relevant navigation entries as needed.
- Hidden category/tag definitions do not seed definition lists, but public articles referencing the slug can still form groups. Related articles follow their own publication states.

Rebuild after the scheduled date arrives. Filenames pair translations; the loader manages lang, _key and _locale automatically.
