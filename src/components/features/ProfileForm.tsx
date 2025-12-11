import { useState } from 'react';
import { X, User } from 'lucide-react';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';

interface ProfileFormProps {
  onClose: () => void;
}

export function ProfileForm({ onClose }: ProfileFormProps) {
  const { user, updateUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setError('');
    setLoading(true);

    try {
      await authService.updateProfile(user.id, { username, bio, avatar_url: avatarUrl });
      updateUser({ username, bio, avatar_url: avatarUrl });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="win98-window max-w-md w-full">
        <div className="win98-titlebar">
          <span className="text-sm">Edit Profile</span>
          <button onClick={onClose} className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button">
            <X className="w-3 h-3" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {error && (
            <div className="bg-red-100 border-2 border-red-500 p-2 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-20 h-20 shadow-win98-outset" />
            ) : (
              <div className="w-20 h-20 bg-[#808080] flex items-center justify-center shadow-win98-inset">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="win98-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Avatar URL:</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="win98-input w-full"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="win98-input w-full h-24 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="win98-button">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="win98-button">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
