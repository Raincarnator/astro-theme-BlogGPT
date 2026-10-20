# Configuration reference

The root blog.config.ts configures the theme; friends.config.ts stores friend links separately. Articles, pages, categories and tags use [frontmatter](../content/frontmatter.md). Restart development after changing configuration, and rebuild and redeploy production.

This page covers every public BlogConfig, NavigationItem and FriendsConfig field. Types live in src/types/config.ts.

## Required fields and defaults

- **Required** means the field must remain in the configuration; there is no automatic runtime completion. An **initial value** is the value supplied by the repository, which you may change.
- **Optional** fields may be omitted. Their actual omission behavior is documented below. Partial nested settings inherit field by field; include only fields you want to override.
- Localized is the text type described below. Booleans must be true or false, not strings such as 'false'. An empty array [] provides no entries.
- Snippets represent parts of the existing configuration. Keep the root `const config: BlogConfig = { ... }` and `export default config`.

## Localized interface copy

Use a string, or a nonempty map `Partial<Record<string, string>>`. Keys accept any valid BCP 47 code, including ja and pt-BR. Strings stay the same in every interface. Maps translate names and descriptive copy.

```ts
site: { /* retain other fields */ title: { zh: '我的站点', en: 'My site' } },
author: {
  // retain other fields
  name: { zh: '站点作者', en: 'Site author' },
  bio: { zh: '关于这个站点的一句话。', en: 'A sentence about this site.' },
},
```

Resolution order: requested language and parent tags → site.defaultLocale and its parent tags → site.locales order → first available map value. An empty string intentionally clears text. A map needs at least one valid BCP 47 key; omitted languages follow the resolution order above.

Localized fields include site and author names and biography, social labels, all text copy values (including tabs), navigation names/descriptions, share copy formats and platform names, footer author names, group names/descriptions and linked-site names/descriptions. URLs, slugs, paths, icon IDs, theme IDs and timezones remain ordinary strings.

## site: identity and deployment

| Field                     | Type                                                                   | Required | Initial value            | Meaning and input                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site`                    | object                                                                 | Yes      | Fields below             | Site basics.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `site.title`              | Localized                                                              | Yes      | 'BlogGPT'                | Sidebar name, browser title, RSS, sharing text and share-card branding.                                                                                                                                                                                                                                                                                                                                                                                             |
| `site.baseUrl`            | string                                                                 | Yes      | `'https://example.com/'` | Complete production root with protocol and optional subdirectory, e.g. `https://example.org/blog/`. Derives origin and deployment path and adds a trailing slash; credentials, query and fragment are forbidden. Used for assets, navigation, canonical, feeds, Sitemap and sharing.                                                                                                                                                                                |
| `site.defaultLocale`      | BCP 47 string                                                          | Yes      | 'zh'                     | Default copy/content language and default destination under the selected prefix policy; must be in locales.                                                                                                                                                                                                                                                                                                                                                         |
| `site.locales`            | Locale[]                                                               | Yes      | ['zh', 'en']             | Content languages built by the site, independent of registered UI packs; accepts any valid BCP 47 code; nonempty and unique. Order also participates in missing-translation selection. Keep one code for a single-language site.                                                                                                                                                                                                                                    |
| `site.localePrefixPolicy` | `'redirect-to-default'` / `'omit-default-prefix'` / `'require-prefix'` | No       | `'redirect-to-default'`  | Omitted: zero-second meta refresh from unprefixed HTML URLs directly to final default-language pages. `omit-default-prefix`: build the default language only without a prefix. `require-prefix`: unprefixed URLs return 404. After changes, authors must check relative content links; the theme does not migrate them and warns about invalid local relative URLs during builds. See [language prefix policies](../content/languages.md#language-prefix-policies). |
| `site.timezone`           | string                                                                 | Yes      | 'Asia/Shanghai'          | Valid IANA timezone, such as UTC. Controls displayed dates, archives, statistics and elapsed days.                                                                                                                                                                                                                                                                                                                                                                  |

## author: identity and social links

| Field                    | Type      | Required | Initial value                           | Meaning and input                                                                                                                                   |
| ------------------------ | --------- | -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `author`                 | object    | Yes      | Fields below                            | Author menu and article attribution.                                                                                                                |
| `author.name`            | Localized | Yes      | 'Astro Theme BlogGPT'                   | Display name, also used in sharing and generated cards.                                                                                             |
| `author.bio`             | Localized | Yes      | Welcome to the BlogGPT theme demo site! | Bottom-left author details and menu biography. Accepts a string or localized map; use an empty string to leave it blank.                            |
| `author.avatar`          | string    | Yes      | '/images/avatar.webp'                   | Public local path or full image URL. public/avatar.webp is /avatar.webp; base is handled by the theme.                                              |
| `author.socials`         | array     | Yes      | GitHub, YouTube and email examples      | Display order follows the array. [] removes social entries. Replace sample URLs.                                                                    |
| `author.socials[].label` | Localized | Yes      | Platform names                          | Menu text and accessible name.                                                                                                                      |
| `author.socials[].icon`  | string    | Yes      | e.g. 'simple-icons:github'              | Simple Icons for brands, e.g. simple-icons:youtube; lucide:mail for generic actions. Missing namespace defaults to Simple Icons in social controls. |
| `author.socials[].href`  | string    | Yes      | example.com or email placeholder        | Full destination or mailto:hello@example.org.                                                                                                       |

## text: descriptive copy

The text object and the copy fields below are required. Copy values use **Localized**; `text.tabs` is a required object containing search and posts. Empty strings clear copy. The table lists repository example copy; all language values live in blog.config.ts.

| Field                    | Example copy                                            | Location and effect                                                                                                    |
| ------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `text.siteDescription`   | An Astro blog theme inspired by ChatGPT's layout.       | Default SEO description, site-title supplement and RSS description. Entry descriptions take priority on content pages. |
| `text.homeHeading`       | What would you like to read today?                      | Large heading above home search.                                                                                       |
| `text.tabs`              | search, posts                                           | Required top-Tab copy object; both children are required and can be translated independently.                          |
| `text.tabs.search`       | Read                                                    | First top Tab, linking to the homepage search interface; accepts Localized.                                            |
| `text.tabs.posts`        | Articles                                                | Second top Tab, linking to the article list; accepts Localized.                                                        |
| `text.searchHeading`     | Enter keywords to discover an article                   | Search-page and empty-search prompt.                                                                                   |
| `text.searchPlaceholder` | Search articles, ideas and keywords                     | Search input placeholder.                                                                                              |
| `text.notFoundMessage`   | This page has no story yet.                             | 404 body message; does not change HTTP status.                                                                         |
| `text.footerDescription` | BlogGPT theme demo · Sample content ready to customize. | Second footer line, suitable for a copyright/content notice.                                                           |

Generic action labels such as Search or Copied are maintained by the central packs under src/i18n/, registered in src/i18n/i18n.config.ts, rather than public blog.config.ts fields.

## appearance: visual defaults

| Field                            | Type                          | Required | Initial value  | Meaning and differences                                                                                                                                         |
| -------------------------------- | ----------------------------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`                     | object                        | Yes      | Fields below   | Global appearance.                                                                                                                                              |
| `appearance.defaultTheme`        | light / dark / system         | Yes      | 'system'       | New visitors use light, dark or system appearance. Saved browser preferences take priority.                                                                     |
| `appearance.pageTransition`      | fade / none                   | Yes      | 'fade'         | fade briefly fades article content; none disables that transition while retaining Astro client navigation. Reduced-motion preferences are respected.            |
| `appearance.codeThemes`          | object                        | Yes      | Fields below   | Light and dark code themes.                                                                                                                                     |
| `appearance.codeThemes.light`    | Shiki theme name              | Yes      | 'github-light' | Supported installed Shiki / Expressive Code theme for light mode.                                                                                               |
| `appearance.codeThemes.dark`     | Shiki theme name              | Yes      | 'github-dark'  | Dark-mode theme, e.g. dracula. Unknown names fail the build.                                                                                                    |
| `appearance.showCodeLineNumbers` | boolean                       | Yes      | false          | Default code line-number visibility.                                                                                                                            |
| `appearance.categoryCoverStyle`  | thumbnail / fade / background | Yes      | 'thumbnail'    | Small thumbnail; right-side image fading left; or full-card background with overlay. Category coverStyle overrides it. Entries without images stay plain cards. |

## sidebar: navigation and width

| Field                   | Type             | Required | Initial value                                                                        | Meaning and constraints                                      |
| ----------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `sidebar`               | object           | Yes      | Fields below                                                                         | Sidebar and site-name menu.                                  |
| `sidebar.items`         | NavigationItem[] | Yes      | Home, articles, categories, archives, friends, About, theme repository, BlogGPT docs | Fixed sidebar entries and order; [] clears fixed navigation. |
| `sidebar.menu`          | NavigationItem[] | Yes      | Home, articles, About, theme repository, BlogGPT docs                                | Independent top-left site-name menu.                         |
| `sidebar.width`         | object           | Yes      | Fields below                                                                         | Desktop draggable width, in px.                              |
| `sidebar.width.default` | number           | Yes      | 340                                                                                  | Initial width without a saved browser preference.            |
| `sidebar.width.min`     | number           | Yes      | 240                                                                                  | Minimum width, at least 200.                                 |
| `sidebar.width.max`     | number           | Yes      | 480                                                                                  | Maximum width, at most 600; min ≤ default ≤ max.             |

### Every NavigationItem field

Provide common fields, then the fields required by type. UI icons use Lucide; files and lucide:files both work.

| Field         | Type                      | Required                                | Omission behavior and meaning                                                                                                                                                                                                                                                                                 |
| ------------- | ------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | string                    | Yes                                     | Stable unique identifier such as about; avoid duplicates within a menu.                                                                                                                                                                                                                                       |
| `label`       | Localized                 | Yes                                     | Displayed navigation name.                                                                                                                                                                                                                                                                                    |
| `icon`        | string                    | sidebar.items only, required            | Sidebar items use Lucide or Simple Icons. sidebar.menu does not have this field.                                                                                                                                                                                                                              |
| `description` | Localized                 | No                                      | No secondary description when omitted; supplies menu supporting text when present.                                                                                                                                                                                                                            |
| `type`        | builtin / page / external | Yes                                     | Builtin feature, standalone content, or external destination.                                                                                                                                                                                                                                                 |
| `route`       | builtin ID                | Required for builtin                    | home, posts, categories, archives, links or tags; an identifier, not a URL. Omit for other types.                                                                                                                                                                                                             |
| `page`        | string                    | Required for page; optional for builtin | A pages slug, not a source path. Page entries link to standalone pages; posts/categories/tags/archives/links bindings place its title, description and body before the feature. Home has no introduction binding. No binding uses the default title and an empty body; missing bound content raises an error. |
| `href`        | string                    | Required for external                   | Full external address; unused for other types.                                                                                                                                                                                                                                                                |
| `newTab`      | boolean                   | Optional for external                   | Default false uses this tab; true opens a new tab.                                                                                                                                                                                                                                                            |

```ts
{ id: 'about', type: 'page', page: 'about', label: { zh: '关于', en: 'About' }, icon: 'info' },
{ id: 'topics', type: 'builtin', route: 'categories', page: 'categories', label: 'Topics', icon: 'shapes' },
{ id: 'docs', type: 'external', href: 'https://docs.astro.build/', newTab: true, label: 'Astro', icon: 'globe' },
```

Keep page bindings consistent when the same route appears in both menus. The first matching binding is selected in items then menu order. Introductions belong to pages, not posts. See [taxonomy and pages](../content/taxonomy.md).

## posts: lists and dates

| Field                   | Type                       | Required | Initial value                                       | Meaning                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | -------------------------- | -------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `posts`                 | object                     | Yes      | Fields below                                        | Article-list settings.                                                                                                                                                                                                                                                                                                                                                                                                |
| `posts.pathPrefix`      | string                     | No       | `''`                                                | Directory between posts/ and the slug. Prefer `[year]/`, `[year]/[month]/` or `notes/[year]/`; the trailing slash is optional and normalized internally. Date placeholders use site.timezone. No leading slash, empty segments, query, traversal or reserved page prefix. Rebuild and migrate old links after changes; authors must check relative content links. Invalid local relative URLs produce build warnings. |
| `posts.perPage`         | positive integer           | Yes      | 5                                                   | Articles per listing page.                                                                                                                                                                                                                                                                                                                                                                                            |
| `posts.homeLimit`       | positive integer           | Yes      | 4                                                   | Homepage article count.                                                                                                                                                                                                                                                                                                                                                                                               |
| `posts.menuLimit`       | positive integer           | Yes      | `12`                                                | Recent articles shown in the plus menu. Values above the article count (e.g. `99999`) include all posts; does not limit the full sidebar list.                                                                                                                                                                                                                                                                        |
| `posts.randomLimit`     | positive integer           | Yes      | `12`                                                | Recent candidates for the random button and /random, ordered by publication time. `99999` includes all; independent of menuLimit.                                                                                                                                                                                                                                                                                     |
| `posts.showDraftsInDev` | boolean                    | Yes      | true                                                | Preview draft and future content in development; false limits preview to published content. It never publishes drafts in production.                                                                                                                                                                                                                                                                                  |
| `posts.dateFormat`      | Intl.DateTimeFormatOptions | Yes      | { year: 'numeric', month: 'short', day: 'numeric' } | Native date formatting; locale follows the interface, timezone is forced to site.timezone. {} uses Intl's default date format.                                                                                                                                                                                                                                                                                        |

Native dateFormat options: year, day, hour, minute and second accept numeric / 2-digit. month also accepts long / short / narrow. weekday, era and dayPeriod accept long / short / narrow. fractionalSecondDigits is 1 / 2 / 3; hour12 is boolean; hourCycle is h11 / h12 / h23 / h24. dateStyle and timeStyle accept full / long / medium / short and cannot be combined with specific components such as year or month.

Other native options are calendar (e.g. gregory), numberingSystem (e.g. latn), localeMatcher (lookup / best fit), formatMatcher (basic / best fit), and timeZoneName (short / long / shortOffset / longOffset / shortGeneric / longGeneric). Omitted values are inferred by Intl. timeZone is always overridden by site.timezone. Invalid combinations or IDs can fail the build; keep the repository format or use only { dateStyle: 'long' }.

## article: default reading settings

article is required. Feature switches apply where the relevant renderer is used. An explicit [frontmatter](../content/frontmatter.md) boolean takes priority; false disables a global feature and true can re-enable one.

| Field                         | Type                   | Required | Initial / Omitted value    | Meaning                                                                                              |
| ----------------------------- | ---------------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `article.math`                | boolean                | Yes      | true                       | KaTeX math.                                                                                          |
| `article.mermaid`             | boolean                | Yes      | true                       | Mermaid diagrams with on-demand client loading.                                                      |
| `article.lightbox`            | boolean                | Yes      | true                       | PhotoSwipe content-image galleries.                                                                  |
| `article.callouts`            | boolean                | Yes      | true                       | Convert NOTE / TIP marked quotes into callouts.                                                      |
| `article.display`             | partial ArticleDisplay | No       | Each omitted field is true | Visual reading details for articles and standalone pages.                                            |
| `article.display.author`      | boolean                | No       | true                       | Author avatar and name.                                                                              |
| `article.display.published`   | boolean                | No       | true                       | Publication date; pages without dates have none to display.                                          |
| `article.display.readingTime` | boolean                | No       | true                       | Estimated minutes calculated from body length.                                                       |
| `article.display.updated`     | boolean                | No       | true                       | End-of-body update date, only when provided and different from publication; no filesystem inference. |
| `article.display.tags`        | boolean                | No       | true                       | Bottom article tags; pages have no article-tag relations.                                            |
| `article.display.share`       | boolean                | No       | true                       | Share button and popover.                                                                            |
| `article.display.navigation`  | boolean                | No       | true                       | Previous/next links for articles.                                                                    |
| `article.display.title`       | boolean                | No       | true                       | Title, description and categories. Does not remove browser/search titles or control the cover.       |

Display switches control reading-page details. Article covers appear above titles; list covers appear beside summaries.

### article.toc: outline

| Field                     | Type                     | Required | Initial / Omitted value | Meaning                                                                                     |
| ------------------------- | ------------------------ | -------- | ----------------------- | ------------------------------------------------------------------------------------------- |
| `article.toc`             | object                   | Yes      | Fields below            | Desktop interactive outline and narrow-screen top-right outline panel.                      |
| `article.toc.enabled`     | boolean                  | Yes      | true                    | Default outline enablement; per-entry toc overrides. No matching headings means no outline. |
| `article.toc.minDepth`    | integer 1–6              | Yes      | 2                       | Shallowest heading; 2 means ##.                                                             |
| `article.toc.maxDepth`    | integer 1–6              | Yes      | 4                       | Deepest heading; cannot be less than minDepth.                                              |
| `article.toc.expandDelay` | nonnegative milliseconds | Yes      | 1000                    | Stationary dwell before full expansion; motion restarts the timer.                          |
| `article.toc.hideDelay`   | nonnegative milliseconds | No       | 800                     | Wait after leaving before automatic dismissal.                                              |

The outline includes line previews, drag navigation and visible-section dashed frames. See the [interactive outline](./toc.md).

### article.shareCover: generated images

| Field                           | Type             | Required | Initial / Omitted value | Meaning                                                                                                                                                                    |
| ------------------------------- | ---------------- | -------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `article.shareCover`            | object           | Yes      | Fields below            | Satori generates PNGs at build time.                                                                                                                                       |
| `article.shareCover.enabled`    | boolean          | Yes      | true                    | Default enablement; per-entry shareCover overrides. Disabled entries use ordinary covers if present, otherwise no preview image.                                           |
| `article.shareCover.width`      | integer 320–4096 | Yes      | 1200                    | Output width in px.                                                                                                                                                        |
| `article.shareCover.height`     | integer 320–4096 | Yes      | 630                     | Output height in px; a landscape ratio is recommended.                                                                                                                     |
| `article.shareCover.background` | CSS color string | Yes      | '#f5f5f5'               | Image background.                                                                                                                                                          |
| `article.shareCover.foreground` | CSS color string | Yes      | '#171717'               | Title and text color.                                                                                                                                                      |
| `article.shareCover.accent`     | CSS color string | Yes      | '#3b82f6'               | Branding block color, not site link color.                                                                                                                                 |
| `article.shareCover.fontPath`   | string           | No       | Bundled Noto Sans SC    | Build-machine font file, absolute or relative to the project root. Prefer TTF / OTF / WOFF covering the text characters. Not a public URL; a missing file fails the build. |

Cards contain the entry title, description and localized site/author names. Results cache in .astro/share-covers/ and regenerate when content, style or font changes. Hover Share on desktop to view the card; there is no separate preview button.

## sharing: copied text and destinations

| Field                      | Type      | Required | Initial / Omitted value                            | Meaning                                                                                                          |
| -------------------------- | --------- | -------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `sharing`                  | object    | No       | Default copy format, no platforms                  | Omitting the object still permits copied share text and links.                                                   |
| `sharing.copyFormat`       | Localized | No       | '{title}\n{description}\n{author} · {blog}\n{url}' | Main share-button copy format; \n in a TS string means a newline.                                                |
| `sharing.platforms`        | array     | No       | Omitted: []; repository: 15 entries                | Display order; at most two rows then scroll. [] retains copy controls only.                                      |
| `sharing.platforms[].name` | Localized | Yes      | Platform names                                     | Display name, independent of the API.                                                                            |
| `sharing.platforms[].icon` | string    | No       | Name only                                          | Simple Icons for brands; lucide:mail for generic actions.                                                        |
| `sharing.platforms[].href` | string    | Yes      | Platform API templates                             | Only http, https or mailto. Use a share endpoint, not a homepage. Variables are encoded once; do not pre-encode. |

Copy formats use {title}, {description}, {author}, {blog}, {url}, {image}. Destination hrefs additionally accept {text}, the assembled copy message. url/image are production absolute URLs including base; absent descriptions are empty. Unknown placeholders remain unchanged, with no JS execution or recursive replacement.

Repository presets: X, Facebook, LinkedIn, Reddit, Bluesky, Threads, Telegram, WhatsApp, LINE, Weibo, QQ, QQ Space, Tumblr, Pinterest and email. Edit the platform list through platforms; omission uses an empty array. Pinterest requires an image. Platforms handle fetching, login and final publication. See [sharing](./reading.md#sharing-templates).

## statistics: blog statistics

The whole object is optional. All boolean fields default to **true**, and recentLimit defaults to **12**. Individual switches hide individual items; enabled removes the dialog, author-menu entry and status command together.

| Field                         | Type         | Initial / Omitted value | Meaning                                                                                                                     |
| ----------------------------- | ------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `statistics.enabled`          | boolean      | true                    | Master switch.                                                                                                              |
| `statistics.articleCount`     | boolean      | true                    | Public article count.                                                                                                       |
| `statistics.wordCount`        | boolean      | true                    | Body character total, excluding fenced code and link URLs.                                                                  |
| `statistics.days`             | boolean      | true                    | Elapsed days from footer.since to build day.                                                                                |
| `statistics.languages`        | boolean      | true                    | Enabled interface languages.                                                                                                |
| `statistics.averageWords`     | boolean      | true                    | Average body length per article.                                                                                            |
| `statistics.updateFrequency`  | boolean      | true                    | Mean publication interval: newest minus oldest publication divided by article count minus one; fewer than two shows a dash. |
| `statistics.firstPublication` | boolean      | true                    | Earliest public publication; empty sites show a dash.                                                                       |
| `statistics.lastUpdate`       | boolean      | true                    | Latest public article update, with publication as each article's fallback.                                                  |
| `statistics.heatmap`          | boolean      | true                    | Last 365 days through build day, grouped by site.timezone. Only dates with articles show entry popovers.                    |
| `statistics.recentWords`      | boolean      | true                    | Recent article-length bars ordered by publication, with title/description tooltips.                                         |
| `statistics.recentLimit`      | integer 1–50 | 12                      | Bar-chart limit, independent of posts.menuLimit and posts.randomLimit.                                                      |

Only discoverable published articles in the current language count, excluding drafts, future and hidden entries. Figures update on builds; footer statistics are displayed separately.

## footer

| Field                    | Type             | Required | Initial value                                      | Meaning                                                                                                                                      |
| ------------------------ | ---------------- | -------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `footer`                 | object           | Yes      | Fields below                                       | Three centered lines.                                                                                                                        |
| `footer.since`           | number or string | Yes      | 2024                                               | Year number or valid YYYY-MM-DD string. A year starts January 1; displays copyright range and elapsed days at build time, updated on builds. |
| `footer.author`          | Localized        | Yes      | 'Astro Theme BlogGPT'                              | Copyright name; empty strings use author.name.                                                                                               |
| `footer.showAttribution` | boolean          | Yes      | true                                               | Show Powered by Astro & BlogGPT; false retains the license.                                                                                  |
| `footer.license`         | object           | Yes      | Fields below                                       | Content license, separate from theme-code licensing.                                                                                         |
| `footer.license.label`   | string           | Yes      | 'CC BY-NC-SA 4.0'                                  | Plain license name; the final footer row stays in English without translation.                                                               |
| `footer.license.url`     | string           | Yes      | https://creativecommons.org/licenses/by-nc-sa/4.0/ | License description link; change it together with its name.                                                                                  |

Line one combines copyright, days and article/character totals; line two is text.footerDescription; line three is attribution and license. Set your copyright description in `text.footerDescription`.

## friends.config.ts: friends

Export a `FriendsConfig` array of groups directly. Array order controls display order; `[]` means no friends. The title, description and introductory body come from `content/pages/links/index.[lang].md`, bound through `page: 'links'` in navigation, rather than this configuration.

| Field                           | Type        | Required | Initial value / Omission | Meaning                                                                                                               |
| ------------------------------- | ----------- | -------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `friends[]`                     | group array | Yes      | Four example groups      | Groups appear in array order.                                                                                         |
| `friends[].title`               | Localized   | Yes      | Group name               | Group heading.                                                                                                        |
| `friends[].description`         | Localized   | No       | Hidden                   | Group description.                                                                                                    |
| `friends[].links`               | array       | Yes      | Example links            | Ordered cards; an empty array is allowed.                                                                             |
| `friends[].links[].name`        | Localized   | Yes      | Site name                | Searchable card title.                                                                                                |
| `friends[].links[].description` | Localized   | Yes      | Site description         | Searchable description; an empty string is allowed.                                                                   |
| `friends[].links[].url`         | string      | Yes      | Site URL                 | Full destination URL.                                                                                                 |
| `friends[].links[].avatar`      | string      | No       | Uses icon                | Rounded square image: full URL or a public path. Local paths receive the deployment prefix. An avatar takes priority. |
| `friends[].links[].icon`        | string      | No       | `'globe'`                | Lucide fallback without avatar; accepts `book-open` or `lucide:book-open`. Avatars take priority when present.        |

```ts
import type { FriendsConfig } from './src/types/config';

const friends: FriendsConfig = [
  {
    title: { zh: '资源', en: 'Resources' },
    links: [
      {
        name: 'Astro',
        description: { zh: '官方文档', en: 'Documentation' },
        url: 'https://docs.astro.build/',
        icon: 'book-open', // An avatar may be configured instead and takes priority.
      },
    ],
  },
];
export default friends;
```

## Interface language registry

`src/i18n/i18n.config.ts` registers interface translations from the same directory and is maintained by theme and community contributors. This registry supplies theme interface copy only. Site owners choose content languages through `site.locales` independently of UI registration; missing interface translations use fallback copy. Each language has required `label: string` and `messages: Partial<Messages>` and optional `dir: 'ltr' | 'rtl'` (inferred when omitted). Keys are BCP 47 codes. Enable routes in `site.locales`; registration alone does not generate pages. Partial UI packs inherit the default language then English, with regional parent fallback. See the complete [language guide](../content/languages.md).

## Next steps

Start with [site and appearance](./site.md) for addresses, identity, copy and dates, then [navigation and friends](./navigation.md). Per-entry fields and inheritance are in [frontmatter](../content/frontmatter.md).
