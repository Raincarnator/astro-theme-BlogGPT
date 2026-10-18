# 内容包与附件

## 一个目录，一篇内容

```text
content/posts/travel/
  index.zh.mdx
  index.en.md
  cover.webp
  photos/sunset.jpg
  downloads/notes.zip
  demo.html
```

index 文件保存正文及其译文，其他文件作为附件发布到对应页面目录。图片、视频、压缩包、代码、HTML 与 Markdown 文件都可以放在内容包中。

## 相对路径引用

```md
![日落](./photos/sunset.jpg)
[下载笔记](./downloads/notes.zip)
[HTML 示例](./demo.html)
```

MDX 也可使用 HTML 标签，例如 `<video controls src="./clip.mp4" />`。Markdown 图片可以由 Astro 优化，原始附件同时保留。

资源地址随页面的实际渲染路径处理，包括绑定到内置页的介绍正文。

文章专用的 Astro 组件及其脚本、样式可以与 MDX 放在同一内容包，用 `import Demo from './Demo.astro'` 导入。供多篇文章复用的组件放在 `custom/components/`，详见 [MDX 交互组件](../config/enhancements.md#mdx-交互组件)。

## 发布范围

包内附件随正文一起公开，语言入口文件由内容加载器处理。未发布文章的附件在发布时生成，附件本身作为文件访问。

资源名需与生成页面区分，例如 HTML 附件可命名为 `demo.html`；与 `index.html` 冲突时构建会提示错误。普通单文件的共享图片放在 `public/`，以 `/images/example.webp` 引用。
