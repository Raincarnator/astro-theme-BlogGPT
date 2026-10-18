# 导航、作者和友链

## 两份导航

`sidebar.items` 配置侧栏导航，`sidebar.menu` 配置左上角站名菜单。两者支持三种条目：

| type       | 用途       | 目标字段 |
| ---------- | ---------- | -------- |
| `builtin`  | 内置功能页 | `route`  |
| `page`     | 独立页面   | `page`   |
| `external` | 外部链接   | `href`   |

```ts
{ id: 'posts', type: 'builtin', route: 'posts', page: 'posts', label: '文章', icon: 'files' },
{ id: 'about', type: 'page', page: 'about', label: '关于', icon: 'info' },
{ id: 'repo', type: 'external', href: 'https://github.com/Raincarnator/BlogGPT', label: 'Github 仓库', icon: 'simple-icons:github', newTab: true },
```

以上为 `sidebar.items` 条目示例。站名菜单使用相同目标字段，省略 `icon`。名称与简介支持多语言对象。UI 图标使用 Lucide，品牌入口使用 Simple Icons。

内置页的 `page` 绑定内容介绍，见[分类、标签和页面](../content/taxonomy.md)。`sidebar.width` 设置默认、最小和最大宽度；拖动分界线或聚焦后使用方向键调整，双击恢复默认宽度。

## 作者菜单

`author` 配置名字 `name`、介绍 `bio`、头像和社交链接。`name` 与 `bio` 都支持普通字符串或多语言对象，例如：

```ts
author: {
  // 头像和社交链接等字段保留
  name: { zh: '站点作者', en: 'Site author' },
  bio: { zh: '记录日常与想法。', en: 'Notes from everyday life.' },
},
```

头像可填写 public 下的路径或完整 HTTPS 地址。

左下角菜单提供社交链接、快捷键说明、博客统计、外观、语言和 RSS。单语言站点自动隐藏语言选择，关闭统计时隐藏对应入口。快捷键说明与统计弹窗支持点击灰幕、关闭按钮或按 Escape 关闭。

## 友链

`friends.config.ts` 直接导出分组数组：

```ts
const friends: FriendsConfig = [
  {
    title: { zh: '主题帮助', en: 'Theme help' },
    description: {
      zh: '文档与相关资源。',
      en: 'Documentation and related resources.',
    },
    links: [
      {
        name: 'BlogGPT',
        description: { zh: '主题文档', en: 'Theme documentation' },
        url: 'https://bloggpt.reincarnatey.net',
        avatar: '/images/avatar.webp',
      },
    ],
  },
];
```

每组包含标题、可选简介与链接数组。链接设置名称、简介、网址，以及头像或备用 Lucide 图标。页面标题与介绍正文来自绑定的 pages 内容。搜索框按名称、简介和分组名称即时筛选。

完整类型与字段见[配置参考](./reference.md#friends-config-ts-友链)。

## 命令与补全

首页加号菜单列出命令和近期文章。输入 `/` 筛选命令，输入 `@` 按全部公开文章的标题匹配；选择建议后补全输入，提交后执行。`/theme `、`/lang ` 还会提示参数。

| 命令                     | 功能                                 |
| ------------------------ | ------------------------------------ |
| `/random`                | 随机打开一篇近期公开文章             |
| `/lang` / `/lang en`     | 循环语言或选择已启用的语言           |
| `/theme` / `/theme dark` | 切换外观，可指定 light、dark、system |
| `/status`                | 打开博客统计                         |
| `/categories`            | 打开分类列表                         |
| `/archives`              | 打开归档                             |

`posts.menuLimit` 控制加号菜单的近期文章数量，`posts.randomLimit` 控制随机候选数量。两项独立，大于文章数时包含全部，例如 `99999`。侧栏“最近”展示按时间排序的全部未置顶公开文章。

## 搜索范围与定位

| 范围 | 内容                                       |
| ---- | ------------------------------------------ |
| 文章 | 文章标题、简介与正文                       |
| 标题 | 文章标题与简介                             |
| 正文 | 文章正文，包含各级标题                     |
| 全站 | 文章、独立页面、分类和标签，包含内置页介绍 |

正文命中时，结果附带章节与高亮上下文，点击片段可定位到对应段落。相邻匹配会合并展示。开发服务提供本地检索，正式构建生成 Pagefind 索引。

## 演示头像来源

演示友链包括示例站点、主题帮助、图标资源与参考博客。主题帮助使用 BlogGPT、Astro、MDN 的公开标识；Lucide、Simple Icons、Stack、Fuwari 使用项目标识，AstroPaper 使用作者头像。虚构站点使用本地渐变图片。

相关资源：[Astro](https://github.com/withastro)、[MDN](https://github.com/mdn)、[Lucide](https://lucide.dev)、[Simple Icons](https://simpleicons.org)、[Stack](https://stack.cai.im/logo.png)、[Fuwari](https://github.com/saicaca/fuwari)、[AstroPaper](https://github.com/satnaing/astro-paper)。图片权利属于相应项目或作者。
