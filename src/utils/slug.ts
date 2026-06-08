/** Slugify a category name for use in URLs: lowercase, spaces -> '-'. */
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}
