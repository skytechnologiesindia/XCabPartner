/**
 * Permit form configuration & date helpers.
 */
export const permitConfig = {
  minNumberLength: 6,
  maxNumberLength: 20,
  validityYearsAhead: 15,
};

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Years offered for "Valid Till": this year through N years ahead. */
export function getValidityYears() {
  const start = new Date().getFullYear();
  return Array.from(
    { length: permitConfig.validityYearsAhead + 1 },
    (_, i) => start + i,
  );
}

/** Parses "12 Feb 2026" into a Date, or null when not a real date. */
export function parseValidTill(value) {
  const parts = (value || '').split(' ');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = MONTHS.indexOf(parts[1]);
  const year = parseInt(parts[2], 10);
  if (month < 0 || !day || !year) return null;
  const date = new Date(year, month, day);
  // Rejects overflow such as 31 Feb.
  if (date.getMonth() !== month || date.getDate() !== day) return null;
  return date;
}

/** True when the date is today or later. */
export function isValidityInFuture(value) {
  const date = parseValidTill(value);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export default { permitConfig, MONTHS, getValidityYears };
