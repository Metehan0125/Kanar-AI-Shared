import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const funds = [
  { code: 'IIH', name: 'İstanbul Portföy Hisse', price: '45.21', change: '+2.4%', isUp: true },
  { code: 'TCD', name: 'Tacirler Değişken', price: '12.84', change: '+1.1%', isUp: true },
  { code: 'MAC', name: 'Marmara Hisse', price: '8.92', change: '-0.5%', isUp: false },
  { code: 'IPB', name: 'İstanbul Portföy Birinci', price: '3.45', change: '+0.8%', isUp: true },
  { code: 'KUB', name: 'Kare Portföy Değişken', price: '5.67', change: '-1.2%', isUp: false },
  { code: 'NNF', name: 'Hedef Portföy Hisse', price: '14.20', change: '+3.5%', isUp: true },
  { code: 'GMR', name: 'Inveo Portföy Hisse', price: '2.34', change: '+1.7%', isUp: true },
  { code: 'NRC', name: 'Neo Portföy Değişken', price: '7.89', change: '-0.2%', isUp: false },
];

export const PremiumMarquee: React.FC = () => {
  return (
    <div className="w-full bg-[#0A0A0C] border-y border-white/5 py-3 overflow-hidden flex whitespace-nowrap relative z-20">
      {/* Gradient masks for smooth fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10" />
      
      <motion.div
        animate={{ x: ["0%", "-33.333333%"] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 30,
        }}
        className="flex gap-8 items-center w-max"
      >
        {/* We map twice to create the infinite loop effect seamlessly */}
        {[...funds, ...funds, ...funds].map((fund, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="font-bold text-slate-100 dark:text-white text-sm">{fund.code}</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline-block">{fund.name}</span>
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="text-slate-300 dark:text-slate-300">{fund.price}</span>
              <span className={`flex items-center text-xs ${fund.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {fund.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {fund.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
