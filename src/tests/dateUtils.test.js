import { describe, expect, it } from "vitest";

import {
  calculateNights,
  formatDisplayDate,
  getTodayDateString,
  parseDateInput,
} from "../utils/dateUtils";

describe("parseDateInput", () => {
  it("parses a valid ISO date", () => {
    const result = parseDateInput("2026-09-15");

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe("2026-09-15T00:00:00.000Z");
  });

  it("returns null for an invalid date", () => {
    expect(parseDateInput("2026-02-30")).toBeNull();
    expect(parseDateInput("invalid-date")).toBeNull();
    expect(parseDateInput("")).toBeNull();
  });
});

describe("calculateNights", () => {
  it("calculates a one-night stay", () => {
    expect(calculateNights("2026-09-10", "2026-09-11")).toBe(1);
  });

  it("calculates a multiple-night stay", () => {
    expect(calculateNights("2026-09-10", "2026-09-13")).toBe(3);
  });

  it("calculates nights across a month boundary", () => {
    expect(calculateNights("2026-09-29", "2026-10-02")).toBe(3);
  });

  it("calculates nights across a year boundary", () => {
    expect(calculateNights("2026-12-30", "2027-01-02")).toBe(3);
  });

  it("rejects a same-day stay", () => {
    expect(() => calculateNights("2026-09-10", "2026-09-10")).toThrow(
      "Check-out must be after check-in.",
    );
  });

  it("rejects a reversed date range", () => {
    expect(() => calculateNights("2026-09-12", "2026-09-10")).toThrow(
      "Check-out must be after check-in.",
    );
  });
});

describe("getTodayDateString", () => {
  it("returns a date in YYYY-MM-DD format", () => {
    const date = new Date(2026, 8, 10, 12, 30);

    expect(getTodayDateString(date)).toBe("2026-09-10");
  });
});

describe("formatDisplayDate", () => {
  it("formats a valid date for display", () => {
    expect(formatDisplayDate("2026-09-15")).toBe("15 September 2026");
  });

  it("returns an empty string for an invalid date", () => {
    expect(formatDisplayDate("invalid")).toBe("");
  });
});
