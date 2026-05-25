'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const load = async () => {
    const response = await fetch('/api/notifications');
    const data = await response.json();
    setNotifications(data.notifications || []);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    await fetch('/api/notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notifications.some((item) => !item.read) && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-aura-cyan" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications yet.</DropdownMenuItem>
        ) : (
          notifications.map((item) => (
            <DropdownMenuItem key={item.id} onClick={() => markRead(item.id)} className="flex flex-col items-start gap-1">
              <span className="font-semibold">{item.title}</span>
              <span className="text-xs text-slate-200">{item.message}</span>
              {!item.read && <span className="text-[10px] uppercase tracking-[0.2em] text-aura-cyan">Unread</span>}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
