# Bundles and attachments

## One directory, one entry

```text
content/posts/travel/
  index.zh.mdx
  index.en.md
  cover.webp
  photos/sunset.jpg
  downloads/notes.zip
  demo.html
```

Index files hold the body and its translations. Other files are published as attachments beside the corresponding page. Bundles can contain images, video, archives, code, HTML and Markdown files.

## Relative references

```md
![Sunset](./photos/sunset.jpg)
[Download notes](./downloads/notes.zip)
[HTML example](./demo.html)
```

MDX can also use HTML tags, such as `<video controls src="./clip.mp4" />`. Astro can optimize Markdown images while retaining original attachments.

Asset addresses follow the actual rendered page path, including introductions bound to builtin pages.

Keep article-specific Astro components, scripts and styles in the same bundle as the MDX file, and import them with `import Demo from './Demo.astro'`. Put components shared by multiple articles in `custom/components/`. See [MDX interactive components](../config/enhancements.md#mdx-interactive-components).

## Publication scope

Bundle attachments are public with the body; the content loader handles language entry files. Attachments for unpublished articles are generated when published. Attachments are accessed as files.

Choose resource names distinct from generated pages, such as `demo.html` for an HTML attachment. A conflict with `index.html` produces a build error. Put shared images for standalone files in `public/` and reference them as `/images/example.webp`.
