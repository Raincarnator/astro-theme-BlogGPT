# Reading, sharing and statistics

## Article display switches

`article.display` sets global defaults. Articles and standalone pages override individual fields through frontmatter `display`. All fields default to enabled when omitted in both places.

```yaml
display:
  title: true # Title, description and categories
  author: true # Author
  published: true # Publication date
  readingTime: true # Estimated reading time
  updated: true # Last update
  tags: true # Tags at the bottom
  share: true # Share button and panel
  navigation: true # Previous and next articles
```

Include only the fields you want to change. Both `true` and `false` override global values. Tags and neighboring articles apply to posts; standalone pages support the other relevant fields.

`date` sets publication time. Set `updated` for the last update; when it differs from publication time, it appears to the right of tags at the bottom. See [Frontmatter](../content/frontmatter.md) for aliases and field details.

## Sharing templates

Hover or focus “Share” to preview a cover, copy a link or select a social platform. Clicking the main button copies formatted text and briefly shows “Copied”.

```ts
sharing: {
  copyFormat: '{title}\n{description}\n{author} · {blog}\n{url}',
  platforms: [
    { name: 'X', icon: 'simple-icons:x', href: 'https://twitter.com/intent/tweet?text={title}&url={url}' },
    { name: 'Email', icon: 'lucide:mail', href: 'mailto:?subject={title}&body={text}' },
  ],
}
```

`copyFormat` accepts a string or localized map. Placeholders are `{title}`, `{description}`, `{author}`, `{blog}`, `{url}` and `{image}`. Platform hrefs also accept `{text}` for the combined sharing message. Link variables are encoded once automatically. URLs support HTTP, HTTPS and mailto.

Add, remove or reorder entries in `platforms`. Use `simple-icons:` for brands and `lucide:` for ordinary actions. Platforms occupy up to two rows, then scroll. Pinterest requires a sharing image.

Presets include X, Facebook, LinkedIn, Reddit, Bluesky, Threads, Telegram, WhatsApp, LINE, Weibo, QQ, Qzone, Tumblr, Pinterest and email. Sharing URLs and covers use `site.baseUrl`; set a publicly accessible production domain so platforms can fetch page information.

## Blog statistics

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

Open statistics from the author menu or `/status`. Toggle individual metrics, or use `enabled` for the entire feature. Click the backdrop or close button, or press Escape to exit.

Statistics use public articles in the current language and update on builds. Total and average length count body characters. The average publication interval divides the time between the earliest and latest publication by the number of intervals. First publication uses the earliest date; last update uses the latest `updated`, falling back to publication time per entry. Missing data appears as `—`.

The heatmap shows publications over the past 365 days, grouped by `site.timezone`. Dates with articles show their titles, descriptions and lengths, with links to open them. The bar chart shows the latest `recentLimit` articles in publication order from oldest to newest. Hover or focus for details; click to open an article.

## Copy and localization

`text` centralizes homepage and search headings, input prompts, Tab labels, 404 copy and footer descriptions. Site and author names, social labels and sharing platform names also accept localized maps. See the [configuration reference](./reference.md#text-descriptive-copy).
