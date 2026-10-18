# BlogGPT

**An Astro blog theme inspired by ChatGPT’s layout.**

Write in Markdown or MDX. Organize content as files. Give readers a familiar sidebar, a focused reading area and a search box that helps them find the next article.

**English** · [简体中文](README.zh-CN.md)

[Demo](https://demo.bloggpt.reincarnatey.net) · [Documentation](https://bloggpt.reincarnatey.net/en/)

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

Connecting your Git repository to **Vercel** is recommended: select Astro, use `pnpm build` as the build command and `dist` as the output directory. Production branch commits automatically build and publish the site. Follow the [Vercel deployment tutorial](apps/docs/en/guide/deployment.md#deploy-to-vercel-recommended) for the full setup. Other static hosts can also publish the complete `dist/` directory.

The build checks types, renders pages, copies bundled assets, generates optional share cards and creates search indexes. Preview serves the production output; rebuild after changes. Scheduled articles also need a build after their publication time.

Interface translations and their registry live in `src/i18n/`. Choose content languages through `site.locales`; missing interface translations fall back automatically. Contributors add translation files and register them in `src/i18n/i18n.config.ts` as part of a repository contribution. See the [language guide](apps/docs/en/content/languages.md).

## Documentation

```sh
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

The documentation lives in `apps/docs/`; its output is **`apps/docs/.vitepress/dist/`**. Use `DOCS_BASE` for a documentation deployment subdirectory; it is independent of the blog’s `site.baseUrl`.

| Guide                                                        | Read about                                                                          |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [Getting started](apps/docs/en/guide/getting-started.md)     | Installation, first edits and commands                                              |
| [Configuration reference](apps/docs/en/config/reference.md)  | Every public field: types, requirements, initial values, omitted values and effects |
| [Frontmatter](apps/docs/en/content/frontmatter.md)           | Dates, covers, visibility, taxonomy and per-entry switches                          |
| [Content organization](apps/docs/en/content/organization.md) | Collections, stable URLs and nested folders                                         |
| [Languages](apps/docs/en/content/languages.md)               | Interface copy and translated content files                                         |
| [Archetypes](apps/docs/en/content/archetypes.md)             | New-content commands, templates and placeholders                                    |
| [Extension files](apps/docs/en/customization/hooks.md)       | Global HTML, CSS and client lifecycles                                              |
| [Deployment](apps/docs/en/guide/deployment.md)               | Domains, subdirectories and build output                                            |

Read the documentation [in English](apps/docs/en/guide/getting-started.md) or [in Chinese](apps/docs/guide/getting-started.md).

For documentation maintenance, create a separate Vercel project from the same repository. Keep Root Directory at the repository root, choose `Other` for Framework Preset, use `pnpm install --frozen-lockfile` for Install Command and `pnpm docs:build` for Build Command, and set Output Directory to `apps/docs/.vitepress/dist`. Select Node.js `24.x` and add `ENABLE_EXPERIMENTAL_COREPACK=1` to Production and Preview; also set `DOCS_BASE` for subdirectory hosting. Documentation changes pushed to the production branch automatically build and publish.

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

The layout is inspired by ChatGPT. UI icons use Lucide; social brand icons use Simple Icons. Demo gradients were created with [FeralUI Gradient Builder](https://feralui.dev/gradients); see [demo assets](apps/docs/en/guide/overview.md#demo-site).

Theme code is licensed under [Apache-2.0](LICENSE). Documentation uses the [MIT License](apps/docs/LICENSE). Configure the blog content license through the footer settings. See [third-party notices](THIRD_PARTY_NOTICES.md) for font, icon and image sources.
