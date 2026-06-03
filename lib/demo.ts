import { generateAnalysis } from './mockAI';

export const getDemoAnalysis = () => {
  return generateAnalysis({ industry: 'retail', companyName: 'Acme Retail' });
};
