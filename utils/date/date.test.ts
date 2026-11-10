import { describe, expect, it } from "vitest";
import { DATE_FORMATS } from "./constants";
import { formatDate, formatDateRange } from "./date";

const JUNE_10_2026 = new Date(2026, 5, 10);
const JUNE_20_2026 = new Date(2026, 5, 20);

describe("formatDate", () => {
  it("formats a date with the default pattern", () => {
    expect(formatDate(JUNE_10_2026)).toBe("June 10th, 2026");
  });

  it("formats a date with a given pattern", () => {
    expect(formatDate(JUNE_10_2026, DATE_FORMATS.SHORT)).toBe("06/10/2026");
  });

  it("returns undefined for an undefined date", () => {
    expect(formatDate(undefined)).toBeUndefined();
  });
});

describe("formatDateRange", () => {
  it("formats a complete range with the default pattern", () => {
    expect(formatDateRange({ from: JUNE_10_2026, to: JUNE_20_2026 })).toBe(
      "Jun 10, 2026 - Jun 20, 2026",
    );
  });

  it("formats a complete range with a given pattern", () => {
    expect(
      formatDateRange(
        { from: JUNE_10_2026, to: JUNE_20_2026 },
        DATE_FORMATS.SHORT,
      ),
    ).toBe("06/10/2026 - 06/20/2026");
  });

  it("formats an in-progress range (only `from` set) as a single date", () => {
    expect(formatDateRange({ from: JUNE_10_2026, to: undefined })).toBe(
      "Jun 10, 2026",
    );
  });

  it("returns undefined when nothing is selected", () => {
    expect(formatDateRange(undefined)).toBeUndefined();
  });
});
