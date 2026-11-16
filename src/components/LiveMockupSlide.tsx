import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, AlertTriangle, TrendingUp, TrendingDown, Zap, BarChart2, Cpu, Clock, Signal } from 'lucide-react';

// --- Types & Constants ---
type Point = { id: number; y: number; isEvent?: boolean; eventTag?: string };
type Notification = { uniqueId: number; template: any; timestamp: number };

const MAX_POINTS = 24;
const TICK_RATE = 1000; 
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 400;

const notificationTemplates = [
  { type: 'AI_SIGNAL', tag: 'AI SİNYALİ', title: 'Portföy dağılımı optimize edildi', desc: 'Risk skoru %4.2 iyileştirildi, teknoloji ağırlığı artırıldı.', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-500', icon: Cpu },
  { type: 'MARKET_ALERT', tag: 'PİYASA UYARISI', title: 'Sektörel volatilite artışı', desc: 'Bankacılık sektöründe ani satış baskısı algılandı.', color: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-500', icon: TrendingDown },
  { type: 'MACRO_SIGNAL', tag: 'MAKRO SİNYAL', title: 'Faiz senaryosu güncellendi', desc: 'Merkez bankası beklentileri portföy riskini etkiliyor.', color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500', icon: BarChart2 },
  { type: 'RISK_WARNING', tag: 'RİSK UYARISI', title: 'Korelasyon eşiği aşıldı', desc: 'Altın ve dolar paritesi arasındaki korelasyon kritik seviyede.', color: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-500', icon: AlertTriangle },
  { type: 'OPPORTUNITY', tag: 'FIRSAT', title: 'Arbitraj Fırsatı', desc: 'Likit fonlar arasında geçici getiri makası tespit edildi.', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500', icon: Zap },
  { type: 'SYSTEM', tag: 'SİSTEM', title: 'Model Senkronizasyonu', desc: 'Derin öğrenme ağırlıkları global piyasa verisiyle güncellendi.', color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-500', icon: Activity },
];

export const LiveMockupSlide = ({ isTR }: { isTR: boolean }) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  const walkRef = useRef(50);
  const counterRef = useRef(0);

  // Initialize data
  useEffect(() => {
    const initialPoints: Point[] = [];
    let current = 50;
    for (let i = 0; i < MAX_POINTS; i++) {
        const pull = (50 - current) * 0.08;
        const noise = (Math.random() - 0.5) * 8;
        current = Math.max(15, Math.min(85, current + pull + noise));
        initialPoints.push({ id: i, y: current });
    }
    walkRef.current = current;
    counterRef.current = MAX_POINTS;
    setPoints(initialPoints);
    
    setNotifications([
       { uniqueId: 1, template: notificationTemplates[5], timestamp: Date.now() - 5000 }
    ]);
  }, []);

  // Tick generator
  useEffect(() => {
    const interval = setInterval(() => {
      let current = walkRef.current;
      const pull = (50 - current) * 0.08;
      const noise = (Math.random() - 0.5) * 12; // slightly more volatile
      current = Math.max(15, Math.min(85, current + pull + noise));
      walkRef.current = current;
      
      const newId = counterRef.current++;
      const isChartEvent = Math.random() > 0.75; // 25% chance of event on the chart
      const isNotification = true; // 100% chance of notification in the list
      let eventTemplate = undefined;
      
      if (isNotification) {
          eventTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
          setNotifications(prev => {
              const newNotif = { uniqueId: newId, template: eventTemplate, timestamp: Date.now() };
              return [newNotif, ...prev].slice(0, 3);
          });
      }

      setPoints(prev => {
          const next = [...prev, { id: newId, y: current, isEvent: isChartEvent, eventTag: eventTemplate?.tag }];
          if (next.length > MAX_POINTS) return next.slice(1);
          return next;
      });
      
      setLastUpdate(new Date());
      
    }, TICK_RATE);
    
    return () => clearInterval(interval);
  }, []);

  // Map to SVG coordinates
  const { pathD, areaD, mappedPoints } = useMemo(() => {
    if (points.length === 0) return { pathD: '', areaD: '', mappedPoints: [] };
    
    const xStep = SVG_WIDTH / (MAX_POINTS - 1);
    
    const mapped = points.map((p, i) => {
        return {
            ...p,
            x: i * xStep,
            y: SVG_HEIGHT - (p.y / 100) * SVG_HEIGHT,
        }
    });

    let pD = `M ${mapped[0].x} ${mapped[0].y}`;
    for (let i = 1; i < mapped.length; i++) {
        const prev = mapped[i-1];
        const curr = mapped[i];
        const cpX = (prev.x + curr.x) / 2;
        pD += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    
    const aD = `${pD} L ${mapped[mapped.length-1].x} ${SVG_HEIGHT} L ${mapped[0].x} ${SVG_HEIGHT} Z`;
    
    return { pathD: pD, areaD: aD, mappedPoints: mapped };
  }, [points]);

  const formatTime = (d: Date) => d.toLocaleTimeString(isTR ? 'tr-TR' : 'en-US', { hour12: false });
  const lastPoint = mappedPoints[mappedPoints.length - 1];

  return (
    <div className="relative w-full max-w-[1200px] h-[55vh] min-h-[400px] max-h-[600px] rounded-2xl bg-slate-50/90 dark:bg-[#060608]/90 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden flex flex-col mx-auto">
      
      {/* Header Bar */}
      <div className="h-10 md:h-12 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center px-4 md:px-6 justify-between shrink-0 bg-white/30 dark:bg-black/30">
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"/>
           <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"/>
           <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"/>
        </div>
        
        {/* Minimal Live Indicator */}
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>{isTR ? 'SON SENKRONİZASYON:' : 'LAST SYNC:'}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatTime(lastUpdate)}</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  {isTR ? 'CANLI VERİ AKIŞI' : 'LIVE DATA STREAM'}
                </span>
            </div>
        </div>
      </div>
      
      <div className="flex-1 p-3 md:p-5 flex flex-row flex-nowrap gap-4 md:gap-5 overflow-hidden">
        {/* Left: Live Chart Canvas */}
        <div className="flex-[6] min-w-0 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-[#0A0A0C]/50 p-4 flex flex-col relative overflow-hidden h-full shadow-inner">
          {/* Chart Header details */}
          <div className="flex justify-between items-start mb-4 shrink-0 relative z-10">
             <div>
                 <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1 flex items-center gap-1.5">
                     <Signal className="w-3 h-3" />
                     {isTR ? 'Model Performans Endeksi' : 'Model Performance Index'}
                 </div>
                 <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                     14,294.50
                     <span className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                         +1.2%
                     </span>
                 </div>
             </div>
             
             <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-[10px] text-slate-400 font-mono">TICK_RATE: {TICK_RATE}ms</span>
                <span className="text-[10px] text-slate-400 font-mono">ACTIVE_NODES: 42</span>
             </div>
          </div>

          <div className="flex-1 relative border-b border-l border-slate-200/60 dark:border-slate-800/60 overflow-visible mt-2">
             {/* Subdued Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
             
             {/* Dynamic SVG Chart */}
             <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="liveAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01"/>
                  </linearGradient>
                </defs>
                
                {mappedPoints.length > 0 && (
                    <>
                        {/* Area Fill */}
                        <motion.path 
                          animate={{ d: areaD }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          fill="url(#liveAreaGrad)" 
                        />
                        {/* Line */}
                        <motion.path 
                          animate={{ d: pathD }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          fill="none" 
                          stroke="#6366f1" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />

                        {/* Events Markers */}
                        <AnimatePresence>
                           {mappedPoints.map(p => p.isEvent && (
                               <motion.g 
                                 key={p.id}
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0, x: p.x }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: 0.6, ease: "easeOut" }}
                               >
                                  <line x1={0} y1={p.y} x2={0} y2={SVG_HEIGHT} stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                                  <circle cx={0} cy={p.y} r="3" className="fill-white dark:fill-slate-900 stroke-indigo-500 stroke-2" />
                                  <rect x={-40} y={p.y - 24} width="80" height="18" rx="4" className="fill-slate-800 dark:fill-slate-200" />
                                  <text x={0} y={p.y - 12} textAnchor="middle" className="text-[9px] font-bold fill-white dark:fill-slate-900 uppercase">
                                      {p.eventTag || 'SIGNAL'}
                                  </text>
                               </motion.g>
                           ))}
                        </AnimatePresence>

                        {/* Active End Point */}
                        {lastPoint && (
                            <motion.g
                                animate={{ x: lastPoint.x, y: lastPoint.y }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {/* Glowing outer ring */}
                                <circle cx="0" cy="0" r="14" className="fill-indigo-500/20 animate-pulse" />
                                {/* Center dot */}
                                <circle cx="0" cy="0" r="4" className="fill-indigo-500 stroke-white dark:stroke-slate-900 stroke-2" />
                                
                                {/* Current Price Tooltip */}
                                <motion.rect 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    x="10" y="-10" width="46" height="20" rx="4" 
                                    className="fill-indigo-600 dark:fill-indigo-500 shadow-xl" 
                                />
                                <text x="33" y="3" textAnchor="middle" className="text-[10px] font-bold fill-white font-mono">
                                    {(points[points.length-1].y * 100 + 10000).toFixed(0)}
                                </text>
                            </motion.g>
                        )}
                    </>
                )}
             </svg>
             
             {/* Overlay gradient to fade out left edge (for smooth entry/exit feel) */}
             <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/40 via-white/10 to-transparent dark:from-[#0A0A0C]/50 dark:via-[#0A0A0C]/10 pointer-events-none" />
          </div>
        </div>

        {/* Right: Modern AI / Breaking News Notifications */}
        <div className="flex-[3] flex flex-col gap-3 h-full overflow-hidden relative">
           <AnimatePresence initial={false}>
             {notifications.map((notif, index) => {
               const tmpl = notif.template;
               const Icon = tmpl.icon;
               const isLatest = index === 0;
               
               return (
                 <motion.div 
                   key={notif.uniqueId}
                   layout 
                   initial={{ opacity: 0, x: 20, scale: 0.96 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                   transition={{ type: "spring", stiffness: 350, damping: 25 }}
                   className={`group relative w-full rounded-xl bg-white/70 dark:bg-[#0d0d11]/80 backdrop-blur-xl border-y border-r border-l-2 ${tmpl.border} border-y-slate-200/50 border-r-slate-200/50 dark:border-y-slate-800/50 dark:border-r-slate-800/50 p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shrink-0 flex flex-col gap-2 cursor-default`}
                 >
                   {/* Left breaking news accent line animation for new items */}
                   {isLatest && (
                       <motion.div 
                         initial={{ opacity: 1, height: '100%' }}
                         animate={{ opacity: 0, height: '0%' }}
                         transition={{ duration: 0.8, delay: 0.4 }}
                         className={`absolute left-[-2px] top-0 w-0.5 ${tmpl.bg} shadow-[0_0_8px_currentColor]`}
                       />
                   )}

                   {/* Header */}
                   <div className="flex items-center justify-between">
                       <div className="flex items-center gap-1.5">
                           <Icon className={`w-3.5 h-3.5 ${tmpl.color}`} />
                           <span className={`text-[9px] font-black tracking-widest uppercase ${tmpl.color}`}>
                               {tmpl.tag}
                           </span>
                       </div>
                       <div className="flex items-center gap-1.5 opacity-60">
                           <Clock className="w-3 h-3 text-slate-500" />
                           <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                               {new Date(notif.timestamp).toLocaleTimeString(isTR ? 'tr-TR' : 'en-US', { hour12: false })}
                           </span>
                       </div>
                   </div>
                   
                   {/* Body */}
                   <div>
                       <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">{tmpl.title}</h4>
                       <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{tmpl.desc}</p>
                   </div>
                 </motion.div>
               )
             })}
           </AnimatePresence>
           
           {/* Fade out bottom edge of notifications */}
           <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50 dark:from-[#060608] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
