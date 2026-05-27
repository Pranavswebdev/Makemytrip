import { describe, it, expect } from "vitest";
import {
  listPopularSpaces,
  listByArea,
  listByType,
  searchSpaces,
  getSpace,
  login,
  signup,
  verifyCode,
  getUser,
  updateUser,
  createBooking,
} from "./mockApi";
import { spaces } from "./spaces";
import { seedCredentials, seedUser } from "./user";

describe("mockApi — listings", () => {
  it("listPopularSpaces returns only popular spaces", async () => {
    const result = await listPopularSpaces();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((s) => s.popular)).toBe(true);
  });

  it("listByArea filters by area", async () => {
    const result = await listByArea("Malang");
    expect(result.every((s) => s.area === "Malang")).toBe(true);
  });

  it("listByArea returns empty for unknown area", async () => {
    const result = await listByArea("Atlantis");
    expect(result).toEqual([]);
  });

  it("listByType('Near You') returns all spaces", async () => {
    const result = await listByType("Near You");
    expect(result).toHaveLength(spaces.length);
  });

  it("listByType filters by concrete type", async () => {
    const result = await listByType("Hotel");
    expect(result.every((s) => s.type === "Hotel")).toBe(true);
  });
});

describe("mockApi — search", () => {
  it("returns matches by name/hotel/location", async () => {
    const result = await searchSpaces("Malang");
    expect(result.length).toBeGreaterThan(0);
  });

  it("is case-insensitive", async () => {
    const lower = await searchSpaces("malang");
    const upper = await searchSpaces("MALANG");
    expect(lower).toEqual(upper);
  });

  it("returns empty array for blank query", async () => {
    expect(await searchSpaces("   ")).toEqual([]);
  });

  it("returns empty array for no match", async () => {
    expect(await searchSpaces("zzzzz-nope")).toEqual([]);
  });
});

describe("mockApi — getSpace", () => {
  it("returns the matching space", async () => {
    const result = await getSpace(spaces[0].id);
    expect(result?.id).toBe(spaces[0].id);
  });

  it("returns undefined for unknown id", async () => {
    expect(await getSpace("missing")).toBeUndefined();
  });
});

describe("mockApi — auth", () => {
  it("login succeeds with seed credentials", async () => {
    const result = await login(seedCredentials.email, seedCredentials.password);
    expect(result.ok).toBe(true);
  });

  it("login succeeds with any well-formed credentials (prototype)", async () => {
    const result = await login("a@b.com", "secret");
    expect(result.ok).toBe(true);
  });

  it("login fails with empty credentials", async () => {
    const result = await login("", "");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid email or password.");
  });

  it("signup succeeds with credentials", async () => {
    expect((await signup("a@b.com", "pw")).ok).toBe(true);
  });

  it("signup fails without credentials", async () => {
    const result = await signup("", "");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Missing credentials.");
  });

  it("verifyCode accepts a 4-digit code", async () => {
    expect((await verifyCode("1234")).ok).toBe(true);
  });

  it("verifyCode rejects a non-4-digit code", async () => {
    const result = await verifyCode("12");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid code.");
  });
});

describe("mockApi — user + booking", () => {
  it("getUser returns the seed user", async () => {
    expect(await getUser()).toEqual(seedUser);
  });

  it("updateUser merges a patch", async () => {
    const result = await updateUser({ name: "New Name" });
    expect(result.name).toBe("New Name");
    expect(result.email).toBe(seedUser.email);
  });

  it("createBooking returns an ok result with an id", async () => {
    const result = await createBooking({
      spaceId: "x",
      startDate: "2026-06-01",
      endDate: "2026-06-03",
      nights: 2,
      guests: 2,
      total: 1000,
    });
    expect(result.ok).toBe(true);
    expect(result.id).toContain("BK-x-");
  });
});
