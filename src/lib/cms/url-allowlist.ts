/**
 * Href allowlist for all CMS-managed link fields: relative paths, http(s),
 * mailto, and tel. Blocks javascript:, data:, and any other scheme.
 */
export function isAllowedUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") {
    return false;
  }
  if (trimmed.startsWith("/")) {
    return true;
  }
  return /^(https?:|mailto:|tel:)/i.test(trimmed);
}
