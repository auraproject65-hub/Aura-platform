// In-memory store for demo; will be moved to database later
const users: any[] = [];
const badges: any[] = [];

export const getOrCreateUser = (email: string) => {
  let user = users.find(u => u.email === email);
  if (!user) {
    user = {
      email,
      healthScore: Math.floor(Math.random() * 30 + 50),
      streak: 0,
      lastLogin: new Date().toISOString(),
      badges: [],
      goal: null,
    };
    users.push(user);
  }
  return user;
};

export const updateStreak = (email: string) => {
  const user = getOrCreateUser(email);
  const last = new Date(user.lastLogin);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    user.streak += 1;
  } else if (diffDays > 1) {
    user.streak = 1;
  }
  user.lastLogin = now.toISOString();
  user.healthScore = Math.min(100, Math.max(0, user.healthScore + Math.floor(Math.random() * 5 - 2)));
  checkBadges(user);
  return user;
};

export const checkBadges = (user: any) => {
  const badgeDefs = [
    { id: 'first-upload', name: 'First Upload', condition: () => user.analysesCount >= 1 },
    { id: 'streak-7', name: '7-Day Streak', condition: () => user.streak >= 7 },
    { id: 'streak-30', name: '30-Day Streak', condition: () => user.streak >= 30 },
    { id: 'health-80', name: 'Healthy Business', condition: () => user.healthScore >= 80 },
  ];
  badgeDefs.forEach(b => {
    if (!user.badges.find((x: any) => x.id === b.id) && b.condition()) {
      user.badges.push({ id: b.id, name: b.name, awardedAt: new Date().toISOString() });
    }
  });
  return user.badges;
};
