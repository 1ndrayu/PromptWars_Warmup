import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveCase = ({ data, onComplete, accent }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 2;

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    setAttempts(prev => prev + 1);
  };

  const isCorrect = selected === data.correctAnswer;
  const canRetry = attempts < maxAttempts && !isCorrect;

  const accentClasses = {
    green: 'border-accent-green bg-accent-green/5 text-accent-green',
    blue: 'border-accent-blue bg-accent-blue/5 text-accent-blue',
    yellow: 'border-accent-yellow bg-accent-yellow/5 text-accent-yellow',
    orange: 'border-accent-orange bg-accent-orange/5 text-accent-orange',
  };

  const handleAction = () => {
    if (isCorrect || attempts >= maxAttempts) {
      onComplete(isCorrect);
    } else {
      setSubmitted(false);
      setSelected(null);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
      {/* Visual Accent Bar */}
      <div className={`absolute top-0 left-0 w-full h-2 bg-accent-${accent || 'blue'}`} />
      
      <div className="space-y-10">
        <header>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-slate-100 text-slate-900 text-[9px] font-black px-2.5 py-1 rounded border border-slate-200 uppercase tracking-widest">Case Logic</span>
            <h3 className="text-3xl font-serif text-black font-bold tracking-tight">{data.title}</h3>
          </div>
          <div className="bg-slate-50 border-l-4 border-black p-6 rounded-r-2xl">
            <p className="text-slate-600 font-sans italic leading-relaxed">
              "{data.scenario}"
            </p>
          </div>
        </header>

        <div className="space-y-6">
          <p className="text-black font-serif font-bold text-xl">
            {data.question}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.options.map((option, idx) => (
              <motion.button
                key={idx}
                disabled={submitted}
                onClick={() => setSelected(option)}
                className={`flex p-5 rounded-2xl text-left transition-all border-2 relative group ${
                  selected === option 
                    ? submitted
                      ? option === data.correctAnswer 
                        ? 'border-accent-green bg-accent-green/5' 
                        : 'border-accent-orange bg-accent-orange/5'
                      : 'border-black bg-slate-50'
                    : submitted && option === data.correctAnswer && attempts >= maxAttempts
                      ? 'border-accent-green/30 bg-accent-green/5'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
                whileHover={!submitted ? { scale: 1.01 } : {}}
              >
                <div className={`w-6 h-6 rounded-lg border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors ${
                  selected === option ? 'border-black bg-black text-white' : 'border-slate-200 group-hover:border-slate-400'
                }`}>
                  {selected === option && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-sm font-bold ${selected === option ? 'text-black' : 'text-slate-500'}`}>
                  {option}
                </span>

                {submitted && option === data.correctAnswer && (
                  <div className="absolute top-2 right-2 text-[8px] font-black text-accent-green uppercase tracking-tighter">Target Path</div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-3xl border-2 space-y-4 ${isCorrect ? 'border-accent-green/20 bg-accent-green/5' : 'border-accent-orange/20 bg-accent-orange/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-accent-green' : 'bg-accent-orange'} animate-pulse`} />
                <span className={`font-black uppercase tracking-[0.2em] text-[10px] ${isCorrect ? 'text-accent-green' : 'text-accent-orange'}`}>
                  {isCorrect ? 'Strategic Alignment Verified' : `Inconsistent Hypothesis (${attempts}/${maxAttempts})`}
                </span>
              </div>
              <h4 className="font-serif font-bold text-lg text-black">Strategic Rationale</h4>
              <p className="text-slate-700 text-sm leading-relaxed max-w-2xl font-medium">
                {isCorrect ? data.feedback.reasoning : (attempts >= maxAttempts ? data.feedback.reasoning : "The proposed allocation lacks the necessary defensive benchmarks for this risk profile.")}
              </p>
              
              <div className="flex justify-end pt-6 border-t border-slate-900/10 mt-6">
                <button
                  onClick={handleAction}
                  className={isCorrect || attempts >= maxAttempts ? "btn-primary" : "btn-outline !text-black !border-black"}
                >
                  {isCorrect ? 'Conclude Module' : (attempts >= maxAttempts ? 'Execute with Rationale' : 'Recalibrate Hypothesis')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="flex justify-end pt-8">
              <button
                disabled={!selected}
                onClick={handleSubmit}
                className={`btn-primary !px-12 !py-4 text-xs ${!selected ? 'opacity-30 grayscale cursor-not-allowed shadow-none' : 'shadow-2xl shadow-black/10'}`}
              >
                Commit Decision Matrix
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveCase;
