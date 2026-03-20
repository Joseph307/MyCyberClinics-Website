export function authorToSlug(name: string | undefined): string {
  if (!name) return "";
  return String(name)
    .toLowerCase()
    // replace any non-alphanumeric sequences with a single dash
    .replace(/[^a-z0-9]+/g, "-")
    // trim leading/trailing dashes
    .replace(/(^-|-$)/g, "");
}

export function slugToAuthor(slug: string): string {
  // best-effort reverse: replace dashes with spaces and normalize spacing
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeAuthorName(name?: string): string {
  if (!name) return "";
  return String(name)
    .toLowerCase()
    // remove common honorifics/titles (Dr, Prof, Mr, Mrs, Ms, etc.)
    .replace(/\b(dr|dr\.|doctor|prof|prof\.|mr|mrs|ms)\b/gi, "")
    // remove any character that is not a letter or number or space
    .replace(/[^a-z0-9\s]/gi, " ")
    // collapse multiple spaces
    .replace(/\s+/g, " ")
    .trim();
}
