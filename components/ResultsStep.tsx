import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { QuizResults, Recommendation, LeadInfo } from '../types';
import { getBookingUrl, getFormEmbedScript } from '../constants';

interface ResultsStepProps {
  results: QuizResults;
  recommendations: Recommendation[];
  leadInfo: LeadInfo;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ results, recommendations, leadInfo }) => {
  const calendarUrl = React.useMemo(() => {
    const baseUrl = getBookingUrl();
    const params = new URLSearchParams();

    if (leadInfo.firstName) params.append('first_name', leadInfo.firstName);
    if (leadInfo.lastName) params.append('last_name', leadInfo.lastName);
    if (leadInfo.email) params.append('email', leadInfo.email);

    if (leadInfo.phone) {
      const cleanedPhone = leadInfo.phone.replace(/[^0-9+]/g, '');
      params.append('phone', cleanedPhone);
    }

    if (leadInfo.businessName) params.append('company_name', leadInfo.businessName);

    const url = `${baseUrl}?${params.toString()}`;
    console.log('Calendar URL:', url);
    console.log('Lead Info:', leadInfo);
    return url;
  }, [leadInfo]);

  useEffect(() => {
    const scriptUrl = getFormEmbedScript();
    if (!scriptUrl) return;

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Don't remove the script on unmount - it may be needed
    };
  }, []);

  const getLevelColor = (level: string) => {
    if (level === 'Optimized') return 'from-green-500 to-emerald-600';
    if (level === 'Developing') return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getLevelDescription = (level: string) => {
    if (level === 'Optimized') return 'Your enrollment system is strong! Focus on optimization and scaling.';
    if (level === 'Developing') return 'You have some systems in place, but significant opportunities for improvement exist.';
    return 'Your enrollment process needs systematic improvement to drive consistent growth.';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Your Enrollment System Score
          </h1>
          <p className="text-xl text-slate-600">
            Here's what we discovered, {leadInfo.firstName || 'Partner'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getLevelColor(results.level)} p-8 text-white text-center`}>
            <div className="text-7xl font-bold mb-4">{results.overallPercentage}%</div>
            <div className="text-2xl font-semibold mb-2">{results.level} Level</div>
            <p className="text-lg opacity-90">{getLevelDescription(results.level)}</p>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-primary mb-6">CIRCLE Method Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(Object.entries(results.categoryPercentages) as [string, number][]).map(([category, percentage]) => (
                <div key={category} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <div className="text-sm font-semibold text-slate-600 mb-2">{category}</div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary">{percentage}</span>
                    <span className="text-lg text-slate-500 ml-1">%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-primary p-6">
            <h2 className="text-3xl font-bold text-white">
              Your Custom Action Plan
            </h2>
            <p className="text-slate-300 mt-2">Based on your assessment, here are your top priorities:</p>
          </div>

          <div className="p-8 space-y-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="border-l-4 border-secondary bg-blue-50/50 p-6 rounded-r-xl">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-2">
                  <h3 className="text-xl font-bold text-primary">{index + 1}. {rec.title}</h3>
                  {rec.stat && (
                    <span className="text-sm font-semibold text-secondary bg-white px-3 py-1 rounded-full whitespace-nowrap self-start border border-blue-100 shadow-sm">
                      {rec.stat}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-primary p-6 text-center">
            <Calendar className="w-12 h-12 text-secondary mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-white mb-2">
              Book Your Complimentary 30-Minute Review and Strategy Call
            </h2>
            <p className="text-slate-300">
              Let's discuss your specific situation and create a custom plan
            </p>
          </div>

          <div className="bg-slate-50">
            <iframe
              src={calendarUrl}
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              id="qzpMOSmb5xPHXS36V16v_booking"
              title="Booking Calendar"
            />
          </div>
        </div>

        <div className="text-center mt-12 text-slate-600 pb-8">
          <p className="mb-2">© {new Date().getFullYear()} Step x Step Marketing. All rights reserved.</p>
          <p className="text-sm hover:text-secondary transition-colors cursor-pointer">
            Questions? Email us at hello@stepxstepmarketing.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;