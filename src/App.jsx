import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopicTab from './components/TopicTab';
import ChallengeCase from './components/ChallengeCase';
import { topicsData } from './data/content';

function App() {
  const [activeTab, setActiveTab] = useState('savings');
  const [completed, setCompleted] = useState({ savings: false, budgeting: false, investing: false, challenges: false });

  const tabs = [
    { id: 'savings', label: 'Savings', accent: 'green' },
    { id: 'budgeting', label: 'Budgeting', accent: 'blue' },
    { id: 'investing', label: 'Investing', accent: 'yellow' },
    { id: 'challenges', label: 'Challenges', accent: 'orange' }
  ];

  // Persistence logic
  React.useEffect(() => {
    const saved = localStorage.getItem('mastering-money-session-v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.completed) setCompleted(parsed.completed);
      } catch (e) {
        console.error("Session restoration failed", e);
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('mastering-money-session-v2', JSON.stringify({ activeTab, completed }));
  }, [activeTab, completed]);

  const handleComplete = () => {
    setCompleted(prev => ({ ...prev, [activeTab]: true }));
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const restartSession = () => {
    localStorage.removeItem('mastering-money-session-v2');
    setCompleted({ savings: false, budgeting: false, investing: false, challenges: false });
    setActiveTab('savings');
  };

  const currentTab = tabs.find(t => t.id === activeTab);
  const completedCount = Object.values(completed).filter(s => s).length;
  const isFullyComplete = completed.challenges;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Background Decorative Glows (Very subtle for light mode) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-slate-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] bg-slate-50/50 blur-[100px] rounded-full" />
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">
              M
            </div>
            <div className="font-serif font-bold text-xl tracking-tight text-black">
              Mastering<span className="text-slate-500">Money</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Session Momentum</span>
              <div className="text-xs font-bold text-black bg-slate-100 px-3 py-1 rounded-full mt-1">
                {Math.round((completedCount / tabs.length) * 100)}% Complete
              </div>
            </div>
            <button 
              onClick={restartSession}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
              title="Reset Session"
            >
              <span className="text-xs font-bold text-slate-400 group-hover:text-black uppercase tracking-tighter transition-colors">Reset</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {isFullyComplete ? (
            <motion.div 
              key="celebration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-20 bg-white border-2 border-slate-900 rounded-[2rem] shadow-2xl"
            >
              <div className="text-6xl mb-8">🎯</div>
              <h1 className="text-5xl font-serif font-bold mb-6 text-black">Strategic Mastery Certifed</h1>
              <p className="text-slate-500 max-w-md mx-auto mb-12 leading-relaxed text-lg">
                You have demonstrated technical proficiency across all financial domains. Your profile is now set for optimized capital growth.
              </p>
              <button onClick={restartSession} className="btn-primary !px-12 !py-4 text-sm">
                Restart Curriculum
              </button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Minimalist Tab Bar */}
              <div className="flex justify-center">
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-2 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all duration-200 ${
                        activeTab === tab.id ? 'text-black' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-slate-100 rounded-lg -z-0" 
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {tab.label}
                        {completed[tab.id] && <span className="text-black">●</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Injection */}
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'challenges' ? (
                  <ChallengeCase 
                    steps={topicsData.challenges.steps} 
                    onComplete={handleComplete} 
                  />
                ) : (
                  <TopicTab 
                    data={topicsData[activeTab]} 
                    accent={currentTab.accent}
                    onComplete={handleComplete} 
                  />
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-100 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-bold text-lg text-black">MasteringMoney</div>
          <div className="flex items-center gap-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <span>Infrastructure</span>
            <span className="text-slate-200">|</span>
            <span>Security</span>
            <span className="text-slate-200">|</span>
            <span>Compliance</span>
          </div>
          <div className="text-[10px] text-slate-300 font-bold">© 2024</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
