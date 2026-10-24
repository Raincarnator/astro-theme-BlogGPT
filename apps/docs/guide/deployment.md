# 构建与部署

BlogGPT 生成静态文件，推荐通过 Vercel 连接 Git 仓库自动构建与发布，也可以将构建产物部署到其他支持目录索引的静态托管服务。

构建命令为 `pnpm build`，产物目录为 `dist/`。

## 一键部署（Starter）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRaincarnator%2Fastro-theme-BlogGPT-starter)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Raincarnator/astro-theme-BlogGPT-starter)

新建个人博客可直接使用自动维护的 [starter 模板仓库](https://github.com/Raincarnator/astro-theme-BlogGPT-starter)。它包含必要的主题代码、写作工具、一篇欢迎文章、一个关于页，以及指向官方文档站的友链，不包含演示文章与文档 workspace。也可以通过仓库的 **Use this template** 创建自己的博客仓库。

1. 点击对应平台的部署按钮，登录并按提示将 starter 保存到自己的 Git 仓库。
2. 使用随附的 `vercel.json` 或 `netlify.toml` 完成部署。starter 使用 Node.js 24 和 `package.json` 中锁定的 pnpm 版本，发布目录为 `dist/`。
3. 部署后修改 `blog.config.ts` 中的站点信息、`content/` 中的文章与页面，以及 `friends.config.ts` 中的友链；向自己的仓库推送提交即可自动更新站点。

starter 默认使用平台提供的正式域名。绑定自定义域名后，在托管平台设置 `SITE_URL` 并重新构建，或将 `site.baseUrl` 改为固定的正式地址，让 canonical、RSS 和 Sitemap 使用正确的域名。上游 starter 的自动同步只更新模板仓库，不会覆盖你创建的个人博客仓库。

以下章节说明生产地址、构建检查和手动部署；通过按钮创建的 starter 项目可直接使用随附的平台配置。

## 生产地址

在 `site.baseUrl` 填写完整生产地址：

- 根域名：`https://blog.example.org/`。
- 子目录：`https://example.org/blog/`。

它决定部署路径、canonical、RSS、Sitemap 和分享地址。修改后重新构建，正式发布前替换演示配置中的 `example.com`。

`site.localePrefixPolicy` 决定语言前缀。默认 `redirect-to-default` 将无前缀 HTML 地址通过零秒 meta refresh 直接跳到默认语言最终页；另有默认语言无前缀和强制前缀策略，见[语言与翻译](../content/languages.md#语言前缀策略)。

## 检查正式产物

```sh
pnpm install
pnpm build
pnpm preview
```

构建包含类型检查、页面、附件、分享图、Sitemap 和 Pagefind 索引生成。预览后检查首页、文章、分类、标签、页面、图片、附件、语言切换、搜索与订阅。

## Vercel 部署（推荐）

推荐连接 Git 仓库，由 Vercel 构建并发布博客。Vercel 原生支持 Astro，并允许指定构建命令与产物目录；后续提交内容即可自动更新，也可以通过预览部署检查修改。BlogGPT 使用 Astro 静态构建，保持仓库现有的 Astro 配置即可。参见 [Astro 的 Vercel 部署指南](https://docs.astro.build/en/guides/deploy/vercel/)。

### 导入仓库

1. 将修改好的主题源码推送到自己的 GitHub、GitLab 或 Bitbucket 仓库，保留 `package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml`。
2. 在 [Vercel 新建项目](https://vercel.com/new)，连接 Git 账号并导入该仓库。
3. 使用包含 `blog.config.ts` 与根 `package.json` 的仓库根目录，按下表配置构建。

### 构建设置

| 设置             | 填写值                                 |
| ---------------- | -------------------------------------- |
| Framework Preset | `Astro`                                |
| Root Directory   | 仓库根目录，保留默认值                 |
| Install Command  | `pnpm install --frozen-lockfile`       |
| Build Command    | `pnpm build`                           |
| Output Directory | `dist`                                 |
| Node.js Version  | `24.x`，满足项目的 Node.js 22.12+ 要求 |

在环境变量中添加 `ENABLE_EXPERIMENTAL_COREPACK=1`，应用到 Production 与 Preview，使构建使用根 `package.json` 的 `packageManager` 所指定的 pnpm 版本。构建设置与 Corepack 用法见 [Vercel 官方说明](https://vercel.com/docs/builds/configure-a-build)。

`pnpm build` 会执行主题的完整构建流程，包括类型检查、内容包附件、分享图和 Pagefind 搜索索引。Vercel 将 `dist` 中的最终文件发布为站点。

### 域名与首次部署

将 `site.baseUrl` 设置为正式访问地址。如果先使用 Vercel 分配的域名，可填写 `https://your-blog.vercel.app/`，其中 `your-blog` 替换为实际项目域名；使用自定义域名时，填写自己的完整地址，并在 Vercel 项目中绑定域名、按提示配置 DNS。

保存配置并推送提交，然后在 Vercel 点击 Deploy。构建完成后，检查文章、图片、附件、搜索、RSS，以及未知地址的 404 页面。域名变更后，同步修改 `site.baseUrl` 并重新部署，让 canonical、订阅和分享地址使用新域名。

预览部署沿用 `site.baseUrl` 中的正式地址；预览域名用于检查页面，canonical、RSS 和分享链接仍指向正式站点。

### 内容更新与预览

连接 Git 后，向生产分支（通常为 `main`）推送提交会触发正式部署；其他分支的提交可生成预览部署，适合在合并前检查内容。生产分支与自动部署设置见 [Vercel Git 集成](https://vercel.com/docs/git)。

修改 `blog.config.ts`、文章、图片或自定义文件后，提交并推送即可。预约文章在日期到达后还需触发一次构建，可在 Vercel 中重新部署，或接入定时构建流程。

## 其他静态托管

将完整 `dist/` 设置为托管目录。保留 `_astro/`、搜索索引、内容包附件与生成图片。

配置目录索引，让 `/zh/posts/hello/` 对应其 `index.html`；未知地址使用 `404.html` 并返回 404 状态。更新时整体替换产物，以清除旧页面和索引。

## 后续更新

文章发布状态、统计和搜索在构建时生成。修改内容、配置或到达预约发布时间后，重新构建并部署。可通过托管平台的自动部署或定时构建完成更新。
