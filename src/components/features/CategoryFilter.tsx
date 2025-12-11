import { Music2, Gamepad2, Globe, Heart, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: 'all' | 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general';
  onCategoryChange: (category: 'all' | 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general') => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { id: 'all' as const, label: 'All Posts', icon: Globe },
    { id: 'ddlc' as const, label: 'DDLC', icon: Heart },
    { id: 'anime' as const, label: 'Anime', icon: Sparkles },
    { id: 'vocaloid' as const, label: 'Vocaloid', icon: Music2 },
    { id: 'fnf' as const, label: 'FNF', icon: Gamepad2 },
    { id: 'general' as const, label: 'General', icon: Globe },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              win98-button flex items-center gap-1.5 text-sm
              ${isActive ? 'shadow-win98-pressed translate-x-[1px] translate-y-[1px]' : ''}
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
