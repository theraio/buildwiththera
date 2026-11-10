/**
 * Named `date-fns` format patterns for the common cases consumers reach for
 * (e.g. passing `dateFormat={DATE_FORMATS.SHORT}` to `DatePicker`), so call
 * sites don't have to memorize raw `date-fns` tokens. Any `date-fns`-
 * compatible string can still be passed directly instead.
 */
export const DATE_FORMATS = {
  /** 06/10/2026 */
  SHORT: "MM/dd/yyyy",
  /** 10/06/2026 */
  SHORT_EU: "dd/MM/yyyy",
  /** 2026-06-10 */
  ISO: "yyyy-MM-dd",
  /** Jun 10, 2026 */
  MEDIUM: "LLL d, y",
  /** June 10th, 2026 */
  LONG: "PPP",
} as const;

export const DEFAULT_DATE_FORMAT = DATE_FORMATS.LONG;
export const DEFAULT_DATE_RANGE_FORMAT = DATE_FORMATS.MEDIUM;
