import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConceptCard = ({ concept, isExplored, onExplore, accent }) => {
  // Map accent to Tailwind color classes
  const accentColors = {
    green: 'bg-accent-green',
    blue: 'bg-accent-blue',
    yellow: 'bg-accent-yellow',
    orange: 'bg-accent-orange'
  };

  return (
    <motion.div
      onClick={onExplore}
      layout
      className="relative h-64 cursor-pointer group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all group-hover:border-slate-900 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden">
        <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 grayscale group-hover:grayscale-0">
          {concept.icon}
        </span>
        <h3 className="font-serif text-xl text-black mb-2 px-2">
          {concept.title}
        </h3>
        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em] group-hover:text-black transition-colors">
          Reveal Insight
        </p>

        {/* Insight Overlay */}
        <AnimatePresence>
          {isExplored && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className={`absolute inset-0 ${accentColors[accent] || 'bg-black'} p-6 flex flex-col items-center justify-center text-center z-10`}
            >
              <div className="absolute top-4 right-4 text-white/50 text-[8px] font-bold uppercase tracking-widest">
                VERIFIED STRATEGY
              </div>
              <p className="text-white text-sm leading-relaxed font-sans px-2">
                {concept.content}
              </p>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 px-3 py-1 bg-white/20 border border-white/20 rounded-full"
              >
                <span className="text-[9px] text-white uppercase font-bold tracking-tighter">Explored</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ConceptCard;
