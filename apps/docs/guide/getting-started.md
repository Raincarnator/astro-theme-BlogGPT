# 安装与预览

创建个人博客可使用[精简 starter](https://github.com/Raincarnator/astro-theme-BlogGPT-starter)，或通过 [Vercel / Netlify 一键部署](./deployment.md#一键部署-starter)直接创建仓库并上线。下面介绍本地安装与预览。

## 环境要求

准备 Node.js **22.12 或更新版本**与 pnpm **11**：

```sh
node --version
pnpm --version
```

下载或克隆主题仓库，在包含 `package.json` 的根目录运行：

```sh
pnpm install
pnpm dev
```

打开终端显示的地址。开发服务会监听内容和样式变化；修改配置或依赖后重新启动。

## 初始配置

1. 在 `blog.config.ts` 中设置 `site.baseUrl`、站名和语言。
2. 修改 `author` 的名字、介绍、头像和社交链接，以及 `text` 中的说明文字。
3. 调整导航，编辑 `content/pages/` 中的页面与各语言译文。
4. 在 `friends.config.ts` 中替换友链，或导出空数组 `[]`。
5. 替换演示文章、分类、标签与图片。

字段说明见[完整配置参考](../config/reference.md)，常用设置见[站点与外观](../config/site.md)。

日常配置、写作和定制主要使用 `blog.config.ts`、`content/`、`public/`、`custom/` 与 `archetypes/`，友链使用 `friends.config.ts`。文章专用组件放在内容包内，复用组件放在 `custom/components/`，详见 [MDX 交互组件](../config/enhancements.md#mdx-交互组件)。

## 写第一篇文章

新建单文件文章：

```sh
pnpm new post hello --title "我的第一篇文章"
```

生成 `content/posts/hello.mdx`。需要图片和附件时，可用内容包模板：

```sh
pnpm new post first-bundle --use bundle --title "带图片的文章"
```

生成 `content/posts/first-bundle/index.mdx`，可在同目录添加附件。编辑标题、简介和正文，将 `draft` 改为 `false`，并设置发布时间。

`--title` 设置标题，`--use` 选择模板，slug 决定网址。更多用法见[写作模板](../content/archetypes.md)。

## 预览正式结果

```sh
pnpm build
pnpm preview
```

`build` 检查类型，生成页面、附件、分享图和搜索索引。`preview` 提供 `dist/` 中的正式产物，适合检查搜索、发布状态和部署路径。修改内容后重新构建。

## 常用命令

| 命令           | 用途             |
| -------------- | ---------------- |
| `pnpm dev`     | 启动博客实时预览 |
| `pnpm build`   | 构建博客         |
| `pnpm preview` | 预览构建好的博客 |
