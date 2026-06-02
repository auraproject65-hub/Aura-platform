"use client";
import { useState } from 'react';

export default function IdeaWall() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Amara', content: 'How do I reduce churn in my SaaS?', replies: 3 },
    { id: 2, author: 'David', content: 'Best tools for cash flow management?', replies: 5 },
  ]);
  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), author: 'You', content: newPost, replies: 0 }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Idea Wall</h2>
      <p className="text-gray-400">Ask a question, get help from the community and AURA's AI experts.</p>
      <div className="glass-card flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="What's your business challenge?"
        />
        <button onClick={addPost} className="btn-primary">Post</button>
      </div>
      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="glass-card">
            <p className="font-semibold">{p.author}</p>
            <p className="text-gray-300">{p.content}</p>
            <p className="text-xs text-gray-500 mt-1">{p.replies} replies</p>
          </div>
        ))}
      </div>
    </div>
  );
}
