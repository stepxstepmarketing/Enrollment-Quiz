import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Question } from '../types';

interface QuizStepProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onAnswer: (score: number) => void;
  onPrevious: () => void;
  onNextStep: () => void;
}

const QuizStep: React.FC<QuizStepProps> = ({ 
  currentQuestion, 
  currentIndex, 
  totalQuestions, 
  selectedAnswer,
  onAnswer,
  onPrevious,
  onNextStep
}) => {
  
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-secondary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3 shadow-inner">
            <div
              className="bg-secondary h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-primary p-6">
            <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              {currentQuestion.category} Phase
            </div>
            <h2 className="text-2xl font-bold text-white">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="p-6 space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option.score)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option.score
                    ? 'border-secondary bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-secondary hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5 ${
                    selectedAnswer === option.score
                      ? 'border-secondary bg-secondary'
                      : 'border-slate-300'
                  }`}>
                    {selectedAnswer === option.score && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-primary font-medium leading-relaxed">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-50 flex justify-between items-center border-t border-slate-100">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="flex items-center text-slate-600 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            {isLastQuestion && selectedAnswer !== undefined && (
              <button
                onClick={onNextStep}
                className="bg-cta text-white py-3 px-6 rounded-lg font-semibold hover:brightness-110 transition-all duration-200 flex items-center shadow-lg"
              >
                View My Results
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStep;