var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Community } from './Community';
import { CreateCommunityForm } from './CreateCommunityForm';
export function CommunitiesSection() {
    const { user } = useAuthStore();
    const [communities, setCommunities] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchCommunities = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        const { data, error } = yield supabase
            .from('communities')
            .select(`
        *,
        user_profiles (
          username
        )
      `)
            .order('created_at', { ascending: false });
        if (!error && data) {
            setCommunities(data);
        }
        setLoading(false);
    });
    useEffect(() => {
        fetchCommunities();
    }, []);
    return (<>
      <div className="win98-window mb-4">
        <div className="win98-titlebar mb-2">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3"/>
            <span className="text-sm">Communities</span>
          </div>
          {user && (<button onClick={() => setShowCreateForm(true)} className="win98-button flex items-center gap-1 py-0 px-2 bg-[#00ff00] text-black">
              <Plus className="w-3 h-3"/>
              <span className="text-xs">New</span>
            </button>)}
        </div>

        <div className="p-2">
          {loading ? (<div className="bg-white shadow-win98-inset p-4 text-center text-sm">
              Loading communities...
            </div>) : communities.length === 0 ? (<div className="bg-white shadow-win98-inset p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-[#808080]"/>
              <p className="text-sm mb-2">No communities yet!</p>
              {user ? (<button onClick={() => setShowCreateForm(true)} className="win98-button text-xs">
                  Create the first community
                </button>) : (<p className="text-xs text-muted-foreground">Login to create one!</p>)}
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {communities.map((community) => (<Community key={community.id} name={community.name} bio={community.bio} image_url={community.image_url || undefined} creator={community.user_profiles.username} createdAt={community.created_at}/>))}
            </div>)}
        </div>
      </div>

      {showCreateForm && (<CreateCommunityForm onClose={() => setShowCreateForm(false)} onSuccess={fetchCommunities}/>)}
    </>);
}
