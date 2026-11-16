import React, { useState } from 'react';
import { KNOWN_TEFAS_FUNDS } from '../data/tefasFundsData';
import { useLanguage } from '../LanguageContext';
import { translateCategory, translateFundName } from '../utils/formatters';
import { ArrowUpRight, TrendingUp, ShieldAlert, Award } from 'lucide-react';

interface PopularFundsGridProps {
  onSelectFund: (code: string) => void;
  activeFundCode: string;
}

export const PopularFundsGrid: React.FC<PopularFundsGridProps> = ({
  onSelectFund,
  activeFundCode,
}) => {
  const { isTR } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('ALL');

  const categories = [
    { key: 'ALL', label: isTR ? 'Tümü' : 'All' },
    { key: 'Değişken Fon', label: isTR ? 'Değişken Fon' : 'Variable Fund' },
    { key: 'Hisse Senedi Fonu', label: isTR ? 'Hisse Senedi Fonu' : 'Equity Fund' },
    { key: 'Yabancı Hisse Senedi Fonu', label: isTR ? 'Yabancı Hisse Senedi Fonu' : 'Foreign Equity Fund' },
    { key: 'Kıymetli Madenler Fonu', label: isTR ? 'Kıymetli Madenler Fonu' : 'Precious Metals Fund' },
  ];

  const filteredFunds = KNOWN_TEFAS_FUNDS.filter(
    (f) => selectedCat === 'ALL' || f.category === selectedCat
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/50">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">
              {isTR ? 'Öne Çıkan TEFAS Fonları' : 'Featured TEFAS Funds'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isTR ? 'Farklı kategorilerdeki popüler fonları 1-tıkla inceleyebilirsiniz' : 'Explore popular funds across categories with a single click'}
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCat === cat.key
                  ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Funds Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFunds.map((fund) => {
          const isActive = fund.code === activeFundCode;
          return (
            <button
              key={fund.code}
              onClick={() => onSelectFund(fund.code)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 group flex flex-col justify-between h-full min-h-[120px] space-y-3 relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/30 dark:bg-slate-950/20 border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-800/60 hover:-translate-y-0.5 hover:shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm bg-indigo-600 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                    {fund.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    {isTR ? 'Risk' : 'Risk'}: {fund.riskLevel}/7
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {translateFundName(fund.name, isTR)}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                  {translateCategory(fund.category, isTR)}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  {isTR ? 'Grafiği Aç' : 'View Chart'} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
