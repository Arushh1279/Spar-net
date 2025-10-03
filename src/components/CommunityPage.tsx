import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send, Trash2, Users } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Post = {
  id: string;
  authorName: string;
  handle: string;
  avatarUrl?: string;
  content: string;
  createdAt: number;
  likes: number;
  liked: boolean;
};

const STORAGE_KEY = 'sparnet:communityPosts:v1';

const seedPosts: Post[] = [
  {
    id: 'seed-1',
    authorName: 'Spar-net',
    handle: 'sparnet',
    avatarUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop&crop=face',
    content: 'Welcome to Community! Share your training updates, fight clips, tips, and wins. 🥊',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    likes: 23,
    liked: false,
  },
  {
    id: 'seed-2',
    authorName: 'Alex Rodriguez',
    handle: 'alex_jiujitsu',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Three rounds of hard sparring today. Footwork is finally clicking. 🔥',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    likes: 12,
    liked: false,
  },
];

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedPosts;
    const parsed = JSON.parse(raw) as Post[];
    if (!Array.isArray(parsed)) return seedPosts;
    return parsed;
  } catch (e) {
    return seedPosts;
  }
}

function savePosts(posts: Post[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    // ignore quota errors for now
  }
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  useEffect(() => {
    if (posts.length) savePosts(posts);
  }, [posts]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.createdAt - a.createdAt),
    [posts]
  );

  function handlePost() {
    const content = draft.trim();
    if (!content) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      authorName: 'You',
      handle: 'you',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setDraft('');
  }

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 backdrop-blur-sm p-6 text-white">
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
            <Users className="text-pink-400" size={20} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 bg-clip-text text-transparent">
              Community Feed
            </h2>
            <p className="text-gray-200 text-xs md:text-sm">Post training updates, tips, questions, or wins</p>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-4 md:p-5">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>YOU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="What's happening?"
              className="bg-white/5 text-white border-white/10 placeholder:text-gray-400"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-400">Press Cmd/Ctrl + Enter to post</div>
              <Button
                onClick={handlePost}
                disabled={!draft.trim()}
                className="bg-gradient-to-r from-pink-500/80 to-red-500/80 text-white hover:from-pink-500 hover:to-red-500"
              >
                <Send className="mr-1" size={16} /> Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-black/20 backdrop-blur-sm rounded-3xl p-4 md:p-5 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Avatar>
                {post.avatarUrl ? (
                  <AvatarImage src={post.avatarUrl} />
                ) : (
                  <AvatarFallback>{post.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-white truncate">{post.authorName}</div>
                  <div className="text-gray-400 truncate">@{post.handle}</div>
                  <div className="text-gray-500">•</div>
                  <div className="text-gray-400">{timeAgo(post.createdAt)}</div>
                </div>
                <div className="mt-2 text-gray-200 whitespace-pre-wrap break-words">{post.content}</div>
                <div className="mt-3 flex items-center gap-6 text-sm">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      post.liked ? 'text-pink-400' : 'text-gray-400 hover:text-pink-300'
                    }`}
                  >
                    <Heart size={16} className={post.liked ? 'fill-pink-400' : ''} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-blue-300 transition-colors">
                    <MessageCircle size={16} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-green-300 transition-colors">
                    <Repeat2 size={16} />
                    <span>Repost</span>
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="ml-auto flex items-center gap-1 text-gray-500 hover:text-red-300 transition-colors"
                    aria-label="Delete post"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;