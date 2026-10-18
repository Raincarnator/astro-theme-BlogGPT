# Archetype templates

## Create content

```sh
pnpm new post hello --title "My first article"
pnpm new post travel --use bundle --title "Travel"
pnpm new page contact --title "Contact"
pnpm new category notes --title "Notes"
pnpm new tag photography --title "Photography"
```

The format is `pnpm new <post|page|category|tag> <slug> [--use <template>] [--title <title>]`. Types are singular and directories are plural. Omit `--use` for `default`, or use `--help` for help.

The default article template includes `draft: true`. Change it to `false` when ready to publish.

## Template directories

```text
archetypes/posts/default/[slug].mdx
archetypes/posts/bundle/[slug]/index.mdx
```

Template directories map to the corresponding `content/` directory. Each of the four bundle templates provides an `index.mdx`. Add images, attachments and subfolders to copy them with new content.

Place custom templates in a new directory under the relevant type, then select them with `--use`.

## Variables

Filenames and folder names use placeholders such as `[slug]`; Markdown / MDX bodies use <code v-pre>{{ slug }}</code>:

| Variable                 | Value                                               |
| ------------------------ | --------------------------------------------------- |
| `type`                   | Singular type: post / page / category / tag         |
| `slug`                   | Complete supplied slug, such as notes/hello         |
| `title`                  | `--title`, or the slug’s final segment when omitted |
| `template`               | Template name, defaulting to default                |
| `date`                   | UTC date, YYYY-MM-DD                                |
| `datetime`               | UTC ISO timestamp                                   |
| `time`                   | UTC time, HH-mm-ss                                  |
| `year` / `month` / `day` | UTC year / month / day                              |
| `timestamp`              | Unix milliseconds                                   |

Time variables share one execution timestamp. In filenames, datetime replaces colons with hyphens.

```yaml
title: '{{ title }}'
date: '{{ datetime }}'
slug: '{{ slug }}'
```

Quote YAML string placeholders; the command escapes quotes within titles. Other attachments are copied unchanged. Existing destinations produce a conflict, preserving the original files.
