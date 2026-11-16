import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, Activity, Cpu, BrainCircuit, LineChart } from 'lucide-react';
import { HeroInteractiveBackground } from './HeroInteractiveBackground';

interface PremiumHeroProps {
  isTR: boolean;
  onStart: () => void;
}

export const PremiumHero: React.FC<PremiumHeroProps> = ({ isTR, onStart }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Real-time Dashboard State
  const [pulseData, setPulseData] = useState({ tech: 2.4, health: 0.1, banks: -1.2, energy: 1.2 });

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseData(prev => ({
        tech: +(prev.tech + (Math.random() * 0.4 - 0.1)).toFixed(1),
        health: +(prev.health + (Math.random() * 0.2 - 0.1)).toFixed(1),
        banks: +(prev.banks + (Math.random() * 0.4 - 0.2)).toFixed(1),
        energy: +(prev.energy + (Math.random() * 0.4 - 0.2)).toFixed(1),
      }));
    }, 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#F6F8FC] dark:bg-[#060608] pt-20"
    >
      {/* 3D Interactive Background */}
      <HeroInteractiveBackground />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full mt-10">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl mb-10 shadow-lg shadow-indigo-500/10"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-indigo-700 dark:text-indigo-300 uppercase">
            {isTR ? 'TEFAS Analizinin Geleceği' : 'The Future of TEFAS Analysis'}
          </span>
        </motion.div>

        {/* Main Headline - Centered, Massive */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter text-center text-slate-900 dark:text-white max-w-5xl"
        >
          {isTR ? (
            <>
              Finansal{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 blur-2xl opacity-20 dark:opacity-40 rounded-full" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">Zeka</span>
              </span>
              <br />Yeniden.
            </>
          ) : (
            <>
              Financial{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 blur-2xl opacity-20 dark:opacity-40 rounded-full" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">Intelligence</span>
              </span>
              <br />Redefined.
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl lg:text-2xl text-center text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed"
        >
          {isTR 
            ? 'Yapay zeka destekli yatırım analizi ile portföyünüzü optimize edin. MPT, stres testleri ve canlı TEFAS verileri tek bir kusursuz arayüzde.' 
            : 'Optimize your portfolio with AI-powered investment analysis. MPT, stress testing, and live TEFAS data in one flawless interface.'}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-12 mb-20 z-20"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-slate-900 dark:bg-white rounded-full font-bold text-base transition-all hover:scale-[1.02] active:scale-95 shadow-2xl hover:shadow-indigo-500/25"
          >
            <span className="text-white dark:text-slate-900">
              {isTR ? 'Platformu Keşfet' : 'Explore Platform'}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-white dark:text-slate-900" />
            </div>
          </button>
        </motion.div>

        {/* Floating Glass Dashboard (The "Flawless Interface" glimpse) */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="w-full max-w-5xl rounded-t-[2.5rem] bg-white/70 dark:bg-[#0A0A0C]/70 backdrop-blur-3xl border-t border-x border-slate-200/60 dark:border-slate-800/60 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.5)] p-6 lg:p-8 flex flex-col gap-6 relative z-10 mt-auto"
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 rounded-t-[2.5rem] bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Live Model Status */}
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <BrainCircuit className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0A0A0C]"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                  Gemini AI Core
                </h3>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Canlı İşleme
                  </div>
                  <span className="text-xs text-slate-500 font-medium">12.4M Veri Noktası</span>
                </div>
              </div>
            </div>

            {/* Live Tickers */}
            <div className="flex items-center gap-8 lg:gap-12 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
              <div className="flex flex-col gap-1 min-w-fit">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tech Index</span>
                <div className="flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-emerald-500" />
                  <span className={`text-base font-bold ${pulseData.tech >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {pulseData.tech >= 0 ? '+' : ''}{pulseData.tech}%
                  </span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col gap-1 min-w-fit">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Finance</span>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-500" />
                  <span className={`text-base font-bold ${pulseData.banks >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {pulseData.banks >= 0 ? '+' : ''}{pulseData.banks}%
                  </span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col gap-1 min-w-fit">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Energy</span>
                <div className="flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-emerald-500" />
                  <span className={`text-base font-bold ${pulseData.energy >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {pulseData.energy >= 0 ? '+' : ''}{pulseData.energy}%
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade to match next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#060608] to-transparent z-20 pointer-events-none" />
    </section>
  );
};
