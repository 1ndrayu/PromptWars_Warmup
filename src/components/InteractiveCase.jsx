import React, { useState, useEffect } from 'react';

export default function InteractiveCase({ data, onScoreUpdate, onAdvance }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // To shuffle options only once on mount, and track the true index of correct answer
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctShuffledIndex, setCorrectShuffledIndex] = useState(null);

  useEffect(() => {
    // We match the 'correctAnswer' string to find the index after shuffle
    const optionsWithOriginals = data.options.map(opt => ({ text: opt }));
    // simple shuffle
    const shuffled = [...optionsWithOriginals].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    
    const correctIdx = shuffled.findIndex(item => item.text === data.correctAnswer);
    setCorrectShuffledIndex(correctIdx);
  }, [data]);

  const isCorrect = selectedOption === correctShuffledIndex;

  const handleSubmit = () => {
    if (isCorrect) {
      setIsSubmitted(true);
      // Give full points if 0 attempts, half points if 1 attempt
      const score = attempts === 0 ? 100 : 50;
      onScoreUpdate(score);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 2) {
        setIsSubmitted(true);
        onScoreUpdate(0); // 0 points for failing twice
      } else {
        setSelectedOption(null); // allow retry
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-heading font-medium text-slate-800 mb-4">{data.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {data.scenario}
        </p>
            if (isSubmitted) {
              if (idx === correctShuffledIndex) {
                btnClass += "bg-amber-50 border-amber-500 text-amber-900 shadow-sm ring-2 ring-amber-200";
              } else if (isSelected && !isCorrect) {
                btnClass += "bg-red-50 border-red-300 text-red-900";
              } else {
                btnClass += "bg-white border-slate-200 text-slate-400 opacity-50";
              }
            } else {
              if (isSelected) {
                btnClass += "bg-slate-900 border-slate-900 text-white shadow-md transform scale-[1.01]";
              } else {
                btnClass += "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5";
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={btnClass}
              >
                <span className="leading-relaxed text-sm">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {attempts === 1 && !isSubmitted && (
          <div className="mt-4 p-3 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium border border-rose-200 animate-slide-up">
            Incorrect. You have 1 attempt remaining. Please try again.
          </div>
        )}

        {isSubmitted && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-slide-up">
            <div className={`p-5 rounded-lg flex flex-col gap-2 ${isCorrect || attempts < 2 ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-red-50 text-red-900 border border-red-200'}`}>
              <span className="font-semibold text-lg">{isCorrect ? 'Correct!' : 'Out of attempts. Review the concept below:'}</span>
              <p className="text-sm opacity-90 leading-relaxed mt-1">{data.feedback.reasoning}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={onAdvance}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {!isSubmitted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${selectedOption !== null ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-sm hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
