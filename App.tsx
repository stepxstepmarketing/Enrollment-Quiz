import React, { useState, useEffect } from 'react';
import { LeadInfo, QuizResults, Recommendation } from './types';
import { QUIZ_QUESTIONS, STORAGE_KEYS, getWebhookUrl } from './constants';
import WelcomeStep from './components/WelcomeStep';
import QuizStep from './components/QuizStep';
import LeadCaptureStep from './components/LeadCaptureStep';
import ResultsStep from './components/ResultsStep';

const App: React.FC = () => {
  // Initialize state directly from localStorage to prevent flashing on refresh
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [leadInfo, setLeadInfo] = useState<LeadInfo>((() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEAD);
      return saved ? JSON.parse(saved) : {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: ''
      };
    } catch {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: ''
      };
    }
  }));

  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'leadCapture' | 'results'>(() => {
    // If user lands on /results, check if they have data
    if (window.location.pathname === '/results') {
      const hasAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      if (hasAnswers) return 'results';
    }
    return 'welcome';
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Security check: If they are on /results but have no data, bounce them back
  useEffect(() => {
    if (currentStep === 'results') {
      const hasAnswers = Object.keys(answers).length > 0;
      if (!hasAnswers) {
        window.history.replaceState(null, '', '/');
        setCurrentStep('welcome');
      }
    }
  }, [currentStep, answers]);

  const handleAnswerSelect = (score: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: score }));
    
    // Auto-advance
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentStep('leadCapture');
      }
    }, 300);
  };

  const calculateResults = (): QuizResults => {
    const categoryScores: Record<string, { score: number; max: number }> = {
      Clarify: { score: 0, max: 0 },
      Invite: { score: 0, max: 0 },
      Review: { score: 0, max: 0 },
      Convert: { score: 0, max: 0 },
      Loopback: { score: 0, max: 0 },
      Excite: { score: 0, max: 0 }
    };

    QUIZ_QUESTIONS.forEach((q, index) => {
      const category = q.category;
      categoryScores[category].score += answers[index] || 0;
      categoryScores[category].max += 3;
    });

    // Calculate percentages
    const categoryPercentages: Record<string, number> = {};
    Object.keys(categoryScores).forEach(cat => {
      categoryPercentages[cat] = Math.round((categoryScores[cat].score / categoryScores[cat].max) * 100);
    });

    // Overall score
    const totalScore = (Object.values(answers) as number[]).reduce((sum, val) => sum + val, 0);
    const maxScore = QUIZ_QUESTIONS.length * 3;
    const overallPercentage = Math.round((totalScore / maxScore) * 100);

    // Determine level
    let level: 'Foundation' | 'Developing' | 'Optimized' = 'Foundation';
    if (overallPercentage >= 70) level = 'Optimized';
    else if (overallPercentage >= 40) level = 'Developing';

    // Find weakest areas
    const sortedCategories = Object.entries(categoryPercentages)
      .sort(([, a], [, b]) => a - b);

    return {
      overallPercentage,
      level,
      categoryPercentages,
      weakestAreas: sortedCategories.slice(0, 3).map(([cat]) => cat)
    };
  };

  const handleLeadCaptureSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const results = calculateResults();

      // 1. Format Answers
      const formattedAnswersString = QUIZ_QUESTIONS.map((q, index) => {
        const score = answers[index];
        const option = q.options.find(o => o.score === score);
        return `${index + 1}. [${q.category}] ${q.question}\n   Answer: ${option ? option.text : 'Skipped'} (Score: ${score ?? 0})`;
      }).join('\n\n');

      // 2. Format Category Scores
      const scoresSummary = Object.entries(results.categoryPercentages)
        .map(([cat, score]) => `${cat}: ${score}%`)
        .join(', ');

      const payload = {
        ...leadInfo,
        overallScore: results.overallPercentage,
        level: results.level,
        categoryScores: results.categoryPercentages,
        scoresSummary: scoresSummary,
        answers: formattedAnswersString,
        submittedAt: new Date().toISOString()
      };

      // Send to GoHighLevel Webhook
      const webhookUrl = getWebhookUrl();
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          console.error('Webhook response not ok:', response.status);
        }
      }

      // Save data for persistence BEFORE changing step
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
      localStorage.setItem(STORAGE_KEYS.LEAD, JSON.stringify(leadInfo));

      // Build URL with query params for calendar prefill
      const params = new URLSearchParams();
      if (leadInfo.firstName) params.append('first_name', leadInfo.firstName);
      if (leadInfo.lastName) params.append('last_name', leadInfo.lastName);
      if (leadInfo.email) params.append('email', leadInfo.email);
      if (leadInfo.phone) {
        const cleanedPhone = leadInfo.phone.replace(/[^0-9+]/g, '');
        params.append('phone', cleanedPhone);
      }

      // Update URL to /results with query params for tracking pixels and calendar prefill
      window.history.pushState({}, '', `/results?${params.toString()}`);

      setCurrentStep('results');
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('There was an issue submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecommendations = (results: QuizResults): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const { weakestAreas, categoryPercentages } = results;

    const recMap: Record<string, Recommendation> = {
      Clarify: {
        title: 'Define Your Ideal Student Avatar & Brand Message',
        description: 'Without clarity on who you serve and what you stand for, all marketing efforts scatter. We\'ll help you document your ideal client profile and craft messaging that resonates with them specifically.',
        stat: `Your Clarify score: ${categoryPercentages.Clarify}%`
      },
      Invite: {
        title: 'Build High-Converting Landing Pages & Offers',
        description: 'Your website homepage isn\'t enough. We\'ll create dedicated landing pages with compelling offers (free trials, workshops, auditions) that turn traffic into qualified leads.',
        stat: `Your Invite score: ${categoryPercentages.Invite}%`
      },
      Review: {
        title: 'Implement Lead Pre-Qualification & Nurture Sequences',
        description: 'Stop wasting time with poor-fit prospects. We\'ll set up automated qualification and nurture systems that educate leads before they arrive, increasing show-up and conversion rates.',
        stat: `Your Review score: ${categoryPercentages.Review}%`
      },
      Convert: {
        title: 'Optimize Your Trial-to-Enrollment Process',
        description: 'The trial experience and enrollment conversation are where revenue is won or lost. We\'ll build systems to track and improve your conversion rates with proven enrollment frameworks.',
        stat: `Your Convert score: ${categoryPercentages.Convert}%`
      },
      Loopback: {
        title: 'Activate Automated Follow-Up Systems',
        description: 'When prospects say "I need to think about it," most businesses lose them forever. We\'ll create multi-touch follow-up sequences that recover 20-30% more enrollments.',
        stat: `Your Loopback score: ${categoryPercentages.Loopback}%`
      },
      Excite: {
        title: 'Build Retention & Referral Programs',
        description: 'Your best source of new students is current families. We\'ll implement retention systems and referral programs that turn happy clients into your sales team.',
        stat: `Your Excite score: ${categoryPercentages.Excite}%`
      }
    };

    weakestAreas.forEach(area => {
      recommendations.push(recMap[area]);
    });

    if (results.overallPercentage < 70) {
      recommendations.push({
        title: 'Centralize Everything in One Complete System',
        description: 'Spreadsheets, paper forms, and scattered tools are killing your growth. We\'ll build your entire enrollment system - from lead capture to payment processing - all in one place.',
        stat: 'Most local businesses waste 10+ hours/week on manual tasks'
      });
    }

    return recommendations.slice(0, 4);
  };

  // Render logic based on current step
  if (currentStep === 'welcome') {
    return <WelcomeStep onStart={() => setCurrentStep('quiz')} />;
  }

  if (currentStep === 'quiz') {
    return (
      <QuizStep 
        currentQuestion={QUIZ_QUESTIONS[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={QUIZ_QUESTIONS.length}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswer={handleAnswerSelect}
        onPrevious={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
        onNextStep={() => setCurrentStep('leadCapture')}
      />
    );
  }

  if (currentStep === 'leadCapture') {
    return (
      <LeadCaptureStep
        leadInfo={leadInfo}
        setLeadInfo={setLeadInfo}
        onSubmit={handleLeadCaptureSubmit}
        isSubmitting={isSubmitting}
        error={submitError}
      />
    );
  }

  if (currentStep === 'results') {
    const results = calculateResults();
    const recommendations = getRecommendations(results);
    
    return (
      <ResultsStep 
        results={results}
        recommendations={recommendations}
        leadInfo={leadInfo}
      />
    );
  }

  return null;
};

export default App;