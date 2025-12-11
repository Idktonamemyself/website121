import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    login: (user) => set({ user, loading: false }),
    logout: () => set({ user: null }),
    updateUser: (updatedUser) => set((state) => ({
        user: state.user ? Object.assign(Object.assign({}, state.user), updatedUser) : null
    })),
    setLoading: (loading) => set({ loading }),
}));
