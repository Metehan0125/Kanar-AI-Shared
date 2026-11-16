import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionValueEvent, MotionValue, useReducedMotion, useMotionTemplate } from 'motion/react';
import { Sparkles, TrendingUp, ShieldAlert, Zap } from 'lucide-react';
import { LiquidBubbles } from '../LiquidBubbles';

// ----------------------------------------------------------------------
// 1. HIGH-PERFORMANCE COMPONENTS (Zero React Re-renders during animation)
// ----------------------------------------------------------------------

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*()";

const GlitchWord = ({ word }: { word: string }) => {
  const [text, setText] = useState(word);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const trigger = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setText(
        word.split("")
          .map((letter, index) => {
            if (index < iteration) return word[index];
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );
      
      if (iteration >= word.length) {
        clearInterval(intervalRef.current!);
        setText(word);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={trigger}
      className="cursor-crosshair inline-block"
    >
      {text}
    </span>
  );
};

const GlitchParagraph = ({ text }: { text: string }) => {
  const words = text.trim().split(" ");
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <GlitchWord word={word} />
          {i !== words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
};

const AnimatedNumber = ({ value, suffix = "", prefix = "", className = "" }: { value: MotionValue<number>, suffix?: string, prefix?: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useMotionValueEvent(value, "change", (latest) => {
    if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(1)}${suffix}`;
  });
  return <div ref={ref} className={className}>{prefix}{value.get().toFixed(1)}{suffix}</div>;
};

// Advanced 3D Hover Card (Apple/Linear Style) - GPU ONLY
const Hover3DCard: React.FC<{ children: React.ReactNode, className?: string, spotlightColor?: string }> = ({ children, className = "", spotlightColor = "rgba(99,102,241,0.06)" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Motion Values for pointer tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const isHovered = useMotionValue(0);
  
  // Spring Physics for smooth, organic movement
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const sX = useSpring(x, springConfig);
  const sY = useSpring(y, springConfig);
  const sRx = useSpring(rx, springConfig);
  const sRy = useSpring(ry, springConfig);
  const sHovered = useSpring(isHovered, { damping: 20, stiffness: 100 });
  
  const handlePointerMove = (e: React.PointerEvent) => {
    // Disable heavy effects for touch devices or reduced motion preference
    if (shouldReduceMotion || window.matchMedia("(hover: none)").matches || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;
    
    x.set(pointerX);
    y.set(pointerY);
    
    // Calculate tilt (-1.5 to 1.5 degrees max for subtle premium feel)
    const xPct = (pointerX / rect.width) - 0.5;
    const yPct = (pointerY / rect.height) - 0.5;
    
    rx.set(yPct * -3); // Tilt X
    ry.set(xPct * 3);  // Tilt Y
    isHovered.set(1);
  };
  
  const handlePointerLeave = () => {
    rx.set(0);
    ry.set(0);
    isHovered.set(0);
  };
  
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${sX}px ${sY}px, ${spotlightColor}, transparent 50%)`;
  const opacity = useTransform(sHovered, [0, 1], [0, 1]);
  
  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // transformPerspective creates the 3D space, transformStyle allows children to pop out
      style={{ rotateX: sRx, rotateY: sRy, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={`relative transform-gpu ${className}`}
    >
      {/* Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-50 mix-blend-screen rounded-inherit transition-opacity"
        style={{ background: spotlight, opacity }}
      />
      {children}
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 2. MAIN SIMULATOR COMPONENT
// ----------------------------------------------------------------------

export const PremiumSimulator: React.FC<{ isTR: boolean }> = ({ isTR }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();
  
  // GPU-Accelerated Slider Value (0 to 100)
  const rate = useMotionValue(50);
  const smoothRate = useSpring(rate, { stiffness: 300, damping: 25, mass: 0.5 });
  const [isDragging, setIsDragging] = useState(false);

  // Derived Values via Math (Runs on GPU/Animation Thread)
  const inflation = useTransform(smoothRate, [0, 100], [1.0, 6.0]);
  const interestRate = useTransform(smoothRate, [0, 100], [10.0, 50.0]);
  
  const stockAlloc = useTransform(smoothRate, r => Math.max(10, 80 - (r * 0.6)));
  const bondAlloc = useTransform(smoothRate, r => Math.min(60, 10 + (r * 0.5)));
  const goldAlloc = useTransform(smoothRate, r => 100 - Math.max(10, 80 - (r * 0.6)) - Math.min(60, 10 + (r * 0.5)));

  // SVG Path morphing generator
  const createPath = (r: number, volatilityMult: number, trendMult: number) => {
    let d = "M 0 150 ";
    for (let i = 1; i <= 10; i++) {
      const x = i * 40;
      const baseTrend = 150 - (i * trendMult);
      const wave = Math.sin(i * r * 0.05) * (volatilityMult * i * 0.5);
      const y = Math.max(20, Math.min(140, baseTrend + wave));
      d += `L ${x} ${y} `;
    }
    return d;
  };

  const stockPath = useTransform(smoothRate, r => createPath(r, r * 0.2, (100 - r) * 0.15));
  const bondPath = useTransform(smoothRate, r => createPath(r, 2, r * 0.12));

  // Aura Opacities
  const hawkishOpacity = useTransform(smoothRate, [50, 100], [0, 0.8]);
  const dovishOpacity = useTransform(smoothRate, [50, 0], [0, 0.8]);
  const stockGlowOpacity = useTransform(smoothRate, [0, 100], [0.6, 0.05]);

  // Width formatting for CSS
  const rateWidth = useTransform(smoothRate, r => `${r}%`);
  const stockWidth = useTransform(stockAlloc, v => `${v}%`);
  const bondWidth = useTransform(bondAlloc, v => `${v}%`);
  const goldWidth = useTransform(goldAlloc, v => `${v}%`);

  // Stagger variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15, delayChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      ref={containerRef} 
      className="min-h-[100svh] flex flex-col justify-center py-20 lg:py-12 px-6 lg:px-16 bg-white dark:bg-[#0A0A0C] relative overflow-hidden transition-colors duration-700"
    >
      {/* Reactive Global Atmosphere (Background Aura) */}
      <motion.div style={{ opacity: dovishOpacity }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.05),transparent_50%)] pointer-events-none mix-blend-screen transition-opacity duration-300" />
      <motion.div style={{ opacity: hawkishOpacity }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none mix-blend-screen transition-opacity duration-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.02),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Content & Slider (42% Width on Desktop) */}
          <motion.div 
            className="lg:col-span-5 relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              {isTR ? 'What-If Simülatörü' : 'What-If Simulator'}
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              <GlitchParagraph text={isTR ? 'Geleceği Bugünden' : 'Test the future,'} />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 block sm:inline">
                <GlitchParagraph text={isTR ? 'Test Edin.' : 'Today.'} />
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              <GlitchParagraph text={isTR 
                ? 'Yapay zeka motorumuz makroekonomik değişkenleri portföyünüze uygular. Faiz oranlarını değiştirin ve anında tepkiyi görün.' 
                : 'Our AI engine applies macroeconomic variables to your portfolio. Change interest rates and watch the immediate reaction.'} />
            </motion.p>

            <motion.div variants={itemVariants}>
              <Hover3DCard className="rounded-[2rem]">
                <div className="bg-slate-50/90 dark:bg-[#121216]/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
                  {/* Internal Aura reacting to slider */}
                  <motion.div style={{ opacity: dovishOpacity }} className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none transition-opacity duration-300" />
                  <motion.div style={{ opacity: hawkishOpacity }} className="absolute inset-0 bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none transition-opacity duration-300" />
                  
                  <div className="flex justify-between items-end mb-8 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <div>
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                        {isTR ? 'TCMB Politika Faizi' : 'Policy Rate'}
                      </label>
                      <AnimatedNumber value={interestRate} prefix="%" className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter drop-shadow-sm" />
                    </div>
                    <div className="text-right">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">
                        {isTR ? 'Beklenen Enflasyon' : 'Exp. Inflation'}
                      </label>
                      <AnimatedNumber value={inflation} prefix="%" className="text-xl font-bold text-red-500 tabular-nums" />
                    </div>
                  </div>

                  {/* Premium Slider Control */}
                  <div className="relative z-10 w-full h-12 flex items-center group/slider" style={{ transform: "translateZ(30px)" }}>
                    <input 
                      type="range" min="0" max="100" defaultValue={50}
                      onChange={(e) => rate.set(Number(e.target.value))}
                      onPointerDown={() => setIsDragging(true)}
                      onPointerUp={() => setIsDragging(false)}
                      onPointerCancel={() => setIsDragging(false)}
                      className="w-full absolute inset-0 opacity-0 cursor-ew-resize z-20"
                      aria-label="Adjust macroeconomic scenario"
                    />
                    
                    {/* Track */}
                    <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner transition-all duration-300 group-hover/slider:h-2.5">
                      <motion.div 
                        className="absolute top-0 left-0 bottom-0 rounded-full bg-gradient-to-r from-orange-400 via-indigo-500 to-cyan-500"
                        style={{ width: rateWidth }}
                      />
                    </div>
                    
                    {/* Thumb */}
                    <motion.div 
                      className="absolute w-7 h-7 bg-white dark:bg-slate-100 border-[3px] border-indigo-500 rounded-full shadow-md pointer-events-none flex items-center justify-center z-10 transition-shadow duration-200"
                      style={{ left: useTransform(smoothRate, r => `calc(${r}% - 14px)`) }}
                      animate={{ 
                        scale: isDragging ? 1.3 : 1,
                        boxShadow: isDragging ? '0 0 25px rgba(99,102,241,0.6)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      whileHover={{ scale: isDragging ? 1.3 : 1.15 }}
                    >
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-4 relative z-10" style={{ transform: "translateZ(10px)" }}>
                    <span className="text-orange-500/80 transition-colors">{isTR ? 'Güvercin' : 'Dovish'}</span>
                    <span className="text-cyan-500/80 transition-colors">{isTR ? 'Şahin' : 'Hawkish'}</span>
                  </div>
                </div>
              </Hover3DCard>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Real-time Reaction Dashboard (58% Width on Desktop) */}
          <motion.div 
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, scale: 0.95, y: shouldReduceMotion ? 0 : 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hover3DCard className="rounded-[2.5rem]" spotlightColor="rgba(99,102,241,0.08)">
              <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/80 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden">
                
                <div className="absolute top-0 right-0 p-8" style={{ transform: "translateZ(10px)" }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight" style={{ transform: "translateZ(20px)" }}>
                  {isTR ? 'AI Portföy Optimizasyonu' : 'AI Portfolio Optimization'}
                </h3>

                {/* Allocation Bars with Row Hover Effect */}
                <div className="space-y-4 mb-10 relative z-10 group/list" style={{ transform: "translateZ(25px)" }}>
                  {[
                    { label: isTR ? 'Hisse Senedi' : 'Equities', value: stockAlloc, width: stockWidth, color: 'bg-blue-500', glow: 'group-hover/item:shadow-[0_0_12px_#3b82f6]', icon: TrendingUp },
                    { label: isTR ? 'Tahvil & Bono' : 'Bonds', value: bondAlloc, width: bondWidth, color: 'bg-emerald-500', glow: 'group-hover/item:shadow-[0_0_12px_#10b981]', icon: ShieldAlert },
                    { label: isTR ? 'Emtia & Altın' : 'Commodities', value: goldAlloc, width: goldWidth, color: 'bg-amber-500', glow: 'group-hover/item:shadow-[0_0_12px_#f59e0b]', icon: Sparkles },
                  ].map((item, idx) => (
                    <div key={idx} className="group/item transition-all duration-300 hover:!opacity-100 group-hover/list:opacity-40 cursor-default bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/40 p-3 -mx-3 rounded-2xl">
                      <div className="flex justify-between text-sm font-semibold mb-2.5">
                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors group-hover/item:text-slate-900 dark:group-hover/item:text-white">
                          <item.icon className="w-4 h-4 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200 transition-colors" />
                          {item.label}
                        </span>
                        <AnimatedNumber value={item.value} suffix="%" className="text-slate-900 dark:text-white tabular-nums transition-transform duration-300 group-hover/item:scale-110 group-hover/item:origin-right" />
                      </div>
                      <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div 
                          className={`h-full ${item.color} rounded-full relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] transition-shadow duration-300 ${item.glow}`}
                          style={{ width: item.width }}
                        >
                          <LiquidBubbles />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reaction Charts (3D Parallax & Organic Physics) */}
                <div 
                  className="h-52 w-full border border-slate-200/80 dark:border-slate-800/80 rounded-2xl bg-slate-50/30 dark:bg-slate-950/30 relative overflow-hidden flex items-end shadow-inner group/chart"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  <svg viewBox="0 0 400 150" preserveAspectRatio="none" className="w-full h-full absolute bottom-0 left-0 overflow-visible px-4">
                    {/* Equity Line Glow (Intensifies on low rate) */}
                    <motion.path 
                      d={stockPath}
                      fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"
                      style={{ opacity: stockGlowOpacity }}
                      className="blur-xl transition-opacity duration-300"
                    />
                    
                    {/* Draw Animation on Load */}
                    <motion.path 
                      d={stockPath}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
                      className="drop-shadow-[0_2px_6px_rgba(59,130,246,0.5)] transition-all duration-300 group-hover/chart:stroke-[3px]"
                    />
                    <motion.path 
                      d={bondPath}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                      fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
                      className="drop-shadow-[0_2px_6px_rgba(16,185,129,0.5)] transition-all duration-300 group-hover/chart:stroke-[3px] opacity-80"
                    />
                  </svg>
                  
                  {/* Chart Badges */}
                  <div className="absolute top-5 left-5 flex gap-4 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 px-3.5 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-transform duration-300 group-hover/chart:scale-105 group-hover/chart:origin-top-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Equities</span>
                    </div>
                    <div className="w-px h-3 bg-slate-300 dark:bg-slate-600 my-auto" />
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Bonds</span>
                    </div>
                  </div>
                </div>
              </div>
            </Hover3DCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
