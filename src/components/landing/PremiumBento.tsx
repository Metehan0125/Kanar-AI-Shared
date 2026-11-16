import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Landmark, Activity, BarChart3, ArrowRight, ArrowUpRight, TrendingUp, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { LiquidBubbles } from '../LiquidBubbles';

const AiStressTestCard = ({ isTR, onSelect }: { isTR: boolean, onSelect: () => void }) => {
  const [phase, setPhase] = useState<'idle' | 'crisis' | 'recovery'>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setPhase('crisis');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('recovery');
    }, 800); // 800ms after crisis starts, AI recovers
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('idle');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const paths = {
    idle: "M 0 150 L 40 140 L 80 145 L 120 130 L 160 135 L 200 120 L 240 125 L 280 110 L 320 115 L 360 100 L 400 105",
    crisis: "M 0 150 L 40 140 L 80 145 L 120 130 L 160 135 L 200 170 L 240 185 L 280 195 L 320 190 L 360 195 L 400 198",
    recovery: "M 0 150 L 40 140 L 80 145 L 120 130 L 160 135 L 200 170 L 240 175 L 280 100 L 320 50 L 360 30 L 400 20"
  };

  const colors = {
    idle: "#6366f1", // indigo-500
    crisis: "#ef4444", // red-500
    recovery: "#10b981", // emerald-500
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#0A0A0C] border border-slate-200/60 dark:border-slate-800/80 p-6 lg:p-8 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[300px] lg:min-h-[350px] flex flex-col justify-between"
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          backgroundColor: phase === 'idle' ? 'rgba(99, 102, 241, 0.05)' : phase === 'crisis' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
        }}
        className="absolute inset-0 transition-colors duration-700"
      />
      <motion.div
        animate={{
          backgroundColor: phase === 'idle' ? 'rgba(99, 102, 241, 0.15)' : phase === 'crisis' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)',
        }}
        className="absolute -top-32 -right-32 w-96 h-96 blur-[100px] rounded-full pointer-events-none transition-colors duration-700"
      />

      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              borderColor: phase === 'idle' ? 'rgba(148, 163, 184, 0.2)' : phase === 'crisis' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)',
            }}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center border backdrop-blur-sm transition-colors duration-500"
          >
            <Activity className="w-5 h-5 text-slate-700 dark:text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {isTR ? 'AI Stres Testi' : 'AI Stress Test'}
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
          {isTR ? 'Kriz senaryolarını simüle edin. Portföyünüzün dayanıklılığını ölçün.' : 'Simulate crisis scenarios. Measure the resilience of your portfolio.'}
        </p>
      </div>

      {/* AI Chart Graphic */}
      <div className="relative z-10 flex-1 w-full flex items-end justify-center mt-4 h-[200px]">
        <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient-idle" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-gradient-crisis" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b91c1c" stopOpacity="0" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-gradient-recovery" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#047857" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Animated line representing the health */}
          <motion.path
            animate={{ 
              d: paths[phase],
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            fill="none"
            stroke={`url(#line-gradient-${phase})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
            style={{
              filter: `drop-shadow(0px 8px 12px ${colors[phase]}60)`
            }}
          />
        </svg>

        {/* Floating Tooltips */}
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle-tooltip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="absolute top-1/4 left-1/4 px-3 py-2 bg-white/10 backdrop-blur-md rounded-xl shadow-xl flex items-center gap-3 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <div className="text-xs font-bold text-white">Monitoring...</div>
            </motion.div>
          )}

          {phase === 'crisis' && (
            <motion.div
              key="crisis-tooltip"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="absolute bottom-10 right-10 px-4 py-2 bg-red-500/20 dark:bg-red-500/20 backdrop-blur-md rounded-xl shadow-xl border border-red-500/50 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <div>
                <div className="text-[10px] text-red-700 dark:text-red-200 font-semibold uppercase">{isTR ? 'Kriz Simülasyonu' : 'Crisis Sim'}</div>
                <div className="text-sm font-bold text-red-900 dark:text-white">{isTR ? 'Faiz Şoku' : 'Rate Shock'}</div>
              </div>
            </motion.div>
          )}

          {phase === 'recovery' && (
            <motion.div
              key="recovery-tooltip"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="absolute top-10 right-4 px-4 py-3 bg-emerald-500/20 backdrop-blur-xl rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-200 font-semibold uppercase mb-0.5">{isTR ? 'Yapay Zeka Devrede' : 'AI Activated'}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-emerald-900 dark:text-white">{isTR ? 'Şok Emildi:' : 'Shock Absorbed:'}</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">+%12 Alpha</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MultiCurrencyCard = ({ isTR, onSelect }: { isTR: boolean, onSelect: () => void }) => {
  const [activeCurrency, setActiveCurrency] = useState<string | null>(null);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(prev => prev + 1);
    }, 2500); // Ticks every 2.5s for odometer effect
    return () => clearInterval(interval);
  }, []);

  // Format to simulate micro updates: e.g. 1,234.56
  const getMicroUpdate = (base: number, tickOffset: number) => {
    const val = base + ((ticker + tickOffset) % 10) * 0.01;
    return val.toFixed(2);
  };

  const getCardBgColor = () => {
    switch(activeCurrency) {
      case 'USD': return 'rgba(34, 197, 94, 0.05)';
      case 'EUR': return 'rgba(59, 130, 246, 0.05)';
      case 'GBP': return 'rgba(168, 85, 247, 0.05)';
      default: return 'transparent';
    }
  };

  const getGlowColor = () => {
    switch(activeCurrency) {
      case 'USD': return 'rgba(34, 197, 94, 0.2)';
      case 'EUR': return 'rgba(59, 130, 246, 0.2)';
      case 'GBP': return 'rgba(168, 85, 247, 0.2)';
      default: return 'transparent';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onSelect}
      onMouseLeave={() => setActiveCurrency(null)}
      className="group md:col-span-2 relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#121216] border border-slate-200/60 dark:border-slate-800/60 p-6 lg:p-8 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[300px] lg:min-h-[350px] flex flex-col md:flex-row gap-6 justify-between items-center"
    >
      <motion.div 
        animate={{ backgroundColor: getCardBgColor() }}
        className="absolute inset-0 transition-colors duration-700"
      />
      <motion.div 
        animate={{ backgroundColor: getGlowColor() }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-colors duration-700"
      />
      
      <div className="relative z-10 max-w-sm flex-shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 shadow-sm">
          <Wallet className="w-8 h-8 text-slate-900 dark:text-white" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {isTR ? 'Çoklu Para Birimi' : 'Multi Currency'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
          {isTR ? 'Farklı para birimlerindeki varlıklarınızı tek ekrandan yönetin. Canlı kurlarla anlık değerleme.' : 'Manage assets across different currencies in a single view. Real-time valuation with live FX rates.'}
        </p>
      </div>

      {/* Live Exchange Rate Glass Sphere */}
      <div className="relative z-10 w-full h-[250px] md:h-full flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] aspect-square rounded-full border border-white/40 dark:border-white/5 bg-white/20 dark:bg-slate-900/20 backdrop-blur-3xl flex items-center justify-center shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] transition-colors duration-700">
          
          {/* Center Balance */}
          <div className="text-center relative z-20">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">{isTR ? 'TOPLAM VARLIK' : 'TOTAL BALANCE'}</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
              ₺{ticker % 2 === 0 ? '2.435.62' : '2.435.64'}M
            </div>
            <div className="text-xs font-semibold text-emerald-500 mt-1 flex items-center justify-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> %4.2
            </div>
          </div>

          {/* Floating Currency Pills */}
          <motion.div 
            onMouseEnter={() => setActiveCurrency('USD')}
            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-2 sm:left-0 px-3 sm:px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-700 shadow-xl flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-[10px] sm:text-xs font-bold text-green-700 dark:text-green-400">$</div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-semibold uppercase">USD</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tabular-nums">{getMicroUpdate(32.40, 1)}</div>
            </div>
          </motion.div>

          <motion.div 
            onMouseEnter={() => setActiveCurrency('EUR')}
            animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 -right-2 sm:right-0 px-3 sm:px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-700 shadow-xl flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-400">€</div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-semibold uppercase">EUR</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tabular-nums">{getMicroUpdate(35.10, 3)}</div>
            </div>
          </motion.div>

          <motion.div 
            onMouseEnter={() => setActiveCurrency('GBP')}
            animate={{ y: [-5, 5, -5], x: [-5, 5, -5] }} 
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-2 left-6 sm:left-10 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-700 shadow-lg flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-transform"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-purple-700 dark:text-purple-400">£</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white tabular-nums">{getMicroUpdate(41.75, 5)}</div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 z-20">
        <ArrowRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
};

const BenchmarkRacingCard = ({ isTR, onSelect }: { isTR: boolean, onSelect: () => void }) => {
  const [data, setData] = useState([
    { label: 'BIST 100', value: 45, color: 'bg-blue-500' },
    { label: 'S&P 500', value: 30, color: 'bg-indigo-500' },
    { label: 'Gold', value: 65, color: 'bg-amber-500' },
    { label: 'My Portfolio', value: 85, color: 'bg-emerald-500' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        value: Math.min(100, Math.max(20, item.value + (Math.random() * 10 - 5)))
      })).sort((a, b) => b.value - a.value)); // sort for racing effect
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#121216] border border-slate-200/60 dark:border-slate-800 p-6 lg:p-8 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[250px] flex flex-col md:col-span-2"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4 group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/20 transition-colors duration-700" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 h-full">
        <div className="max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/20 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            {isTR ? 'Kıyaslama & Duyarlılık' : 'Benchmark & Sentiment'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium mb-8 md:mb-0">
            {isTR ? 'Piyasaları enflasyon, BIST 100 ve kripto ile canlı kıyaslayın.' : 'Benchmark against inflation, BIST 100, and crypto in real-time.'}
          </p>
        </div>
        
        {/* Futuristic Racing Bars Graphic */}
        <div className="flex-1 w-full flex flex-col justify-center gap-6 relative z-10 bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-2xl h-full overflow-hidden">
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
          
          {data.map((item, idx) => {
            // Map the previous tailwind colors to their lighter variants for better contrast on dark background
            const barColor = item.color.includes('blue') ? 'bg-blue-500 dark:bg-blue-400' 
                          : item.color.includes('indigo') ? 'bg-indigo-500 dark:bg-indigo-400'
                          : item.color.includes('amber') ? 'bg-amber-500 dark:bg-amber-400'
                          : 'bg-emerald-500 dark:bg-emerald-400';

            return (
              <div key={item.label} className="w-full relative group/bar z-10">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 tracking-wider">
                  <span className="text-slate-800 dark:text-white group-hover/bar:text-blue-600 dark:group-hover/bar:text-blue-400 transition-colors flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${barColor}`} />
                    {item.label}
                  </span>
                  <span className="tabular-nums font-black text-slate-900 dark:text-white">{item.value.toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200/50 dark:bg-white/5 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/50 dark:border-white/5 relative">
                  <motion.div 
                    layout
                    animate={{ width: `${item.value}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    className={`h-full rounded-full relative overflow-hidden shadow-sm dark:shadow-[0_0_15px_currentColor] ${barColor} before:content-[''] before:absolute before:inset-0 before:w-full before:bg-gradient-to-b before:from-white/40 before:to-transparent`}
                  >
                    <LiquidBubbles />
                  </motion.div>
                </div>
              </div>
            );
          })}
          {/* Subtle scanning line effect */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/40 to-transparent blur-[1px] z-20 pointer-events-none"
          />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 z-20">
        <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-300 group-hover:text-white" />
      </div>
    </motion.div>
  );
};

const AiKnowledgeGraphCard = ({ isTR, onSelect }: { isTR: boolean, onSelect: () => void }) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    { id: 0, label: 'TÜFE', x: 60, y: 40 },
    { id: 1, label: 'BIST', x: 240, y: 32 },
    { id: 2, label: 'FED', x: 150, y: 70 },
    { id: 3, label: 'GOLD', x: 80, y: 112 },
    { id: 4, label: 'TEFAS', x: 220, y: 120 }
  ];

  const connections = [
    [0, 2], [2, 1], [2, 3], [1, 4], [0, 3], [3, 4]
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#121216] border border-slate-200/60 dark:border-slate-800/80 p-6 lg:p-8 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[250px] flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="font-bold text-slate-700 dark:text-white tracking-wide uppercase text-[10px]">{isTR ? 'Korelasyon Motoru' : 'Correlation Engine'}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
          {isTR ? 'AI Nedensellik Ağı' : 'AI Causality Network'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          {isTR ? 'Makroekonomik faktörlerin fonlarınıza etkisini haritalayın.' : 'Map how macroeconomic factors impact your funds.'}
        </p>
      </div>

      <div className="relative z-10 w-full h-[150px] mt-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg 
          viewBox="0 0 300 150" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection Lines (Pixel-perfect center-to-center) */}
          {connections.map(([a, b], i) => {
            const isConnectedToActive = activeNode === a || activeNode === b;
            return (
              <line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                stroke={isConnectedToActive ? '#6366f1' : '#cbd5e1'}
                strokeWidth={isConnectedToActive ? 2 : 1.5}
                strokeDasharray={isConnectedToActive ? "4 4" : "0"}
                className="transition-all duration-300 dark:stroke-slate-700"
              />
            );
          })}

          {/* Node Circles & Label Badges */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <g 
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="cursor-crosshair group/node"
              >
                {/* Active Outer Pulsing Ring */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={11}
                    className="fill-indigo-500/20 stroke-indigo-400/60"
                    strokeWidth="1"
                  />
                )}

                {/* Main Node Circle (Centered exactly at node.x, node.y) */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 5 : 4}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'fill-indigo-500 stroke-white dark:stroke-slate-900'
                      : 'fill-white dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-500 group-hover/node:stroke-indigo-400 group-hover/node:fill-indigo-50'
                  }`}
                  strokeWidth="2"
                />

                {/* Node Label Badge (Centered below node.x, node.y) */}
                <g transform={`translate(${node.x}, ${node.y + 16})`}>
                  <rect
                    x="-20"
                    y="-8"
                    width="40"
                    height="15"
                    rx="4"
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'fill-indigo-600 dark:fill-indigo-500 stroke-indigo-400/50'
                        : 'fill-white/95 dark:fill-slate-900/95 stroke-slate-200 dark:stroke-slate-800'
                    }`}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="2.5"
                    textAnchor="middle"
                    className={`text-[9px] font-bold tracking-wider transition-colors duration-300 pointer-events-none ${
                      isActive ? 'fill-white' : 'fill-slate-700 dark:fill-slate-300'
                    }`}
                  >
                    {node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
};

export const PremiumBento: React.FC<{ isTR: boolean, onSelect: (tab: string) => void }> = ({ isTR, onSelect }) => {
  return (
    <section id="modules" className="py-20 lg:py-24 px-8 lg:px-20 bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#060608] dark:to-[#0A0A0B] relative">
      {/* Soft Apple-style transition divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/50 dark:via-slate-800/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white dark:from-[#060608] to-transparent pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-tighter text-slate-900 dark:text-white leading-tight">
            {isTR ? 'Modüller.' : 'Modules.'} <br className="hidden sm:block" />
            <span className="text-slate-500 dark:text-slate-400">{isTR ? 'Sınır tanımayan mimari.' : 'Architecture without limits.'}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Multi Currency Portfolio - Large */}
          <MultiCurrencyCard isTR={isTR} onSelect={() => onSelect('PORTFOLIO')} />

          {/* Card 2: AI Stress Test - Tall */}
          <AiStressTestCard isTR={isTR} onSelect={() => onSelect('AI_ROBUSTNESS')} />

          {/* Card 3: AI Causality Network - Square */}
          <AiKnowledgeGraphCard isTR={isTR} onSelect={() => onSelect('AI_CAUSALITY')} />

          {/* Card 4: Benchmark & Sentiment - Racing Bars */}
          <BenchmarkRacingCard isTR={isTR} onSelect={() => onSelect('BENCHMARK')} />
        </div>
      </div>
    </section>
  );
};
