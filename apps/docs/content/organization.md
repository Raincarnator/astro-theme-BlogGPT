# 目录与网址

## 四类内容

| 目录                  | 用途                 |
| --------------------- | -------------------- |
| `content/posts/`      | 文章                 |
| `content/pages/`      | 独立页面与功能页介绍 |
| `content/categories/` | 分类定义、封面和介绍 |
| `content/tags/`       | 标签定义、封面和介绍 |

四类内容都支持 `.md`、`.mdx` 和嵌套管理目录。

## 文件与 slug

普通文件省略 `slug` 时，使用去掉语言后缀的文件名；index 内容使用所在目录名。显式设置 slug 可以在移动管理文件夹后保留地址，例如：

```text
content/posts/notes/2026/hello.zh.md
```

设置 `slug: hello` 后，默认地址为 `/zh/posts/hello/`。移动文件时，相对图片路径与 MDX import 需要一并调整。

## 独立文件与内容包

普通文件保存一篇内容。需要附件时，在文件夹中使用 `index.md`、`index.mdx` 或其语言版本作为入口，其他文件随内容包一起发布，见[内容包与附件](./bundles.md)。

独立页面可使用 `content/pages/[slug]/index.[lang].md` 或 `.mdx`；分类和标签也可直接放在各自目录下，或按需要增加管理目录。

## 文章路径片段

默认文章路径为 `/[lang]/posts/[slug]/`。`posts.pathPrefix` 在 posts 与 slug 之间添加目录：

| 配置                | 示例地址                      |
| ------------------- | ----------------------------- |
| `''` 或省略         | `/zh/posts/hello/`            |
| `'[year]/'`         | `/zh/posts/2026/hello/`       |
| `'[year]/[month]/'` | `/zh/posts/2026/07/hello/`    |
| `'notes/[year]/'`   | `/zh/posts/notes/2026/hello/` |

支持 `[year]`、`[month]`、`[day]`，日期取 `site.timezone` 时区下的发布时间。月份和日期补零，推荐以 `/` 结尾。slug 始终在最后，可以包含子路径。

`site.localePrefixPolicy: 'omit-default-prefix'` 会省略默认语言片段。子目录部署在地址前加上 `site.baseUrl` 中的路径，见[语言前缀策略](./languages.md#语言前缀策略)。

路径设置统一作用于导航、canonical、语言切换、搜索、RSS、Sitemap 和内容包附件。正文中的默认文章绝对路径与兄弟相对链接会对应到新地址，并保留查询参数和锚点；自定义 HTML/JS 中的地址按需自行调整。

路径片段使用相对目录，保留首段 `page` 用于分页。空目录、越级路径、查询参数、百分号编码或未知占位符会触发校验错误。已上线站点更改路径后，在托管平台为旧地址设置重定向。
