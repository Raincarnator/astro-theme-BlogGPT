# Global HTML / CSS / JS

## Extension files

| File                     | Purpose                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `custom/head.html`       | Add to every page’s head, such as fonts, metadata and analytics scripts |
| `custom/body-start.html` | Add at the start of body                                                |
| `custom/body-end.html`   | Add at the end of body                                                  |
| `custom/styles.css`      | Load custom styles after theme styles                                   |
| `custom/client.ts`       | Run on first load and every client navigation                           |
| `custom/components/`     | Store reusable components imported by multiple MDX entries              |

The HTML, style and script entry points apply to blog articles, pages, lists and 404. Content imports components from `custom/components/` as needed. Keep one-off components in their article bundle, or write simple markup directly in MDX. See [MDX interactive components](../config/enhancements.md#mdx-interactive-components) for examples.

## HTML and scripts

For example, add a script supplied by your analytics service to `head.html`:

```html
<script
  defer
  src="https://analytics.example.com/script.js"
  data-website-id="YOUR_ID"
></script>
```

Replace the service address and ID. Use `%BASE_URL%my-script.js` for public assets; the placeholder becomes the deployment path.

## Client navigation

Handle page behavior in `onPageLoad` in `custom/client.ts`, retaining the existing `CustomPageContext` interface:

```ts
export function onPageLoad(context: CustomPageContext): void | (() => void) {
  const button = context.document.querySelector('#my-button');
  button?.addEventListener('click', () => console.log(context.path), {
    signal: context.signal,
  });
  return () => {
    // Clean up observers you created
  };
}
```

| Context field | Meaning                               |
| ------------- | ------------------------------------- |
| `document`    | Current Document                      |
| `path`        | Current path                          |
| `locale`      | Current language                      |
| `signal`      | AbortSignal aborted before navigation |

The returned function cleans up before navigation. Use `signal` to remove event listeners automatically, and release resources such as observers in the cleanup function. Native inline scripts can use `data-astro-rerun` to execute again after client navigation.

## Styles

```css
:root {
  --accent: #6366f1;
}
.article-content {
  font-family: system-ui, sans-serif;
}
```

Put your styles in `custom/styles.css`. Everyday writing and customization primarily use `blog.config.ts`, `content/`, `public/`, `custom/` and `archetypes/`, with friend links in `friends.config.ts`. Preserve these settings, content, assets, extensions and templates when updating the theme.
