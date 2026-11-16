import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { KNOWN_TEFAS_FUNDS } from '../../data/tefasFundsData';

export const PremiumHorizontal: React.FC<{ isTR: boolean, onSelect: () => void }> = ({ isTR, onSelect }) => {
  const funds = KNOWN_TEFAS_FUNDS.slice(0, 5);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="py-20 lg:py-24 px-8 lg:px-20 bg-white dark:bg-[#060608] overflow-hidden border-t border-slate-100 dark:border-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-tighter text-slate-900 dark:text-white leading-tight">
              {isTR ? 'Öne Çıkanlar.' : 'Featured.'} <br/>
              <span className="text-slate-500 dark:text-slate-400 font-normal">{isTR ? 'Lider TEFAS Fonları' : 'Top TEFAS Funds'}</span>
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={onSelect}
            className="group flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white pb-1 border-b-2 border-slate-900 dark:border-white hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 transition-colors"
          >
            <span>{isTR ? 'Kataloğu İncele' : 'View Catalog'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* 3D Cover Flow Container */}
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-16 pt-8 px-8 -mx-8 snap-x snap-mandatory hide-scrollbar relative perspective-1000"
        >
          {funds.map((fund, i) => {
            return (
              <motion.div
                key={fund.code}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                onClick={onSelect}
                style={{ transformStyle: 'preserve-3d' }}
                className="snap-center shrink-0 w-[300px] sm:w-[400px] bg-[#FAFBFD] dark:bg-[#121216] rounded-[2rem] p-8 cursor-pointer border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group relative overflow-visible"
              >
                {/* Floating Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" style={{ transform: 'translateZ(-10px)' }} />

                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" style={{ transform: 'translateZ(20px)' }}>
                  <ArrowUpRight className="w-6 h-6 text-slate-400" />
                </div>
                
                <div className="mb-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                  <div className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-black tracking-widest text-sm mb-4">
                    {fund.code}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {fund.name}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500 mb-1">
                      {isTR ? 'Kategori' : 'Category'}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-300">
                      {fund.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500 mb-1">
                      {isTR ? 'Risk' : 'Risk'}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-300">
                      {fund.riskLevel}/7
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
