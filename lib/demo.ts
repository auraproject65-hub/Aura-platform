import { generateAnalysis } from '@/lib/mockAI';

export const getDemoData = () => {
  return generateAnalysis({ industry: 'retail', companyName: 'Acme Retail' });
};
