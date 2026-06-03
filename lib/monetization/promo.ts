// Promo codes (demo)
const promoCodes: any = {
  'AURA3FREE': { plan: 'pro', trialDays: 90, description: '3 months Pro trial' },
  'YOUTUBE3FREE': { plan: 'pro', trialDays: 90, description: 'YouTube promo' },
  'LINKEDIN3FREE': { plan: 'pro', trialDays: 90, description: 'LinkedIn promo' },
  'LAUNCH50': { plan: 'pro', discountPercent: 50, description: '50% off first month' },
};

export const validatePromo = (code: string) => {
  return promoCodes[code.toUpperCase()] || null;
};

export const getPromoBenefits = (code: string) => {
  const promo = validatePromo(code);
  if (!promo) return null;
  if (promo.trialDays) {
    return { type: 'trial', days: promo.trialDays, plan: promo.plan };
  }
  if (promo.discountPercent) {
    return { type: 'discount', percent: promo.discountPercent, plan: promo.plan };
  }
  return null;
};
