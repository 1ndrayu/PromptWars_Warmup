import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VelocityEngine = ({ onComplete }) => {
  const [savingsRate, setSavingsRate] = useState(20);
  const [years, setYears] = useState(30);
  const [capital, setCapital] = useState(1000);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let current = 1000;
    const newHistory = [];
    const monthlyContribution = (5000 * (savingsRate / 100)); // Assuming 5k income
    const annualReturn = 0.07;
    
    for (let i = 0; i <= years; i++) {
      newHistory.push(current);
      current = (current + monthlyContribution * 12) * (1 + annualReturn);
    }
    setHistory(newHistory);
    setCapital(newHistory[newHistory.length - 1]);
  }, [savingsRate, years]);

  const maxVal = Math.max(...history, 1);
  const points = history.map((val, i) => {
    const x = (i / years) * 100;
    const y = 100 - (val / maxVal) * 100;
    return `${x},${y}`;
  }).join(' ');

  const getInsight = () => {
    if (savingsRate < 15) return "Survival Mode: You are barely outpacing inflation. Growth is slow because the 'engine' lacks fuel.";
    if (savingsRate < 30) return "Builder Phase: This is the golden zone. You are balancing life quality with a high-velocity future.";
    return "Accelerator: You are buying back years of your life. At this rate, compounding becomes your primary income source.";
  };

  return (
    <div className="card-premium p-10 max-w-3xl mx-auto font-sans">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-4xl font-serif font-medium tracking-tight">Velocity Engine</h2>
          <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-[0.3em] font-bold">The Math of Freedom</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-serif font-light tabular-nums text-slate-900">
            ${Math.floor(capital).toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Projected Outcome</p>
        </div>
      </div>

      <div className="mb-12">
        <div className="relative h-48 w-full bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-100">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full p-4">
            <motion.polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              points={points}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute bottom-4 right-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Curve (7% APY)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-4 items-end">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Savings Rate</label>
              <span className="text-2xl font-serif">{savingsRate}%</span>
            </div>
            <input 
              type="range" 
              min="1" max="70" 
              value={savingsRate} 
              onChange={(e) => setSavingsRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-4 items-end">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Time Horizon</label>
              <span className="text-2xl font-serif">{years} Years</span>
            </div>
            <input 
              type="range" 
              min="5" max="50" 
              value={years} 
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
          <div className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Strategic Insight</div>
          <p className="text-slate-600 font-serif leading-relaxed italic text-lg">
            "{getInsight()}"
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Live Computation
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-10 flex justify-between items-center">
        <div className="max-w-md">
           <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-1">The Lesson</h4>
           <p className="text-xs text-slate-500 leading-relaxed">
             Capital growth isn't about the amount, it's about the **rate**. A 10% increase in savings rate can often reduce your time-to-freedom by over a decade.
           </p>
        </div>
        <button 
          onClick={() => onComplete({ stability: 90, growth: savingsRate * 1.5, efficiency: 85 })}
          className="btn-primary"
        >
          Forge Strategy
        </button>
      </div>
    </div>
  );
};

export default VelocityEngine;
