import { Users } from 'lucide-react';

interface CommunityProps {
  name: string;
  bio: string;
  image_url?: string;
  creator: string;
  createdAt: string;
}

export function Community({ name, bio, image_url, creator, createdAt }: CommunityProps) {
  return (
    <div className="win98-window">
      <div className="win98-titlebar">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span className="text-xs truncate">{name}</span>
        </div>
      </div>
      
      <div className="p-2 space-y-2">
        {image_url ? (
          <img 
            src={image_url} 
            alt={name}
            className="w-full h-32 object-cover shadow-win98-inset"
          />
        ) : (
          <div className="w-full h-32 bg-[#808080] shadow-win98-inset flex items-center justify-center">
            <Users className="w-12 h-12 text-[#c0c0c0]" />
          </div>
        )}
        
        <div className="bg-white shadow-win98-inset p-2">
          <p className="text-xs mb-2">{bio}</p>
          <div className="text-[10px] text-muted-foreground border-t border-[#808080] pt-1">
            Created by <strong>{creator}</strong> • {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
