import React, { useState, useEffect } from 'react';
import { BenchmarkDataPoint } from '../types';
import { useLanguage } from '../LanguageContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const BenchmarkComparisonChart: React.FC = () => {
  const { isTR } = useLanguage();
  const [period, setPeriod] = useState<string>('1Y');
  const [data, setData] = useState<BenchmarkDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Benchmarks Visibility Toggles
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [showBist, setShowBist] = useState(true);
  const [showSp, setShowSp] = useState(true);
  const [showNasdaq, setShowNasdaq] = useState(false);
  const [showBtc, setShowBtc] = useState(false);
  const [showGold, setShowGold] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/portfolio/benchmarks?period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [period]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-black">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
              {isTR ? 'Portföy Karşılaştırma & Benchmarks' : 'Portfolio Comparison & Benchmarks'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isTR
              ? 'Portföyünüzün getirisini BIST 100, S&P 500, NASDAQ, Gram Altın ve Bitcoin ile kıyaslayın.'
              : 'Compare your portfolio performance against BIST 100, S&P 500, NASDAQ, Gold, and Bitcoin.'}
          </p>
        </div>

        {/* Time Period Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {['1M', '3M', '6M', '1Y'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                period === p
                  ? 'bg-lime-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmark Toggles Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold py-1">
        <label className="flex items-center space-x-1.5 cursor-pointer bg-lime-500/10 dark:bg-lime-950/40 border border-lime-500/30 px-3 py-1.5 rounded-xl text-slate-900 dark:text-lime-300">
          <input
            type="checkbox"
            checked={showPortfolio}
            onChange={(e) => setShowPortfolio(e.target.checked)}
            className="rounded text-lime-500 focus:ring-lime-500"
          />
          <span>{isTR ? 'Portföyüm' : 'My Portfolio'}</span>
        </label>

        <label className="flex items-center space-x-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-blue-600 dark:text-blue-400">
          <input
            type="checkbox"
            checked={showBist}
            onChange={(e) => setShowBist(e.target.checked)}
            className="rounded text-blue-500"
          />
          <span>BIST 100</span>
        </label>

        <label className="flex items-center space-x-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-emerald-600 dark:text-emerald-400">
          <input
            type="checkbox"
            checked={showSp}
            onChange={(e) => setShowSp(e.target.checked)}
            className="rounded text-emerald-500"
          />
          <span>S&P 500</span>
        </label>

        <label className="flex items-center space-x-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-purple-600 dark:text-purple-400">
          <input
            type="checkbox"
            checked={showNasdaq}
            onChange={(e) => setShowNasdaq(e.target.checked)}
            className="rounded text-purple-500"
          />
          <span>NASDAQ 100</span>
        </label>

        <label className="flex items-center space-x-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-amber-600 dark:text-amber-400">
          <input
            type="checkbox"
            checked={showGold}
            onChange={(e) => setShowGold(e.target.checked)}
            className="rounded text-amber-500"
          />
          <span>{isTR ? 'Gram Altın' : 'Gram Gold'}</span>
        </label>

        <label className="flex items-center space-x-1.5 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-orange-600 dark:text-orange-400">
          <input
            type="checkbox"
            checked={showBtc}
            onChange={(e) => setShowBtc(e.target.checked)}
            className="rounded text-orange-500"
          />
          <span>Bitcoin (BTC)</span>
        </label>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full pt-2">
        {loading ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            {isTR ? 'Karşılaştırma verileri yükleniyor...' : 'Loading comparison data...'}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
              <XAxis dataKey="formattedDate" stroke="#94a3b8" fontSize={11} minTickGap={30} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `%${val}`}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#1e293b',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                }}
                formatter={(val: number) => [`%${val >= 0 ? '+' : ''}${val}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />

              {showPortfolio && (
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  name={isTR ? 'Portföyüm (%)' : 'My Portfolio (%)'}
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ffffff', stroke: '#ec4899', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#ec4899' }}
                />
              )}
              {showBist && (
                <Line
                  type="monotone"
                  dataKey="bist100"
                  name="BIST 100 (%)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#ffffff', stroke: '#06b6d4', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#06b6d4' }}
                />
              )}
              {showSp && (
                <Line
                  type="monotone"
                  dataKey="sp500"
                  name="S&P 500 (%)"
                  stroke="#10b981"
                  strokeWidth={1.8}
                  dot={false}
                />
              )}
              {showNasdaq && (
                <Line
                  type="monotone"
                  dataKey="nasdaq"
                  name="NASDAQ 100 (%)"
                  stroke="#a855f7"
                  strokeWidth={1.8}
                  dot={false}
                />
              )}
              {showGold && (
                <Line
                  type="monotone"
                  dataKey="gold"
                  name={isTR ? 'Gram Altın (%)' : 'Gram Gold (%)'}
                  stroke="#f59e0b"
                  strokeWidth={1.8}
                  dot={false}
                />
              )}
              {showBtc && (
                <Line
                  type="monotone"
                  dataKey="btc"
                  name="Bitcoin (%)"
                  stroke="#f97316"
                  strokeWidth={1.8}
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Benchmark Alpha Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500">{isTR ? 'BIST 100 Göreceli Alpha' : 'BIST 100 Relative Alpha'}</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">+11.2%</span>
            <span className="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
              {isTR ? 'BIST Üstü Getiri' : 'Outperforming BIST'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500">{isTR ? 'S&P 500 Göreceli Alpha' : 'S&P 500 Relative Alpha'}</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">+6.4%</span>
            <span className="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
              {isTR ? 'S&P Üstü Getiri' : 'Outperforming S&P'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500">{isTR ? 'Gram Altın Göreceli Alpha' : 'Gram Gold Relative Alpha'}</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-slate-900 dark:text-white">+2.1%</span>
            <span className="text-[10px] font-extrabold bg-lime-500 text-slate-950 px-2 py-0.5 rounded-md">
              {isTR ? 'Dengeli' : 'Balanced'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

