import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/features/HeroSection';
import { CategoryFilter } from '@/components/features/CategoryFilter';
import { ForumPost } from '@/components/features/ForumPost';
import { CreatePostForm } from '@/components/features/CreatePostForm';
import { CommunitiesSection } from '@/components/features/CommunitiesSection';
import { Plus, Folder } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  category: 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general';
  replies: number;
  timestamp: string;
}

export function HomePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general'>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = (newPost: { title: string; content: string; category: 'ddlc' | 'anime' | 'vocaloid' | 'fnf' | 'general'; author: string }) => {
    const post: Post = {
      id: nextId,
      ...newPost,
      replies: 0,
      timestamp: 'Just now',
    };
    setPosts([post, ...posts]);
    setNextId(nextId + 1);
  };

  let filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
  
  if (searchQuery.trim()) {
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto p-4 max-w-5xl">
        <HeroSection />
        <CommunitiesSection />
        
        {user && (
          <div className="win98-window mb-4">
            <div className="win98-titlebar">
              <span className="text-sm">Forum Controls</span>
            </div>
            <div className="p-2 flex gap-2">
              <button 
                onClick={() => setShowCreateForm(true)}
                className="win98-button flex items-center gap-2 bg-[#00ff00]"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
            </div>
          </div>
        )}

        <div className="win98-window">
          <div className="win98-titlebar mb-2">
            <div className="flex items-center gap-2">
              <Folder className="w-3.5 h-3.5" />
              <span className="text-sm">Forum Posts</span>
            </div>
          </div>
          
          <div className="p-2">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
            />

            <div className="win98-panel min-h-[400px]">
              {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Folder className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-sm font-bold mb-2">
                    {searchQuery ? 'No posts found' : 'No posts yet!'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {searchQuery ? 'Try a different search term' : user ? 'Be the first to create a forum post.' : 'Register or login to create posts.'}
                  </p>
                  {user && !searchQuery && (
                    <button 
                      onClick={() => setShowCreateForm(true)}
                      className="win98-button"
                    >
                      Create First Post
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {filteredPosts.map((post) => (
                    <ForumPost key={post.id} {...post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showCreateForm && (
        <CreatePostForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
}
