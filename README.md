# BlogGPT

**An Astro blog theme inspired by ChatGPT’s layout.**

Write in Markdown or MDX. Organize content as files. Give readers a familiar sidebar, a focused reading area and a search box that helps them find the next article.

**English** · [简体中文](README.zh-CN.md)

[Demo](https://demo.bloggpt.reincarnatey.net) · [Documentation](https://bloggpt.reincarnatey.net/en/)

> **Getting started?** Follow the [installation guide](https://bloggpt.reincarnatey.net/en/guide/getting-started), then explore configuration, writing and deployment in the [documentation](https://bloggpt.reincarnatey.net/en/).

![BlogGPT home — search and a resizable sidebar](.github/assets/readme/home.webp)

## Features

| Category             | Features                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reading interface    | Responsive layout, resizable sidebar, light/dark/system appearance, heading previews, an expandable outline, keyboard shortcuts and client navigation            |
| Content management   | Articles, pages, categories and tags; nested folders, stable slugs, bundled attachments and writing templates                                                    |
| Rich content         | Markdown / MDX, Expressive Code, KaTeX, Mermaid, Callouts, PhotoSwipe and interactive components                                                                 |
| Browsing             | Pinned posts and chronological lists, pagination with page jumping, category covers, tag clouds, yearly archives and grouped friends                             |
| Site search          | Article, title/description, body and whole-site scopes; highlighted context, slash commands and article-title completion                                         |
| Internationalization | Configurable localization for interface copy and content; Chinese and English included (AI-translated English)                                                   |
| Sharing and feeds    | Formatted copy, configurable social destinations, Satori share covers, RSS and Sitemap                                                                           |
| Blog statistics      | Article and character totals and averages, publication intervals, first publication and latest update, a publishing heatmap and article-length bars              |
| Customization        | Extensive settings for appearance, content and interactions, combined with site-wide HTML / CSS / JS extension files, let you customize the site to your liking. |

BlogGPT builds static files ready for static hosting.

## Preview

### Article page · light

![Article page in light mode](.github/assets/readme/article-light.webp)

<details>
<summary>View six more interface previews</summary>

### Article list

![Article list with covers, tags and pagination](.github/assets/readme/posts.webp)

### Article page · dark

![Article page in dark mode](.github/assets/readme/article-dark.webp)

### Categories

![Category covers and the tag cloud](.github/assets/readme/categories.webp)

### Archives

![Articles grouped by publication year](.github/assets/readme/archives.webp)

### Friends

![Grouped friend links and resources](.github/assets/readme/friends.webp)

### Statistics

![Blog statistics, publication heatmap and article-length chart](.github/assets/readme/statistics.webp)

</details>

Screenshots captured at **1920 × 1200** and styled with [RicoScreenshot](https://shot.ricoui.com/).

## Quick start

Requirements: **Node.js 22.12+** and **pnpm 11**. Download or clone this repository, enter its root directory, then run:

```sh
pnpm install
pnpm dev
```

Open the address printed in the terminal. The blog and documentation share a pnpm workspace; one install covers both.

### Make it yours

1. Edit `blog.config.ts`: set the complete production `site.baseUrl` (including any deployment subdirectory), languages, author, interface copy and navigation.
2. Replace friend groups in `friends.config.ts`, or export an empty array `[]`.
3. Rewrite the About page and replace the articles, categories and tags under `content/`.
4. Replace sample avatars, social links and example.com addresses before publishing.

Set enabled languages and the default language through `site.locales` and `site.defaultLocale`.

Everyday configuration, writing and customization live primarily in `blog.config.ts`, `content/`, `public/`, `custom/` and `archetypes/`, with friend links in `friends.config.ts`. Keep one-off MDX components in article bundles and reusable components in `custom/components/`.

### Write an article

```sh
pnpm new post hello --title "My first article"
pnpm new post hello-bundle --use bundle --title "An article with attachments"
```

The first command creates a standalone file. The second creates a bundle with `index.mdx`; add images and attachments in the same folder. Types are singular: `post`, `page`, `category`, `tag`. `--use` chooses an archetype; `--title` sets the article title and otherwise defaults to the last slug segment.

Default article templates create **drafts**. Set `draft: false` and choose its publication time when the article is ready.

### Build and deploy

```sh
pnpm build
pnpm preview
```

Connecting your Git repository to **Vercel** is recommended: select Astro, use `pnpm build` as the build command and `dist` as the output directory. Production branch commits automatically build and publish the site. Follow the [Vercel deployment tutorial](https://bloggpt.reincarnatey.net/en/guide/deployment#deploy-to-vercel-recommended) for the full setup. Other static hosts can also publish the complete `dist/` directory.

The build checks types, renders pages, copies bundled assets, generates optional share cards and creates search indexes. Preview serves the production output; rebuild after changes. Scheduled articles also need a build after their publication time.

Interface translations and their registry live in `src/i18n/`. Choose content languages through `site.locales`; missing interface translations fall back automatically. Contributors add translation files and register them in `src/i18n/i18n.config.ts` as part of a repository contribution. See the [language guide](https://bloggpt.reincarnatey.net/en/content/languages).

## Documentation

Read the [English documentation](https://bloggpt.reincarnatey.net/en/) or [简体中文文档](https://bloggpt.reincarnatey.net/). The guides explain installation, every configuration field, content organization and deployment.

| Guide                                                                            | Read about                                                                          |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Getting started](https://bloggpt.reincarnatey.net/en/guide/getting-started)     | Installation, first edits and commands                                              |
| [Configuration reference](https://bloggpt.reincarnatey.net/en/config/reference)  | Every public field: types, requirements, initial values, omitted values and effects |
| [Frontmatter](https://bloggpt.reincarnatey.net/en/content/frontmatter)           | Dates, covers, visibility, taxonomy and per-entry switches                          |
| [Content organization](https://bloggpt.reincarnatey.net/en/content/organization) | Collections, stable URLs and nested folders                                         |
| [Languages](https://bloggpt.reincarnatey.net/en/content/languages)               | Interface copy and translated content files                                         |
| [Archetypes](https://bloggpt.reincarnatey.net/en/content/archetypes)             | New-content commands, templates and placeholders                                    |
| [Extension files](https://bloggpt.reincarnatey.net/en/customization/hooks)       | Global HTML, CSS and client lifecycles                                              |
| [Deployment](https://bloggpt.reincarnatey.net/en/guide/deployment)               | Domains, subdirectories and build output                                            |

## Project structure

```text
blog.config.ts       Theme settings and localized copy
friends.config.ts    Grouped friend links
src/i18n/            Interface translations and their registry
content/posts/       Articles
content/pages/       Standalone pages and builtin introductions
content/categories/  Category names, covers and introductions
content/tags/        Tag names, covers and introductions
archetypes/          Default and named content templates
custom/              Site-wide HTML, CSS and JS extensions
custom/components/   Reusable MDX components
public/              Shared public assets
src/                 Theme implementation
apps/docs/           Documentation
```

Categories and tags are defined in content files. An `index.md` or `index.mdx` bundle publishes its directory’s attachments beside the rendered page. Use explicit slugs for stable URLs. Optional `posts.pathPrefix` adds publication-date segments such as `[year]` before the slug.

## Development

```sh
pnpm check
pnpm lint
pnpm format:check
pnpm build
pnpm test
pnpm docs:build
```

Build before running tests that inspect generated output. `pnpm build:all` builds both the blog and documentation.

See [Contributing](CONTRIBUTING.md) for pull requests, translation contributions and the CI checks.

## Credits and license

The layout is inspired by ChatGPT. UI icons use Lucide; social brand icons use Simple Icons. Demo gradients were created with [FeralUI Gradient Builder](https://feralui.dev/gradients); see [demo assets](https://bloggpt.reincarnatey.net/en/guide/overview#demo-site).

Theme code is licensed under [Apache-2.0](LICENSE). Documentation uses the [MIT License](apps/docs/LICENSE). Configure the blog content license through the footer settings. See [third-party notices](THIRD_PARTY_NOTICES.md) for font, icon and image sources.
