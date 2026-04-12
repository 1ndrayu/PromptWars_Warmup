import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConceptCard from './ConceptCard';

const ConceptMatrix = ({ data, onComplete, accent }) => {
  const [explored, setExplored] = useState([]);

  const handleExplore = (id) => {
    if (!explored.includes(id)) {
      setExplored([...explored, id]);
    }
  };

  const isAllExplored = explored.length === data.matrix.length;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.matrix.map((concept, idx) => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            accent={accent}
            isExplored={explored.includes(concept.id)}
            onExplore={() => handleExplore(concept.id)}
          />
        ))}
      </div>

      <motion.div 
        className="flex flex-col items-center justify-center space-y-6 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-4">
          <div className="h-1 w-20 bg-slate-100 rounded-full" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            {explored.length} / {data.matrix.length} Segments Unlocked
          </p>
          <div className="h-1 w-20 bg-slate-100 rounded-full" />
        </div>
        
        {isAllExplored && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={onComplete}
            className="px-10 py-3 bg-black text-white font-bold rounded-xl shadow-2xl hover:bg-slate-800 transition-all uppercase tracking-[0.2em] text-xs"
          >
            Initiate Final Assessment
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ConceptMatrix;
