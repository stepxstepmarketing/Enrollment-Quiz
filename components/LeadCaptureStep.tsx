import React from 'react';
import { ArrowRight, Lock, Loader2, AlertCircle } from 'lucide-react';
import { LeadInfo } from '../types';

interface LeadCaptureStepProps {
  leadInfo: LeadInfo;
  setLeadInfo: (info: LeadInfo) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

const LeadCaptureStep: React.FC<LeadCaptureStepProps> = ({ leadInfo, setLeadInfo, onSubmit, isSubmitting, error }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Get Your Personalized Report
          </h1>
          <p className="text-slate-200">
            Enter your details below to see your enrollment system score and recommendations.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={leadInfo.firstName}
                  onChange={(e) => setLeadInfo({ ...leadInfo, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={leadInfo.lastName}
                  onChange={(e) => setLeadInfo({ ...leadInfo, lastName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={leadInfo.email}
                onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                disabled={isSubmitting}
                value={leadInfo.phone}
                onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={leadInfo.businessName}
                onChange={(e) => setLeadInfo({ ...leadInfo, businessName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your Dance Studio, Music School, etc."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cta text-white py-4 px-6 rounded-xl font-semibold text-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Show Me My Results
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
                <Lock className="w-3 h-3" />
                <p>
                  We respect your privacy. No spam, ever.
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureStep;