/** A content family is identified by its directory and filename, not its URL slug. */
export function fileIdentity(file: string, locales: readonly string[]) {
  const stem = file.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '');
  const match = stem.match(/\.([^./]+)$/);
  const locale = match
    ? locales.find((locale) => locale.toLowerCase() === match[1].toLowerCase())
    : undefined;
  const key = locale ? stem.slice(0, -(locale.length + 1)) : stem;
  return { key, locale, bundle: key.split('/').at(-1) === 'index' };
}

export function chooseVariants<
  T extends { data: { _key: string; _locale?: string } },
>(
  entries: T[],
  locale: string,
  defaultLocale: string,
  locales: readonly string[],
): T[] {
  const families = new Map<string, Map<string, T>>();
  for (const entry of entries) {
    const versions = families.get(entry.data._key) ?? new Map<string, T>();
    const language = entry.data._locale ?? '';
    if (versions.has(language))
      throw new Error(
        `Duplicate content variant: ${entry.data._key} (${language || 'unsuffixed'}). Use one .md or .mdx file per variant.`,
      );
    versions.set(language, entry);
    families.set(entry.data._key, versions);
  }
  const order = [...new Set([locale, '', defaultLocale, ...locales])];
  return [...families.values()].flatMap((versions) => {
    for (const language of order) {
      const version = versions.get(language);
      if (version) return [version];
    }
    return [];
  });
}

export function assertUniqueSlugs<T extends { data: { slug: string } }>(
  entries: T[],
  context: string,
): T[] {
  const slugs = new Set<string>();
  for (const { data } of entries) {
    if (slugs.has(data.slug))
      throw new Error(`Duplicate ${context} slug: ${data.slug}`);
    slugs.add(data.slug);
  }
  return entries;
}

/** Translations of an article share a URL slug, including unpublished versions. */
export function assertMatchingPostSlugs<
  T extends { data: { _key: string; _locale?: string; slug: string } },
>(entries: T[]): T[] {
  const families = new Map<string, T['data']>();
  for (const { data } of entries) {
    const previous = families.get(data._key);
    if (previous && previous.slug !== data.slug)
      throw new Error(
        `Article translations must use the same slug: ${data._key} (${previous._locale || 'unsuffixed'}: ${previous.slug}, ${data._locale || 'unsuffixed'}: ${data.slug}).`,
      );
    families.set(data._key, data);
  }
  return entries;
}
