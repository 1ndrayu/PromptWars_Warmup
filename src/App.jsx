import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import TopicTab from './components/TopicTab';
import ChallengeCase from './components/ChallengeCase';
import VelocityEngine from './components/VelocityEngine';
import LeakHunter from './components/LeakHunter';
import MarketPulse from './components/MarketPulse';
import Login from './components/Login';
import { topicsData } from './data/content';

function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('savings');
  const [completed, setCompleted] = useState({ savings: false, budgeting: false, investing: false, challenges: false });
  const [sessionStats, setSessionStats] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
    });
    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: 'savings', label: 'Savings', accent: 'green' },
    { id: 'budgeting', label: 'Budgeting', accent: 'blue' },
    { id: 'investing', label: 'Investing', accent: 'yellow' },
    { id: 'challenges', label: 'Challenges', accent: 'orange' }
  ];

  // Cloud/Local Syncing
  useEffect(() => {
    if (!session) return;
    
    const fetchProfile = async () => {
      const docRef = doc(db, "profiles", session.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompleted(data.completed || { savings: false, budgeting: false, investing: false, challenges: false });
        setSessionStats(data.stats);
      }
    };
    fetchProfile();
  }, [session]);

  useEffect(() => {
    if (session) {
      const sync = async () => {
        setIsSyncing(true);
        await setDoc(doc(db, "profiles", session.uid), {
          completed,
          stats: sessionStats,
          updated_at: serverTimestamp()
        }, { merge: true });
        setTimeout(() => setIsSyncing(false), 800);
      };
      sync();
    }
    localStorage.setItem('mastering-money-session-v2', JSON.stringify({ activeTab, completed, sessionStats }));
  }, [activeTab, completed, sessionStats, session]);

  const handleComplete = (stats) => {
    setCompleted(prev => ({ ...prev, [activeTab]: true }));
    if (stats) setSessionStats(stats);
    
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const restartSession = () => {
    localStorage.removeItem('mastering-money-session-v2');
    setCompleted({ savings: false, budgeting: false, investing: false, challenges: false });
    setSessionStats(null);
    setActiveTab('savings');
  };

  const handleSignOut = () => signOut(auth);

  const personas = [
    { id: 'fortress', name: "The Fortress", icon: "🏰", color: "text-blue-500", bg: "bg-blue-50", desc: "Prioritizes security and resilience. You build walls before bridges.", diff: "Focuses on high Stability (80%+) and defensive reserves." },
    { id: 'architect', name: "The Architect", icon: "🏗️", color: "text-yellow-500", bg: "bg-yellow-50", desc: "Focused on compounding and growth. You build for the horizon.", diff: "Prioritizes high Growth (80%+) and strategic asset placement." },
    { id: 'optimizer', name: "The Optimizer", icon: "⚡", color: "text-orange-500", bg: "bg-orange-50", desc: "Maximizes cash flow and work velocity. Every dollar is a soldier.", diff: "Focused on high Efficiency (80%+) and capital turnover." },
    { id: 'equilibrium', name: "The Specialist", icon: "⚖️", color: "text-slate-500", bg: "bg-slate-50", desc: "Maintains a sophisticated balance across all dimensions.", diff: "Requires balanced stats with no single category dominating." }
  ];

  const getProfileType = (stats) => {
    if (!stats) return null;
    const { stability, growth, efficiency } = stats;
    if (stability >= growth && stability >= efficiency) return personas[0];
    if (growth >= stability && growth >= efficiency) return personas[1];
    if (efficiency >= stability && efficiency >= growth) return personas[2];
    return personas[3];
  };

  const currentTab = tabs.find(t => t.id === activeTab);
  const completedCount = Object.values(completed).filter(s => s).length;
  const isFullyComplete = completed.challenges;
  const profile = getProfileType(sessionStats);

  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Background Decorative Glows (Very subtle for light mode) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-slate-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] bg-slate-50/50 blur-[100px] rounded-full" />
      </div>
      <header className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto h-16 bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-between px-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">
              M
            </div>
            <div className="font-serif font-bold text-lg tracking-tight text-slate-900">
              Mastering<span className="text-slate-400">Money</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-8">
            {session && (
              <div className="flex items-center gap-6">
                <AnimatePresence>
                  {isSyncing && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[9px] font-bold text-blue-500 uppercase tracking-widest animate-pulse"
                    >
                      Syncing
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="hidden sm:flex flex-col items-center">
                  <div className="text-[9px] font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {Math.round((completedCount / tabs.length) * 100)}%
                  </div>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="text-[9px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors"
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-32 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          {isFullyComplete ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto flex flex-col items-center"
            >
              <div className="w-full card-premium !rounded-[2.5rem] p-16 text-center overflow-visible">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 rounded-3xl text-5xl mb-10 shadow-inner">
                  {profile?.icon || "🎯"}
                </div>
                
                <h1 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 font-sans">Certification Complete</h1>
                <h2 className="text-6xl font-serif font-medium mb-12 text-slate-900 leading-tight">
                   The <span className={profile?.color}>{profile?.name.split(' ').pop()}</span> Persona
                </h2>
                
                <div className="flex flex-wrap justify-center gap-6 mb-16 relative">
                  {personas.map((p) => (
                    <div key={p.id} className="relative group">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 cursor-help
                          ${profile?.id === p.id 
                            ? `border-slate-900 ${p.bg} shadow-lg shadow-slate-200` 
                            : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100 border-slate-100 bg-white'}`}
                      >
                        <span className="text-3xl mb-2">{p.icon}</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${profile?.id === p.id ? 'text-slate-900' : 'text-slate-400'}`}>
                          {p.name.split(' ').pop()}
                        </span>
                      </motion.div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-slate-900 text-white rounded-xl text-left opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">{p.name}</div>
                        <div className="text-[11px] font-medium leading-relaxed mb-3 text-slate-300">{p.desc}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase border-t border-white/10 pt-2 tracking-tighter">
                          Distinction: {p.diff}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-500 max-w-xl mx-auto mb-16 leading-relaxed text-xl italic font-serif">
                   "{profile?.desc}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
                  {[
                    { label: "Stability", value: sessionStats?.stability, color: "bg-blue-500" },
                    { label: "Growth", value: sessionStats?.growth, color: "bg-yellow-500" },
                    { label: "Efficiency", value: sessionStats?.efficiency, color: "bg-orange-500" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">{stat.label}</div>
                      <div className="flex items-end gap-2 mb-5">
                        <span className="text-4xl font-serif font-medium text-slate-900">{stat.value}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          className={`h-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button onClick={restartSession} className="btn-primary !px-12 !py-4 text-xs !rounded-2xl shadow-xl shadow-black/10">
                    Restart Curriculum
                  </button>
                </div>
              </div>
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
                      className={`relative px-6 py-2 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all duration-200 ${activeTab === tab.id ? 'text-black' : 'text-slate-400 hover:text-slate-600'
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
                {activeTab === 'savings' ? (
                  <VelocityEngine onComplete={handleComplete} />
                ) : activeTab === 'budgeting' ? (
                  <LeakHunter onComplete={handleComplete} />
                ) : activeTab === 'investing' ? (
                  <MarketPulse onComplete={handleComplete} />
                ) : activeTab === 'challenges' ? (
                  <ChallengeCase
                    steps={topicsData.challenges.steps}
                    onComplete={(stats) => handleComplete(stats)}
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
            <span>SAVINGS</span>
            <span className="text-slate-200">|</span>
            <span>BUDGETTING</span>
            <span className="text-slate-200">|</span>
            <span>INVESTING</span>
          </div>
          <div className="text-[10px] text-slate-300 font-bold">© 2026</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
