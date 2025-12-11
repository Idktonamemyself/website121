import { Music2, Gamepad2, Globe, Heart, Sparkles } from 'lucide-react';
export function CategoryFilter({ activeCategory, onCategoryChange }) {
    const categories = [
        { id: 'all', label: 'All Posts', icon: Globe },
        { id: 'ddlc', label: 'DDLC', icon: Heart },
        { id: 'anime', label: 'Anime', icon: Sparkles },
        { id: 'vocaloid', label: 'Vocaloid', icon: Music2 },
        { id: 'fnf', label: 'FNF', icon: Gamepad2 },
        { id: 'general', label: 'General', icon: Globe },
    ];
    return (<div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (<button key={cat.id} onClick={() => onCategoryChange(cat.id)} className={`
              win98-button flex items-center gap-1.5 text-sm
              ${isActive ? 'shadow-win98-pressed translate-x-[1px] translate-y-[1px]' : ''}
            `}>
            <Icon className="w-3.5 h-3.5"/>
            {cat.label}
          </button>);
        })}
    </div>);
}
