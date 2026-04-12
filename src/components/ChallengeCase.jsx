import React, { useState } from 'react';

export default function ChallengeCase({ data, onScoreUpdate, onAdvance }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    setIsRevealed(true);
    // Since all are correct, we award 100 points for the challenge completion
    onScoreUpdate(100);
  };

  const activeOption = selectedOption !== null ? data.options[selectedOption] : null;

  const StatBadge = ({ label, value, color }) => (
    <div className={`flex flex-col items-center p-2 rounded-lg bg-white border border-slate-100 shadow-sm animate-cascade`}>
      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{label}</span>
      <span className={`text-lg font-bold ${color}`}>+{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-blue-900 text-xl font-bold">
              {data.profile.initials}
            </div>
            <div>
              <h3 className="text-xl font-bold">{data.profile.name}, {data.profile.age}</h3>
              <p className="text-blue-200 text-sm uppercase tracking-widest">{data.profile.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-blue-300 uppercase font-bold">Net Inflow</p>
              <p className="text-lg font-mono font-bold text-amber-300">{data.profile.income}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-blue-300 uppercase font-bold">Savings</p>
              <p className="text-lg font-mono font-bold text-emerald-300">{data.profile.savings}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-blue-300 uppercase font-bold">Debt</p>
              <p className="text-lg font-mono font-bold text-rose-300">{data.profile.debt}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-blue-300 uppercase font-bold">Main Goal</p>
              <p className="text-sm font-bold truncate">{data.profile.goal}</p>
            </div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Scenario */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
        <h4 className="text-blue-900 font-bold text-lg border-b border-slate-100 pb-2">The Situation</h4>
        <p className="text-slate-700 leading-relaxed italic border-l-4 border-amber-400 pl-4 bg-slate-50 py-2 rounded-r-lg">
          "{data.scenario}"
        </p>
        <p className="text-slate-800 font-medium mt-2">{data.question}</p>

        {/* Options */}
        <div className="flex flex-col gap-4 mt-4">
          {data.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isDisabled = isRevealed && !isSelected;

            return (
              <div 
                key={idx}
                className={`transition-all duration-500 flex flex-col ${isDisabled ? 'opacity-40 scale-95 pointer-events-none' : ''}`}
              >
                <button
                  onClick={() => handleSelect(idx)}
                  disabled={isRevealed}
                  className={`text-left p-6 rounded-xl border-2 transition-all flex flex-col gap-3 group items-start shadow-sm
                    ${isSelected ? 'border-amber-400 bg-amber-50/50 ring-4 ring-amber-100' : 'border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'}
                  `}
                >
                  <div className="flex justify-between w-full items-start">
                    <span className="font-bold text-blue-900 group-hover:text-blue-700 transition-colors uppercase text-sm tracking-wide">
                      {opt.label}
                    </div>
                    {isSelected && (
                      <span className="bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded">CHOSEN STRATEGY</span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{opt.content}</p>

                  {/* Cascading Stats Reveal */}
                  {isSelected && isRevealed && (
                    <div className="w-full mt-6 pt-6 border-t border-amber-200 flex flex-col gap-4 animate-slide-up">
                      <div className="grid grid-cols-3 gap-3">
                        <StatBadge label="Stability" value={opt.stats.stability} color="text-blue-600" />
                        <StatBadge label="Growth" value={opt.stats.growth} color="text-amber-600" />
                        <StatBadge label="Efficiency" value={opt.stats.efficiency} color="text-emerald-600" />
                      </div>
                      <div className="bg-slate-900 p-4 rounded-lg text-white text-xs leading-loose relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-amber-400 font-bold uppercase block mb-1">Strategic Outcome:</span>
                          {opt.explanation}
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {isRevealed && (
          <div className="mt-8 flex justify-center animate-bounce">
            <button 
              onClick={onAdvance}
              className="bg-blue-900 hover:bg-blue-800 text-amber-400 px-12 py-4 rounded-full font-black shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-amber-400/50"
            >
              COMMIT TO NEXT YEARS →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
