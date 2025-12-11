import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  bio?: string;
  avatar_url?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  login: (user) => set({ user, loading: false }),
  logout: () => set({ user: null }),
  updateUser: (updatedUser) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updatedUser } : null 
  })),
  setLoading: (loading) => set({ loading }),
}));
