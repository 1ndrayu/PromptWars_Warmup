import React, { useState } from 'react';
import InteractiveCase from './InteractiveCase';
import ChallengeCase from './ChallengeCase';

export default function TopicTab({ topic, onScoreUpdate, onAdvance }) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = topic.steps;
  const activeData = steps[currentStep];

  const handleNextInfo = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 animate-fade-in pb-12">
      {/* Header Info */}
      <div className="relative text-center mb-4 flex items-center justify-center">
        {currentStep > 0 && (
          <button 
            onClick={handleBack}
            className="absolute left-0 text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
        )}
        <div>
        <div>
          <h2 className="text-3xl font-heading font-semibold text-slate-900">{topic.title}</h2>
          <p className="text-slate-500 mt-2">{topic.description}</p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mb-8">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentStep ? 'w-16 bg-blue-600' : 
              idx < currentStep ? 'w-8 bg-blue-200' : 'w-8 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full flex justify-center">
        {activeData.type === 'info' ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full animate-slide-up">
            <h3 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-4">{activeData.title}</h3>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              {activeData.content}
            </p>
            <div className="mt-10 flex justify-end">
              <button 
                onClick={handleNextInfo}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium shadow-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        ) : activeData.type === 'case' ? (
          <InteractiveCase data={activeData} onScoreUpdate={onScoreUpdate} onAdvance={onAdvance} />
        ) : (
          <ChallengeCase data={activeData} onScoreUpdate={onScoreUpdate} onAdvance={onAdvance} />
        )}
      </div>
    </div>
  );
}
