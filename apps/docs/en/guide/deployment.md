# Build and deploy

BlogGPT generates static files. Connecting a Git repository to Vercel for automatic builds and deployments is recommended; you can also publish the output to other hosts that support directory indexes.

Build with `pnpm build`; the output directory is `dist/`.

## One-click deployment (Starter)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRaincarnator%2Fastro-theme-BlogGPT-starter)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Raincarnator/astro-theme-BlogGPT-starter)

Start a personal blog from the automatically maintained [starter template repository](https://github.com/Raincarnator/astro-theme-BlogGPT-starter). It includes the necessary theme code, writing tools, one welcome post, an About page and the official documentation link in the friend directory, without demo articles or the documentation workspace. You can also choose **Use this template** in the repository to create your own blog repository.

1. Click the deployment button for your hosting provider, sign in and follow the prompts to save the starter to your own Git repository.
2. Deploy using the included `vercel.json` or `netlify.toml`. The starter uses Node.js 24 and the pnpm version pinned in `package.json`, and publishes `dist/`.
3. Customize site details in `blog.config.ts`, articles and pages in `content/`, and friend links in `friends.config.ts`. Push commits to your repository to update the site automatically.

The starter defaults to the production domain provided by the host. After adding a custom domain, set `SITE_URL` in your hosting provider and rebuild, or replace `site.baseUrl` with a fixed production address so canonical URLs, RSS and Sitemap use the correct domain. Upstream starter synchronization only updates the template repository; it does not overwrite your personal blog repository.

The following sections cover production addresses, output checks and manual deployment. Starter projects created with the buttons can use their included hosting configuration directly.

## Production address

Set `site.baseUrl` to the complete production address:

- Domain root: `https://blog.example.org/`.
- Subdirectory: `https://example.org/blog/`.

It determines deployment paths, canonical URLs, RSS, Sitemap and sharing addresses. Rebuild after changing it, and replace `example.com` in the demo configuration before publishing.

`site.localePrefixPolicy` determines language prefixes. The default `redirect-to-default` uses a zero-second meta refresh from unprefixed HTML addresses directly to final default-language pages. Alternatives omit the default-language prefix or require prefixes. See [Languages and translations](../content/languages.md#language-prefix-policies).

## Check production output

```sh
pnpm install
pnpm build
pnpm preview
```

The build checks types and generates pages, attachments, share covers, Sitemap and Pagefind indexes. Preview home, articles, categories, tags, pages, images, attachments, language switching, search and feeds.

## Deploy to Vercel (recommended)

Connect a Git repository and let Vercel build and publish the blog. Vercel supports Astro natively and lets you select the build command and output directory. Later commits can update the site automatically, while preview deployments let you check changes. BlogGPT uses Astro’s static build; keep the repository’s existing Astro configuration. See [Astro’s Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/).

### Import the repository

1. Push your customized theme source to your own GitHub, GitLab or Bitbucket repository, retaining `package.json`, `pnpm-lock.yaml` and `pnpm-workspace.yaml`.
2. [Create a Vercel project](https://vercel.com/new), connect your Git account and import that repository.
3. Use the repository root containing `blog.config.ts` and the root `package.json`, then configure the build below.

### Build settings

| Setting          | Value                                                       |
| ---------------- | ----------------------------------------------------------- |
| Framework Preset | `Astro`                                                     |
| Root Directory   | Repository root; keep the default                           |
| Install Command  | `pnpm install --frozen-lockfile`                            |
| Build Command    | `pnpm build`                                                |
| Output Directory | `dist`                                                      |
| Node.js Version  | `24.x`, satisfying the project’s Node.js 22.12+ requirement |

Add `ENABLE_EXPERIMENTAL_COREPACK=1` to the Production and Preview environment variables so builds use the pnpm version declared by `packageManager` in the root `package.json`. See [Vercel’s build settings and Corepack documentation](https://vercel.com/docs/builds/configure-a-build).

`pnpm build` runs the theme’s complete build, including type checks, bundled attachments, share covers and Pagefind search indexes. Vercel publishes the final files from `dist`.

### Domain and first deployment

Set `site.baseUrl` to the production address. To start with the domain assigned by Vercel, use `https://your-blog.vercel.app/`, replacing `your-blog` with the actual project domain. For a custom domain, enter its complete address, add it to the Vercel project and configure DNS as instructed.

Save the configuration and push the commit, then click Deploy in Vercel. Once the build finishes, check articles, images, attachments, search, RSS and the 404 page for unknown addresses. When changing domains, update `site.baseUrl` and redeploy so canonical URLs, feeds and sharing use the new domain.

Preview deployments retain the production address from `site.baseUrl`. Use preview domains to check pages; canonical URLs, RSS and share links still point to the production site.

### Content updates and previews

With Git connected, pushing commits to the production branch (usually `main`) triggers production deployments. Commits to other branches can create preview deployments for reviewing changes before merging. See [Vercel’s Git integration](https://vercel.com/docs/git) for production branch and automatic deployment settings.

After editing `blog.config.ts`, articles, images or custom files, commit and push your changes. Scheduled articles need another build after their publication date; redeploy in Vercel or connect a scheduled build workflow.

## Other static hosts

Set the complete `dist/` as the hosting directory. Retain `_astro/`, search indexes, bundle attachments and generated images.

Configure directory indexes so `/zh/posts/hello/` serves its `index.html`. Serve `404.html` with a 404 status for unknown addresses. Replace the complete output on updates to remove obsolete pages and indexes.

## Later updates

Publication states, statistics and search are generated during the build. Rebuild and deploy after changing content or configuration, or when a scheduled publication date arrives. Hosting automation or scheduled builds can handle updates.
