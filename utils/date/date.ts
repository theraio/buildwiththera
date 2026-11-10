import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_RANGE_FORMAT } from "./constants";

/**
 * Formats a single date with a `date-fns` pattern (see `DATE_FORMATS` for
 * named presets).
 *
 * @param date - The date to format.
 * @param pattern - A `date-fns`-compatible format string.
 * @returns The formatted date, or `undefined` if `date` is `undefined`.
 */
export function formatDate(
  date: Date | undefined,
  pattern: string = DEFAULT_DATE_FORMAT,
) {
  return date ? format(date, pattern) : undefined;
}

/**
 * Formats a `react-day-picker` `DateRange` as a single label, e.g.
 * `"Jun 10, 2026 - Jun 20, 2026"`. While only `from` is set, returns just
 * that date so an in-progress range selection still has a readable label.
 *
 * @param range - The range to format.
 * @param pattern - A `date-fns`-compatible format string applied to both ends.
 * @returns The formatted range, or `undefined` if nothing is selected.
 */
export function formatDateRange(
  range: DateRange | undefined,
  pattern: string = DEFAULT_DATE_RANGE_FORMAT,
) {
  if (!range?.from) return undefined;
  if (!range.to) return formatDate(range.from, pattern);

  return `${formatDate(range.from, pattern)} - ${formatDate(range.to, pattern)}`;
}
