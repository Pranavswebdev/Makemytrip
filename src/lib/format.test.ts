import { describe, it, expect } from "vitest";
import { formatRs } from "./format";

describe("formatRs", () => {
  it.each([
    [0, "Rs 0"],
    [1000, "Rs 1,000"],
    [530000, "Rs 5,30,000"],
    [1101030, "Rs 11,01,030"],
  ])("formats %i as %s (Indian grouping)", (input, expected) => {
    expect(formatRs(input)).toBe(expected);
  });

  it("prefixes with 'Rs '", () => {
    expect(formatRs(42)).toMatch(/^Rs /);
  });

  it("handles negative values", () => {
    expect(formatRs(-1500)).toBe("Rs -1,500");
  });
});
