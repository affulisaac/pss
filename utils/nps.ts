export const shouldShowNPS = (lastSubmitted: string | null): boolean => {
    if (!lastSubmitted) return true;
    
    const lastDate = new Date(lastSubmitted);
    const now = new Date();
    const daysSinceLastSubmission = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // Show NPS dialog every 30 days
    return daysSinceLastSubmission >= 30;
  };
  
  export const calculateNPSScore = (scores: number[]): number => {
    if (scores.length === 0) return 0;
    
    const promoters = scores.filter(score => score >= 9).length;
    const detractors = scores.filter(score => score <= 6).length;
    
    return Math.round(((promoters - detractors) / scores.length) * 100);
  };