# Contributing to BlogGPT

Bug reports, documentation improvements, translations and focused pull requests are welcome. Use [GitHub Issues](https://github.com/Raincarnator/BlogGPT/issues) for reproducible bugs and feature proposals.

## Development

Use Node.js 22.12+ and the pnpm version pinned in `package.json`:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Before submitting a pull request, run:

```sh
pnpm lint
pnpm format:check
pnpm build
pnpm test
pnpm docs:build
```

Build the blog before running tests: some tests inspect the generated pages and search indexes. CI runs these checks on Node.js 22 and 24. Include reproduction steps and verification results; add screenshots for visible changes and regression tests for behavior changes.

## Scope and content

- Keep everyday site settings and customization in `blog.config.ts`, `friends.config.ts`, `content/`, `public/`, `custom/` and `archetypes/`.
- Update the Chinese documentation and demo content together with their English translations. The English README is primary; keep `README.zh-CN.md` aligned.
- Document changes to public configuration, frontmatter and writing commands, including defaults and examples.
- Keep one-off MDX components in their content bundle; reusable site components belong in `custom/components/`.

## Interface translations

Community translations are contributed directly to this repository:

1. Add `src/i18n/<locale>.ts`, using `en.ts` as the complete message-key reference.
2. Register the language, native display name and optional text direction in `src/i18n/i18n.config.ts`.
3. Keep placeholders such as `{pages}` unchanged. Partial packs inherit missing messages through the existing fallback chain.
4. To preview the translation, temporarily enable its BCP 47 locale in `blog.config.ts`. Keep the demo site's language selection unchanged in the pull request unless the change is intentional.

Interface packs and content languages are independent: authors can enable a content language without a matching interface pack. See the [language guide](apps/docs/en/content/languages.md).

## Licenses

Theme code uses [Apache-2.0](LICENSE); documentation under `apps/docs/` uses [MIT](apps/docs/LICENSE). Preserve notices for third-party material and include its source when adding assets. See [third-party notices](THIRD_PARTY_NOTICES.md).

## 中文说明

欢迎提交问题反馈、文档改进、翻译和范围明确的 PR。报告问题时请提供复现步骤，提交 PR 时说明改动和验证结果；界面改动附截图，行为改动补充回归测试。

开发环境使用 Node.js 22.12+ 和 `package.json` 中固定版本的 pnpm。安装与校验命令见上文；先构建博客，再运行依赖构建产物的测试。CI 在 Node.js 22 和 24 上执行校验。

- 中文文档与演示内容为主，同步更新对应英文；README 以英文为主，同步更新中文版。
- 公开配置、frontmatter 和写作命令发生变化时，同步说明默认值与示例。
- 日常设置与定制集中在 `blog.config.ts`、`friends.config.ts`、`content/`、`public/`、`custom/` 和 `archetypes/`。一次性 MDX 组件放在内容包内，复用组件放在 `custom/components/`。
- 界面翻译直接贡献到仓库：参考 `src/i18n/en.ts` 新增语言文件，在 `src/i18n/i18n.config.ts` 注册 BCP 47 语言标识、本地名称及可选的文字方向。保留 `{pages}` 等占位符，缺失文案沿用现有回退规则。预览时临时启用对应内容语言；PR 中保持演示站原有语言选择，除非需要有意调整。
- 界面语言包与内容语言相互独立，内容可以使用没有界面翻译的语言，详见[语言说明](apps/docs/content/languages.md)。
- 主题代码采用 Apache-2.0，`apps/docs/` 文档采用 MIT；添加第三方资源时注明来源并保留相关声明。
