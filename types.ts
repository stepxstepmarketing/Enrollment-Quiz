export interface Option {
  text: string;
  score: number;
}

export interface Question {
  category: string;
  question: string;
  options: Option[];
}

export interface LeadInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
}

export interface QuizResults {
  overallPercentage: number;
  level: 'Foundation' | 'Developing' | 'Optimized';
  categoryPercentages: Record<string, number>;
  weakestAreas: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  stat?: string;
}