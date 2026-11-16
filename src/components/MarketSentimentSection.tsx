import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { MarketSentimentData } from '../types';
import { Newspaper, Twitter, Radio, Sparkles } from 'lucide-react';
import { LiquidBubbles } from './LiquidBubbles';

export const MarketSentimentSection: React.FC = () => {
  const { t, isTR } = useLanguage();
  const [sentiment, setSentiment] = useState<MarketSentimentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/sentiment')
      .then((res) => res.json())
      .then((data) => {
        setSentiment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !sentiment) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400 font-medium">
        {t('loadingSentiment')}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-black">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
              {t('sentimentTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('sentimentDesc')}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-lime-500 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-slate-950" />
          {t('optimisticMode')} (%{sentiment.bullishPercentage})
        </span>
      </div>

      {/* Sentiment Gauges & Ratios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Twitter className="w-4 h-4 text-sky-500" /> {t('twitterSentiment')}
            </span>
            <span className="text-xs font-black text-emerald-500">
              {isTR ? sentiment.twitterSentimentLabel : 'Bullish Appetite'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-500">{t('bullish')} %{sentiment.bullishPercentage}</span>
              <span className="text-rose-500">{t('bearish')} %{sentiment.bearishPercentage}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex relative">
              <div
                className="bg-emerald-500 h-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${sentiment.bullishPercentage}%` }}
              >
                <LiquidBubbles />
              </div>
              <div
                className="bg-rose-500 h-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${sentiment.bearishPercentage}%` }}
              >
                <LiquidBubbles />
              </div>
            </div>
          </div>
        </div>

        {/* Media News Sentiment */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-indigo-500" /> {t('mediaSentiment')}
            </span>
            <span className="text-xs font-black text-emerald-500">
              {isTR ? sentiment.newsSentimentLabel : 'Positive Outlook'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isTR
              ? 'Son 24 saatteki TEFAS fonları, Merkez Bankası ve küresel piyasa haberleri pozitif görünümü destekliyor.'
              : 'TEFAS funds, Central Bank, and global market news from the last 24 hours support a positive outlook.'}
          </p>
        </div>

        {/* Overall Sentiment Index */}
        <div className="p-5 bg-slate-900 border border-slate-800 text-white rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-slate-400 block">{t('overallSentimentIndex')}</span>
            <h4 className="text-3xl font-black text-lime-400 tracking-tight mt-0.5">
              +{sentiment.overallScore} <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </h4>
            <span className="text-[11px] text-slate-300 font-medium">{t('strongAppetite')}</span>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            +68%
          </div>
        </div>
      </div>

      {/* Headlines List */}
      <div className="space-y-3">
        <h4 className="font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Newspaper className="w-4 h-4 text-lime-600 dark:text-lime-400" /> {t('featuredHeadlines')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sentiment.headlines.map((hl) => {
            const isPos = hl.sentiment === 'positive';
            const translatedTitle = isTR
              ? hl.title
              : hl.id === 'n1'
              ? 'Positive Market Momentum Following Central Bank Policy Decision'
              : hl.id === 'n2'
              ? 'Total TEFAS Fund Assets Reach Record Highs'
              : hl.id === 'n3'
              ? 'Global Gold Prices Consolidation Expected Per Ounce'
              : 'Fed Officials Issue Guidance on Inflation and Rate Cuts';

            const translatedSummary = isTR
              ? hl.impactSummary
              : hl.id === 'n1'
              ? 'Increased investor appetite observed in BIST 100 and mutual funds.'
              : hl.id === 'n2'
              ? 'Retail investor interest in mutual investment funds continues to rise.'
              : hl.id === 'n3'
              ? 'Short-term sideways trend expected in precious metals.'
              : 'Limited volatility expected in foreign stock funds.';

            const translatedTime = isTR
              ? hl.time
              : hl.time.replace('dakika önce', 'mins ago').replace('saat önce', 'hrs ago');

            return (
              <div
                key={hl.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2 hover:border-lime-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">{hl.source}</span>
                  <span className="text-slate-400 text-[11px] font-medium">{translatedTime}</span>
                </div>

                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-snug">
                  {translatedTitle}
                </h5>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {translatedSummary}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg ${
                      isPos
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t('impact')}: {isPos ? t('positiveImpact') : t('neutralImpact')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

