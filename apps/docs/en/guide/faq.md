# Frequently asked questions

## Why is an article visible in development but absent from production?

Check `draft` and the publication date. Development can preview drafts and future articles with `posts.showDraftsInDev`. To publish, set the draft to `false` and build after its publication time.

## Why does switching languages show fallback content?

Check for the requested language suffix in the same directory with the same base filename. See [Languages and translations](../content/languages.md#missing-translations) for selection order.

## Why does an attachment return 404?

Confirm the article uses an index bundle, the path and letter case match the file, and deployment includes complete output. Put shared assets for standalone articles in `public/`. See [Bundles and attachments](../content/bundles.md).

## Why does a Mermaid diagram show source?

Confirm `mermaid` is enabled, the code block is marked `mermaid`, and its diagram syntax is valid. The renderer loads as the diagram approaches the viewport; check the browser console for loading failures.

## How do I update search after editing content?

Run `pnpm build` to generate current Pagefind indexes, then check with `pnpm preview`. Deploy pages and search indexes together.

## Why does some configured copy still show old text in another language?

Localized maps select the current language’s value; update each language key together. Body translations live in their corresponding Markdown / MDX files.

## Why does the footer still show the previous author?

`footer.author` can be configured separately. Set it to an empty string to follow `author.name`, then rebuild.

## How do article and share covers work together?

`image` sets body and list covers. With `article.shareCover` enabled, sharing uses a generated Satori image. Set `shareCover: false` on an entry to use its ordinary cover. `display.share` controls the share button.

## Why does a category display its slug as its name?

Create a definition for the slug in `content/categories/` or `content/tags/` and fill in title. Article categories and tags refer to the definition’s slug. See [Categories and tags](../content/taxonomy.md#categories-and-tags).

## How can custom scripts run after client navigation?

Register behavior in `onPageLoad` in `custom/client.ts`, with `signal` or a returned cleanup function. See [Global extensions](../customization/hooks.md).

## What should I check when configuration fails?

Follow the error message to check field names, types, required fields and ranges in `blog.config.ts` and `friends.config.ts`. See the [complete configuration reference](../config/reference.md).
