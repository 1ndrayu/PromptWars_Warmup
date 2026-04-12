import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChallengeCase = ({ steps, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [direction, setDirection] = useState(1);

  const data = steps[currentIdx];

  useEffect(() => {
    setSelected(null);
    setConfirmed(false);
  }, [currentIdx]);

  const handleNext = () => {
    if (currentIdx < steps.length - 1) {
      setDirection(1);
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Profile Header - Clean B&W */}
      <motion.div 
        key={`header-${currentIdx}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-8 rounded-[2rem] border-2 border-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
      >
        <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center text-4xl font-serif text-white shadow-xl flex-shrink-0">
          {data.profile.initials}
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Character</div>
            <div className="text-xl font-serif font-bold text-black">{data.profile.name}, {data.profile.age}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Gross Yield</div>
            <div className="text-xl font-serif font-bold text-black">{data.profile.income}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Liquid Reserves</div>
            <div className="text-xl font-serif font-bold text-black">{data.profile.savings}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Critical Objective</div>
            <div className="text-[10px] text-accent-orange font-black uppercase tracking-widest bg-accent-orange/10 px-3 py-1 rounded inline-block">
              {data.profile.goal}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scenario Body */}
      <motion.div 
        key={`body-${currentIdx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        <div className="bg-slate-50 border-2 border-slate-900 p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Module_04 / Profile_0{currentIdx + 1}</span>
          </div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-black font-black mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-black" /> Contextual Scenario
          </h4>
          <p className="text-2xl font-serif text-black leading-snug italic max-w-4xl">"{data.scenario}"</p>
        </div>

        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <h3 className="text-xl font-serif font-bold text-black whitespace-nowrap">{data.question}</h3>
              <div className="h-[2px] w-full bg-slate-100" />
           </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.options.map((option, idx) => (
              <motion.div
                key={idx}
                className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all h-full ${
                  selected?.label === option.label 
                    ? 'border-black bg-white shadow-2xl shadow-black/5' 
                    : 'border-slate-100 bg-white'
                }`}
                whileHover={!confirmed ? { scale: 1.02 } : {}}
              >
                <div className="flex items-start justify-between mb-6">
                  <button
                    disabled={confirmed}
                    onClick={() => setSelected(option)}
                    className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                      selected?.label === option.label ? 'border-black bg-black text-white shadow-lg' : 'border-slate-200 hover:border-black'
                    }`}
                  >
                    {selected?.label === option.label && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{option.label}</span>
                </div>

                <p className="text-sm text-slate-600 mb-8 flex-1 leading-relaxed font-medium">{option.content}</p>

                <AnimatePresence>
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 pt-6 border-t-2 border-slate-50 mt-auto"
                    >
                      <div className="space-y-3">
                        <StatBar label="Stability" value={option.stats.stability} color="bg-accent-green" />
                        <StatBar label="Growth" value={option.stats.growth} color="bg-accent-blue" />
                        <StatBar label="Efficiency" value={option.stats.efficiency} color="bg-accent-orange" />
                      </div>
                      <p className="text-[10px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight italic">
                        {option.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t-2 border-slate-100 pt-10 mt-16 gap-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="btn-outline group h-12 flex items-center px-8"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`w-10 h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-black w-14' : (i < currentIdx ? 'bg-slate-400' : 'bg-slate-100')}`} 
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {!confirmed ? (
            <button
              disabled={!selected}
              onClick={() => setConfirmed(true)}
              className={`btn-primary flex-1 md:flex-none h-12 px-12 text-xs !rounded-xl ${!selected ? 'opacity-20 grayscale cursor-not-allowed shadow-none' : 'shadow-xl shadow-black/10'}`}
            >
              Verify Strategy
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-gold h-12 px-12 text-xs !bg-black !rounded-xl flex-1 md:flex-none"
            >
              {currentIdx === steps.length - 1 ? 'Conclude Certification' : 'Execute Next Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBar = ({ label, value, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
      <span>{label}</span>
      <span className="text-black">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        className={`h-full ${color}`} 
      />
    </div>
  </div>
);

export default ChallengeCase;
