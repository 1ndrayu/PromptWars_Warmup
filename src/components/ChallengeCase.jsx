import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChallengeCase = ({ steps, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [direction, setDirection] = useState(1);
  const [selectedStats, setSelectedStats] = useState([]);

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
      const validStats = selectedStats.filter(s => s && typeof s.stability === 'number');
      const count = validStats.length || 1;
      
      const avgStats = validStats.reduce((acc, curr) => ({
        stability: acc.stability + curr.stability,
        growth: acc.growth + curr.growth,
        efficiency: acc.efficiency + curr.efficiency
      }), { stability: 0, growth: 0, efficiency: 0 });

      onComplete({
        stability: Math.round(avgStats.stability / count),
        growth: Math.round(avgStats.growth / count),
        efficiency: Math.round(avgStats.efficiency / count)
      });
    }
  };

  const handleConfirm = () => {
    if (selected !== null) {
      setConfirmed(true);
      setSelectedStats(prev => {
        const next = [...prev];
        next[currentIdx] = selected.stats;
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 font-sans">
      {/* Profile Header - Modern Minimalist */}
      <motion.div 
        key={`header-${currentIdx}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-10 mb-12 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center text-4xl font-serif text-white shadow-2xl shadow-slate-200 flex-shrink-0">
          {data.profile.initials}
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 w-full text-left">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Client Character</div>
            <div className="text-xl font-serif font-medium text-slate-900">{data.profile.name}, {data.profile.age}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Gross Yield</div>
            <div className="text-xl font-serif font-medium text-slate-900">{data.profile.income}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Liquid Reserves</div>
            <div className="text-xl font-serif font-medium text-slate-900">{data.profile.savings}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Core Objective</div>
            <div className="text-[9px] text-blue-600 font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg inline-block text-center whitespace-nowrap">
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
        className="space-y-16"
      >
        <div className="bg-slate-50/50 border border-slate-100 p-12 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-30">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">PROFILER_V2</span>
          </div>
          <p className="text-3xl font-serif text-slate-900 leading-tight italic max-w-4xl">
            "{data.scenario}"
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <h3 className="text-xl font-serif font-medium text-slate-900 whitespace-nowrap">{data.question}</h3>
            <div className="h-[1px] w-full bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.options.map((option, idx) => (
              <motion.div
                key={idx}
                className={`relative flex flex-col p-10 rounded-[2rem] border transition-all h-full ${
                  selected?.label === option.label 
                    ? 'border-slate-900 bg-white shadow-xl shadow-slate-100' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
                whileHover={!confirmed ? { y: -4 } : {}}
              >
                <div className="flex items-start justify-between mb-8">
                  <button
                    disabled={confirmed}
                    onClick={() => setSelected(option)}
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                      selected?.label === option.label ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200' : 'border-slate-200'
                    }`}
                  >
                    {selected?.label === option.label && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{option.label}</span>
                </div>

                <p className="text-[15px] text-slate-600 mb-10 flex-1 leading-relaxed font-medium">{option.content}</p>

                <AnimatePresence>
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-10 border-t border-slate-50 mt-auto"
                    >
                      <div className="space-y-4">
                        <StatBar label="Stability" value={option.stats.stability} color="bg-blue-500" />
                        <StatBar label="Growth" value={option.stats.growth} color="bg-yellow-500" />
                        <StatBar label="Efficiency" value={option.stats.efficiency} color="bg-orange-400" />
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-500 font-serif italic border-l-2 border-slate-100 pl-4 py-1">
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
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-100 pt-12 mt-20 gap-10">
        <div className="flex items-center gap-8">
          <button 
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="btn-outline !px-10 h-14"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIdx ? 'bg-slate-900 w-12' : (i < currentIdx ? 'bg-slate-400 w-4' : 'bg-slate-100 w-4')}`} 
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {!confirmed ? (
            <button
              disabled={!selected}
              onClick={handleConfirm}
              className={`btn-primary !px-14 h-14 ${!selected ? 'opacity-30 cursor-not-allowed shadow-none' : 'shadow-xl shadow-slate-200'}`}
            >
              Verify Strategy
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary !px-14 h-14 !bg-blue-600 hover:!bg-blue-700"
            >
              {currentIdx === steps.length - 1 ? 'Produce Diagnosis' : 'Next Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-slate-900">{value}%</span>
    </div>
    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
        className={`h-full ${color}`} 
      />
    </div>
  </div>
);

export default ChallengeCase;
