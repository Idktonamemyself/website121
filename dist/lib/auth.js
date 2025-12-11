var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from './supabase';
export function mapSupabaseUser(user, profile) {
    var _a, _b, _c;
    return {
        id: user.id,
        email: user.email,
        username: (profile === null || profile === void 0 ? void 0 : profile.username) || ((_a = user.user_metadata) === null || _a === void 0 ? void 0 : _a.username) || user.email.split('@')[0],
        bio: (profile === null || profile === void 0 ? void 0 : profile.bio) || ((_b = user.user_metadata) === null || _b === void 0 ? void 0 : _b.bio),
        avatar_url: (profile === null || profile === void 0 ? void 0 : profile.avatar_url) || ((_c = user.user_metadata) === null || _c === void 0 ? void 0 : _c.avatar_url),
    };
}
export class AuthService {
    sendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase.auth.signInWithOtp({
                email,
                options: { shouldCreateUser: true },
            });
            if (error)
                throw error;
        });
    }
    verifyOtpAndSetPassword(email, token, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase.auth.verifyOtp({
                email,
                token,
                type: 'email',
            });
            if (error)
                throw error;
            const { error: updateError } = yield supabase.auth.updateUser({
                password,
                data: { username },
            });
            if (updateError)
                throw updateError;
            return data.user;
        });
    }
    signInWithPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            return data.user;
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase.auth.signOut();
            if (error)
                throw error;
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { user } } = yield supabase.auth.getUser();
            if (!user)
                return null;
            const { data: profile } = yield supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            return mapSupabaseUser(user, profile);
        });
    }
    updateProfile(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', userId);
            if (error)
                throw error;
        });
    }
}
export const authService = new AuthService();
