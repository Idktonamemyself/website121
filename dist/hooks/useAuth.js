var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { mapSupabaseUser } from '@/lib/auth';
export function useAuth() {
    const { user, loading, login, logout, setLoading } = useAuthStore();
    useEffect(() => {
        let mounted = true;
        supabase.auth.getSession().then((_a) => __awaiter(this, [_a], void 0, function* ({ data: { session } }) {
            if (mounted && (session === null || session === void 0 ? void 0 : session.user)) {
                const { data: profile } = yield supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                login(mapSupabaseUser(session.user, profile));
            }
            if (mounted)
                setLoading(false);
        }));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => __awaiter(this, void 0, void 0, function* () {
            if (!mounted)
                return;
            if (event === 'SIGNED_IN' && (session === null || session === void 0 ? void 0 : session.user)) {
                const { data: profile } = yield supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                login(mapSupabaseUser(session.user, profile));
                setLoading(false);
            }
            else if (event === 'SIGNED_OUT') {
                logout();
                setLoading(false);
            }
            else if (event === 'TOKEN_REFRESHED' && (session === null || session === void 0 ? void 0 : session.user)) {
                const { data: profile } = yield supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                login(mapSupabaseUser(session.user, profile));
            }
        }));
        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [login, logout, setLoading]);
    return { user, loading };
}
