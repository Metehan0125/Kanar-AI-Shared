import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Activity, ChevronRight, Cpu, ShieldCheck, Scale, Zap, Database, Server, BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';
import { GlassDNADataStructure } from './GlassDNADataStructure';
import { LiquidBubbles } from '../LiquidBubbles';

// ===========================================================================
// 1. MOTION ICON: 3D Stacked Database (Canlı TEFAS Verisi)
// ===========================================================================
const TEFASDatabaseMotionIcon: React.FC<{ isHovered: boolean; isActive: boolean }> = ({ isHovered, isActive }) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
      <motion.svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-8 h-8 relative z-10"
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Layer 1: Top Cylinder */}
        <motion.g
          animate={{
            y: isHovered ? -2.5 : [0, -1, 0],
          }}
          transition={
            isHovered
              ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <ellipse cx="16" cy="7.5" rx="10" ry="3.5" className="fill-blue-500/10 stroke-blue-600 dark:stroke-blue-400" strokeWidth="1.6" />
          <path d="M6 7.5v3.2c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5V7.5" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="1.6" />
          {/* Subtle Data Pulse */}
          <motion.circle
            cx="16" cy="7.5" r="1.1"
            className="fill-blue-500 dark:fill-blue-300"
            animate={{ cx: [8, 24, 8] }}
            transition={{ duration: isHovered ? 1.2 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Layer 2: Middle Cylinder */}
        <motion.g
          animate={{
            y: isHovered ? -1 : [0, -0.5, 0],
          }}
          transition={
            isHovered
              ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              : { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }
          }
        >
          <path d="M6 14.5v3.2c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-3.2" className="stroke-blue-500/80 dark:stroke-blue-400/80" strokeWidth="1.6" />
          <motion.circle
            cx="16" cy="17.8" r="1"
            className="fill-sky-400"
            animate={{ cx: [22, 10, 22] }}
            transition={{ duration: isHovered ? 1.0 : 3.0, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Layer 3: Bottom Cylinder */}
        <motion.g>
          <path d="M6 21.5v3.2c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-3.2" className="stroke-blue-600 dark:stroke-blue-500" strokeWidth="1.6" />
          <motion.circle
            cx="16" cy="24.8" r="1"
            className="fill-indigo-400"
            animate={{ cx: [10, 22, 10] }}
            transition={{ duration: isHovered ? 1.4 : 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

// ===========================================================================
// 2. MOTION ICON: Neural Network Chip / AI Core (Gemini AI Motoru)
// Premium multi-layered continuous micro-animation on hover
// ===========================================================================
const GeminiNeuralCoreIcon: React.FC<{ isHovered: boolean; isActive: boolean }> = ({ isHovered, isActive }) => {
  const isAnimating = isHovered || isActive;

  return (
    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
      {/* Soft Purple Glow Aura */}
      <motion.div
        animate={{
          opacity: isAnimating ? [0.2, 0.45, 0.2] : 0.08,
          scale: isAnimating ? [1.1, 1.25, 1.1] : 1,
        }}
        transition={
          isAnimating
            ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4 }
        }
        className="absolute inset-0 rounded-xl bg-purple-500/30 blur-md pointer-events-none"
      />

      {/* Main Floating & Breathing Wrapper */}
      <motion.div
        animate={
          isAnimating
            ? { y: [0, -3, 0], scale: [1, 1.06, 1] }
            : { y: 0, scale: 1 }
        }
        transition={
          isAnimating
            ? {
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
              }
            : { duration: 0.35, ease: 'easeOut' }
        }
        className="relative z-10 w-8 h-8 flex items-center justify-center will-change-transform"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-8 h-8 relative z-10 overflow-visible"
        >
          {/* Rotating Outer Synaptic Pins & Circuit Traces Layer */}
          <motion.g
            animate={isAnimating ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={
              isAnimating
                ? { duration: 7, repeat: Infinity, ease: 'linear' }
                : { duration: 0.5, ease: 'easeOut' }
            }
            style={{ originX: '16px', originY: '16px' }}
            strokeWidth="1.4"
            className="stroke-purple-500/60 dark:stroke-purple-400/60"
            strokeLinecap="round"
          >
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="16" y1="25" x2="16" y2="29" />
            <line x1="3" y1="16" x2="7" y2="16" />
            <line x1="25" y1="16" x2="29" y2="16" />
            <line x1="6.8" y1="6.8" x2="9.8" y2="9.8" />
            <line x1="22.2" y1="22.2" x2="25.2" y2="25.2" />
            <line x1="25.2" y1="6.8" x2="22.2" y2="9.8" />
            <line x1="9.8" y1="22.2" x2="6.8" y2="25.2" />
          </motion.g>

          {/* Sequential Glowing Edge Nodes */}
          <g>
            <motion.circle
              cx="16" cy="3" r="1.5"
              className="fill-purple-600 dark:fill-purple-300"
              animate={isAnimating ? { opacity: [0.3, 1, 0.3], scale: [1, 1.25, 1] } : { opacity: 0.7, scale: 1 }}
              transition={isAnimating ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
              style={{ originX: '16px', originY: '3px' }}
            />
            <motion.circle
              cx="29" cy="16" r="1.5"
              className="fill-indigo-500 dark:fill-indigo-300"
              animate={isAnimating ? { opacity: [0.3, 1, 0.3], scale: [1, 1.25, 1] } : { opacity: 0.7, scale: 1 }}
              transition={isAnimating ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } : { duration: 0.3 }}
              style={{ originX: '29px', originY: '16px' }}
            />
            <motion.circle
              cx="16" cy="29" r="1.5"
              className="fill-purple-600 dark:fill-purple-300"
              animate={isAnimating ? { opacity: [0.3, 1, 0.3], scale: [1, 1.25, 1] } : { opacity: 0.7, scale: 1 }}
              transition={isAnimating ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } : { duration: 0.3 }}
              style={{ originX: '16px', originY: '29px' }}
            />
            <motion.circle
              cx="3" cy="16" r="1.5"
              className="fill-indigo-500 dark:fill-indigo-300"
              animate={isAnimating ? { opacity: [0.3, 1, 0.3], scale: [1, 1.25, 1] } : { opacity: 0.7, scale: 1 }}
              transition={isAnimating ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } : { duration: 0.3 }}
              style={{ originX: '3px', originY: '16px' }}
            />
          </g>

          {/* Central Neural Processor Chip Core */}
          <motion.rect
            x="9" y="9" width="14" height="14" rx="3.5"
            className="fill-purple-500/15 stroke-purple-600 dark:stroke-purple-400"
            strokeWidth="1.8"
            animate={
              isAnimating
                ? { scale: [1, 1.05, 1] }
                : { scale: 1 }
            }
            transition={
              isAnimating
                ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            style={{ originX: '16px', originY: '16px' }}
          />

          {/* Inner Micro Neural Matrix with Data Pulse Effect */}
          <g>
            <motion.circle
              cx="13" cy="13" r="1.2"
              className="fill-purple-600 dark:fill-purple-300"
              animate={isAnimating ? { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.9 }}
              transition={isAnimating ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
              style={{ originX: '13px', originY: '13px' }}
            />
            <motion.circle
              cx="19" cy="13" r="1.2"
              className="fill-indigo-500 dark:fill-indigo-300"
              animate={isAnimating ? { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.9 }}
              transition={isAnimating ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : { duration: 0.3 }}
              style={{ originX: '19px', originY: '13px' }}
            />
            <motion.circle
              cx="19" cy="19" r="1.2"
              className="fill-purple-600 dark:fill-purple-300"
              animate={isAnimating ? { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.9 }}
              transition={isAnimating ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } : { duration: 0.3 }}
              style={{ originX: '19px', originY: '19px' }}
            />
            <motion.circle
              cx="13" cy="19" r="1.2"
              className="fill-indigo-500 dark:fill-indigo-300"
              animate={isAnimating ? { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.9 }}
              transition={isAnimating ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 } : { duration: 0.3 }}
              style={{ originX: '13px', originY: '19px' }}
            />

            {/* Micro Interconnect Lines */}
            <line x1="13" y1="13" x2="19" y2="13" className="stroke-purple-400/60" strokeWidth="1" />
            <line x1="13" y1="13" x2="13" y2="19" className="stroke-purple-400/60" strokeWidth="1" />
            <line x1="19" y1="13" x2="19" y2="19" className="stroke-purple-400/60" strokeWidth="1" />
            <line x1="13" y1="19" x2="19" y2="19" className="stroke-purple-400/60" strokeWidth="1" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

// ===========================================================================
// 3. MOTION ICON: Portfolio Allocation Pie Chart (Modern Portföy Teorisi)
// Minimal, outline style, representing asset distribution & diversification
// ===========================================================================
const PortfolioBalanceMotionIcon: React.FC<{ isHovered: boolean; isActive: boolean }> = ({ isHovered, isActive }) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
      <motion.svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-8 h-8 relative z-10"
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? -4 : 0,
        }}
        transition={
          isHovered
            ? { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.4, ease: 'easeOut' }
        }
      >
        {/* Main Pie Body (Left & Bottom Allocation Sectors) */}
        <motion.path
          d="M 15 6.2 A 10 10 0 1 0 25.8 17 L 15 15 Z"
          className="fill-emerald-500/10 stroke-[#10B981] dark:stroke-emerald-400"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          animate={{
            x: isHovered ? -0.8 : 0,
            y: isHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Separated / Exploded Top-Right Portfolio Slice */}
        <motion.path
          d="M 17 13 L 27.8 14.2 A 10 10 0 0 0 17 4.2 Z"
          className="fill-emerald-500/25 stroke-[#10B981] dark:stroke-emerald-400"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          animate={{
            x: isHovered ? 2.2 : 0.8,
            y: isHovered ? -2.2 : -0.8,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Internal Sector Allocation Divider Line */}
        <motion.line
          x1="15" y1="15" x2="8" y2="22"
          className="stroke-[#10B981] dark:stroke-emerald-400"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={{
            x: isHovered ? -0.8 : 0,
            y: isHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </div>
  );
};

// ===========================================================================
// 4. METRIC CARD COMPONENT (Hover Animation)
// ===========================================================================
const MetricCard: React.FC<{
  label: string;
  value: React.ReactNode;
  valueColor?: string;
  hoverBgColor?: string;
}> = ({ label, value, valueColor = "text-slate-900 dark:text-white", hoverBgColor = "bg-slate-100 dark:bg-slate-800" }) => {
  return (
    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 shadow-xs relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600">
      <div className={`absolute inset-0 ${hoverBgColor} origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0`} />
      <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="text-[10px] text-slate-400 font-medium mb-1 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300">{label}</div>
        <div className={`text-sm font-extrabold ${valueColor} transition-transform duration-300 group-hover:scale-[1.02] origin-left`}>{value}</div>
      </div>
    </div>
  );
};

// ===========================================================================
// MAIN COMPONENT
// ===========================================================================
export const PremiumEditorial: React.FC<{ isTR: boolean }> = ({ isTR }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      id: 'tefas',
      title: isTR ? 'Canlı TEFAS Verisi' : 'Live TEFAS Data',
      badge: isTR ? 'Anlık Senkronizasyon' : 'Real-time Sync',
      desc: isTR 
        ? 'Türkiye\'deki tüm yatırım fonlarına ait güncel fiyat, portföy dağılımı ve tarihsel performans verileri saniyeler içinde işlenir.'
        : 'Real-time price, portfolio allocation, and historical performance data for all mutual funds processed in seconds.',
      colorHex: '#3B82F6',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      statLabel: isTR ? 'Anlık Aktif Fon' : 'Live Tracked Funds',
      statValue: '1,420+',
      renderIcon: (isH: boolean, isA: boolean) => <TEFASDatabaseMotionIcon isHovered={isH} isActive={isA} />,
      idleDuration: 3.8,
      idleDelay: 0,
    },
    {
      id: 'ai',
      title: isTR ? 'Gemini AI Motoru' : 'Gemini AI Engine',
      badge: isTR ? 'Doğal Dil Analizi' : 'NLP Analysis',
      desc: isTR 
        ? 'Doğal dil işleme ve derin öğrenme modelleri ile piyasa duyarlılığını ölçün, fon stratejileriniz için akıllı optimizasyon önerileri alın.'
        : 'Measure market sentiment with NLP and deep learning models to receive automated optimization suggestions.',
      colorHex: '#9333EA',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      statLabel: isTR ? 'Analiz Hızı' : 'Analysis Speed',
      statValue: '3.6 Flash',
      renderIcon: (isH: boolean, isA: boolean) => <GeminiNeuralCoreIcon isHovered={isH} isActive={isA} />,
      idleDuration: 4.4,
      idleDelay: 0.7,
    },
    {
      id: 'mpt',
      title: isTR ? 'Modern Portföy Teorisi' : 'Modern Portfolio Theory',
      badge: isTR ? 'Sharpe Optimizasyonu' : 'Sharpe Ratio',
      desc: isTR 
        ? 'Markowitz matematiksel modeline dayalı Sharpe Oranı optimizasyonu ile verilen risk seviyesinde maksimum getiri hedefine ulaşın.'
        : 'Achieve maximum yield for a given risk tolerance using Markowitz mathematical model Sharpe Ratio optimization.',
      colorHex: '#10B981',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      statLabel: isTR ? 'Sharpe Oranı' : 'Sharpe Ratio',
      statValue: '2.84',
      renderIcon: (isH: boolean, isA: boolean) => <PortfolioBalanceMotionIcon isHovered={isH} isActive={isA} />,
      idleDuration: 3.6,
      idleDelay: 1.4,
    }
  ];

  // Auto-cycle through tabs every 6s unless user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, features.length]);

  const currentFeature = features[activeTab];

  return (
    <section className="py-8 lg:py-12 px-6 lg:px-16 bg-white dark:bg-[#060608] relative overflow-hidden flex items-center justify-center min-h-[85vh] lg:min-h-[88vh] max-h-[920px]">
      {/* Background Interactive Particle Network Canvas */}
      <GlassDNADataStructure />

      <div className="max-w-7xl w-full mx-auto relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Editorial Headline & AI Score Widget */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Real-time Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200/60 dark:border-indigo-500/25 bg-indigo-50/70 dark:bg-indigo-500/10 backdrop-blur-md mb-4 w-fit"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">
                {isTR ? 'Gerçek Zamanlı AI Optimizasyonu' : 'Real-Time AI Optimization'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-4"
            >
              {isTR ? (
                <>Veri Yığınlarını <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400">Net İçgörülere</span> Dönüştürün.</>
              ) : (
                <>Turn Data Chaos <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 dark:from-indigo-400 dark:via-indigo-300 dark:to-blue-400">Into Pure Clarity.</span></>
              )}
            </motion.h2>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6 max-w-lg"
            >
              {isTR 
                ? 'Kanar AI, TEFAS verilerini gelişmiş yapay zeka modelleriyle işleyerek yatırım kararlarınızı matematiksel bir kesinliğe taşır. Sadece dünü değil, yarının potansiyelini de görün.'
                : 'Kanar AI processes TEFAS data with advanced AI models, elevating your investment decisions to mathematical precision. See not just yesterday, but the potential of tomorrow.'}
            </motion.p>

            {/* Compact Floating AI Confidence Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md max-w-md relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {isTR ? 'AI Model Güven Skoru' : 'AI Model Confidence Score'}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30">
                  98.4%
                </span>
              </div>

              {/* Progress bar with liquid animation */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '98.4%' }}
                  transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full relative overflow-hidden"
                >
                  <LiquidBubbles />
                </motion.div>
              </div>

              <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-indigo-500" />
                  {isTR ? 'Gemini 3.6 Flash İşlemde' : 'Gemini 3.6 Flash Active'}
                </span>
                <span>{isTR ? 'Sharpe Dengesi: Optimal' : 'Sharpe Balance: Optimal'}</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Master Spotlight Dashboard + Bottom Motion Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            
            {/* 1. MASTER SPOTLIGHT DASHBOARD PANEL */}
            <div className="relative min-h-[310px] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 12, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-7 rounded-[24px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg relative overflow-hidden flex flex-col justify-between h-full"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl ${currentFeature.bgColor} ${currentFeature.textColor} border ${currentFeature.borderColor}`}>
                          {currentFeature.renderIcon(false, true)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {currentFeature.title}
                          </h3>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {currentFeature.badge}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{currentFeature.statLabel}</div>
                        <motion.div 
                          key={currentFeature.statValue}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className={`text-lg sm:text-xl font-extrabold ${currentFeature.textColor}`}
                        >
                          {currentFeature.statValue}
                        </motion.div>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-5">
                      {currentFeature.desc}
                    </p>
                  </div>

                  {/* SPOTLIGHT CONTENT MATRIX (NO GRAPHS - ONLY PROFESSIONAL METRIC CARDS) */}
                  {currentFeature.id === 'tefas' && (
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/70 dark:border-slate-800/70 mb-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-blue-500" />
                          {isTR ? 'TEFAS Canlı Veri Akış Metrikleri' : 'TEFAS Live Data Metrics'}
                        </span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          {isTR ? 'Takasbank Anlık' : 'Takasbank Sync'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <MetricCard label={isTR ? 'İşlem Hacmi' : 'Trading Volume'} value="₺14.2B" hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10" />
                        <MetricCard label={isTR ? 'Gecikme Süresi' : 'Latency'} value="< 120ms" valueColor="text-blue-600 dark:text-blue-400" hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10" />
                        <MetricCard label={isTR ? 'Veri Doğruluğu' : 'Accuracy'} value="99.9%" valueColor="text-emerald-600 dark:text-emerald-400" hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10" />
                        <MetricCard label={isTR ? 'Günlük Veri Akışı' : 'Daily Data Stream'} value="4.8M Kayıt" hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10" />
                        <MetricCard label={isTR ? 'Senkronizasyon' : 'Sync Rate'} value="15 Saniye" hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10" />
                        <MetricCard 
                          label={isTR ? 'Entegrasyon' : 'Integration'} 
                          value={
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isTR ? 'Aktif' : 'Active'}
                            </span>
                          } 
                          valueColor="text-emerald-600 dark:text-emerald-400"
                          hoverBgColor="bg-blue-50/80 dark:bg-blue-500/10"
                        />
                      </div>
                    </div>
                  )}

                  {/* GEMINI AI ENGINE MATRIX (NO GRAPH - HIGH PRECISION AI METRICS) */}
                  {currentFeature.id === 'ai' && (
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/70 dark:border-slate-800/70 mb-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-purple-500" />
                          {isTR ? 'AI Analiz & Derin Öğrenme Metrikleri' : 'AI Analysis & Deep Learning Metrics'}
                        </span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-extrabold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                          {isTR ? 'Model Aktif' : 'Model Active'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <MetricCard label={isTR ? 'NLP Doğruluk Oranı' : 'NLP Accuracy'} value="%99.4" valueColor="text-purple-600 dark:text-purple-400" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                        <MetricCard label={isTR ? 'Model Yanıt Süresi' : 'Latency'} value="0.35s" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                        <MetricCard label={isTR ? 'İşlenen Veri Hacmi' : 'Processed Volume'} value="14.2M Paragraf" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                        <MetricCard label={isTR ? 'Model Güven Skoru' : 'Confidence Score'} value="%98.8" valueColor="text-emerald-600 dark:text-emerald-400" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                        <MetricCard label={isTR ? 'Stres Testi Senaryosu' : 'Stress Simulations'} value="12 Senaryo" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                        <MetricCard label={isTR ? 'Piyasa Duyarlılığı' : 'Market Sentiment'} value="%88 Pozitif" valueColor="text-purple-600 dark:text-purple-400" hoverBgColor="bg-purple-50/80 dark:bg-purple-500/10" />
                      </div>
                    </div>
                  )}

                  {/* MODERN PORTFOLIO THEORY MATRIX (NO GRAPH - LUXURY FINTECH METRICS) */}
                  {currentFeature.id === 'mpt' && (
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/70 dark:border-slate-800/70 mb-4">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-emerald-500" />
                          {isTR ? 'Markowitz Risk & Getiri Dengesi Metrikleri' : 'Markowitz Risk & Return Balance Metrics'}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {isTR ? 'Etkin Sınır Optimal' : 'Efficient Frontier'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <MetricCard label={isTR ? 'Sharpe Oranı' : 'Sharpe Ratio'} value="2.84" valueColor="text-emerald-600 dark:text-emerald-400" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                        <MetricCard label={isTR ? 'Volatiliteler' : 'Volatility'} value="%11.2 Yıllık" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                        <MetricCard label={isTR ? 'Maksimum Çekilme' : 'Max Drawdown'} value="-%4.8" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                        <MetricCard label={isTR ? 'Riske Maruz Değer (VaR)' : 'Value at Risk'} value="%2.1 (%95)" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                        <MetricCard label={isTR ? 'Portföy Denge Skoru' : 'Balance Score'} value="%98.5" valueColor="text-emerald-600 dark:text-emerald-400" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                        <MetricCard label={isTR ? 'Beklenen Getiri' : 'Expected Yield'} value="+%42.6 Yıllık" valueColor="text-emerald-600 dark:text-emerald-400" hoverBgColor="bg-emerald-50/80 dark:bg-emerald-500/10" />
                      </div>
                    </div>
                  )}

                  {/* Spotlight Bottom Footer */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      {features.map((f, i) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setActiveTab(i);
                            setIsAutoPlaying(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-280 cursor-pointer ${
                            i === activeTab
                              ? 'bg-indigo-600 dark:bg-indigo-400 scale-125'
                              : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] text-slate-400 font-medium ml-1">
                        {isTR ? `${activeTab + 1} / 3 Modül` : `${activeTab + 1} / 3 Modules`}
                      </span>
                    </div>

                    <button 
                      onClick={() => setIsAutoPlaying(false)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:gap-1.5 transition-all cursor-pointer group"
                    >
                      <span>{isTR ? 'Modül Detayları' : 'Module Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 2. BOTTOM MODULE NAVIGATION CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {features.map((feat, idx) => {
                const isActive = activeTab === idx;
                const isHovered = hoveredCard === idx;

                return (
                  <motion.div
                    key={feat.id}
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: feat.idleDuration,
                      delay: feat.idleDelay,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ y: -6 }}
                    onHoverStart={() => setHoveredCard(idx)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onClick={() => {
                      setActiveTab(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`group relative p-4 rounded-[22px] border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-indigo-500/80 dark:border-indigo-400/80 shadow-md ring-1 ring-indigo-500/20'
                        : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md'
                    }`}
                  >
                    {/* Hover Expanding Block */}
                    {!isActive && (
                      <div className={`absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 ${
                        idx === 0 ? 'bg-blue-500/5 dark:bg-blue-500/10' : idx === 1 ? 'bg-purple-500/5 dark:bg-purple-500/10' : 'bg-emerald-500/5 dark:bg-emerald-500/10'
                      }`} />
                    )}
                    {/* Top Row: Micro Motion Icon + Active Pill Indicator */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      {feat.renderIcon(isHovered, isActive)}

                      {isActive ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          <span>{isTR ? 'AKTİF' : 'ACTIVE'}</span>
                        </div>
                      ) : (
                        <motion.div 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          animate={{ x: isHovered ? 2 : 0 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                        </motion.div>
                      )}
                    </div>

                    {/* Card Title & Sub-badge */}
                    <div className="relative z-10">
                      <h4 className={`text-xs sm:text-sm font-extrabold transition-colors duration-300 ${
                        isActive
                          ? 'text-slate-900 dark:text-white'
                          : idx === 0 
                            ? 'text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                            : idx === 1 
                              ? 'text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                              : 'text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                      }`}>
                        {feat.title}
                      </h4>
                      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate mt-0.5">
                        {feat.badge}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
