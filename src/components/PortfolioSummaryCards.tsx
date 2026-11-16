import React, { useState } from 'react';
import { CurrencyCode, PortfolioItem, CurrencyRates } from '../types';
import { useLanguage } from '../LanguageContext';
import { LiquidBubbles } from './LiquidBubbles';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
  Calendar,
  Sliders,
  PieChart as PieChartIcon,
  FileSpreadsheet,
  X,
  Check,
  Download,
  Info,
  Eye,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface PortfolioSummaryCardsProps {
  items: PortfolioItem[];
  rates: CurrencyRates;
  robustnessScore?: number;
  onOpenAddAsset: () => void;
  onOpenTransactions: () => void;
  widgetVisibility?: {
    summary: boolean;
    trend: boolean;
    allocation: boolean;
    table: boolean;
    notes: boolean;
  };
  onToggleWidget?: (widgetKey: string) => void;
}

export const PortfolioSummaryCards: React.FC<PortfolioSummaryCardsProps> = ({
  items,
  rates,
  robustnessScore = 82,
  onOpenAddAsset,
  onOpenTransactions,
  widgetVisibility,
  onToggleWidget,
}) => {
  const { t, isTR } = useLanguage();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('TRY');
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Calculate totals in TRY
  const totalCostTRY = items.reduce((acc, item) => acc + item.amount * item.avgBuyPriceTRY, 0);
  const totalValueTRY = items.reduce((acc, item) => acc + item.amount * item.currentPriceTRY, 0);
  const totalProfitLossTRY = totalValueTRY - totalCostTRY;
  const totalProfitLossPct = totalCostTRY > 0 ? (totalProfitLossTRY / totalCostTRY) * 100 : 0;

  // Category breakdown calculations for Card 2 & Card 3
  const tefasValue = items.filter(i => i.type === 'TEFAS').reduce((a, b) => a + (b.amount * b.currentPriceTRY), 0);
  const stockValue = items.filter(i => i.type === 'STOCK').reduce((a, b) => a + (b.amount * b.currentPriceTRY), 0);
  const metalValue = items.filter(i => i.type === 'PRECIOUS_METAL').reduce((a, b) => a + (b.amount * b.currentPriceTRY), 0);
  const cashValue = items.filter(i => i.type === 'CASH').reduce((a, b) => a + (b.amount * b.currentPriceTRY), 0);

  const safeTotalValue = totalValueTRY > 0 ? totalValueTRY : 1;
  const tefasPct = Math.round((tefasValue / safeTotalValue) * 100) || 50;
  const stockPct = Math.round((stockValue / safeTotalValue) * 100) || 25;
  const metalPct = Math.round((metalValue / safeTotalValue) * 100) || 15;
  const cashPct = Math.round((cashValue / safeTotalValue) * 100) || 10;

  const currencySymbolMap: Record<CurrencyCode, string> = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const currentRate = rates[selectedCurrency] || 1.0;
  const convert = (valueInTRY: number) => valueInTRY / currentRate;

  const displayTotalValue = convert(totalValueTRY);
  const displayTotalProfitLoss = convert(totalProfitLossTRY);
  const displayTotalCost = convert(totalCostTRY);

  const isProfit = totalProfitLossTRY >= 0;

  // Donut chart data for Card 3
  const pieData = [
    { name: t('tefasFunds'), value: tefasValue || 500000, color: '#3b82f6' },
    { name: t('stocks'), value: stockValue || 250000, color: '#10b981' },
    { name: t('preciousMetals'), value: metalValue || 150000, color: '#f59e0b' },
    { name: t('cashFX'), value: cashValue || 100000, color: '#8b5cf6' },
  ];

  // Function to download CSV
  const handleDownloadCSV = () => {
    const headers = [t('assetCode'), t('assetName'), 'Type', 'Amount', 'Avg Price', 'Current Price', 'Total Value', 'Profit/Loss'];
    const rows = items.map(i => [
      i.code,
      `"${i.name.replace(/"/g, '""')}"`,
      i.type,
      i.amount,
      i.avgBuyPriceTRY,
      i.currentPriceTRY,
      (i.amount * i.currentPriceTRY).toFixed(2),
      ((i.amount * i.currentPriceTRY) - (i.amount * i.avgBuyPriceTRY)).toFixed(2)
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `portfolio_summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Header Controls matching Dashboard layout */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Title & Date Range Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('portfolioTitle')}
          </h1>

          {/* Interactive Date Filter Pill */}
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 shadow-2xs transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('lastUpdate')}</span>
          </button>
        </div>

        {/* Right Actions: Currency Switcher, Refresh, Widget Manage, Download CSV, Add Asset */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Currency Switcher */}
          <div className="bg-white dark:bg-slate-900 p-1 rounded-xl flex items-center space-x-1 border border-slate-200 dark:border-slate-800 shadow-2xs">
            {(['TRY', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  selectedCurrency === curr
                    ? 'bg-emerald-500 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenTransactions}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
            title={t('transactionHistory')}
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsWidgetModalOpen(true)}
            className="px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{t('widgetManagement')}</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{t('downloadCSV')}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenAddAsset}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addAssetOrReport')}</span>
          </button>
        </div>
      </div>

      {/* 3 HERO CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CARD 1: Total Revenue (Hero Metric Card) - lg:col-span-4 */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 relative">
          <div>
            {/* Header: Icon Box + Title + Menu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black transition-all duration-300">
                  <DollarSign className="w-5 h-5 transition-transform duration-300" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 transition-colors duration-300">
                  {t('totalPortfolioValue')}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'card1' ? null : 'card1')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {activeMenu === 'card1' && (
                  <div className="absolute right-0 top-8 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 text-xs">
                    <button
                      onClick={() => {
                        onOpenTransactions();
                        setActiveMenu(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-medium"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('transactionHistory')}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDownloadCSV();
                        setActiveMenu(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2 font-medium"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t('exportReport')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Big Hero Number & Trend Badge */}
            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currencySymbolMap[selectedCurrency]}
                {displayTotalValue.toLocaleString(isTR ? 'tr-TR' : 'en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </h2>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                  isProfit
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                }`}
              >
                {isProfit ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {totalProfitLossPct.toFixed(1)}% {isProfit ? t('vsLastMonthIncrease') : t('vsLastMonthDecrease')}
              </span>
            </div>
          </div>

          {/* Sub Key-Value Metrics at Card Bottom */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="font-medium">{t('totalCost')} :</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {currencySymbolMap[selectedCurrency]}
                {displayTotalCost.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="font-medium">{t('assetCount')} :</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {items.length} {t('items')}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Horizontal Progress Bar Breakdown - lg:col-span-4 */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t('assetClassDistribution')}
                </span>
              </div>
              <button
                onClick={() => setActiveMenu(activeMenu === 'card2' ? null : 'card2')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Stacked Horizontal Bar Rows */}
            <div className="mt-4 space-y-3.5">
              {/* Row 1: TEFAS Fonları (Blue Bar) */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{t('tefasFunds')}</span>
                  <span className="text-blue-600 font-extrabold">%{tefasPct}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${Math.min(tefasPct, 100)}%` }}
                  >
                    <LiquidBubbles />
                  </div>
                </div>
              </div>

              {/* Row 2: Hisse Senetleri */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{t('stocks')}</span>
                  <span className="text-emerald-600 font-extrabold">%{stockPct}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${Math.min(stockPct, 100)}%` }}
                  >
                    <LiquidBubbles />
                  </div>
                </div>
              </div>

              {/* Row 3: Kıymetli Maden & Diğer */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{t('metalsAndFX')}</span>
                  <span className="text-amber-600 font-extrabold">%{metalPct + cashPct}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${Math.min(metalPct + cashPct, 100)}%` }}
                  >
                    <LiquidBubbles />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom X-Axis Scale Ticks */}
          <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>{currencySymbolMap[selectedCurrency]}0</span>
            <span>{currencySymbolMap[selectedCurrency]}200K</span>
            <span>{currencySymbolMap[selectedCurrency]}400K</span>
            <span>{currencySymbolMap[selectedCurrency]}600K</span>
            <span>{currencySymbolMap[selectedCurrency]}800K</span>
            <span>{currencySymbolMap[selectedCurrency]}1.0M+</span>
          </div>
        </div>

        {/* CARD 3: Donut Chart + Breakdown List - lg:col-span-4 */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                <PieChartIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t('breakdownSummary')}
              </span>
            </div>
            <button
              onClick={() => setActiveMenu(activeMenu === 'card3' ? null : 'card3')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Flex Row: Donut Chart on Left, Breakdown List on Right */}
          <div className="grid grid-cols-12 items-center gap-2">
            {/* Fixed, Stable Donut Chart Visualizer */}
            <div className="col-span-5 flex items-center justify-center">
              <div className="w-[120px] h-[120px] relative flex items-center justify-center shrink-0 mx-auto">
                <PieChart width={120} height={120} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={34}
                    outerRadius={54}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
                {/* Donut Center Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none z-10 leading-none">
                  <span className="text-[10px] text-slate-400 font-bold leading-none mb-0.5">{items.length} {t('items')}</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-none">{t('assets')}</span>
                </div>
              </div>
            </div>

            {/* Breakdown Category List with colored dots & prices */}
            <div className="col-span-7 space-y-2 text-xs min-w-0">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-1">
                  <div className="flex items-center space-x-1.5 min-w-0 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-600 dark:text-slate-400 truncate text-[11px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white text-[11px] shrink-0">
                    ₺{convert(item.value).toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100 dark:border-slate-800 font-medium">
            {t('livePriceActive')}
          </div>
        </div>
      </div>

      {/* Modal: Widget Yönetimi Modal */}
      {isWidgetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">{t('widgetModalTitle')}</h3>
              </div>
              <button
                onClick={() => setIsWidgetModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {t('widgetModalDesc')}
            </p>

            <div className="space-y-3">
              {[
                { id: 'summary', title: t('wSummaryTitle'), desc: t('wSummaryDesc') },
                { id: 'trend', title: t('wTrendTitle'), desc: t('wTrendDesc') },
                { id: 'allocation', title: t('wAllocationTitle'), desc: t('wAllocationDesc') },
                { id: 'table', title: t('wTableTitle'), desc: t('wTableDesc') },
                { id: 'notes', title: t('wNotesTitle'), desc: t('wNotesDesc') },
              ].map((w) => (
                <div
                  key={w.id}
                  onClick={() => onToggleWidget && onToggleWidget(w.id)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{w.title}</h4>
                    <p className="text-[11px] text-slate-400">{w.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                    widgetVisibility?.[w.id as keyof typeof widgetVisibility] !== false
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-transparent'
                  }`}>
                    {widgetVisibility?.[w.id as keyof typeof widgetVisibility] !== false && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsWidgetModalOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
              >
                {t('ok')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Date Range Modal */}
      {isDatePickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">{t('dateRangeTitle')}</h3>
              </div>
              <button onClick={() => setIsDatePickerOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {[t('today'), t('lastWeek'), t('lastMonth'), t('last3Months'), t('last1Year'), t('allPeriod')].map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => setIsDatePickerOpen(false)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
