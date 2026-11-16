import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles, Cloud } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isTR?: boolean;
  variant?: 'default' | 'minimal';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  setDarkMode,
  isTR = true,
  variant = 'default',
}) => {
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="h-8 w-8 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer focus:outline-none"
        title={darkMode ? (isTR ? 'Gündüz Modu' : 'Day Mode') : (isTR ? 'Gece Modu' : 'Night Mode')}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative w-16 h-8.5 rounded-full p-1 cursor-pointer transition-colors duration-500 shadow-inner focus:outline-none flex items-center overflow-hidden border ${
        darkMode
          ? 'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-indigo-800/60 shadow-slate-950/80'
          : 'bg-gradient-to-r from-amber-200 via-sky-300 to-sky-400 border-amber-300/80 shadow-sky-600/20'
      }`}
      title={
        darkMode
          ? isTR
            ? 'Sabah / Gündüz Moduna Geç'
            : 'Switch to Day Mode'
          : isTR
          ? 'Akşam / Gece Moduna Geç'
          : 'Switch to Night Mode'
      }
    >
      {/* Background Decorative Sky Details */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Morning Clouds for Light Mode */}
        <motion.div
          animate={{
            x: darkMode ? -20 : 0,
            opacity: darkMode ? 0 : 0.85,
          }}
          transition={{ duration: 0.4 }}
          className="absolute right-1.5 top-2 flex items-center gap-1 text-white/90"
        >
          <Cloud className="w-3.5 h-3.5 fill-white/80 text-white" />
        </motion.div>

        {/* Twinkling Stars for Dark Mode */}
        <motion.div
          animate={{
            x: darkMode ? 0 : -20,
            opacity: darkMode ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute left-2 top-2 flex items-center gap-1 text-amber-200/90"
        >
          <Sparkles className="w-3.5 h-3.5 fill-amber-200/30 text-amber-200 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-sky-200 animate-ping" />
        </motion.div>
      </div>

      {/* Sliding Celestial Button (Sun <-> Moon) */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        animate={{
          x: darkMode ? 31 : 0,
          rotate: darkMode ? 360 : 0,
        }}
        className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shadow-md relative z-10 ${
          darkMode
            ? 'bg-gradient-to-tr from-slate-100 to-indigo-100 text-indigo-950 shadow-indigo-500/30'
            : 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-amber-500/40 ring-2 ring-amber-300/50'
        }`}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3.5 h-3.5 fill-indigo-950/20 text-indigo-950" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 fill-amber-300 text-amber-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
