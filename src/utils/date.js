/**
 * Date helpers for the API.
 *
 * [API] The app's date pickers store dates as "12 Feb 2026" (that is what the
 * driver sees). The backend only accepts "YYYY-MM-DD" text, never
 * "10-05-1995" and never with a time, so dates are converted just before
 * sending.
 */
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const pad = n => (n < 10 ? `0${n}` : `${n}`);

/** "12 Feb 2026" -> "2026-02-12". Returns null when it is not a real date. */
export function toApiDate(value) {
  if (!value) {
    return null;
  }
  // Already in API form.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  const parts = String(value).trim().split(/\s+/);
  if (parts.length !== 3) {
    return null;
  }
  const day = parseInt(parts[0], 10);
  const monthIndex = MONTHS.indexOf(parts[1]);
  const year = parseInt(parts[2], 10);
  if (!day || monthIndex < 0 || !year) {
    return null;
  }
  // Reject overflow such as 31 Feb.
  const date = new Date(year, monthIndex, day);
  if (date.getMonth() !== monthIndex || date.getDate() !== day) {
    return null;
  }
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}
