import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Layers, BarChart3, Info } from 'lucide-react';
import { TefasFundDetails, TimePeriod, FundHistoryPoint } from '../types';
import { useLanguage } from '../LanguageContext';

interface FundChartProps {
  fundDetails?: TefasFundDetails;
  fund?: TefasFundDetails;
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
  darkMode?: boolean;
}

// Custom Hover Tooltip
const CustomTooltip = ({ active, payload, label, chartMode, isTR }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data: FundHistoryPoint = payload[0].payload;
  const isPositive = data.changePercent >= 0;

  return (
    <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white p-3.5 rounded-xl border border-slate-700/80 shadow-2xl min-w-[240px] text-xs space-y-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
      {/* Date Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{data.formattedDate}</span>
        </div>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}
        >
          {isPositive ? '+' : ''}
          {data.changePercent}%
        </span>
      </div>

      {/* Primary Value */}
      <div className="space-y-1">
        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
          {chartMode === 'price' ? (isTR ? 'Birim Fon Fiyatı' : 'Unit Fund Price') : (isTR ? 'Dönemsel Getiri' : 'Period Return')}
        </div>
        <div className="text-xl font-bold text-white flex items-baseline gap-1">
          {chartMode === 'price' ? (
            <>
              <span className="text-indigo-400">₺</span>
              <span>{data.price.toFixed(6)}</span>
            </>
          ) : (
            <span className={data.fundReturnPct && data.fundReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              %{data.fundReturnPct && data.fundReturnPct >= 0 ? '+' : ''}
              {data.fundReturnPct}%
            </span>
          )}
        </div>
      </div>

      {/* Additional Metrics on Hover */}
      <div className="pt-1.5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
        {data.portfolioSize && (
          <div>
            <div className="text-slate-400">{isTR ? 'Fon Büyüklüğü' : 'Fund Size'}</div>
            <div className="font-semibold text-slate-200">
              ₺{(data.portfolioSize / 1000000).toFixed(1)}M
            </div>
          </div>
        )}
      </div>

      {/* Benchmarks relative comparison inside tooltip */}
      {payload.length > 1 && (
        <div className="pt-2 border-t border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">{isTR ? 'Karşılaştırmalar:' : 'Comparisons:'}</div>
          {payload.slice(1).map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-slate-300">{entry.name}:</span>
              </span>
              <span className="font-medium text-white">
                %{entry.value >= 0 ? '+' : ''}
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FundChart: React.FC<FundChartProps> = ({
  fundDetails: fundDetailsProp,
  fund: fundProp,
  selectedPeriod,
  onSelectPeriod,
  darkMode,
}) => {
  const { isTR } = useLanguage();
  const [chartMode, setChartMode] = useState<'price' | 'return'>('price');
  const [showBist, setShowBist] = useState(false);
  const [showGold, setShowGold] = useState(false);
  const [showUsd, setShowUsd] = useState(false);

  const PERIODS: { key: TimePeriod; label: string }[] = [
    { key: '1M', label: isTR ? '1A' : '1M' },
    { key: '3M', label: isTR ? '3A' : '3M' },
    { key: '6M', label: isTR ? '6A' : '6M' },
    { key: 'YTD', label: 'YTD' },
    { key: '1Y', label: isTR ? '1Y' : '1Y' },
    { key: '3Y', label: isTR ? '3Y' : '3Y' },
    { key: 'MAX', label: isTR ? 'Tüm' : 'ALL' },
  ];

  const activeFund = fundDetailsProp || fundProp;
  const history = activeFund?.history || [];
  const isOverallPositive = (activeFund?.dailyReturnPct ?? 0) >= 0;

  // Decide colors
  const strokeColor = isOverallPositive ? '#10b981' : '#f43f5e';
  const gradientStart = isOverallPositive ? '#10b981' : '#f43f5e';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="space-y-3 flex-shrink-0">
        {/* Header controls: Period selector & Chart mode toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span>{isTR ? 'Fiyat & Getiri Grafiği' : 'Price & Return Chart'}</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({selectedPeriod})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTR ? 'Grafik üzerine gelerek anlık tarih ve fiyat verilerini inceleyebilirsiniz.' : 'Hover over the chart to inspect date and price history.'}
            </p>
          </div>
        </div>

        {/* Period Selector Buttons */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl self-start sm:self-auto">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              onClick={() => onSelectPeriod(p.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedPeriod === p.key
                  ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-bar options: Display Mode & Benchmark Overlay Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
        {/* Toggle Mode: Birim Fiyat vs Yüzde Getiri */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">{isTR ? 'Gösterim:' : 'View Mode:'}</span>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-900">
            <button
              onClick={() => setChartMode('price')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                chartMode === 'price'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isTR ? 'Birim Fiyat (₺)' : 'Unit Price (₺)'}
            </button>
            <button
              onClick={() => setChartMode('return')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                chartMode === 'return'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isTR ? 'Getiri (%)' : 'Returns (%)'}
            </button>
          </div>
        </div>

        {/* Benchmarks Overlay Checkboxes */}
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline">
            {isTR ? 'Karşılaştır:' : 'Compare:'}
          </span>
          <label className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white">
            <input
              type="checkbox"
              checked={showBist}
              onChange={(e) => {
                setShowBist(e.target.checked);
                if (e.target.checked) setChartMode('return');
              }}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>BIST 100</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white">
            <input
              type="checkbox"
              checked={showGold}
              onChange={(e) => {
                setShowGold(e.target.checked);
                if (e.target.checked) setChartMode('return');
              }}
              className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
            />
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{isTR ? 'Gram Altın' : 'Gram Gold'}</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white">
            <input
              type="checkbox"
              checked={showUsd}
              onChange={(e) => {
                setShowUsd(e.target.checked);
                if (e.target.checked) setChartMode('return');
              }}
              className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>USD/TRY</span>
          </label>
        </div>
      </div>
      </div>

      {/* Main Recharts Area & Line Chart */}
      <div className="w-full flex-1 min-h-[150px] relative">
        {history.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            {isTR ? 'Grafik verisi yükleniyor...' : 'Loading chart data...'}
          </div>
        ) : (
          <ResponsiveContainer key={`${selectedPeriod}-${chartMode}`} width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <defs>
                <linearGradient id="fundColorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={darkMode ? '#334155' : '#e2e8f0'}
              />

              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                stroke={darkMode ? '#94a3b8' : '#64748b'}
                fontSize={11}
                tickFormatter={(val) => {
                  if (!val) return '';
                  const parts = val.split(' ');
                  if (parts.length < 3) return val;

                  const day = parts[0];
                  const month = parts[1].slice(0, 3);
                  const year = parts[2];
                  const shortYear = year.slice(2);

                  if (selectedPeriod === '1M' || selectedPeriod === '3M') {
                    return `${day} ${month}`;
                  } else if (selectedPeriod === '6M' || selectedPeriod === 'YTD' || selectedPeriod === '1Y') {
                    return `${month} '${shortYear}`;
                  } else {
                    return `${month} ${year}`;
                  }
                }}
                minTickGap={30}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                stroke={darkMode ? '#94a3b8' : '#64748b'}
                fontSize={11}
                domain={['auto', 'auto']}
                tickFormatter={(val) => (chartMode === 'price' ? `₺${val}` : `%${val}`)}
              />

              {/* Hover Tooltip */}
              <Tooltip
                content={<CustomTooltip chartMode={chartMode} isTR={isTR} />}
                cursor={{
                  stroke: darkMode ? '#64748b' : '#94a3b8',
                  strokeWidth: 1.5,
                  strokeDasharray: '4 4',
                }}
              />

              {/* Primary Fund Area */}
              <Area
                type="monotone"
                dataKey={chartMode === 'price' ? 'price' : 'fundReturnPct'}
                name={activeFund?.code || ''}
                stroke={strokeColor}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#fundColorGradient)"
                activeDot={{
                  r: 6,
                  fill: strokeColor,
                  stroke: darkMode ? '#0f172a' : '#ffffff',
                  strokeWidth: 2,
                }}
              />

              {/* Optional Benchmark Lines in Return Mode */}
              {chartMode === 'return' && showBist && (
                <Line
                  type="monotone"
                  dataKey="bist100ReturnPct"
                  name="BIST 100"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              )}

              {chartMode === 'return' && showGold && (
                <Line
                  type="monotone"
                  dataKey="goldReturnPct"
                  name={isTR ? 'Gram Altın' : 'Gram Gold'}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              )}

              {chartMode === 'return' && showUsd && (
                <Line
                  type="monotone"
                  dataKey="usdReturnPct"
                  name="USD/TRY"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
