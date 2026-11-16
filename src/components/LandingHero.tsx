import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  Landmark,
  ShieldAlert,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface LandingHeroProps {
  onGoToDashboard: () => void;
  onGoToTefasExplorer: () => void;
  onGoToAiTest: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onGoToDashboard,
  onGoToTefasExplorer,
  onGoToAiTest,
}) => {
  const { lang } = useLanguage();
  const isTR = lang === 'TR';

  const [isDashHovered, setIsDashHovered] = useState(false);
  const [isTefasHovered, setIsTefasHovered] = useState(false);
  const [isGridHovered, setIsGridHovered] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner (Theme Aware: Bright & clean in light mode, Dark in dark mode) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/60 dark:bg-gradient-to-br dark:from-indigo-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-sky-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Badge Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {isTR ? 'Yapay Zeka Analitiği' : 'AI Analytics'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 border border-indigo-500/20 dark:border-indigo-400/30">
              {isTR ? 'Gemini 3.6 Flash Motoru' : 'Gemini 3.6 Flash Engine'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {isTR ? 'TEFAS Doğrulanmış' : 'TEFAS Verified'}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {isTR ? 'Yapay Zeka Destekli' : 'AI-Powered'} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-indigo-300 dark:via-sky-200 dark:to-emerald-300">
                {isTR
                  ? 'Akıllı TEFAS Fon Analiz ve Yapay Zeka Portföy Yönetimi'
                  : 'Smart TEFAS Fund Analytics & AI Portfolio Management'}
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              {isTR
                ? 'Bireysel yatırımcıların TEFAS fonlarını, kıymetli madenlerini ve döviz varlıklarını anlık canlı kurlar ile izlemesi, yapay zeka ile senaryo bazlı stres testine tabi tutması için tasarlanmış web platformu.'
                : 'Web platform designed for retail investors to monitor TEFAS funds, precious metals, and FX assets with live exchange rates, and subject them to AI-driven stress testing.'}
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Button 1: Dashboard'a Giriş Yap (Race Car Arrow Effect + Dust Trail on Hover) */}
            <motion.button
              onClick={onGoToDashboard}
              onMouseEnter={() => setIsDashHovered(true)}
              onMouseLeave={() => setIsDashHovered(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden px-6 py-3.5 bg-transparent rounded-2xl shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] transition-all flex items-center gap-3 cursor-pointer group hover:shadow-[0_0_50px_-10px_rgba(20,184,166,0.7)]"
            >
              {/* Glowing animated border */}
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(52,211,153,1)_360deg)] animate-spin-slow" />
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,1)_360deg)] animate-spin-slow" style={{ animationDelay: '-4s' }} />
              
              {/* Inner capsule */}
              <div className="absolute inset-[1.5px] bg-slate-900 rounded-[15px] z-10 transition-colors" />
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              <LayoutDashboard className="w-4 h-4 text-emerald-400 relative z-20 group-hover:text-emerald-300" />
              <span className="relative z-20 tracking-tight font-black text-white bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-300">{isTR ? "Dashboard'a Geç" : "Go to Dashboard"}</span>
              {/* Race Car Arrow & Dust Trail */}
              <div className="relative flex items-center z-20">
                {/* Animated Dust Clouds behind arrow when hovered */}
                <AnimatePresence>
                  {isDashHovered && (
                    <div className="absolute -left-6 flex items-center gap-1 pointer-events-none">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2, x: 10 }}
                        animate={{ opacity: [0.9, 0.4, 0], scale: [0.4, 1.2, 1.8], x: [-5, -18, -30] }}
                        transition={{ duration: 0.45, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full bg-white/70 blur-[1px]"
                      />
                      <motion.span
                        initial={{ opacity: 0, scale: 0.2, x: 5 }}
                        animate={{ opacity: [0.8, 0.3, 0], scale: [0.3, 1, 1.5], x: [0, -12, -22] }}
                        transition={{ duration: 0.4, delay: 0.1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-200/80 blur-[1px]"
                      />
                      <span className="text-[10px] opacity-80 animate-pulse">💨</span>
                    </div>
                  )}
                </AnimatePresence>
                {/* Arrow zooming right like race car */}
                <motion.div
                  animate={{
                    x: isDashHovered ? [0, 16, 8] : 0,
                    scale: isDashHovered ? [1, 1.25, 1.1] : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-emerald-300" />
                </motion.div>
              </div>
            </motion.button>

            {/* Button 2: TEFAS Fonlarını İncele (Rope Hanging Pendulum Icon Effect on Hover) */}
            <motion.button
              onClick={onGoToTefasExplorer}
              onMouseEnter={() => setIsTefasHovered(true)}
              onMouseLeave={() => setIsTefasHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-5 py-3.5 bg-transparent text-slate-800 dark:text-white font-bold text-sm rounded-2xl transition-all flex items-center gap-2.5 cursor-pointer overflow-hidden border border-slate-200/50 dark:border-white/10 hover:border-emerald-500/50 group"
            >
              <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 backdrop-blur-md z-0 group-hover:bg-emerald-500/10 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500 z-0 blur-md" />
              
              {/* Hanging Rope Visual when hovered */}
              <AnimatePresence>
                {isTefasHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 14, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute -top-3.5 left-7 w-0.5 bg-amber-500/80 rounded-full z-20 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Hanging Rope Pendulum Icon */}
              <motion.div
                animate={{
                  rotate: isTefasHovered ? [0, -35, 30, -20, 12, -5, 0] : 0,
                  y: isTefasHovered ? [0, 2, 0] : 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: 'top center' }}
                className="relative z-10"
              >
                <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </motion.div>
              <span className="relative z-10">{isTR ? 'TEFAS Fonlarını İncele' : 'Explore TEFAS Funds'}</span>
            </motion.button>

            {/* Button 3: AI Stres Testi */}
            <motion.button
              onClick={onGoToAiTest}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-5 py-3.5 bg-transparent text-purple-700 dark:text-purple-300 font-bold text-sm rounded-2xl transition-all flex items-center gap-2 cursor-pointer overflow-hidden border border-purple-500/30 hover:border-purple-500/60 group shadow-sm hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]"
            >
              <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-950/40 backdrop-blur-md z-0 group-hover:bg-purple-500/10 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-fuchsia-500/0 group-hover:from-purple-500/20 group-hover:to-fuchsia-500/20 transition-all duration-500 z-0 blur-md" />
              
              <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400 relative z-10 group-hover:scale-110 group-hover:text-fuchsia-400 transition-all" />
              <span className="relative z-10 group-hover:text-fuchsia-300 transition-colors">{isTR ? 'AI Stres Testi' : 'AI Stress Test'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Grid (Circular / Orbital Motion on Hover) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {isTR ? 'Platform Temel Yetenekleri' : 'Core Platform Capabilities'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isTR
                ? 'Fareyle üzerine gelindiğinde kutular dairesel yörüngede kayar ve çekilince tersine yerine döner'
                : 'Boxes glide in circular orbit on hover and return when unhovered'}
            </p>
          </div>
        </div>

        {/* Circular Orbital Cards Container */}
        <div
          onMouseEnter={() => setIsGridHovered(true)}
          onMouseLeave={() => setIsGridHovered(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2"
        >
          {/* Card 1: Portföy (Upper box -> moves DOWN and RIGHT) */}
          <motion.div
            onClick={onGoToDashboard}
            animate={{
              x: isGridHovered ? 20 : 0,
              y: isGridHovered ? 24 : 0,
              rotate: isGridHovered ? 3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-md hover:shadow-xl transition-shadow cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>{isTR ? 'Çoklu Para Birimli Portföy' : 'Multi-Currency Portfolio'}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isTR
                  ? 'TL, USD, EUR ve GBP cinsinden anlık piyasa kurlarıyla varlık takibi ve işlem geçmişi.'
                  : 'Asset tracking and transaction history in TRY, USD, EUR, and GBP with real-time rates.'}
              </p>
            </div>
          </motion.div>

          {/* Card 2: TEFAS (Lower/Right box -> moves RIGHT and UP) */}
          <motion.div
            onClick={onGoToTefasExplorer}
            animate={{
              x: isGridHovered ? 24 : 0,
              y: isGridHovered ? -20 : 0,
              rotate: isGridHovered ? -3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-md hover:shadow-xl transition-shadow cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>{isTR ? 'TEFAS Fon Analitiği' : 'TEFAS Fund Analytics'}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isTR
                  ? '80+ TEFAS fonunun tarihsel fiyat hareketleri, varlık dağılımı ve kategori bazlı filtreleme.'
                  : 'Historical price movements, asset distribution, and category filtering for 80+ TEFAS funds.'}
              </p>
            </div>
          </motion.div>

          {/* Card 3: AI Stres Testi (Bottom/Left box -> moves LEFT and DOWN) */}
          <motion.div
            onClick={onGoToAiTest}
            animate={{
              x: isGridHovered ? -22 : 0,
              y: isGridHovered ? 20 : 0,
              rotate: isGridHovered ? -3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 dark:hover:border-purple-500/60 shadow-md hover:shadow-xl transition-shadow cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>{isTR ? 'AI MPT & Stres Testi' : 'AI MPT & Stress Testing'}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isTR
                  ? 'Sharpe oranı, volatilite, faiz şoku ve kriz senaryolarına karşı Gemini AI ile dayanıklılık skorlaması.'
                  : 'Resilience scoring against Sharpe ratio, volatility, rate shocks, and crisis scenarios via Gemini AI.'}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Benchmark (Top/Left box -> moves LEFT and UP) */}
          <motion.div
            onClick={onGoToDashboard}
            animate={{
              x: isGridHovered ? -20 : 0,
              y: isGridHovered ? -24 : 0,
              rotate: isGridHovered ? 3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 dark:hover:border-amber-500/60 shadow-md hover:shadow-xl transition-shadow cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>{isTR ? 'Benchmark & Duyarlılık' : 'Benchmark & Sentiment'}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {isTR
                  ? 'Portföyünüzü BIST 100, S&P 500, Altın ve Dolar ile kıyaslayın. Sosyal medya algı skorlarını inceleyin.'
                  : 'Compare your portfolio against BIST 100, S&P 500, Gold, and USD. Review social sentiment scores.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Accuracy & Transparency Box */}
      <div className="p-6 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-300 font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 className="text-base font-black">
              {isTR ? 'Veri Doğruluğu & TEFAS Standartları Güvencesi' : 'Data Accuracy & TEFAS Standard Assurance'}
            </h3>
          </div>
          <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
            {isTR ? 'Resmi Format' : 'Official Format'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {isTR ? (
            <>Bu projede yer alan tüm fon kodları (ör. <strong>AAV, TCD, YAS, MAC, TTE, AFT, GTA</strong>), kurucu kurum isimleri, risk derecelendirmeleri (1-7), kategori sınıflandırmaları ve tarihsel getiriler <strong>Türkiye Elektronik Fon Alım Satım Platformu (TEFAS)</strong> standartları göz önüne alınarak kurgulanmıştır.</>
          ) : (
            <>All fund codes (e.g. <strong>AAV, TCD, YAS, MAC, TTE, AFT, GTA</strong>), founding institution names, risk ratings (1-7), category classifications, and historical yields in this project are aligned with <strong>Turkey Electronic Fund Trading Platform (TEFAS)</strong> standards.</>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{isTR ? 'Finansal Formüller' : 'Financial Formulas'}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {isTR
                ? 'Birim fiyatlar ve bileşik günlük getiriler matematiksel finans denklemleri ile hesaplanır.'
                : 'Unit prices and compound daily returns calculated via mathematical finance equations.'}
            </p>
          </div>

          <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{isTR ? 'Canlı Piyasa Kurları' : 'Live Market Rates'}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {isTR
                ? 'Döviz, BIST 100 ve Gram Altın fiyatları anlık kurlar üzerinden portföye yansıtılır.'
                : 'FX, BIST 100, and Gram Gold prices reflected on portfolio via real-time market feeds.'}
            </p>
          </div>

          <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Google Gemini AI</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {isTR
                ? 'Portföy tavsiyeleri ve fon raporları Gemini 3.6 Flash yapay zeka modeliyle oluşturulur.'
                : 'Portfolio recommendations and fund reports generated with Gemini 3.6 Flash AI model.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for icon
function LayoutDashboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
