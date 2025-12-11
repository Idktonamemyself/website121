import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { mapSupabaseUser } from '@/lib/auth';

export function useAuth() {
  const { user, loading, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (mounted && session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        login(mapSupabaseUser(session.user, profile));
      }
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          login(mapSupabaseUser(session.user, profile));
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          logout();
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          login(mapSupabaseUser(session.user, profile));
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [login, logout, setLoading]);

  return { user, loading };
}
