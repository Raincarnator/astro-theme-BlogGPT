# 配置参考

主题配置入口是根目录的 `blog.config.ts`，友链数据另放在 `friends.config.ts`。分类、标签、文章和页面的内容配置写在各自的 [frontmatter](../content/frontmatter.md) 中。修改配置后重新启动开发服务；生产站点需要重新构建和部署。

本页覆盖 `BlogConfig`、导航条目和 `FriendsConfig` 的全部公开字段。类型定义位于 `src/types/config.ts`。

## 如何理解必填和默认值

- **必填**：必须保留这个字段，没有运行时自动补全。表中的“初始值”是仓库提供的示例配置，可以按需更改。
- **可选**：允许省略。表中注明省略后的实际行为；嵌套对象中的可选字段按字段继承，可只填写需要覆盖的字段。
- `Localized` 是下文的多语言文字类型；`boolean` 只能填写 `true` 或 `false`，不能写字符串 `'false'`；数组 `[]` 表示不提供条目。
- 所有配置示例都是对应对象的片段，合并进现有配置即可。根文件保持 `const config: BlogConfig = { ... }` 和 `export default config`。

## 多语言文字 Localized

支持普通字符串，或至少含一项的 `Partial<Record<string, string>>` 对象。键名支持任意有效 BCP 47 代码，如 ja、pt-BR；普通字符串在所有界面中保持一致；语言对象适合需要翻译的名称和说明。

```ts
site: { /* 其他字段保留 */ title: { zh: '我的站点', en: 'My site' } },
author: {
  // 其他字段保留
  name: { zh: '站点作者', en: 'Site author' },
  bio: { zh: '关于这个站点的一句话。', en: 'A sentence about this site.' },
},
```

文字选择顺序为：当前语言及其上级语言 → `site.defaultLocale` 及其上级语言 → `site.locales` 的顺序 → 对象中第一个可用值。空字符串表示有意留空。语言对象至少提供一个有效 BCP 47 键，省略的语言键按上述顺序选择文字。

支持此类型的字段包括：站名、作者名与介绍、社交标签、全部 `text` 文案字段（含 tabs 内的文案）、导航名称和描述、分享复制格式、分享平台名、页脚作者，以及友链分组名称和描述、站点名称和描述。路径、slug、网址、图标标识、主题标识与时区使用普通字符串。

## site：站点与部署

| 字段                      | 类型                                                                   | 是否必填 | 初始值                   | 含义与填写方式                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------- | -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site`                    | 对象                                                                   | 是       | 见下列字段               | 站点基础信息。                                                                                                                                                                                                                                                                                                          |
| `site.title`              | Localized                                                              | 是       | `'BlogGPT'`              | 侧栏站名、浏览器标题、RSS、分享文字和分享图使用的名称。                                                                                                                                                                                                                                                                 |
| `site.baseUrl`            | string                                                                 | 是       | `'https://example.com/'` | 完整生产根地址，包含协议和可选子目录，例如 `https://example.org/blog/`。程序统一拆分 origin 与部署路径、补齐结尾斜杠；禁止账号、查询参数与片段。用于资源、导航、canonical、RSS、Sitemap 和分享。                                                                                                                        |
| `site.defaultLocale`      | BCP 47 string                                                          | 是       | `'zh'`                   | 文字和内容选择的默认语言，也是语言前缀策略中的默认目标；必须包含在 locales 中。                                                                                                                                                                                                                                         |
| `site.locales`            | Locale[]                                                               | 是       | `['zh', 'en']`           | 站点构建的内容语言，独立于界面语言包注册，支持任意有效 BCP 47 代码。数组非空、不能重复；顺序也参与缺少翻译时的选择。单语言站保留一个代码。                                                                                                                                                                              |
| `site.localePrefixPolicy` | `'redirect-to-default'` / `'omit-default-prefix'` / `'require-prefix'` | 否       | `'redirect-to-default'`  | 省略时，无前缀 HTML 地址通过零秒 meta refresh 直接到默认语言最终页。`omit-default-prefix` 只构建默认语言的无前缀地址；`require-prefix` 要求所有语言有前缀，无前缀返回 404。更改后作者应检查正文相对链接，主题不自动迁移；构建时对失效的本地相对地址给出警告。详见[语言前缀策略](../content/languages.md#语言前缀策略)。 |
| `site.timezone`           | string                                                                 | 是       | `'Asia/Shanghai'`        | 有效 IANA 时区，例如 `UTC`。控制日期显示、归档、统计日期和运行天数。                                                                                                                                                                                                                                                    |

## author：作者和社交链接

| 字段                     | 类型      | 是否必填 | 初始值                          | 含义与填写方式                                                                                                          |
| ------------------------ | --------- | -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `author`                 | 对象      | 是       | 见下列字段                      | 左下角作者菜单和文章作者信息。                                                                                          |
| `author.name`            | Localized | 是       | `'Astro Theme BlogGPT'`         | 显示名称，也用于分享文字和生成的分享图。                                                                                |
| `author.bio`             | Localized | 是       | 欢迎来到 BlogGPT 主题演示站点！ | 左下角作者信息与作者菜单中的介绍。支持字符串或多语言对象，可用空字符串留空。                                            |
| `author.avatar`          | string    | 是       | `'/images/avatar.webp'`         | 本地公开资源路径或完整图片 URL；本地图片放在 public，例如 public/avatar.webp 对应 `/avatar.webp`。主题会处理 base。     |
| `author.socials`         | 数组      | 是       | GitHub、YouTube、邮件示例       | 按数组顺序显示；`[]` 不显示社交入口。示例网址需替换。                                                                   |
| `author.socials[].label` | Localized | 是       | 各平台名称                      | 菜单显示文字与可访问名称。                                                                                              |
| `author.socials[].icon`  | string    | 是       | 如 `'simple-icons:github'`      | 品牌用 Simple Icons，例如 `simple-icons:youtube`；邮件等普通操作用 `lucide:mail`。社交图标不写前缀时默认 Simple Icons。 |
| `author.socials[].href`  | string    | 是       | example.com 或邮件占位          | 完整站点链接或 `mailto:hello@example.org`。                                                                             |

## text：说明文字

`text` 对象及下列文案字段均必填，文案类型为 **Localized**；`text.tabs` 是包含 search 和 posts 的必填对象。空字符串可清空对应文案。下表列出仓库的示例文案，各语言值见 `blog.config.ts`。

| 字段                     | 示例文案                                           | 使用位置与效果                                                             |
| ------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------- |
| `text.siteDescription`   | 一个用 Astro 构建，受到 ChatGPT 布局启发的博客主题 | 默认 SEO 描述、站点标题补充与 RSS 描述；有单篇简介时页面优先使用单篇简介。 |
| `text.homeHeading`       | 今天想读点什么？                                   | 首页搜索框上方的大标题。                                                   |
| `text.tabs`              | search、posts                                      | 顶部 Tab 文案对象，两个子字段均必填，支持分别翻译。                        |
| `text.tabs.search`       | 阅读                                               | 顶部第一个 Tab 的名称，链接到首页搜索界面；支持 Localized。                |
| `text.tabs.posts`        | 文章                                               | 顶部第二个 Tab 的名称，链接到文章列表；支持 Localized。                    |
| `text.searchHeading`     | 输入关键词，发现一篇文章                           | 搜索页面和搜索空状态的提示文字。                                           |
| `text.searchPlaceholder` | 搜索文章、想法与关键词                             | 搜索输入框占位文字。                                                       |
| `text.notFoundMessage`   | 这一页，还没有写下故事。                           | 404 正文提示，不修改 HTTP 状态码。                                         |
| `text.footerDescription` | BlogGPT 主题演示 · 示例资料与内容均可替换。        | 页脚第二行，可写版权说明或内容声明。                                       |

“搜索”“已复制”等通用操作标签由集中语言包管理（`src/i18n/`，由 `src/i18n/i18n.config.ts` 注册）。

## appearance：外观

| 字段                             | 类型                                    | 是否必填 | 初始值           | 含义与区别                                                                                                                                     |
| -------------------------------- | --------------------------------------- | -------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`                     | 对象                                    | 是       | 见下列字段       | 全局视觉选项。                                                                                                                                 |
| `appearance.defaultTheme`        | `'light' \| 'dark' \| 'system'`         | 是       | `'system'`       | 新访客的默认外观：浅色、深色、跟随系统。读者已保存的选择优先。                                                                                 |
| `appearance.pageTransition`      | `'fade' \| 'none'`                      | 是       | `'fade'`         | fade 为正文短暂淡入淡出，none 关闭该过渡；仍保留 Astro 客户端导航。遵循系统减少动态效果偏好。                                                  |
| `appearance.codeThemes`          | 对象                                    | 是       | 见下一行         | 代码块亮暗主题。                                                                                                                               |
| `appearance.codeThemes.light`    | Shiki 主题名称                          | 是       | `'github-light'` | 浅色模式代码主题；填写当前安装的 Shiki / Expressive Code 支持的主题名称。                                                                      |
| `appearance.codeThemes.dark`     | Shiki 主题名称                          | 是       | `'github-dark'`  | 深色模式代码主题，如 `dracula`；不存在的主题会导致构建失败。                                                                                   |
| `appearance.showCodeLineNumbers` | boolean                                 | 是       | `false`          | 是否默认显示代码行号。                                                                                                                         |
| `appearance.categoryCoverStyle`  | `'thumbnail' \| 'fade' \| 'background'` | 是       | `'thumbnail'`    | 分类卡片封面：thumbnail 为小缩略图；fade 为右侧图片向左渐隐；background 为全卡背景加遮罩。单个分类的 coverStyle 可覆盖；无封面仍显示普通卡片。 |

## sidebar：导航与侧栏

| 字段                    | 类型             | 是否必填 | 初始值                                                     | 含义与限制                                     |
| ----------------------- | ---------------- | -------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `sidebar`               | 对象             | 是       | 见下列字段                                                 | 侧栏与站名菜单。                               |
| `sidebar.items`         | NavigationItem[] | 是       | 首页、文章、分类、归档、友链、关于、主题仓库、BlogGPT 文档 | 侧栏固定入口及顺序；`[]` 可清空固定导航。      |
| `sidebar.menu`          | NavigationItem[] | 是       | 首页、文章、关于、主题仓库、BlogGPT 文档                   | 左上站名展开菜单；与 items 分开管理。          |
| `sidebar.width`         | 对象             | 是       | 见下列字段                                                 | 桌面侧栏可拖动宽度，单位 px。                  |
| `sidebar.width.default` | number           | 是       | `340`                                                      | 没有浏览器保存值时的初始宽度。                 |
| `sidebar.width.min`     | number           | 是       | `240`                                                      | 最小宽度，至少 200。                           |
| `sidebar.width.max`     | number           | 是       | `480`                                                      | 最大宽度，至多 600；必须 min ≤ default ≤ max。 |

### NavigationItem 的全部字段

每个条目必须包含公共字段，再按 type 填写对应字段。操作图标使用 Lucide，品牌入口可使用 `simple-icons:github`；Lucide 允许 `files` 或 `lucide:files`。

| 字段          | 类型                                | 是否必填                | 省略行为 / 含义                                                                                                                                                                                                                      |
| ------------- | ----------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`          | string                              | 是                      | 为条目取稳定且唯一的标识，例如 `about`；避免同一菜单内重复。                                                                                                                                                                         |
| `label`       | Localized                           | 是                      | 导航显示名称。                                                                                                                                                                                                                       |
| `icon`        | string                              | 仅 sidebar.items 必填   | 侧栏项目使用 Lucide 或 Simple Icons 图标。sidebar.menu 不提供此字段。                                                                                                                                                                |
| `description` | Localized                           | 否                      | 不显示附加描述；有值时用于菜单中的补充说明。                                                                                                                                                                                         |
| `type`        | `'builtin' \| 'page' \| 'external'` | 是                      | builtin 打开内置功能，page 打开独立内容，external 打开外部链接。                                                                                                                                                                     |
| `route`       | 内置路由标识                        | builtin 必填            | `home`、`posts`、`categories`、`archives`、`links`、`tags`；填写标识，不填 URL。其他 type 不填此项。                                                                                                                                 |
| `page`        | string                              | page 必填，builtin 可选 | pages 内容的 slug，不是文件路径。用于 page 条目时链接到独立页面；用于 posts/categories/tags/archives/links 时将页面标题、简介和正文放到内置列表前。home 不提供介绍页绑定。未绑定则使用默认标题、空介绍正文；绑定不存在的内容会报错。 |
| `href`        | string                              | external 必填           | 外链完整地址，其他 type 不使用。                                                                                                                                                                                                     |
| `newTab`      | boolean                             | external 可选           | 默认 false，在当前标签页打开；true 在新标签页打开。                                                                                                                                                                                  |

```ts
{ id: 'about', type: 'page', page: 'about', label: { zh: '关于', en: 'About' }, icon: 'info' },
{ id: 'topics', type: 'builtin', route: 'categories', page: 'categories', label: 'Topics', icon: 'shapes' },
{ id: 'docs', type: 'external', href: 'https://docs.astro.build/', newTab: true, label: 'Astro', icon: 'globe' },
```

同一路由出现在两个菜单时，建议保持 page 绑定一致；主题按 items、menu 顺序取首个对应绑定。介绍页仍属于 pages，不能用 posts 内容替代。详见[分类、标签和页面](../content/taxonomy.md)。

## posts：列表与日期

| 字段                    | 类型                       | 是否必填 | 初始值                                                | 含义                                                                                                                                                                                                                                                                                                           |
| ----------------------- | -------------------------- | -------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `posts`                 | 对象                       | 是       | 见下列字段                                            | 文章列表选项。                                                                                                                                                                                                                                                                                                 |
| `posts.pathPrefix`      | string                     | 否       | `''`                                                  | posts/ 与 slug 之间的目录。推荐 `[year]/`、`[year]/[month]/` 或 `notes/[year]/`；结尾斜杠可省略，内部统一处理。支持 year/month/day，占位日期按 site.timezone；不可加开头斜杠、空目录、查询参数、越级路径或保留 page 前缀。修改后重建并迁移旧链接，作者应检查正文相对链接；失效的本地相对地址在构建时给出警告。 |
| `posts.perPage`         | 正整数                     | 是       | `5`                                                   | 文章列表每页篇数。                                                                                                                                                                                                                                                                                             |
| `posts.homeLimit`       | 正整数                     | 是       | `4`                                                   | 首页展示文章数。                                                                                                                                                                                                                                                                                               |
| `posts.menuLimit`       | 正整数                     | 是       | `12`                                                  | 加号菜单展示的近期文章数量；大于实际数量时包含所有，例如 `99999`。不限制侧栏完整列表。                                                                                                                                                                                                                         |
| `posts.randomLimit`     | 正整数                     | 是       | `12`                                                  | 随机按钮和 /random 的近期候选文章数量，按发布时间排序；`99999` 可包含全部。与 menuLimit 独立。                                                                                                                                                                                                                 |
| `posts.showDraftsInDev` | boolean                    | 是       | `true`                                                | 开发服务中允许预览草稿与未来文章；false 只预览已发布内容。                                                                                                                                                                                                                                                     |
| `posts.dateFormat`      | Intl.DateTimeFormatOptions | 是       | `{ year: 'numeric', month: 'short', day: 'numeric' }` | 日期显示格式；语言取当前界面语言，时区强制取 site.timezone。传 `{}` 使用 Intl 的默认日期格式。                                                                                                                                                                                                                 |

`dateFormat` 使用 JavaScript 原生格式选项：`year`、`day`、`hour`、`minute`、`second` 为 `numeric` / `2-digit`；`month` 另可用 `long` / `short` / `narrow`；`weekday`、`era`、`dayPeriod` 为 `long` / `short` / `narrow`；`fractionalSecondDigits` 为 1 / 2 / 3。`hour12` 为布尔值；`hourCycle` 为 `h11` / `h12` / `h23` / `h24`。`dateStyle`、`timeStyle` 为 `full` / `long` / `medium` / `short`，不能与 year、month 等具体分量同时使用。

其余原生选项包括 `calendar`（如 gregory）、`numberingSystem`（如 latn）、`localeMatcher`（lookup / best fit）、`formatMatcher`（basic / best fit）与 `timeZoneName`（short / long / shortOffset / longOffset / shortGeneric / longGeneric）。不需要时省略，由 Intl 按语言推断；`timeZone` 即使填写也会被 site.timezone 覆盖。无效组合或标识可能导致构建错误，建议保留仓库格式，或只改为 `{ dateStyle: 'long' }`。

## article：默认阅读设置

`article` 必填。功能开关适用于支持该渲染功能的正文；单篇 [frontmatter](../content/frontmatter.md) 中的同名布尔值优先于全局，`false` 可以明确关闭，`true` 也可重新开启。

| 字段                          | 类型                | 是否必填 | 初始值 / 省略行为 | 含义                                                                    |
| ----------------------------- | ------------------- | -------- | ----------------- | ----------------------------------------------------------------------- |
| `article.math`                | boolean             | 是       | `true`            | KaTeX 数学公式。                                                        |
| `article.mermaid`             | boolean             | 是       | `true`            | Mermaid 图表，客户端按需加载。                                          |
| `article.lightbox`            | boolean             | 是       | `true`            | PhotoSwipe 正文图片灯箱。                                               |
| `article.callouts`            | boolean             | 是       | `true`            | 将带 NOTE / TIP 等标记的引用块渲染为提示块。                            |
| `article.display`             | 部分 ArticleDisplay | 否       | 未填各项为 true   | 逐项控制文章与独立页面的视觉信息。                                      |
| `article.display.author`      | boolean             | 否       | `true`            | 作者头像和名称。                                                        |
| `article.display.published`   | boolean             | 否       | `true`            | 发布时间；独立页面未填日期时没有时间可显示。                            |
| `article.display.readingTime` | boolean             | 否       | `true`            | 估算阅读时间，按正文长度计算。                                          |
| `article.display.updated`     | boolean             | 否       | `true`            | 正文底部的更新时间；需有 updated 且与发布时间不同，不使用文件修改时间。 |
| `article.display.tags`        | boolean             | 否       | `true`            | 文章底部标签；独立页面无标签关系。                                      |
| `article.display.share`       | boolean             | 否       | `true`            | 分享按钮和悬浮面板。                                                    |
| `article.display.navigation`  | boolean             | 否       | `true`            | 上一篇与下一篇，仅文章有相邻文章。                                      |
| `article.display.title`       | boolean             | 否       | `true`            | 标题、简介与分类区域；不删除浏览器标题、搜索元数据，也不控制封面。      |

display 控制阅读页的信息展示。封面在正文页标题上方显示，列表中在摘要区域右侧显示。

### article.toc：文章目录

| 字段                      | 类型       | 是否必填 | 初始值 / 省略行为 | 含义                                                        |
| ------------------------- | ---------- | -------- | ----------------- | ----------------------------------------------------------- |
| `article.toc`             | 对象       | 是       | 见下列字段        | 左侧交互目录与窄屏右上角目录面板。                          |
| `article.toc.enabled`     | boolean    | 是       | `true`            | 默认启用目录，单篇用 toc 覆盖。没有符合深度的标题时不展示。 |
| `article.toc.minDepth`    | 整数 1–6   | 是       | `2`               | 最浅标题层级，2 对应 `##`。                                 |
| `article.toc.maxDepth`    | 整数 1–6   | 是       | `4`               | 最深标题层级；不能小于 minDepth。                           |
| `article.toc.expandDelay` | 非负毫秒数 | 是       | `1000`            | 鼠标在同一项停止移动多久后展开完整目录；移动时重新计时。    |
| `article.toc.hideDelay`   | 非负毫秒数 | 否       | `800`             | 离开目录后自动隐藏的等待时间。                              |

目录提供短线预览、拖动定位和可见章节虚线框。详见[交互式目录](./toc.md)。

### article.shareCover：自动分享图

| 字段                            | 类型            | 是否必填 | 初始值 / 省略行为 | 含义                                                                                                                              |
| ------------------------------- | --------------- | -------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `article.shareCover`            | 对象            | 是       | 见下列字段        | Satori 在构建时生成 PNG。                                                                                                         |
| `article.shareCover.enabled`    | boolean         | 是       | `true`            | 全局默认开启；单篇 shareCover 覆盖。关闭后使用普通封面（如有），否则分享面板无图片。                                              |
| `article.shareCover.width`      | 整数 320–4096   | 是       | `1200`            | 输出宽度 px。                                                                                                                     |
| `article.shareCover.height`     | 整数 320–4096   | 是       | `630`             | 输出高度 px；推荐维持横向比例。                                                                                                   |
| `article.shareCover.background` | CSS 颜色 string | 是       | `'#f5f5f5'`       | 图片背景色。                                                                                                                      |
| `article.shareCover.foreground` | CSS 颜色 string | 是       | `'#171717'`       | 标题与正文文字颜色。                                                                                                              |
| `article.shareCover.accent`     | CSS 颜色 string | 是       | `'#3b82f6'`       | 品牌装饰块颜色，不修改站点链接颜色。                                                                                              |
| `article.shareCover.fontPath`   | string          | 否       | 内置 Noto Sans SC | 构建机可读的字体文件路径，相对项目根目录或绝对路径；推荐 TTF / OTF / WOFF，需覆盖正文字符。路径不是公开网址；文件缺失会构建失败。 |

图片使用内容标题、简介、当前语言站名和作者名。生成结果缓存在 `.astro/share-covers/`，内容、样式或字体改变后重新生成。桌面端悬停“分享”即可查看。

## sharing：复制与社交分享

| 字段                       | 类型      | 是否必填 | 初始值 / 省略行为                                    | 含义                                                                                                    |
| -------------------------- | --------- | -------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `sharing`                  | 对象      | 否       | 使用默认复制格式，无平台入口                         | 整段省略仍可复制分享文字与链接。                                                                        |
| `sharing.copyFormat`       | Localized | 否       | `'{title}\n{description}\n{author} · {blog}\n{url}'` | 点击主分享按钮复制的文字格式；`\n` 在 TS 字符串里表示换行。                                             |
| `sharing.platforms`        | 数组      | 否       | 省略为 `[]`；仓库配置含 15 个平台                    | 数组顺序就是显示顺序，最多两行，超出滚动；空数组只保留复制功能。                                        |
| `sharing.platforms[].name` | Localized | 是       | 各平台名称                                           | 显示名，不影响平台接口。                                                                                |
| `sharing.platforms[].icon` | string    | 否       | 仅显示名称                                           | 品牌使用 Simple Icons 标识，非品牌可用 `lucide:mail`。                                                  |
| `sharing.platforms[].href` | string    | 是       | 各平台接口模板                                       | 只允许 http、https、mailto；填分享接口而不是平台首页。变量由主题编码一次，不要预先 encodeURIComponent。 |

复制格式使用 `{title}`、`{description}`、`{author}`、`{blog}`、`{url}`、`{image}`；平台链接还可用 `{text}`，代表组合后的复制文字。url 和 image 为含 base 的生产绝对地址，description 缺省为空。未知占位符保持原样，不执行 JS，也不递归替换。

仓库预设 X、Facebook、LinkedIn、Reddit、Bluesky、Threads、Telegram、WhatsApp、LINE、微博、QQ、QQ 空间、Tumblr、Pinterest 和邮件。通过 platforms 编辑平台列表；省略时使用空数组。Pinterest 入口需要图片。平台负责页面抓取、登录和最终发布。详见[分享说明](./reading.md#分享模板)。

## statistics：博客统计

整个 `statistics` 对象可省略，以下所有布尔字段省略时均为 **true**，`recentLimit` 为 **12**。关闭某项只隐藏该统计项；关闭 enabled 会移除弹窗、作者菜单入口和 status 命令。

| 字段                          | 类型      | 初始值 / 省略值 | 含义                                                                                   |
| ----------------------------- | --------- | --------------- | -------------------------------------------------------------------------------------- |
| `statistics.enabled`          | boolean   | `true`          | 统计功能总开关。                                                                       |
| `statistics.articleCount`     | boolean   | `true`          | 公开文章数。                                                                           |
| `statistics.wordCount`        | boolean   | `true`          | 正文总字符数，排除代码围栏、链接地址等。                                               |
| `statistics.days`             | boolean   | `true`          | 从 footer.since 到构建当天的运行天数。                                                 |
| `statistics.languages`        | boolean   | `true`          | 启用的界面语言。                                                                       |
| `statistics.averageWords`     | boolean   | `true`          | 每篇平均正文字数。                                                                     |
| `statistics.updateFrequency`  | boolean   | `true`          | 平均发布间隔：最早与最新发布日期之差除以篇数减一；少于两篇显示破折号。                 |
| `statistics.firstPublication` | boolean   | `true`          | 首次公开文章发布时间；无文章显示破折号。                                               |
| `statistics.lastUpdate`       | boolean   | `true`          | 公开文章中最新更新时间，单篇无 updated 时取发布日期。                                  |
| `statistics.heatmap`          | boolean   | `true`          | 截至构建当天近 365 天的发布热力图，按 site.timezone 分组；有文章的日期才显示文章浮窗。 |
| `statistics.recentWords`      | boolean   | `true`          | 近期文章字数柱状图，按发布时间排列，悬停查看标题和简介。                               |
| `statistics.recentLimit`      | 整数 1–50 | `12`            | 柱状图文章数量上限，与 posts.menuLimit 和 posts.randomLimit 独立。                     |

统计针对当前语言可发现的已发布文章，排除草稿、未来文章与 hidden 内容。数据随构建更新，页脚统计单独显示。

## footer：页脚

| 字段                     | 类型             | 是否必填 | 初始值                                               | 含义                                                                                                                   |
| ------------------------ | ---------------- | -------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `footer`                 | 对象             | 是       | 见下列字段                                           | 三行居中页脚。                                                                                                         |
| `footer.since`           | number \| string | 是       | `2024`                                               | 数字年份，或有效的 `YYYY-MM-DD` 字符串。年份从该年 1 月 1 日算起；显示版权年份区间及至构建当天的经过天数，随构建更新。 |
| `footer.author`          | Localized        | 是       | `'Astro Theme BlogGPT'`                              | 版权署名；填空字符串时使用 author.name。                                                                               |
| `footer.showAttribution` | boolean          | 是       | `true`                                               | 是否显示 Powered by Astro & BlogGPT；false 保留许可证链接。                                                            |
| `footer.license`         | 对象             | 是       | 见下列字段                                           | 内容许可证信息；与仓库主题代码的许可证分开。                                                                           |
| `footer.license.label`   | string           | 是       | `'CC BY-NC-SA 4.0'`                                  | 许可证的显示名称，普通字符串；最后一行固定英文，不进行翻译。                                                           |
| `footer.license.url`     | string           | 是       | `https://creativecommons.org/licenses/by-nc-sa/4.0/` | 许可证说明链接；更换时同步修改名称。                                                                                   |

第一行为版权、运行天数和文章字数统计；第二行为 `text.footerDescription`；第三行为驱动署名与许可。自己的版权说明填写在 `text.footerDescription`。

## friends.config.ts：友链

直接导出 `FriendsConfig` 分组数组。顺序即显示顺序；`[]` 表示没有友链。标题、简介和前置正文来自 `content/pages/links/index.[lang].md`（需要导航绑定 `page: 'links'`），不在此文件配置。

| 字段                            | 类型      | 是否必填 | 初始值 / 省略行为 | 含义                                                                                           |
| ------------------------------- | --------- | -------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| `friends[]`                     | 分组数组  | 是       | 四个示例分组      | 按数组顺序展示分组。                                                                           |
| `friends[].title`               | Localized | 是       | 分组名称          | 分组标题。                                                                                     |
| `friends[].description`         | Localized | 否       | 不显示            | 分组说明。                                                                                     |
| `friends[].links`               | 数组      | 是       | 示例链接          | 按顺序显示卡片，可以为空数组。                                                                 |
| `friends[].links[].name`        | Localized | 是       | 站点名称          | 卡片标题，参与搜索。                                                                           |
| `friends[].links[].description` | Localized | 是       | 站点简介          | 参与搜索，可填空字符串。                                                                       |
| `friends[].links[].url`         | string    | 是       | 站点地址          | 完整网站 URL。                                                                                 |
| `friends[].links[].avatar`      | string    | 否       | 使用 icon         | 圆角方形头像，完整 URL 或 public 下的路径；本地路径自动添加部署前缀。有头像时优先显示。        |
| `friends[].links[].icon`        | string    | 否       | `'globe'`         | 无 avatar 时使用的 Lucide 图标，支持 `book-open` 或 `lucide:book-open`。有头像时优先显示头像。 |

```ts
import type { FriendsConfig } from './src/types/config';

const friends: FriendsConfig = [
  {
    title: { zh: '资源', en: 'Resources' },
    links: [
      {
        name: 'Astro',
        description: { zh: '官方文档', en: 'Documentation' },
        url: 'https://docs.astro.build/',
        icon: 'book-open', // 也可配置 avatar；有头像时优先使用头像
      },
    ],
  },
];
export default friends;
```

## 界面语言注册配置

`src/i18n/i18n.config.ts` 统一注册同目录的界面翻译，由主题与社区贡献者维护。此注册表只负责主题界面文案。站点使用者通过 `site.locales` 选择内容语言，无需注册同名界面语言包；缺少界面译文时按回退规则显示。每种语言必填 `label: string`（菜单自称）和 `messages: Partial<Messages>`（完整或部分翻译），可选 `dir: 'ltr' | 'rtl'`，省略则自动推断方向。注册键是 BCP 47 代码；只注册不生成页面，还需加入 `site.locales`。部分翻译按默认语言、英文保底，并支持区域语言向上级语言回退。完整步骤见[语言与翻译](../content/languages.md)。

## 下一步

第一次配置时，按[站点与外观](./site.md)完成域名、作者、文案和日期，再配置[导航与友链](./navigation.md)。每篇正文的字段和覆盖顺序见 [Frontmatter](../content/frontmatter.md)。
