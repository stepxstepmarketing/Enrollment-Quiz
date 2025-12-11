import React from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary p-8 text-white">
          <div className="text-sm font-semibold tracking-wider uppercase mb-2 text-secondary">Step x Step Marketing</div>
          <h1 className="text-4xl font-bold mb-4">
            Enrollment System Assessment
          </h1>
          <p className="text-slate-200 text-lg">
            Discover exactly where your enrollment system is leaking revenue
          </p>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Here's what you'll discover:</h2>
            <ul className="space-y-3">
              {['Clarify', 'Invite', 'Review', 'Convert', 'Loopback', 'Excite'].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-primary">{item}:</span>
                    <span className="text-slate-600 ml-2">
                      {item === 'Clarify' && 'How clear is your ideal student profile and messaging?'}
                      {item === 'Invite' && 'Are you generating qualified leads consistently?'}
                      {item === 'Review' && 'Do you pre-qualify and nurture prospects effectively?'}
                      {item === 'Convert' && 'What\'s your trial-to-enrollment rate?'}
                      {item === 'Loopback' && 'Are you following up with unconverted prospects?'}
                      {item === 'Excite' && 'Are you building loyalty and generating referrals?'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-secondary p-4 mb-6">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-primary">
                <p className="font-semibold mb-1">This assessment takes 3 minutes</p>
                <p>You'll receive a personalized report with your enrollment system score and specific recommendations for improvement.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-cta text-white py-4 px-6 rounded-xl font-semibold text-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center group shadow-lg"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            No credit card required • Instant results
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;