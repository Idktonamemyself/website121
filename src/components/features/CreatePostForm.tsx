import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

interface CreatePostFormProps {
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; category: 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general'; author: string }) => void;
}

export function CreatePostForm({ onClose, onSubmit }: CreatePostFormProps) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general'>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && user) {
      onSubmit({ title, content, category, author: user.username });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="win98-window max-w-2xl w-full">
        <div className="win98-titlebar">
          <span className="text-sm">New Forum Post</span>
          <button 
            onClick={onClose}
            className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button hover:shadow-win98-pressed"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          <div className="bg-[#00ffff] border-2 border-black p-2 text-xs">
            Posting as: <strong>{user?.username}</strong>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general')}
              className="win98-input w-full"
            >
              <option value="general">General</option>
              <option value="ddlc">DDLC (Doki Doki Literature Club)</option>
              <option value="anime">Anime (Madoka Magica, etc.)</option>
              <option value="vocaloid">Vocaloid</option>
              <option value="fnf">FNF (Friday Night Funkin')</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="win98-input w-full"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Message:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="win98-input w-full h-32 resize-none font-system"
              placeholder="Enter your message"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={onClose} className="win98-button">
              Cancel
            </button>
            <button type="submit" className="win98-button">
              Post Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
