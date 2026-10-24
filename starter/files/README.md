# BlogGPT Starter

A minimal blog powered by [BlogGPT](https://github.com/Raincarnator/astro-theme-BlogGPT) and Astro.

**English** · [简体中文](README.zh-CN.md)

[Use this template](https://github.com/__STARTER_REPOSITORY__/generate)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F__STARTER_REPOSITORY__)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/__STARTER_REPOSITORY__)

The buttons copy this starter into your own Git repository and configure a static deployment. Future commits to your repository trigger your hosting provider's builds.

## Local development

Use Node.js 24 and the pnpm version pinned in `package.json`:

```sh
corepack enable
corepack install
pnpm install --frozen-lockfile
pnpm dev
```

## Make it yours

1. Set `site.baseUrl` in `blog.config.ts` to your production URL. You can also set `SITE_URL` in your hosting provider's environment settings. Otherwise the starter uses the Vercel production domain or Netlify site URL automatically; local builds use `https://example.com/`.
2. Edit your title, author, language and navigation in `blog.config.ts`. The starter defaults to Chinese; set `defaultLocale` and `locales` to `en` for English.
3. Replace `content/posts/hello-world.md` and `content/pages/about.md`. The initial friend directory contains only the official BlogGPT documentation site; edit `friends.config.ts` to customize it.
4. Add static assets to `public/`; customize styles, markup and client scripts in `custom/`.

```sh
pnpm new post my-post --title "My first post"
pnpm build
pnpm preview
```

New posts are drafts. Set `draft: false` and a publication date to publish them. Both hosts publish `dist/`; no adapter, API key or server is required. Set `SITE_URL` and rebuild after adding a custom domain so canonical URLs, feeds and sitemaps use it.

This repository intentionally contains only the theme, writing tools and minimal content. Full guides live in the [documentation](https://bloggpt.reincarnatey.net/en/). It is generated from the theme repository; create your own repository with the template or deploy buttons before customizing. Upstream starter synchronization does not update repositories created from this template.

Theme code: [Apache-2.0](LICENSE). See [third-party notices](THIRD_PARTY_NOTICES.md).
