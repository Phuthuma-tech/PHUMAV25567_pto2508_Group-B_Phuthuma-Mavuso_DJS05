/**
 * @file formatDate.js
 * Helpers for turning raw API date strings into human-readable text.
 */

/**
 * Format an ISO date string as a friendly "Month D, YYYY" date, e.g. "Updated 3 June 2026".
 *
 * @param {string} isoString - Raw date string from the API (e.g. show.updated).
 * @returns {string} Formatted, human-readable date, or a fallback string if invalid.
 */
export function formatUpdatedDate(isoString) {
  if (!isoString) return "Unknown";

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Unknown";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
