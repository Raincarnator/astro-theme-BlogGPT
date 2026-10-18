import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, type Loader } from 'astro/loaders';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './lib/config';
import { safeSlug } from './lib/policy';
import { contentFiles, type ContentKind } from './lib/content-files';
import { fileIdentity } from './lib/content-variants';
import { contentLocales } from './lib/translations';
import { canonicalLocale } from './lib/locale';
const supportedLocales = contentLocales(config.site.locales);

function loader(kind: ContentKind): Loader {
  return {
    name: `bloggpt-${kind}`,
    async load(context) {
      const base = fileURLToPath(
        new URL(`content/${kind}/`, context.config.root),
      );
      const sync = async () => {
        const files = await contentFiles(base, supportedLocales);
        await glob({
          base: `./content/${kind}`,
          pattern: files.length
            ? files.map((file) => file.replace(/[()[\]{}*?!]/g, '\\$&'))
            : '__empty_collection__',
          generateId: ({ entry, data }) => {
            const identity = fileIdentity(entry, supportedLocales);
            data._key = identity.key;
            data._locale = identity.locale;
            data.lang = identity.locale ?? config.site.defaultLocale;
            data.slug ??= identity.bundle
              ? path.posix.basename(path.posix.dirname(identity.key))
              : path.posix.basename(identity.key);
            data.image ??= data.cover;
            return entry;
          },
        }).load({ ...context, watcher: undefined });
      };
      await sync();
      if (context.watcher) {
        context.watcher.add(base);
        let pending: ReturnType<typeof setTimeout> | undefined;
        let queue = Promise.resolve();
        const update = (file: string) => {
          const relative = path.relative(base, file);
          if (
            relative.startsWith('..') ||
            path.isAbsolute(relative) ||
            !/\.(md|mdx)$/i.test(file)
          )
            return;
          clearTimeout(pending);
          pending = setTimeout(() => {
            queue = queue
              .then(sync)
              .then(() => {
                context.logger.info(`Reloaded ${kind} content.`);
              })
              .catch((error) => context.logger.error(String(error)));
          }, 100);
        };
        context.watcher
          .on('add', update)
          .on('change', update)
          .on('unlink', update);
      }
    },
  };
}
const list = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) => (typeof value === 'string' ? [value] : (value ?? [])));
const common = z.object({
  title: z.string(),
  description: z.string().default(''),
  slug: z.string().transform(safeSlug),
  lang: z.string().transform(canonicalLocale),
  _key: z.string(),
  _locale: z.string().transform(canonicalLocale).optional(),
  image: z.string().optional(),
  draft: z.boolean().default(false),
  hidden: z.boolean().default(false),
  math: z.boolean().optional(),
  mermaid: z.boolean().optional(),
  lightbox: z.boolean().optional(),
  callouts: z.boolean().optional(),
  toc: z.boolean().optional(),
  shareCover: z.boolean().optional(),
  display: z
    .object({
      author: z.boolean().optional(),
      published: z.boolean().optional(),
      readingTime: z.boolean().optional(),
      updated: z.boolean().optional(),
      tags: z.boolean().optional(),
      share: z.boolean().optional(),
      navigation: z.boolean().optional(),
      title: z.boolean().optional(),
    })
    .optional(),
  coverStyle: z.enum(['thumbnail', 'fade', 'background']).optional(),
});
const posts = defineCollection({
  loader: loader('posts'),
  schema: common
    .extend({
      date: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      pubDatetime: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      modDatetime: z.coerce.date().optional(),
      lastmod: z.coerce.date().optional(),
      category: list,
      categories: list,
      tags: list,
      featured: z.boolean().default(false),
    })
    .refine(
      (value) => value.date || value.published || value.pubDatetime,
      'A publication date is required (date, published, or pubDatetime).',
    )
    .transform((value) => ({
      ...value,
      date: (value.date ?? value.published ?? value.pubDatetime)!,
      updated: value.updated ?? value.modDatetime ?? value.lastmod,
      categories: [...new Set([...value.category, ...value.categories])].map(
        safeSlug,
      ),
      tags: value.tags.map(safeSlug),
    })),
});
const pages = defineCollection({
  loader: loader('pages'),
  schema: common
    .extend({
      date: z.coerce.date().optional(),
      published: z.coerce.date().optional(),
      pubDatetime: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      modDatetime: z.coerce.date().optional(),
      lastmod: z.coerce.date().optional(),
    })
    .transform((value) => ({
      ...value,
      date: value.date ?? value.published ?? value.pubDatetime,
      updated: value.updated ?? value.modDatetime ?? value.lastmod,
    })),
});
const categories = defineCollection({
  loader: loader('categories'),
  schema: common,
});
const tags = defineCollection({ loader: loader('tags'), schema: common });
export const collections = { posts, pages, categories, tags };
