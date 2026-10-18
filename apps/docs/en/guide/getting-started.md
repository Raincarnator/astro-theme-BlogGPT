# Install and preview

## Requirements

Prepare Node.js **22.12 or newer** and pnpm **11**:

```sh
node --version
pnpm --version
```

Download or clone the theme repository. Run these commands in the root containing `package.json`:

```sh
pnpm install
pnpm dev
```

Open the address printed in the terminal. Development watches content and style changes; restart after changing configuration or dependencies.

## Initial setup

1. Set `site.baseUrl`, the site name and languages in `blog.config.ts`.
2. Edit the `author` name, biography, avatar and social links, and descriptive copy in `text`.
3. Adjust navigation and edit the pages and translations under `content/pages/`.
4. Replace friend links in `friends.config.ts`, or export an empty array `[]`.
5. Replace demo articles, categories, tags and images.

See the [complete configuration reference](../config/reference.md) for fields and [Site and appearance](../config/site.md) for common settings.

Everyday configuration, writing and customization primarily use `blog.config.ts`, `content/`, `public/`, `custom/` and `archetypes/`, with friend links in `friends.config.ts`. Keep article-specific components in their bundle and shared components in `custom/components/`. See [MDX interactive components](../config/enhancements.md#mdx-interactive-components).

## Write your first article

Create a standalone article:

```sh
pnpm new post hello --title "My first article"
```

This creates `content/posts/hello.mdx`. For images and attachments, use the bundle template:

```sh
pnpm new post first-bundle --use bundle --title "An article with images"
```

This creates `content/posts/first-bundle/index.mdx`. Add attachments to the same folder. Edit the title, description and body, set `draft` to `false` and choose the publication date.

`--title` sets the title, `--use` selects a template, and the slug determines the URL. See [writing templates](../content/archetypes.md) for more options.

## Preview production output

```sh
pnpm build
pnpm preview
```

`build` checks types and generates pages, attachments, share covers and search indexes. `preview` serves production files from `dist/` to check search, publication states and deployment paths. Rebuild after changing content.

## Common commands

| Command        | Purpose                     |
| -------------- | --------------------------- |
| `pnpm dev`     | Start the live blog preview |
| `pnpm build`   | Build the blog              |
| `pnpm preview` | Preview the built blog      |
