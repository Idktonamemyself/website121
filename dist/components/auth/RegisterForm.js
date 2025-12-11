var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import { X } from 'lucide-react';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
export function RegisterForm({ onClose, onSwitchToLogin }) {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const handleSendOtp = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            yield authService.sendOtp(email);
            setStep('verify');
            setLoading(false);
        }
        catch (err) {
            setError(err.message || 'Failed to send verification code');
            setLoading(false);
        }
    });
    const handleVerifyAndRegister = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = yield authService.verifyOtpAndSetPassword(email, otp, password, username);
            const authUser = yield authService.getCurrentUser();
            if (authUser) {
                login(authUser);
                onClose();
            }
        }
        catch (err) {
            setError(err.message || 'Registration failed');
            setLoading(false);
        }
    });
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="win98-window max-w-md w-full">
        <div className="win98-titlebar">
          <span className="text-sm">Register Account</span>
          <button onClick={onClose} className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button">
            <X className="w-3 h-3"/>
          </button>
        </div>

        {step === 'email' ? (<form onSubmit={handleSendOtp} className="p-4 space-y-3">
            {error && (<div className="bg-red-100 border-2 border-red-500 p-2 text-sm">
                {error}
              </div>)}

            <div>
              <label className="block text-sm font-bold mb-1">Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="win98-input w-full" required/>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={onSwitchToLogin} className="win98-button text-xs">
                Have an account?
              </button>
              <button type="submit" disabled={loading} className="win98-button">
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </div>
          </form>) : (<form onSubmit={handleVerifyAndRegister} className="p-4 space-y-3">
            {error && (<div className="bg-red-100 border-2 border-red-500 p-2 text-sm">
                {error}
              </div>)}

            <div className="bg-yellow-100 border-2 border-yellow-500 p-2 text-xs">
              Check your email for a 4-digit verification code
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Verification Code:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="win98-input w-full" maxLength={4} required/>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="win98-input w-full" required/>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="win98-input w-full" minLength={6} required/>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setStep('email')} className="win98-button">
                Back
              </button>
              <button type="submit" disabled={loading} className="win98-button">
                {loading ? 'Creating...' : 'Register'}
              </button>
            </div>
          </form>)}
      </div>
    </div>);
}
