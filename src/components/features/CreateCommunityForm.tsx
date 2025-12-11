import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

interface CreateCommunityFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateCommunityForm({ onClose, onSuccess }: CreateCommunityFormProps) {
  const { user } = useAuthStore();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('communities')
        .insert({
          user_id: user.id,
          name,
          bio,
          image_url: imageUrl || null,
        });

      if (insertError) throw insertError;

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create community');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="win98-window max-w-md w-full">
        <div className="win98-titlebar">
          <span className="text-sm">Create New Community</span>
          <button 
            onClick={onClose}
            className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button hover:shadow-win98-pressed"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          {error && (
            <div className="bg-red-100 border-2 border-red-500 p-2 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1">Community Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="win98-input w-full"
              placeholder="e.g., Miku Fans United"
              required
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="win98-input w-full h-20 resize-none font-system"
              placeholder="Describe your community..."
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Image URL (optional):</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="win98-input w-full"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Paste a link to an image from the internet
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="win98-button">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="win98-button bg-[#00ff00]">
              {loading ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
