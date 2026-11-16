import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineType, AreaSeries } from 'lightweight-charts';
import { motion, AnimatePresence } from 'motion/react';

interface LiveMarketChartProps {
  isTR: boolean;
}

export const LiveMarketChart: React.FC<LiveMarketChartProps> = ({ isTR }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  
  const [hoveredData, setHoveredData] = useState<{ time: string, value: number, tech: string, banks: string, health: string } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8', // slate-400
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(226, 232, 240, 0.4)' },
        horzLines: { color: 'rgba(226, 232, 240, 0.4)' },
      },
      crosshair: {
        vertLine: {
          color: '#64748b',
          width: 1 as const,
          style: 3 as const,
          labelBackgroundColor: '#475569',
        },
        horzLine: {
          color: '#64748b',
          width: 1 as const,
          style: 3 as const,
          labelBackgroundColor: '#475569',
        },
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
        borderColor: 'rgba(226, 232, 240, 0.4)',
        tickMarkFormatter: (price: number) => {
          return `${(price / 1000).toFixed(0)}k`;
        },
      },
      timeScale: {
        borderColor: 'rgba(226, 232, 240, 0.4)',
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      },
      handleScroll: false,
      handleScale: false,
      autoSize: true,
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#4f46e5', // indigo-500
      topColor: 'rgba(79, 70, 229, 0.15)',
      bottomColor: 'rgba(79, 70, 229, 0.0)',
      lineWidth: 3,
      lineType: LineType.Curved,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: '#fff',
      crosshairMarkerBackgroundColor: '#4f46e5',
    });
    
    seriesRef.current = areaSeries as any;

    // Generate Initial Data
    const generateInitialData = () => {
      const data = [];
      let time = Math.floor(Date.now() / 1000) - 3600; // Start 1 hour ago
      let val = 118000;
      
      for (let i = 0; i < 3600; i += 10) {
        val = val + (Math.random() * 200 - 95); // random walk with slight upward drift
        data.push({
          time: time + i as any,
          value: val
        });
      }
      return data;
    };

    const initialData = generateInitialData();
    areaSeries.setData(initialData);
    
    chart.timeScale().fitContent();

    let lastVal = initialData[initialData.length - 1].value;
    let lastTime = initialData[initialData.length - 1].time as number;

    // Real-time update loop
    const interval = setInterval(() => {
      lastTime += 1; 
      lastVal = lastVal + (Math.random() * 50 - 24);
      
      areaSeries.update({
        time: lastTime as any,
        value: lastVal
      });
    }, 1000);

    // Crosshair move handler
    chart.subscribeCrosshairMove((param) => {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.y < 0) {
        setIsHovering(false);
        setHoveredData(null);
      } else {
        const val = param.seriesData.get(areaSeries) as any;
        if (val) {
          setIsHovering(true);
          setTooltipPos({ x: param.point.x, y: param.point.y });
          const date = new Date((param.time as number) * 1000);
          setHoveredData({
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            value: val.value,
            tech: (val.value * 0.0003).toFixed(1), // mock correlations
            banks: (val.value * 0.0002 - 1).toFixed(1),
            health: (val.value * 0.0001 + 0.5).toFixed(1),
          });
        }
      }
    });

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] p-6 pb-2 flex flex-col group">
      
      {/* Container for the chart */}
      <div className="relative flex-1 w-full" ref={chartContainerRef} />

      {/* Interactive Hover Tooltip */}
      <AnimatePresence>
        {isHovering && hoveredData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ 
               left: tooltipPos.x > ((chartContainerRef.current?.clientWidth || 600) / 2) ? 24 : 'auto',
               right: tooltipPos.x <= ((chartContainerRef.current?.clientWidth || 600) / 2) ? 24 : 'auto',
               top: 24 
            }}
            className="absolute bg-white/95 dark:bg-[#121216]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-3.5 flex flex-col gap-2.5 z-20 w-48 pointer-events-none"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="text-[10px] font-medium text-slate-400">{hoveredData.time}</span>
              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                AI: 98%
              </span>
            </div>
            
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Portfolio Value</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">${hoveredData.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
               <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sector Impact</div>
               <div className="flex justify-between items-center text-[11px]">
                 <span className="text-slate-600 dark:text-slate-400">Tech</span>
                 <span className="font-semibold text-emerald-500">+{hoveredData.tech}%</span>
               </div>
               <div className="flex justify-between items-center text-[11px]">
                 <span className="text-slate-600 dark:text-slate-400">Banks</span>
                 <span className="font-semibold text-rose-500">{hoveredData.banks}%</span>
               </div>
               <div className="flex justify-between items-center text-[11px]">
                 <span className="text-slate-600 dark:text-slate-400">Health</span>
                 <span className="font-semibold text-emerald-500">+{hoveredData.health}%</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

