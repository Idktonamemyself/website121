import { MessageSquare, User, Clock } from 'lucide-react';

interface ForumPostProps {
  title: string;
  author: string;
  content: string;
  category: 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general';
  replies: number;
  timestamp: string;
}

export function ForumPost({ title, author, content, category, replies, timestamp }: ForumPostProps) {
  const categoryLabels = {
    ddlc: 'DDLC',
    anime: 'ANIME',
    vocaloid: 'VOCALOID',
    fnf: 'FNF',
    general: 'GENERAL',
  };

  const categoryColors = {
    ddlc: '#ffb3d9',
    anime: '#ff69b4',
    vocaloid: '#00ffff',
    fnf: '#ff00ff',
    general: '#ffff00',
  };

  return (
    <div className="win98-window mb-3">
      <div className="win98-titlebar">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 flex items-center justify-center text-[8px] font-bold"
            style={{ backgroundColor: categoryColors[category], color: '#000' }}
          >
            {categoryLabels[category].charAt(0)}
          </div>
          <span className="text-sm font-bold">{title}</span>
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <p className="text-sm mb-3 border-l-2 border-[#808080] pl-2">
          {content}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-[#c0c0c0]">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span className="font-bold">{author}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{replies} replies</span>
          </div>
          
          <div className="flex items-center gap-1 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
