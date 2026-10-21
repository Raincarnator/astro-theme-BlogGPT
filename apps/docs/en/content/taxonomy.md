# Categories, tags and pages

## Categories and tags

Define a category in `content/categories/guide.zh.md`:

```md
---
title: Getting started
slug: guide
description: Start exploring the theme here.
---

Add a category introduction here.
```

An article’s `categories: [guide]` refers to this slug. Tags follow the same pattern under `content/tags/`. Both support translations, MDX, covers and index bundles.

Defined categories can appear on their own. When an article refers to an undefined category, the theme uses its slug as the group name.

Setting `hidden: true` on a category or tag definition applies per language version: its detail page still builds and remains directly accessible, but stays out of public lists, tag clouds, search and Sitemap. The detail page lists only public articles and remains available as an empty page when no articles reference it.

Categories and tags referenced only by hidden articles retain directly accessible detail pages, but stay out of public lists, tag clouds, search and Sitemap, and list no articles. This follows the article version selected for the current language. Groups also referenced by public articles list only those public articles.

## Standalone pages

For example, write an About page in `content/pages/about/index.zh.mdx` and configure navigation:

```ts
{ id: 'about', type: 'page', page: 'about', label: { zh: '关于', en: 'About' }, icon: 'info' }
```

The default path is `/zh/about/`, with language prefixes controlled by the site policy. Pages support dates, authors, reading time, outlines and sharing, use the same `display` settings as articles, and appear in whole-site search.

## Builtin titles and introductions

Article lists, categories, tags, archives and friends can bind pages content:

```ts
{ id: 'categories', type: 'builtin', route: 'categories', page: 'categories',
  label: { zh: '分类', en: 'Categories' }, icon: 'shapes' }
```

The entry’s `title` and `description` set the page heading and description; its body appears before the feature list. Builtin pages share the same heading style. Removing the `page` binding uses the default title.

Article lists show the introductory body only on the first page, retaining the title and description on later pages. `posts`, `categories`, `tags`, `archives` and `links` can be introduction slugs and use the builtin address when bound. Custom introduction slugs usually retain their standalone page address as well.

## Covers and cards

```md
---
title: Writing and typography
slug: writing
description: Markdown, code and article enhancements.
image: /images/covers/writing.webp
coverStyle: fade
---

A category introduction, followed by related articles.
```

Put shared covers in `public/`. Bundles can also use `./cover.webp`. `coverStyle` selects `thumbnail`, `fade` or `background` for category cards, defaulting to `appearance.categoryCoverStyle`.

Category detail pages show the back link, optional cover, title and description, introduction and article list in that order. Tag details use the same layout; the tag cloud below the category list reflects article associations.
