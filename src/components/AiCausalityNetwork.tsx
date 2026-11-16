import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Network, Sparkles, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface MacroNode {
  id: string;
  label: string;
  type: 'macro' | 'fund';
  value: number; // For impact color
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number; // positive or negative
  description: string;
}

export const AiCausalityNetwork: React.FC<{ isTR: boolean }> = ({ isTR }) => {
  const [loading, setLoading] = useState(true);

  // Simplified simulated graph layout
  const nodes: MacroNode[] = [
    // Macro Factors (Top layer)
    { id: 'TCMB', label: isTR ? 'TCMB Faiz' : 'CBRT Rate', type: 'macro', value: -1, x: 20, y: 15 },
    { id: 'INF', label: isTR ? 'Enflasyon' : 'Inflation', type: 'macro', value: 1, x: 50, y: 15 },
    { id: 'FED', label: 'FED Policy', type: 'macro', value: 0, x: 80, y: 15 },
    
    // Intermediate Markets (Middle layer)
    { id: 'USDTRY', label: 'USD/TRY', type: 'macro', value: 1, x: 35, y: 45 },
    { id: 'BIST', label: 'BIST 100', type: 'macro', value: -1, x: 65, y: 45 },
    
    // User Funds (Bottom layer)
    { id: 'IIH', label: 'IIH (Hisse)', type: 'fund', value: -1, x: 30, y: 80 },
    { id: 'TCD', label: 'TCD (Değişken)', type: 'fund', value: 0.5, x: 50, y: 80 },
    { id: 'GLD', label: 'Altın Fonu', type: 'fund', value: 1, x: 70, y: 80 },
  ];

  const edges: Edge[] = [
    { source: 'TCMB', target: 'USDTRY', weight: -0.8, description: 'TCMB cuts increase USDTRY' },
    { source: 'INF', target: 'USDTRY', weight: 0.6, description: 'Inflation drives currency depreciation' },
    { source: 'FED', target: 'USDTRY', weight: 0.5, description: 'FED hikes strengthen USD' },
    { source: 'TCMB', target: 'BIST', weight: 0.7, description: 'Rate cuts boost equities' },
    { source: 'USDTRY', target: 'GLD', weight: 0.9, description: 'Gold priced in USD' },
    { source: 'BIST', target: 'IIH', weight: 0.9, description: 'Equity fund correlation' },
    { source: 'BIST', target: 'TCD', weight: 0.6, description: 'Variable fund equity exposure' },
    { source: 'USDTRY', target: 'TCD', weight: 0.4, description: 'Variable fund FX exposure' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Network className="w-6 h-6 text-indigo-500" />
            {isTR ? 'AI Nedensellik Ağı' : 'AI Causality Network'}
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {isTR 
              ? 'Makroekonomik olayların portföyünüze nasıl aktarıldığını haritalayın.' 
              : 'Map how macroeconomic events propagate to your portfolio.'}
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          disabled={loading}
          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {isTR ? 'Yenile' : 'Refresh'}
        </button>
      </div>

      <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 relative min-h-[500px] overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {isTR ? 'AI Motoru Nedensellik Zincirini Hesaplıyor...' : 'AI Engine Computing Causality Chain...'}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[400px] relative">
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map((edge, i) => {
                const s = nodes.find(n => n.id === edge.source);
                const t = nodes.find(n => n.id === edge.target);
                if (!s || !t) return null;
                
                const isPositive = edge.weight > 0;
                
                return (
                  <motion.line
                    key={i}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: Math.abs(edge.weight) }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    x1={`${s.x}%`} y1={`${s.y}%`}
                    x2={`${t.x}%`} y2={`${t.y}%`}
                    stroke={isPositive ? '#10b981' : '#f43f5e'}
                    strokeWidth={Math.abs(edge.weight) * 3}
                    strokeDasharray={isPositive ? 'none' : '4 4'}
                    className="drop-shadow-sm"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-default"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 shadow-lg transition-transform hover:scale-110 ${
                  node.type === 'macro' 
                    ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800' 
                    : 'bg-indigo-600 border-indigo-400'
                }`}>
                  {node.type === 'macro' 
                    ? <span className="font-bold text-[10px] text-slate-700 dark:text-slate-300">{node.id}</span>
                    : <span className="font-bold text-[10px] text-white">{node.id}</span>
                  }
                </div>
                
                <div className="absolute top-full mt-2 w-max px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  {node.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-emerald-500" /> {isTR ? 'Pozitif Etki' : 'Positive Impact'}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-rose-500 border-t border-dashed border-rose-500" /> {isTR ? 'Negatif Etki' : 'Negative Impact'}
          </div>
        </div>
      </div>
    </div>
  );
};
