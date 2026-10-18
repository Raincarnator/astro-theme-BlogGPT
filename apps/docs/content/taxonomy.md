# 分类、标签和页面

## 分类与标签

在 `content/categories/guide.zh.md` 中定义分类：

```md
---
title: 使用指南
slug: guide
description: 从这里开始认识主题。
---

这里可以继续写分类介绍。
```

文章的 `categories: [guide]` 引用这个 slug。标签使用相同方式，放在 `content/tags/`。两者都支持译文、MDX、封面与 index 内容包。

已定义的分类可以独立展示；文章引用尚未定义的分类时，主题用 slug 生成分组名称。

## 独立页面

例如，在 `content/pages/about/index.zh.mdx` 中编写关于页，并配置导航：

```ts
{ id: 'about', type: 'page', page: 'about', label: { zh: '关于', en: 'About' }, icon: 'info' }
```

默认路径为 `/zh/about/`，语言前缀由站点策略决定。页面支持日期、作者、阅读时间、目录与分享，使用与文章相同的 `display` 设置，并可通过全站搜索找到。

## 功能页的标题与介绍

文章列表、分类、标签、归档和友链可以绑定 pages 内容：

```ts
{ id: 'categories', type: 'builtin', route: 'categories', page: 'categories',
  label: { zh: '分类', en: 'Categories' }, icon: 'shapes' }
```

对应内容的 `title`、`description` 决定页面标题与简介，正文在功能列表之前渲染。各内置页使用一致的标题样式。移除 `page` 绑定后使用默认标题。

文章列表只在第一页显示介绍正文，后续分页沿用标题和简介。`posts`、`categories`、`tags`、`archives`、`links` 可作为介绍内容 slug，绑定后使用内置页地址；自定义介绍 slug 通常还保留独立页面地址。

## 封面与卡片

```md
---
title: 写作与排版
slug: writing
description: Markdown、代码和文章增强。
image: /images/covers/writing.webp
coverStyle: fade
---

分类导读，随后自动列出相关文章。
```

共享封面放在 `public/`；内容包也可使用 `./cover.webp`。`coverStyle` 为分类卡片选择 `thumbnail`、`fade` 或 `background`，缺省使用 `appearance.categoryCoverStyle`。

分类详情依次显示返回链接、可选封面、标题与简介、介绍正文、文章列表。标签详情使用相同布局；分类列表下方的标签云按文章关联展示标签。
