# 站点与外观

本页介绍常用设置，全部字段、类型与默认值见[完整配置参考](./reference.md)。

## 站点地址与语言

```ts
site: {
  title: { zh: '我的站点', en: 'My site' },
  baseUrl: 'https://blog.example.org/',
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  localePrefixPolicy: 'redirect-to-default',
  timezone: 'Asia/Shanghai',
},
```

`baseUrl` 填写完整生产根地址；子目录部署可用 `https://example.org/blog/`。主题统一处理导航、资源与分享地址。

`locales` 设置启用语言，`defaultLocale` 设置默认语言。单语言站保留一个代码。`localePrefixPolicy` 设置语言前缀策略，见[语言与翻译](../content/languages.md)。

更改语言前缀策略或部署子目录后，作者应检查正文相对链接是否仍指向正确地址。主题不自动迁移这些链接；构建时会警告失效的本地相对地址。

## 作者与文案

`author` 配置名字、介绍、头像和社交链接，`text` 集中配置首页标题、Tab 名称、搜索提示、404 和页脚说明。作者名字 `author.name` 与介绍 `author.bio` 等展示文字支持字符串或多语言对象。

本地头像放在 `public/images/avatar.webp`，配置为 `/images/avatar.webp`。其他 public 资源使用相同路径规则。

## 外观

```ts
appearance: {
  defaultTheme: 'system',
  pageTransition: 'fade',
  codeThemes: { light: 'github-light', dark: 'github-dark' },
  showCodeLineNumbers: false,
  categoryCoverStyle: 'thumbnail',
},
```

`defaultTheme` 可选 `light`、`dark`、`system`，读者保存的外观选择优先。`pageTransition` 使用 `fade` 淡入淡出或 `none` 直接切换。

`codeThemes` 分别设置深浅色代码主题，名称使用当前安装的 Shiki / Expressive Code 支持的主题。

`categoryCoverStyle` 可选缩略图 `thumbnail`、右侧渐隐 `fade`、完整背景 `background`，单个分类使用 frontmatter 的 `coverStyle` 覆盖。

## 列表与日期

| 字段                | 用途                   |
| ------------------- | ---------------------- |
| `posts.perPage`     | 文章列表每页数量       |
| `posts.homeLimit`   | 首页文章数量           |
| `posts.menuLimit`   | 加号菜单的近期文章数量 |
| `posts.randomLimit` | 随机近期文章候选数量   |

后两项设为大于实际文章数的正整数时包含全部，例如 `99999`。侧栏“最近”独立展示全部未置顶公开文章，按时间倒序排列。

分页处点击当前页码，可以输入目标页；回车或移开焦点提交，Escape 取消。点击最大页码直接到最后一页。

`posts.dateFormat` 使用原生 Intl 格式，例如 `{ dateStyle: 'long' }`。显示语言取当前界面语言，时区取 `site.timezone`。

## 页脚

```ts
footer: {
  since: '2026-01-01',
  author: { zh: '站点维护者', en: 'Site maintainer' },
  showAttribution: true,
  license: {
    label: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
},
```

页脚第一行为版权、运行天数和文章统计，第二行使用 `text.footerDescription`，第三行为 Powered by Astro & BlogGPT 与内容许可。

`since` 接受年份或日期字符串；`author` 留空时跟随 `author.name`。`showAttribution` 控制驱动署名，`license` 按自己的博客内容授权填写。主题代码使用 Apache-2.0。

最后一行固定使用英文，许可名称使用普通字符串。
