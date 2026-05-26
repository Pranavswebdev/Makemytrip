import { create } from "zustand";
import type { Space } from "../data/types";

interface BookingState {
  space: Space | null;
  startDate: string | null;
  endDate: string | null;
  nights: number;
  guests: number;
  setSpace: (space: Space) => void;
  setDates: (start: string, end: string, nights: number) => void;
  setGuests: (guests: number) => void;
  total: () => number;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  space: null,
  startDate: null,
  endDate: null,
  nights: 1,
  guests: 2,
  setSpace: (space) => set({ space, guests: space.guests }),
  setDates: (startDate, endDate, nights) => set({ startDate, endDate, nights }),
  setGuests: (guests) => set({ guests }),
  total: () => {
    const { space, nights } = get();
    return space ? space.pricePerNight * Math.max(1, nights) : 0;
  },
  reset: () =>
    set({ space: null, startDate: null, endDate: null, nights: 1, guests: 2 }),
}));
