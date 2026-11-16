import React from 'react';
import { TefasFundDetails } from '../types';
import { Star, ShieldAlert, Wallet, ArrowUpRight, ArrowDownRight, Layers, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translateCategory, translateFundName, translateFounder, translateDate } from '../utils/formatters';

interface FundMetricsProps {
  fundDetails?: TefasFundDetails;
  fund?: TefasFundDetails;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenAiAnalysis?: () => void;
  onOpenAiModal?: () => void;
  onAddToCompare?: () => void;
  onOpenCompareModal?: () => void;
}

export const FundMetrics: React.FC<FundMetricsProps> = ({
  fundDetails: fundDetailsProp,
  fund: fundProp,
  isFavorite,
  onToggleFavorite,
  onOpenAiAnalysis,
  onOpenAiModal,
  onAddToCompare,
  onOpenCompareModal,
}) => {
  const { lang } = useLanguage();
  const isTR = lang === 'TR';

  const fundData = fundDetailsProp || fundProp;
  const handleAi = onOpenAiModal || onOpenAiAnalysis;
  const handleCompare = onOpenCompareModal || onAddToCompare;

  if (!fundData) return null;

  const isDailyPositive = fundData.dailyReturnPct >= 0;

  const returnBadges = [
    { label: isTR ? 'Günlük' : 'Daily', value: fundData.dailyReturnPct },
    { label: isTR ? 'Haftalık' : 'Weekly', value: fundData.weeklyReturnPct },
    { label: isTR ? 'Aylık' : 'Monthly', value: fundData.monthlyReturnPct },
    { label: isTR ? '3 Aylık' : '3 Months', value: fundData.threeMonthReturnPct },
    { label: isTR ? '6 Aylık' : '6 Months', value: fundData.sixMonthReturnPct },
    { label: isTR ? 'YTD (Yılbaşı)' : 'YTD', value: fundData.ytdReturnPct },
    { label: isTR ? '1 Yıllık' : '1 Year', value: fundData.yearlyReturnPct },
    { label: isTR ? '3 Yıllık' : '3 Years', value: fundData.threeYearReturnPct },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-4">
      {/* Top Banner: Fund Title, Badges & Quick Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black text-xs px-3 py-1 rounded-lg tracking-wider shadow-xs">
              {fundData.code}
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded-lg">
              {translateCategory(fundData.category, isTR)}
            </span>
            <span className="bg-lime-500/10 text-lime-700 dark:text-lime-400 text-xs font-black px-2.5 py-1 rounded-lg border border-lime-500/20">
              {isTR ? 'TEFAS Doğrulanmış' : 'TEFAS Verified'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {translateFundName(fundData.name, isTR)}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <span>{isTR ? 'Kurucu:' : 'Founder:'} <strong className="text-slate-700 dark:text-slate-200">{translateFounder(fundData.founder, isTR)}</strong></span>
            <span>•</span>
            <span>{isTR ? 'Son Güncelleme:' : 'Last Updated:'} {translateDate(fundData.lastUpdateDate, isTR)}</span>
          </p>
        </div>

        {/* Price & Action CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 min-w-[280px]">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">{isTR ? 'Son Birim Fiyat' : 'Latest Unit Price'}</div>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ₺{fundData.latestPrice.toFixed(6)}
              </span>
              <span
                className={`inline-flex items-center text-xs font-black px-2 py-0.5 rounded-md ${
                  isDailyPositive
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                }`}
              >
                {isDailyPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                %{isDailyPositive ? '+' : ''}
                {fundData.dailyReturnPct}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onToggleFavorite}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer ${
                isFavorite
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={isFavorite ? (isTR ? 'Favorilerden Çıkar' : 'Remove Favorite') : (isTR ? 'Favorilere Ekle' : 'Add Favorite')}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-slate-950' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? (isTR ? 'Favoride' : 'Saved') : (isTR ? 'Favori' : 'Favorite')}</span>
            </button>

            {handleCompare && (
              <button
                onClick={handleCompare}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>{isTR ? 'Karşılaştır' : 'Compare'}</span>
              </button>
            )}

            {handleAi && (
              <button
                onClick={handleAi}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{isTR ? 'AI Analiz' : 'AI Analysis'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Return Metrics Matrix */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {isTR ? 'Dönemsel Getiri Performansı' : 'Periodic Return Performance'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {returnBadges.map((badge, idx) => {
            const isPos = badge.value >= 0;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 p-2 rounded-xl text-center space-y-1 hover:border-lime-500/50 transition-colors"
              >
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {badge.label}
                </div>
                <div
                  className={`text-sm font-black flex items-center justify-center ${
                    isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {badge.value}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overview Cards: Total Portfolio Size, Risk Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Portfolio Value */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {isTR ? 'Toplam Fon Büyüklüğü' : 'Total Fund Size'}
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              ₺{(fundData.totalPortfolioValue / 1000000).toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 1 })} {isTR ? 'Milyon' : 'Million'}
            </div>
          </div>
        </div>

        {/* Risk Value Indicator */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 space-y-2 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> {isTR ? 'Fon Risk Değeri' : 'Fund Risk Value'}
            </span>
            <span className="font-black text-slate-900 dark:text-white">
              {fundData.riskLevel} / 7
            </span>
          </div>

          {/* 1 to 7 Risk Blocks */}
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((lvl) => {
              const isActive = lvl <= fundData.riskLevel;
              let activeBg = 'bg-emerald-500';
              if (lvl >= 6) activeBg = 'bg-rose-600';
              else if (lvl >= 4) activeBg = 'bg-amber-500';

              return (
                <div
                  key={lvl}
                  className={`h-2.5 rounded-xs transition-all ${
                    isActive ? activeBg : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                  title={`${isTR ? 'Risk Seviyesi' : 'Risk Level'} ${lvl}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

