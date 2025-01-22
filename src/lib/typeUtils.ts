/**
 * Safely converts a value to string, handling null/undefined
 */
export const toStringSafe = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};