import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "./authStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it("starts unauthenticated with no email", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBeNull();
  });

  it("setEmail stores the email", () => {
    useAuthStore.getState().setEmail("a@b.com");
    expect(useAuthStore.getState().email).toBe("a@b.com");
  });

  it("authenticate flips the auth flag", () => {
    useAuthStore.getState().authenticate();
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it("logout clears auth state and email", () => {
    useAuthStore.getState().setEmail("a@b.com");
    useAuthStore.getState().authenticate();
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBeNull();
  });
});
