import { spaces } from "./spaces";
import { seedCredentials, seedUser } from "./user";
import type { Booking, Space, User } from "./types";

const delay = <T>(value: T, ms = 250): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const listPopularSpaces = (): Promise<Space[]> =>
  delay(spaces.filter((s) => s.popular));

export const listByArea = (area: string): Promise<Space[]> =>
  delay(spaces.filter((s) => s.area === area));

export const listByType = (type: Space["type"] | "Near You"): Promise<Space[]> =>
  delay(type === "Near You" ? spaces : spaces.filter((s) => s.type === type));

export const searchSpaces = (query: string): Promise<Space[]> => {
  const q = query.trim().toLowerCase();
  if (!q) return delay([]);
  return delay(
    spaces.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.hotel.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q),
    ),
  );
};

export const getSpace = (id: string): Promise<Space | undefined> =>
  delay(spaces.find((s) => s.id === id));

export interface AuthResult {
  ok: boolean;
  error?: string;
}

export const login = (email: string, password: string): Promise<AuthResult> => {
  if (email === seedCredentials.email && password === seedCredentials.password) {
    return delay({ ok: true });
  }
  // Accept any well-formed credentials in the prototype, but flag the seed mismatch softly.
  if (email && password) return delay({ ok: true });
  return delay({ ok: false, error: "Invalid email or password." });
};

export const signup = (email: string, password: string): Promise<AuthResult> =>
  email && password
    ? delay({ ok: true })
    : delay({ ok: false, error: "Missing credentials." });

export const verifyCode = (code: string): Promise<AuthResult> =>
  code.length === 4 ? delay({ ok: true }) : delay({ ok: false, error: "Invalid code." });

export const getUser = (): Promise<User> => delay(seedUser);

export const updateUser = (patch: Partial<User>): Promise<User> =>
  delay({ ...seedUser, ...patch });

export const createBooking = (booking: Booking): Promise<{ ok: true; id: string }> =>
  delay({ ok: true, id: `BK-${booking.spaceId}-${Date.now()}` });
