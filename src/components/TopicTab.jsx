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
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-8 px-2 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-serif text-black font-bold tracking-tight mb-3">
            {data.title}
          </h2>
          <p className="text-slate-500 font-sans text-sm leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-black tracking-[0.2em] text-black mb-2">Phase Vector</div>
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${view === 'matrix' ? 'bg-black' : 'bg-slate-300'}`} />
            <span className="text-[10px] text-slate-900 font-bold uppercase tracking-wider font-mono">
              {view === 'matrix' ? 'Concept Retrieval' : 'Strategic Proof'}
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
