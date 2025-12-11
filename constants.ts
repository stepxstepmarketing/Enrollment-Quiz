import { Question } from './types';

// localStorage keys
export const STORAGE_KEYS = {
  ANSWERS: 'stepxstep_answers',
  LEAD: 'stepxstep_lead',
} as const;

// Environment variable getters with fallbacks
export const getWebhookUrl = (): string => {
  return import.meta.env.VITE_WEBHOOK_URL || '';
};

export const getBookingUrl = (): string => {
  return import.meta.env.VITE_BOOKING_URL || '';
};

export const getFormEmbedScript = (): string => {
  return import.meta.env.VITE_FORM_EMBED_SCRIPT || '';
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    category: 'Clarify',
    question: 'Do you have a clearly defined ideal student/client profile and brand messaging that speaks directly to them?',
    options: [
      { text: 'Yes, we have detailed personas and consistent messaging across all channels', score: 3 },
      { text: 'Somewhat - we know our audience but messaging is inconsistent', score: 2 },
      { text: 'We have a general idea but nothing documented', score: 1 },
      { text: 'No, we try to appeal to everyone', score: 0 }
    ]
  },
  {
    category: 'Clarify',
    question: 'How well do you understand what motivates your prospects to choose your service?',
    options: [
      { text: 'Very well - we regularly survey students/parents and know their pain points', score: 3 },
      { text: 'Pretty well - we have some insights from conversations', score: 2 },
      { text: 'Not very well - we assume we know what they want', score: 1 },
      { text: 'We don\'t really know', score: 0 }
    ]
  },
  {
    category: 'Invite',
    question: 'Do you have a lead generation system with dedicated landing pages and compelling offers?',
    options: [
      { text: 'Yes, multiple optimized landing pages with strong offers (free trials, workshops, etc.)', score: 3 },
      { text: 'We have one landing page and an offer', score: 2 },
      { text: 'We just direct people to our homepage', score: 1 },
      { text: 'We don\'t have any specific offers or landing pages', score: 0 }
    ]
  },
  {
    category: 'Invite',
    question: 'How are you currently generating new leads?',
    options: [
      { text: 'Multiple active channels: ads, SEO, referrals, partnerships all working together', score: 3 },
      { text: 'One or two channels working consistently', score: 2 },
      { text: 'Mostly word-of-mouth and sporadic efforts', score: 1 },
      { text: 'We struggle to generate consistent leads', score: 0 }
    ]
  },
  {
    category: 'Review',
    question: 'Do you pre-qualify leads before they come in for a trial or consultation?',
    options: [
      { text: 'Yes, we have a qualification process that filters out poor-fit prospects', score: 3 },
      { text: 'Somewhat - we ask basic questions', score: 2 },
      { text: 'Rarely - we take almost everyone who inquires', score: 1 },
      { text: 'No, we accept everyone regardless of fit', score: 0 }
    ]
  },
  {
    category: 'Review',
    question: 'Do you have an automated system to nurture and educate prospects before they visit?',
    options: [
      { text: 'Yes, automated email/SMS sequences that educate and build excitement', score: 3 },
      { text: 'We send some emails manually', score: 2 },
      { text: 'We confirm the appointment and that\'s it', score: 1 },
      { text: 'No follow-up until they show up', score: 0 }
    ]
  },
  {
    category: 'Convert',
    question: 'What percentage of trial students/clients enroll in your full program?',
    options: [
      { text: '60% or higher', score: 3 },
      { text: '40-59%', score: 2 },
      { text: '20-39%', score: 1 },
      { text: 'Less than 20% or I don\'t track this', score: 0 }
    ]
  },
  {
    category: 'Convert',
    question: 'Do you have a structured enrollment conversation or process after the trial?',
    options: [
      { text: 'Yes, a proven enrollment script/process with clear pricing presentation', score: 3 },
      { text: 'We have a loose process', score: 2 },
      { text: 'We wing it based on how we feel', score: 1 },
      { text: 'We just hope they sign up', score: 0 }
    ]
  },
  {
    category: 'Loopback',
    question: 'What happens when someone doesn\'t enroll immediately (says "I need to think about it")?',
    options: [
      { text: 'Automated follow-up sequence with multiple touchpoints to re-engage', score: 3 },
      { text: 'We manually follow up once or twice', score: 2 },
      { text: 'We follow up if we remember', score: 1 },
      { text: 'Nothing - we wait for them to come back to us', score: 0 }
    ]
  },
  {
    category: 'Loopback',
    question: 'Do you track and measure your follow-up effectiveness?',
    options: [
      { text: 'Yes, we have detailed tracking in a CRM system', score: 3 },
      { text: 'We track some metrics in spreadsheets', score: 2 },
      { text: 'We have a general sense of what works', score: 1 },
      { text: 'We don\'t track follow-up results', score: 0 }
    ]
  },
  {
    category: 'Excite',
    question: 'Do you have systems in place to keep enrolled students/clients engaged and excited?',
    options: [
      { text: 'Yes, regular communication, milestone celebrations, and community building', score: 3 },
      { text: 'We do some events or newsletters', score: 2 },
      { text: 'Basic communication about logistics only', score: 1 },
      { text: 'Once they enroll, we don\'t have much ongoing engagement', score: 0 }
    ]
  },
  {
    category: 'Excite',
    question: 'What percentage of your new enrollments come from referrals?',
    options: [
      { text: '40% or more', score: 3 },
      { text: '20-39%', score: 2 },
      { text: '10-19%', score: 1 },
      { text: 'Less than 10% or I don\'t track this', score: 0 }
    ]
  }
];