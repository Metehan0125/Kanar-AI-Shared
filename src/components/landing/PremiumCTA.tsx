import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const PremiumCTA: React.FC<{ isTR: boolean, onStart: () => void }> = ({ isTR, onStart }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <section className="py-24 px-8 lg:px-20 bg-white dark:bg-[#060608] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          style={{ scale, y }}
          className="relative rounded-[3rem] bg-slate-900 dark:bg-slate-900 border border-slate-800 p-12 sm:p-24 text-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-bold tracking-tighter text-white leading-[0.95] mb-8"
            >
              {isTR ? 'Finansal zekaya adım atın.' : 'Step into financial intelligence.'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-slate-400 font-medium max-w-xl mb-12"
            >
              {isTR 
                ? 'Kanar AI, veri karmaşasını ortadan kaldırır. Portföyünüzü hemen bugün analiz etmeye başlayın.' 
                : 'Kanar AI eliminates data chaos. Start analyzing your portfolio today.'}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-transparent rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_-15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_80px_-20px_rgba(16,185,129,0.6)] overflow-hidden"
            >
              {/* Animated Glowing Border Background */}
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30 animate-spin-slow" />
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#6366f1_360deg)] animate-spin-slow" style={{ animationDelay: '-4s' }} />
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#10b981_360deg)] animate-spin-slow" style={{ animationDelay: '-2s' }} />
              
              {/* Inner Dark capsule (since CTA background is dark) */}
              <div className="absolute inset-[2px] bg-slate-900 backdrop-blur-xl rounded-full z-10 transition-colors" />
              
              <span className="relative z-20 text-white bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-emerald-400 transition-all duration-300">
                {isTR ? 'Platforma Giriş' : 'Enter Platform'}
              </span>
              <div className="relative z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 border border-white/20">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-emerald-400 transition-colors" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
