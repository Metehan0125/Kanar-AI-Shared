import React from 'react';
import { X, ShieldCheck, Sparkles, BarChart3, Wallet, Landmark, ShieldAlert, CheckCircle2, ArrowRight, Radio } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ProjectIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreFunds: () => void;
}

export const ProjectIntroModal: React.FC<ProjectIntroModalProps> = ({
  isOpen,
  onClose,
  onExploreFunds,
}) => {
  const { isTR } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-[800px] max-h-[90vh] shadow-2xl overflow-hidden relative text-slate-900 dark:text-white flex flex-col my-auto">
        {/* Banner Header (Fixed) */}
        <div className="shrink-0 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {isTR ? 'Yapay Zeka Analitiği' : 'AI Analytics'}
              </span>
              <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                TEFAS V3
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
            {isTR ? 'Yapay Zeka Destekli Portföy Yönetim ve TEFAS Analiz Platformu' : 'AI-Powered Portfolio Management & TEFAS Analytics'}
          </h2>
          <p className="text-xs text-indigo-200/90 leading-relaxed max-w-2xl">
            {isTR
              ? 'Bireysel yatırımcıların TEFAS fonlarını, kıymetli madenlerini ve varlıklarını tek bir panoda canlı kurlar ile izlemesi, yapay zeka ile stres testine tabi tutması için tasarlanmıştır.'
              : 'Empowers retail investors to monitor TEFAS mutual funds, precious metals, and assets with live rates on a single dashboard and run AI stress testing.'}
          </p>
        </div>

        {/* Content Body (Flex-1, Scrollable only if content overflows) */}
        <div className="p-5 sm:p-6 space-y-5 flex-1 min-h-0 overflow-y-auto">
          {/* Key Capabilities Grid */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> {isTR ? 'Platform Modülleri ve Yetenekleri' : 'Platform Modules & Capabilities'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                  <Wallet className="w-4 h-4" /> {isTR ? 'Çoklu Para Birimli Portföy' : 'Multi-Currency Portfolio'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {isTR
                    ? 'Portföyünüzü TL, USD, EUR ve GBP cinsinden anlık canlı kurlar ile görüntüleyin.'
                    : 'View your portfolio in TRY, USD, EUR, and GBP with real-time exchange rates.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                  <Landmark className="w-4 h-4" /> {isTR ? 'TEFAS Fon Analiz & Grafikler' : 'TEFAS Fund Analytics & Charts'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {isTR
                    ? '80+ TEFAS yatırım fonunun tarihsel getiri grafikleri, varlık dağılımları ve Gemini AI raporları.'
                    : 'Historical return series, asset allocations, and Gemini AI reports for 80+ TEFAS funds.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm">
                  <ShieldAlert className="w-4 h-4" /> {isTR ? 'AI MPT & Stres Testi' : 'AI MPT & Stress Testing'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {isTR
                    ? 'Sharpe oranı, volatilite ve COVID-19 / faiz şoku senaryolarına karşı dayanıklılık skorlaması.'
                    : 'Sharpe ratio, volatility, and resilience scoring under COVID-19 & interest rate shock scenarios.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
                  <Radio className="w-4 h-4" /> {isTR ? 'Benchmark & Piyasa Duyarlılığı' : 'Benchmark & Market Sentiment'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {isTR
                    ? 'Portföyünüzü BIST 100, S&P 500, Altın ve Bitcoin ile kıyaslayın. Sosyal medya algı skorlarını inceleyin.'
                    : 'Benchmark against BIST 100, S&P 500, Gold, and Bitcoin while tracking social sentiment scores.'}
                </p>
              </div>
            </div>
          </div>

          {/* Data Accuracy Assurance Box */}
          <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {isTR ? 'Veri Doğruluğu & Şeffaflık Güvencesi' : 'Data Accuracy & Transparency Standards'}
              </h4>
              <span className="text-[10px] font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                {isTR ? 'Doğrulanmış Format' : 'Verified Format'}
              </span>
            </div>

            <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
              {isTR ? (
                <>Sistemdeki tüm TEFAS fon kodları (AAV, TCD, YAS, MAC, TTE, AFT, GTA vb.), fon kurucuları, risk seviyeleri (1-7), varlık dağılımları ve getiriler <strong>Türkiye Elektronik Fon Alım Satım Platformu (TEFAS)</strong> resmi standartlarına tam uygundur.</>
              ) : (
                <>All TEFAS fund codes (AAV, TCD, YAS, MAC, TTE, AFT, GTA etc.), founders, risk levels (1-7), allocations, and returns adhere strictly to official <strong>Turkey Electronic Fund Trading Platform (TEFAS)</strong> standards.</>
              )}
            </p>

            <ul className="space-y-1 pt-0.5">
              <li className="text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isTR ? (
                    <><strong>Gerçekçi Getiri Hesaplama:</strong> Tarihsel grafiklerde birleşik günlük getiriler ve birim fiyat farkları matematiksel finans formülleriyle hesaplanır.</>
                  ) : (
                    <><strong>Realistic Return Calculation:</strong> Historical compounded returns and unit price variances are calculated using mathematical financial formulas.</>
                  )}
                </span>
              </li>
              <li className="text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isTR ? (
                    <><strong>Canlı Döviz ve Maden Kurları:</strong> USD, EUR, GBP ile Gram Altın ve Gümüş fiyatları anlık piyasa kurlarıyla dönüştürülür.</>
                  ) : (
                    <><strong>Live FX & Metal Rates:</strong> USD, EUR, GBP, Gold, and Silver prices are converted using real-time market feeds.</>
                  )}
                </span>
              </li>
              <li className="text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isTR ? (
                    <><strong>Google Gemini AI Entegrasyonu:</strong> Yapay zeka analizleri doğrudan Gemini 3.6 Flash modeli ile üretilir.</>
                  ) : (
                    <><strong>Google Gemini AI Integration:</strong> AI analytics are directly generated via the Gemini 3.6 Flash model.</>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer (Fixed) */}
        <div className="shrink-0 p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            {isTR ? 'Yapay Zeka Destekli TEFAS & Portföy Platformu' : 'AI-Powered TEFAS & Portfolio Platform'}
          </span>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onExploreFunds();
              }}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {isTR ? 'TEFAS Fonlarını İncele' : 'Explore TEFAS Funds'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isTR ? 'Anladım, Portföyüme Git' : 'Got It, Go to Portfolio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
