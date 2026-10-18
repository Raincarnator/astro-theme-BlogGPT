# 常见问题

## 开发时可见的文章，为什么正式站点找不到？

检查 `draft` 与发布日期。开发服务可按 `posts.showDraftsInDev` 预览草稿与未来文章；正式发布需将草稿改为 `false`，并在发布时间到达后构建。

## 切换语言后为什么显示回退正文？

检查同目录、同基础文件名是否存在所需语言后缀。正文选择顺序见[语言与翻译](../content/languages.md#缺少译文时的选择)。

## 附件为什么返回 404？

确认文章使用 index 内容包，路径与大小写对应文件，部署包含完整产物。单文件文章的共享资源放在 `public/` 中，见[内容包与附件](../content/bundles.md)。

## Mermaid 图表为什么显示源码？

确认 `mermaid` 已开启、代码块语言为 `mermaid`，并检查图表语法。渲染器在图表接近可视区域时加载，加载异常可在浏览器控制台检查。

## 修改内容后怎样更新搜索？

运行 `pnpm build` 生成最新 Pagefind 索引，再用 `pnpm preview` 检查。部署时同时更新页面和搜索索引。

## 修改配置文案后，有些语言仍是旧文字？

多语言对象按当前语言选择值，各语言键需要同步更新。正文译文则分别保存在对应的 Markdown / MDX 文件中。

## 作者已修改，页脚为什么还是旧名字？

`footer.author` 可以单独配置。设为空字符串时跟随 `author.name`，重新构建后更新。

## 正文封面与分享封面如何选择？

`image` 设置正文和列表封面。启用 `article.shareCover` 时，分享使用 Satori 生成图；单篇 `shareCover: false` 改用普通封面。`display.share` 控制分享按钮。

## 分类名称为什么显示 slug？

为对应 slug 在 `content/categories/` 或 `content/tags/` 创建定义，并填写 title。文章的 categories、tags 使用定义中的 slug，见[分类与标签](../content/taxonomy.md#分类与标签)。

## 客户端切页后，自定义脚本如何重新运行？

在 `custom/client.ts` 的 `onPageLoad` 中注册行为，使用 `signal` 或返回函数清理，见[全站扩展](../customization/hooks.md)。

## 配置报错应该检查哪里？

按错误信息核对 `blog.config.ts`、`friends.config.ts` 的字段名、类型、必填项与值范围，见[完整配置参考](../config/reference.md)。
