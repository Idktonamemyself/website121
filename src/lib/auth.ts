import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AuthUser } from '@/stores/authStore';

export function mapSupabaseUser(user: User, profile?: any): AuthUser {
  return {
    id: user.id,
    email: user.email!,
    username: profile?.username || user.user_metadata?.username || user.email!.split('@')[0],
    bio: profile?.bio || user.user_metadata?.bio,
    avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
  };
}

export class AuthService {
  async sendOtp(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) throw error;
  }

  async verifyOtpAndSetPassword(email: string, token: string, password: string, username: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;

    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { username },
    });
    if (updateError) throw updateError;

    return data.user;
  }

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return mapSupabaseUser(user, profile);
  }

  async updateProfile(userId: string, updates: { username?: string; bio?: string; avatar_url?: string }) {
    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
  }
}

export const authService = new AuthService();
