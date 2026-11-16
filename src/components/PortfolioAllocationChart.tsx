import React, { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, useInView } from 'motion/react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { AssetAllocationItem } from '../types';
import { LiquidBubbles } from './LiquidBubbles';

interface PortfolioAllocationChartProps {
  allocations?: AssetAllocationItem[];
  allocation?: AssetAllocationItem[];
  darkMode?: boolean;
}

export const PortfolioAllocationChart: React.FC<PortfolioAllocationChartProps> = ({
  allocations: allocationsProp,
  allocation: allocationProp,
  darkMode,
}) => {
  const { t, isTR } = useLanguage();
  const safeAllocation = allocationsProp || allocationProp || [];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Translate category names when in English mode
  const translateCategoryName = (name: string) => {
    if (isTR) return name;
    switch (name) {
      case 'Hisse Senedi':
      case 'Yerli Hisse Senedi':
      case 'Hisse Senedi (BIST)':
        return 'Equities / Stocks';
      case 'Özel Sektör Borçlanma':
      case 'Özel Sektör Borçlanma Araçları':
      case 'Borçlanma Araçları':
        return 'Corporate Bonds';
      case 'Ters Repo':
        return 'Reverse Repo';
      case 'Takasbank Para Piyasası':
        return 'Takasbank Money Market';
      case 'Mevduat':
      case 'Mevduat / Vadeli':
        return 'Bank Deposits';
      case 'Yabancı Hisse Senedi':
      case 'Yabancı Hisse Senedi (US Tech)':
        return 'Foreign Tech Equities';
      case 'Kıymetli Madenler':
      case 'Kıymetli Maden':
      case 'Altın / Kıymetli Maden':
      case 'Altın & Kıymetli Madenler':
      case 'Gümüş & Madenler':
        return 'Precious Metals & Gold';
      case 'Eurobond':
      case 'Kamu Borçlanma':
        return 'Government Eurobonds';
      case 'Döviz & Nakit':
      case 'Yabancı Para':
        return 'FX & Cash Reserves';
      default:
        return name;
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const size = 240;
  const radius = 90;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 flex-shrink-0">
        <div className="flex items-center space-x-2.5 flex-1 min-w-[220px]">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
            <PieChartIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base truncate">{t('allocationTitle')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{t('allocationDesc')}</p>
          </div>
        </div>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-bold text-emerald-600 hover:bg-emerald-100 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1.5 rounded-lg shrink-0 transition-colors flex items-center max-w-full"
          >
            <span className="truncate">{t('clearFilter')} ({translateCategoryName(selectedCategory)})</span>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3 md:gap-4 items-center pb-2">
        {/* Responsive Donut Chart Container */}
        <div ref={containerRef} className="w-full max-w-[140px] xl:max-w-[160px] aspect-square relative flex items-center justify-center shrink-0 mx-auto">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90 overflow-visible drop-shadow-md">
            {/* Background Track */}
            <circle
              cx={size/2}
              cy={size/2}
              r={radius}
              fill="none"
              stroke={darkMode ? '#1e293b' : '#f1f5f9'}
              strokeWidth={strokeWidth}
              className="transition-colors duration-500"
            />
            
            {/* Slices */}
            {(() => {
              let currentOffset = 0;
              return safeAllocation.map((item, index) => {
                const percent = item.percentage / 100;
                const segmentArc = percent * circumference;
                // Seamless joining without gaps
                const gapArc = 0; 
                let segLen = segmentArc - gapArc;
                if (segLen < 0.1) segLen = 0.1;
                
                const start = currentOffset + (gapArc / 2);
                currentOffset += segmentArc;

                // Subtle mute if another category is selected from the legend
                const isSelected = selectedCategory === item.name;
                const isMuted = selectedCategory && !isSelected;

                return (
                  <motion.circle
                    key={item.name}
                    onClick={() => setSelectedCategory(isSelected ? null : item.name)}
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeLinecap="butt"
                    initial={{ strokeDasharray: `0 ${circumference}`, scale: 1, strokeWidth }}
                    animate={
                      isInView 
                        ? { 
                            strokeDasharray: `${segLen} ${circumference}`,
                            scale: isSelected ? 1.08 : 1,
                            strokeWidth: isSelected ? strokeWidth + 6 : strokeWidth
                          } 
                        : {}
                    }
                    transition={{ 
                      strokeDasharray: { duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
                      strokeWidth: { duration: 0.3, ease: "easeOut" }
                    }}
                    strokeDashoffset={-start}
                    className="cursor-pointer"
                    style={{ 
                      opacity: isMuted ? 0.3 : 1,
                      filter: isSelected ? `drop-shadow(0px 4px 12px ${item.color}90)` : 'drop-shadow(0px 0px 0px transparent)',
                      transformOrigin: 'center',
                      transition: 'opacity 0.3s, filter 0.3s'
                    }}
                  />
                );
              });
            })()}
          </svg>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none z-10 leading-none">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              {selectedCategory ? (
                <>
                  <span className="text-[10px] text-slate-500 font-semibold mb-1 max-w-[110px] text-center px-1 leading-tight line-clamp-2">
                    {translateCategoryName(selectedCategory)}
                  </span>
                  <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                    %{safeAllocation.find(i => i.name === selectedCategory)?.percentage}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[11px] text-slate-400 font-semibold mb-0.5">{t('assets')}</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">100<span className="text-sm text-slate-500">%</span></span>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Allocation Bar Legend List */}
        <div className="w-full space-y-1.5 min-w-0">
          {safeAllocation.map((item, idx) => {
            const isSelected = selectedCategory === item.name;
            const displayName = translateCategoryName(item.name);
            return (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
                key={idx}
                onClick={() => setSelectedCategory(isSelected ? null : item.name)}
                className={`space-y-1 p-1.5 rounded-xl transition-all cursor-pointer ${
                  isSelected ? 'bg-slate-100 dark:bg-slate-800/80 ring-1 ring-slate-300 dark:ring-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-2 font-bold text-slate-700 dark:text-slate-200 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate">{displayName}</span>
                  </span>
                  <span className="font-black text-slate-900 dark:text-white ml-2">%{item.percentage}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.percentage}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full transition-colors duration-500 relative overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <LiquidBubbles />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
