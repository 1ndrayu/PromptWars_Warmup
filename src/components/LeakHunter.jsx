import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeakHunter = ({ onComplete }) => {
  const [leaks, setLeaks] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stability, setStability] = useState(100);
  const [totalLeaked, setTotalLeaked] = useState(0);

  const transactionTypes = [
    { name: "Streaming Service", cost: 15, isLeak: true, category: "Subscription Fatigue" },
    { name: "Ghost Gym Membership", cost: 55, isLeak: true, category: "Dormant Billing" },
    { name: "Groceries", cost: 120, isLeak: false, category: "Essential" },
    { name: "Rent", cost: 1500, isLeak: false, category: "Essential" },
    { name: "Impulse Gadget", cost: 99, isLeak: true, category: "Lifestyle Creep" },
    { name: "Daily Premium Coffee", cost: 7, isLeak: true, category: "Micro-Leak" },
    { name: "Cloud Storage", cost: 2, isLeak: false, category: "Utility" },
    { name: "Internet Bill", cost: 60, isLeak: false, category: "Utility" },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const spawnTimer = setInterval(() => {
        const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const newLeak = {
          id: Date.now(),
          ...type,
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        };
        setLeaks(prev => [...prev, newLeak]);

        if (newLeak.isLeak) {
          setTimeout(() => {
            setLeaks(current => {
              if (current.find(l => l.id === newLeak.id)) {
                setStability(s => Math.max(0, s - 5));
                setTotalLeaked(prev => prev + newLeak.cost);
              }
              return current.filter(l => l.id !== newLeak.id);
            });
          }, 2500);
        } else {
          setTimeout(() => {
            setLeaks(current => current.filter(l => l.id !== newLeak.id));
          }, 2000);
        }
      }, 1000);

      const clockTimer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);

      return () => {
        clearInterval(spawnTimer);
        clearInterval(clockTimer);
      };
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const zapLeak = (id, isLeak) => {
    if (isLeak) {
      setScore(s => s + 1);
      setLeaks(prev => prev.filter(l => l.id !== id));
    } else {
      setStability(s => Math.max(0, s - 12));
      setLeaks(prev => prev.filter(l => l.id !== id));
    }
  };

  const tenYearCost = totalLeaked * 12 * 10 * 1.07 ** 10; // Inflation/Compound approx

  return (
    <div className="card-premium p-10 max-w-3xl mx-auto font-sans relative overflow-hidden min-h-[550px]">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-4xl font-serif font-medium tracking-tight">Leak Hunter</h2>
          <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-[0.3em] font-bold">The Resource Shield</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-serif tabular-nums font-light">{timeLeft}s</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Timer</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Efficiency</div>
          <div className="text-xl font-serif">{score} Zaps</div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Stability</div>
          <div className="text-xl font-serif text-blue-600">{stability}%</div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <div className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Mthly Leak</div>
          <div className="text-xl font-serif text-red-500">${totalLeaked}</div>
        </div>
      </div>

      <div className="relative w-full h-80 bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden cursor-crosshair">
        <AnimatePresence>
          {leaks.map(leak => (
            <motion.button
              key={leak.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, scale: 2 }}
              onClick={() => zapLeak(leak.id, leak.isLeak)}
              style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
              className={`absolute px-5 py-2.5 rounded-full font-semibold text-[9px] uppercase tracking-wider shadow-sm transition-all active:scale-95 transform -translate-x-1/2 -translate-y-1/2
                ${leak.isLeak ? "bg-white text-red-500 border border-red-100 shadow-red-100" : "bg-white text-slate-400 border border-slate-200"}`}
            >
              {leak.name}
              <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${leak.isLeak ? "bg-red-400" : "bg-slate-200"}`} />
            </motion.button>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isGameOver && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-10 z-20"
            >
              <h3 className="text-4xl font-serif font-medium mb-4">Shield Report</h3>
              <p className="text-slate-500 font-serif italic mb-8 max-w-sm">
                The leaks you missed would cost you approximately <span className="text-red-600 font-bold">${Math.floor(tenYearCost).toLocaleString()}</span> over the next 10 years if invested at 7%.
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8 w-full">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">The Lesson</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Wealth isn't just about earning more; it's about **retaining** more. Micro-leaks are the silent killers of compounding.
                </p>
              </div>
              <button 
                onClick={() => onComplete({ stability, growth: 70, efficiency: score * 5 })}
                className="btn-primary"
              >
                Seal Resource Shield
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-[10px] font-bold uppercase text-slate-400 tracking-widest">
         Identify 'Red' leaks to protect your future capital pool.
      </div>
    </div>
  );
};

export default LeakHunter;
