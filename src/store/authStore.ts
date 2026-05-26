import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  setEmail: (email: string) => void;
  authenticate: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  email: null,
  setEmail: (email) => set({ email }),
  authenticate: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, email: null }),
}));
