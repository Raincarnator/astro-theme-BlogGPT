type PagefindData = {
  url: string;
  excerpt: string;
  meta: { title?: string; description?: string; sections?: string };
};
export type Pagefind = {
  init: () => Promise<void>;
  destroy: () => Promise<void>;
  search: (
    query: string,
    options?: { filters: { kind: string } },
  ) => Promise<{ results: { data: () => Promise<PagefindData> }[] }>;
};
type PagefindModule = {
  createInstance: (options?: { baseUrl: string }) => Pagefind;
};

/** ES modules survive Astro navigation. Each page needs its own language-aware instance. */
export function searchIndexes(
  base: string,
  signal: AbortSignal,
  load: (path: string) => Promise<PagefindModule> = (path) =>
    import(/* @vite-ignore */ path),
) {
  const promises = new Map<string, Promise<Pagefind>>();
  return (folder: string) => {
    let promise = promises.get(folder);
    if (!promise) {
      promise = load(`${base}${folder}/pagefind.js`).then((module) => {
        if (signal.aborted)
          throw new DOMException('Navigation cancelled', 'AbortError');
        // Our records already carry the full pathname including site.base.
        const instance = module.createInstance({ baseUrl: '/' });
        signal.addEventListener(
          'abort',
          () => {
            // A worker can still be starting when the reader navigates away.
            void instance
              .init()
              .then(() => instance.destroy())
              .catch(() => {});
          },
          { once: true },
        );
        return instance;
      });
      promises.set(folder, promise);
    }
    return promise;
  };
}
