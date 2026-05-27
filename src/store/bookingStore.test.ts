import { describe, it, expect, beforeEach } from "vitest";
import { useBookingStore } from "./bookingStore";
import { spaces } from "../data/spaces";

const space = spaces[0];

describe("useBookingStore", () => {
  beforeEach(() => {
    useBookingStore.getState().reset();
  });

  it("has sensible defaults", () => {
    const state = useBookingStore.getState();
    expect(state.space).toBeNull();
    expect(state.nights).toBe(1);
    expect(state.guests).toBe(2);
    expect(state.total()).toBe(0);
  });

  it("setSpace stores the space and adopts its guest count", () => {
    useBookingStore.getState().setSpace(space);
    const state = useBookingStore.getState();
    expect(state.space?.id).toBe(space.id);
    expect(state.guests).toBe(space.guests);
  });

  it("setDates stores the range and nights", () => {
    useBookingStore.getState().setDates("2026-06-01", "2026-06-04", 3);
    const state = useBookingStore.getState();
    expect(state.startDate).toBe("2026-06-01");
    expect(state.endDate).toBe("2026-06-04");
    expect(state.nights).toBe(3);
  });

  it("setGuests updates guests", () => {
    useBookingStore.getState().setGuests(5);
    expect(useBookingStore.getState().guests).toBe(5);
  });

  it("total multiplies price by nights", () => {
    useBookingStore.getState().setSpace(space);
    useBookingStore.getState().setDates("2026-06-01", "2026-06-03", 2);
    expect(useBookingStore.getState().total()).toBe(space.pricePerNight * 2);
  });

  it("total floors nights at 1 (boundary)", () => {
    useBookingStore.getState().setSpace(space);
    useBookingStore.getState().setDates("2026-06-01", "2026-06-01", 0);
    expect(useBookingStore.getState().total()).toBe(space.pricePerNight);
  });

  it("reset returns to defaults", () => {
    useBookingStore.getState().setSpace(space);
    useBookingStore.getState().reset();
    expect(useBookingStore.getState().space).toBeNull();
    expect(useBookingStore.getState().nights).toBe(1);
  });
});
