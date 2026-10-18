# Migrate an existing blog

## Organize articles

Place Markdown / MDX files in `content/posts/` and fill in titles, slugs and dates. Convert the previous theme’s shortcodes or template tags to Markdown, HTML or MDX components.

Keep translations of an article in the same directory, paired by language suffix. See [Languages and translations](../content/languages.md).

## Manage assets

Use index bundles for articles with attachments, referencing images, code and downloads through relative paths. Put shared assets in `public/` and use site paths such as `/images/example.webp`.

## Categories and tags

Create definitions under `content/categories/` and `content/tags/` with names, descriptions and covers. Reference their slugs in article `categories` and `tags`.

## Set new addresses

Set `site.baseUrl` and the language prefix policy. For date directories, use a pattern such as `posts.pathPrefix: '[year]/'`. See [Files and URLs](../content/organization.md).

Configure permanent redirects at the host from old URLs to the new site’s final addresses.

## Check and publish

Run `pnpm build` and `pnpm preview`. Check articles, images, attachments, code, categories, language switching, search, RSS and old links, then deploy the complete `dist/`. See [Build and deploy](./deployment.md) for the steps.
