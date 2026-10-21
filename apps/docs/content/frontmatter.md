# Frontmatter

Frontmatter 是内容文件顶部两行 `---` 之间的 YAML 元数据。文件格式可以是 `.md` 或 `.mdx`，每个语言文件分别填写元数据和正文。

```yaml
---
title: 我的第一篇文章
slug: hello
description: 用一句话说明这篇文章讨论什么。
date: '2026-10-16T09:00:00+08:00'
categories: [guide]
tags: [astro, content]
image: ./cover.webp
featured: false
draft: false
---
```

## 四类内容的通用字段

| 字段          | 类型                          | 是否必填 | 省略时                                           | 用途与填写方式                                                                                                                                                                                                                                                                                                          |
| ------------- | ----------------------------- | -------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | string                        | 是       | 无默认值                                         | 阅读页标题、列表名称、浏览器标题与搜索标题。每个译文填写对应语言的字符串。                                                                                                                                                                                                                                              |
| `slug`        | string                        | 否       | 普通文件取去掉语言后缀的文件名；index 取父目录名 | 稳定网址标识，如 hello 或 notes-hello；必须以小写英文字母或数字开头，其余字符仅允许小写英文字母 a–z、数字 0–9 和短横线 -。所有内容类型的同一文件各语言版本必须保持相同 slug，包括无后缀、草稿、隐藏和停用语言版本。发现短横线开头、大写、其他非法字符或译文 slug 不一致时，构建会输出包含文件位置和冲突值的警告并停止。 |
| `description` | string                        | 否       | 空字符串                                         | 简介，用于摘要、SEO、搜索、分享和统计浮窗。                                                                                                                                                                                                                                                                             |
| `image`       | string                        | 否       | 无封面                                           | 阅读页标题上方封面，文章列表缩略图或分类/标签封面。可为 `/images/a.webp`、内容包 `./a.webp`、完整 HTTPS URL。按需填写。                                                                                                                                                                                                 |
| `cover`       | string                        | 否       | 同 image                                         | image 的兼容别名；同时出现时 image 优先。建议新内容统一用 image。                                                                                                                                                                                                                                                       |
| `draft`       | boolean                       | 否       | false                                            | 草稿。生产构建不发布；文章在开发时受 showDraftsInDev 控制。                                                                                                                                                                                                                                                             |
| `hidden`      | boolean                       | 否       | false                                            | 对文章表示可直接访问但不出现在发现入口；不是访问权限。其他类型见下方说明。                                                                                                                                                                                                                                              |
| `coverStyle`  | thumbnail / fade / background | 否       | appearance.categoryCoverStyle                    | 分类列表卡片的封面样式。                                                                                                                                                                                                                                                                                                |
| `math`        | boolean                       | 否       | article.math                                     | 启用或关闭公式增强。                                                                                                                                                                                                                                                                                                    |
| `mermaid`     | boolean                       | 否       | article.mermaid                                  | 启用或关闭图表增强。                                                                                                                                                                                                                                                                                                    |
| `lightbox`    | boolean                       | 否       | article.lightbox                                 | 启用或关闭正文图片灯箱。                                                                                                                                                                                                                                                                                                |
| `callouts`    | boolean                       | 否       | article.callouts                                 | 启用或关闭提示块。                                                                                                                                                                                                                                                                                                      |
| `toc`         | boolean                       | 否       | article.toc.enabled                              | 启用或关闭阅读目录。                                                                                                                                                                                                                                                                                                    |
| `shareCover`  | boolean                       | 否       | article.shareCover.enabled                       | 启用或关闭 Satori 分享图，不是关闭普通封面或分享按钮。                                                                                                                                                                                                                                                                  |
| `display`     | 部分显示设置                  | 否       | 逐项继承 article.display                         | 阅读界面控制，完整字段见下文。                                                                                                                                                                                                                                                                                          |

四类内容均识别通用字段。正文增强用于各类正文，阅读信息与控件用于文章和独立页面。

## 发布时间和最后更新

以下字段用于 **posts 和 pages**。posts 至少提供一种发布日期；pages 可以不填日期。

| 字段          | 类型             | 规则                                               |
| ------------- | ---------------- | -------------------------------------------------- |
| `date`        | 可解析日期字符串 | 首选发布日期，用于显示、排序、归档和发布时间判断。 |
| `published`   | 可解析日期字符串 | date 的兼容别名；有 date 时忽略此项。              |
| `pubDatetime` | 可解析日期字符串 | 第三优先级的发布日期别名。                         |
| `updated`     | 可解析日期字符串 | 首选最后更新时间。没有时不推断文件修改日期。       |
| `modDatetime` | 可解析日期字符串 | updated 的第二优先级别名。                         |
| `lastmod`     | 可解析日期字符串 | updated 的第三优先级别名。                         |

推荐使用带偏移的 ISO 时间，例如 `'2026-10-16T09:00:00+08:00'`，明确北京时间上午九点。仅写 `'2026-10-16'` 时按 UTC 零点解析，再由 site.timezone 决定显示日期。所有日期都需要能被 JavaScript 正确解析，使用上面这样的明确日期或时间。

日期字段仅接受上述可解析的日期字符串，不接受数字时间戳、布尔值、null、数组或对象；可以省略可选字段，但不能填入空字符串。所有已填写的日期别名都会校验，即使它因优先级而未被采用。构建时发现无效日期会输出包含源文件、字段和值的警告并停止；草稿、隐藏内容和未启用的语言版本也必须符合规则。YAML 中不加引号的 ISO 日期同样支持。

最后更新只有在存在且与发布时间不同时显示，位于正文末尾标签右侧；关闭 display.updated 可隐藏。更新时间由元数据提供，文章的定时发布规则见下方发布状态。

## 文章专用字段

| 字段         | 类型               | 是否必填 | 省略时 | 含义                                                                  |
| ------------ | ------------------ | -------- | ------ | --------------------------------------------------------------------- |
| `categories` | string 或 string[] | 否       | []     | 分类 slug，例如 `[guide, writing]`；分类定义位于 content/categories。 |
| `category`   | string 或 string[] | 否       | []     | categories 的兼容写法；两者会合并去重。                               |
| `tags`       | string 或 string[] | 否       | []     | 标签 slug，例如 `[astro, markdown]`；定义位于 content/tags。          |
| `featured`   | boolean            | 否       | false  | 是否在侧栏置顶区域展示，不修改发布日期。                              |

文章使用分类、标签定义的 slug 建立关联。以上字段用于 posts。

## 阅读显示开关

全局默认是 `article.display`，单篇只需写想覆盖的字段。全局和单篇均省略某项时默认 true。

```yaml
display:
  title: true
  author: false
  published: true
  readingTime: true
  updated: true
  tags: true
  share: true
  navigation: true
```

| 子字段                | true 时显示                  | false 的区别                             |
| --------------------- | ---------------------------- | ---------------------------------------- |
| `display.title`       | 标题、简介、分类区域         | 隐藏视觉标题，仍保留封面和搜索、SEO 标题 |
| `display.author`      | 作者头像与名称               | 不显示作者行                             |
| `display.published`   | 已配置的发布时间             | 不显示时间，不改变文章发布状态           |
| `display.readingTime` | 估算阅读分钟数               | 不显示估算值                             |
| `display.updated`     | 不同于发布日期的最后更新时间 | 不显示底部更新提示                       |
| `display.tags`        | 文章底部标签                 | 隐藏标签入口，不删除分类关系             |
| `display.share`       | 分享按钮、浮窗与复制操作     | 不展示分享控件，不等于关闭公开访问       |
| `display.navigation`  | 文章的上一篇与下一篇         | 不展示相邻文章导航                       |

独立页面采用文章阅读样式并支持这些相关开关，但本来就没有文章标签和相邻文章关系。列表摘要不受阅读页的 display 控制。

## 局部增强覆盖

```yaml
math: true
mermaid: false
lightbox: true
callouts: true
toc: false
shareCover: false
```

true 和 false 都会覆盖全局设置。省略才是继承，不能把未填误写成 false。关闭增强时仍保留原始 Markdown 的基本渲染；关闭 Satori 后可使用普通 image 作为分享预览。

## 发布状态

- 文章 draft 为 true 或发布日期在未来：生产构建无独立页面，也不进入列表、搜索、RSS 和 Sitemap。开发服务可按 showDraftsInDev 预览，发现入口仍排除未发布内容。
- 文章 hidden 为 true：按语言版本生效，先选择版本，再从列表、搜索、归档、分类标签文章列表、RSS、Sitemap等发现入口排除，并标记 noindex；不会为了显示在列表中而回退到其他语言。文章仍正常构建，保留直接 URL，内容可通过网址公开访问。
- pages 的 draft 在生产中排除；hidden 独立页面仍可直接访问并标记 noindex。按需调整相应导航入口。
- 分类或标签仅被隐藏文章引用时，仍正常构建详情页，但不进入公开列表、标签云、搜索或 Sitemap，详情页文章列表为空并标记 noindex；即使有独立定义也遵循此规则。分类或标签同时被公开文章引用时，正常展示公开文章。没有任何文章引用的公开定义仍可独立展示。

预约发布在日期到达后重新构建。文件名负责语言配对；`lang`、`_key`、`_locale` 由加载器自动管理。
