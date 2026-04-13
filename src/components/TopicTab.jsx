import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptMatrix from './ConceptMatrix';
import InteractiveCase from './InteractiveCase';

const TopicTab = ({ data, onComplete, accent }) => {
  const [view, setView] = useState('matrix');

  const handleAssessmentComplete = (isCorrect) => {
    if (isCorrect) onComplete();
  };

  return (
    <div className="relative min-h-[70vh] flex flex-col">
      {/* Background Glory (Subtle) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-slate-50 blur-[100px] rounded-full -z-10 pointer-events-none" />
      
      {/* Tab Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-10 px-2 gap-8">
        <div className="max-w-xl">
          <h2 className="text-5xl font-serif text-slate-900 font-medium tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-slate-500 font-sans text-base leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 mb-4">Phase Vector</div>
          <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-xl border border-slate-100 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${view === 'matrix' ? 'bg-slate-900' : 'bg-slate-200'}`} />
            <span className="text-[10px] text-slate-900 font-bold uppercase tracking-widest">
              {view === 'matrix' ? 'The Framework' : 'The Execution'}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: view === 'matrix' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: view === 'matrix' ? 10 : -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {view === 'matrix' ? (
            <ConceptMatrix
              data={data}
              accent={accent}
              onComplete={() => setView('assessment')}
            />
          ) : (
            <div className="space-y-8">
              <button 
                onClick={() => setView('matrix')}
                className="btn-outline group"
              >
                ← Back to Matrix
              </button>
              
              <InteractiveCase 
                data={data.assessment} 
                accent={accent}
                onComplete={handleAssessmentComplete} 
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TopicTab;
