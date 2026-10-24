# BlogGPT Starter

基于 [BlogGPT](https://github.com/Raincarnator/astro-theme-BlogGPT) 和 Astro 的精简博客起点。

[English](README.md) · **简体中文**

[使用 GitHub 模板](https://github.com/__STARTER_REPOSITORY__/generate)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F__STARTER_REPOSITORY__)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/__STARTER_REPOSITORY__)

点击按钮将 starter 复制到你自己的 Git 仓库并部署静态站点。之后向自己的仓库提交代码即可触发托管平台自动构建。

## 本地开发

使用 Node.js 24 和 `package.json` 中锁定的 pnpm 版本：

```sh
corepack enable
corepack install
pnpm install --frozen-lockfile
pnpm dev
```

## 初始化博客

1. 修改 `blog.config.ts` 的 `site.baseUrl` 为正式站点地址，也可在托管平台设置环境变量 `SITE_URL`。未设置时自动使用 Vercel 正式域名或 Netlify 站点地址，本地构建回退到 `https://example.com/`。
2. 设置站点标题、作者、语言和导航。默认使用中文；可修改 `defaultLocale` 和 `locales` 来启用英文或多语言。
3. 替换 `content/posts/hello-world.md` 和 `content/pages/about.md`。初始友链仅包含 BlogGPT 官方文档站，可在 `friends.config.ts` 中修改。
4. 将静态资源放入 `public/`，在 `custom/` 中自定义样式、HTML 和客户端脚本。

```sh
pnpm new post my-post --title "我的新文章"
pnpm build
pnpm preview
```

新文章默认是草稿，发布前设置 `draft: false` 和发布时间。两个平台均发布 `dist/`，无需适配器、API key 或服务器。绑定自定义域名后，设置 `SITE_URL` 并重新构建，让 canonical、RSS 和 sitemap 使用正式域名。

此仓库只包含主题、写作工具和最少的初始内容。[完整文档](https://bloggpt.reincarnatey.net/)在独立站点提供。此仓库由主题源码自动生成，请通过模板或部署按钮创建自己的仓库后再修改。上游同步 starter 不会更新通过模板创建的个人仓库。

主题代码使用 [Apache-2.0](LICENSE)，另见[第三方声明](THIRD_PARTY_NOTICES.md)。
