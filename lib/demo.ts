import { generateAnalysis } from '@/lib/mockAI';

export const getDemoAnalysis = () => {
  return generateAnalysis({ industry: 'retail', companyName: 'Acme Retail' });
};
