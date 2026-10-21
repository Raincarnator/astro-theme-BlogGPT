# Archetype 模板

## 新建内容

```sh
pnpm new post hello --title "我的第一篇文章"
pnpm new post travel --use bundle --title "旅行"
pnpm new page contact --title "联系"
pnpm new category notes --title "笔记"
pnpm new tag photography --title "摄影"
```

格式为 `pnpm new <post|page|category|tag> <slug> [--use <模板名>] [--title <标题>]`。slug 必须以小写英文字母或数字开头，其余字符只能使用小写英文字母、数字和短横线 `-`；标题可自由使用中文等字符。类型使用单数，目录使用复数。省略 `--use` 时使用 `default`，`--help` 查看帮助。

默认文章模板包含 `draft: true`，完成后改为 `false` 发布。

## 模板目录

```text
archetypes/posts/default/[slug].mdx
archetypes/posts/bundle/[slug]/index.mdx
```

模板目录映射到对应的 `content/` 目录。四类 bundle 模板都提供一个 `index.mdx`，可以添加图片、附件与子目录，创建内容时一起复制。

自定义模板放在对应类型的新目录中，再用 `--use` 选择。

## 变量

文件名与目录名使用 `[slug]` 等占位符，Markdown / MDX 正文使用 <code v-pre>{{ slug }}</code>：

| 变量                     | 值                                           |
| ------------------------ | -------------------------------------------- |
| `type`                   | 单数类型 post / page / category / tag        |
| `slug`                   | 命令传入的 slug，例如 notes-hello            |
| `title`                  | `--title` 指定的标题，省略时取 slug 最后一段 |
| `template`               | 模板名，默认 default                         |
| `date`                   | UTC 日期，YYYY-MM-DD                         |
| `datetime`               | UTC ISO 时间                                 |
| `time`                   | UTC 时间，HH-mm-ss                           |
| `year` / `month` / `day` | UTC 年 / 月 / 日                             |
| `timestamp`              | Unix 毫秒时间戳                              |

时间变量取自同一次执行。文件名中的 datetime 使用连字符替换冒号。

```yaml
title: '{{ title }}'
date: '{{ datetime }}'
slug: '{{ slug }}'
```

YAML 字符串占位符加引号，命令会处理标题中的引号、换行等字符，并生成双引号字符串。其他附件按原样复制；目标已存在时提示冲突，保留原文件。
