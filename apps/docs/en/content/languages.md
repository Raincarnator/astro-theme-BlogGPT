# Languages and translations

BlogGPT includes `zh` and `en` and supports other valid BCP 47 codes, such as `ja`, `fr` and `pt-BR`. Interface packs, configured copy and content translations share language codes and are managed separately.

## Enable languages

`site.locales` determines which content languages the site builds, independently of registered interface translations. For example, publish only Japanese and English content:

```ts
site: {
  // Retain other site fields
  defaultLocale: 'ja',
  locales: ['ja', 'en'],
  localePrefixPolicy: 'redirect-to-default',
},
```

`locales` is a nonempty, unique enabled list containing `defaultLocale`. Codes are canonicalized as BCP 47 tags, such as `pt-br` to `pt-BR`. Single-language sites keep one code and hide the bottom-left language selector.

Even without Japanese interface translations, authors can create `hello.ja.md` and `hello.en.md`. This example builds Japanese and English pages, with English interface copy on Japanese pages. Keeping the registered Chinese interface translation does not add Chinese pages to the site.

## Language prefix policies

`site.localePrefixPolicy` defaults to the recommended `'redirect-to-default'`. These examples use `zh` as default and `en` as another language:

| Policy                  | Default-language address | Other-language address | Unprefixed address                                                                      |
| ----------------------- | ------------------------ | ---------------------- | --------------------------------------------------------------------------------------- |
| `'redirect-to-default'` | `/zh/posts/hello/`       | `/en/posts/hello/`     | Zero-second meta refresh directly to the final default-language page                    |
| `'omit-default-prefix'` | `/posts/hello/`          | `/en/posts/hello/`     | Displays default-language content directly; only this default-language address is built |
| `'require-prefix'`      | `/zh/posts/hello/`       | `/en/posts/hello/`     | Returns 404                                                                             |

Policies apply to single- and multilingual sites. Subdirectory deployment prepends the path from `site.baseUrl`.

`redirect-to-default` creates entry points for generated HTML pages, using the final address including any date directories. Queries and paragraph anchors are retained when JavaScript is enabled. RSS, JSON, images and attachments use final addresses. Rebuild and replace complete output after changing policy; the host serves pages or 404 according to actual files.

Each language page has its own canonical. `hreflang` links real translations, including articles with different date directories. All language versions of the same content must share a slug. Fallback-body pages keep their own canonical; the language menu can open the corresponding available fallback page. Redirect entry points are excluded from Sitemap and search indexes.

After changing the language prefix policy, authors must check that relative content links still point to the correct final URLs. The theme does not migrate these links automatically; the build warns about invalid local relative URLs. See [Files and URLs](./organization.md).

## Central interface language packs

Interface translations and their registry live together in `src/i18n/`, supplying theme buttons, menus and prompts. Site owners choose content languages through `site.locales`; missing interface translations use fallback copy.

Community translations are contributed directly to the repository. Submit a new translation file together with its registration in that directory’s `i18n.config.ts`:

1. Copy the complete `src/i18n/en.ts`, keep its keys and translate the values.
2. Import and register it in `src/i18n/i18n.config.ts`:

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

3. Enable the new language locally in `site.locales` to preview it, check copy and placeholders, and submit the translation and registration together. Add site-specific configured copy and content translations as needed.

`label` is the language’s native name; `messages` is a complete or partial translation table. Optional `dir` accepts `ltr` or `rtl` and is inferred when omitted. Dates, numbers, months and weekdays use the language’s `Intl` formatting.

Partial interface translations resolve per key through the requested language and parents, default language and parents, then built-in English. Preserve named placeholders such as `{days}` and `{posts}`. Empty strings intentionally stay blank. Enabled languages without a registered pack use fallback copy and an automatically generated menu label.

## Configured copy

Site names, authors, navigation, friends and `text` fields accept strings or localized maps:

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

Copy resolves through the requested language and parents, default language and parents, enabled list, then the first available value. See [Localized](../config/reference.md#localized-interface-copy) for types and fields.

## Pair content files

Language variants in the same directory with the same base name form a translation family:

```text
content/posts/hello.zh.md
content/posts/hello.en.mdx
content/posts/hello.ja.md

content/pages/about/index.zh.mdx
content/pages/about/index.en.mdx
```

Markdown and MDX can be paired. Each version has its own title, description, dates and body, sharing bundle attachments. Categories and tags follow the same rule.

The same rule applies to posts, standalone pages, categories and tags under `content/`: versions in the same directory with the same base filename and different language suffixes must share a `slug`, including unsuffixed, draft, hidden and disabled-language versions. Slugs must start with a lowercase ASCII letter or digit and contain only lowercase ASCII letters `a–z`, digits `0–9` and hyphens `-`. Leading hyphens, uppercase or mismatched values produce warnings identifying the source files and conflicting values, then stop the build.

## Missing translations

Bodies are selected in order: requested-language version, unsuffixed version, default-language version, then the first available version in `site.locales`. A notice appears when another language’s body is selected. Publication states such as drafts are applied before selection. Article `hidden` applies per language version: select the version first, then decide whether to hide it from discovery. Hidden versions still build and remain directly accessible; lists do not fall back to another language to make them visible.

Body suffixes match exactly. Include `pt` in the enabled list to use `pt` content. Valid BCP 47 filename suffixes are always recognized as language variants, independently of enabled locales or UI pack registration. After disabling `ja`, `hello.ja.md` remains the Japanese version of `hello`, but is excluded from content selection and build output. A valid language tag after the final dot in a filename is reserved for this purpose.

## Search and feeds

Search indexes, RSS and HTML lang use the full page language code. `/lang` cycles through enabled languages; `/lang pt-BR` selects one explicitly. See [Files and URLs](./organization.md) for date directories combined with language prefixes.
