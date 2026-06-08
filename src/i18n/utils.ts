import { ui, defaultLang, type Lang, type UIKey } from './ui';

export const locales = ['id', 'en'] as const;

/**
 * Derive the active locale from the first path segment of a URL.
 * Defaults to `id` when no (or an unknown) locale segment is present.
 */
export function getLocaleFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'id' || segment === 'en') return segment;
  return defaultLang;
}

/**
 * Returns a translator bound to a locale. Falls back to the default (`id`)
 * dictionary for missing keys, then to the key itself.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    const localized = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    return localized[key] ?? fallback[key] ?? key;
  };
}

/**
 * Build a locale-prefixed path. The root path `/` becomes `/<lang>/`.
 */
export function localizedPath(lang: Lang, path: string): string {
  if (path === '/') return `/${lang}/`;
  return `/${lang}${path}`;
}
