import { describe, it, expect } from "vitest";
import { spaces } from "./spaces";
import { seedUser, seedCredentials } from "./user";

describe("seed spaces", () => {
  it("has a non-empty catalogue", () => {
    expect(spaces.length).toBeGreaterThan(0);
  });

  it("every space has unique id", () => {
    const ids = spaces.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every space has positive price and valid rating", () => {
    for (const s of spaces) {
      expect(s.pricePerNight).toBeGreaterThan(0);
      expect(s.rating).toBeGreaterThanOrEqual(0);
      expect(s.rating).toBeLessThanOrEqual(5);
    }
  });

  it("has at least one popular space", () => {
    expect(spaces.some((s) => s.popular)).toBe(true);
  });
});

describe("seed user", () => {
  it("exposes a complete profile", () => {
    expect(seedUser.name).toBeTruthy();
    expect(seedUser.email).toContain("@");
    expect(seedUser.role).toBe("Customer");
  });

  it("credentials reference the seed user email", () => {
    expect(seedCredentials.email).toBe(seedUser.email);
    expect(seedCredentials.password).toBeTruthy();
  });
});
