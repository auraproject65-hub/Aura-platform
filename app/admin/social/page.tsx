"use client";
import AdminGuard from '@/components/Admin/AdminGuard';
import { generateWeeklyContentPlan } from '@/lib/social';

function SocialInner() {
  const plan = generateWeeklyContentPlan();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Social Media Plan</h2>
      <p className="text-gray-400">AI‑generated weekly content. Review and approve before scheduling.</p>
      <div className="space-y-3">
        {plan.posts.map((post: any, i: number) => (
          <div key={i} className="glass-card flex justify-between items-start">
            <div>
              <p className="text-sm text-aura-gold">{post.platform}</p>
              <p className="text-sm mt-1">{post.content}</p>
              <p className="text-xs text-gray-500 mt-2">Scheduled: {post.scheduled}</p>
            </div>
            <button className="text-xs bg-aura-teal px-3 py-1 rounded-full">Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SocialPage() {
  return (
    <AdminGuard>
      <SocialInner />
    </AdminGuard>
  );
}
"use client";
import { generateWeeklyContentPlan } from '@/lib/social';

export default function SocialAdmin() {
  const plan = generateWeeklyContentPlan();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Social Media Plan</h2>
      <p className="text-gray-400">AI‑generated weekly content. Review and approve before scheduling.</p>
      <div className="space-y-3">
        {plan.posts.map((post, i) => (
          <div key={i} className="glass-card flex justify-between items-start">
            <div>
              <p className="text-sm text-aura-gold">{post.platform}</p>
              <p className="text-sm mt-1">{post.content}</p>
              <p className="text-xs text-gray-500 mt-2">Scheduled: {post.scheduled}</p>
            </div>
            <button className="text-xs bg-aura-teal px-3 py-1 rounded-full">Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
}
