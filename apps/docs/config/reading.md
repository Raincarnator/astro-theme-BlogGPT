# 阅读界面、分享与统计

## 文章显示开关

`article.display` 设置全局默认值，文章与独立页面在 frontmatter 的 `display` 中逐项覆盖。两处都省略时，各项默认开启。

```yaml
display:
  title: true # 标题、简介和分类
  author: true # 作者
  published: true # 发布时间
  readingTime: true # 估算阅读时间
  updated: true # 最后更新时间
  tags: true # 底部标签
  share: true # 分享按钮与浮窗
  navigation: true # 上一篇、下一篇
```

只需填写需要修改的项目，`true` 和 `false` 都优先于全局。标签与相邻文章用于 posts；独立页面支持其余相关项目。

`date` 设置发布时间；`updated` 填写最后更新时间，与发布时间不同时显示在正文底部标签右侧。日期别名与字段说明见 [Frontmatter](../content/frontmatter.md)。

## 分享模板

悬停或聚焦“分享”打开浮窗，可预览封面、复制链接或选择社交平台。点击主按钮复制格式化文字，短暂显示“已复制”后恢复。

```ts
sharing: {
  copyFormat: '{title}\n{description}\n{author} · {blog}\n{url}',
  platforms: [
    { name: 'X', icon: 'simple-icons:x', href: 'https://twitter.com/intent/tweet?text={title}&url={url}' },
    { name: 'Email', icon: 'lucide:mail', href: 'mailto:?subject={title}&body={text}' },
  ],
}
```

`copyFormat` 支持字符串或多语言对象。可用占位符为 `{title}`、`{description}`、`{author}`、`{blog}`、`{url}`、`{image}`；平台 href 还支持 `{text}`，代表组合后的分享文字。链接变量自动编码一次，网址支持 HTTP、HTTPS 和 mailto。

通过 `platforms` 增删或排序平台。品牌图标使用 `simple-icons:`，普通操作使用 `lucide:`。平台最多显示两行，超出后滚动。Pinterest 入口需要分享图片。

预设包括 X、Facebook、LinkedIn、Reddit、Bluesky、Threads、Telegram、WhatsApp、LINE、微博、QQ、QQ 空间、Tumblr、Pinterest 和邮件。分享地址与封面使用 `site.baseUrl`，正式发布时填写可公开访问的域名，便于平台抓取页面信息。

## 博客统计

```ts
statistics: {
  enabled: true,
  articleCount: true,
  wordCount: true,
  days: true,
  languages: true,
  averageWords: true,
  updateFrequency: true,
  firstPublication: true,
  lastUpdate: true,
  heatmap: true,
  recentWords: true,
  recentLimit: 12,
}
```

从作者菜单或 `/status` 打开统计面板。各项可独立关闭，`enabled` 控制整个功能。点击灰幕、关闭按钮或按 Escape 退出。

统计基于当前语言的公开文章，随构建更新。总字数和平均字数按正文字符统计；平均更新间隔为最早与最新发布日期之差除以文章间隔数。首次发布取最早日期，最后更新取最新的 `updated`，缺省时使用发布日期。缺少有效数据时显示 `—`。

热力图展示近 365 天的发文记录，按 `site.timezone` 分组。有文章的日期可以查看当天文章的标题、简介与字数，并打开文章。柱状图显示最近 `recentLimit` 篇文章的字数，按发布时间从早到晚排列；悬停或聚焦查看详情，点击打开文章。

## 说明文字与多语言

`text` 集中配置首页与搜索标题、输入提示、Tab 名称、404 文案和页脚说明。站名、作者名、社交标签和分享平台名也支持多语言对象，见[配置参考](./reference.md#text-说明文字)。
