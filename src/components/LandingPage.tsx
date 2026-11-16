import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingNavbar } from './FloatingNavbar';
import { Footer } from './Footer';
import { HeroInteractiveBackground } from './landing/HeroInteractiveBackground';
import { PremiumMarquee } from './landing/PremiumMarquee';
import { PremiumEditorial } from './landing/PremiumEditorial';
import { PremiumBento } from './landing/PremiumBento';
import { PremiumSimulator } from './landing/PremiumSimulator';
import { PremiumHorizontal } from './landing/PremiumHorizontal';
import { PremiumCTA } from './landing/PremiumCTA';
import { LiveMockupSlide } from './LiveMockupSlide';
import { CrisisNetworkSlide } from './CrisisNetworkSlide';

import { 
  ArrowRight, ShieldCheck, 
  TrendingUp, PieChart, BrainCircuit, Sparkles
} from 'lucide-react';

interface LandingPageProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: 'TR' | 'EN';
  setLang: (lang: 'TR' | 'EN') => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onGoToDashboard: () => void;
  onSelectTab?: (tab: any) => void;
  onOpenAiAssistant?: () => void;
  onOpenAddAsset?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  darkMode,
  setDarkMode,
  lang,
  setLang,
  user,
  onOpenAuth,
  onLogout,
  onGoToDashboard,
  onSelectTab,
}) => {
  const isTR = lang === 'TR';
  const [currentSlide, setCurrentSlide] = useState(1);

  // Lock scrolling while in cinematic mode (slides 1 to 5)
  useEffect(() => {
    if (currentSlide <= 5) {
      document.body.style.overflow = 'hidden';
      // Optional: Prevent touchmove on mobile
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener('touchmove', preventDefault, { passive: false });
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventDefault);
      };
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentSlide]);

  const handleSelectTab = (tab: string) => {
    if (onSelectTab) {
      onSelectTab(tab);
    } else {
      onGoToDashboard();
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => prev + 1);

  return (
    <div className="bg-white dark:bg-[#060608] text-slate-900 dark:text-white selection:bg-indigo-500/30 min-h-screen">
      
      {/* ========================================================
          FLOATING NAVBAR (Visible only after slide 5)
      ======================================================== */}
      <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${currentSlide > 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <FloatingNavbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={setLang}
          user={user}
          onOpenAuth={onOpenAuth}
          onLogout={onLogout}
          onGoToDashboard={onGoToDashboard}
          onNavigateSection={(id) => {
            const element = document.getElementById(id);
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          activeSection="hero"
        />
      </div>

      {/* ========================================================
          CINEMATIC OVERLAY (Slides 1 to 5)
      ======================================================== */}
      <AnimatePresence mode="wait">
        {currentSlide <= 5 && (
          <motion.div 
            key="cinematic-overlay"
            className="fixed inset-0 z-50 bg-white dark:bg-[#060608] flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, y: -50, filter: 'blur(20px)', transition: { duration: 1, ease: 'easeInOut' } }}
          >
            {/* BACKGROUNDS */}
            {/* Slide 1: Interactive Data Vortex */}
            <AnimatePresence>
              {currentSlide === 1 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                  className="absolute inset-0 z-0"
                >
                  <HeroInteractiveBackground />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide 3: Force Dark Background for Risk Network */}
            <AnimatePresence>
              {currentSlide === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-0 bg-[#060608]"
                />
              )}
            </AnimatePresence>

            {/* SLIDE CONTENT MANAGER */}
            <AnimatePresence mode="wait">
              {/* SLIDE 1: HERO */}
              {currentSlide === 1 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -100, filter: 'blur(10px)' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center max-w-5xl relative z-10 px-6"
                >
                  <div className="px-4 py-1.5 rounded-full border border-indigo-500/20 bg-white/50 dark:bg-black/50 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                    {isTR ? 'Finansal Analizin Geleceği' : 'The Future of Financial Analysis'}
                  </div>
                  <h1 className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] font-black leading-[0.9] tracking-tighter mb-8 text-slate-950 dark:text-white drop-shadow-2xl">
                    {isTR ? 'Finansal Zeka' : 'Financial Intelligence'}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
                      {isTR ? 'Yeniden.' : 'Redefined.'}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed mb-12 drop-shadow-md">
                    {isTR 
                      ? 'Yapay zeka destekli yatırım analizi ile portföyünüzü optimize edin. MPT, stres testleri ve canlı TEFAS verileri kusursuz bir arayüzde.' 
                      : 'Optimize your portfolio with AI-powered investment analysis. MPT, stress testing, and live TEFAS data in one flawless interface.'}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-slate-950 dark:bg-white rounded-full font-bold text-base transition-all shadow-2xl hover:shadow-indigo-500/25"
                  >
                    <span className="text-white dark:text-slate-900">
                      {isTR ? 'Platformu Keşfet' : 'Explore Platform'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white dark:text-slate-900" />
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {/* SLIDE 2: UI MOCKUP */}
              {currentSlide === 2 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, y: 100, rotateX: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -100, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full px-6"
                >
                  <div className="flex flex-col items-center justify-center w-full max-w-[1200px] max-h-[85vh]">
                    <div className="text-center mb-4 md:mb-8 shrink-0">
                      <h2 
                        className="font-black tracking-tight drop-shadow-md bg-white/50 dark:bg-black/50 px-4 py-2 rounded-2xl backdrop-blur-sm inline-block"
                        style={{ fontSize: 'clamp(1.75rem, 3vw + 1vh, 3.5rem)' }}
                      >
                        {isTR ? 'Gerçek Zamanlı Portföy Optimizasyonu' : 'Real-Time Portfolio Optimization'}
                      </h2>
                    </div>

                    <LiveMockupSlide isTR={isTR} />

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 }}
                      onClick={nextSlide}
                      className="mt-6 md:mt-8 group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-xl transition-all shrink-0"
                    >
                      <span>{isTR ? 'Risk Analizi' : 'Risk Analysis'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-all duration-300" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 3: RISK NETWORK */}
              {currentSlide === 3 && (
                <motion.div
                  key="slide-3"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -100, scale: 0.95 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full"
                >
                  {/* HEIGHT-CONSTRAINED WRAPPER: Ensures it never overflows vertically, forcing the SVG to shrink symmetrically */}
                  <div className="flex flex-col items-center justify-center w-full max-w-[1200px] max-h-[85vh] px-4">
                    <div className="text-center mb-2 md:mb-6 relative z-20 w-full max-w-4xl mx-auto">
                      <motion.div
                         initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                         className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                      >
                         <Sparkles className="w-3.5 h-3.5" />
                         {isTR ? 'Gerçek Zamanlı Simülasyon' : 'Real-Time Simulation'}
                      </motion.div>
                      <h2 
                        className="font-extrabold tracking-tighter mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-50 to-slate-400 drop-shadow-lg leading-tight"
                        style={{ fontSize: 'clamp(2rem, 3.5vw + 1vh, 4.5rem)' }}
                      >
                        {isTR ? 'Krizleri Önceden Görün' : 'Predict the Unpredictable'}
                      </h2>
                      <p 
                        className="text-slate-400/90 font-light tracking-wide leading-relaxed max-w-3xl mx-auto"
                        style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5vh, 1.25rem)' }}
                      >
                        {isTR ? 'Makroekonomik şokların portföyünüze etkisini saniyeler içinde simüle edin. Riskleri fırsata çevirin.' : 'Simulate the impact of macroeconomic shocks on your portfolio in seconds. Turn risks into opportunities.'}
                      </p>
                    </div>

                    {/* CrisisNetworkSlide natively bounds itself to this container via viewBox and foreignObject */}
                    <div className="w-full h-full min-h-[300px] max-h-[600px] flex items-center justify-center">
                      <CrisisNetworkSlide isTR={isTR} />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 }}
                      onClick={nextSlide}
                      className="mt-2 md:mt-4 group relative inline-flex items-center justify-center gap-3 px-6 py-2.5 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-xl transition-all"
                      style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
                    >
                      <span>{isTR ? 'Yapay Zeka' : 'AI Intelligence'}</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-all duration-300" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 4: AI CORE */}
              {currentSlide === 4 && (
                <motion.div
                  key="slide-4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center relative z-10 px-6 w-full"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl w-full">
                    {/* Visual */}
                    <div className="flex-1 flex justify-center order-2 lg:order-1">
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-full" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-blue-500/30 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 md:w-32 md:h-32 bg-indigo-500/20 rounded-full blur-2xl absolute" />
                          <BrainCircuit className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 dark:text-indigo-400 relative z-10" />
                        </div>
                      </div>
                    </div>

                    {/* Text & Chat */}
                    <div className="flex-1 space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left">
                      <div>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                          <Sparkles className="w-5 h-5" />
                          <span className="uppercase tracking-widest text-xs md:text-sm">Gemini AI Core</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                          {isTR ? '7/24 Finansal Asistanınız' : 'Your 24/7 Financial Assistant'}
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400">
                          {isTR ? 'Piyasa haberlerini okur, portföyünüzle eşleştirir ve anında aksiyon alınabilir içgörüler sunar. Kararlarınızı matematikle destekleyin.' : 'Reads market news, cross-references with your portfolio, and delivers actionable insights instantly. Back your decisions with pure math.'}
                        </p>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden text-left mx-auto lg:mx-0 max-w-lg"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                        <p className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm md:text-base">
                          {isTR ? '"Portföyünüzdeki teknoloji fonları yaklaşan faiz kararına karşı oldukça hassas. Defansif varlık ağırlığını %15 artırmanızı öneririm."' : '"Your tech equity funds are highly sensitive to the upcoming rate decision. I recommend increasing defensive allocation by 15%."'}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-4">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          {isTR ? 'AI Analizi Tamamlandı' : 'AI Analysis Complete'}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                    onClick={nextSlide}
                    className="mt-10 group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-xl transition-all"
                  >
                    <span>{isTR ? 'Hazır Mısınız?' : 'Ready?'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-all duration-300" />
                  </motion.button>
                </motion.div>
              )}

              {/* SLIDE 5: CTA / TRANSITION */}
              {currentSlide === 5 && (
                <motion.div
                  key="slide-5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(20px)' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center relative z-10 px-6 w-full h-full text-center"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
                  
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-10 text-slate-950 dark:text-white relative z-10">
                    {isTR ? 'Hazır Mısınız?' : 'Ready to Start?'}
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                    <button
                      onClick={onGoToDashboard}
                      className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-slate-950 dark:bg-white rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                      <span className="text-white dark:text-slate-900">
                        {isTR ? 'Sisteme Giriş Yap' : 'Enter System'}
                      </span>
                    </button>
                    
                    <button
                      onClick={nextSlide}
                      className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      <span className="text-slate-900 dark:text-white">
                        {isTR ? 'Tüm Özellikleri Keşfet' : 'Explore All Features'}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SKIP INTRO BUTTON */}
            {currentSlide >= 1 && currentSlide <= 5 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setCurrentSlide(6)}
                className="fixed bottom-6 md:bottom-8 left-6 md:left-8 z-[100] group flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-200/10 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-slate-400/70 hover:text-slate-800 dark:hover:text-slate-300 font-medium text-xs tracking-wide transition-all duration-300 active:scale-95"
              >
                <span>{isTR ? 'Bilgilendirmeyi Geç' : 'Skip Intro'}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          STANDARD DOCUMENT FLOW (Slide 6+ - Normal Scrollable Page)
      ======================================================== */}
      {currentSlide > 5 && (
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="pt-24"> {/* Padding to account for floating navbar */}
            {/* Brands & Trust */}
            <PremiumMarquee />
            
            {/* Deep Dive Features */}
            <PremiumEditorial isTR={isTR} />
            
            {/* All Modules Bento Grid */}
            <PremiumBento isTR={isTR} onSelect={handleSelectTab} />
            
            {/* Interactive Simulator */}
            <PremiumSimulator isTR={isTR} />
            
            {/* Horizontal Fund Showcase */}
            <PremiumHorizontal isTR={isTR} onSelect={() => handleSelectTab('TEFAS_EXPLORER')} />
            
            {/* Final CTA & Footer */}
            <PremiumCTA isTR={isTR} onStart={onGoToDashboard} />
            <Footer
              isTR={isTR}
              onGoToDashboard={onGoToDashboard}
              onNavigateSection={(id) => {
                const element = document.getElementById(id);
                if (element) {
                  const y = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              onSelectTab={onSelectTab}
            />
          </div>
        </div>
      )}

    </div>
  );
};
