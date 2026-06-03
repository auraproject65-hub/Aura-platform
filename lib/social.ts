export const generateWeeklyContentPlan = () => {
  return {
    week: new Date().toISOString().slice(0, 10),
    posts: [
      {
        platform: 'LinkedIn',
        content: 'Your data has more to say. AURA listens.',
        type: 'image',
        scheduled: 'Monday 8:00 AM GMT',
      },
      {
        platform: 'Twitter/X',
        content: 'One metric you wish you could predict? #AI #BusinessIntelligence',
        type: 'text',
        scheduled: 'Tuesday 12:00 PM GMT',
      },
      {
        platform: 'TikTok',
        content: 'POV: You just uploaded your data and AURA spotted a loophole.',
        type: 'video-idea',
        scheduled: 'Wednesday 4:00 PM GMT',
      },
    ],
  };
};
