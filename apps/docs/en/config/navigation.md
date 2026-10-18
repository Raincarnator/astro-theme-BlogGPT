# Navigation, author and friends

## Two navigation lists

`sidebar.items` configures sidebar navigation; `sidebar.menu` configures the top-left site-name menu. Both support three entry types:

| type       | Purpose         | Destination field |
| ---------- | --------------- | ----------------- |
| `builtin`  | Builtin page    | `route`           |
| `page`     | Standalone page | `page`            |
| `external` | External link   | `href`            |

```ts
{ id: 'posts', type: 'builtin', route: 'posts', page: 'posts', label: 'Articles', icon: 'files' },
{ id: 'about', type: 'page', page: 'about', label: 'About', icon: 'info' },
{ id: 'repo', type: 'external', href: 'https://github.com/Raincarnator/BlogGPT', label: 'Github repository', icon: 'simple-icons:github', newTab: true },
```

These examples are `sidebar.items` entries. The site-name menu uses the same destination fields and omits `icon`. Names and descriptions accept localized maps. Use Lucide for UI icons and Simple Icons for brands.

A builtin entry’s `page` binds introductory content; see [Categories, tags and pages](../content/taxonomy.md). `sidebar.width` sets default, minimum and maximum widths. Drag the divider or focus it and use arrow keys to resize; double-click to restore the default.

## Author menu

`author` configures the name (`name`), biography (`bio`), avatar and social links. Both `name` and `bio` accept plain strings or localized maps, for example:

```ts
author: {
  // Retain the avatar, social links and other fields
  name: { zh: '站点作者', en: 'Site author' },
  bio: { zh: '记录日常与想法。', en: 'Notes from everyday life.' },
},
```

Avatars accept a public path or complete HTTPS URL.

The bottom-left menu provides social links, shortcut help, blog statistics, appearance, language and RSS. Single-language sites hide language selection; disabling statistics hides its entry. Shortcut and statistics dialogs close with the backdrop, close button or Escape.

## Friends

`friends.config.ts` exports a grouped array directly:

```ts
const friends: FriendsConfig = [
  {
    title: { zh: '主题帮助', en: 'Theme help' },
    description: {
      zh: '文档与相关资源。',
      en: 'Documentation and related resources.',
    },
    links: [
      {
        name: 'BlogGPT',
        description: { zh: '主题文档', en: 'Theme documentation' },
        url: 'https://bloggpt.reincarnatey.net',
        avatar: '/images/avatar.webp',
      },
    ],
  },
];
```

Each group has a title, optional description and links. Each link has a name, description, URL, and an avatar or fallback Lucide icon. The page title and introduction come from its bound pages entry. Search filters by name, description and group name immediately.

See the [configuration reference](./reference.md#friends-config-ts-friends) for types and fields.

## Commands and completion

The homepage plus menu lists commands and recent articles. Type `/` to filter commands, or `@` to match all public article titles. Select a suggestion to complete the input, then submit to execute it. `/theme ` and `/lang ` also suggest arguments.

| Command                  | Action                                             |
| ------------------------ | -------------------------------------------------- |
| `/random`                | Open a random recent public article                |
| `/lang` / `/lang en`     | Cycle languages or select an enabled language      |
| `/theme` / `/theme dark` | Switch appearance or specify light, dark or system |
| `/status`                | Open blog statistics                               |
| `/categories`            | Open the category index                            |
| `/archives`              | Open the archives                                  |

`posts.menuLimit` controls recent articles in the plus menu; `posts.randomLimit` controls random candidates. They are independent. A value above the article count, such as `99999`, includes all. The sidebar’s Recent section shows all unpinned public articles in date order.

## Search scopes and passage links

| Scope      | Content                                                                          |
| ---------- | -------------------------------------------------------------------------------- |
| Articles   | Article titles, descriptions and bodies                                          |
| Titles     | Article titles and descriptions                                                  |
| Body       | Article bodies, including headings                                               |
| Everywhere | Articles, standalone pages, categories and tags, including builtin introductions |

Body matches include section names and highlighted context. Click a passage to open the matching paragraph. Adjacent matches are merged. Development provides local search; production builds generate Pagefind indexes.

## Demo avatar sources

Demo friends include example sites, theme help, icon resources and reference blogs. Theme help uses public BlogGPT, Astro and MDN identities; Lucide, Simple Icons, Stack and Fuwari use project logos, while AstroPaper uses its author’s avatar. Fictional sites use local gradient images.

Resources: [Astro](https://github.com/withastro), [MDN](https://github.com/mdn), [Lucide](https://lucide.dev), [Simple Icons](https://simpleicons.org), [Stack](https://stack.cai.im/logo.png), [Fuwari](https://github.com/saicaca/fuwari), [AstroPaper](https://github.com/satnaing/astro-paper). Image rights belong to the respective projects or authors.
