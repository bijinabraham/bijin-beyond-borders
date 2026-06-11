const BASE = process.env.NODE_ENV === "production" ? "/bijin-beyond-borders" : "";

/** Prefix local photo paths with the basePath. External URLs pass through unchanged. */
export function photo(src: string): string {
  if (src.startsWith("http")) return src;
  return `${BASE}${src}`;
}
