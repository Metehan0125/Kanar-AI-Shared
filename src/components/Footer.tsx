import React from 'react';
import { motion } from 'motion/react';
import { Landmark, ShieldAlert, BarChart3, Radio, Sparkles, ShieldCheck, Cpu, Globe, Heart } from 'lucide-react';

interface FooterProps {
  isTR?: boolean;
  onGoToDashboard?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isTR = true,
  onGoToDashboard,
  onNavigateSection,
  onSelectTab,
}) => {
  const handleLinkClick = (id: string) => {
    const appTabs = ['PORTFOLIO', 'TEFAS_EXPLORER', 'AI_ROBUSTNESS', 'BENCHMARK', 'AI_CAUSALITY', 'NOTES'];
    if (appTabs.includes(id) && onSelectTab) {
      onSelectTab(id);
    } else if (onNavigateSection) {
      onNavigateSection(id);
    } else if (onGoToDashboard) {
      onGoToDashboard();
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors"
    >
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-400 via-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-emerald-500/20">
                K
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Kanar
                </span>
                <span className="font-mono text-xs font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300 text-slate-950 px-2 py-0.5 rounded-lg shadow-xs border border-emerald-300/60 uppercase tracking-widest leading-none flex items-center justify-center">
                  AI
                </span>
                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                  v2.5 Pro
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-sm">
              {isTR
                ? 'Türkiye Elektronik Fon Alım Satım Platformu (TEFAS) verileriyle güçlendirilmiş, yapay zeka ve Modern Portföy Teorisi (MPT) destekli akıllı fon analizi ve risk yönetim platformu.'
                : 'AI-driven TEFAS mutual fund analytics, portfolio optimization, and stress testing engine built for modern investors.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-lime-500" />
                Google Gemini 3.6 Flash
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                TEFAS Canlı Entegrasyon
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {isTR ? 'Platform Modülleri' : 'Modules'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('PORTFOLIO')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  {isTR ? 'Akıllı Dashboard' : 'Smart Dashboard'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('TEFAS_EXPLORER')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  {isTR ? 'TEFAS Fon Analitiği' : 'TEFAS Analytics'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('AI_ROBUSTNESS')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer flex items-center gap-1"
                >
                  <span>{isTR ? 'AI Stres Testi' : 'AI Stress Test'}</span>
                  <Sparkles className="w-3 h-3 text-lime-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('BENCHMARK')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  {isTR ? 'BIST & Altın Karşılaştırma' : 'Benchmarks'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Analytical Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {isTR ? 'Analiz & Araçlar' : 'Tools'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('AI_CAUSALITY')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  {isTR ? 'Piyasa Duyarlılığı' : 'Market Sentiment'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('NOTES')}
                  className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  {isTR ? 'Yatırımcı Notları & Planlama' : 'Investor Notes'}
                </button>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 font-medium">
                  {isTR ? 'Sharpe & Sortino Oranları' : 'Sharpe Ratio Engine'}
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500 font-medium">
                  {isTR ? 'Varlık Dağılımı (Pie Chart)' : 'Asset Allocation'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic & Project Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {isTR ? 'Platform Hakkında' : 'Platform Info'}
            </h4>
            <div className="space-y-2 text-slate-500 dark:text-slate-400 font-medium text-[11px] leading-relaxed">
              <p>
                <strong className="text-slate-800 dark:text-slate-200">KanarAI Finansal Analitik</strong>
              </p>
              <p>
                {isTR ? 'Yapay Zeka Destekli Portföy & TEFAS Platformu' : 'AI-Powered Portfolio & TEFAS Platform'}
              </p>
              <p className="text-slate-400">
                {isTR ? 'Gelişmiş Finans Teknolojileri' : 'Advanced Financial Technologies'}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20 text-[10px] font-black">
                  <Globe className="w-3 h-3" /> TEFAS Standard V3.2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed space-y-1.5">
          <p className="font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚠️ {isTR ? 'YASAL UYARI / FINANCIAL DISCLAIMER (YTD)' : 'LEGAL DISCLAIMER / FINANCIAL DISCLAIMER'}</span>
          </p>
          <p>
            {isTR
              ? 'KanarAI platformunda sunulan tüm TEFAS fon verileri, grafikler, yapay zeka (Gemini AI) skorları, stres testi simülasyonları ve Sharpe analizleri bilgilendirme amacını taşımaktadır. Buradaki hiçbir veri veya AI çıktısı yatırım danışmanlığı kapsamında olmayıp, Yatırım Tavsiyesi Değildir (YTD). Yatırım kararlarınızı vermeden önce Sermaye Piyasası Kurulu (SPK) lisanslı yetkili kuruluşlardan profesyonel destek almanız tavsiye edilir.'
              : 'All mutual fund data, market indices, Gemini AI stress tests, and portfolio metrics provided on KanarAI are strictly for educational and analytical purposes and do not constitute financial advice.'}
          </p>
        </div>

        {/* Copyright & Bottom Row */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 <strong>KanarAI</strong>. {isTR ? 'Tüm Hakları Saklıdır.' : 'All Rights Reserved.'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>{isTR ? 'Gücünü' : 'Powered by'}</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <strong className="text-slate-700 dark:text-slate-300">Gemini 3.6 AI</strong>{isTR ? "'dan Alır" : ''}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>TEFAS API v2.0</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
