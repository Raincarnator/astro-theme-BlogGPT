# 迁移现有博客

## 整理文章

将 Markdown / MDX 文件放入 `content/posts/`，填写标题、slug 与日期。原主题的 shortcode 或模板标签需要转换为 Markdown、HTML 或 MDX 组件。

同一篇文章的译文放在同目录，使用语言后缀配对，见[语言与翻译](../content/languages.md)。

## 资源管理

有附件的文章可以使用 index 内容包，通过相对路径引用图片、代码和下载文件。共享资源放在 `public/`，使用 `/images/example.webp` 这样的站点路径。

## 分类与标签

在 `content/categories/`、`content/tags/` 中创建定义，填写名称、简介与封面，再用文章中的 `categories`、`tags` 引用对应 slug。

## 设置新地址

设置 `site.baseUrl` 和语言前缀策略。需要日期目录时，使用 `posts.pathPrefix: '[year]/'` 等格式，见[目录与网址](../content/organization.md)。

根据新站点的最终地址，在托管平台为旧网址设置永久重定向。

## 检查与发布

运行 `pnpm build`、`pnpm preview`，检查文章、图片、附件、代码、分类、语言切换、搜索、RSS 和旧链接，再部署完整 `dist/`。详细步骤见[构建与部署](./deployment.md)。
