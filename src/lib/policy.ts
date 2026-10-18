export interface Visibility {
  draft: boolean;
  hidden: boolean;
  date: Date;
}

export function isPublished(data: Visibility, now = new Date()): boolean {
  return !data.draft && data.date.getTime() <= now.getTime();
}

export function canRender(
  data: Visibility,
  dev: boolean,
  previewDrafts: boolean,
  now = new Date(),
): boolean {
  return isPublished(data, now) || (dev && previewDrafts);
}

export function canDiscover(data: Visibility, now = new Date()): boolean {
  return isPublished(data, now) && !data.hidden;
}

export function safeSlug(value: string): string {
  const result = value.trim().replace(/^\/+|\/+$/g, '');
  if (
    !result ||
    result.split('/').some((part) => !part || part === '.' || part === '..') ||
    /[?#\\]/.test(result)
  ) {
    throw new Error(`Invalid article slug: ${value}`);
  }
  return result;
}
