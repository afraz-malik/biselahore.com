const downloadsBaseUrl = (process.env.NEXT_PUBLIC_DOWNLOADS_BASE_URL ?? "").replace(/\/$/, "");

/** Resolves a download path against NEXT_PUBLIC_DOWNLOADS_BASE_URL. Absolute URLs are returned as-is. */
export function downloadUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return downloadsBaseUrl ? `${downloadsBaseUrl}${normalizedPath}` : normalizedPath;
}
