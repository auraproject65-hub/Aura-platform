const referrals: any = {};

export const generateReferralCode = (userId: string) => {
  const code = `AURA-${userId.slice(0, 6).toUpperCase()}`;
  referrals[code] = { userId, signups: 0 };
  return code;
};

export const trackReferral = (code: string) => {
  if (referrals[code]) {
    referrals[code].signups += 1;
    return referrals[code].signups;
  }
  return 0;
};
