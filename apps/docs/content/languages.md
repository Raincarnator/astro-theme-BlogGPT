# 语言与翻译

BlogGPT 内置 `zh` 与 `en`，支持添加其他有效的 BCP 47 语言代码，例如 `ja`、`fr`、`pt-BR`。界面语言包、配置文案与正文译文共用语言代码，分别管理。

## 启用语言

`site.locales` 决定站点构建的内容语言，独立于界面翻译注册。例如，只提供日语与英语内容：

```ts
site: {
  // 保留其他站点字段
  defaultLocale: 'ja',
  locales: ['ja', 'en'],
  localePrefixPolicy: 'redirect-to-default',
},
```

`locales` 为非空、无重复的启用列表，包含 `defaultLocale`。代码按 BCP 47 规范化，例如 `pt-br` 转为 `pt-BR`。单语言站保留一个代码，左下角菜单会隐藏语言选择。

即使仓库尚无日语界面译文，也可以创建 `hello.ja.md` 与 `hello.en.md`。此例生成日语和英语页面，日语页面的界面文字回退到英语；保留已注册的中文界面翻译也不影响站点只构建这两种语言。

## 语言前缀策略

`site.localePrefixPolicy` 默认使用推荐的 `'redirect-to-default'`。以默认语言 `zh`、另一种语言 `en` 为例：

| 策略                    | 默认语言地址       | 其他语言地址       | 无前缀地址                                     |
| ----------------------- | ------------------ | ------------------ | ---------------------------------------------- |
| `'redirect-to-default'` | `/zh/posts/hello/` | `/en/posts/hello/` | 零秒 meta refresh 直达默认语言最终页           |
| `'omit-default-prefix'` | `/posts/hello/`    | `/en/posts/hello/` | 直接显示默认语言内容，仅构建这一份默认语言地址 |
| `'require-prefix'`      | `/zh/posts/hello/` | `/en/posts/hello/` | 返回 404                                       |

策略适用于单语言与多语言站。子目录部署时，地址前加 `site.baseUrl` 中的路径。

`redirect-to-default` 为真实生成的 HTML 页面提供跳转入口，直接使用包含日期目录等片段的最终地址。启用 JavaScript 时保留查询参数和段落锚点。RSS、JSON、图片与附件使用最终地址。更改策略后重新构建并整体替换产物，托管服务按实际文件返回页面或 404。

各语言页面使用自己的 canonical，`hreflang` 关联真实译文，包括不同日期目录的文章版本或不同 slug 的独立页面。回退正文页保留自己的 canonical；语言菜单可进入对应的可用回退页面。跳转入口从 Sitemap 与搜索索引中排除。

修改语言前缀策略后，作者应检查正文中的相对链接是否仍指向正确的最终地址；主题不会自动迁移这些链接，构建时会对失效的本地相对地址给出警告。详见[目录与网址](./organization.md)。

## 集中管理界面语言包

界面翻译与注册配置均放在 `src/i18n/`，只负责按钮、菜单和提示等主题文案。普通用户通过 `site.locales` 选择内容语言，缺少对应界面翻译时按回退规则显示。

社区翻译直接贡献到仓库。新增语言时，一并提交翻译文件与同目录的 `i18n.config.ts` 注册条目：

1. 复制完整的 `src/i18n/en.ts`，保留键名，翻译值。
2. 在 `src/i18n/i18n.config.ts` 中导入并注册：

```ts
import en from './en.ts';
import zh from './zh.ts';
import ja from './ja.ts';
import type { LanguagePack } from '../lib/translations.ts';

const languages: Record<string, LanguagePack> = {
  zh: { label: '简体中文', messages: zh },
  en: { label: 'English', messages: en },
  ja: { label: '日本語', messages: ja },
};
export default languages;
```

3. 本地在 `site.locales` 中启用新语言进行预览，检查文案与占位符后，将译文与注册变更一同提交。站点自己的配置文案与正文译文按需添加。

`label` 是语言自称，`messages` 是完整或部分翻译表。可选 `dir` 使用 `ltr` 或 `rtl`，省略时自动推断。日期、数字、月份和星期由对应语言的 `Intl` 格式化。

部分界面翻译按“当前语言及上级语言 → 默认语言及上级语言 → 内置英文”逐键回退。保留 `{days}`、`{posts}` 等命名占位符；空字符串表示有意留空。尚未注册语言包时，启用的语言使用回退文字及自动生成的菜单名称。

## 配置文案

站名、作者、导航、友链与 `text` 等字段支持字符串或多语言对象：

```ts
author: {
  name: { zh: '站点作者', en: 'Site author' },
  bio: {
    zh: '记录日常与想法。',
    en: 'Notes from everyday life.',
    ja: '日々のことや考えを記録します。',
  },
}
```

文字按当前语言及上级、默认语言及上级、启用列表、首个可用值选择。类型与字段清单见 [Localized](../config/reference.md#多语言文字-localized)。

## 配对正文文件

同目录、同基础文件名的语言版本构成一组翻译：

```text
content/posts/hello.zh.md
content/posts/hello.en.mdx
content/posts/hello.ja.md

content/pages/about/index.zh.mdx
content/pages/about/index.en.mdx
```

Markdown 与 MDX 可以配对。各版本分别填写标题、简介、日期与正文，共享内容包附件。分类与标签使用相同规则。

同一篇文章（同目录、同基础文件名、不同语言后缀）的所有版本必须使用相同 `slug`，包括草稿和隐藏版本；不一致时构建会报错。独立页面、分类与标签仍可使用不同的译文 slug。

## 缺少译文时的选择

正文依次选择：当前语言版本、无后缀版本、默认语言版本、`site.locales` 中首个可用版本。选择其他语言的正文时会显示语言提示。草稿等发布状态在选择前处理。文章的 `hidden` 按语言版本生效：先选择版本，再判断是否从发现入口隐藏；隐藏版本仍正常构建并可通过网址直接访问，不会为了显示在列表中而回退到其他语言版本。

正文后缀精确匹配，例如要使用 `pt` 正文，需在启用列表中包含 `pt`。暂时停用社区语言时可以保留注册条目，以便继续识别文件后缀。

## 搜索与订阅

搜索索引、RSS 与 HTML lang 使用页面完整语言代码。`/lang` 按启用列表循环，`/lang pt-BR` 选择指定语言。文章日期目录与语言前缀的组合见[目录与网址](./organization.md)。
