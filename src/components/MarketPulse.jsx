import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketPulse = ({ onComplete }) => {
  const [price, setPrice] = useState(100);
  const [history, setHistory] = useState(Array(40).fill(100));
  const [position, setPosition] = useState(0); 
  const [balance, setBalance] = useState(1000);
  const [shares, setShares] = useState(0);
  const [news, setNews] = useState({ text: "Market Stable", impact: 0, why: "Baseline volatility." });
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const marketTimer = setInterval(() => {
        setPrice(prev => {
          const volatility = 2;
          const trend = news.impact + (Math.random() - 0.5) * volatility;
          const next = Math.max(10, prev + trend);
          setHistory(h => [...h.slice(1), next]);
          return next;
        });
      }, 200);

      const newsTimer = setInterval(() => {
        const events = [
          { text: "Rate Hikes Imminent", impact: -3, why: "Higher rates increase borrowing costs, slowing growth." },
          { text: "Tech Earnings Surge", impact: 4, why: "Innovation drives investor optimism." },
          { text: "Supply Chain Normalizing", impact: 2, why: "Lower costs lead to higher corporate margins." },
          { text: "Geopolitical Tensions", impact: -4, why: "Uncertainty causes investors to flee to safety (Cash/Gold)." },
          { text: "Energy Breakthrough", impact: 5, why: "Lower energy costs act as a massive economic stimulant." },
          { text: "Retail Slump", impact: -2, why: "Low consumer spending signals an economic slowdown." }
        ];
        setNews(events[Math.floor(Math.random() * events.length)]);
      }, 5000);

      const clockTimer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);

      return () => {
        clearInterval(marketTimer);
        clearInterval(newsTimer);
        clearInterval(clockTimer);
      };
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver, news]);

  const handleTrade = () => {
    if (position === 0) {
      const newShares = balance / price;
      setShares(newShares);
      setBalance(0);
      setPosition(1);
    } else {
      const newBalance = shares * price;
      setBalance(newBalance);
      setShares(0);
      setPosition(0);
    }
  };

  const graphWidth = 400;
  const graphHeight = 150;
  const minP = Math.min(...history) * 0.95;
  const maxP = Math.max(...history) * 1.05;
  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * graphWidth;
    const y = graphHeight - ((val - minP) / (maxP - minP)) * graphHeight;
    return `${x},${y}`;
  }).join(' ');

  const totalValue = balance + (shares * price);

  return (
    <div className="card-premium p-10 max-w-3xl mx-auto font-sans relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-4xl font-serif font-medium tracking-tight">Market Pulse</h2>
          <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-[0.3em] font-bold">Growth Catalyst</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-serif font-light tabular-nums">
            ${Math.floor(totalValue).toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Portfolio Value</p>
        </div>
      </div>

      <div className="mb-8 p-6 bg-slate-900 rounded-2xl text-white flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10 w-2/3">
           <div className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-1">Live News Matrix</div>
           <div className="font-serif text-lg italic text-slate-100">{news.text}</div>
           <p className="text-[10px] text-slate-400 mt-2 font-medium leading-relaxed">{news.why}</p>
        </div>
        <div className="text-right relative z-10">
          <div className="text-3xl font-serif tabular-nums font-medium">${price.toFixed(2)}</div>
          <div className={`text-[10px] font-bold ${news.impact >= 0 ? "text-green-400" : "text-red-400"}`}>
            {news.impact >= 0 ? "↑" : "↓"} Vector {news.impact}
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]" />
      </div>

      <div className="relative w-full h-40 bg-white border border-slate-100 rounded-2xl overflow-hidden mb-10 shadow-inner">
        <svg width="100%" height="100%" viewBox={`0 0 ${graphWidth} ${graphHeight}`} preserveAspectRatio="none">
          <motion.polyline
            fill="none"
            stroke={position === 1 ? "#3b82f6" : "#e2e8f0"}
            strokeWidth="2.5"
            points={points}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Cash Position</div>
          <div className="text-2xl font-serif">${Math.floor(balance).toLocaleString()}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Asset Exposure</div>
          <div className="text-2xl font-serif">{shares.toFixed(2)} Units</div>
        </div>
      </div>

      <button 
        onClick={handleTrade}
        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] shadow-md
          ${position === 0 ? 'bg-slate-900 text-white hover:bg-black' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
      >
        {position === 0 ? 'Enter Market (Deploy Capital) 📈' : 'Exit Market (Harvest Gains) 💰'}
      </button>

      <AnimatePresence>
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/98 backdrop-blur-lg flex flex-col items-center justify-center text-center p-12 z-20"
          >
            <h3 className="text-4xl font-serif font-medium mb-6 text-slate-900 font-bold uppercase italic tracking-tighter">Harvest Complete</h3>
            <div className="text-6xl font-serif font-light mb-8">${Math.floor(totalValue).toLocaleString()}</div>
            
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 mb-10 w-full max-w-md">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">The Synthesis</h4>
              <p className="text-base text-slate-700 leading-relaxed font-serif italic">
                "Volatility is not risk; it is the price of admission. True risk is being out of the market during its best days."
              </p>
            </div>

            <button 
              onClick={() => onComplete({ stability: 70, growth: (totalValue / 1000) * 80, efficiency: 90 })}
              className="btn-primary"
            >
              Exfiltrate Strategy
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
         <span>Time: {timeLeft}s</span>
         <span className="italic">Notice: News events lag reality. Position early.</span>
      </div>
    </div>
  );
};

export default MarketPulse;
