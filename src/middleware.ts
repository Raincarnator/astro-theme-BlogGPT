import { defineMiddleware } from 'astro:middleware';
import { contentUrls } from './lib/content-urls';
import config from './lib/config';
import { postsFor, postHref, encodedSlug } from './lib/content';
import { href, withBase } from './lib/i18n';
import { htmlRoutes } from './lib/html-routes';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html'))
    return response;
  const articlePaths = new Map<string, string>();
  if (config.site.localePrefixPolicy === 'omit-default-prefix') {
    const root = href(config.site.defaultLocale);
    for (const target of await htmlRoutes(config.site.defaultLocale))
      articlePaths.set(
        withBase(`${config.site.defaultLocale}/${target.slice(root.length)}`),
        target,
      );
  }
  if (config.posts.pathPrefix)
    for (const locale of config.site.locales)
      for (const post of await postsFor(locale, true)) {
        articlePaths.set(
          href(locale, `posts/${encodedSlug(post.data.slug)}/`),
          postHref(post, locale),
        );
        articlePaths.set(
          withBase(`${locale}/posts/${encodedSlug(post.data.slug)}/`),
          postHref(post, locale),
        );
      }
  const html = contentUrls(
    await response.text(),
    context.url,
    new URL(config.site.url),
    articlePaths,
  );
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
