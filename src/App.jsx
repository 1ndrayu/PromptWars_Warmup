import React, { useState } from 'react';
import TopicTab from './components/TopicTab';
import { topicsData } from './data/content';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('savings');
  const [scores, setScores] = useState({ savings: null, budgeting: null, investing: null, challenges: null });
  const [completed, setCompleted] = useState({ savings: false, budgeting: false, investing: false, challenges: false });

  const tabs = [
    { id: 'savings', label: 'Casterly Vaults' },
    { id: 'budgeting', label: "The Hand's Ledger" },
    { id: 'investing', label: 'Iron Bank Strategy' },
    { id: 'challenges', label: 'The Great Game' }
  ];

  // Load session from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('finlit-session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.scores) setScores(parsed.scores);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.completed) setCompleted(parsed.completed);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
  }, []);

  // Save session to localStorage when relevant state changes
  React.useEffect(() => {
    localStorage.setItem('finlit-session', JSON.stringify({ scores, activeTab, completed }));
  }, [scores, activeTab, completed]);

  const handleScoreUpdate = (score) => {
    setScores(prev => ({ ...prev, [activeTab]: score }));
  };

  const handleAdvance = () => {
    setCompleted(prev => ({ ...prev, [activeTab]: true }));
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + (curr || 0), 0);
  const completedCount = Object.values(completed).filter(s => s).length;

  const restartSession = () => {
    setScores({ savings: null, budgeting: null, investing: null, challenges: null });
    setCompleted({ savings: false, budgeting: false, investing: false, challenges: false });
    setActiveTab('savings');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-heading font-bold text-2xl tracking-tight text-slate-900 leading-none">
              Lan<span className="text-blue-600">nister</span>.
            </div>
            <span className="text-[10px] text-amber-600 font-bold uppercase tracking-[0.2em] mt-1 ml-0.5">Always Pays His Debts</span>
          </div>
          <div className="flex gap-4">
            <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Standing: {completedCount}/{tabs.length}
            </div>
            <div className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
              Wealth & Honor: {totalScore}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col">
        {completedCount === tabs.length ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-slide-up text-center max-w-lg mx-auto">
            <div className="bg-amber-100 text-amber-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl shadow-sm border border-amber-200">
              ✓
            </div>
            <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Course Completed</h1>
            <p className="text-lg text-slate-600 mb-8">
              You have successfully completed all modules. Your final financial literacy score is:
            </p>
            <div className="text-5xl font-bold text-blue-600 bg-blue-50 px-8 py-6 rounded-2xl border border-blue-100 shadow-sm">
              {totalScore} <span className="text-xl text-blue-400">/ 800</span>
            </div>
            <button 
              onClick={restartSession}
              className="mt-12 text-slate-500 hover:text-slate-800 font-medium underline underline-offset-4"
            >
              Start Over
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-12 p-1 bg-slate-200/50 rounded-xl mx-auto w-fit">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-700 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {tab.label}
                  {completed[tab.id] && (
                    <span className="ml-2 inline-flex items-center justify-center bg-amber-100 text-amber-700 w-4 h-4 rounded-full text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* active tab content */}
            <TopicTab 
              key={activeTab} // Use key to force unmount/remount on tab switch
              topic={topicsData[activeTab]} 
              onScoreUpdate={handleScoreUpdate}
              onAdvance={handleAdvance}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
