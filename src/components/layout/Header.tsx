import { Music2, Gamepad2, Home, Heart, Sparkles, MessageCircle, User, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/lib/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ProfileForm } from '@/components/features/ProfileForm';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await authService.signOut();
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
    <header className="w-full bg-[#c0c0c0] border-b-2 border-white shadow-win98-outset">
      <div className="container mx-auto">
        <div className="win98-titlebar">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white flex items-center justify-center text-[10px]">
              <Music2 className="w-3 h-3" />
            </div>
            <span className="text-sm">weird kid site</span>
          </div>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button">_</button>
            <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button">□</button>
            <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs font-bold flex items-center justify-center shadow-win98-button">×</button>
          </div>
        </div>
        
        <div className="bg-[#c0c0c0] px-2 py-1 flex items-center gap-1 border-b border-[#808080]">
          <button className="win98-button flex items-center gap-1 py-0.5 px-2">
            <Home className="w-3 h-3" />
            <span className="text-xs">Home</span>
          </button>
          <button className="win98-button flex items-center gap-1 py-0.5 px-2">
            <Heart className="w-3 h-3" />
            <span className="text-xs">DDLC</span>
          </button>
          <button className="win98-button flex items-center gap-1 py-0.5 px-2">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs">Anime</span>
          </button>
          <button className="win98-button flex items-center gap-1 py-0.5 px-2">
            <Music2 className="w-3 h-3" />
            <span className="text-xs">Vocaloid</span>
          </button>
          <button className="win98-button flex items-center gap-1 py-0.5 px-2">
            <Gamepad2 className="w-3 h-3" />
            <span className="text-xs">FNF</span>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 bg-white shadow-win98-inset px-2 py-0.5">
              <Search className="w-3 h-3 text-[#808080]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search posts..."
                className="bg-transparent border-0 outline-none text-xs w-32"
              />
            </div>
            
            <a 
              href="https://discord.gg/PqCwGaqJGk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="win98-button flex items-center gap-1 py-0.5 px-2 bg-[#ff00ff] text-white no-underline"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="text-xs">Discord</span>
            </a>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="win98-button flex items-center gap-1 py-0.5 px-2 bg-[#00ffff] text-black"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="w-4 h-4" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  <span className="text-xs font-bold">{user.username}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-1 win98-window z-50">
                    <button
                      onClick={() => { setShowProfile(true); setShowUserMenu(false); }}
                      className="win98-button w-full flex items-center gap-2 py-1 px-3 text-left text-xs"
                    >
                      <User className="w-3 h-3" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="win98-button w-full flex items-center gap-2 py-1 px-3 text-left text-xs"
                    >
                      <LogOut className="w-3 h-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-1">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="win98-button py-0.5 px-2 text-xs"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowRegister(true)}
                  className="win98-button py-0.5 px-2 text-xs bg-[#00ff00]"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    
    {showLogin && (
      <LoginForm 
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
      />
    )}
    
    {showRegister && (
      <RegisterForm 
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
      />
    )}
    
    {showProfile && (
      <ProfileForm onClose={() => setShowProfile(false)} />
    )}
    </>
  );
}
