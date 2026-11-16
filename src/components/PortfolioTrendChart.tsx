import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Download,
  MoreVertical,
  Sliders,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Check,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react';

interface TrendDataPoint {
  month: string;
  portfolio: number;
  benchmark: number;
  portfolioChange: string;
  benchmarkChange: string;
}

const fullTrendData: TrendDataPoint[] = [
  { month: 'Oca', portfolio: 680000, benchmark: 620000, portfolioChange: '+4.2%', benchmarkChange: '+2.1%' },
  { month: 'Şub', portfolio: 820000, benchmark: 650000, portfolioChange: '+8.5%', benchmarkChange: '+1.4%' },
  { month: 'Mar', portfolio: 940000, benchmark: 710000, portfolioChange: '+12.1%', benchmarkChange: '+3.0%' },
  { month: 'Nis', portfolio: 890000, benchmark: 680000, portfolioChange: '-2.4%', benchmarkChange: '-1.8%' },
  { month: 'May', portfolio: 1050000, benchmark: 740000, portfolioChange: '+15.0%', benchmarkChange: '+4.2%' },
  { month: 'Haz', portfolio: 1120000, benchmark: 790000, portfolioChange: '+6.2%', benchmarkChange: '+2.8%' },
  { month: 'Tem', portfolio: 1280000, benchmark: 820000, portfolioChange: '+11.8%', benchmarkChange: '+1.5%' },
  { month: 'Ağu', portfolio: 1425800, benchmark: 890000, portfolioChange: '+15.2%', benchmarkChange: '-12.7%' },
  { month: 'Eyl', portfolio: 1390000, benchmark: 860000, portfolioChange: '-2.1%', benchmarkChange: '-3.1%' },
  { month: 'Eki', portfolio: 1510000, benchmark: 910000, portfolioChange: '+8.4%', benchmarkChange: '+4.5%' },
  { month: 'Kas', portfolio: 1620000, benchmark: 950000, portfolioChange: '+7.1%', benchmarkChange: '+2.9%' },
  { month: 'Ara', portfolio: 1780000, benchmark: 1020000, portfolioChange: '+9.8%', benchmarkChange: '+5.0%' },
];

export const PortfolioTrendChart: React.FC = () => {
  const { t, isTR } = useLanguage();
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar'>('area');
  const [selectedRange, setSelectedRange] = useState<string>('TÜMÜ');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [benchmarkName, setBenchmarkName] = useState<string>('BIST 100');
  const [isCustomChartModalOpen, setIsCustomChartModalOpen] = useState<boolean>(false);

  // Translate month label if in English
  const translateMonth = (month: string) => {
    if (isTR) return month;
    switch (month) {
      case 'Oca': return 'Jan';
      case 'Şub': return 'Feb';
      case 'Mar': return 'Mar';
      case 'Nis': return 'Apr';
      case 'May': return 'May';
      case 'Haz': return 'Jun';
      case 'Tem': return 'Jul';
      case 'Ağu': return 'Aug';
      case 'Eyl': return 'Sep';
      case 'Eki': return 'Oct';
      case 'Kas': return 'Nov';
      case 'Ara': return 'Dec';
      default: return month;
    }
  };

  // Filter data based on selectedRange button
  const getFilteredData = () => {
    let sliceData = fullTrendData;
    switch (selectedRange) {
      case '1A':
      case '1M':
        sliceData = fullTrendData.slice(-2);
        break;
      case '3A':
      case '3M':
        sliceData = fullTrendData.slice(-3);
        break;
      case '6A':
      case '6M':
        sliceData = fullTrendData.slice(-6);
        break;
      case '1Y':
        sliceData = fullTrendData.slice(-12);
        break;
      default:
        sliceData = fullTrendData;
        break;
    }
    return sliceData.map((item) => ({
      ...item,
      month: translateMonth(item.month),
    }));
  };

  const chartData = getFilteredData();

  // Custom tooltip floating card
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as TrendDataPoint;
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3.5 rounded-2xl shadow-xl space-y-2 text-xs z-30">
          <div className="text-[11px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center justify-between gap-4">
            <span>{label} 2026</span>
            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
              {t('livePrice')}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4 font-bold text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('portfolioValue')}:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-900 dark:text-white">
                  ₺{payload[0].value?.toLocaleString(isTR ? 'tr-TR' : 'en-US')}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1 rounded flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  {data.portfolioChange}
                </span>
              </div>
            </div>

            {showBenchmark && payload[1] && (
              <div className="flex items-center justify-between gap-4 font-bold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{benchmarkName}:</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    ₺{payload[1].value?.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-1 rounded flex items-center">
                    <ArrowDownRight className="w-2.5 h-2.5" />
                    {data.benchmarkChange}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const handleDownloadChartData = () => {
    const headers = ['Ay', 'Portföy Değeri (TL)', 'Benchmark (TL)'];
    const rows = chartData.map(d => [d.month, d.portfolio, d.benchmark]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `grafik_trend_verileri_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
      {/* Chart Top Header matching "Revenue vs. Expenses Trends" */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        {/* Title & Icon */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base tracking-tight flex items-center gap-2">
              {t('trendTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('trendDesc')}
            </p>
          </div>
        </div>

        {/* Legend + Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Range Selector Buttons */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {(isTR ? ['1A', '3A', '6A', '1Y', 'TÜMÜ'] : ['1M', '3M', '6M', '1Y', 'ALL']).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  selectedRange === range || (selectedRange === 'TÜMÜ' && range === 'ALL') || (selectedRange === 'ALL' && range === 'TÜMÜ')
                    ? 'bg-emerald-500 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle Buttons */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                chartType === 'area'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Alan Grafiği"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                chartType === 'line'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Çizgi Grafiği"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                chartType === 'bar'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Sütun Grafiği"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>

          {/* Special Custom Chart Button */}
          <button
            onClick={() => setIsCustomChartModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('customChart')}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleDownloadChartData}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title={t('downloadChartData')}
          >
            <Download className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Main Recharts Visualizer */}
      <div className="h-[280px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={showGrid ? '#e2e8f0' : 'transparent'} opacity={0.5} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `₺${(val / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="portfolio" fill="#10b981" radius={[4, 4, 0, 0]} name="Portföy Değeri" />
              {showBenchmark && <Bar dataKey="benchmark" fill="#f43f5e" radius={[4, 4, 0, 0]} name={benchmarkName} />}
            </BarChart>
          ) : chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={showGrid ? '#e2e8f0' : 'transparent'} opacity={0.5} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `₺${(val / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              {showBenchmark && <Line type="monotone" dataKey="benchmark" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e' }} />}
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={showGrid ? '#e2e8f0' : 'transparent'} opacity={0.5} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `₺${(val / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#portfolioGradient)" />
              {showBenchmark && <Area type="monotone" dataKey="benchmark" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#benchmarkGradient)" />}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Modal: Custom Chart Filter Settings */}
      {isCustomChartModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">{t('customChartSettings')}</h3>
              </div>
              <button onClick={() => setIsCustomChartModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Benchmark Index Selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">{t('benchmarkIndex')}:</label>
                <select
                  value={benchmarkName}
                  onChange={(e) => setBenchmarkName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white"
                >
                  <option value={isTR ? 'BIST 100 Gösterge' : 'BIST 100 Index'}>{isTR ? 'BIST 100 Endeksi' : 'BIST 100 Index'}</option>
                  <option value={isTR ? 'TÜFE Enflasyon Oranı' : 'CPI Inflation Rate'}>{isTR ? 'TÜFE Enflasyon Endeksi' : 'CPI Inflation Index'}</option>
                  <option value={isTR ? 'Gram Altın Getirisi' : 'Gram Gold'}>{isTR ? 'Gram Altın Getirisi' : 'Gram Gold Returns'}</option>
                  <option value={isTR ? 'Mevduat Faizi' : 'Deposit Rate'}>{isTR ? 'Mevduat Faizi Oranı' : 'Deposit Rate'}</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <div
                  onClick={() => setShowBenchmark(!showBenchmark)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t('showComparisonLine')} ({benchmarkName})</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${showBenchmark ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-transparent'}`}>
                    {showBenchmark && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div
                  onClick={() => setShowGrid(!showGrid)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t('showGridLines')}</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${showGrid ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-transparent'}`}>
                    {showGrid && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsCustomChartModalOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                {t('applyAndClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
