# 认识 BlogGPT

BlogGPT 是一个用 Astro 构建，受到 ChatGPT 布局启发的博客主题。用 Markdown 或 MDX 写作，以文件管理内容，通过侧栏、搜索和阅读目录找到想读的文章。

## 从这里开始

| 你想做什么           | 建议阅读                                                                        |
| -------------------- | ------------------------------------------------------------------------------- |
| 运行站点             | [安装与预览](./getting-started.md)                                              |
| 设置站名、作者和外观 | [站点与外观](../config/site.md)                                                 |
| 写文章               | [Frontmatter](../content/frontmatter.md)、[写作模板](../content/archetypes.md)  |
| 管理语言与附件       | [语言与翻译](../content/languages.md)、[内容包](../content/bundles.md)          |
| 调整导航和页面       | [导航](../config/navigation.md)、[分类、标签和页面](../content/taxonomy.md)     |
| 定制阅读功能         | [文章增强](../config/enhancements.md)、[阅读、分享与统计](../config/reading.md) |
| 添加样式和脚本       | [全站扩展](../customization/hooks.md)                                           |
| 发布已有内容         | [构建与部署](./deployment.md)、[迁移](./migration.md)                           |

所有公开配置字段的类型、默认值与填写方式见[完整配置参考](../config/reference.md)。

## 常用文件

| 位置                | 用途                                   |
| ------------------- | -------------------------------------- |
| `blog.config.ts`    | 站点、外观、导航、阅读和交互配置       |
| `friends.config.ts` | 分组友链                               |
| `content/`          | 文章、独立页面、分类和标签             |
| `public/`           | 头像、封面与其他共享资源               |
| `custom/`           | 自定义 HTML、CSS、客户端脚本与复用组件 |
| `archetypes/`       | 新建内容的模板                         |

## 演示站点

[演示站](https://demo.bloggpt.reincarnatey.net)按入门与发布、写作与排版、界面与定制介绍功能。可以先浏览界面，也可以从置顶的《认识 BlogGPT》按顺序阅读。

共享图片放在 `public/images/`：`avatar.webp` 为头像，`covers/` 为封面，`illustrations/` 为插图，`friends/` 为友链头像。正文也可以在内容包中使用相对路径图片。

搭建自己的站点时，替换演示内容、图片和 `example.com` 占位链接即可。
